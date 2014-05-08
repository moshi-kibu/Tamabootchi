function View(){
  this.actionsPanel = $('#actions_panel')
  this.signUpLink = $('.sign-up')
  this.signUpPanel = $('#login')
}

View.prototype = {
	replacePanel: function(result) {
    this.signUpPanel.empty();
    panel = document.querySelector('#login')
    panel.innerHTML = ''
    panel.innerHTML = result
  },

  sleepTime: function() {
		return $('#sleep_time').val()
	},

	codeTime: function() {
		return $('#code_time').val()
	},

	updateCodeLevel: function(result){
		$('#insert_code').text(result)
	},
  
  updateAlertnessLevel: function(result){
  	if ($('#insert_alertness').text() <= 10) {
  		$('#insert_alertness').text(result)
  	}
  	else {
  		$('#insert_alertness').text('10')
  	}
  },
  
  updateCurrentAction: function(result){
  	$('#insert_status').text(result)
  },
  
  updatePicture: function(result){
		picture = document.querySelector('.picture');
		picture.innerHTML = '';
		picture.innerHTML = result
  }
}