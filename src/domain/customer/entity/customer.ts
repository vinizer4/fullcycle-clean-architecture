// Entidade anemica (sem comportamento)
// Uma entidade por padrão sempre tem que se auto validar e garantir que possua dados válidos
// Uma entidade por padrão sempre tem que ter um id
// Entidade focada em negocio, não em persistencia

// Pare de chamar sua classe usada para persistencia de entidade
// Entidade é uma classe que representa um conceito de negocio

// Complexidade de negocio
// Domain
// - Entity
// - - customer.ts (regra de negocio)

// Complexidade acidental
// Infra - Mundo externo (banco de dados, api, etc)
// - Entity / Model
// - - customer.ts (persistencia)
import AddressVO from "../dto/addressVO";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: AddressVO;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('AddressVO is mandatory to activate customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set address(address: AddressVO) {
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): AddressVO {
        return this._address;
    }

    changeAddress(address: AddressVO) {
        this._address = address;
    }
}