import {Resolver, Query, Mutation, Arg} from "type-graphql";
import {Author} from "../models/Author";
import {CreateAuthorInput} from "../inputs/CreateAuthorInput";

@Resolver(() => Author)
export class AuthorResolver {
    @Query(() => [Author])
    public async authors(): Promise<Array<Author>> {
        return Author.find()
    }

    @Mutation(() => Author)
    public async createAuthor(@Arg("data") data: CreateAuthorInput): Promise<Author> {
        return Author.create(data).save();
    }
}
