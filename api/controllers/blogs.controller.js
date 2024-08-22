const { request, response } = require('express');
const { Blog } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");
const { filesUpload: filesUploadHelper } = require("../helpers");

const blogsGetPublic = async (req, res = response) => {

    const { limit = 4, page, item } = req.query;
    let from = ((page ? page: 1) - 1) * limit;
    let blogs = [];
    let countBlogs;
    if (item) {
        const regex = new RegExp(item, 'i');
        [blogs, countBlogs] = await Promise.all([
            Blog.find({
                $or: [{name: regex}],
                $or: [{intro: regex}],
                $or: [{description: regex}],
                $and: [{active:true}]
            })
                 .limit(Number(limit))
                 .skip(Number(from))
                 .sort({date: -1}),

            Blog.countDocuments({
                    $or: [{name: regex}],
                    $or: [{intro: regex}],
                    $or: [{description: regex}],
                    $and: [{active:true}]
                })
        ]);
    } else {
        blogs = await Blog.find({active:true})
             .limit(Number(limit))
             .skip(Number(from))
             .sort({date: -1});
    }

    res.json({
        countBlogs,
        blogs
    });
};

const blogsChildrenGet = async ( req = request, res = response) => {
    const id = req.params.id;

    const blogs = await Blog.find({parent:id, delete:false});
    res.status(200).json({
        blogs
    });
}

const blogGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const blog = await Blog.findOne({slug}, {author:0, active:0, delete:0,  intro:0, images:0, post_type:0});
    res.status(200).json({
        blog
    });
}

const blogsGet = async (req, res = response) => {

    const [ totalBlogs, blogs, blogsAll] = await Promise.all([
        Blog.countDocuments({delete:false, parent:{$exists: false}}),
        Blog.find({delete:false, parent:{$exists: false}}).sort({date: -1}),
        Blog.find({delete:false}).sort({date: -1})
    ]);

    res.json({
        totalBlogs,
        blogs,
        blogsAll
    });
};

const blogPost = async (req = request, res = response) => {

    let { name, description, intro, date, post_type } = req.body;
    let image;
    let slug = urlSlug(name);
    let images = [];
    if(req.files){
        if(req.files.file){
            image = await fileUploadHelper(req.files, undefined, 'blogs');
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'blogs');
            } else {
                req.files.file = req.files.image
                let imageGallery = await fileUploadHelper(req.files, undefined, 'blogs');
                images.push(imageGallery);
            }
        }
    }
    let data;
    data = {name, description, intro, date, post_type, slug};
    data.image = image;
    let blog = new Blog(data);

    // Guardar en Base de datos
    await blog.save();

    blog = await Blog.findByIdAndUpdate(blog._id, {$push: {images: {$each: images}}}, {new:true});

    res.json({
        blog
    })
}

const blogActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [blog] = await Promise.all([
        Blog.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        blog,
        authenticatedUser
    });
}

const blogShow = async ( req = request, res = response) => {
    const id = req.params.id;
    const { name, slug } = req.body;

    const blog = await Blog.find({id, name, slug});
    res.status(200).json({
        blog
    });
}

const blogPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, description, intro, date, post_type } = req.body;
    let image;
    let slug = urlSlug(name);
    let images = [];
    let blog;
    let data = {name, description, intro, date, post_type, slug};
    if(req.files){
        if(req.files.file) {
            image = await fileUploadHelper(req.files, undefined, 'blogs');
            data.image = image
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'blogs');
                await Blog.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            } else {
                req.files.file = req.files.image
                imageGallery = await fileUploadHelper(req.files, undefined, 'blogs');
                images.push(imageGallery);
                await Blog.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            }
        }
    }

    blog = await Blog.findByIdAndUpdate(id, data, {new: true});


    res.status(201).json({
        blog
    });
}

const blogDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [blog] = await Promise.all([
        Blog.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        blog,
    });
}

module.exports = {
    blogsGetPublic,
    blogGetPublic,
    blogsGet,
    blogPost,
    blogActive,
    blogShow,
    blogPut,
    blogsChildrenGet,
    blogDelete
}
