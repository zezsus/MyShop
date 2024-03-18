/** @format */

import { validateSchemas } from "@/auth/common/utils";
import { IUser } from "@/common/interfaces/user.interface";
import { userSchemas } from "@/common/schemas/usersSchemas";
import { authRouter } from "@/util/api";
import axios from "axios";

export const updateUser = async (updateValue: IUser, id: string) => {
  try {
    const res = await axios.put(`${authRouter}/${id}`, updateValue);
    const data = res.data;
    return validateSchemas(userSchemas, data);
  } catch (error) {
    console.log(error);
  }
};
