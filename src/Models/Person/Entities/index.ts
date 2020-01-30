import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity} from "typeorm";
import { ObjectType , Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Person extends BaseEntity {

    @ObjectIdColumn()
    @Field(type=>ID)
    id: ObjectID;
    
    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    age: number;

}
