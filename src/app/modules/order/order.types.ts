// src/modules/order/order.types.ts

import { OrderStatus, PaymentStatus } from '@prisma/client';

export interface OrderItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number; // Make it optional since it can be calculated
}

export interface CreateOrderInput {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  discountAmount?: number;
  shippingAmount?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
  invoiceUrl?: string;
  items?: OrderItemInput[]; // Support both
  orderitems?: OrderItemInput[]; // Support both
}

export interface UpdateOrderInput {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  totalAmount?: number;
  discountAmount?: number;
  shippingAmount?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
  invoiceUrl?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerEmail?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}