import { Footer, Header } from "@/components";
import { useEffect } from "react";
import { Outlet } from "react-router";
import authService from "@/services/auth.services";
import { useAuthStore } from "@/store/useAuthStore";

function App() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")!) ?? false;
    if (user) {
      login(user);
    } else {
      authService
        .getUserInfo()
        .then((res) => {
          return res
            ? login({
                _id: res._id,
                username: res.username,
                role: res.role,
              })
            : logout();
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="container mx-auto px-4 flex-1 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
