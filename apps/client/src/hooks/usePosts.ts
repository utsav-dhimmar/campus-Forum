import postService from "@/services/post.services";
import { useQuery } from "@tanstack/react-query";

export const POST_KEYS = {
  posts: [`posts`] as const,
  post: (id: string) => [`post_${id}`] as const,
};

export const useAllPosts = () => {
  return useQuery({
    queryKey: POST_KEYS.posts,
    queryFn: () => postService.getAllPost(),
    staleTime: 1000 * 60 * 1, // Data remains fresh for 1 minutes
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: POST_KEYS.posts,
    queryFn: () => postService.getAPost(id),
    staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes
  });
};

export const useUserPosts = () => {
  return useQuery({
    queryKey: POST_KEYS.posts,
    queryFn: () => postService.getMyPost(),
    staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes
  });
};
