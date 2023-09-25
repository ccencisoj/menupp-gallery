import { auth } from "./firebase";
import { boot } from "quasar/wrappers";

export default boot(async ({ router }) => {
  auth.onAuthStateChanged((state) => {
    if (state === null && router.currentRoute.value.meta.requiresAuth) {
      router.push("/auth/signIn");
    }
  });
  router.beforeEach(async (to, from, next) => {
    const user = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => resolve(user));
    });

    if (
      user != null &&
      (to.path === "/" ||
        to.path === "/auth/signIn" ||
        to.path === "/auth/signUp")
    ) {
      return next("/gallery");
    }

    if (user === null && to.meta.requiresAuth) {
      return next("/auth/signIn");
    }

    next();
  });
});
