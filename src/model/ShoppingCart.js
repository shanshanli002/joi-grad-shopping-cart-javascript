import _ from "lodash";
import Order from "./Order.js";

export default class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;
        
        this.products.forEach(product => {
            let discount = 0;
            if (product.code.startsWith("DIS_10")) {
                discount = Math.round((product.price * 0.1)*100)/100;
                loyaltyPointsEarned += product.price / 10;
            } else if (product.code.startsWith("DIS_15")) {
                discount = Math.round((product.price * 0.15)*100)/100;
                loyaltyPointsEarned += product.price / 15;
            } else if (product.code.startsWith("DIS_20")) {
                discount = Math.round((product.price * 0.2)*100)/100;
                loyaltyPointsEarned += product.price / 20;
            } else {
                loyaltyPointsEarned += product.price / 5;
            }

            totalPrice += product.price - discount;
        });

        return new Order(totalPrice, loyaltyPointsEarned);
    };

    displaySummary = () =>  {
        return "Customer: " + this.customer.name + "\n" + 
            "Bought:  \n" + this.products.map(p => "- " + p.name + ", " + p.price).join('\n');
    }
};
