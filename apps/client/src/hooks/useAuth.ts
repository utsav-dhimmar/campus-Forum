import authService from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

export const AUTH_KEYS = {
  user_info: [`user_info`] as const,
};

export const useAuth = () => {
  return useQuery({
    queryKey: AUTH_KEYS.user_info,
    queryFn: () => authService.getUserInfo(),
  });
};
