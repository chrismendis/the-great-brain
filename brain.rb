%w(rubygems sinatra compass haml).each { |lib| require lib }

helpers do
  include Rack::Utils
  alias_method :h, :escape_html

  def versioned_css(stylesheet)
    "/stylesheets/#{stylesheet}.css?" + File.mtime(File.join(Sinatra::Application.views, "stylesheets", "#{stylesheet}.sass")).to_i.to_s
  end
  
  def versioned_js(js)
    "/javascripts/#{js}.js?" + File.mtime(File.join(Sinatra::Application.public, "javascripts", "#{js}.js")).to_i.to_s
  end
end

get "/stylesheets/main.css" do
  content_type 'text/css'
  response['Expires'] = (Time.now + 60*60*24*356*3).httpdate
  sass :"stylesheets/main"
end

get '/' do
  haml :index
end