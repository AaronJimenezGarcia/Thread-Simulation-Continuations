//compilació desde el meu ordinador: java -cp js.jar org.mozilla.javascript.tools.shell.Main -opt -2 ScriptsCAP/PracticaCAP.js

function current_context() {
	/*
		Retornem el context del thread.
	*/
	return new Continuation;
}

function Scheduler() {
	this.thread_queue = [];    //Contindra la llista de funcions que executaran els threads.
	this.thread_contexts = []; //Contindra els contextos dels threads
	this.actual_thread = 0;    //Thread que s'esta executant o s'executara
	this.max_threads = 0;      //Nombre maxim de threads que hi haura
	this.main_context;         //Contindra el context del thread principal
}
Scheduler.prototype.spawn = function(thunk) {
	/*
		Sumarem un per cada thread que hi hagi.
		Inicialitzarem la cua de threads amb les funcions que s'han d'executar.
		Inicialitzarem la llista de contextos dels threads. 
	*/
	this.max_threads++;
	this.thread_queue.push(thunk);
	this.thread_contexts.push(undefined);
}	
Scheduler.prototype.quit = function() {
	/*
		Eliminarem de la cua de threads el thread que acaba.
		Eliminarem el context del thread que acaba.
		Actualitzarem el thread que ha d'executar.
		Tornarem al context dels threads que no han acabat o
		al principal si es que ja no queda cap.
	*/
	this.thread_queue.splice(this.actual_thread, 1);
	this.thread_contexts.splice(this.actual_thread, 1);
	if (this.actual_thread === this.max_threads - 1) this.actual_thread = 0;
	this.max_threads--;
	if (this.max_threads > 0)this.thread_contexts[this.actual_thread]();
	else this.main_context();
}
Scheduler.prototype.relinquish = function() {
	/*
		Mirem si tenim threads als qui donar el processador.
		Guardem el context del thread actual i restaurem el del
		següent si s'ha executat algún cop, sino, cridarem per
		primer cop a la funció que ha de realitzar.
	*/
	if (this.max_threads > 0) {
		var auxiliar = this.actual_thread;
		if (this.actual_thread === this.max_threads - 1) this.actual_thread = 0;
		else this.actual_thread++;
		if ((this.thread_contexts[auxiliar] = current_context()) instanceof Continuation) {
			if (this.thread_contexts[this.actual_thread] !== undefined) {
				this.thread_contexts[this.actual_thread]();
			}
			else {
				this.thread_queue[this.actual_thread]();
			}
		}
	}
}
Scheduler.prototype.start_threads = function() {
	/*
		Cridarem al primer thread que s'ha d'executar.
	*/
	if ((this.main_context = current_context()) instanceof Continuation) {
		this.thread_queue[this.actual_thread]();
	}
}

function make_thread_system() {
	/*
		Creem un objecte que cumplira la funcio d'un Scheduler.
	*/
	return new Scheduler();
}

/*Funcions i programa principal*/

/*PROGRAMA D'EXEMPLE DE LA PRACTICA*/
var counter = 10;
function make_thread_thunk(name, thread_system) {
	function loop() {
		if (counter < 0) {
			thread_system.quit();
		}
		print('in thread',name,'; counter =',counter);
		counter--;
		thread_system.relinquish();
		loop();
	};
	return loop;
}
var thread_sys = make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.start_threads();