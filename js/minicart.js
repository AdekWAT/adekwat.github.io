var cart = {}; //корзина
var total = 0;
var quant = 0;

$('document').ready(function() {
	checkCart();
	showMiniCart();
});

function checkCart(){
	//проврка наличия корзины в локалсторедж
	if (localStorage.getItem('cart') != undefined) {
		cart = JSON.parse (localStorage.getItem('cart'));
		quant = JSON.parse (localStorage.getItem('quant'));
		total = JSON.parse (localStorage.getItem('total'));
	}
}

function showMiniCart(){
	//показывает содержимое корзины
	var out = '';	
	if (localStorage.getItem('quant') >= 1) {
		out += '<img class="cartlogo" src="img/cart.png">'
		out	+=`<a href="cart.html">${quant} товар(а)</a> на сумму<b> ${total}&#8381;</b>`
	}
	else {
		out += '<img class="cartlogo" src="img/cart.png">';
		out += '<a href="cart.html">Корзина</a> пуста';
	}
	$('#mini-cart').html(out);
}