import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../db/model/product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe('Product repository unit tests', () => {

    let sequelizeMock: Sequelize;

    beforeEach( async () => {
        sequelizeMock = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync : { force: true }
        });
        sequelizeMock.addModels([ProductModel]);
        await sequelizeMock.sync();
    });

    afterEach( async () => {
        await sequelizeMock.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 'Product 1', 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: 'Product 1',
            price: 10
        })
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 'Product 1', 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: 'Product 1',
            price: 100
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModelUpdated = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModelUpdated.toJSON()).toStrictEqual({
            id: "1",
            name: 'Product 2',
            price: 200
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 'Product 1', 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        const productFinded = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: productFinded.id,
            name: productFinded.name,
            price: productFinded.price
        });

        expect(productFinded).toStrictEqual(product);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", 'Product 1', 10);
        const product2 = new Product("2", 'Product 2', 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2];

        expect(products).toEqual(foundProducts);
    });

    it("should delete a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", 'Product 1', 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: 'Product 1',
            price: 10
        });

        await productRepository.delete("1");

        const productModelDeleted = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModelDeleted).toBeNull();
    });
});