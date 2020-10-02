import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Book} from "./Book";

@Entity()
@ObjectType()
export class Author extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    public id: string;

    @Field(() => String)
    @Column()
    public name: string;

    @Field(() => [Book])
    @OneToMany(() => Book, book => book.author)
    public books: Array<Book>;
}
