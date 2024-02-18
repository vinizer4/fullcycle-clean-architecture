import Customer from "../../../domain/customer/entity/customer";

export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
    customers: Customer[]
}