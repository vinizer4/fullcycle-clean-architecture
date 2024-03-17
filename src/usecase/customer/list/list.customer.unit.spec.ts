import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import AddressVO from "../../../domain/customer/dto/addressVO";
import ListCustomerUseCase from "./list.customer.usecase";

const address1 = new AddressVO("Street 1", 1, "Zip", "City")
const address2 = new AddressVO("Street 2", 2, "Zip", "City")
const customer1 = CustomerFactory.createWithAddress("Customer 1", address1)
const customer2 = CustomerFactory.createWithAddress("Customer 2", address2)

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue(Promise.resolve([customer1, customer2]))
    }
}

describe("Unit test for list customer use case", () => {

    it("should list a customers", async () => {
        const repository = MockRepository()
        const usecase = new ListCustomerUseCase(repository)

        const output = await usecase.execute({})

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].name).toBe(customer1.name)
        expect(output.customers[1].name).toBe(customer2.name)
        expect(output.customers[0].address.street).toBe(customer1.Address.street)
        expect(output.customers[1].address.street).toBe(customer2.Address.street)
        expect(output.customers.length).toBe(2)
    })
})