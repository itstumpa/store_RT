
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import brandRoutes from "../modules/brand/brand.routes";
// import categoryRoutes from "../modules/category/category.routes";
// import productRoutes from "../modules/product/product.routes";
// import orderRoutes from "../modules/order/order.routes";

const router = Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/brands",
    route: brandRoutes,
  },
  // {
  //   path: "/categories",
  //   route: categoryRoutes,
  // },
  // {
  //   path: "/products",
  //   route: productRoutes,
  // },
  // {
  //   path: "/orders",
  //   route: orderRoutes,
  // },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
