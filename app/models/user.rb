class User < ApplicationRecord
  include Clearance::User

  enum role: { admin: 0, user: 1 }

  def is_admin?
    role == 'admin'
  end
end
