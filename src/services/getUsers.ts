import { User } from "../interfaces/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();
  return data.results;
}
