;(function(global, $){
	var Greetr = function(firstName, lastName, language) {
		return new Greetr.init(firstName, lastName, language)
	}
	
	var greetings = {
		en: "hello",
		es: "Hola"
	};

	var formalGreetings = {
		en: "Hello",
		es: "Saludos" 
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	}; 

	var supporedLanguages = ['en', 'es'];

	Greetr.prototype = {
		fullname: function(){
			return this.firstName + ' ' + this.lastName;
		},

		greeting: function(){
			return greetings[this.language] + ' ' + this.fullname();
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ' ' + this.fullname();
		},

		validate: function(){
			if(supporedLanguages.indexOf(this.language) === -1){
				throw "Invalid Language";
			}
		},

		log: function(){
			if(console){
				console.log(logMessages[this.language] + ' ' + this.fullname())
			}
			return this;
		},

		greet: function(formal){
			var msg;
			if(formal){
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}
			if(console){
				console.log(msg);
			}
			//makes method chainable
			return this;
		},

		setLanguage: function(language){
			this.language = language;
			this.validate();
			return this;
		},

		HTMLgreeter: function(selector, formal){
			if(!$){
				throw "jQuery not supported"
			}
			var msg;
			if(formal){
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}
			$(selector).html(msg);
		}
	}

	Greetr.init = function(firstName, lastName, language){
		var self=this;
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || '';
	}

	Greetr.init.prototype = Greetr.prototype;

	global.Greetr = global.G$ = Greetr

}(window, jQuery));