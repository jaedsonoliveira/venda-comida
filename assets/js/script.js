let cart = [];

//reseta o valor para 1 ao abrir o modal
let modalQt = 1;

//Identifica qual prato está selecionado
let modalKey =0;


//funçaõ para substituir o document.queryselector por c
//ou seja em vez de colocar queryselector poe apenas c
const c = (el)=>{
	return document.querySelector(el);
}

const cs = (el)=>{
	return document.querySelectorAll(el);
}
pratoJson.map((item, index)=>{
	let sectionPrice = c('.models .section-price--item').cloneNode(true);
	//preenche as informacoes em pizza item a partir da quantidade 
	//de itens que há no json
	
	//setAtribute adicionando um data key em cada pizza/div
	sectionPrice.setAttribute('data-key', index);
	sectionPrice.querySelector('.section-price--item img').src = item.img;
	sectionPrice.querySelector('.section-price--item-name').innerHTML = item.name;
	sectionPrice.querySelector('.section-price--item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;
	sectionPrice.querySelector('.section-price--item-desc').innerHTML = item.description;
	sectionPrice.querySelector('a').addEventListener('click', (e)=>{
		e.preventDefault();

		//preenche as informaçoes no modal a partir do json
		let key = e.target.closest('.section-price--item').getAttribute('data-key');
		modalQt = 1;
		modalKey = key;
		c('.pratoBig img').src = pratoJson[key].img;
		c('.pratoInfo h1').innerHTML = pratoJson[key].name;
		c('.pratoInfo--desc').innerHTML = pratoJson[key].description;
		c('.pratoInfo--actualPrice').innerHTML = `R$ ${pratoJson[key].price.toFixed(2)}`;

		//reseta o valor do modal para 1
		c('.pratoInfo--qt').innerHTML = modalQt;

		//Abre o Windowarea
		c('.pratoWindowArea').style.opacity = 0;
		c('.pratoWindowArea').style.display = 'flex';
		setTimeout(()=>{
			c('.pratoWindowArea').style.opacity = 1;
		}, 200);
	});
	c('.comida-area').append(sectionPrice);
});

//Eventos do Modal
function closeModal(){
	c('.pratoWindowArea').style.opacity = 0;
	setTimeout(()=>{
		c('.pratoWindowArea').style.display = 'none';
	}, 500);
}

//botão cancelar
cs('.pratoInfo--cancelButton, .pratoInfo--cancelMobileButton').forEach((item)=>{
	item.addEventListener('click', closeModal);
});

//botões mais e menos
c('.pratoInfo--qtmenos').addEventListener('click',()=>{
	if(modalQt >1){
		modalQt --;
		c('.pratoInfo--qt').innerHTML = modalQt;
	}
});

c('.pratoInfo--qtmais').addEventListener('click',()=>{
		modalQt ++;
		c('.pratoInfo--qt').innerHTML = modalQt;
	
});

//carrinho
 c('.pratoInfo--addButton').addEventListener('click',()=>{
	 let identifier = pratoJson[modalKey].id+'@';
	 let key = cart.findIndex((item)=>item.identifier == identifier);
	 if(key > -1){
		 cart[key].qt += modalQt;
	 }else{
		 cart.push({
			 identifier,
			 id:pratoJson[modalKey].id,
			 qt:modalQt
		 });
	 }
	 updateCart();
	 closeModal();
 });


c('.menu-openner').addEventListener('click',()=>{
	if(cart.length > 0){
		c('aside').style.left = '0';
	}
});

c('.menu-closer').addEventListener('click',()=>{
	c('aside').style.left = '100vw';
});

c('.cart--finalizar').addEventListener('click',()=>{
	c('aside').classList.remove('show');
	c('aside').style.left = '100vw';
 	alert("Compra realizada com sucesso!");
 
});
 function updateCart(){
	 c('.menu-openner span').innerHTML = cart.length;

	 if(cart.length > 0){
		 c('aside').classList.add('show');
		 c('.cart').innerHTML = '';

		let subtotal = 0;
		let desconto = 0;
		let total = 0;


		 for(let i in cart){
			 let pratoItem = pratoJson.find((item)=>item.id == cart[i].id);

			subtotal += pratoItem.price * cart[i].qt;

			 let cartItem= c('.models .cart--item').cloneNode(true);

			 cartItem.querySelector('img').src = pratoItem.img;
			 cartItem.querySelector('.cart--item-nome').innerHTML = pratoItem.name;
			 cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
			 cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
				if(cart[i].qt > 1){
					cart[i].qt--;
				}else{
					cart.splice(i,1);
				}
				updateCart();
			 });

			 cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
				cart[i].qt++;
				updateCart();
			});

			 c('.cart').append(cartItem);
		
		 }

		 desconto = subtotal * 0.1;
		 total = subtotal - desconto;

		 c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
		 c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
		 c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


		} else {
			c('aside').classList.remove('show');
			c('aside').style.left = '100vw';
		}

 }