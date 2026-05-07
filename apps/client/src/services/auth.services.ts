import type { IUser, UserCreate, UserLogin } from "@repo/shared";

class AuthService {
	BASE_URL: string;
	constructor() {
		this.BASE_URL = "/api";
	}

	async signup(signupData: UserCreate): Promise<IUser> {
		try {
			const res = await fetch(`${this.BASE_URL}/users/signup`, {
				body: JSON.stringify(signupData),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				throw new Error(data.message || "Error while signup");
			}
			return data.data;
		} catch (error) {
			console.error("error :: signup", error);
			throw error;
		}
	}

	async login(loginData: UserLogin): Promise<IUser> {
		try {
			const res = await fetch(`${this.BASE_URL}/users/login`, {
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
			const res = await fetch(`${this.BASE_URL}/users/logout`, {
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

	async getUserInfo(): Promise<IUser> {
		try {
			const res = await fetch(`${this.BASE_URL}/users/me`, {
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

	async generateRefreshToken(): Promise<{}> {
		try {
			const res = await fetch(`${this.BASE_URL}/users/refresh-token`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				throw new Error(
					data.message || "Error while generating refresh token",
				);
			}
			return data.data;
		} catch (error) {
			console.error("error :: generateRefreshToken", error);
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;
