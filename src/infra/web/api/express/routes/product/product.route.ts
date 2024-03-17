import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../../../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())

    try {
        const { body } = req;
        const productDTO = {
            id: body.id,
            name: body.name,
            price: body.price
        };

        const output = await usecase.execute(productDTO);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository())

    try {
        const output = await usecase.execute({});

        res.send(output)

    } catch (err) {
        res.status(500).send(err);
    }
});