import {Resolver, Query, Mutation, Arg, FieldResolver, Root} from "type-graphql";
import {Book} from "../models/Book";
import {CreateBookInput} from "../inputs/CreateBookInput";
import {Author} from "../models/Author";

@Resolver(() => Book)
export class BookResolver {
    @Query(() => [Book])
    public async books(): Promise<Array<Book>> {
        return Book.find()
    }

    @FieldResolver()
    public async author(@Root() book: Book): Promise<Author | undefined> {
        return Author.findOne(book.authorId);
    }

    @Mutation(() => Book)
    public async createBook(@Arg("data") data: CreateBookInput): Promise<Book> {
        return Book.create(data).save();
    }
}
