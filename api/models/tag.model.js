const { Schema, model } = require('mongoose');

const TagSchema =  Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    intro: {
        type: String,
    },
    date: {
        type: Date,
    },
    image: {
        type: String,
    },
    images: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    },
    delete: {
        type: Boolean,
        default: false
    }
});

TagSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Tag',  TagSchema);