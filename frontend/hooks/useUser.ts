import { IProtection } from "@/types/protection";
import Cookie from "js-cookie";

export const useUser = () => {
  const isAuth = Cookie.get('token') ? true : false;
  const isStaff = Cookie.get('isStaff') === "true" ? true : false;
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";
  const userId = Cookie.get('userId') ?? "";

  const protection: IProtection = {
    isAuth,
    isStaff,
    firstName,
    lastName,
    userId
  };

  return protection
}