export interface Advertisment {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  views: number;
  likes: number;
  imageUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const;

type OrderItem = Advertisment & { count: number };

export type Order = {
  price: any;
  id: string;
  status: (typeof OrderStatus)[keyof typeof OrderStatus];
  createdAt: string;
  finishedAt?: string;
  items: Array<OrderItem>;
  deliveryWay: string;
  total: number;
};
