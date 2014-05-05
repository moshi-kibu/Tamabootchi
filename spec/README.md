<!-- EXAMPLES -->

///////////////////////////////////
index_controller_spec
///////////////////////////////////

require 'spec_helper'

describe "IndexController (this is a skeleton controller test!)" do

  describe 'get all bands' do
    it 'should see all bands' do
      get "/bands"
      expect(last_response).to be_ok
    end
  end

  describe 'create a new band' do
    band_name = 'chromatics'
    new_params = {
        name: band_name
      }
    new_session = {
      'rack.session' => {
        # Could preload stuff into the session here...
      }
    }
    it 'should add a new band' do
      expect{
        post('/bands', new_params, new_session)
      }.to change(Band, :count).by(1)
      last_response.should be_redirect
    end
  end
end

///////////////////////////////////
band_spec.rb
///////////////////////////////////

require 'spec_helper'
MOST_IMPORTANT_POST_PUNK_BAND_EVER="Joy Division"

describe "Band, an Active Record-backed model" do
  it "should print out a name when instantiated with one" do
    proto_new_order = Band.new(name: MOST_IMPORTANT_POST_PUNK_BAND_EVER)
    expect(proto_new_order.name).to eq(MOST_IMPORTANT_POST_PUNK_BAND_EVER)
  end
end

///////////////////////////////////
demo_spec.rb
///////////////////////////////////

require 'spec_helper'
require 'json'

describe "Demo Service" do
  it "should print out an info string" do
    stub_response =  "Successful test"
    stub_application = OpenStruct.new({ :response => stub_response })
    d = Demo.new(stub_application)
    expect(d.info).to eq(%q,"Successful test",)
  end
end
