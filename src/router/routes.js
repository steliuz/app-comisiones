const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("src/pages/login/Login-Page.vue"),
      },

    ],
  },

  //ADMIN

  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        meta: { requiresAuth: true },
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
