import Product from "../product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            const product = new Product("", "name", 10);

        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("id", "", 10);

        }).toThrowError("Name is required")
    })

    it("should throw error when price is negative", () => {

        expect(() => {
            const product = new Product("id", "name", -10);

        }).toThrowError("Price must be positive")
    })

    it("should change name", () => {
        const product = new Product("id", "name", 10);
        product.changeName("new name");
        expect(product.name).toBe("new name");
    })

    it("should change price", () => {
        const product = new Product("id", "name", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    })

});