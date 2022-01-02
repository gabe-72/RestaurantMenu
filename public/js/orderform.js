let restaurant, cart = {restaurant: "", restaurantID: null, items: {}, subtotal: 0, tax: 0, delivery_fee: 0, total: 0}, selected = 0;

/**
 * Submits the order details to the server, then clears the cart
 */
async function submitBtn() {
	cart.restaurant = restaurant.name;
	cart.restaurantID = restaurant.id;
	cart.tax = cart.subtotal * 0.1;
	cart.delivery_fee = restaurant.delivery_fee;

	const res = await fetch("/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cart)
	});
	if (!res.ok) {
		alert("Something went wrong, please try again later");
		window.location.reload();
		return;
	}
	alert("Order placed!");
	reset();
}

// restaurant information
// will be moved to the database
let aragorn = {
	id: 0,
	name: "Aragorn's Orc BBQ",
	min_order: 20,
	delivery_fee: 5,
	menu: {
		"Appetizers": {
			0: {
				name: "Orc feet",
				description: "Seasoned and grilled over an open flame.",
				price: 5.50
			},
			1: {
				name: "Pickled Orc fingers",
				description: "Served with warm bread, 5 per order.",
				price: 4.00
			},
			2: { //Thank you Kiratchii
				name: "Sauron's Lava Soup",
				description: "It's just really spicy water.",
				price: 7.50
			},
			3: {
				name: "Eowyn's (In)Famous Stew",
				description: "Bet you can't eat it all.",
				price: 0.50
			},
			4: {
				name: "The 9 rings of men.",
				description: "The finest of onion rings served with 9 different dipping sauces.",
				price: 14.50
			}
		},
		"Combos": {
			5: {
				name: "Buying the Farm",
				description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
				price: 15.99
			},
			6: {
				name: "The Black Gate Box",
				description: "Lots of unidentified pieces. Serves 50.",
				price: 65.00
			},
			7: {//Thanks to M_Sabeyon
				name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
				description: "Smeagol's favorite.",
				price: 15.75
			},
			8: { //Thanks Shar[TA]
				name: "Morgoth's Scorched Burgers with Chips",
				description: "Blackened beyond recognition.",
				price: 13.33
				
			},
			10: {
				name: "Slab of Lurtz Meat with Greens.",
				description: "Get it while supplies last.",
				price: 17.50
			},
			11: {
				name: "Rangers Field Feast.",
				description: "Is it chicken? Is it rabbit? Or...",
				price: 5.99
			}
		},
		"Drinks": {
			12: {
				name: "Orc's Blood Mead",
				description: "It's actually raspberries - Orc's blood would be gross.",
				price: 5.99
			},
			13: {
				name: "Gondorian Grenache",
				description: "A fine rose wine.",
				price: 7.99
			},
			14: {
				name: "Mordor Mourvedre",
				description: "A less-fine rose wine.",
				price: 5.99
			}
		}	
	}
}

let legolas = {
	id: 1,
	name: "Lembas by Legolas",
	min_order: 15,
	delivery_fee: 3.99,
	menu: {
		"Lembas": {
			0: {
				name: "Single",
				description: "One piece of lembas.",
				price: 3
			},
			1: {
				name: "Double",
				description: "Two pieces of lembas.",
				price: 5.50
			},
			2: { 
				name: "Triple",
				description: "Three pieces, which should be more than enough.",
				price: 8.00
			}
		},
		"Combos": {
			3: {
				name: "Second Breakfast",
				description: "Two pieces of lembas with honey.",
				price: 7.50
			},
			4: {
				name: "There and Back Again",
				description: "All you need for a long journey - 6 pieces of lembas, salted pork, and a flagon of wine.",
				price: 25.99
			},
			5: {
				name: "Best Friends Forever",
				description: "Lembas and a heavy stout.",
				price: 6.60
			}
		}
	}
}

