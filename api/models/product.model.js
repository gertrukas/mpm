const { Schema, model } = require('mongoose');

const ProductSchema =  Schema({
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
    model : {
        type: String,
    },
    key : {
        type: String,
    },
    new : {
        type: Boolean,
        default: true,
    },
    size : {
        type: String,
    },
    image: {
        type: String,
    },
    images: [{
        type: String
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
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

ProductSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Product',  ProductSchema);