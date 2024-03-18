/** @format */

import { authRouter } from "@/util/api";
import axios from "axios";
import { validateSchemas } from "../utils";
import { IUser } from "@/common/interfaces/user.interface";
import { userSchemas, usersSchemas } from "@/common/schemas/usersSchemas";

export const postNewUser = async (newUser: IUser) => {
  try {
    const res = await axios.post(authRouter, newUser);
    const data = res.data;
    return validateSchemas(userSchemas, data);
  } catch (error) {
    console.log(error);
  }
};
