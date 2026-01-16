// src/modules/order/order.service.ts

import { prisma } from '../../shared/prisma';
import { CreateOrderInput, UpdateOrderInput, OrderFilters } from './order.types';

// Helper to generate order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// CREATE
export const createOrder = async (data: CreateOrderInput) => {
  // Ensure there are items
  const orderItems = data.items || data.orderitems;
  if (!orderItems || orderItems.length === 0) {
    throw new Error('Order must have at least one item');
  }
  
    // Calculate totalAmount from items
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  // Calculate final amount
  const finalAmount = data.totalAmount + (data.shippingAmount || 0) - (data.discountAmount || 0);
  
  
  if (!orderItems || orderItems.length === 0) {
    throw new Error('Order must have at least one item');
  }
  
  // Create order
  const orderNumber = generateOrderNumber();
  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
      totalAmount,
      discountAmount: data.discountAmount || 0,
      shippingAmount: data.shippingAmount || 0,
      finalAmount,
      status: data.status || 'PENDING',
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus || 'PENDING',
      trackingNumber: data.trackingNumber,
      notes: data.notes,
      invoiceUrl: data.invoiceUrl,
      userId: data.userId,
      orderitems: {
        create: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice, // automatic calculation
        })),
      },
    },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });

  return order;
};

// GET ALL
export const getAllOrders = async (filters: OrderFilters) => {
  const { 
    status, 
    paymentStatus,
    customerEmail, 
    startDate, 
    endDate, 
    page = 1, 
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters;
  
  const skip = (page - 1) * limit;

  const where: any = {};
  
  if (status) where.status = status;
  if (paymentStatus) where.paymentStatus = paymentStatus;
  if (customerEmail) where.customerEmail = customerEmail;
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = startDate;
    if (endDate) where.createdAt.lte = endDate;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        orderitems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, page, limit };
};

// GET BY ID
export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
      user: true,
      payments: true,
    },
  });
};

// GET BY ORDER NUMBER
export const getOrderByNumber = async (orderNumber: string) => {
  return await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
      user: true,
      payments: true,
    },
  });
};

// UPDATE
export const updateOrder = async (id: string, data: UpdateOrderInput) => {
  // Recalculate finalAmount if any of the relevant fields are being updated
  const updateData: any = { ...data };
  
  if (data.totalAmount !== undefined || data.discountAmount !== undefined || data.shippingAmount !== undefined) {
    const currentOrder = await prisma.order.findUnique({
      where: { id },
      select: { totalAmount: true, discountAmount: true, shippingAmount: true },
    });
    
    if (currentOrder) {
      const totalAmount = data.totalAmount ?? currentOrder.totalAmount;
      const discountAmount = data.discountAmount ?? currentOrder.discountAmount;
      const shippingAmount = data.shippingAmount ?? currentOrder.shippingAmount;
      
      updateData.finalAmount = totalAmount + shippingAmount - discountAmount;
    }
  }
  
  return await prisma.order.update({
    where: { id },
    data: updateData,
    include: {
      orderitems: {
        include: {
          product: true,
        },
      },
      user: true,
      payments: true,
    },
  });
};

// DELETE
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};