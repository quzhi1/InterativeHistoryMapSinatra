require 'sinatra'
require 'csv'
require 'json'

csv_raw = CSV.read('title_lookup_table_file.csv', headers: true)
map_hash = {}
csv_raw.each do |row|
  map_hash[row[0].sub('.jpg', '').to_i] = row[2]
end

get '/' do
  # Default year to -2100
  year = -2100

  # Find nearest to query year
  if /\A-?\d+\z/.match(params['year'])
    year = params['year'].to_i
    up = year
    down = year
    puts map_hash.has_key? year
    while !map_hash.has_key? up and !map_hash.has_key? down
      up += 1
      down -= 1
      if map_hash.has_key? up
        year = up
        break
      elsif map_hash.has_key? down
        year = down
        break
      end
    end
  end
  @year = year
  @map_hash = map_hash.to_json
  erb :index
end