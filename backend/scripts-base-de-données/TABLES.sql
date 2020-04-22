/* Tables nécessaires au système d'inscription */
CREATE TABLE tbUsers (username VARCHAR(16) NOT NULL,
                      "password" VARCHAR(20) NOT NULL,
                      CONSTRAINT pkUsers PRIMARY KEY (username));
CREATE TABLE tbSession (username VARCHAR(16) NOT NULL,
                        token VARCHAR(20) NOT NULL,
                        dateCreation DATE DEFAULT CURRENT DATE,
                        CONSTRAINT fkSessionUsers FOREIGN KEY (username) REFERENCES tbUsers(username) ON DELETE CASCADE);
                        
/* Tables nécessaires au système de création de personnages */
CREATE TABLE tbCharacter (charactID INTEGER,
                          username VARCHAR(16) NOT NULL,
                          raceID VARCHAR(2) NOT NULL,
                          classID VARCHAR(2) NOT NULL,
						  originID VARCHAR(2) NOT NULL,
						  CONSTRAINT pkCharacters PRIMARY KEY (charactID),
                          CONSTRAINT fkUser FOREIGN KEY (username) REFERENCES tbUsers(username) ON DELETE RESTRICT,
                          CONSTRAINT fkRace FOREIGN KEY (raceID) REFERENCES crtRace(raceID) ON DELETE RESTRICT,
                          CONSTRAINT fkClass FOREIGN KEY (classID) REFERENCES crtClass(classID) ON DELETE RESTRICT,
						  CONSTRAINT fkOrigin FOREIGN KEY (originID) REFERENCES crtOrigin(originID) ON DELETE RESTRICT);
DROP TABLE tbCharacter
