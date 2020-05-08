CREATE PROCEDURE DBA.http_getStats( IN colonne VARCHAR(10) )
RESULT (categ VARCHAR(101), cmpt INT)
BEGIN
    IF (colonne LIKE 'race') THEN SELECT raceNom, count(nomChar) as cmpt FROM tbCharacter JOIN crtRace GROUP BY raceNom ORDER BY -cmpt;
    ELSEIF (colonne LIKE 'classe') THEN SELECT classeNom, count(nomChar) as cmpt FROM tbCharacter JOIN crtClasse GROUP BY classeNom ORDER BY -cmpt;
    ELSEIF (colonne LIKE 'origine') THEN SELECT origine, count(nomChar) as cmpt FROM tbCharacter JOIN crtOrigine GROUP BY origine ORDER BY -cmpt;
    ELSEIF (colonne LIKE 'sexe') THEN SELECT sexe, count(nomChar) as cmpt FROM tbCharacter GROUP BY sexe ORDER BY -cmpt;
    ENDIF;
END;

CREATE SERVICE "stats" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS CALL http_getStats(:colonne);