// src/modules/product/product.service.ts

import { generateUniqueSlug } from "../../helper/slugGenerator";
import { prisma } from "../../shared/prisma";
import {
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
} from "./product.types";




// CREATE
export const createProduct = async (data: CreateProductInput) => {
    if (!data) throw new Error("Product data is required");
  if (!data.name) throw new Error("Product name is required");
  if (!data.categoryId) throw new Error("Category ID is required");

  

  const slug = data.slug ?? generateUniqueSlug(data.name);

  
  // Nested create for variants with auto SKU generation
  const variantsToCreate = (data.variants || []).map((v, index) => ({
    price: v.price,
    stock: v.stock,
    sku: v.sku ?? `${slug.toUpperCase()}-${Date.now()}-${index + 1}`, // auto-generate if missing
  }));

  return await prisma.product.create({
    data: {
      name: data.name,
      slug,
      author: data.author,
      basePrice: data.basePrice,
      salePrice: data.salePrice,
      description: data.description,
      publisher: data.publisher,
      edition: data.edition,
      publicationYear: data.publicationYear,
      pages: data.pages,
      language: data.language ?? "Bangla",
      status: data.status,
      isRecommended: data.isRecommended ?? false,
      isLatestEdition: data.isLatestEdition ?? false,
      weight: data.weight,
      dimensions: data.dimensions,
      material: data.material,
      isActive: data.isActive,
      isFeatured: data.isFeatured ?? false,
      categoryId: data.categoryId,
      brandId: data.brandId,

      // Nested create for images
      images: {
        create: (data.images || []).map((img) => ({
          url: img.url,
          altText: img.altText,
        })),
      },

      // Nested create for variants
      variants: {
        create: variantsToCreate,
      },
    
    },

    // fixme 
    include: {
      brand: true,
      category: true,
      images: true,
      variants: true,
    },
  });
};

// GET ALL
export const getAllProducts = async (
  filters: ProductFilters,
  fullDetails: boolean = false // new flag to decide summary or full
) => {
  const {
    search,
    brandId,
    categoryId,
    minPrice,
    maxPrice,
    isActive,
    status,
    isRecommended,
    isFeatured,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;
  

  const skip = (page - 1) * limit;

  const where: any = {
    isDeleted: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ];
  }

  if (brandId) where.brandId = brandId;
  if (categoryId) where.categoryId = categoryId;
  if (isActive !== undefined) where.isActive = isActive;
  if (status) where.status = status;
  if (isRecommended !== undefined) where.isRecommended = isRecommended;
  if (isFeatured !== undefined) where.isFeatured = isFeatured;

  if (minPrice || maxPrice) {
    where.OR = [
      {
        basePrice: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      },
      {
        salePrice: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      },
    ];
  }

  const [products, total] = await Promise.all([
  fullDetails
    ? prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          category: true,
          images: true,
          variants: true,
        },
      })
    : prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          name: true,
          slug: true,
          basePrice: true,
          salePrice: true,
          isFeatured: true,
          images: {
            where: { isMain: true },
            select: { url: true },
          },
          brand: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
        },
      }),
  prisma.product.count({ where }),
]);
return { products, total, page, limit };
};

// GET BY ID
export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id, isDeleted: false },
    include: {
      brand: true,
      category: true,
      images: true,
      variants: true,
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
      images: true,
      variants: true,
    },
  });
};

// UPDATE
export const updateProduct = async (id: string, data: UpdateProductInput) => {
  return await prisma.product.update({
    where: { id },
    // fixme 
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.author !== undefined && { author: data.author }),
      ...(data.basePrice !== undefined && { basePrice: data.basePrice }),
      ...(data.salePrice !== undefined && { salePrice: data.salePrice }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.publisher !== undefined && { publisher: data.publisher }),
      ...(data.edition !== undefined && { edition: data.edition }),
      ...(data.publicationYear !== undefined && { publicationYear: data.publicationYear }),
      ...(data.pages !== undefined && { pages: data.pages }),
      ...(data.language !== undefined && { language: data.language }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.isRecommended !== undefined && { isRecommended: data.isRecommended }),
      ...(data.isLatestEdition !== undefined && { isLatestEdition: data.isLatestEdition }),
      ...(data.weight !== undefined && { weight: data.weight }),
      ...(data.dimensions !== undefined && { dimensions: data.dimensions }),
      ...(data.material !== null && { material: data.material }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      ...(data.brandId !== undefined && { brandId: data.brandId }),
    },
    include: {
      brand: true,
      category: true,
      images: true,
      variants: true,
    },
  });
};

// DELETE (Soft delete)
export const deleteProduct = async (id: string) => {
  return await prisma.product.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};

// HARD DELETE (if needed)
export const hardDeleteProduct = async (id: string) => {
  return await prisma.product.delete({
    where: { id },
  });
};