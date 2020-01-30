import { InputType, Field, Int, ArgsType } from 'type-graphql';
import {
    //validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate,
    Min, Max, MaxLength} from "class-validator";

@InputType()
export class NewInput {

    @Field()
    firstName: string
    
    @Field()
    lastName: string

    @Field(()=>Int)
    age: number
}

@InputType()
export class UpdateInput {

    @Field({nullable: true})
    firstName?: string
    
    @Field({nullable: true})
    lastName?: string

    @Field(()=>Int,{nullable: true})
    age?: number
}

@ArgsType()
export class ArgInput {
    @Field(type => Int)
    @Min(1)
    @Max(20)
    skipe: number

    @Field(type => Int)
    @Min(1)
    @MaxLength(50)
    take: number = 25;
}