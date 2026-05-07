import {
    userContext,
    type UserContextData
} from "@/context/User.context";
import { useState } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<UserContextData | null>(null);

	const logout = () => {
		setData(null);
		localStorage.removeItem("userData");
	};

	const login = (data: UserContextData) => {
		setData(data);
		localStorage.setItem("userData", JSON.stringify(data));
	};

	return (
		<userContext.Provider value={{ data, login, logout }}>
			{children}
		</userContext.Provider>
	);
};
