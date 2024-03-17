import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUseCase {
    private customerRepository : CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll()
        return this.toOutputMapper(customers)
    }

    private toOutputMapper(customer: Customer[]): OutputListCustomerDto  {
        return {
            customers: customer.map(
                (customer) => {
                    return {
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.Address.street,
                            city: customer.Address.city,
                            number: customer.Address.number,
                            zip: customer.Address.zip,
                        }
                    }
                }
            )
        }
    }
}