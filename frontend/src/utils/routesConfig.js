import { Chat, Login, Register, PageNotFound } from "../components/Pages";

const routesConfig = [
  {
    path: "/" && "/chat",
    component: Chat,
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    protected: false,
  },
  {
    path: "/register",
    component: Register,
    protected: false,
  },
  {
    path: "*",
    component: PageNotFound,
    protected: false,
  },
];

export default routesConfig;
