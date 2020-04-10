

$( document ).ready(function() {

	buclecartas(54);// number of cards
	
	galletas();//setup cookies

    accion();// events
  
    $('.totalPrice').html(calcularTotal()+"€");
});



function galletas() {

	try {
    // console.log( Cookies.get('lista'));
    dibujartabla(aArray(Cookies.get('lista')));

	}catch{
    console.log( 'sin Cookies' );

	}


}


function buclecartas(cantidad) {
	//card generator , coubnt all card and make new from "cantidad"
	var count=0;
	$(".carta").each(function() {
		count++;
	});

	for (var i = parseInt(cantidad) - 1; i >= 0; i--) {
		// var precio=;

		var carta = new card('id'+((i+count)*1),generateName(),getRandomInt(0,100)*1,generateCategorie());

}
}



function accion() {

		 //Buscador/ filtro categorias
	 $('#buscador').click(function() {
		$('#buscador').click(function() {
			var cat=$(this).val();
			$('.carta').hide();
			$('.card.col-3.col-md-2.carta.'+cat).show();
			

			if (cat=='todo') {
				$('.carta').show();

			}
			

		});	 	
	 });


	 $('.carritoIcone').click(function(event) {
	 	var clase =$(this).parent().parent().attr('id');//Id Div Padre
	 	var img=$('#'+clase).find('img').attr('src');//Link Img
	 	var name=$('#'+clase).find("h4").text();//Nombre
	 	var price=$('#'+clase).find(".precio").text();//Precio

	 	var array= [name,price,img];
	 	// console.log('Nombre: '+name+' Precio: '+price+' link:'+img);
	 	try{
	 		//Leer cooki
	 	cartaCompra(img,name,price);


	 	}catch{
	 		Cookies.set('lista',array)

	 	}

	 	$('.totalPrice').html(calcularTotal()+"€");
	 });


	
	 $('.fa-dumpster-fire').click(function(event) {
	 	eliminarCart()
	 });

	 $('.fa-plus-circle').hover(function() {
	 	buclecartas(25);
	 }, function() {
	 	/* Stuff to do when the mouse leaves the element */
	 });


	 $('.hoverImg').hover(function() {
	 	console.log('hover:'+this);
	 	var url= $('.hoverImg').attr('href');


	 	
	 }, function() {
	 	console.log('Exit hover:'+this);
	 });


	 $('a[data-toggle="tooltip"]').tooltip({
	     animated: 'fade',
	     placement: 'bottom',
	     html: true
	 });

}




function cartaCompra(link, nombre, precio) {

	var array = Cookies.get('lista');
	// console.log(aArray(array));

	var insert= [","+nombre,precio,link];

	$('.bodyCart').html('');
	
	Cookies.set('lista',array.concat(insert) );

	dibujartabla(aArray(Cookies.get('lista')));

	

}

function aArray(txt) {//Converted text on arry split by ","
	 var txt= txt.split(",");
	 // console.log(txt)
	return txt
}


function dibujartabla(insert){
var insert=insert;
var longitudProduct=3;

	 for (var i = insert.length - 1-longitudProduct; i >= 0; i=i-longitudProduct) {
	 	var link ='<a  data-toggle="tooltip" title="'+'<img src="'+insert[i]+'"" class="hoverImg">link</a>';
		// if(insert[i]!=""){
		 	$('.bodyCart').append('<tr>')
		 
		 	$('.bodyCart').append('<td><p>'+insert[i+1]+'</p></td>');
		 	$('.bodyCart').append('<td><p class="precioCart">'+insert[i+2]+'</p></td>');
		 	$('.bodyCart').append('<td>'+link+'</td>');
		 	$('.bodyCart').append('</tr>')
		 // }
	 }
	

}

function calcularTotal() {
	var total = 0;
	
	$(".precioCart").each(function() {

	    var cant = $(this).text();

	    if(!isNaN(cant) && cant.length != 0) {
	        total += parseFloat(cant);
	    }
	});

	return total;
}

function eliminarCart() {
	Cookies.remove('lista');
	$('.bodyCart').html('');
	$('.totalPrice').html(calcularTotal()+"€");
}
