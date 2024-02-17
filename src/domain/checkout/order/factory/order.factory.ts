import OrderItem from "../entity/orderItem/order_item";
import Order from "../entity/order/order";


interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map(
            (item) => {
                const orderItem = new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.productId,
                    item.quantity
                );
                return orderItem;
            }
        );

        const order = new Order(orderProps.id, orderProps.customerId, items);

        return order;
    }
}