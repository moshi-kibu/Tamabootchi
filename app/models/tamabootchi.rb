class Tamabootchi < ActiveRecord::Base
	belongs_to :user
	before_save :default_values
  
  def default_values
    self.code_level ||= 0
    self.fullness ||= 10
    self.alertness ||= 10
  end
end