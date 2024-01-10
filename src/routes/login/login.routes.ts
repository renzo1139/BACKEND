import { loginService } from "../../controllers/login/loginController";
import { router } from "../index.routes";

router.post("/login", loginService);

export default router;
