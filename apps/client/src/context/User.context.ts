import type { UserRole } from "@repo/shared";
import { createContext, useContext } from "react";

export type UserContextData = {
	_id: string | null;
	username: string | null;
	role: UserRole | null;
};

export type UserContent = {
	data: UserContextData | null;
	login: (data: UserContextData) => void;
	logout: () => void;
};

export const userContext = createContext<UserContent>({
	data: {
		_id: null,
		username: null,
		role: null,
	},
	login: () => {},
	logout: () => {},
});

export const useAuth = () => {
	return useContext(userContext);
};
