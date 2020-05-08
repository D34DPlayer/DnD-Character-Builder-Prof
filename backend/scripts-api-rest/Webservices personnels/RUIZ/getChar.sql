ALTER FUNCTION DBA.hasChar( IN in_username VARCHAR(16) )
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(username)
                 FROM tbCharacter
                 WHERE username = in_username);
	RETURN @cmpt;
END;

ALTER FUNCTION DBA.existentChar( IN in_name VARCHAR(16))
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(nomChar)
                 FROM tbCharacter
                 WHERE nomChar = in_name);
	RETURN @cmpt;
END;

CREATE PROCEDURE DBA.getDefaultChar( IN in_name VARCHAR(16), IN in_status INT)
RESULT ("status" INT, "name" VARCHAR(16), username VARCHAR(16), race TEXT, raceDesc TEXT, classe TEXT, classeDesc TEXT, origine TEXT, origineDesc TEXT, sexe VARCHAR(1), "description" TEXT)
BEGIN
    SELECT in_status, nomChar, in_name, raceNom, raceDesc, classeNom, classeDesc, origine, origineDesc, sexe, descriptionChar FROM tbCharacter JOIN crtRace JOIN crtClasse JOIN crtOrigine WHERE username = in_name;
END;

CREATE PROCEDURE DBA.getChar( IN in_name VARCHAR(16), IN in_status INT)
RESULT ("status" INT, "name" VARCHAR(16), username VARCHAR(16), race TEXT, raceDesc TEXT, classe TEXT, classeDesc TEXT, origine TEXT, origineDesc TEXT, sexe VARCHAR(1), "description" TEXT)
BEGIN
    SELECT in_status, nomChar, username, raceNom, raceDesc, classeNom, classeDesc, origine, origineDesc, sexe, descriptionChar FROM tbCharacter JOIN crtRace JOIN crtClasse JOIN crtOrigine WHERE nomChar = in_name;
END;

CREATE PROCEDURE DBA.http_getChar( IN in_name VARCHAR(16), IN in_token VARCHAR(20))
RESULT ("status" INT, "name" VARCHAR(16), username VARCHAR(16), race TEXT, raceDesc TEXT, classe TEXT, classeDesc TEXT, origine TEXT, origineDesc TEXT, sexe VARCHAR(1), "description" TEXT)
BEGIN
    DECLARE @accountUsername VARCHAR(16);
    IF (in_token IS NULL)
    THEN BEGIN 
            IF (in_name IS NULL) 
                THEN SELECT 405
            ELSEIF (existentChar(in_name) = 1)
                THEN CALL DBA.getChar(in_name, 200)
            ELSE SELECT 404
            ENDIF;
         END
    ELSE BEGIN
            SET @accountUsername = (SELECT username FROM tbSession WHERE token = in_token);
            IF (in_name IS NULL) THEN BEGIN
                                        IF (hasChar(@accountUsername) > 0) THEN CALL DBA.getDefaultChar(@accountUsername, 201)
                                        ELSE SELECT 406
                                        ENDIF;
                                      END
            ELSEIF ((SELECT username FROM tbCharacter WHERE nomChar LIKE in_name) LIKE @accountUsername)
                THEN CALL DBA.getChar(in_name, 201)
            ELSEIF (existentChar(in_name) = 1)THEN CALL DBA.getChar(in_name, 200)
            ELSE SELECT 404
            ENDIF;
         END
    ENDIF;
END;

CREATE SERVICE "getChar" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getChar(:name, :token);