const { request, response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const {generateJWT} = require("../helpers");
const {Company} = require("../models");


const userGet = async (req, res = response) => {

    const [ total, users ] = await Promise.all([
        User.countDocuments({delete:false}),
        User.find({delete:false})
    ]);

    res.json({
        total,
        users
    });
};

const userPost = async (req = request, res = response) => {

    let { name, email, password, role } = req.body;

    const user = new User({name, email, password, role });

    // Encriptar contraseñana
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en Base de datos
    await user.save();

    // Generar JWT
    const token = await generateJWT(user._id);

    res.json({
        user,
        token
    })
}

const userActive = async (req = request, res = response) => {

    let { id, option } = req.body;

    const [user] = await Promise.all([
        User.findByIdAndUpdate(id,{active:option}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        user,
        authenticatedUser
    });
}

const userShow = async ( req = request, res = response) => {
    const id = req.params.id;

    const user = await User.findById(id);
    res.status(200).json({
        user
    });
}

const userPut = async ( req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, email, role, ...rest } = req.body;

    const userSearch = await User.findOne({email});

    if (userSearch){
        if (userSearch._id != id){
            return res.status(400).json({
                msg: `EL correo ${email} ya se encuentra registrado en la base de datos`
            });
        }
    }

    //  validar Contra base de datos
    if(password){
        // Encriptar contraseñana
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});
    res.status(201).json({
        user
    });
}

const userDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const [user] = await Promise.all([
        User.findByIdAndUpdate(id,{delete:true}, {new:true})
    ]);

    const authenticatedUser = req.user;

    res.json({
        user,
        authenticatedUser
    });
}

module.exports = {
    userGet,
    userPost,
    userActive,
    userShow,
    userPut,
    userDelete
}
