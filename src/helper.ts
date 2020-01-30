import { getMongoRepository, Column, ColumnOptions } from "typeorm";

import { Person  } from "./Models/Person/Entities";

export async function seedDatabase() {
  const person_Repo = getMongoRepository(Person);

  const defaultPerson = person_Repo.create({
    firstName: "shady",
    lastName: "El Nady",
    age: 39,
  });
  const result_Craete = await person_Repo.save(defaultPerson);
  console.log("result_Craete : ", result_Craete);
/*
  const recipes = recipeRepository.create([
    {
      title: "Recipe 1",
      description: "Desc 1",
      author: defaultPerson,
      ratings: ratingsRepository.create([
        { value: 2, user: defaultUser },
        { value: 4, user: defaultUser },
        { value: 5, user: defaultUser },
        { value: 3, user: defaultUser },
        { value: 4, user: defaultUser },
      ]),
    },
    {
      title: "Recipe 2",
      author: defaultPerson,
      ratings: ratingsRepository.create([
        { value: 2, user: defaultPerson },
        { value: 4, user: defaultPerson },
      ]),
    },
  ]);
  await recipeRepository.save(recipes);
*/
  return {
    defaultPerson,
  };
}
/*
export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}*/