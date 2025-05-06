const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./db'); // tu conexión a PostgreSQL

// Crear instancia de express
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const adminRoutes = require('./routes/admin');
const menuRoutes = require('./routes/menu');
const menuitemRoutes = require('./routes/menuitem');
const orderRoutes = require('./routes/order');
const orderdetailRoutes = require('./routes/orderdetail');
const staffRoutes = require('./routes/staff');
const reportsRoutes = require('./routes/reports');
const roleRoutes = require('./routes/role');
const reportOrderRoutes = require('./routes/report_order');

// Usar rutas
app.use('/admin', adminRoutes);
app.use('/menu', menuRoutes);
app.use('/menuitem', menuitemRoutes);
app.use('/order', orderRoutes);
app.use('/orderdetail', orderdetailRoutes);
app.use('/staff', staffRoutes);
app.use('/reports', reportsRoutes);
app.use('/role', roleRoutes);
app.use('/report_order', reportOrderRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
