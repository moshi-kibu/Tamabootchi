require 'spec_helper'

describe "/" do
  it "returns the option to signup" do
    #Arrange
      #nothing
    #Act
      get '/'
    #Assert
      expect(last_response.body).to include('Sign up!')
  end
end

describe 'get /users' do
  #ARRANGE
  before :each do
    User.destroy_all
    Tamabootchi.destroy_all

    @user = User.create()
    @tama = Tamabootchi.create()

    @user.tamabootchi = @tama #(Tamabootchi.create())
    @user.save
    @fake_session = {"rack.session" => {id: @user.id}}
  end
  #ACT/ASSERT
  describe 'initialized in before:each' do
    it "returns the right image in JSON for alertness 3" do
      #ARRANGE
      @tama.alertness = 3
      @tama.save

      #Act
      get '/users', {}, @fake_session

      #Assert
      expect(last_response.body).to include('happy')
    end
    it "returns the right image in JSON for alertness 1" do
      #ARRANGE
      @tama.alertness = 1
      @tama.save

      #act
      get '/users', {}, @fake_session

      #assert
      expect(last_response.body).to include('sleepy.png')
    end
  end


end

