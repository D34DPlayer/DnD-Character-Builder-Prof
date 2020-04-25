CREATE FUNCTION dba."login"( IN in_username VARCHAR(16), IN in_password VARCHAR(20))
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(username)
                 FROM tbUsers
                 WHERE username = in_username AND password = in_password);
	RETURN @cmpt;
END;

CREATE FUNCTION DBA.existentToken( IN in_token VARCHAR(20)) 
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(token)
                 FROM tbSession
                 WHERE token = in_token);
	RETURN @cmpt;
END;

CREATE FUNCTION DBA.existentUser( IN in_username VARCHAR(16))
RETURNS INTEGER
BEGIN
	DECLARE @cmpt INTEGER;
	SET @cmpt = (SELECT count(username)
                 FROM tbUsers
                 WHERE username = in_username);
	RETURN @cmpt;
END;

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