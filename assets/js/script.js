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