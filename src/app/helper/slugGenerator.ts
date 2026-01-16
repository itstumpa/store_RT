

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};


//  file name:( products/product/service.ts)
// import { generateSlug } from "../../helpers/slugGenerator";
//  const slug:string = ${generateSlug(data.name)}-${Math.floor(Math.random()*10000)};