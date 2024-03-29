import { Sequelize } from "sequelize-typescript";

import Order from "../../../../domain/checkout/order/entity/order/order";
import OrderItem from "../../../../domain/checkout/order/entity/orderItem/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import AddressVO from "../../../../domain/customer/dto/addressVO";
import Product from "../../../../domain/product/entity/product";

import CustomerModel from "../../../customer/db/model/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";

import ProductModel from "../../../product/db/model/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

import OrderItemModel from "../../db/model/order-item.model";

import OrderModel from "../../db/model/order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite", // definindo o db
            storage: ":memory:", // definindo que irá gravar em memória
            logging: false, // sem login
            sync: { force: true }, // criar as tabelas ao inicializar o db
        });
        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customer = new Customer("123", "Customer 1");
        const address = new AddressVO("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("123", "Product 1", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const order = new Order("123", customer.id, [ordemItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: ordemItem.id,
                    name: ordemItem.name,
                    price: ordemItem.price,
                    quantity: ordemItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ],
        });
    });

    it("should update a order", async () => {
        const customer = new Customer("123", "Customer 1");
        const address = new AddressVO("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("123", "Product 1", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const order = new Order("123", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        let orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ],
        });

        const product2 = new Product("456", "Product 2", 20);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            3
        );
        order.changeItems([orderItem, orderItem2]);

        // atualizando os dados no db utilizando os métodos do repository
        try {
            await sequelize.transaction(async (transaction) => {
                await orderRepository.update(order);
            });
        } catch (err) {
            throw new Error("Database error");
        }

        // consultando no db utilizando os métodos do orm
        orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        // comparando-se os dados
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: product2.id,
                },
            ],
        });
    });

    // se for executada uma busca por id, os atributos devem ser iguais aos do objeto de origem
    it("should find a order", async () => {
        const customer = new Customer("123", "Customer 1");
        const address = new AddressVO("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("123", "Product 1", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const ordemItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );
        const order = new Order("123", customer.id, [ordemItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(order).toStrictEqual(orderResult);
    });

    it("should throw an error when order id is not found", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("456ABC");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customer1 = new Customer("123", "Customer 1");
        const address1 = new AddressVO("Street 1", 1, "Zipcode 1", "City 1");
        customer1.changeAddress(address1);
        const customer2 = new Customer("456", "Customer 2");
        const address2 = new AddressVO("Street 2", 2, "Zipcode 2", "City 2");
        customer2.changeAddress(address2);
        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const product1 = new Product("123", "Product 1", 10);
        const product2 = new Product("456", "Product 2", 20);
        const productRepository = new ProductRepository();
        await productRepository.create(product1);
        await productRepository.create(product2);

        const ordemItem1 = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            2
        );
        const ordemItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            3
        );
        const order1 = new Order("123", customer1.id, [ordemItem1]);
        const order2 = new Order("456", customer2.id, [ordemItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });
});