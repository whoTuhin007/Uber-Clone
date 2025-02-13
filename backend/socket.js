const socketIo = require("socket.io");
let io;

const userModel = require('./models/userSchema')
const captainModel= require('./models/captainModel')


function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin:["*","https://backend-270ii71l3-whotuhin007s-projects.vercel.app"] ,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A new client connected:", socket.id);

    socket.on('join', async (data)=>{
    
        const {userId, userType}= data;
        if(userType=== 'user' && userId ){
            console.log(`User ${userId} joined the room as ${userType}`);

            try{
                
                const user = await userModel.findByIdAndUpdate(userId,{
                    socketId : socket.id
                });
           
            }
            catch(err){
                console.log(err);
            }
      

        }
        else if(userType ==="captain" && userId ){
            try{
                console.log(`User ${userId} joined the room as ${userType}`);

                const captain = await captainModel.findByIdAndUpdate(userId,{
                    socketId : socket.id
                    });
                
            }
            catch(err){
                console.log(err);
            }
        
            
        }
    })

    

    socket.on('update-location-captain', async (data) => {
        const { userId, lat,long } = data;

        if (!userId || !lat || !long) {
            return socket.emit('error', { message: 'Invalid location data' });
        }

        await  captainModel.findByIdAndUpdate(userId, {
            location: {
                type:'Point',
                coordinates: [long,lat]
               
            }
        });

    });



    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
}

// Function to send messages to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {

    console.log('message object',messageObject);
    console.log('socket id', socketId);
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }


module.exports = { initializeSocket, sendMessageToSocketId };
