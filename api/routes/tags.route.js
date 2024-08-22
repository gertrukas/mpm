const { Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { tagsGet, tagGetPublic, tagsGetPublic, tagPost, tagPut, tagShow, tagActive,
    tagDelete } = require("../controllers/tags.controller");

const router = Router();

router.get('/', [
    validateJWT
] , tagsGet);

router.get('/public', tagsGetPublic);

router.get('/public/:slug', [
    validateFields
] , tagGetPublic);


router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], tagPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], tagPut);

router.get('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], tagShow);

router.post('/active', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('option', 'La opcion es obligatorio').not().isEmpty(),
    validateFields
], tagActive);


router.delete('/:id', [
    validateJWT,
    check('id', 'No es un id valido').isMongoId(),
    validateFields
], tagDelete);

module.exports = router;
