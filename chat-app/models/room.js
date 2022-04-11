const mongoose= require('mongoose')
const RoomSchema= new mongoose.Schema({
    client_id:{
      type:Number,
      required:[true]
    },
    agent_id:{
      type:Number,
      required:[true]
    },
     chat:[
          {
          name:{type:String},
          message:{type:String}
          }     
        ],
      open:{
       type:Boolean,
       required:[true]
      }
}, { timestamps: { createdAt: 'created_at' } });
module.exports = mongoose.models.rooms || mongoose.model('rooms',RoomSchema);