import { Resolver, Query, Mutation, Arg, Ctx, Args, Authorized } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import {
  MongoRepository, InsertResult, DeleteResult, UpdateResult,
  InsertOneWriteOpResult, DeleteWriteOpResultObject, UpdateWriteOpResult 
} from 'typeorm';

import { Person } from "./Entities";
import { NewInput, UpdateInput , ArgInput } from './DTO';

@Resolver(of=>Person)
export class PersonResolver {
  constructor(
    @InjectRepository(Person) private readonly Person_repo: MongoRepository<Person>
  ) {}

  @Query(returns => Person)
  async person(@Arg("id") id: string) {
    return await this.Person_repo.findOne(id);
  }

  @Query(returns => [Person])
  async persons(
      //@Args() { skipe, take }: ArgInput
      ) {
    return await this.Person_repo.find();
  }

  @Mutation(returns => Person)
  //@Authorized()
  async savePerson(
    @Arg("newPersonData") newPersonData: NewInput,
    //@Ctx("person") person: Person,
  ): Promise<Person> {
    const person = new Person();
    person.firstName = newPersonData.firstName;
    person.lastName = newPersonData.lastName;
    person.age = newPersonData.age;
    const result = await this.Person_repo.save( person );
    console.log("savePerson : ",result);  // Success return person
    return result;
  }
  @Mutation(returns => Person)
  //@Authorized()
  async createPerson(
    @Arg("newPersonData") newPersonData: NewInput,
    //@Ctx("person") person: Person,
  ): Promise<Person> {
    const person = this.Person_repo.create({
      firstName : newPersonData.firstName,
      lastName : newPersonData.lastName,
      age : newPersonData.age
    });
    const result = await this.Person_repo.save( person );
    console.log("savePerson : ",result);  // Success return person
    return result;
  }
  @Mutation(returns => Person)
  //@Authorized()
  async insertPerson(
    @Arg("newPersonData") newPersonData: NewInput,
    //@Ctx("person") person: Person,
  ): Promise<InsertResult> {
    const result = await this.Person_repo.insert(newPersonData);
    console.log("insertPerson : ",result);
    return result;
  }
  @Mutation(returns => Person)
  //@Authorized()
  async insertOnePerson(
        @Arg("newPersonData") newPersonData: NewInput,
        //@Ctx("person") person: Person,
      ): Promise<InsertOneWriteOpResult>{
      const obj_L = {
          firstName: newPersonData.firstName,
          lastName: newPersonData.lastName,
          age: newPersonData.age
        }
      const result= await this.Person_repo.insertOne(obj_L);
      console.log("insertOnePerson : ",result);
      return result;
    }

  @Mutation(returns => Boolean)
  //@Authorized(Roles.Admin)
  async removePerson(@Arg("id") id: string): Promise<DeleteResult> {
      return await this.Person_repo.delete(id);
  }
  @Mutation(returns => Boolean)
  //@Authorized(Roles.Admin)
  async deleteOnePerson(
        @Arg("DeleteObj") Obj_L: UpdateInput
      ): Promise<DeleteWriteOpResultObject> {
      return await this.Person_repo.deleteOne(Obj_L);
    }
  @Mutation(returns => Boolean)
  //@Authorized(Roles.Admin)
  async updateOnePerson(
        @Arg("UpdatedPerson") Obj_L: UpdateInput,
        @Arg("newPersonData") updatePersonData: UpdateInput,
      ): Promise<UpdateWriteOpResult> {
      return await this.Person_repo.updateOne(Obj_L, updatePersonData);
    }
  async updatePerson(
        @Arg("id") id: string,
        @Arg("newPersonData") updatePersonData: UpdateInput,
      ): Promise<UpdateResult> {
      return await this.Person_repo.update(id, updatePersonData);
    }
    async updateManyPerson(
        @Arg("UpdatedPerson") Obj_L: UpdateInput,
        @Arg("newPersonData") updatePersonData: UpdateInput,
      ): Promise<UpdateWriteOpResult> {
      return await this.Person_repo.updateMany(Obj_L, updatePersonData,{
        upsert: true,
        //w: any,
        wtimeout: 1,
        j: false
    });
    }
}