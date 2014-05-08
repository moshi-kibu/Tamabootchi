class CreateTamabootchis < ActiveRecord::Migration
  def change
  	create_table :tamabootchis do |t|
  		t.belongs_to :user
  		t.float :code_level
  		t.float :fullness
  		t.float :alertness
  		t.timestamps
  	end
  end
end