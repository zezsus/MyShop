/** @format */

import { InferType } from "yup";
import { userSchemas } from "../schemas/usersSchemas";

export type IUser = InferType<typeof userSchemas>;

export interface IState {
  isLogin: boolean;
  isLocalStorage: boolean;
  isMessage: boolean;
  message: string;
  color: string;
}
