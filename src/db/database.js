const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'clinica.db'));

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS dentistas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    especialidad TEXT NOT NULL,
    telefono TEXT,
    email TEXT
    
  );

  CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dni TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    email TEXT,
    telefono TEXT
  );

  CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    motivo TEXT,
    dentista_id INTEGER NOT NULL,
    paciente_id INTEGER NOT NULL,
    FOREIGN KEY (dentista_id) REFERENCES dentistas(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
  );
`);

module.exports = db;