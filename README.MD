
## TO RUN THIS PROJECT
1. npm i
2. npm run dev
3. npx prisma migrate dev --name init
4. npx prisma generate
5. npx prisma  studio
6. 

## IF YOU ADD SOMETHING
1. npx prisma migrate dev --name create table


## POST:

## BRAND
{
"name": "M&G",
"slug": "m-g",
"description": "Well-known brand offering budget-friendly stationery products.",
"country": "China"
}

## CATEGORIES
Top Level:
{
"name": "Gifts",
"slug": "gifts",
"parentId": null
}

Child level:
{
  "name": "Office Supplies",
  "slug": "office-supplies",
  "parentId": "a1b2c3-d4e5-f678-9012"
}


## PRODUCT
 {
  "name": "bed",
  "slug": "bed",
  "basePrice": 550,
  "salePrice": 450,
  "description": "A practical guide to building good habits and breaking bad ones.",
  "author": "James Clear",
  "publisher": "Penguin Random House",
  "edition": "1st",
  "publicationYear": 2018,
  "pages": 320,
  "language": "English",
  "status": "ACTIVE",
  "isFeatured": true,
  "isRecommended": true,
  "isLatestEdition": true,
  "weight": 350,
  "dimensions": "20x15x3 cm",
  "categoryId": "9157be91-b32e-4d01-85b8-6257d3e784f3",
  "brandId": "6f3e11f3-7e9c-46fd-9a3b-6e43b3b4d376",
  "images": [
    {"url": "https://example.com/images/notebook-front.jpg", "altText": "Front view"}
  ],
  "variants": [
    {"price": 45, "sku": "NB-A5-BLUE4", "stock": 50}
  ]
}


  ## ORDER

      {
  "userId": "989f4f47-84aa-4ad1-b0e5-230e8e6a1082",
  "orderNumber": "ORD-2026-003",
  "customerName": "Arif Khan",
  "customerEmail": "arif@example.com",
  "customerPhone": "01898765432",
  "shippingAddress": "Flat 8B, Green Road, Dhaka, Bangladesh",
  "totalAmount": 800,
  "discountAmount": 50,
  "shippingAmount": 30,
  "finalAmount": 780,
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "notes": "Leave at the reception if not home",
  "orderitems": [
    {
      "productId": "7a93a10f-743e-4f4c-b5e3-8f487d803336",
      "quantity": 1,
      "unitPrice": 500,
      "totalPrice": 500
    }
    ],

    "images": [
    {"url": "https://example.com/images/notebook-front.jpg", "altText": "Front view"}
  ],

  "variants": [
    {"name": "Blue Cover", "price": 45, "sku": "NB-A5-BLUE", "stock": 50}
  ]

  
}



```

┌─────────────────────────────────────────────────────────────────┐
│                     API ENDPOINTS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BRANDS                                                         │
│  POST   /api/brands                  Create brand               │
│  GET    /api/brands                  Get all brands             │
│  GET    /api/brands/:id              Get brand by ID            │
│  GET    /api/brands/slug/:slug       Get brand by slug          │
│  PUT    /api/brands/:id              Update brand               │
│  DELETE /api/brands/:id              Delete brand               │
│                                                                 │
│  CATEGORIES                                                     │
│  POST   /api/categories              Create category            │
│  GET    /api/categories              Get all categories         │
│  GET    /api/categories/:id          Get category by ID         │
│  GET    /api/categories/slug/:slug   Get category by slug       │
│  PUT    /api/categories/:id          Update category            │
│  DELETE /api/categories/:id          Delete category            │
│                                                                 │
│  PRODUCTS                                                       │
│  POST   /api/products                Create product             │
│  GET    /api/products                Get all products           │
│  GET    /api/products/:id            Get product by ID          │
│  GET    /api/products/slug/:slug     Get product by slug        │
│  PUT    /api/products/:id            Update product             │
│  DELETE /api/products/:id            Delete product             │
│                                                                 │
│  ORDERS                                                         │
│  POST   /api/orders                  Create order               │
│  GET    /api/orders                  Get all orders             │
│  GET    /api/orders/:id              Get order by ID            │
│  GET    /api/orders/number/:num      Get order by number        │
│  PUT    /api/orders/:id              Update order               │
│  DELETE /api/orders/:id              Delete order               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

```