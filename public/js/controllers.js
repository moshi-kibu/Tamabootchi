function Controller(view){
	this.view = view
	this.currentHour = 0; //inconsistent semi-colons
	this.sleepTimerId = 0
	this.codeTimerId = 0
	this.timer = 5000
}

Controller.prototype = {
	bindEventListeners: function() {
		this.view.actionsPanel.on('click', this.checkEvent.bind(this)); //woah wtf man just use jquery's .on('click', childId)
		this.view.signUpLink.on('click', this.resetLandingPanel.bind(this));

    /*
      Split the actionsPanel bindListener into two listeners. One for each button.
      The syntax for event delegation in jquery works like this:
      this.view.parentElement.on('click', 'childElementSelector', callback)

      Then, inside the callback, you do not have to check if value === "Sleep" or "Code".
      You would do that in the childElementSelector instead. (you might also give those buttons a class or id to select on as opposed to the value of the value attribute)
      (That leaves you the flexibility to change your button names without breaking the listeners.)

      Currently, anywhere I click on the Actions Panel will call your callback, and execute that conditional logic! This is suboptimal.
    */
	},

	checkEvent: function(event) {
    console.log(this)
    console.log(event.target)

		event.preventDefault();
		if (event.target.value === "Sleep") {
			this.setSleepTime();
		} else if (event.target.value === "Code") {
			this.setCodeTime();
		}
	},

	resetLandingPanel: function() {
		event.preventDefault();
		var getErbRequest = $.ajax({
			url: '/users/new',
			type: 'GET',
		})

		getErbRequest.done(function(erb) {
			this.view.replacePanel(erb)
		}.bind(this))
	},


	setSleepTime: function() {
		if (this.codeTimerId === 0){
			this.sleepTimerId = setInterval(this.updateSleep.bind(this), this.timer);
			} else { alert('You cannot sleep and code at the same time!')
   }
	// 3600000
	},

	updateSleep: function() {
   var hoursToRun = parseInt(this.view.sleepTime())

	   if (this.currentHour >= hoursToRun) {
	   		this.clearTimer("sleep")
	   } else {
	      this.currentHour = this.currentHour + 1;
	      this.updateTamabootchiStats("sleep")
	      // this.view.renderTamabootchiStats(sleep) #TODO!
    }

  },

	setCodeTime: function() {
		if (this.sleepTimerId === 0){
			this.codeTimerId = setInterval(this.updateCode.bind(this), this.timer);
		} else { alert('You cannot sleep and code at the same time!')
   }
	},

	updateCode: function() {
   var hoursToRun = parseInt(this.view.codeTime())
	   if (this.currentHour >= hoursToRun) {
	   		this.clearTimer("code")
	   } else {
	      this.currentHour = this.currentHour + 1;
	      this.updateTamabootchiStats("code")
    }
  },

  clearTimer: function(timerType) {
  	console.log("stopping timer " + timerType)

  	this.currentHour = 0
  	if (timerType === "sleep") {
  		clearInterval(this.sleepTimerId)
  		this.sleepTimerId = 0;
  	} else if (timerType === "code") {
  		clearInterval(this.codeTimerId)
  		this.codeTimerId = 0;
  	}

  },

  getStats: function() {
  	updateStats = $.ajax ({
  		url: '/users',
  		type: 'GET',
  	})

  	updateStats.done(function(results) {
  		results = JSON.parse(results)
  		this.view.updateCodeLevel(results["code_level"])
  		this.view.updateAlertnessLevel(results["alertness"])
  		this.view.updateCurrentAction(this.checkCurrentAction())
  		this.view.updatePicture(results["erb"])
  	}.bind(this))
  },

  checkCurrentAction: function() {
  	if (this.sleepTimerId === 0 && this.codeTimerId === 0) {
  		return "Hanging out"
  	} else if (this.sleepTimerId === 0){
  		return "Coding"
  	} else {
  		return "Sleeping"
  	}
  },

  updateTamabootchiStats: function(kind) {
  	updateRequest = $.ajax({
  		url: '/users/add',
  		type: 'PUT',
  		data: {kind: kind},
  	})

  	updateRequest.done(function(results) {
  		this.getStats();
  		results = JSON.parse(results)
  		console.log(results)
  		if (results["alertness"] < -0.1) {
  			this.clearTimer("code");
  			this.getStats();
  		}
  	}.bind(this))
  },
}