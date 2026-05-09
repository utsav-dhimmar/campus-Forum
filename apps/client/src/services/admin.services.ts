import type { IUser, UserLogin, IPost, IPostDetails } from "@repo/shared";

export interface IAdminLoginResponse {
  email: string;
}

export interface IGetAllUsersResponse {
  users: IUser[];
  totalUsers: Array<{ count: number }>;
}

export interface IAnalyticsResponse {
  dateRange: {
    start: string;
    end: string;
  };
  users: {
    newUsers: any[];
  };
  posts: {
    newPost: number;
  };
  answer: {
    newAnswer: number;
  };
  topPostData: {
    topPost: any[];
  };
}

class AdminService {
  BASE_URL: string;
  constructor() {
    this.BASE_URL = "/api";
  }

  /**
   *
   * @param {UserLogin} loginData
   */
  async login(loginData: UserLogin): Promise<IAdminLoginResponse> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/login`, {
        body: JSON.stringify(loginData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while login");
      }
      return data.data;
    } catch (error) {
      console.error("error :: login", error);
      throw error;
    }
  }

  async logout(): Promise<{}> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while logout");
      }
      return data.data;
    } catch (error) {
      console.error("error :: logout", error);
      throw error;
    }
  }

  async getAllUsers(): Promise<IGetAllUsersResponse> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while getAllUsers");
      }
      return data.data;
    } catch (error) {
      console.error("error :: getAllUsers", error);
      throw error;
    }
  }

  /**
   *
   * @param {string} userId
   * @returns
   */
  async getUserInfo(userId: string): Promise<IUser> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while getUserInfo");
      }
      return data.data;
    } catch (error) {
      console.error("error :: getUserInfo", error);
      throw error;
    }
  }

  async getAllPosts(): Promise<IPost[]> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while getAllPosts");
      }
      return data.data;
    } catch (error) {
      console.error("error :: getAllPosts", error);
      throw error;
    }
  }

  /**
   *
   * @param {string} postId
   * @returns
   */
  async getPostById(postId: string): Promise<IPostDetails> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while getAPost");
      }
      return data.data;
    } catch (error) {
      console.error("error :: getAPost", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<{}> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while delete User");
      }
      return data.data;
    } catch (error) {
      console.error("error :: deleteUser", error);
      throw error;
    }
  }

  async deletePost(postId: string): Promise<{}> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while delete post");
      }
      return data.data;
    } catch (error) {
      console.error("error :: deletePost", error);
      throw error;
    }
  }

  async deleteAnswer(answersId: string): Promise<{}> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/answers/${answersId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while delete post");
      }
      return data.data;
    } catch (error) {
      console.error("error :: deletePost", error);
      throw error;
    }
  }
  async updateUserRole(userId: string, roleData: { role: string }): Promise<IUser> {
    try {
      const res = await fetch(`${this.BASE_URL}/admin/users/${userId}/role`, {
        body: JSON.stringify(roleData),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while update user role");
      }
      return data.data;
    } catch (error) {
      console.error("error :: updateUserRole", error);
      throw error;
    }
  }
  async getAnalytics(date: { startDate: string; endDate: string }): Promise<IAnalyticsResponse> {
    try {
      const res = await fetch(
        `${this.BASE_URL}/admin/analytics?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error while getAnalytics");
      }
      return data.data;
    } catch (error) {
      console.error("error :: getAnalytics", error);
      throw error;
    }
  }
}

const adminService = new AdminService();

export default adminService;
