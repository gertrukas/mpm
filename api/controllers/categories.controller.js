const { request, response } = require('express');
const { Category } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");
const { filesUpload: filesUploadHelper } = require("../helpers");

const categoriesGetPublic = async (req, res = response) => {

    const { limit = 4, page = 1, item } = req.query;
    let from = (page - 1) * limit;
    let categories = [];
    if (item) {
        const regex = new RegExp(item, 'i');
        categories = await Category.find({
            $or: [{name: regex}],
            $or: [{intro: regex}],
            $or: [{description: regex}],
            $and: [{active:true}]
        })
             .limit(Number(limit))
             .skip(Number(from))
             .sort({date: -1});
    } else {
        categories = await Category.find({active:true})
             .limit(Number(limit))
             .skip(Number(from))
             .sort({date: -1});
    }

    res.json({
        categories
    });
};

const categoriesChildrenGet = async ( req = request, res = response) => {
    const id = req.params.id;

    const categories = await Category.find({parent:id, delete:false});
    res.status(200).json({
        categories
    });
}

const categoryGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const category = await Category.findOne({slug}, {author:0, active:0, delete:0,  intro:0, images:0, post_type:0});
    res.status(200).json({
        category
    });
}

const categoriesGet = async (req, res = response) => {

    const [ totalcategories, categories, categoriesAll] = await Promise.all([
        Category.countDocuments({delete:false, parent:{$exists: false}}),
        Category.find({delete:false, parent:{$exists: false}}),
        Category.find({delete:false})
    ]);

    res.json({
        totalcategories,
        categories,
        categoriesAll
    });
};

const categoryPost = async (req = request, res = response) => {

    let { name, description } = req.body;
    let image;
    let slug = urlSlug(name);
    const date_create = new Date(Date.now()); 
    if(req.files){
        if(req.files.file){
            image = await fileUploadHelper(req.files, undefined, 'categories');
        }
    }
    console.log(image);
    let data;
    data = {name, description, slug, date_create:date_create};
    data.image = image;
    let category = new Category(data);

    // Guardar en Base de datos
    await category.save();

    res.json({
        category
    })
}

const categoryActive = async (req = request, res = response) => {

    let { id, option } = req.body;
    const date_update = new Date(Date.now()); 

    const [category] = await Promise.all([
        Category.findByIdAndUpdate(id,{active:option, date_update:date_update}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        category,
        authenticatedUser
    });
}

const categoryShow = async ( req = request, res = response) => {
    const id = req.params.id;
    const { name, slug } = req.body;

    const category = await Category.find({id, name, slug});
    res.status(200).json({
        category
    });
}

const categoryPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, description } = req.body;
    let image;
    let slug = urlSlug(name);
    const date_update = new Date(Date.now());
    let category;
    let data = {name, description, date_update, slug};
    if(req.files){
        if(req.files.file) {
            image = await fileUploadHelper(req.files, undefined, 'categories');
            data.image = image
        }
    }

    category = await Category.findByIdAndUpdate(id, data, {new: true});


    res.status(201).json({
        category
    });
}

const categoryDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [category] = await Promise.all([
        Category.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        category,
    });
}

module.exports = {
    categoriesGetPublic,
    categoryGetPublic,
    categoriesGet,
    categoryPost,
    categoryActive,
    categoryShow,
    categoryPut,
    categoriesChildrenGet,
    categoryDelete
}
