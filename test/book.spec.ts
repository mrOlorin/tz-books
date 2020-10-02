import supertest from "supertest";
import {Book} from "../src/models/Book";
import {Author} from "../src/models/Author";
import {createConnection} from "typeorm";

describe('Book', () => {

    const server = supertest.agent(`http://localhost:4000/`);

    beforeAll(async () => {
        await createConnection();
    });

    describe('Create', () => {
        it('Creates', async () => {
            const author = await Author.create({name: 'test-book-create-author'}).save();
            const testBook = {
                name: 'test-book-create',
                pageCount: 12,
                authorId: author.id,
            };
            const resp = await server
                .post('graphql')
                .send({
                    query: `mutation {
                        createBook (
                            data: {
                                name: "${testBook.name}"
                                pageCount: ${testBook.pageCount}
                                authorId: "${testBook.authorId}"
                            }
                        ) {
                            id
                            name
                        }
                    }`
                });
            expect(resp.body).toHaveProperty('data');
            expect(resp.body.data).toHaveProperty('createBook');
            expect(resp.body.data.createBook.name).toEqual(testBook.name);
            const createdBook = await Book.findOne({where: {id: resp.body.data.createBook.id}});
            expect(createdBook).toBeTruthy();
            expect(createdBook).toHaveProperty('name', testBook.name);
        });
    });

    describe('Get', () => {
        it('Gets with author', async () => {
            const author = await Author.create({name: 'test-book-author'}).save();
            await Book.create({
                name: 'test-book-get',
                pageCount: 30,
                authorId: author.id,
            }).save();
            const resp = await server
                .post('graphql')
                .send({
                    query: `{
                        books {
                            name
                            author {
                                name
                            }
                        }
                    }`
                });
            expect(resp.body).toHaveProperty('data');
            expect(resp.body.data).toHaveProperty('books');
            expect(resp.body.data.books.length).toBeGreaterThan(0);
            expect(resp.body.data.books[0]).toHaveProperty('author');
        });

        it('Gets without author', async () => {
            const author = await Author.create({name: 'test-book-author'}).save();
            await Book.create({
                name: 'test-book-get',
                pageCount: 30,
                authorId: author.id,
            }).save();
            const resp = await server
                .post('graphql')
                .send({
                    query: `{
                        books {
                            name
                        }
                    }`
                });
            expect(resp.body).toHaveProperty('data');
            expect(resp.body.data).toHaveProperty('books');
            expect(resp.body.data.books.length).toBeGreaterThan(0);
            expect(resp.body.data.books[0]).not.toHaveProperty('author');
        });
    });

});
