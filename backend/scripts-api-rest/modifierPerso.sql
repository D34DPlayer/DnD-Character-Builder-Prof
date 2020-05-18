CREATE PROCEDURE DBA.http_modification( IN in_rId VARCHAR(2), IN in_orgId VARCHAR(2), IN in_clId VARCHAR(2), IN in_nom VARCHAR(16), IN in_genre VARCHAR(1), IN in_desc TEXT, IN in_token VARCHAR(20))
RESULT (status INT)
BEGIN
	DECLARE @statusVal INT;
	DECLARE @user VARCHAR(16);
	IF (existentToken(in_token) = 1)
	THEN BEGIN
        SET @user = (SELECT username FROM tbSession WHERE token = in_token);
		IF (existentChar(in_nom) = 0) 
			THEN SET @statusVal = 502;
		ELSEIF (@user = (SELECT username FROM tbCharacter WHERE nomChar LIKE in_nom)) THEN BEGIN
			SET @statusVal = 200;
			UPDATE tbCharacter SET raceID=in_rId, classeID=in_clId, origineID=in_orgId, sexe=in_genre, descriptionChar=in_desc WHERE nomChar LIKE in_nom;
			END
        ELSE SET @statusVal = 503;
		ENDIF;
		END
	ELSE BEGIN
		SET @statusVal = 503;
	END
	ENDIF;
	SELECT @statusVal;
END;

CREATE SERVICE "modifierPerso" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_modification(:rId, :orgId, :clId, :nom, :genre, :desc, :token);