helpers do
  def valid_user?
    User.exists?(username: params[:username]) && @user.password  == params[:password]
  end

  def alert_me(kind)
  	puts "---------------------"
  	p "Would send alert to #{@user.phone.to_s}"
  	# return

  	account_sid = 'ACabd565c09d3a7ac29013e490baf50742'
		auth_token = '64f02d85badd951102329f750bc0bc8e'


		if kind == 'alertness'
			begin
				client = Twilio::REST::Client.new account_sid, auth_token 
		 
				client.account.messages.create({
					:from => '+13147363622', 
					:to => @user.phone.to_s, 
					:body => 'Your Tamabootchi needs to rest!',  
				})
			rescue Twilio::REST::RequestError => e
				puts "Error: #{e.message}"
			end

  	else
  		begin
				client = Twilio::REST::Client.new account_sid, auth_token 
		 
				client.account.messages.create({
					:from => '+13147363622', 
					:to => @user.phone.to_s, 
					:body => 'Your Tamabootchi needs to eat!',  
				})
			rescue Twilio::REST::RequestError => e
				puts "Error: #{e.message}"
			end
		end
	end

	def enforce_limits 
		if @user.tamabootchi.fullness > 10
			@user.tamabootchi.fullness = 10
		end

		if @user.tamabootchi.fullness < 0
			@user.tamabootchi.fullness = 0
		end

		if @user.tamabootchi.alertness > 10
			@user.tamabootchi.alertness = 10
		end

		if @user.tamabootchi.alertness < 0
			@user.tamabootchi.alertness = 0
		end
	end

	def image_for_mood
		image = nil
		if @user.tamabootchi.alertness > 2 && @user.tamabootchi.fullness > 2
			image = :_img_happy
		elsif (@user.tamabootchi.alertness < 2 && @user.tamabootchi.fullness < 2) || (@user.tamabootchi.alertness >= 2 && @user.tamabootchi.fullness <= 2)
			image = :_img_hungry
		elsif @user.tamabootchi.alertness <= 2 && @user.tamabootchi.fullness >= 2
			image = :_img_sleepy
		end
		return image
	end

end