import "reflect-metadata";
import {createConnection} from "typeorm";
import { Person } from "./Models/Person/Entities/Person";
import { PersonResolver } from './Models/Person/Resolver';
import { buildSchema } from "type-graphql";


const schema = buildSchema({
    resolvers: [PersonResolver],
  });

createConnection().then(async connection => {

    console.log("Inserting a new person into the database...");
    const person = new Person();
    person.firstName = "TttTimber";
    person.lastName = "SSaw";
    person.age = 25;
    await connection.mongoManager.save(person);
    console.log("Saved a new person with id: " + person.id);

    console.log("Loading persons from the database...");
    const persons = await connection.mongoManager.find(Person);
    console.log("Loaded persons: ", persons);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
