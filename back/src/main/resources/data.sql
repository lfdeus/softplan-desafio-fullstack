INSERT INTO usuario (ativo,dataregistro,nome,password,username,perfil)
SELECT * FROM (SELECT true,now(),'Administrador','21232f297a57a5a743894a0e4a801fc3','ADMIN',0) AS tmp
WHERE NOT EXISTS (
    select id from usuario where username = 'ADMIN'
) LIMIT 1;
