helpers do
  def valid_user?
    User.exists?(username: params[:username]) && @user.password  == params[:password]
  end
end