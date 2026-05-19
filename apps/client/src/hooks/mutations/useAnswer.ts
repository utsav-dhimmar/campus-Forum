import answerService from "@/services/answer.services";
import type { AnswerCreate } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ANSWER_KEYS } from "@/hooks/useAnswer";
import { POST_KEYS } from "@/hooks/usePosts";

export const usePostAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: AnswerCreate }) =>
      answerService.postAnswer(postId, data),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ANSWER_KEYS.answers });
      queryClient.invalidateQueries({ queryKey: POST_KEYS.post(postId) });
    },
  });
};

export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answerId: string) => answerService.deleteAnswer(answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANSWER_KEYS.answers });
      // Ideally we should also invalidate the post this answer belonged to,
      // but we don't have the postId here unless we fetch the answer first or pass it.
    },
  });
};
