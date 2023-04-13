# Bot Client API
DiscordAPIの情報を取得するAPI
## ドキュメンテーション
- Bodyに```{"token":"DiscordBOTToken"}```を指定してください
- レスポンスのdataの中にリクエストに応じた結果が入っています
### /status [GET]
- ステータスを返します
### /check [POST]
- トークンが有効かどうか検証します
- 成功するとdata.loginがtrueになります
### /account [POST]
- BOTの情報を返します
### /users/{UserID} [POST]
- 指定したユーザーの情報を返します
### /guilds [POST]
- 参加しているサーバー一覧を返します
### /guilds/{GuildID} [POST]
- 指定したサーバーの情報を返します
### /guilds/{GuildID}/members [POST]
- 指定したサーバーのメンバーを返します
- Bodyに```{"limit":Number(1〜10000)}```を指定すると指定した人数の情報を返します(**デフォルト値は1**)
### /guilds/{GuildID}/members/{UserID} [POST]
- 指定したサーバーの指定したメンバーの情報を返します
### /guilds/{GuildID}/channels [POST]
- 指定したサーバーのチャンネル一覧を返します
### /channels/{ChannelID} [POST]
- 指定したチャンネルの情報を返します
### /channels/{ChannelID}/messages [POST]
- 指定したチャンネルのメッセージ一覧を返します
### /channels/{ChannelID}/messages/{MessageID} [POST]
- 指定したチャンネルの指定したメッセージの情報を返します
### /channels/{ChannelID}/message [POST]
- 指定したチャンネルにメッセージを送信します
- Bodyに```{"messsage":MessageObject}```を指定して送信してください