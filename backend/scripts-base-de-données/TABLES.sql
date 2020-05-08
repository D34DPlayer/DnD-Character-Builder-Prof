/* Tables nécessaires au système d inscription */
CREATE TABLE tbUsers (username VARCHAR(16) NOT NULL,
                      "password" VARCHAR(20) NOT NULL,
                      CONSTRAINT pkUsers PRIMARY KEY (username));

CREATE TABLE tbSession (username VARCHAR(16) NOT NULL,
                        token VARCHAR(20) NOT NULL,
                        dateCreation DATE DEFAULT CURRENT DATE,
                        CONSTRAINT fkSessionUsers FOREIGN KEY (username) REFERENCES tbUsers(username) ON DELETE CASCADE);


/* Tables nécessaires au système de création de personnages */

CREATE TABLE crtRace (
raceID VARCHAR(2) NOT NULL,
raceNom text NOT NULL,
raceDesc text NOT NULL,
CONSTRAINT pkID primary key(raceID)
);

CREATE TABLE crtClasse (
classeID VARCHAR(2) NOT NULL,
classeNom text NOT NULL,
classeDesc text NOT NULL,
CONSTRAINT pkID primary key(classeID)
);

CREATE TABLE crtOrigine (
origineID VARCHAR(2) NOT NULL,
origine text not null,
origineDesc text NOT NULL,
constraint pkOr primary key(origineID)
); 

CREATE TABLE tbCharacter (username VARCHAR(16) NOT NULL,
                          raceID VARCHAR(2) NOT NULL,
                          classeID VARCHAR(2) NOT NULL,
						  origineID VARCHAR(2) NOT NULL,
						  nomChar VARCHAR(16) NOT NULL,
						  sexe VARCHAR(1) NOT NULL,
						  descriptionChar TEXT NOT NULL,
						  CONSTRAINT pkCharacter PRIMARY KEY (nomChar),
                          CONSTRAINT fkUser FOREIGN KEY (username) REFERENCES tbUsers(username) ON DELETE CASCADE,
                          CONSTRAINT fkRace FOREIGN KEY (raceID) REFERENCES crtRace(raceID) ON DELETE RESTRICT,
                          CONSTRAINT fkClasse FOREIGN KEY (classeID) REFERENCES crtClasse(classeID) ON DELETE RESTRICT,
						  CONSTRAINT fkOrigine FOREIGN KEY (origineID) REFERENCES crtOrigine(origineID) ON DELETE RESTRICT);
