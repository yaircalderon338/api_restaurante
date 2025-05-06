// db.js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres.ydlspmiluprnmmmnperd', // reemplaza con tu usuario de PostgreSQL
  host: 'aws-0-us-east-2.pooler.supabase.com',
  database: 'postgres',
  password: '1234', // reemplaza con tu contraseña de PostgreSQL
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión a la base de datos:', err));

module.exports = client;
