function Controller(view){
	this.view = view
	this.currentHour = 0;
	this.sleepTimerId = 0
	this.codeTimerId = 0
	this.timer = 5000
}

Controller.prototype = {
	bindEventListeners: function() {
		this.view.actionsPanel.on('click', this.checkEvent.bind(this));
		this.view.signUpLink.on('click', this.resetLandingPanel.bind(this));
	},

	checkEvent: function(event) {
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