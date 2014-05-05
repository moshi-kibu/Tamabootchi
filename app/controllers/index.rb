get '/' do
	erb :landing_page
end

get '/users' do
	@user = User.find_by_username(params[:username])
	if valid_user?
	erb :home
	end
end

post '/users/new' do
	User.create(params)
	redirect '/'
end