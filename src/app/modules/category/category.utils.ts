export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  children: CategoryNode[];
};

export const buildCategoryTree = (categories: any[], parentId: string | null = null): CategoryNode[] => {
  return categories
    .filter(cat => cat.parentId === parentId)
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      children: buildCategoryTree(categories, cat.id),
    }));
};
