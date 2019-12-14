var Mongoose = require('mongoose');
var statuses = ['Movie','InProcess','Completed'];
var Schema = Mongoose.Schema;

var MoviesSchema = new Schema({
    userid : { type: Schema.Types.ObjectId, required: true },
    Movie : { type: String, required: true },
    Moviedetail :{ type: String},
    dateWatched :{type: Date, default: Date.now},
    datePlanned :{type: Date, default: Date.now},
    status: { type: String, Enum: ['Never Watched','In Process', 'Completed'], default: 'In Process' }
    // ,
    // picture : {
    //     name:  { type: String },
    //     originalname: { type: String }
    // }
});

module.exports = Mongoose.model('Movies', MoviesSchema);


