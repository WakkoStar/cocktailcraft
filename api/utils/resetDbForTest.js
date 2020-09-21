const client = require('../utils/bdd');

const QUERY = `TRUNCATE cocktails CASCADE;
ALTER SEQUENCE cocktail_id_seq RESTART WITH 0;
TRUNCATE description_cocktail CASCADE;
ALTER SEQUENCE description_cocktail_id_seq RESTART WITH 0;
TRUNCATE gout CASCADE;
ALTER SEQUENCE gout_id_seq RESTART WITH 0;
TRUNCATE ingredient CASCADE;
ALTER SEQUENCE ingredient_id_seq RESTART WITH 0;
TRUNCATE ingredient_cocktail CASCADE;
ALTER SEQUENCE ingredient_cocktail_id_seq RESTART WITH 0;

INSERT INTO gout (nom) VALUES ('Mentholé');
INSERT INTO gout (nom) VALUES ('Sucré');

INSERT INTO ingredient (nom, alias, family_of) VALUES ('Rhum cubain', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Jus de citron vert / Citron vert pressé', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Menthe', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Eau gazeuse', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Sucre', ARRAY [null] , ARRAY [-1]);

INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ('Mojito',ARRAY [0,1],'Facile');

INSERT INTO description_cocktail (content, preparation, id_cocktail) VALUES ('Ceci est un test','Fait directement au verre',0);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (0,'6 cl',0);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (1,'3 cl',0);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (2,'7 feuilles',0);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (3,'Remplir avec',0);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (4,'10 grammes',0);

INSERT INTO gout (nom) VALUES ('Doux');
INSERT INTO gout (nom) VALUES ('Fruité');

INSERT INTO ingredient (nom, alias, family_of) VALUES ('Rhum blanc', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Rhum ambré', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Jus de ananas', ARRAY [null] , ARRAY [-1]);
INSERT INTO ingredient (nom, alias, family_of) VALUES ('Lait de coco', ARRAY [null] , ARRAY [-1]);

INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ('Pina Colada',ARRAY [2,3],'Facile');
INSERT INTO description_cocktail (content, preparation, id_cocktail) VALUES ('Ceci est un deuxième test','Fait directement au verre',1);
			
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (5,'4 cl',1);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (6,'2 cl',1);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (7,'12 cl',1);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (8,'4 cl',1);
INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES (4,'5 grammes',1);`;

const reset = async () => {
	return await client.query(QUERY);
};
module.exports = async () => {
	await client.query(QUERY);
};
