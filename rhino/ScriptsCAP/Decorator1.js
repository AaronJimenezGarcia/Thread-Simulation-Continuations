// Decorator Pattern (first example)
// from JavaScript Patterns by Stoyan Stefanov, OReilly 2010 isbn 978-0-596-80675-0

function Sale(price) { 
    this.price = price || 100;
} 

Sale.prototype.getPrice = function () {
    return this.price;
};


Sale.prototype.decorate = function (decorator) { 
    var F = function () {},
        overrides = this.constructor.decorators[decorator], // this és l'objecte que està a l'esquerra del '.'
        i, newobj;
		
    F.prototype = this; 
    newobj = new F(); 
    newobj.uber = F.prototype;   // newobj.uber === newobj.__proto__ (si existeix __proto__)
    
    for (i in overrides) {
	if (overrides.hasOwnProperty(i)) { 
	    // console.log(decorator + ' ' + i);
	    newobj[i] = overrides[i];  // copiem a newobj totes les propietats del decorador, en aquest cas només 
	}                              // hi ha 'get_price'
    }

    return newobj;
};



// Els objecte decoradors s'implementaran com a propietats d'una propietat del constructor
Sale.decorators = {};

Sale.decorators.fedtax = { 
    getPrice: function () {
	var price = this.uber.getPrice(); 
	price += price * 5 / 100; 
	return price;
    }
};

Sale.decorators.quebec = { 
    getPrice: function () {
	var price = this.uber.getPrice(); 
	price += price * 7.5 / 100; 
	return price;
    }
};

Sale.decorators.money = { 
    getPrice: function () {
	return "$ " + this.uber.getPrice().toFixed(2); 
    }
};

Sale.decorators.cdn = { 
    getPrice: function () {
	return "CDN$ " + this.uber.getPrice().toFixed(2); 
    }
};


var sale = new Sale(100); 
sale = sale.decorate('fedtax'); 
sale = sale.decorate('quebec'); 
sale = sale.decorate('money'); 
print(sale.getPrice());

var sale = new Sale(100); 
sale = sale.decorate('fedtax'); 
sale = sale.decorate('cdn'); 
print(sale.getPrice());

/*
Explicació codi patró decorador:

La funció Sale és la constructora de la nostra "classe" Sale. Aquesta,
només conté una propietat price que indica el preu de la venta.

Com que es vol que per a totes les instancies de Sale es pogui saber
el preu s'assigna una funció getPrice al prototipus que fa retornar el preu.

Els decoradors estaran en un array anomenat decorators que serà propietat de Sale.
A més a més s'afegeix a Sale els diferents decoradors que pot tenir com a propietats 
(fedtax, quebec, money i cdn). Aquestes propietats redefineixen la funció getPrice
del prototipus.

Per últim s'afegeix al prototipus una altre propietat anomenada decorate que té
assignat com a valor una funció a la qual se li passa el nom d'un dels decoradors.
A overrides posa el decorador(funcions etc) i newObj pasarà a tenir com a prototipus
el prototipus a this que depenent de l'acció anterior podrà ser un newObj o Sale.
Finalment a newObj s'afegeixen les propietats del decorador.
*/