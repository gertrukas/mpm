const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    slug: {
        type: String,
        required: [true, 'El slug es obligatorio']
    },
    description: {
        type: String,
    },
    intro: {
        type: String,
    },
    date_create: {
        type: Date,
    },
    date_update: {
        type: Date,
    },
    image: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    delete: {
        type: Boolean,
        default: false
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Category',  CategorySchema);