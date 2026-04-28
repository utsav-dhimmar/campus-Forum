import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./providers/User.Provider.jsx";

import { AuthComponent, GuestOnly } from "./components";
import {
  AboutMe,
  HomePage,
  HomePageForVisiters,
  LoginPage,
  PostInfo,
  RaiseQuery,
  SignUpPage,
  MyPost,
  MyAnswer,
} from "./pages/user";

import { adminRoutes } from "./routes/adminRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<App />}>
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route index element={<HomePage />} />

          {/* Page are only available when user is not login */}
          <Route element={<GuestOnly />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/no-logged-in" element={<HomePageForVisiters />} />
            {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          </Route>

          <Route element={<AuthComponent />}>
            <Route path="/get-info" element={<AboutMe />} />
            <Route path="/raise-query" element={<RaiseQuery />} />
            <Route path="/my-post" element={<MyPost />} />
            <Route path="/my-answer" element={<MyAnswer />} />
            <Route path="/posts/:postId" element={<PostInfo />} />
          </Route>
        </Route>
        {adminRoutes}
      </Route>
    </>
  )
);
// console.log(router.state);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
