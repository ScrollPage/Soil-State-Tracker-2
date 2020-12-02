import { boolean } from "yup";

export interface IProtection {
  isAuth: boolean;
  isStaff: boolean;
  isWorker: boolean;
}