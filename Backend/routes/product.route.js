import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/admin.js'

const productRouter = Router()

productRouter.post("/create", auth, admin, createProductController)
productRouter.post("/get", getProductController)
productRouter.post("/get-product-by-category", getProductByCategory)
productRouter.post("/get-product-by-category-and-subCategory", getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details", getProductDetails)
productRouter.put("/update-product-details",auth,admin,  updateProductDetails)
productRouter.delete("/delete-product", auth, admin, deleteProductController)
productRouter.post("/search-product", searchProduct)


export default productRouter