let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let projectModel = new Schema({
    title: {
        type: String
    },
    info: {type: String},
    date: {type: Date},
    read: {type: Boolean, default: false}
    

},{collection: "items"});

module.exports = mongoose.model('projects', projectModel);