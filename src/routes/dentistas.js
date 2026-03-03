const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - Obtener todos los dentistas
router.get('/', (req, res) => {
  const dentistas = db.prepare('SELECT * FROM dentistas').all();
  res.json(dentistas);
});

// GET - Obtener un dentista por ID
router.get('/:id', (req, res) => {
  const dentista = db.prepare('SELECT * FROM dentistas WHERE id = ?').get(req.params.id);
  if (!dentista) return res.status(404).json({ error: 'Dentista no encontrado' });
  res.json(dentista);
});

// POST - Crear un dentista
router.post('/', (req, res) => {
  const { nombre, apellidos, especialidad, telefono, email } = req.body;
  if (!nombre || !especialidad) {
    return res.status(400).json({ error: 'Nombre y especialidad son obligatorios' });
  }
  const result = db.prepare(
    'INSERT INTO dentistas (nombre, apellidos, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?)'
  ).run(nombre, apellidos, especialidad, telefono, email);
  res.status(201).json({ id: result.lastInsertRowid, nombre, apellidos, especialidad, telefono, email });
});

// PUT - Editar un dentista
router.put('/:id', (req, res) => {
  const { nombre, apellidos, especialidad, telefono, email } = req.body;
  const result = db.prepare(
    'UPDATE dentistas SET nombre = ?, apellidos = ?, especialidad = ?, telefono = ?, email = ? WHERE id = ?'
  ).run(nombre, apellidos, especialidad, telefono, email, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Dentista no encontrado' });
  res.json({ mensaje: 'Dentista actualizado correctamente' });
});

// DELETE - Eliminar un dentista
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM dentistas WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Dentista no encontrado' });
  res.json({ mensaje: 'Dentista eliminado correctamente' });
});

module.exports = router;