

// export const generateSlug = (name: string): string => {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// };

import { prisma } from '../shared/prisma';

export const generateUniqueSlug = async (name: string): Promise<string> => {
  let baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let counter = 1;

  // Keep checking until a unique slug is found
  while (true) {
    const existing = await prisma.product.findUnique({
      where: { slug }
    });

    if (!existing) break; // slug is unique
    slug = `${baseSlug}-${counter}`; // add number if duplicate
    counter++;
  }

  return slug;
};

//  file name:( products/product/service.ts)
// import { generateSlug } from "../../helpers/slugGenerator";
//  const slug:string = ${generateSlug(data.name)}-${Math.floor(Math.random()*10000)};