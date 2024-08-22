const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { categoriesGet, categoryGetPublic, categoriesGetPublic, categoryPost, categoryPut, categoryShow, categoryActive,
    categoryDelete } = require("../controllers/categories.controller");

const router = Router();

router.get('/', [
    validateJWT
] , categoriesGet);

router.get('/public', categoriesGetPublic);

router.get('/public/:slug', [
    validateFields
] , categoryGetPublic);


router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], categoryPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], categoryPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], categoryShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    validateFields
], categoryActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], categoryDelete);

module.exports = router;
