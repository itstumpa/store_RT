// src/modules/product/product.types.ts

import { ProductStatus } from "@prisma/client";

export interface CreateProductInput {
  name: string;
  slug: string;
  author: string;
  basePrice?: number;
  salePrice?: number;
  description?: string;
  isbn?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  pages?: number;
  language?: string;
  status?: ProductStatus;
  isRecommended?: boolean;
  isLatestEdition?: boolean;
  weight?: number;
  dimensions?: string;
  material?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  categoryId: string;
  brandId?: string;


  // Relations
  images?: ProductImageInput[];
  variants?: ProductVariantInput[];
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  author?: string;
  basePrice?: number;
  salePrice?: number;
  description?: string;
  isbn?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  pages?: number;
  language?: string;
  status?: ProductStatus;
  isRecommended?: boolean;
  isLatestEdition?: boolean;
  weight?: number;
  dimensions?: string;
  material?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  categoryId?: string;
  brandId?: string;
  
}

export interface ProductFilters {
  search?: string;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  status?: ProductStatus;
  isRecommended?: boolean;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ProductImageInput {
  url: string;
  altText?: string;
}

export interface ProductVariantInput {
  // name: string;
  price: number;
  sku: string;
  stock: number;
}



