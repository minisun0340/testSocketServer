const express = require('express');
const app = express();

app.use("/", function(req, res){
    res.sendFile(__dirname + '/remote_index.html');
});

app.listen(8089);

//웹소켓 열기
const WebSocket = require('ws');
const socket = new WebSocket.Server({
    port:1111
});

//웹소켓으로 오는 유저메세지를 받으려면
socket.on('connection', (ws, req)=>{ //웹소켓에 특정 클라이언트가 연결되었을 때 실행
    ws.on('message', (msg)=>{
        console.log('유저가 보낸거:'+msg);
        let data = {"code":"11", "msg":"hello"};
        ws.send(JSON.stringify(data));
    })
});


// ws 대신 socket.io 라이브러리 쓰면
// - 연결 끊기면 자동 재접속 가능
// - 웹소켓 접속자마다 자동 id 부여
// - 모든 웹소켓 유저에게 전체 메세지 전송가능
// - 웹소켓 방을 생성 가능