import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository : CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll()
        return { customers }
    }
}