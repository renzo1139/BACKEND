import { addAdmin, deleteAdmin, getAdminByID, getAllAdmins, updateAdmin } from "../../controllers/admin/adminController";

import { router } from "../index.routes";

// metodos

router.get("/user", getAllAdmins);
router.get("/user/:id", getAdminByID);
router.patch("/user/updateUser", updateAdmin);
router.post("/user/newUser", addAdmin);
router.delete("/user/deleteUser", deleteAdmin);

export default router;
