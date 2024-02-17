import Order from "../../../../domain/checkout/order/entity/order/order";
import OrderModel from "../../db/model/order.model";
import OrderItemModel from "../../db/model/order-item.model";
import OrderItem from "../../../../domain/checkout/order/entity/orderItem/order_item";


interface OrderRepositoryInterface {
}

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.destroy({ where: { id: entity.id } });

        await this.create(entity);
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id: id },
                include: ["items"],
                rejectOnEmpty: true,
            });

            const items = orderModel.items.map(
                (orderItemModel) => {
                    const orderItem = new OrderItem(
                        orderItemModel.id,
                        orderItemModel.name,
                        orderItemModel.price,
                        orderItemModel.product_id,
                        orderItemModel.quantity
                    );
                    return orderItem;
                }
            );

            const order = new Order(id, orderModel.customer_id, items);

            return order;
        } catch (error) {
            throw new Error("Order not found");
        }
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });

        const orders = orderModels.map(
            (orderModel) => {
                const items = orderModel.items.map(
                    (orderItemModel) => {
                        const orderItem = new OrderItem(
                            orderItemModel.id,
                            orderItemModel.name,
                            orderItemModel.price,
                            orderItemModel.product_id,
                            orderItemModel.quantity
                        );
                        return orderItem;
                    }
                );

                const order = new Order(orderModel.id, orderModel.customer_id, items);

                return order;
            }
        );

        return orders;
    }
}