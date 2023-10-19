import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { categoryController, createCategoryController, deletecategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router()

//routes
//Create category
router.post("/create-category", requireSignIn,isAdmin, createCategoryController)

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

//get All category
router.get("/get-category" , categoryController)

//single category
router.get("/single-category/:slug" ,singleCategoryController)

//Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deletecategoryController)



export default router