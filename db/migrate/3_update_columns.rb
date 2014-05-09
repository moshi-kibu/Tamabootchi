class UpdateColumns < ActiveRecord::Migration
  def self.up
    change_column :tamabootchis, :code_level, :integer
    change_column :tamabootchis, :fullness, :integer
    change_column :tamabootchis, :alertness, :integer
  end
 
  def self.down
    change_column :tamabootchis, :code_level, :float
    change_column :tamabootchis, :fullness, :float
    change_column :tamabootchis, :alertness, :float
  end
end