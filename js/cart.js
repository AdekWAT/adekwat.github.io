var cart = {}; //корзина


$.getJSON('goods.json', function(data){
	var goods = data;
	checkCart();
	showCart();

	function showCart(){
		if ( $.isEmptyObject(cart) ) {
			//корзина пуста	
			var out = '<div class="empty"><center>В корзине ничего нет. Добавьте товар в корзину. <a href="index.html">Меню</a></center></div>';
			var totalcost = 0;
			$('.maincart').html(out);
			$('.total').html(totalcost);
		}
		else {
			var out ='';
			var a = '';
			var totalcost = 0;
			out += '<tr class="cart-tr">'+
						'<td class="name"><center>Наименование</center></td>'+
						'<td class="kolvo"><center>Количество</center></td>'+
						'<td class="cost"><center>Цена</center></td>'+
						'<td class="sum"><center>Сумма</center></td>'+
					'</tr>';
			for (var key in cart){
				sum = cart[key]*goods[key].cost;
				totalcost = totalcost + sum; 
				out += '<tr class="cart-tr">';
				out += '<td>';
				out += `<img class="cart-image" width="100px" height="100px" src="${goods[key].image}">`;
				out += `<p class="goods-name" >${goods[key].name}</p>`;
				out += '</td>';
				out += '<td>';
				out += `<button class="minus" data-price="${data[key].cost}" data-art="${key}"></button>`;
				out += `${cart[key]}`;
				out += `<button class="plus" data-price="${data[key].cost}" data-art="${key}"></button>`;
				out += '</td>';
				out += '<td>';
				out += `${goods[key].cost}`;
				out += '</td>';
				out += '<td>';
				out += sum;
				out += '</td>';
				out += '<td>';
				out += `<button class="delete" data-sum="${sum}" data-price="${data[key].cost}" data-art="${key}">x</button>`;
				out += '</td>';
				out += '</tr>';
				a += `${goods[key].name}: ${cart[key]} шт., `;
			}	
			$('#my-cart').html(out);
			$('.total').html(totalcost);
			$('.name-id').html(a);
			$('.plus').on('click', plusGoods);
			$('.minus').on('click', minusGoods);
			$('.delete').on('click', deleteGoods);
		}
	};

	function plusGoods(){
		var articul = $(this).attr('data-art');
		var cost = $(this).attr('data-price');
		cart[articul]++;
		total = total + Number(cost);
		saveCartToLS();
		showCart();
	}

	function minusGoods(){
		var articul = $(this).attr('data-art');
		var cost = $(this).attr('data-price');
		if (cart[articul]>1) {
			cart[articul]--;	
			total = total - Number(cost);
		}
		else {
			delete cart[articul];
			total = total - Number(cost);
			quant--;
		}
		saveCartToLS();
		showCart();
	}

	function deleteGoods(){
		var articul = $(this).attr('data-art');
		var data_sum = $(this).attr('data-sum');
		delete cart[articul];
		if (quant == 0){
			delete quant;
			delete total;
		}
		else{
			quant--;
			total = total - Number(data_sum);
		}
		saveCartToLS();
		showCart();
	}

});

function orderSubmit(){
	var out = '';
	out += '<div class="empty"><center>Спасибо за заказ!</center></div>';
	localStorage.removeItem('cart');
	localStorage.removeItem('quant');
	localStorage.removeItem('total');
	$('.maincart').html(out);
	// showCart();
}

function checkCart(){
	//проврка наличия корзины в локалсторедж
	if (localStorage.getItem('cart') != null) {
		cart = JSON.parse (localStorage.getItem('cart'));
		quant = JSON.parse (localStorage.getItem('quant'));
		total = JSON.parse (localStorage.getItem('total'));
	}
}

function saveCartToLS(){
	localStorage.setItem('cart', JSON.stringify(cart) );
	localStorage.setItem('quant', JSON.stringify(quant) );
	localStorage.setItem('total', JSON.stringify(total) );
}

