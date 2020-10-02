import {InputType, Field} from "type-graphql";

@InputType()
export class CreateBookInput {
    @Field()
    public name: string;

    @Field()
    public pageCount: number;

    @Field()
    public authorId: string;
}
