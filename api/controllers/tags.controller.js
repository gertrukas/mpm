const { request, response } = require('express');
const { Tag } = require('../models');
const urlSlug = require('url-slug');
const { fileUpload: fileUploadHelper } = require("../helpers");
const { filesUpload: filesUploadHelper } = require("../helpers");

const tagsGetPublic = async (req, res = response) => {

    const { limit = 4, page, item } = req.query;
    let from = ((page ? page: 1) - 1) * limit;
    let tags = [];
    let countTags;
    if (item) {
        const regex = new RegExp(item, 'i');
        [tags, countTags] = await Promise.all([
            Tag.find({
                $or: [{name: regex}],
                $or: [{intro: regex}],
                $or: [{description: regex}],
                $and: [{active:true}]
            })
                 .limit(Number(limit))
                 .skip(Number(from))
                 .sort({date: -1}),

            Tag.countDocuments({
                    $or: [{name: regex}],
                    $or: [{intro: regex}],
                    $or: [{description: regex}],
                    $and: [{active:true}]
                })
        ]);
    } else {
        tags = await Tag.find({active:true})
             .limit(Number(limit))
             .skip(Number(from))
             .sort({date: -1});
    }

    res.json({
        countTags,
        tags
    });
};

const tagsChildrenGet = async ( req = request, res = response) => {
    const id = req.params.id;

    const tags = await Tag.find({parent:id, delete:false});
    res.status(200).json({
        tags
    });
}

const tagGetPublic = async ( req = request, res = response) => {
    const slug = req.params.slug;

    const tag = await Tag.findOne({slug}, {author:0, active:0, delete:0,  intro:0, images:0, post_type:0});
    res.status(200).json({
        tag
    });
}

const tagsGet = async (req, res = response) => {

    const [ totalTags, tags, tagsAll] = await Promise.all([
        Tag.countDocuments({delete:false, parent:{$exists: false}}),
        Tag.find({delete:false, parent:{$exists: false}}),
        Tag.find({delete:false})
    ]);

    res.json({
        totalTags,
        tags,
        tagsAll
    });
};

const tagPost = async (req = request, res = response) => {

    let { name, description, intro, date, post_type } = req.body;
    let image;
    let slug = urlSlug(name);
    let images = [];
    if(req.files){
        if(req.files.file){
            image = await fileUploadHelper(req.files, undefined, 'tags');
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'tags');
            } else {
                req.files.file = req.files.image
                let imageGallery = await fileUploadHelper(req.files, undefined, 'tags');
                images.push(imageGallery);
            }
        }
    }
    let data;
    data = {name, description, intro, date, post_type, slug};
    data.image = image;
    let tag = new Tag(data);

    // Guardar en Base de datos
    await tag.save();

    tag = await Tag.findByIdAndUpdate(tag._id, {$push: {images: {$each: images}}}, {new:true});

    res.json({
        tag
    })
}

const tagActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [tag] = await Promise.all([
        Tag.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        tag,
        authenticatedUser
    });
}

const tagShow = async ( req = request, res = response) => {
    const id = req.params.id;
    const { name, slug } = req.body;

    const tag = await Tag.find({id, name, slug});
    res.status(200).json({
        tag
    });
}

const tagPut = async ( req = request, res = response) => {
    const id = req.params.id;
    let { name, description, intro, date, post_type } = req.body;
    let image;
    let slug = urlSlug(name);
    let images;
    let tag;
    let data = {name, description, intro, date, post_type, slug};
    if(req.files){
        if(req.files.file) {
            image = await fileUploadHelper(req.files, undefined, 'tags');
            data.image = image
        }
        if(req.files.image){
            if(Array.isArray(req.files.image)) {
                images = await filesUploadHelper(req.files.image, undefined, 'tags');
                await Tag.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            } else {
                req.files.file = req.files.image
                imageGallery = await fileUploadHelper(req.files, undefined, 'tags');
                images.push(imageGallery);
                await Tag.findByIdAndUpdate(id, {$push: {images: {$each: images}}});
            }
        }
    }

    tag = await Tag.findByIdAndUpdate(id, data, {new: true});


    res.status(201).json({
        tag
    });
}

const tagDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [tag] = await Promise.all([
        Tag.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    res.json({
        tag,
    });
}

module.exports = {
    tagsGetPublic,
    tagGetPublic,
    tagsGet,
    tagPost,
    tagActive,
    tagShow,
    tagPut,
    tagsChildrenGet,
    tagDelete
}
