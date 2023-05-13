const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data');
const ordersPath = path.join(dataPath, 'orders.json');

class Order {
  static async create(orderData) {
    try {
      const orders = await this.getOrders();
      const newOrder = {
        id: orders.length + 1,
        ...orderData
      };
      orders.push(newOrder);
      await fs.promises.writeFile(ordersPath, JSON.stringify(orders));
      return newOrder;
    } catch (err) {
      console.error(err);
      throw new Error('Could not create order');
    }
  }

  static async getOrders() {
    try {
      const ordersData = await fs.promises.readFile(ordersPath);
      return JSON.parse(ordersData.toString());
    } catch (err) {
      console.error(err);
      throw new Error('Could not get orders');
    }
  }

  static async getOrderById(id) {
    try {
      const orders = await this.getOrders();
      return orders.find(order => order.id === id);
    } catch (err) {
      console.error(err);
      throw new Error('Could not get order');
    }
  }

  static async updateOrder(id, updates) {
    try {
      const orders = await this.getOrders();
      const orderToUpdate = orders.find(order => order.id === id);
      if (!orderToUpdate) {
        throw new Error('Order not found');
      }
      const updatedOrder = {
        ...orderToUpdate,
        ...updates
      };
      const updatedOrders = orders.map(order =>
        order.id === id ? updatedOrder : order
      );
      await fs.promises.writeFile(ordersPath, JSON.stringify(updatedOrders));
      return updatedOrder;
    } catch (err) {
      console.error(err);
      throw new Error('Could not update order');
    }
  }

  static async deleteOrder(id) {
    try {
      const orders = await this.getOrders();
      const updatedOrders = orders.filter(order => order.id !== id);
      await fs.promises.writeFile(ordersPath, JSON.stringify(updatedOrders));
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Could not delete order');
    }
  }
}

module.exports = Order;