let frodo = {
	id: 2,
	name: "Frodo's Flapjacks",
	min_order: 35,
	delivery_fee: 6,
	menu: {
		"Breakfast": {
			0: {
				name: "Hobbit Hash",
				description: "Five flapjacks, potatoes, leeks, garlic, cheese.",
				price: 9.00
			},
			1: {
				name: "The Full Flapjack Breakfast",
				description: "Eight flapjacks, two sausages, 3 eggs, 4 slices of bacon, beans, and a coffee.",
				price: 14.00
			},
			2: { 
				name: "Southfarthing Slammer",
				description: "15 flapjacks and 2 pints of syrup.",
				price: 12.00
			}
			
		},
		"Second Breakfast": {
			3: {
				name: "Beorning Breakfast",
				description: "6 flapjacks smothers in honey.",
				price: 7.50
			},
			4: {
				name: "Shire Strawberry Special",
				description: "6 flapjacks and a hearty serving of strawberry jam.",
				price: 8
			},
			5: {
				name: "Buckland Blackberry Breakfast",
				description: "6 flapjacks covered in fresh blackberries. Served with a large side of sausage.",
				price: 14.99
			}
		},
		"Elevenses": {
			6: {
				name: "Lembas",
				description: "Three pieces of traditional Elvish Waybread",
				price: 7.70
			},
			7: {
				name: "Muffins of the Marish",
				description: "A variety of 8 different types of muffins, served with tea.",
				price: 9.00
			},
			8: {
				name: "Hasty Hobbit Hash",
				description: "Potatoes with onions and cheese. Served with coffee.",
				price: 5.00
			}
		},
		"Luncheon": {
			9: {
				name: "Shepherd's Pie",
				description: "A classic. Includes 3 pies.",
				price: 15.99
			},
			10: {
				name: "Roast Pork",
				description: "An entire pig slow-roasted over a fire.",
				price: 27.99
			},
			11: {
				name: "Fish and Chips",
				description: "Fish - fried. Chips - nice and crispy.",
				price: 5.99
			}
		},
		"Afternoon Tea": {
			12: {
				name: "Tea",
				description: "Served with sugar and cream.",
				price: 3
			},
			13: {
				name: "Coffee",
				description: "Served with sugar and cream.",
				price: 3.50
			},
			14: {
				name: "Cookies and Cream",
				description: "A dozen cookies served with a vat of cream.",
				price: 15.99
			},
			15: {
				name: "Mixed Berry Pie",
				description: "Fresh baked daily.",
				price: 7.00
			}
		},
		"Dinner": {
			16: {
				name: "Po-ta-to Platter",
				description: "Boiled. Mashed. Stuck in a stew.",
				price: 6
			},
			17: {
				name: "Bree and Apple",
				description: "One wheel of brie with slices of apple.",
				price: 7.99
			},
			18: {
				name: "Maggot's Mushroom Mashup",
				description: "It sounds disgusting, but its pretty good",
				price: 6.50
			},
			19: {
				name: "Fresh Baked Bread",
				description: "A whole loaf of the finest bread the Shire has to offer.",
				price: 6
			},
			20: {
				name: "Pint of Ale",
				description: "Yes, it comes in pints.",
				price: 5
			}
		},
		"Supper": {
			21: {
				name: "Sausage Sandwich",
				description: "Six whole sausages served on a loaf of bread. Covered in onions, mushrooms and gravy.",
				price: 15.99
			},
			22: {
				name: "Shire Supper",
				description: "End the day as you started it, with a dozen flapjacks, 5 eggs, 3 sausages, 7 pieces of bacon, and a pint of ale.",
				price: 37.99
			}
		}
	}
}

let restaurants = [aragorn, legolas, frodo];

function init() {
	document.getElementById("restaurants").addEventListener("change", selection);
	document.getElementById("submit").addEventListener("click", submitBtn);
	loadSelectMenu();
	selection(); // load the first restaurant
	loadSummary();
}

// initialize the restaurant list
function loadSelectMenu() {
	for (let i = 0; i < restaurants.length; ++i) {
		let node = document.createElement("option");
		node.text = restaurants[i].name;
		node.value = i;
		document.getElementById("restaurants").appendChild(node);
	}
}

/**
 * Event handler for the select menu for the restaurants
 * loads the menu after selection is made
 */
function selection() {
	if (Object.keys(cart.items).length === 0 || confirm("The current order will be cleared. Proceed?")) {
		selected = document.getElementById("restaurants").value; // update the selected restaurant
		reset();

		restaurant = restaurants[selected];
		loadMenu();
	} else {
		document.getElementById("restaurants").value = selected;
	}
}

/**
 * Loads the menu details of the selected restaurant onto the page
 */
function loadMenu() {
	let items = document.getElementById("items");
	items.innerHTML = "";

	for (let key in restaurant.menu) {
		let menu = restaurant.menu;

		let heading = document.createElement("h2");
		heading.textContent = key;
		heading.id = key;

		items.appendChild(heading);
		
		let dishes = document.createElement("div");
		dishes.className = "dishList";
		for (let dish in menu[key]) {
			dishes.appendChild(dishChoice(menu[key][dish], dish));
		}
		items.appendChild(dishes);
	}
}

/**
 * Creates a div which contains information about a single item in the menu
 * 
 * @param {Object} dish - The dish object to create a div from
 * @param {int} id - The id of the dish
 * 
 * @returns {HTMLDivElement} - The resulting div
 */
