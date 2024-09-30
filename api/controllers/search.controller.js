const { request, response } = require('express');
const { Blog, Category, Product, User } = require("../models");
const { ObjectId } = require('mongoose').Types;
const allowedCollections = [
    'blogs',
    'products',
    'roles',
    'all',
    'users'
];

const searchCategories = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const category = await Category.findById(item)
            .populate('user', 'name');
        return res.json({
            result: (category) ? [category]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, categories ] = await Promise.all([
        Category.count({
            $or: [{name: regex}],
            $and: [{active:true}]
        }),
        Category.find({
            $or: [{name: regex}],
            $and: [{active:true}]
        }).populate('user', 'name'),
    ]);
    res.json({
        result: {
            count,
            categories
        }
    });

};

const searchProducts = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const product = await Product.findById(item)
            .populate('user', 'name')
            .populate('category', 'name');
        return res.json({
            result: (product) ? [product]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, products ] = await Promise.all([
        Product.count({
            $or: [{name: regex}],
            $and: [{active:true}]
        }),
        Product.find({
            $or: [{name: regex}],
            $and: [{active:true}]
        })
            .populate('user', 'name')
            .populate('category', 'name'),
    ]);
    res.json({
        result: {
            count,
            products
        }
    });

};

const searchUsers = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const user = await User.findById(item);
        return res.json({
            result: (user) ? [user]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, users ] = await Promise.all([
        User.count({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
        User.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
    ]);
    res.json({
        result: {
            count,
            users
        }
    });

};

const searchBlogs = async (item = '', res = response, req = request) => {

    const { limit = 3, page = 1 } = req.query;
    let from = (page - 1) * limit;
    const regex = new RegExp(item, 'i');
    const [ count, blogs ] = await Promise.all([
        Blog.count({
            $or: [{name: regex}, {slug: regex}, {description: regex}, {intro: regex}],
            $and: [{active:true}]
        }),
        Blog.find({
            $or: [{name: regex}, {slug: regex}, {description: regex}, {intro: regex}],
            $and: [{active:true}]
        })
        .limit(Number(limit))
        .skip(Number(from))
        .sort({date: -1}),
    ]);
    res.json({
        result: {
            count,
            blogs
        }
    });

};

const searchAll = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    const regex = new RegExp(item, 'i');
    const [ count, users ] = await Promise.all([
        Blog.count({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
        Blog.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
    ]);
    res.json({
        result: {
            count,
            users
        }
    });

};

const search = (req= request, res= response ) => {
    const { collection, item } = req.params;

    if (!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`,
        });
    }
    switch (collection){
        case'blogs':
            searchBlogs(item, res, req);
            break;
        case'users':
            searchUsers(item, res, req);
            break;    
        case'categories':
            searchCategories(item, res, req);
            break;
        case'products':
            searchProducts(item, res, req);
            break;
        case'all':
            searchAll(item, res, req);
            break;    
        default:
            res.status(500).json({
                msg: 'Sele olvido hacer esta búsqueda'
            });
    }

};

module.exports = {
    search
}
