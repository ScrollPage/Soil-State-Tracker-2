import { IProtection } from "@/types/protection";
import Cookie from "js-cookie";

export const useUser = () => {
  const isAuth = Cookie.get('token') ? true : false;
  const isStaff = Cookie.get('isStaff') === "true" ? true : false;

  const protection: IProtection = {
    isAuth,
    isStaff,
  };

  return protection
}