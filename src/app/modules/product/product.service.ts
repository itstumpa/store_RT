// src/modules/product/product.service.ts

import { prisma } from '../../shared/prisma';
import { CreateProductInput, UpdateProductInput, ProductFilters } from './product.types';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// CREATE
export const createProduct = async (data: CreateProductInput) => {
  const slug = data.slug || generateSlug(data.title);
  
  return await prisma.product.create({
    data: {
      ...data,
      slug,
    },
    include: {
      brand: true,
      category: true,
    },
  });
};

// GET ALL
export const getAllProducts = async (filters: ProductFilters) => {
  const {
    search,
    brandId,
    categoryId,
    minPrice,
    maxPrice,
    isActive,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = filters;
  
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (brandId) where.brandId = brandId;
  if (categoryId) where.categoryId = categoryId;
  if (isActive !== undefined) where.isActive = isActive;
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        brand: true,
        category: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, limit };
};

// GET BY ID
export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
    },
  });
};

// GET BY SLUG
export const getProductBySlug = async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
    },
  });
};

// UPDATE
export const updateProduct = async (id: string, data: UpdateProductInput) => {
  if (data.title && !data.slug) {
    data.slug = generateSlug(data.title);
  }
  
  return await prisma.product.update({
    where: { id },
    data,
    include: {
      brand: true,
      category: true,
    },
  });
};

// DELETE
export const deleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};