import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const models = {
    artworkSchema: new Schema({
        title: { type: String},
        title_shortname: {type: String},
        location: {type: String},
        artistID: {type: String},
        tags : { type : Array , "default" : [] }
    })
}

export default models;