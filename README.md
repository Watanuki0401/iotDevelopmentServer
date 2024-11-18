# To be done at 1st startup.
1. EXECUTE `docker compose up -d`.
2. EXECUTE `npx create-next-app@latest . --typescript --tailwind --eslint --no-src-dir --app --no-import-alias` after start up container.

# How to start after the 1st time.
1. If this container had removed, You should execute `docker compose up -d`.
2. Access the this container path `/app/container-app`.
3. You have can execute `npm i`.

## rootlessdocker
```
 chmod -R "=r,u+w,g+w,o+w,+X" src/
```

# iotDevelopmentServerとして使用する場合
> [!NOTE]
> ${variable}と表記されている場所は、$や{}を含めたすべてを置き換えてください。  \
> 例：`git clone http://example.com testdir`

1. 本リポジトリをクローンする。  \
   `git clone ${RepojitoryURI}`または`git clone ${RepojitoryURI} ${DirectoryName}`をターミナル上で実行する。  \
   後者は共有ユーザやディレクトリを使用している際に競合を防ぐためディレクトリ名を任意に変更するものである。
2. クローンしたディレクトリに移動。`cd ${clonedDirctoryName}`で移動可能。
3. 不足しているディレクトリ郡を生成する。`mkdir config data timestampdata`を実行しディレクトリができたことを`ls`で確認してください。
4. `id`を実行しuidとgidを確認する。
5. `compose.yaml`を編集する。
   - nameを任意の名称に変更（英小文字, _, -のみ使用可能）
   - 各コンテナのPortsを変更（使用中のポートと被らないようなポートを使用）
   - webコンテナ内のUID、GIDをstep. 4で確認したuid, gidに変更する。
6. `docker compose up -d`でコンテナを立ち上げる。
7. `URI:timestampdbPort`でinfluxdbヘアクセス後、画面の案内に従いユーザを作成する。  \
   この際にtokenが生成されるので必ずコピーして控えておく。
8. `${name}-web-1`というコンテナをvsCodeで接続し、ターミナルを立ち上げる。
9. `code /app/container-app -r`または`ファイル>フォルダーを開く`にて立ち上がる入力欄に、すでに入力されている内容を削除したうえで`/app/container-app`と入力しOKを押下する。
10. `npm install`を実行し待つ。
11. `npx auth secret`を実行し`.env.local`が生成されるのを待つ。
12. `.env.local`に6で生成したtokenを`INFLUXDB_TOKEN="${token}"`として貼り付ける。
13. `HOST_ADDRESS="URI:webPort"`と`HOST_INFLUX_ADDRESS="URI:timestampdataPort"`を`.env.local`を記入する。
14. `npx prisma db push; npx prisma generate`を実行する。
15. `npm run dev`を実行する。
16. 動作確認して動けば完了
