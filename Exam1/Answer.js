var Item = require('./Item');
var Order = require('./Order');


var order = new Order(0.10);
var item1 = new Item('Widget',2.50,10);
var item2 = new Item('Gidget',1.00,20);

order.items.push(item1);
order.items.push(item2);

console.log(order.totalValue());