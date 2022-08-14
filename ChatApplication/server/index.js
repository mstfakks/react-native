

var express = require('express');
var app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server);

app.get('/', function (req,res){ 
    res.send('Hello'); 
});
let connectionRoomCount = {};
io.on('connection', function(socket){
    socket.on('connection-room',(data) => {
        socket.join(data.roomId);
        connectionRoomCount[data.roomId] = (typeof connectionRoomCount[data.roomId] == 'undefined' ? 0 : connectionRoomCount[data.roomId]) + 1;
        io.to(data.roomId).emit('connection-room-view', {count: connectionRoomCount[data.roomId]});    
    });

    socket.on('leave-room',(data) => {

    });
});

server.listen(3000); 



/*
//PUSH BİLDİRİM
const fcm = require('fcm-notification'); //Burada fcm-notification paketimizi bir değişkjene eşitledik. 
const FCM = new fcm('./chatapplication-21c59-firebase-adminsdk-3q9i5-abdb66a544.json'); //Burada bir önceki eşitlediğimiz değişken içerisinde firebase içerisinden oluşturduğumuz
//özel anahtarın ismini verdik
const token = "crW_ZyynQZWSh8l-4CnJ8A:APA91bHnfuZVTEgbhmlMtUC6zfDtwdO1lp-Gzg9D2ZvTeGly5GpLqcN_kVdmG6HnsR7ILi_t_FEyAGp9yFNF4cGldLFNp3CH5EF9TK-jYBOS6xcIUUNT-WnjDeGnh7CF_KFRIYowkOhx";
//Yukarıda ise token ımızı oluşturduk.
var message = { //Bu kısımda mesaj tanımlamamızı yaptık.
    notification:{ //Ve bildirimimizin title ve body sini oluşturduk.
        title: 'Sonunda Bu hata da çözüldü',
        body: 'Node.js üzerinden bildirim alınabiliyor'
    },
    token:token //cihazımızın tokenını bu message ifadesinin token parametresine eşitledik.
};
FCM.send(message, function(err, response){ //Buradan mesaj gönderimimizi sağladık.
    if (err) {
        console.log('error found', err);
    } else {
        console.log('response here', response);
    }
});
//Hem IOS hem Androide bildirim gönderme paket linkinde bulunuyor.
*/




