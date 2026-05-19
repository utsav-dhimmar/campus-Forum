import answerService from "@/services/answer.services";
import { useQuery } from "@tanstack/react-query";

export const ANSWER_KEYS = {
  answers: [`answers`] as const,
  answer: (id: string) => [`answer_${id}`] as const,
};

export const useAnswer = (answerId: string) => {
  return useQuery({
    queryKey: ANSWER_KEYS.answer(answerId),
    queryFn: () => answerService.getAnswer(answerId),
    staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes
  });
};

export const useUserAnswers = () => {
  return useQuery({
    queryKey: ANSWER_KEYS.answers,
    queryFn: () => answerService.getMyAnswers(),
    staleTime: 1000 * 60 * 2, // Data remains fresh for 2 minutes
  });
};
