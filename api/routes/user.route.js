const { Router} = require('express');
const { userGet, userDelete, userPut, userActive, userShow, userPost} = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { existEmail, existUserForId, existEmailUpdate } = require("../helpers/db-validators");

const router = Router();

router.get('/', [
    validateJWT
] , userGet);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 8 caracteres').isLength({min:8}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    validateFields
], userPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    check('id').custom(existUserForId),
    validateFields
], userActive);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserForId),
    validateFields
], userDelete);

module.exports = router;
