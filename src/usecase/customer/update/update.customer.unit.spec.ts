import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import AddressVO from "../../../domain/customer/dto/addressVO";
import {InputUpdateCustomerDto} from "./update.customer.dto";

const address = new AddressVO("Street", 123, "Zip", "City");
const customer = CustomerFactory.createWithAddress("John", address);

const input : InputUpdateCustomerDto = {
    id: customer.id,
    name: "John updated",
    address: {
        street: "Street updated",
        number: 1234,
        zip: "Zip updated",
        city: "City updated"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        delete: jest.fn(),
    }
}


describe("Unit test for customer update use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
});
