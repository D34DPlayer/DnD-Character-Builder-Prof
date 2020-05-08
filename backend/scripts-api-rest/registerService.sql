CREATE PROCEDURE DBA.http_register( IN in_username VARCHAR(16), IN in_password VARCHAR(20) )
RESULT ("status" INT)
BEGIN
    IF (in_username IS NULL OR in_password IS NULL)
    THEN SELECT 503
    ELSE BEGIN
            DECLARE @statusVal INT;
            IF (existentUser(in_username) = 0)
            THEN BEGIN
                    SET @statusVal = 200;
                    INSERT INTO tbUsers(username, password) VALUES (in_username, in_password)
                 END
            ELSE SET @statusVal = 501
            ENDIF;
            SELECT @statusVal;
        END
    ENDIF;
END;

CREATE SERVICE "registerService" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_register(:user, :password);