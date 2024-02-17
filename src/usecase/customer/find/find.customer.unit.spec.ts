import Customer from "../../../domain/customer/entity/customer";
import AddressVO from "../../../domain/customer/dto/addressVO";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new AddressVO("Street", 123, "Zip", "City")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}


describe("Test find customer use case", () => {


    it("should find customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        await customerRepository.create(customer);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            },
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
})