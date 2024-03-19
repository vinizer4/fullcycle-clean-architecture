import ProductInterface from "./interface/product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product extends Entity implements ProductInterface {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                message: 'Id is required',
                context: 'product'
            });
        }
        if (this._name.length === 0) {
            this.notification.addError({
                message: 'Name is required',
                context: 'product'
            });
        }
        if (this._price < 0) {
            this.notification.addError({
                message: 'Price must be positive',
                context: 'product'
            });
        }
        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}