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

  foodKind: function() {
      return $('#food_kind').val()
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

  updateFullnessLevel: function(result){
    if ($('#insert_fullness').text() <= 10) {
      $('#insert_fullness').text(result)
    }
    else {
      $('#insert_fullness').text('10')
    }
  },
  
  updateCurrentAction: function(result){
  	$('#insert_status').text(result)
  },
  
  updatePicture: function(result){
		picture = $('.picture');
		picture.replaceWith(result)
  }
}