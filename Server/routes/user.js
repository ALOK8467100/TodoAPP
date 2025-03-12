import express from "express";
import { login, logout, register } from "../controllers/user.js";

const router = express.Router();
/*

1. express.Router() is a built-in method in Express.js that creates a modular, mini router instance.
2. router acts as a mini Express application that can handle routes separately.
3. This helps in keeping route definitions organized and modular.
4. Instead of defining all routes in the main server.js or app.js file, we define them separately and export them.


Why Use express.Router()?

✅ Modularity → Allows you to split routes into separate files (e.g., user routes, product routes).
✅ Code Reusability → Can be reused and mounted anywhere in the app.
✅ Middleware Support → Can apply middleware specific to this router before passing requests to controllers.

*/

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;