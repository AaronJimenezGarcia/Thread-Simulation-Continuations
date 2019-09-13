// Singleton Pattern (second example)
// from JavaScript Patterns by Stoyan Stefanov, OReilly 2010 isbn 978-0-596-80675-0

var Universe; 

(function () {

    var instance; 

    Universe = function() {

	if (instance) { 
	    return instance;
	} 

	instance = this;

	// all the functionality 
	this.start_time = 0; 
	this.bang = "Big";

    }; 
}());

Universe.prototype.nothing = true;

var uni = new Universe;

Universe.prototype.everything = true;

var uni2 = new Universe;

console.log(uni === uni2);
console.log(uni.nothing && uni.everything && uni2.everything && uni2.nothing);
console.log(uni.bang);
console.log(uni2.bang);
console.log(uni.start_time);
console.log(uni2.start_time);
console.log(uni.constructor === Universe);

/*
Explicació del patró Singleton v2:

Hi ha una funció que autocrida perquè té els () al final de la funció
i no té nom. Primer de tot, a la funció declara una variable que
tindrà la instància del singleton i a la variable Universe que está al
scope global se li asigna la funció per obtenir la instancia del singleton
d'altre manera no podríem obtenir-la. Després s'assigna a la variable
contenidora de la instancia, la instancia i es posen les propietats del
singleton.

Quan fem new Universe ens retorna la instancia del singleton.
*/