
const mongoose= require('mongoose')
const MONGODBURL = 'mongodb://localhost:27017/FOOTBALL_DB'
mongoose.connect(MONGODBURL)
const db = mongoose.connection;
db.on('error',function(err){
    console.log('error occoured' + err)
})
db.once('connected', function(){
    console.log('connection is successful to ' + MONGODBURL)

})
module.exports=db
