/* procedures */
CREATE PROCEDURE "DBA"."chercheClasse"()
result (clId varchar(2), clNom varchar(16), clDesc long varchar)
begin
	select *
	from crtClasse;
end;

CREATE PROCEDURE "DBA"."chercheOrigine"()
result (orgId varchar(2), org text, orgDesc text)
begin
	select *
	from crtOrigine;
end;

CREATE PROCEDURE "DBA"."chercheRace"()
result (rId varchar(2), rNom varchar(16), rDesc text)
begin
	select *
	from crtRace;
end;

CREATE PROCEDURE DBA.sauvegarde( IN in_rId VARCHAR(2), IN in_orgId VARCHAR(2), IN in_clId VARCHAR(2), IN in_nom VARCHAR(16), IN in_genre VARCHAR(1), IN in_desc TEXT, IN in_token VARCHAR(20))
RESULT (status INT)
BEGIN
	DECLARE @statusVal INT;
	DECLARE @user VARCHAR(16);
	IF (existentToken(in_token) = 1)
	THEN BEGIN
		IF (existentChar(in_nom) = 1) 
			THEN SET @statusVal = 501;
		ELSE BEGIN
			SET @statusVal = 200;
			SET @user = (SELECT username FROM tbSession WHERE token = in_token);
			INSERT INTO tbCharacter(username, raceID, classeID, origineID, nomChar, sexe, descriptionChar) VALUES (@user, in_rId, in_clId, in_orgId, in_nom, in_genre, in_desc);
			END
		ENDIF;
		END
	ELSE BEGIN
		SET @statusVal = 503;
	END
	ENDIF;
	SELECT @statusVal;
END;

/*appel des tables pour créer le cache*/
CREATE SERVICE "race" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL chercheRace();

CREATE SERVICE "classe" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL chercheClasse();

CREATE SERVICE "origine" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL chercheOrigine();

/*sauvegarder le personnage cr?*/
CREATE SERVICE "registrePerso" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL sauvegarde(:rId, :orgId, :clId, :nom, :genre, :desc, :token);

