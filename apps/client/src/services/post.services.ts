import type {
  PostCreate,
  IPost,
  IPostWithAuthor,
  IPostDetails,
  IMyAnswerResponse,
} from "@repo/shared";

class PostService {
  BASE_URL: string;
  constructor() {
    this.BASE_URL = "/api";
  }

  async createPost(postData: PostCreate): Promise<IPost> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(postData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went wrong at create post");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: createPost ", error);
      throw error;
    }
  }

  async getAllPost(): Promise<IPostWithAuthor[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went wrong at get all post");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAllPost ", error);
      throw error;
    }
  }

  async getAPost(postId: string): Promise<IPostDetails> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts/${postId}`, {
        method: "GET",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went wrong at get post");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAPost ", error);
      throw error;
    }
  }

  async deleteAPost(postId: string): Promise<{}> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went while deleting post");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAPost ", error);
      throw error;
    }
  }

  async getMyPost(): Promise<IPost[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/posts/user/my-post`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "Something went wrong while fetching your posts");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getMyPost ", error);
      throw error;
    }
  }
  /**
   *
   * @returns {Promise<IMyAnswerResponse[]>}
   */
  async getMyAnswers(): Promise<IMyAnswerResponse[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/answers/user/my-answer`, {
        // Assuming this is the correct endpoint
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

const postService = new PostService();
export default postService;
