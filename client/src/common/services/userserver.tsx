/** @format */

import { authRouter } from "@/util/api";
import axios from "axios";
import { usersSchemas } from "../schemas/usersSchemas";
import { validateSchemas } from "../utils";

export const getDataUser = async () => {
  try {
    const res = await axios.get(authRouter);
    const data = await res.data;
    return validateSchemas(usersSchemas, data);
  } catch (error) {
    console.log(error);
  }
};
