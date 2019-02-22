# FactoryBot.define do
#   sequence :email do |n|
#     "person#{n}@example.com"
#   end
# end

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| puts n.inspect; "person#{n}@example.com" }
    password { "one_password"}
  end
end
