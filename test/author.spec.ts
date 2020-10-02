import supertest from "supertest";
import {Author} from "../src/models/Author";
import {createConnection} from "typeorm";

describe('Author', () => {

    const server = supertest.agent(`http://localhost:4000/`);

    beforeAll(async () => {
        await createConnection();
    });

    describe('Create', () => {
        it('Creates', async () => {
            const testName = 'test-author';
            const resp = await server
                .post('graphql')
                .send({
                    query: `mutation {
                        createAuthor (
                            data: {
                                name: "${testName}"
                            }
                        ) {
                            id
                            name
                        }
                    }`
                });
            expect(resp.body).toHaveProperty('data');
            expect(resp.body.data).toHaveProperty('createAuthor');
            expect(resp.body.data.createAuthor.name).toEqual(testName);
            const createdAuthor = await Author.findOne({where: {id: resp.body.data.createAuthor.id}});
            expect(createdAuthor).toBeTruthy();
            expect(createdAuthor).toHaveProperty('name', testName);
        });
    });

    describe('Get', () => {
        it('Gets', async () => {
            await Author.create({name: 'test-book-author'}).save();
            const resp = await server
                .post('graphql')
                .send({
                    query: `{
                        authors {
                            id
                            name
                        }
                    }`
                })
                .expect(200);
            expect(resp.body).toHaveProperty('data');
            expect(resp.body.data).toHaveProperty('authors');
            expect(resp.body.data.authors.length).toBeGreaterThan(0);
        });
    });
});
