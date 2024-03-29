export default interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;
    find(id: string): Promise<T | null>;
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}