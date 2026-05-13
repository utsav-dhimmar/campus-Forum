import type { AnswerCreate, IAnswer, IMyAnswerResponse } from "@repo/shared";

class AnswerService {
  BASE_URL: string;
  constructor() {
    this.BASE_URL = "/api";
  }

  async postAnswer(postId: string, data: AnswerCreate): Promise<IAnswer> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts/answer/${postId}`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went while posting answer");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: postAnswer ", error);
      throw error;
    }
  }
  /**
   *
   * @param {string} answerId
   */
  async getAnswer(answerId: string): Promise<IAnswer> {
    try {
      const res = await fetch(`${this.BASE_URL}/answer/${answerId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went while get answer");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAnswer ", error);
      throw error;
    }
  }
  /**
   *
   * @param {string} answerId
   */
  async deleteAnswer(answerId: string): Promise<IAnswer | {}> {
    try {
      const res = await fetch(`${this.BASE_URL}/answer/${answerId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went while delete answer");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: deleteAnswer ", error);
      throw error;
    }
  }
  /**
   *
   * @returns {Promise<IMyAnswerResponse[]>}
   */
  async getMyAnswers(): Promise<IMyAnswerResponse[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/answer/user/my-answers`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "Something went wrong while fetching your answers");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getMyAnswers ", error);
      throw error;
    }
  }
}

const answerService = new AnswerService();
export default answerService;
