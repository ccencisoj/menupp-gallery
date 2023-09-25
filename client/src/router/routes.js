const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/home/HomePage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "signIn",
        component: () => import("pages/auth/SignInPage.vue"),
      },
      {
        path: "signUp",
        component: () => import("pages/auth/SignUpPage.vue"),
      },
    ],
  },
  {
    path: "/gallery",
    component: () => import("layouts/GalleryLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("pages/gallery/GalleryPage.vue"),
      },
    ],
  },
  {
    path: "/test",
    component: () => import("pages/TestPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
