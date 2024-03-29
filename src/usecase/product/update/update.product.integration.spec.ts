import { Sequelize } from "sequelize-typescript";

import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infra/product/db/model/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product 1 Updated",
            price: 200,
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});