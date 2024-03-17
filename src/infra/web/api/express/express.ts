import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../customer/db/model/customer.model";
import {customerRoute} from "./routes/customer/customer.route";
import {productRoute} from "./routes/product/product.route";
import ProductModel from "../../../product/db/model/product.model";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use('/product', productRoute)

export let sequelize: Sequelize;

async function setupDatabase() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    sequelize.addModels([CustomerModel, ProductModel]);
    await sequelize.sync();
}

setupDatabase()