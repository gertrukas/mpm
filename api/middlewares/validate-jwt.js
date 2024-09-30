const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        if(!user.active){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        req.uid = uid;
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validateJWT
}
