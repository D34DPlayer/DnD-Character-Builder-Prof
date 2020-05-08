CREATE PROCEDURE DBA.http_getListe()
RESULT (nom varchar(16), username varchar(16), race varchar(16), class varchar(16))
BEGIN
    SELECT nomChar, username, raceNom, classeNom
    FROM tbCharacter AS c
    JOIN crtRace AS r ON c.raceID = r.raceID
    JOIN crtClasse AS cl ON c.classeID = cl.classeID;
END;

CREATE SERVICE "liste" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getListe();