function showStreetID(){
	var out = '';
	out +='	<p><b>Выберите район доставки:</b></p>'
	out +='	<select required="" name="region" id="delivery-region">'
	out +='		<option value="Город">Город</option>'
	out +=		'<option value="Пос. Новый">Пос. Новый</option>'
	out +=		'<option value="Волковский поселок">Волковский поселок</option>'
	out +=		'<option value="Заря-2">Заря-2</option>'
	out +=		'<option value="Боровая">Боровая</option>'
	out +=		'<option value="Базы отдыха">Базы отдыха</option>'
	out +=		'<option value="Прикамский поселок">Прикамский поселок</option>'
	out +=		'<option value="Ольховка">Ольховка</option>'
	out +=		'<option value="Гаревая">Гаревая</option>'
	out +=		'<option value="Фоки">Фоки</option>'
	out +=		'<option value="Кемуль">Кемуль</option>'
	out +=		'<option value="Марково">Марково</option>'
	out +=		'<option value="Харнавы">Харнавы</option>'
	out +=		'<option value="УралОргСинтез">УралОргСинтез</option>'
	out +=		'<option value="Сутузово">Сутузово</option>'
	out +=		'<option value="ЗГА">ЗГА</option>'
	out +=		'<option value="ПТТиСТ">ПТТиСТ</option>'
	out +=	'</select>'
	out +=	'<div class="mini-header">Адрес доставки</div>'
	out +=	'<input required="" type="text" name="street" class="street-id" placeholder="Адрес: улица, номер дома, подъезд, квартира">';
	$('.delivery-adress').html(out);
}
function hideStreetID(){
	var out = '';
	$('.delivery-adress').html(out);
}

function showDateID() {
	var out = '';
	out+='<label>'
	out+='	<input required type="radio" name="when" value="Сегодня">'
	out+='	Сегодня'
	out+='</label>'
	out+='<label>'
	out+='	<input required type="radio" name="when" value="Завтра">'
	out+='	Завтра'
	out+='</label>'
	out+='<select required name="time-value" id="delivery-time-value">'
	out+='	<option value="10:00 - 10:30">10:00 - 10:30</option>'
	out+='	<option value="10:30 - 11:00">10:30 - 11:00</option>'
	out+='	<option value="11:00 - 11:30">11:00 - 11:30</option>'
	out+='	<option value="11:30 - 12:00">11:30 - 12:00</option>'
	out+='	<option value="12:00 - 12:30">12:00 - 12:30</option>'
	out+='	<option value="12:30 - 13:00">12:30 - 13:00</option>'
	out+='	<option value="13:00 - 13:30">13:00 - 13:30</option>'
	out+='	<option value="13:30 - 14:00">13:30 - 14:00</option>'
	out+='	<option value="14:00 - 14:30">14:00 - 14:30</option>'
	out+='	<option value="14:30 - 15:00">14:30 - 15:00</option>'
	out+='	<option value="15:00 - 15:30">15:00 - 15:30</option>'
	out+='	<option value="15:30 - 16:00">15:30 - 16:00</option>'
	out+='	<option value="16:00 - 16:30">16:00 - 16:30</option>'
	out+='	<option value="16:30 - 17:00">16:30 - 17:00</option>'
	out+='	<option value="17:00 - 17:30">17:00 - 17:30</option>'
	out+='	<option value="17:30 - 18:00">17:30 - 18:00</option>'
	out+='	<option value="18:00 - 18:30">18:00 - 18:30</option>'
	out+='	<option value="18:30 - 19:00">18:30 - 19:00</option>'
	out+='	<option value="19:00 - 19:30">19:00 - 19:30</option>'
	out+='	<option value="19:30 - 20:00">19:30 - 20:00</option>'
	out+='	<option value="20:00 - 20:30">20:00 - 20:30</option>'
	out+='	<option value="20:30 - 21:00">20:30 - 21:00</option>'
	out+='	<option value="21:00 - 21:30">21:00 - 21:30</option>'
	out+='	<option value="21:30 - 22:00">21:30 - 22:00</option>'
	out+='	<option value="22:00 - 22:30">22:00 - 22:30</option>'
	out+='	<option value="22:30 - 23:00">22:30 - 23:00</option>'
	out+='	<option value="23:00 - 23:30">23:00 - 23:30</option>'
	out+='	<option value="23:30 - 00:00">23:30 - 00:00</option>'
	out+='	<option value="00:00 - 00:30">00:00 - 00:30</option>'
	out+='	<option value="00:30 - 01:00">00:30 - 01:00</option>'
	out+='</select>';
	$('.date-id').html(out);
}

function hideDateID() {
	var out = '';
	$('.date-id').html(out);
}

