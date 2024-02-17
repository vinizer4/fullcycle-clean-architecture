import CreateCustomerUseCase from "./createCustomerUseCase";

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
        const usecase = new CreateCustomerUseCase(customerRepository)

        const output = {
            id: expect.any(String),
            name: input.name,
            address: input.address
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Street is required"
        );
    });
})