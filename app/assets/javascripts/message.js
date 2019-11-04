$(function(){
  function buildHTML(message){ //_message.html.hamlからクラスを引っ張ってくる
    if ( message.image) {
      var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${ message.user_name }
            </div>
            <div class="upper-message__date">
              ${ message.time }
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${ message.content }
            </p>
        </div>
        <img src=${message.image} >
      </div>`
    return html;
  } else {
    var html =
    `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();　//メッセージが送信されたらイベント発火。この行でデフォルトを止める
    var message = new FormData(this); //1行目の＃new_messageをFormDataの中に入れる
    var url = $(this).attr('action'); //action属性を取得して変数urlに代入

    $.ajax({  //フォームが送信された時イベント発火としてajaxを使用してmessages#createが動くようにする
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false, //リクエストに含まれているdataの型はこれですよの記述を変更しないという意味
      contentType: false,  //リクエストに含まれているdataの実際の型を変更しないための記述
    })
    
    .done(function(message) {　//ajaxのリクエストが通ったらここに来る
      var html = buildHTML(message);　//非同期でメッセージを送る時
      $('.message').append(html);　//作成したHTMLをメッセージ画面の一番下に追加する {append()の使い方【 対象要素.append( 追加したい要素 ) 】}
      $('.form__submit').prop('disabled', false);　//送信ボタンを有効にする
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('form')[0].reset();
    })
    // ajaxのリクエストが通らなかったらこっちに来る
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    });
  })
});