const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('productos/add');
    //res.send('From :D');
});

//Insertar Datos

router.post('/add', async (req, res) => {
    const {Nombre, Precio, Descripcion } = req.body;
    const nuevoProducto = {
        Nombre,
        Precio,
        Descripcion
    };
    await pool.query('INSERT INTO productos set ?', [nuevoProducto]);
    req.flash('success', 'Producto Guardado');
    res.redirect('/productos');
    //console.log(newLink);
    //res.send('Link Guardado ...');

});

//Listar datos

router.get('/', async (req, res) => {
    const productos = await pool.query('SELECT * FROM productos');
    console.log('productos');
    //res.send('Aqui estan los links ...');
    res.render('productos/list', { productos });
});

//Eliminar Datos

router.get('/delete/:idProductos', async (req, res) => {
    const { idProductos } = req.params;
    await pool.query('DELETE FROM productos WHERE idProductos = ?', [idProductos]);
    req.flash('success', 'Producto Eliminado');
    res.redirect('/productos');

    //console.log(req.params.id);
    //res.send('Borrado');

});

//Editar Datos

router.get('/edit/:idProductos', async (req, res) => {
    const { idProductos } = req.params;
    const productos = await pool.query('SELECT * FROM productos WHERE idProductos = ?', [idProductos]);
    //console.log(links [0]);
    res.render('productos/edit', {producto: productos [0]});
    //res.send('Listo');
});

router.post('/edit/:idProductos', async (req, res) => {
    const { idProductos } = req.params;
    const { Nombre, Precio, Descripcion } = req.body;
    const nuevoProducto = {
        Nombre,
        Precio,
        Descripcion
    };
    console.log(nuevoProducto);
    //res.send('Listo')
    //console.log(newLink);
    await pool.query('UPDATE productos set ? WHERE idProductos = ?', [nuevoProducto, idProductos]);
    req.flash('success', 'Producto Actualizado');
    res.redirect('/productos');
});

module.exports = router;