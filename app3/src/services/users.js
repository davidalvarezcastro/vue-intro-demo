const USERS = [
  {name: "David", surname: "Alvarez", country: "Spain", age: 24},
  {name: "Pepe", surname: "Gomez", country: "Spain", age: 17},
  {name: "Masahiro", surname: "Tanaka", country: "Japan", age: 15},
  {name: "Jing", surname: "Chen", country: "China", age: 25}
];

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms))

// simulate api call
export const getUsersService = async () => {
  await waitFor(100);
  return USERS;
}