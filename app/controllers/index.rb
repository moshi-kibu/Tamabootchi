enable :sessions

get '/' do
	erb :landing_page
end

get '/users' do
	@user = User.find(session[:id])
	erb :home
end


post '/users' do
	@user = User.find_by_username(params[:username])
	if valid_user?
	session[:id] = @user.id
	erb :home
	else 
		return false
	end
end

put '/users' do
	@user = User.find(session[:id])
	return {alertness: @user.tamabootchi.alertness, code_level: @user.tamabootchi.code_level, fullness: @user.tamabootchi.fullness, erb: erb(image_for_mood, layout: false)}.to_json
end

post '/users/logout' do
	session.clear
	redirect '/'
end

get '/users/new' do
	@erb = erb :_signup, layout: false
	return @erb
end

post '/users/new' do
	@user = User.create(params)
	@user.tamabootchi = Tamabootchi.create
	redirect '/'
end

put '/users/add' do
	@user = User.find(session[:id])
	if params[:kind] == 'sleep'
		sleep_updater
	elsif params[:kind] == 'code'
		code_updater
	elsif params[:kind] == 'feed'
		food_updater
	end
	enforce_limits
	@user.tamabootchi.save
	send_texts
	return {alertness: @user.tamabootchi.alertness, 
					code_level: @user.tamabootchi.code_level, 
					fullness: @user.tamabootchi.fullness}.to_json
end