CREATE PROCEDURE DBA.http_login( IN in_username VARCHAR(16), IN in_password VARCHAR(20), IN in_token VARCHAR(20) )
RESULT ("status" INT)
BEGIN
    DECLARE @statusVal INT;
    IF (existentToken(in_token) = 1)
        THEN SET @statusVal = 501
    ELSEIF (existentUser(in_username) = 0)
        THEN SET @statusVal = 502
    ELSEIF ("login"(in_username, in_password) = 0)
        THEN SET @statusVal = 503
    ELSE BEGIN
            SET @statusVal = 200;
            INSERT INTO tbSession(token, username) VALUES (in_token, in_username);
         END
    ENDIF;
    SELECT @statusVal;
END;

CREATE SERVICE "loginService" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_login(:user, :password, :token);