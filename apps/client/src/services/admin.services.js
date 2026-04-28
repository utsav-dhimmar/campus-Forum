class AdminService {
  constructor() {
    this.BASE_URL = "/api";
  }

  /**
   *
   * @param {{email:string,password:string}} loginData
   */
  async login(loginData) {
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

  async logout() {
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

  async getAllUsers() {
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
  async getUserInfo(userId) {
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

  async getAllPosts() {
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
  async getPostById(postId) {
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

  async deleteUser(userId) {
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

  async deletePost(postId) {
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

  async deleteAnswer(answersId) {
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
  async updateUserRole(userId, roleData) {
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
  async getAnalytics(date) {
    try {
      const res = await fetch(
        `${this.BASE_URL}/admin/analytics?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
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
