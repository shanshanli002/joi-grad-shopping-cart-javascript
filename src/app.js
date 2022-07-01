import ShoppingCart from "./model/ShoppingCart.js";
import Product from "./model/Product.js";
import Customer from "./model/Customer.js";

const products = [
    new Product(10.0, "DIS_10_PRODUCT1", "Product 1"),
    new Product(180.0, "DIS_15_PRODUCT2", "Product 2")
];

const customer = new Customer("John Doe");

const shoppingCart = new ShoppingCart(customer, products);
const productThree = new Product(30.0, "PRODUCT3", "Product 3");
shoppingCart.addProduct(productThree);

console.log(shoppingCart.displaySummary());

const order = shoppingCart.checkout();

console.log(order.displaySummary());
