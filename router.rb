require 'sinatra'
require 'csv'
require 'json'

csv_raw = CSV.read('title_lookup_table_file.csv', headers: true)
map_hash = {}
csv_raw.each do |row|
  map_hash[row[0].sub('.jpg', '')] = row[2]
end

get '/' do
  @map_hash = map_hash.to_json
  erb :index
end