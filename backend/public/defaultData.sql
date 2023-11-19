INSERT INTO country (name) VALUES ('Argentina');
INSERT INTO country (name) VALUES ('Brasil');

INSERT INTO province (name, countryId) VALUES ('Santa Fe', 1);
INSERT INTO province (name, countryId) VALUES ('Buenos Aires', 1);

INSERT INTO city (zipCode, name, provinceId) VALUES ('1000', 'Buenos Aires', 2);
INSERT INTO city (zipCode, name, provinceId) VALUES ('2000', 'Rosario', 1);
INSERT INTO city (zipCode, name, provinceId) VALUES ('3000', 'Santa Fe', 1);

INSERT INTO extra (name, price) VALUES ('Cochera', 200);
INSERT INTO extra (name, price) VALUES ('Piscina', 50);
INSERT INTO extra (name, price) VALUES ('Quincho', 20);

INSERT INTO role (name) VALUES ('User');
INSERT INTO role (name) VALUES ('Seller');
INSERT INTO role (name) VALUES ('Admin');

INSERT INTO type (name) VALUES ('Doble');
INSERT INTO type (name) VALUES ('Triple');

INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (300, 1, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (600, 2, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (550, 2, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (250, 1, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (450, 2, 1, 0, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (200, 1, 1, 0, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (300, 1, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (600, 2, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (550, 2, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (250, 1, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (450, 2, 1, 0, 1, 0);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (200, 1, 1, 0, 1, 0);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (300, 1, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (600, 2, 1, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (550, 2, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (250, 1, 1, 1, 0, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (450, 2, 1, 1, 0, 0);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (200, 1, 1, 1, 0, 0);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (420, 2, 0, 1, 1, 1);
INSERT INTO room (price, typeId, ac, tv, shower, towel) VALUES (170, 1, 0, 1, 1, 1);

INSERT INTO user_roles_role (userDni, roleId) VALUES ('33429120', 1);
INSERT INTO user_roles_role (userDni, roleId) VALUES ('38233911', 2);
INSERT INTO user_roles_role (userDni, roleId) VALUES ('34266592', 3);