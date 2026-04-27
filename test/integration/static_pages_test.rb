require 'test_helper'

class StaticPagesTest < ActionDispatch::IntegrationTest
  test "root page bootstraps current user as inert JSON, not executable script" do
    user = create_user!(username: "</script><img src=x onerror=alert(1)>")
    login_as(user)

    get "/"

    assert_response :success
    payload_block = response.body[/<script type="application\/json" id="bootstrap-current-user">(.*?)<\/script>/m, 1]
    assert payload_block.present?, "expected JSON bootstrap script in layout"
    refute_includes payload_block, "</script>", "raw </script> must not appear inside the JSON payload"
    refute_includes payload_block, "<img", "raw <img tag must not appear unescaped inside the JSON payload"
  end

  test "root page renders without bootstrap when logged out" do
    get "/"

    assert_response :success
    assert_no_match(/bootstrap-current-user/, response.body)
  end
end
