function Item(product, price,quantity){
	this.product = product;
	this.price = price;
	this.quantity = quantity;
	this.value = function(){
		return this.price*this.quantity;
	}
}

module.exports = Item;