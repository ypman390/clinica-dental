const express = require('express');
const cors = require('cors');

const dentistasRoutes = require('./routes/dentistas');
const pacientesRoutes = require('./routes/pacientes');
const citasRoutes = require('./routes/citas');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/dentistas', dentistasRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/citas', citasRoutes);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});