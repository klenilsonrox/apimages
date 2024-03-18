import { Router } from "express";
import { createUser, deleteUser, getAllUsers } from "../controllers/user-controller.js";
import { upload, } from "../config/uploadFile.js";
import { uploadImage } from "../services/firebase.js";

const router = Router()


router.get("/users", getAllUsers)
router.post("/users", upload.single("file"),uploadImage, createUser)
router.delete("/users/:id", deleteUser)

export default router