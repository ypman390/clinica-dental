const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - Obtener todos los pacientes
router.get('/', (req, res) => {
  const pacientes = db.prepare('SELECT * FROM pacientes').all();
  res.json(pacientes);
});

// GET - Obtener un paciente por ID
router.get('/:id', (req, res) => {
  const paciente = db.prepare('SELECT * FROM pacientes WHERE id = ?').get(req.params.id);
  if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json(paciente);
});

// POST - Crear un paciente
router.post('/', (req, res) => {
  const { dni, nombre, apellidos, email, telefono } = req.body;
  if (!dni || !nombre) {
    return res.status(400).json({ error: 'DNI y nombre son obligatorios' });
  }
  const result = db.prepare(
    'INSERT INTO pacientes (dni, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?)'
  ).run(dni, nombre, apellidos, email, telefono);
  res.status(201).json({ id: result.lastInsertRowid, dni, nombre, apellidos, email, telefono });
});

// PUT - Editar un paciente
router.put('/:id', (req, res) => {
  const { dni, nombre, apellidos, email, telefono } = req.body;
  const result = db.prepare(
    'UPDATE pacientes SET dni = ?, nombre = ?, apellidos = ?, email = ?, telefono = ? WHERE id = ?'
  ).run(dni, nombre, apellidos, email, telefono, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json({ mensaje: 'Paciente actualizado correctamente' });
});

// DELETE - Eliminar un paciente
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM pacientes WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json({ mensaje: 'Paciente eliminado correctamente' });
});

module.exports = router;