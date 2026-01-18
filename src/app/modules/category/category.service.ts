// src/modules/category/category.service.ts

import { prisma } from '../../shared/prisma';
import { CreateCategoryInput, UpdateCategoryInput, CategoryFilters } from './category.types';
import { generateSlug } from "../../helper/slugGenerator";


// CREATE
export const createCategory = async (data: CreateCategoryInput) => {
  if (!data) {
    throw new Error("Category data is required");
  }

  if (!data.name) {
    throw new Error("Category name is required");
  }

  const slug = data.slug ?? await generateSlug(data.name, 'category');
const existing = await prisma.category.findUnique({
  where: { slug },
});

if (existing) {
  throw new Error('Category already exists');
}

  return prisma.category.create({
    data: {
      name: data.name,
      slug,
      parentId: data.parentId,
    },
  });
};


// GET ALL
export const getAllCategories = async (filters: CategoryFilters) => {
  const { search, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const where: any = {
    isDeleted: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.count({ where }),
  ]);

  return { categories, total, page, limit };
};



// GET BY ID
export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
    },
  });
};

// GET BY SLUG
export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findFirst({
    where: {
      slug,
      isDeleted: false,
    },
    include: {
      parent: true,
      children: true,
    },
  });
};


// UPDATE
export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  if (data.name && !data.slug) {
    data.slug = await generateSlug(data.name);
  }
  
  return await prisma.category.update({
    where: { id },
    data,
  });
};

// DELETE
// export const deleteCategory = async (id: string) => {
//   return await prisma.category.delete({
//     where: { id },
//   });
// };

// SOFT DELETE
export const deleteCategory = async (id: string) => {
  return prisma.category.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};


