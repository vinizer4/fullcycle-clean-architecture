import AddressVO from "../../../domain/customer/dto/addressVO";

export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    address: AddressVO;
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address: AddressVO;
}