// src/modules/product/product.controller.ts

import { Request, Response } from 'express';
import * as productService from './product.service';
import { catchAsync, sendResponse } from '../../shared';
import { CreateProductInput, UpdateProductInput } from './product.types';

// CREATE
export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body as CreateProductInput);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// GET ALL
export const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const {
    search,
    brandId,
    categoryId,
    minPrice,
    maxPrice,
    isActive,
    page,
    limit,
    sortBy,
    sortOrder,
  } = req.query;
  
  const result = await productService.getAllProducts({
    search: search as string,
    brandId: brandId as string,
    categoryId: categoryId as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    sortBy: sortBy as string,
    sortOrder: sortOrder as 'asc' | 'desc',
  });
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products fetched successfully',
    data: result.products,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
    },
  });
});

// GET BY ID
export const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  
  if (!product) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Product not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

// GET BY SLUG
export const getProductBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  
  if (!product) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Product not found',
    });
  }
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

// UPDATE
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.updateProduct(id, req.body as UpdateProductInput);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// DELETE
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
  });
});