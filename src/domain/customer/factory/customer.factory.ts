import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import AddressVO from "../dto/addressVO";

export default class CustomerFactory {
    public static create(name: string) {
        return new Customer(uuid(), name)
    }

    public static createWithAddress(john: string, address: AddressVO) {
        const customer = new Customer(uuid(), john);
        customer.changeAddress(address);
        return customer;
    }
}