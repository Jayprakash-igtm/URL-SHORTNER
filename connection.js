const mongoose = require('mongoose');

async function ConnectionToMongoDB(url){
return mongoose.connect(url);
}
module.exports= {ConnectionToMongoDB};
