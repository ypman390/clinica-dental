# clinica-dental

Actividad para DAM Entornos de desarrollo



\# 🦷 Clínica Dental



Aplicación web para la gestión de una clínica dental. Permite gestionar dentistas, pacientes y citas mediante un CRUD completo.



\## 🛠️ Tecnologías utilizadas



\- \*\*Backend:\*\* Node.js + Express

\- \*\*Base de datos:\*\* SQLite (better-sqlite3)

\- \*\*Frontend:\*\* HTML + CSS + JavaScript



\## 📁 Estructura del proyecto

```

clinica-dental/

├── src/

│   ├── routes/

│   │   ├── dentistas.js

│   │   ├── pacientes.js

│   │   └── citas.js

│   ├── db/

│   │   └── database.js

│   └── app.js

├── frontend/

│   ├── css/

│   │   └── styles.css

│   ├── index.html

│   ├── dentistas.html

│   ├── pacientes.html

│   └── citas.html

├── .gitignore

├── package.json

└── README.md

```



\## 🚀 Instrucciones de puesta en marcha



\### Requisitos previos

\- Tener instalado \[Node.js](https://nodejs.org/)

\- Tener instalado \[Git](https://git-scm.com/)



\### Pasos



1\. Clona el repositorio:

```

git clone https://github.com/ypman390/clinica-dental.git

cd clinica-dental

```



2\. Instala las dependencias:

```

npm install

```



3\. Arranca el servidor:

```

node src/app.js

```



4\. Abre el frontend:

Abre el archivo `frontend/index.html` en tu navegador.



\## 📋 Endpoints de la API



\### Dentistas

| Método | Ruta | Descripción |

|--------|------|-------------|

| GET | /api/dentistas | Obtener todos |

| GET | /api/dentistas/:id | Obtener uno |

| POST | /api/dentistas | Crear |

| PUT | /api/dentistas/:id | Editar |

| DELETE | /api/dentistas/:id | Eliminar |



\### Pacientes

| Método | Ruta | Descripción |

|--------|------|-------------|

| GET | /api/pacientes | Obtener todos |

| GET | /api/pacientes/:id | Obtener uno |

| POST | /api/pacientes | Crear |

| PUT | /api/pacientes/:id | Editar |

| DELETE | /api/pacientes/:id | Eliminar |



\### Citas

| Método | Ruta | Descripción |

|--------|------|-------------|

| GET | /api/citas | Obtener todas |

| GET | /api/citas/:id | Obtener una |

| POST | /api/citas | Crear |

| PUT | /api/citas/:id | Editar |

| DELETE | /api/citas/:id | Eliminar |

