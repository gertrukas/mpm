const { request, response } = require('express');
const { Product, Blog} = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");
const { filesUpload: filesUploadHelper } = require("../helpers");

const productsGetPublic = async (req, res = response) => {

    const { limit = 4, page = 1, item } = req.query;
    let from = (page - 1) * limit;
    let products = [];
    if (item) {
        const regex = new RegExp(item, 'i');
        products = await Product.find({
            $or: [{name: regex}],
            $or: [{intro: regex}],
            $or: [{description: regex}],
            $and: [{active:true}]
        })
             .limit(Number(limit))
             .skip(Number(from))
             .sort({date: -1}).populate('categories');
    } else {
        products = await Product.find({active:true})
             .limit(Number(limit))
             .skip(Number(from))
             .sort({name : 1}).populate('categories');
    }

    res.json({
        products
    });
};

const productsChildrenGet = async ( req = request, res = response) => {
    const id = req.params.id;

    const products = await Product.find({parent:id, delete:false});
    res.status(200).json({
        products
    });
}

const productGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const product = await Product.findOne({slug}, {author:0, active:0, delete:0,  intro:0, images:0, post_type:0}).populate('categories');
    res.status(200).json({
        product
    });
}

const productsGet = async (req, res = response) => {

    const [ totalproducts, products, productsAll] = await Promise.all([
        Product.countDocuments({delete:false, parent:{$exists: false}}),
        Product.find({delete:false, parent:{$exists: false}}).sort({name : 1}).populate('categories'),
        Product.find({delete:false}).sort({name : 1}).populate('categories')
    ]);

    res.json({
        totalproducts,
        products,
        productsAll
    });
};

const productPost = async (req = request, res = response) => {

    let { name, description, intro, model, key, news, size, categories } = req.body;
    let image;
    let slug = urlSlug(name);
    let images = [];
    const date = new Date(Date.now());
    _categories = categories.split(',');
    if(req.files){
        if(req.files.file){
            image = await fileUploadHelper(req.files, undefined, 'products');
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'products');
            } else {
                req.files.file = req.files.image
                let imageGallery = await fileUploadHelper(req.files, undefined, 'products');
                images.push(imageGallery);
            }
        }
    }
    let data;
    data = {name, description, slug, date, intro, model, key, news, size};
    data.image = image;
    let product = new Product(data);

    // Guardar en Base de datos
    await product.save();

    product = await Product.findByIdAndUpdate(product._id, {$push: {categories: {$each: _categories}}}, {new:true});

    product = await Product.findByIdAndUpdate(product._id, {$push: {images: {$each: images}}}, {new:true});


    res.json({
        product
    })
}

const productActive = async (req = request, res = response) => {

    let { id, option } = req.body;
    const date_update = new Date(Date.now()); 

    const [product] = await Promise.all([
        Product.findByIdAndUpdate(id,{active:option, date_update:date_update}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        product,
        authenticatedUser
    });
}

const productShow = async ( req = request, res = response) => {
    const id = req.params.id;
    const { name, slug } = req.body;

    const product = await Product.find({id, name, slug});
    res.status(200).json({
        product
    });
}

const productPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, description, intro, model, key, news, size, categories  } = req.body;
    let image;
    let images = [];
    let slug = urlSlug(name);
    const _categories = categories.split(',');
    let product;
    let data = {name, description, slug, intro, model, key, news, size};
    if(req.files){
        if(req.files.file) {
            image = await fileUploadHelper(req.files, undefined, 'products');
            data.image = image
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'products');
                await Product.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            } else {
                req.files.file = req.files.image
                imageGallery = await fileUploadHelper(req.files, undefined, 'products');
                images.push(imageGallery);
                await Product.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            }
        }
    }


    product = await Product.findByIdAndUpdate(id, data, {new: true});

    product = await Product.findByIdAndUpdate(product._id, {$push: {categories: {$each: _categories}}}, {new:true});


    res.status(201).json({
        product
    });
}

const productDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [product] = await Promise.all([
        Product.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        product,
    });
}

module.exports = {
    productsGetPublic,
    productGetPublic,
    productsGet,
    productPost,
    productActive,
    productShow,
    productPut,
    productsChildrenGet,
    productDelete
}
