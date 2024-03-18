/** @format */

import { postNewUser } from "@/auth/common/services";
import { IUser } from "@/common/interfaces/user.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostNewtUser = () => {
  const queryClient = useQueryClient();
  return useMutation((newUser: IUser) => postNewUser(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries(["userData"]);
    },
  });
};
