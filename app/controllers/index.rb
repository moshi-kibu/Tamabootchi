enable :sessions

get '/' do
	erb :landing_page
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

get '/users' do
	@user = User.find(session[:id])
	if @user.tamabootchi.alertness > 2
		return {alertness: @user.tamabootchi.alertness, code_level: @user.tamabootchi.code_level, erb: (erb :_img_happy)}.to_json
	else
		return {alertness: @user.tamabootchi.alertness, code_level: @user.tamabootchi.code_level, erb: (erb :_img_sleepy)}.to_json
	end
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
		if @user.tamabootchi.alertness < 10
			@user.tamabootchi.alertness = @user.tamabootchi.alertness + 1
			@user.tamabootchi.save
		end
	elsif params[:kind] == 'code'
		if @user.tamabootchi.alertness > 0
			@user.tamabootchi.code_level = @user.tamabootchi.code_level + 1
			@user.tamabootchi.alertness = @user.tamabootchi.alertness - 1
			@user.tamabootchi.save
		end

		if @user.tamabootchi.alertness <= 0
			alert_me
		end
	end
	return {alertness: @user.tamabootchi.alertness, code_level: @user.tamabootchi.code_level}.to_json
end