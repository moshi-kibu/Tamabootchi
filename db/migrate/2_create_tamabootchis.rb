class CreateTamabootchis < ActiveRecord::Migration
  def change
  	create_table :tamabootchis do |t|
  		t.string :name
  		t.belongs_to :user
  		t.string :level
  		t.integer :hunger
  		t.integer :sleepiness
  		t.integer :codiness
  		t.timestamps
  	end
  end
end