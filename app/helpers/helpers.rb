helpers do
  def valid_user?
    User.exists?(username: params[:username]) && @user.password  == params[:password]
  end

  def alert_me
  	puts "---------------------"
  	p "Would send alert to #{@user.phone.to_s}"
  	# return

  	account_sid = 'ACabd565c09d3a7ac29013e490baf50742'
		auth_token = '64f02d85badd951102329f750bc0bc8e'

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
  end
end