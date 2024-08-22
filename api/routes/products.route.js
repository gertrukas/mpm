const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { productsGet, productGetPublic, productsGetPublic, productPost, productPut, productShow, productActive,
    productDelete } = require("../controllers/products.controller");

const router = Router();

router.get('/', [
    validateJWT
] , productsGet);

router.get('/public', productsGetPublic);

router.get('/public/:slug', [
    validateFields
] , productGetPublic);


router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], productPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], productPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], productShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    validateFields
], productActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], productDelete);

module.exports = router;
