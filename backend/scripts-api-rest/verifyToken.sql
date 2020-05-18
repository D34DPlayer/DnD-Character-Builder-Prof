CREATE PROCEDURE DBA.http_verifyToken( IN in_token VARCHAR(20) )
RESULT ("status" INT)
BEGIN
	DECLARE @statusVal INT;
    IF (existentToken(in_token) = 1 AND (SELECT hours(dateCreation, CURRENT DATE) FROM tbSession WHERE token = in_token) < 24)
    THEN SET @statusVal = 200;
    ELSE BEGIN
            SET @statusVal = 503;
            DELETE FROM tbSession WHERE token = in_token;
         END
    ENDIF;
    SELECT @statusVal;
END;

CREATE SERVICE "verifyToken" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_verifyToken(:token);