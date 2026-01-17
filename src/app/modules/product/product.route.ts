// src/modules/product/product.routes.ts

import { Router } from 'express';
import * as productController from './product.controller';

const router = Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);
router.put('/:id', productController.updateProduct);
router.patch("/:id", productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;