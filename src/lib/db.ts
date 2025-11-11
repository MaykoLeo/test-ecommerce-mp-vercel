import type {Order} from './types';

// This is a mock database for demonstration purposes.
// In a real application, you would use a proper database like PostgreSQL, an ORM like Prisma, etc.

let orders: Order[] = [];

// In-memory store for preferences
const preferences = new Map<string, any>();

export const db = {
  order: {
    create: async (
      data: Omit<Order, 'id' | 'createdAt' | 'status'>
    ): Promise<Order> => {
      const newOrder: Order = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date(),
        status: 'pending',
      };
      orders.push(newOrder);
      return newOrder;
    },
    findById: async (id: string): Promise<Order | null> => {
      const order = orders.find((o) => o.id === id);
      return order || null;
    },
    updateStatus: async (
      id: string,
      status: 'paid' | 'shipped' | 'pending'
    ): Promise<Order | null> => {
      const orderIndex = orders.findIndex((o) => o.id === id);
      if (orderIndex === -1) return null;

      orders[orderIndex].status = status;
      return orders[orderIndex];
    },
  },
  preference: {
    create: async (orderId: string, preferenceId: string) => {
      preferences.set(orderId, preferenceId);
    },
    findByOrderId: async (orderId: string) => {
      return preferences.get(orderId);
    },
  },
};
