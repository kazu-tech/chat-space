class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params) #messageのインスタンス変数生成
    if @message.save #messeageが入力されてMessageインスタンスを保存できたら
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        #リクエストがHTMLであれば、リダイレクトでgroup_messagesのページ表示して'メッセージが送信されました'と表示
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。' 
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    
  end
end