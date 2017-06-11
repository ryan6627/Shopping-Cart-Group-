//var adjustedTotal = "";



// Adding to Cart
var cart = []; // Essentially a shopping cart is an array or a list of items
var Item = function(name, price, count) { // Item is a variable storing a function. 
    this.name = name;
    this.price = price;
    this.count = count;
};



function addItemToCart(name, price, count) { // creates a function that takes in parameters of name, price, and count
    for(var key in cart) { //as the loop searches through the cart
        if(cart[key].name === name) { // if the name property of the indexed object equals the name parameter you pass
            cart[key].count += count; // instead of adding another of the same item, increment the existing's count by the passed count
            
            //adjustedTotal += (cart[key].count * cart[key].price);
            return; // ends the loop.
            
        }
    }
    var item = new Item(name, price, count); // creates a new Item object based on the previously defined function
    cart.push(item);  // Pushes the new Item to the array of Objects known as the cart
}






// Removing count from Cart
function removeItemFromCart(name) {
    for(var key in cart) {
        if(cart[key].name === name) {
            cart[key].count --;
            if(cart[key].count < 1) {
                cart.splice(key, 1);
                
            }
            break;
        }
    }
}




// Removing completely from cart
function removeItemFromCartAll(name) {
    for(var key in cart) {
        if(cart[key].name === name) {
            cart.splice(key, 1);
            break;
        }
    }
}




// Clearing the cart completely 
function clearCart() {
    cart = [];
}



// Count the amount of items in the cart
function countCart() {
    var total = 0;
    for(var key in cart) {
        total += cart[key].count;
    }
    return total;
}





function countCost() {
    var totalCost = 0;
    for(var key in cart) {
        var multiPly = parseFloat(cart[key].count) * parseFloat(cart[key].price);
        totalCost += multiPly;
    }
    return totalCost;
   
}

function credit () {
    if(countCost() >= 100) {
        var check = prompt("Would you like to setup a credit line? Enter 'Yes' or 'No'");
            if(check === "Yes") {
                alert("You've setup a credit line");
            } else if (check === "No") {
                alert("You've declined to setup a credit line");
            }
            } else {
                confirm("Cash payment is required for totals less than $100");
            }
}


function countCostWithTax() {
    var totalCost = 0;
    for(var key in cart) {
        var multiPly = parseFloat(cart[key].count) * parseFloat(cart[key].price);
        var uncleSam = (multiPly * .075) + multiPly;
        totalCost += uncleSam;
    }
    return totalCost;
    
}






// List the ITEMS, which means NAMES, of the arry slash cart.
// Creating a copy of the original array and subsequent objects inside
function listItems() {
   var cartCopy = [];
    for(var key in cart) { 
        var item = cart[key];
        var itemCopy = {};
        for(var p in item){ // loop through each property of an item
            itemCopy[p] = item[p]; //We're going to assign the property to item copy and give it the same value. 
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}


$(document).ready(function() { // jQuery section
    
    $(".add-to-cart").click(function(event) { // when you click on the list item, add one instance of the item to the cart, defined at line 72. 
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        addItemToCart(name, price, 1);
        displayCart();
    });
    
    $(".remove-from-cart").click(function(event){
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        removeItemFromCart(name);
        displayCart();
    });
    $(".remove-completely-from-cart").click(function(event) {
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        removeItemFromCartAll(name);
        displayCart();
    });
});


function displayCart() { 
    var cartArray = listItems(); // creating another copy of the copied array
    var outputCashAndCount = "";
    //var totalAdjusted = "" ;
    for(var key in cartArray) {
        
        outputCashAndCount += "<li>" + cartArray[key].name + " Qty: " + cartArray[key].count + ", " + " $ " + (cartArray[key].price * cartArray[key].count) +"</li>"; 

        
    }
    
    $("#show-cart").html(outputCashAndCount);
    $("#total-cart").html(countCost());
    $("#total-tax").html(countCostWithTax());
}
    


