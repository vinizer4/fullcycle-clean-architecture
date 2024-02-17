import Customer from "./customer";
import AddressVO from "../dto/addressVO";

describe("Customer unit test", () => {

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "test");
        }).toThrowError("Id is required");
    });

    it("should create a customer", () => {
        let customer = new Customer("1", "test");
        expect(customer.id).toBe("1");
        expect(customer.name).toBe("test");
    });

    it("should change customer name", () => {
        let customer = new Customer("1", "test");
        customer.changeName("test2");
        expect(customer.name).toBe("test2");
    });

    it("should throw error when activate customer without address", () => {
        expect(() => {
            let customer = new Customer("1", "test");
            customer.activate();
        }).toThrowError("AddressVO is mandatory to activate customer");
    });

    it("should throw error when activate customer without address", () => {
        expect(() => {
            let customer = new Customer("1", "test");
            customer.activate();
        }).toThrowError("AddressVO is mandatory to activate customer");
    });

    it("should activate customer", () => {
        let customer = new Customer("1", "test");
        let address = new AddressVO("street", 1, "city", "zip");
        customer.address = address;

        customer.activate();
        expect(customer.isActive).toBe(true);
    });

    it("should deactivate customer", () => {
        let customer = new Customer("1", "test");
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });

    it("should throw error when street is empty", () => {
        expect(() => {
            let address = new AddressVO("", 1, "city", "zip");
        }).toThrowError("Street is required");
    });

    it("should throw error when number is empty", () => {
        expect(() => {
            let address = new AddressVO("street", 0, "city", "zip");
        }).toThrowError("Number is required");
    });

    it("should throw error when city is empty", () => {
        expect(() => {
            let address = new AddressVO("street", 1, "zip", "");
        }).toThrowError("City is required");
    });

    it("should throw error when zip is empty", () => {
        expect(() => {
            let address = new AddressVO("street", 1, "", "city");
        }).toThrowError("ZipCode is required");
    });

    it("should create address", () => {
        let address = new AddressVO("street", 1, "zip", "city");
        expect(address.toString()).toBe("street, 1, city, zip");
    });

    it("should throw error when change name to empty", () => {
        expect(() => {
            let customer = new Customer("1", "test");
            customer.changeName("");
        }).toThrowError("Name is required");
    });

    it("should add reward points", () => {
        let customer = new Customer("1", "test");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});