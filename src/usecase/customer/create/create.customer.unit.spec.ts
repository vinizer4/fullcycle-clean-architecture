import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    it ("should create customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUsecase(customerRepository)

        const output = {
            id: expect.any(String),
            name: input.name,
            address: input.address
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })
})