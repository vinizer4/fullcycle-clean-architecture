import Order from "../../entity/order/order";
import Customer from "../../../../customer/entity/customer";
import OrderItem from "../../entity/orderItem/order_item";
import { v4 as uuidv4 } from 'uuid';

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
        if(orderItems.length === 0) {
            throw new Error('Order must have at least one item');
        }

        const order = new Order(uuidv4(),customer.id, orderItems);
        customer.addRewardPoints(order.total()/2);
        return order;
    }
}