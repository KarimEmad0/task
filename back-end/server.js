const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'chat';
let db
const io = require('socket.io')(4000).sockets; //socket is a js library for make a real-time web app, it's like web socket 
// server-side
// Connect to mongo
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)

    // Storing a reference to the database so you can use it later
    db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
    //var dbo = db.db("chat");
     //db.createCollection("clients", function(err, res) {
    //if (err) throw err;
    //console.log("Collection created!");


    io.on('connection', function(socket){
        //pass something from server to client in index.html we want to emit
        // Create function to send status 
        console.log("Made socket connection");
        send_status = function(st){
        socket.emit('status', st);   
    }
    
    var room=db.collection('rooms') //create collection esmo rooms
        // Get chats from mongo collection
    room.find().sort({_id:1}).toArray(function(err, response){
        if(err){
            throw err;
        }
        // Emit the messages
        socket.emit('output', response); //emit to the client
    });
    
    //get input from client
    socket.on('input',function(data){ // data that sent from the user     
        
        let name= data.name;
        let message=data.message;
        if(name==''||message==''){
            sendStatus("Please enter name and message");
        }else{
            // Insert message
            chat.insert({name: name, message: message}, function(){
                io.emit('output', [data]);

                // Send status object
                send_status({
                    message: 'Message sent',
                    clear: true
                });
            });
        }
        
    }); 
     // Handle clear
     socket.on('clear', function(data){
        // Remove all chats from collection
        chat.remove({}, function(){
            // Emit cleared
            socket.emit('cleared');
        });
    });
});
});

/*  
MongoClient.connect('mongodb://127.0.0.1:27017/chat_app', function(err, db){
    if(err){
        throw err;
    }
        console.log('Database connected successfully');
    
   
     // let define variable f kol 7eta f code 7ta lw est5dmt variable abl m a3rfo , lakn var lazm a3rf el variable abl m   
        
        io.on('connection', function(socket){
            //pass something from server to client in index.html we want to emit
            // Create function to send status 
            console.log("Made socket connection");
            send_status = function(st){
            socket.emit('status', st);   
        }
        
        var room=db.collection('rooms') //create collection esmo rooms
            // Get chats from mongo collection
        room.find().sort({_id:1}).toArray(function(err, response){
            if(err){
                throw err;
            }
            // Emit the messages
            socket.emit('output', response); //emit to the client
        });
        
        //get input from client
        socket.on('input',function(data){ // data that sent from the user     
            
            let name= data.name;
            let message=data.message;
            if(name==''||message==''){
                sendStatus("Please enter name and message");
            }else{
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    io.emit('output', [data]);

                    // Send status object
                    send_status({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
            
        }); 
         // Handle clear
         socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});
// QTRL + C TO EXIT MONGO SERVER
*/