/** @format */

import { useQuery } from "@tanstack/react-query";
import { getDataUser } from "../services/userserver";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: getDataUser,
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};