function dishChoice(dish, id) {
	let out = document.createElement("div");
	out.className = "item la";

	// creating the name, description and price elements
	let name = document.createElement("div");
	let description = document.createElement("div");
	let price = document.createElement("div");
	name.className = "dishName";
	description.className = "dishDesc";
  price.className = "dishPrice";

	name.textContent = dish.name;
	description.textContent = dish.description;
	price.textContent = "CA$ " + Number(dish.price).toFixed(2);

	// creating the add button
	let addBtn = document.createElement("button");
	addBtn.className = "smallBtn";
	addBtn.name = dish.name;
	addBtn.value = dish.price;
	addBtn.dataset.id = id;
	addBtn.textContent = "+";
	addBtn.addEventListener("click", addRemoveBtn("add"));

	name.appendChild(addBtn);

	// appending the elements
	out.appendChild(name);
	out.appendChild(description);
	out.appendChild(price);

	return out;
}

/**
 * Renders the order summary
 */
function loadSummary() {
	let summary = document.getElementById("cartItems");
	summary.innerHTML = "";

	// add the dishes in the cart to the div and calculate the subtotal
	for (let dishId in cart.items) {
		let dish = cartDish(dishId);
		summary.appendChild(dish);
	}

	if (cart.subtotal != 0) {
		let tax = cart.subtotal * 0.1, delivery = restaurant.delivery_fee;
		cart.total = cart.subtotal + tax + delivery; // calculate total

		let totalText = document.createElement("div");
		totalText.className = "summaryText";

		totalText.innerHTML = `Subtotal: $ ${Number(cart.subtotal).toFixed(2)}<br>`;
		totalText.innerHTML += `Tax: $ ${Number(tax).toFixed(2)}<br>`;
		totalText.innerHTML += `Delivery charge: $ ${Number(delivery).toFixed(2)}<br>`;
		totalText.innerHTML += `Total: $ ${Number(cart.total).toFixed(2)}<br>`;

		// if subtotal is less than min order, set button invisible, otherwise visible
		if (cart.subtotal < restaurant.min_order) {
			totalText.innerHTML += `<br><b>You must add \$${Number(restaurant.min_order - cart.subtotal).toFixed(2)} more to your order before submitting</b>`;
			document.getElementById("submit").className = "invisible";
		} else {
			document.getElementById("submit").className = "visible";
		}
		summary.appendChild(totalText);
	} else { // nothing in the cart
		document.getElementById("submit").className = "invisible";
	}
}

/**
 * Creates a div which contains information about a single item in the cart
 * 
 * @param {Number} dishId - id of the dish to be displayed
 * 
 * @returns {HTMLDivElement} - The resulting div
 */
function cartDish(dishId) {
	let dish = document.createElement("div");
	dish.className = "item";

	// create elements
	let name = document.createElement("div");
	let price = document.createElement("div");
	name.className = "dishName";
	price.className = "dishPrice";

	name.textContent = cart.items[dishId].name + " x " + cart.items[dishId].quantity;
	price.textContent = "CA$ " + Number(cart.items[dishId].price * cart.items[dishId].quantity).toFixed(2);

	// create remove button
	let removeBtn = document.createElement("button");
	removeBtn.className = "smallBtn";
	removeBtn.name = cart.items[dishId].name;
	removeBtn.dataset.id = dishId;
	removeBtn.textContent = "-";
	removeBtn.addEventListener("click", addRemoveBtn("remove"));

	name.appendChild(removeBtn);

	dish.appendChild(name);
	dish.appendChild(price);

	return dish;
}

/**
 * Renders the navigation menu with links to the subsection of the menu
 */
function loadNavigation() {
	let navLinks = document.getElementById("menu-links");
	navLinks.className = "dishList";
	navLinks.innerHTML = "";

	for (let menuName in restaurant.menu) {
		let navLink = document.createElement("a");
		navLink.textContent = menuName;
		navLink.href = `#${menuName}`;

		navLinks.appendChild(navLink);
	}
}

/**
 * Returns a function to act as event handler for either the add or remove buttons
 * 
 * @param {string} choice - "add" if for add button and "remove" if for remove button
 * 
 * @returns {Function} - event handler for the add/remove button
 */
function addRemoveBtn(choice) {
	let i;
	if (choice == "add") {
		i = 1;
	} else if (choice == "remove") {
		i = -1;
	}
	function btnFunc() {
		// adding new dish to the cart object, with quantity = 0
		if (!cart.items.hasOwnProperty(this.dataset.id))
			cart.items[this.dataset.id] = { name: this.name, quantity: 0, price: this.value };

		// increase/decrease quantity and subtotal, depening on if it is an add or remove button
		cart.items[this.dataset.id].quantity += i;
		cart.subtotal += (cart.items[this.dataset.id].price * i);

		// removing dish from cart
		if (cart.items[this.dataset.id].quantity <= 0)
			delete cart.items[this.dataset.id];
		loadSummary();
	}
	return btnFunc;
}

/**
 * Resets the cart and refreshes the order summary
 */
function reset() {
	cart.restaurant = "";
	cart.restaurantID = null;
	cart.items = {};
	cart.subtotal = 0;
	cart.tax = 0;
	cart.delivery_fee = 0;
	cart.total = 0;
	loadSummary();
}
