
import { Router } from "express";
import { createUser, deleteUser, getAllUsers } from "../controllers/user-controller.js";
import multer from "multer"


const upload = multer({ storage: multer.memoryStorage() });

const router = Router()

router.get("/users", getAllUsers)
router.post("/users", upload.single("file"), createUser)
router.delete("/users/:id", deleteUser)

export default router