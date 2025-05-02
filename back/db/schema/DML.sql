SELECT * FROM usuario;
INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage;
SELECT * FROM usuarios WHERE email = $1;