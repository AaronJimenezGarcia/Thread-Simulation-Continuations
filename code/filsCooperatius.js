//compilació desde el meu ordinador: java -cp js.jar org.mozilla.javascript.tools.shell.Main -opt -2 ScriptsCAP/filsCooperatius.js

function current_context() {
	/*
		Retornem el context del thread.
	*/
	return new Continuation;
}

function Scheduler() {
	this.thread_queue = [];    //Contindrà la llista de funcions que executaran els threads.
	this.actual_thread = 0;    //Thread que s'esta executant o s'executarà
	this.num_threads = 0;      //Nombre maxim de threads que hi haurà
	this.main_context;         //Contindra el context del thread principal
}
Scheduler.prototype.spawn = function(thunk) {
	/*
		Sumarem un per cada thread que hi hagi.
		Inicialitzarem la cua de threads amb les funcions
		que s'han d'executar i posteriorment s'utilitzarà
		per a guardar els contextos dels threads.
	*/
	this.num_threads++;
	this.thread_queue.push(thunk);
}	
Scheduler.prototype.quit = function() {
	/*
		Actualitzem el thread que li toca el processador,
		disminuim el nombre de threads que hi han i 
		restaurem el context del thread que toca. Si no
		queden més threads per executar es cridarà al thread
		principal.
		NOTA: no s'elimina el thread, tan sols es
		considera com a brossa ja que el nombre de threads
		està marcat per num_threads i per tant, tots aquells
		més grans que num_threads no són res i no són
		accessibles. D'aquesta manera el thread que acaba
		pasa a ser l'últim thread actiu de la cua.
		
	*/
	this.num_threads--;
	if (this.actual_thread !== this.num_threads)
		this.thread_queue[this.actual_thread] = this.thread_queue[this.num_threads];
	if (this.actual_thread !== this.num_threads - 1)
		this.actual_thread = (this.actual_thread + 1)%(this.num_threads + 1);
	if (this.num_threads > 0) this.thread_queue[this.actual_thread]();
	else this.main_context();
}
Scheduler.prototype.relinquish = function() {
	/*
		Guardem el context del thread actual. Compte perque
		es fa una asignacio al if, no és una comparació.
		Aprofitem que al restaurar el context, per defecte,
		es retorna undefined i d'aquesta manera no entrarà
		al if. Actualitzem el thread que li toca el processador
		i restaurem el seu context.
	*/
	if (this.thread_queue[this.actual_thread] = current_context()) {
		this.actual_thread = (this.actual_thread + 1)%this.num_threads;
		this.thread_queue[this.actual_thread]();
	}
}
Scheduler.prototype.start_threads = function() {
	/*
		Guardem el context del thread principal.
		Compte perque es fa una asignacio al if, no és una comparació.
		Aprofitem que al restaurar el context, per defecte,
		es retorna undefined i d'aquesta manera no entrarà
		al if. Cridarem al primer thread que s'ha d'executar.
	*/
	if ((this.main_context = current_context())) {
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
