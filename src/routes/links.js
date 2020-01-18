const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
    //res.send('From :D');
});

//Insertar Datos

router.post('/add', async (req, res) => {
    const {title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link Guardado');
    res.redirect('/links');
    //console.log(newLink);
    //res.send('Link Guardado ...');

});

//Listar datos

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    console.log('links');
    //res.send('Aqui estan los links ...');
    res.render('links/list', { links });
});

//Eliminar Datos

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Eliminado');
    res.redirect('/links');
    //console.log(req.params.id);
    //res.send('Borrado');
});

//Editar Datos

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    //console.log(links [0]);
    res.render('links/edit', {link: links [0]});
    //res.send('Listo');
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink);
    //res.send('Listo')
    //console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Actualizado');
    res.redirect('/links');
});

//Exportar Datos
module.exports = router;