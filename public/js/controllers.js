function Controller(view){
	this.view = view
	this.currentHour = 0
	this.sleepTimerId = 0
	this.codeTimerId = 0
	this.feedTimerId = 0
	this.timer = 2000
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
		} else if (event.target.value === "Feed") {
			this.setFeedTime();
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

	setFeedTime: function() {
		if (this.codeTimerId === 0 && this.sleepTimerId == 0){
			this.feedTimerId = setInterval(this.updateFeed.bind(this), this.timer);
			} else { alert('You cannot do two things at the same time!')
   }
	},

	setSleepTime: function() {
		if (this.codeTimerId === 0 && this.feedTimerId == 0){
			this.sleepTimerId = setInterval(this.updateSleep.bind(this), this.timer);
			} else { alert('You cannot do two things at the same time!')
   }
	},

	updateFeed: function() {
   var hoursToRun = 1
   nutrition = parseInt(this.view.foodKind()) 
   
	   if (this.currentHour >= hoursToRun) {
	   		this.clearTimer("feed")
	   } else {
	      this.currentHour = this.currentHour + 1;
	      this.updateTamabootchiStats("feed",nutrition)
    }
  },


	updateSleep: function() {
   var hoursToRun = parseInt(this.view.sleepTime()) 
   
	   if (this.currentHour >= hoursToRun) {
	   		this.clearTimer("sleep")
	   } else {
	      this.currentHour = this.currentHour + 1;
	      this.updateTamabootchiStats("sleep",0)
    }

  },

	setCodeTime: function() {
		if (this.sleepTimerId === 0 && this.feedTimerId == 0){
			this.codeTimerId = setInterval(this.updateCode.bind(this), this.timer);
		} else { alert('You cannot do two things at the same time!')
   }
	},

	updateCode: function() {
   var hoursToRun = parseInt(this.view.codeTime()) 
	   if (this.currentHour >= hoursToRun) {
	   		this.clearTimer("code")
	   } else {
	      this.currentHour = this.currentHour + 1;
	      this.updateTamabootchiStats("code",0)
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
  	} else if (timerType === "feed") {
  		clearInterval(this.feedTimerId)
  		this.feedTimerId = 0;	
  	} 
  	this.view.updateCurrentAction(this.checkCurrentAction())
  },

  updateTamabootchiStats: function(kind, nutrition){ 	
  	updateRequest = $.ajax({
  		url: '/users/add',
  		type: 'PUT',
  		data: {kind: kind, nutrition: nutrition},
  	})

  	updateRequest.done(function(results) {
  		this.getStats();
  		results = JSON.parse(results)
  		if (results["alertness"] < 0 && results["fullness"] < 0) {
  			this.clearTimer("code");
  			this.getStats();
  		}
  	}.bind(this))
  },

  getStats: function() {
		updateStats = $.ajax ({
			url: '/users',
			type: 'PUT',
		})

		updateStats.done(function(results) {
			console.log("update stats:" + results)
			results = JSON.parse(results)
			this.view.updateCodeLevel(results["code_level"])
			this.view.updateAlertnessLevel(results["alertness"])
			this.view.updateFullnessLevel(results["fullness"])
			this.view.updateCurrentAction(this.checkCurrentAction())
			this.view.updatePicture(results["erb"])
		}.bind(this))
  },

  checkCurrentAction: function() {
  	if (this.sleepTimerId === 0 && this.codeTimerId === 0 && this.feedTimerId == 0) {
  		return "Hanging out"
  	} else if (this.sleepTimerId === 0 && this.feedTimerId === 0){
  		return "Coding"
  	} else if (this.codeTimerId === 0 && this.feedTimerId === 0){
  		return "Sleeping"
  	} else if (this.codeTimerId === 0 && this.sleepTimerId === 0){
  		return "Eating"
  	}
  },
}