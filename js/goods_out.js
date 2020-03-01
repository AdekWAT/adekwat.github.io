var cart = {}; //корзина
var total = 0;
var quant = 0;

$('document').ready(function() {
	addToCartButton();
	checkCart();
	showMiniCart();
});

function addToCartButton () {
	$.getJSON('goods.json', function( data ){
		var out = '';
		let path = location.pathname;
		let filename = path.replace(/^.*[\\\/]/, '');
		let filenameWithoutExtension = filename.split('.').slice(0, -1).join('.');
			for (var key in data){
			if (data[key]['category'] == filenameWithoutExtension){
				out+='<div class="goods">';
				out+='<b>';
				out+='<div class="goods-img-hover">';
				out+='<div class="goods-img">'
				out+=`<img src="${data[key].image}">`;
				out+='</div>'
				out+='<div class="goods-hover">';
				out+=`<p>${data[key]['description']}</p>`
				out+='</div>';
				out+='</div>';
				out+='<div>';
				out+=`<p class="name">${data[key]['name']}</p>`;
				out+=`<span class="weight">${data[key]['weight']} гр.</span>`;
				out+='</div>';
				out+=`<button data-price="${data[key].cost}" data-art="${key}" title="Добавить ${data[key]['name']} в корзину" class="add-to-cart"><b>Заказать</b></button>`;
				out+=`<div class="price">${data[key]['cost']}&#8381;</div>`;
				out+='</b>';
				out+='</div>';
			}
		}			
		$('.goods-out').html(out);
		// кнопка добавления товара в корзину
		$('button.add-to-cart').on('click', addToCart);
	});
}

function addToCart(){
	// добавляем товар в корзину
	var articul = $(this).attr('data-art');
	var cost = $(this).attr('data-price');
	if (cart[articul]!=undefined) {
		cart[articul]++;
		total = total + Number(cost);
	}
	else {
	 	cart[articul] = 1;
	 	quant++;
	 	total = total + Number(cost);
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	localStorage.setItem('quant', JSON.stringify(quant));
	localStorage.setItem('total', JSON.stringify(total));
	showMiniCart();
}

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