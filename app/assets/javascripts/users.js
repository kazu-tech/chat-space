$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html); //リストに追加するメソッド
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="ChatMember clearfix" id="${id}">
      <p class="ChatMember__name">${name}</p>
      <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".ChatMembers").append(html);
  }
  $("#user-search-field").on("keyup", function() { //ユーザー検索の欄にキーが押された時
    let input = $("#user-search-field").val(); //ユーザー検索をinputしたら
    $.ajax({ //非同期通信の記述
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty(); //ユーザー検索をからにする

        if (users.length !== 0) { //1文字以上入力したら
          users.forEach(function(user) { //ユーザーを順番に引っ張ってくる
            addUser(user); //ユーザーを追加する
          });
        } else if (input.length == 0) {　//一文字も入力されてない
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
});