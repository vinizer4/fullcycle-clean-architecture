import CustomerFactory from "../customer.factory";
import AddressVO from "../../dto/addressVO";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    })

    it("should create a customer with address", () => {
        const address = new AddressVO("street", 1, "13330-250", "São Paulo");

        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
    })
});