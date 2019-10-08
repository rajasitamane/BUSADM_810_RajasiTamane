function Order(tax) {
	this.tax = tax;
	this.items = [];

	this.value = function(){
		var total = 0;
		for (var i = 0; i < this.items.length; i++) {
			total += this.items[i].value();
		}
		return total;
	}

	this.totalValue = function(){
		var total2 = 0;
		total2 += this.value() + this.value()*this.tax;
		return total2;
	}

}


module.exports = Order;
