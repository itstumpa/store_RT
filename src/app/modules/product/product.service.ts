import makeSlug from "../../../utils/helper";
import { prisma } from "../../../utils/prisma";
import { CreateProductInput } from "./product.types";

export async function createProduct(data: CreateProductInput) {
  const productSlug = makeSlug(data.name);

  return prisma.$transaction(async (tx) => {
    return tx.product.create({
      data: {
        name: data.name,
        slug: productSlug,
        basePrice: data.basePrice,
        salePrice: data.salePrice,
        description: data.description,
        ingredients: data.ingredients,
        nutritionInfo: data.nutritionInfo,
        brand: data.brand,
        expiryDays: data.expiryDays,
        categoryId: data.categoryId,

        images: {
          create: data.images?.map((img) => ({
            url: img.url,
            isMain: img.isMain ?? false,
          })),
        },

        variants: {
          create: await Promise.all(
            data.variants.map(async (variant) => ({
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock,
              isDefault: variant.isDefault ?? false,

              attributes: {
                create: await Promise.all(
                  variant.attributes.map(async (attr) => {
                    const attribute = await tx.attribute.upsert({
                      where: { name: attr.attribute },
                      update: {},
                      create: { name: attr.attribute },
                    });

                    const attributeValue = await tx.attributeValue.upsert({
                      where: {
                        attributeId_value: {
                          attributeId: attribute.id,
                          value: attr.value,
                        },
                      },
                      update: {},
                      create: {
                        attributeId: attribute.id,
                        value: attr.value,
                      },
                    });

                    return {
                      attributeValueId: attributeValue.id,
                    };
                  })
                ),
              },
            }))
          ),
        },
      },

      include: {
        images: true,
        variants: {
          include: {
            attributes: {
              include: {
                attributeValue: {
                  include: {
                    attribute: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  });
}

export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      images: true,
      // variants: {
      //   include: {
      //     attributes: {
      //       include: {
      //         attributeValue: {
      //           include: {
      //             attribute: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    },
  });
}

export const getProductsBySlug = (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      variants: {
        include: {
          attributes: {
            include: {
              attributeValue: {
                include: {
                  attribute: true,
                },
              },
            },
          },
        },
      },
    },
  });
};