require 'spec_helper'

describe "/" do
  it "if root, returns the option to signup" do
    #Arrange
      #nothing
    #Act
      get '/'
    #Assert
      expect(last_response.body).to_include('Sign up!')
  end
end