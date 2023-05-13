import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import config from "../config.js";

const ordersFilePath = path.join(process.cwd(), "data", "orders.json");

export function getOrders(req, res) {
  try {
    const data = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(data);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export function getOrder(req, res) {
  try {
    const data = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(data);
    const order = orders.find((order) => order.id === req.params.id);
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.json(order);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export function createOrder(req, res) {
  try {
    const data = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(data);
    const newOrder = { id: uuidv4(), ...req.body };
    orders.push(newOrder);
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders));
    res.json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export function updateOrder(req, res) {
  try {
    const data = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(data);
    const orderIndex = orders.findIndex((order) => order.id === req.params.id);
    if (orderIndex === -1) {
      res.status(404).send("Order not found");
    } else {
      const updatedOrder = { id: req.params.id, ...req.body };
      orders[orderIndex] = updatedOrder;
      fs.writeFileSync(ordersFilePath, JSON.stringify(orders));
      res.json(updatedOrder);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export function deleteOrder(req, res) {
  try {
    const data = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(data);
    const orderIndex = orders.findIndex((order) => order.id === req.params.id);
    if (orderIndex === -1) {
      res.status(404).send("Order not found");
    } else {
      const deletedOrder = orders.splice(orderIndex, 1)[0];
      fs.writeFileSync(ordersFilePath, JSON.stringify(orders));
      res.json(deletedOrder);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
