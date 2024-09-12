import { world, system } from "@minecraft/server"; // モジュールからworld、systemを読み込む

world.beforeEvents.chatSend.subscribe((ev) => { // プレイヤーがチャットにメッセージを送信した際に実行される
    // sender - チャットを送信したプレイヤー
    // message - チャットに送信したメッセージ
    const { sender, message } = ev; // evからsenderとmessageを取り出す
    
    if (message.startsWith("!")) { // メッセージが"!"から始まっているなら実行
        ev.cancel = true; // チャットの送信を取り消す

        system.runTimeout(() => { // 処理に遅延を挟む (beforeEventsを使用する場合、ScriptAPIの仕様で何らかの処理を実行するときに遅延が必要)
            const args = message.slice(1).split(" "); // メッセージから"!"を消し、空白ごとに区切り配列に格納する
            // 例) "!tp 1 2 3" -> [ "tp", "1", "2", "3" ]
            
            if (args[0] === "lobby") { // 最初の文字列(つまりコマンドの名前)が"lobby"なら実行
                sender.teleport({ x: 0, y: 0, z: 0 }); // プレイヤーを(0, 0, 0)にテレポート
                sender.sendMessage("ロビーにテレポートしました。"); // プレイヤーに成功したメッセージを送信
            }

            if (args[0] === "teleport" || args[0] === "tp") { // コマンド名が"teleport"、若しくは"tp"なら実行
                const x = Number(args[1]); // 1つ目の値(x座標)を数値に変換し格納
                const y = Number(args[2]); // 2つ目の値(y座標)を数値に変換し格納
                const z = Number(args[3]); // 3つ目の値(z座標)を数値に変換し格納
                sender.teleport({ x: x, y: y, z: z }); // プレイヤーを指定した(x, y, z)座標にテレポート
                sender.sendMessage(`(${x}, ${y}, ${z})にテレポートしました。`); // // プレイヤーに成功したメッセージを送信
            }
        }, 0);
    }
});