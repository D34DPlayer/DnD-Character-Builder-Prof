CREATE PROCEDURE DBA.http_getUsername( IN in_token VARCHAR(20) )
RESULT ("status" INT, "username" VARCHAR(15))
BEGIN

    IF (existentToken(in_token) = 1)
    THEN SELECT 200, username FROM tbSession WHERE token = in_token
    ELSE SELECT 503
    ENDIF;
END;

CREATE SERVICE "username" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getUsername(:token);