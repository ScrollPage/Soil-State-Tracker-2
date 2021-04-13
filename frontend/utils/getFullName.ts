import { IUser } from "@/types/user";

export const getFullName = (user: IUser) => {
  const { first_name, last_name } = user;
  return `${first_name} ${last_name}`;
};