const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - Obtener todas las citas (con nombre de dentista y paciente)
router.get('/', (req, res) => {
  const citas = db.prepare(`
    SELECT citas.*, 
      dentistas.nombre || ' ' || dentistas.apellidos AS dentista,
      pacientes.nombre || ' ' || pacientes.apellidos AS paciente
    FROM citas
    JOIN dentistas ON citas.dentista_id = dentistas.id
    JOIN pacientes ON citas.paciente_id = pacientes.id
  `).all();
  res.json(citas);
});

// GET - Obtener una cita por ID
router.get('/:id', (req, res) => {
  const cita = db.prepare(`
    SELECT citas.*, 
      dentistas.nombre || ' ' || dentistas.apellidos AS dentista,
      pacientes.nombre || ' ' || pacientes.apellidos AS paciente
    FROM citas
    JOIN dentistas ON citas.dentista_id = dentistas.id
    JOIN pacientes ON citas.paciente_id = pacientes.id
    WHERE citas.id = ?
  `).get(req.params.id);
  if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
  res.json(cita);
});

// POST - Crear una cita
router.post('/', (req, res) => {
  const { fecha, hora, motivo, dentista_id, paciente_id } = req.body;
  if (!fecha || !hora || !dentista_id || !paciente_id) {
    return res.status(400).json({ error: 'Fecha, hora, dentista y paciente son obligatorios' });
  }
  const result = db.prepare(
    'INSERT INTO citas (fecha, hora, motivo, dentista_id, paciente_id) VALUES (?, ?, ?, ?, ?)'
  ).run(fecha, hora, motivo, dentista_id, paciente_id);
  res.status(201).json({ id: result.lastInsertRowid, fecha, hora, motivo, dentista_id, paciente_id });
});

// PUT - Editar una cita
router.put('/:id', (req, res) => {
  const { fecha, hora, motivo, dentista_id, paciente_id } = req.body;
  const result = db.prepare(
    'UPDATE citas SET fecha = ?, hora = ?, motivo = ?, dentista_id = ?, paciente_id = ? WHERE id = ?'
  ).run(fecha, hora, motivo, dentista_id, paciente_id, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Cita no encontrada' });
  res.json({ mensaje: 'Cita actualizada correctamente' });
});

// DELETE - Eliminar una cita
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM citas WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Cita no encontrada' });
  res.json({ mensaje: 'Cita eliminada correctamente' });
});

module.exports = router;