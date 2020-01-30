import "reflect-metadata";
import {createConnection , useContainer, getMongoRepository} from "typeorm";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import { seedDatabase } from './helper';
import { Person } from "./Models/Person/Entities";
import { PersonResolver } from './Models/Person/Resolver';
import { buildSchema } from "type-graphql";

export interface Context {
  person: Person;
}
// register 3rd party IOC container
useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await createConnection().then(()=>{
      //const Mong_Repo = getMongoRepository(Person);
    });
    // seed database with some data
    const { defaultPerson } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [PersonResolver],
      container: Container
    });

    // create mocked context
    const context: Context = { person: defaultPerson };

    // Create GraphQL server
    const server = new ApolloServer({ 
      schema,
      context 
    });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();