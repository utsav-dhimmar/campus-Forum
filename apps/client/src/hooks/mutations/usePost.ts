import postService from "@/services/post.services";
import type { PostCreate } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_KEYS } from "@/hooks/usePosts";

const queryClient = useQueryClient();
export const useCreatePost = () => {
    return useMutation({
        mutationFn: (postData: PostCreate) => postService.createPost(postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: POST_KEYS.posts });
        },
    });
};


export const useDeletePost = () => {
    return useMutation({
        mutationFn: (postId: string) => postService.deleteAPost(postId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: POST_KEYS.posts });
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: POST_KEYS.posts });
        },
    });
};
