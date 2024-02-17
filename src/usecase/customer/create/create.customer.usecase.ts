import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import {InputCreateCustomerDto, OutputCreateCustomerDto} from "./create.customer.dto";
import {v4 as uuid} from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import AddressVO from "../../../domain/customer/dto/addressVO";

export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customerId = uuid();
        const address = new AddressVO(input.address.street, input.address.number, input.address.zip, input.address.city);
        const customer = CustomerFactory.createWithAddress(input.name, address);

        await this.customerRepository.create(customer);

        return {
            id: customerId,
            name: input.name,
            address: input.address
        }
    }
}