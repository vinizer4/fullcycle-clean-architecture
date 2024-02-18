import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputUpdateCustomerDto, OutputUpdateCustomerDto} from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(input.address);

        await this.customerRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: customer.Address
        }
    }
}