helpers do	
	def sleep_updater
		if @user.tamabootchi.alertness < 10
			@user.tamabootchi.alertness += 1
			@user.tamabootchi.fullness -=  1
		end
	end

	def code_updater
		if @user.tamabootchi.alertness > 0 && @user.tamabootchi.fullness > 0
			@user.tamabootchi.code_level += 1
			@user.tamabootchi.alertness -=  1
			@user.tamabootchi.fullness -=  1
		end
	end

	def food_updater
		if @user.tamabootchi.fullness < 10
			@user.tamabootchi.fullness += params[:nutrition].to_i
			@user.tamabootchi.alertness -=  1
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

		if @user.tamabootchi.code_level > 100
			@user.tamabootchi.alertness = 100
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