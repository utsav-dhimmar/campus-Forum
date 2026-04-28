class PostService {
  constructor() {
    this.BASE_URL = "/api";
    console.log(this.BASE_URL);
  }
  /**
   *
   * @param {{body:string}} postData
   */
  async createPost(postData) {
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
        throw new Error(
          resData.message || "something went wrong at create post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: createPost ", error);
      throw error;
    }
  }

  async getAllPost() {
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
        throw new Error(
          resData.message || "something went wrong at get all post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAllPost ", error);
      throw error;
    }
  }

  /**
   *
   * @param {string} postId
   * @returns
   */
  async getAPost(postId) {
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

  /**
   *
   * @param {string} postId
   * @returns
   */
  async deleteAPost(postId) {
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
        throw new Error(
          resData.message || "something went while deleting post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAPost ", error);
      throw error;
    }
  }

  async getMyPost() {
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
        throw new Error(
          resData.message || "Something went wrong while fetching your posts"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getMyPost ", error);
      throw error;
    }
  }
  /**
   *
   * @returns {Promise<Array<any>>}
   */
  async getMyAnswers() {
    try {
      const res = await fetch(`${this.BASE_URL}/answers/user/my-answer`, { // Assuming this is the correct endpoint
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(
          resData.message || "Something went wrong while fetching your answers"
        );
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
