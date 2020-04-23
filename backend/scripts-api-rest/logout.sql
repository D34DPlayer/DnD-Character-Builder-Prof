CREATE PROCEDURE DBA.http_logout( IN in_token VARCHAR(20) )
RESULT (html TEXT)
BEGIN
    DELETE FROM tbSession WHERE token = in_token;
    CALL http_getPage('index');
END;

CREATE SERVICE "logout" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_logout(:token);
