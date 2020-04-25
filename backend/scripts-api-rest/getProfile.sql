CREATE FUNCTION DBA.hasChar( IN in_username VARCHAR(16) )
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(username)
                 FROM tbCharacter
                 WHERE username = in_username);
	RETURN @cmpt;
END;

CREATE PROCEDURE DBA.getChar( IN in_username VARCHAR(16), IN in_status INT)
RESULT ("status" INT, username VARCHAR(16), race TEXT, classe TEXT)
BEGIN
    SELECT in_status, in_username, raceName, className FROM tbCharacter NATURAL JOIN crtRace NATURAL JOIN crtClass WHERE username = in_username;
END;

CREATE PROCEDURE DBA.http_getProfile( IN in_username VARCHAR(16), IN in_token VARCHAR(20))
RESULT ("status" INT, username VARCHAR(16), race TEXT, classe TEXT)
BEGIN
    DECLARE @accountUsername VARCHAR(16);
    IF (in_token IS NULL)
    THEN BEGIN 
            IF (in_username IS NULL) 
                THEN SELECT 405, '', '', ''
            ELSEIF (hasChar(in_username) = 1)
                THEN CALL DBA.getChar(in_username, 200)
            ELSE SELECT 404, '', '', ''
            ENDIF;
         END
    ELSE BEGIN
            SET @accountUsername = (SELECT username FROM tbSession WHERE token = in_token);
            IF (in_username IS NULL OR in_username LIKE @accountUsername) THEN BEGIN
                                            IF (hasChar(@accountUsername) = 1) THEN CALL DBA.getChar(@accountUsername, 201)
                                            ELSE SELECT 406, '', '', ''
                                            ENDIF;
                                          END
            ELSEIF (hasChar(in_username) = 1)THEN CALL DBA.getChar(in_username, 200)
            ELSE SELECT 404, '', '', ''
            ENDIF;
         END
    ENDIF;
END

CREATE SERVICE "getProfile" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getProfile(:user, :token);