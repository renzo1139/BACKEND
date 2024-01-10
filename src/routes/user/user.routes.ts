import {
  addPermision,
  addUser,
  deleteAdmin,
  deletePermissionInUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  makeAdmin,
  updateUser,
} from "../../controllers/user/userController";
import { router } from "../index.routes";

// metodos

router.get("/user", getAllUsers);
router.get("/user/:id", getUserByID);
router.patch("/user/updateUser", updateUser);
router.post("/user/newUser", addUser);
router.post("/user/deleteUser", deleteUser);
router.post("/permission/addPermision", addPermision);
router.post("/permission/deletePermission", deletePermissionInUser);
router.post("/user/makeAdmin", makeAdmin);
router.post("/user/deleteAdmin", deleteAdmin);
export default router;
