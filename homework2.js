/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/


class Ingredient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.ingredientsToPrepare = {
            'tomato': 2,
            'spaghetti': 1
        }
    }
}

class MashedPotatoes extends Dish {
    constructor() {
        super(8);
        this.ingredientsToPrepare = {
            'potato': 1
        }
    }
}

class Steak extends Dish {
    constructor() {
        super(7);
        this.ingredientsToPrepare = {
            'meat': 1
        }
    }
}

class SteakAndFries extends Dish {
    constructor() {
        super(9);
        this.ingredientsToPrepare = {
            'potato': 1,
            'meat': 1
        }
    }
}

class Kitchen {
    constructor() {
        this.kitchenIngredients = {};
        this.orderedDishes = [];
    }

    addToFridge(dishIngredients) {
        for (const ingredient of dishIngredients) {
            if (ingredient.name in this.kitchenIngredients) {
                this.kitchenIngredients[ingredient.name] += ingredient.amount;
            } else {
                this.kitchenIngredients[ingredient.name] = ingredient.amount
            }
        }
    }

    order(orderedDish) {
        const requiredIngredient = orderedDish.ingredientsToPrepare;
        let ableToBePrepared = true;


        // Check if there is enough ingredients
        for (const [ingredient, amount] of Object.entries(requiredIngredient)) {
            if (!(ingredient in this.kitchenIngredients) || this.kitchenIngredients[ingredient] - amount < 0) {
                ableToBePrepared = false;
            }
        }

        if (!ableToBePrepared) {
            throw 'Not enough ingredients in the fridge.';
        }

        // Remove used ingredients after successful order
        for (const [ingredient, amount] of Object.entries(requiredIngredient)) {
            this.kitchenIngredients[ingredient] -= amount;
        }

        this.orderedDishes.push(orderedDish);
    }

    async cookFastestOrder() {
        this.orderedDishes.sort(function(dish1, dish2) {
            return dish2.cookingTime - dish1.cookingTime;
        })

        const fastestOrder = this.orderedDishes.pop();
        await fastestOrder.cook();

        return fastestOrder;
    }

    async cookAllOrders() {
        for (const order of this.orderedDishes) {
            await order.cook()
        }

        return this.orderedDishes
    }
}


const test = async () => {
    try {
        const kitchen = new Kitchen();
        kitchen.addToFridge([
            new Ingredient('potato', 1),
            new Ingredient('spaghetti', 1),
            new Ingredient('meat', 3),
            new Ingredient('tomato', 2)
        ])
    
        kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
        kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
        kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)
        
    
        // Feel free to experiment with various dishes and ingredients
    
        await kitchen.cookFastestOrder(); // Returns fastest dish to make
        await kitchen.cookAllOrders(); // Returns two dishes in array
    
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingredients in fridge
    } catch (err) {
        console.log(err)
    }
}

test();
