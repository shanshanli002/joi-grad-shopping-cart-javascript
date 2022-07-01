import Customer from "../../src/model/Customer.js";
import Product from "../../src/model/Product.js";
import ShoppingCart from "../../src/model/ShoppingCart.js";

describe("Shopping cart should checkout", () => {

    it("Should calculate correct total and loyalty points for 10% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        
        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(90);
        expect(order.loyaltyPoints).toBe(10);
    });

    it("Should calculate round the total to nearest cent after discount it applied", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100.11, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        
        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(90.10); //discount of 10.01
    });

    it("Should calculate correct total and loyalty points for 15% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(150, "DIS_15_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(127.5);
        expect(order.loyaltyPoints).toBe(10);
    });
    it("Should calculate correct total and loyalty points for 20% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "DIS_20_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(80);
        expect(order.loyaltyPoints).toBe(5);
    });

    it("Should calculate correct total and loyalty points for non discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(100);
        expect(order.loyaltyPoints).toBe(20);
    });

    it("should not give one item free if using code 'BULK_BUY_2_GET_1' and only one item", () => {
        const customer = new Customer("Test customer");
        const products = [
            new Product(100, "TestProduct", "Test product")
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(100);
        // expect(order.loyaltyPoints).toBe(20);
    })

    it("should give one item free if using code 'BULK_BUY_2_GET_1' and three items", () => {
        const customer = new Customer("Test customer");
        const products = [
            new Product(100, "BULK_BUY_2_GET_1_x", "Test product 1"),
            new Product(80, "BULK_BUY_2_GET_1_x", "Test product 2"),
            new Product(90, "BULK_BUY_2_GET_1_x", "Test product 3")
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(190);
        // expect(order.loyaltyPoints).toBe(20);
    })
});

describe("Shopping cart should modify products", () => {
    it("Should add another product to the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [new Product(100, "TestProductOne", "Test Product One")];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.addProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ]);
    });

    it("Should remove a product from the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.removeProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One")
        ]);
    });
});
