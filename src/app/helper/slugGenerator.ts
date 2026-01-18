// src/helper/slugGenerator.ts

import { prisma } from '../shared/prisma';

type ModelName = 'product' | 'brand' | 'category'; // Add more as needed

export const generateSlug = async (
  name: string, 
  modelName: ModelName = 'product'
): Promise<string> => {
  let baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await (prisma[modelName] as any).findUnique({
      where: { slug }
    });

    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};