import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Author} from "./Author";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    public id: string;

    @Field(() => String)
    @Column()
    public name: string;

    @Field(() => Number)
    @Column()
    public pageCount: number;

    @Field(() => ID)
    @Column()
    public authorId: string;

    @ManyToOne(() => Author, author => author.books)
    @Field(() => Author)
    public author: Author;
}
