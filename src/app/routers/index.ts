import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

const moduleRouters = [

  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
