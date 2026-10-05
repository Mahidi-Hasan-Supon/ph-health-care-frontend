// import { getMe, userLogin, userLogOut } from "@/api";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export function useLogin() {
//   return useMutation({
//     mutationFn: userLogin,
//   });
// };

// export function  useLogout() {
//   return useMutation({
//     mutationFn: userLogOut,
//   });
// };

// export function  useGetMe() {
//   return useQuery({
//     queryKey: ['user'],
//     queryFn:getMe
//   });
// };

import {
  getMe,
  googleOAuthClient,
  userLogin,
  userLogOut,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: userRegistration,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogOut,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuthClient,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

