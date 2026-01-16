// src/modules/brand/brand.types.ts

export interface CreateBrandInput {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  country?: string;
  isActive?: boolean;
}

export interface UpdateBrandInput {
  name?: string;
  slug?: string;
  description?: string;
  country?: string;
  logo?: string;
  isActive?: boolean;
}

export interface BrandFilters {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}