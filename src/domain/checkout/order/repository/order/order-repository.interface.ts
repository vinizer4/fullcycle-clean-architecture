import RepositoryInterface from "../../../../@shared/repository/repository.interface";
import Order from "../../entity/order/order";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
    getOrdersByUserId(userId: string): Promise<any>;
    getOrderById(orderId: string): Promise<any>;
    createOrder(order: any): Promise<any>;
    updateOrder(orderId: string, order: any): Promise<any>;
    deleteOrder(orderId: string): Promise<any>;
}