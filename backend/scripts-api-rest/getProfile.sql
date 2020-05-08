CREATE PROCEDURE DBA.getProfile( IN in_name VARCHAR(16), IN in_status INT)
RESULT ("status" INT, username VARCHAR(16), "name" VARCHAR(16), race TEXT, classe TEXT)
BEGIN
    DECLARE @cmpt INT;
    SET @cmpt = (SELECT count(username) FROM tbCharacter WHERE username = in_name);
    IF (@cmpt = 0) THEN
        SELECT in_status, in_name
    ELSE
        SELECT in_status, username, nomChar, raceNom, classeNom FROM tbCharacter JOIN crtClasse JOIN crtRace WHERE username = in_name;
    ENDIF;
END

CREATE PROCEDURE DBA.http_getProfile( IN in_name VARCHAR(16), IN in_token VARCHAR(20))
RESULT ("status" INT, username VARCHAR(16), "nom" VARCHAR(16), race TEXT, classe TEXT)
BEGIN
    DECLARE @accountUsername VARCHAR(16);
    IF (in_token IS NULL)
    THEN BEGIN 
            IF (in_name IS NULL) 
                THEN SELECT 405
            ELSEIF (existentUser(in_name) = 1)
                THEN CALL DBA.getProfile(in_name, 200)
            ELSE SELECT 404
            ENDIF;
         END
    ELSE BEGIN
            SET @accountUsername = (SELECT username FROM tbSession WHERE token = in_token);
            IF (in_name IS NULL OR in_name LIKE @accountUsername) THEN CALL DBA.getProfile(@accountUsername, 201)
            ELSEIF (existentUser(in_name) = 1)THEN CALL DBA.getProfile(in_name, 200)
            ELSE SELECT 404
            ENDIF;
         END
    ENDIF;
END;

CREATE SERVICE "getProfile" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getProfile(:user, :token);