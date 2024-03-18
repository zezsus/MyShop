/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/profile.service";
import { IUser } from "@/common/interfaces/user.interface";

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation((updateValue: IUser) => updateUser(updateValue, id), {
    onSuccess: (data) => {
      queryClient.setQueryData(["userData", { id: id }], data);
      queryClient.invalidateQueries(["userData"]);
    },
  });
};
