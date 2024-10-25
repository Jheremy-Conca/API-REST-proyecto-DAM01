 CREATE TABLE users (
    nomUsuario VARCHAR(30) PRIMARY KEY ,
    correo VARCHAR(30),
    password VARCHAR(50),  
    nombre VARCHAR(50),   
    sexo VARCHAR(10),     
    descripcion TEXT,
    imagen VARCHAR(1000)
);

INSERT INTO users (nomUsuario, correo, password, nombre, sexo, descripcion, imagen)
VALUES 
('usuario123', 'usuario123@example.com', 'contraseñaSegura', 'Juan Pérez', 'Masculino', 'Descripción del usuario', 'ruta/a/imagen.jpg'),
('usuario456', 'usuario456@example.com', 'otraContraseñaSegura', 'María López', 'Femenino', 'Descripción de otro usuario', 'ruta/a/otra_imagen.jpg');

SELECT * FROM users;

CREATE TABLE tb_dinosaurios (
    idDinosaurio SERIAL PRIMARY KEY,
    nomDinosaurio VARCHAR(50) UNIQUE,
    nomCientifico VARCHAR(50),
    periodo VARCHAR(50),
    habitat VARCHAR(50),
    dieta VARCHAR(50),
    datosCuriosos VARCHAR(1000),
    imagen VARCHAR(1000),
    familia VARCHAR(50),
    tamaño VARCHAR(50),
    peso VARCHAR(50),
    descripcion VARCHAR(1000),
    ubicacion VARCHAR(1000)
);

DROP TABLE tb_dinosaurios;

INSERT INTO tb_dinosaurios 
(nomDinosaurio, nomCientifico, periodo, habitat, dieta, datosCuriosos, imagen, familia, tamaño, peso, descripcion, ubicacion) 
VALUES
('Tyrannosaurus Rex', 'Tyrannosaurus rex', 'Cretácico', 'Bosques y llanuras', 'Carnívoro', 'El Tyrannosaurus rex tenía una mordida más fuerte que cualquier otro animal terrestre.', 'imagen_trex.jpg', 'Tyrannosauridae', '12 metros', '8 toneladas', 'El Tyrannosaurus Rex es uno de los dinosaurios más grandes y feroces conocidos.', 'Norteamérica'),
('Triceratops', 'Triceratops horridus', 'Cretácico', 'Llanuras', 'Herbívoro', 'El Triceratops tenía tres cuernos en la cabeza y un gran escudo óseo.', 'imagen_triceratops.jpg', 'Ceratopsidae', '9 metros', '6 toneladas', 'El Triceratops es uno de los dinosaurios más conocidos por su distintiva cabeza con cuernos.', 'Norteamérica');

SELECT * FROM tb_dinosaurios;

CREATE TABLE tb_favoritos ( 
    id SERIAL PRIMARY KEY , 
    idDinosaurio INTEGER, 
    nomUsuario VARCHAR(30), 
    FOREIGN KEY(idDinosaurio) REFERENCES tb_dinosaurios(idDinosaurio), 
    FOREIGN KEY(nomUsuario) REFERENCES users(nomUsuario));

INSERT INTO tb_favoritos (idDinosaurio, nomUsuario) 
VALUES 


SELECT * FROM tb_favoritos;

DROP TABLE tb_dinosaurios;
DROP TABLE tb_favoritos;

