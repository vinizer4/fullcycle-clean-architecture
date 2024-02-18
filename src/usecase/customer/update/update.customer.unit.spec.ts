import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import AddressVO from "../../../domain/customer/dto/addressVO";
import {InputUpdateCustomerDto} from "./update.customer.dto";
import UpdateCustomerUseCase from "./update.customer.usecase";

const address = new AddressVO("Street", 123, "Zip", "City");
const addressUpdated = new AddressVO("Street updated", 1234, "Zip updated", "City updated");
const customer = CustomerFactory.createWithAddress("John", address);

const input : InputUpdateCustomerDto = {
    id: customer.id,
    name: "John updated",
    address: addressUpdated
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
