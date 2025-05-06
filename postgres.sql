-- ELIMINAR TABLAS EN ORDEN CORRECTO
DROP TABLE IF EXISTS tbl_report_order;
DROP TABLE IF EXISTS tbl_orderdetail;
DROP TABLE IF EXISTS tbl_order;
DROP TABLE IF EXISTS tbl_menuitem;
DROP TABLE IF EXISTS tbl_menu;
DROP TABLE IF EXISTS tbl_staff;
DROP TABLE IF EXISTS tbl_role;
DROP TABLE IF EXISTS tbl_admin;
DROP TABLE IF EXISTS tbl_reports;

-- TABLA DE ADMINISTRADORES
CREATE TABLE tbl_admin (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO tbl_admin (username, password) VALUES
('admin', '1234abcd..');

-- TABLA DE MENÚS
CREATE TABLE tbl_menu (
    menuID SERIAL PRIMARY KEY,
    menuName VARCHAR(25) NOT NULL
);

INSERT INTO tbl_menu (menuName) VALUES
('Desayunos'),
('Carnes'),
('Bebidas'),
('Sopas'),
('Pastas'),
('Ensaladas'),
('Postres');

-- TABLA DE ÍTEMS DEL MENÚ
CREATE TABLE tbl_menuitem (
    itemid SERIAL PRIMARY KEY,
    menuid INT NOT NULL,
    menuitemname TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (menuid) REFERENCES tbl_menu(menuid) ON DELETE CASCADE
);


insert into tbl_menuitem (menuid, menuitemname, price) 
values
(1, 'huevos en caserola', 5000.00),
(1, 'huevos revueltos', 5000.00),
(1, 'calentado', 6000.00),
(2, 'chuleta de cerdo', 6000.00),
(2, 'pollo frito', 6000.00),
(2, 'res asada', 6000.00),
(3, 'tinto', 1000.00),
(3, 'jugo natural en agua', 4000.00),
(3, 'gaseosa 350 ml', 2000.00),
(4, 'cremas', 3000.00),
(4, 'sancocho', 3000.00),
(4, 'caldo de costilla', 3000.00),
(5, 'espagueti boloñesa', 8000.00),
(5, 'lasaña', 9000.00),
(5, 'ensalada mixta', 4000.00),
(5, 'ensalada césar', 5000.00),
(5, 'flan', 3500.00),
(5, 'torta de chocolate', 4000.00),
(5, 'helado', 3000.00),
(5, 'arroz con leche', 2500.00);


-- TABLA DE ÓRDENES (20 ÓRDENES)
CREATE TABLE tbl_order (
    orderID SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    total DECIMAL(15, 2) NOT NULL,
    order_date DATE NOT NULL
);

INSERT INTO tbl_order (status, total, order_date) VALUES
('finish', 1000.00, '2020-01-17'),
('finish', 10000.00, '2020-01-17'),
('ready', 11000.00, '2020-01-18'),
('cancelled', 6000.00, '2020-01-18'),
('preparing', 10000.00, '2020-01-25'),
('waiting', 15500.00, '2020-01-25'),
('finish', 7000.00, '2020-01-26'),
('ready', 8500.00, '2020-01-26'),
('preparing', 9200.00, '2020-01-27'),
('finish', 3000.00, '2020-01-27'),
('waiting', 7600.00, '2020-01-28'),
('cancelled', 5000.00, '2020-01-28'),
('ready', 8200.00, '2020-01-29'),
('finish', 9500.00, '2020-01-29'),
('waiting', 4800.00, '2020-01-30'),
('preparing', 7700.00, '2020-01-30'),
('ready', 8400.00, '2020-01-31'),
('finish', 9100.00, '2020-01-31'),
('cancelled', 3000.00, '2020-02-01'),
('waiting', 9900.00, '2020-02-01');


-- DETALLES DE CADA PEDIDO
CREATE TABLE tbl_orderdetail (
    orderDetailID SERIAL PRIMARY KEY,
    orderID INT NOT NULL,
    itemID INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderID) REFERENCES tbl_order(orderID) ON DELETE CASCADE,
    FOREIGN KEY (itemID) REFERENCES tbl_menuitem(itemID) ON DELETE CASCADE
);

-- Insertar algunos detalles para órdenes
INSERT INTO tbl_orderdetail (orderID, itemID, quantity) VALUES
(1, 1, 1), (2, 3, 1), (2, 4, 1), (3, 5, 1), (3, 6, 1),
(4, 7, 1), (5, 8, 2), (6, 9, 1), (7, 10, 1), (8, 11, 1),
(9, 12, 1), (10, 13, 1), (11, 14, 1), (12, 15, 1), (13, 16, 1),
(14, 17, 1), (15, 18, 1), (16, 19, 1), (17, 20, 1), (18, 1, 1);

-- ROLES
CREATE TABLE tbl_role (
    role VARCHAR(50) PRIMARY KEY
);

INSERT INTO tbl_role (role) VALUES
('chef'),
('Mesero');

-- EMPLEADOS
CREATE TABLE tbl_staff (
    staffID SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(100) NOT NULL,
    status TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (role) REFERENCES tbl_role(role) ON DELETE CASCADE
);

INSERT INTO tbl_staff (username, password, status, role) VALUES
('Juan', '1234abcd..', 'Online', 'chef'),
('Pedro', '1234abcd..', 'Online', 'Mesero'),
('Emily', '1234abcd..', 'Online', 'chef'),
('Robert', '1234abcd..', 'Online', 'chef'),
('Sofia', 'abc123', 'Offline', 'Mesero'),
('Marin', '1234abcd..', 'Online', 'chef');

-- REPORTES (20)
CREATE TABLE tbl_reports (
    reportID SERIAL PRIMARY KEY,
    report_date DATE NOT NULL,
    report_data TEXT NOT NULL
);

INSERT INTO tbl_reports (report_date, report_data, adminid) 
VALUES
('2025-05-01', 'Todo correcto', 1),
('2025-05-02', 'Orden rápida', 1),  -- Cambié el adminid a 1
('2025-05-03', 'Cliente frecuente', 1),
('2025-05-04', 'Alta demanda', 1),  -- Cambié el adminid a 1
('2025-05-05', 'Orden cancelada', 1),
('2025-05-06', 'Sin observaciones', 1),  -- Cambié el adminid a 1
('2025-05-07', 'Demora en cocina', 1),
('2025-05-08', 'Pedido doble', 1),  -- Cambié el adminid a 1
('2025-05-09', 'Buena propina', 1),
('2025-05-10', 'Alta rotación', 1),  -- Cambié el adminid a 1
('2025-05-11', 'Atención especial', 1),
('2025-05-12', 'Queja por temperatura', 1),  -- Cambié el adminid a 1
('2025-05-13', 'Pedido grande', 1),
('2025-05-14', 'Cliente nuevo', 1),  -- Cambié el adminid a 1
('2025-05-15', 'Mesa incompleta', 1),
('2025-05-16', 'Pedido por teléfono', 1),  -- Cambié el adminid a 1
('2025-05-17', 'Demora del cliente', 1),
('2025-05-18', 'Observación del chef', 1),  -- Cambié el adminid a 1
('2025-05-19', 'Postre regalado', 1),
('2025-05-20', 'Servicio excelente', 1);

