# Présentation du projet

## Objectif

Fournir un outil simple pour la création de personnages de jeu de rôle pour des parties de Dungeons and Dragons.

## Fonctionnalités principales

- Système de races, classes et statistiques d'une liste prédéfinie mais modifiable.
- Sauvegarde des personnages créés.
- Partage facile de ton personnage via un lien.
- Liste de tous les personnages créés par la communauté.
- Système d'authentification.

## Fonctionnalités supplémentaires

- Connexion par token lié à la fenêtre.
- Modification d'un personnage déjà créé une fois connecté.

## Membres

Carlos RUIZ HERRERA -> D34DPlayer

Simon NOLF 		    -> Simon NOLF

Nicolas MARTOU      -> Hotmailnico

Gabrielle CRUZ      -> JhandarTheUnhallowed 

## Webservices

`Un * signifie qu'il n'est pas encore implémenté.`

`Beaucoup des services api retournent un code status pour que le js client sache comment réagir, un document avec les significations standarisées est à créer.`

- Services de base:

  - root(:url) -> renvoit la page si elle existe, l'index sinon.
  - js(:url) -> renvoit le fichier js à partir d'un nom (avec extension).
  - css(:url) -> idem mais pour le css.
  - image(:url) -> idem mais pour les fichiers multimédia.

- Services d'inscription:

  - loginService(:user, :password, :token) -> création de lien temporaire entre le token généré par le js client et un utilisateur.
  - registerService(:user, :password) -> ajout d'un utilisateur à la liste de membres.
  - verifyToken(:token) -> vérifie si un token est lié à un compte et n'est pas périmé.
  - logout(:token) -> efface le lien entre le token et l'utilisateur.

- Services d'obtention de données (via token):

  - username(:token) -> renvoit le nom de l'utilisateur associé au token.
  - userCount()* -> renvoit la quantité de comptes créés.

- Services du système de création de personnages:

  - classes()* -> renvoit la liste de classes disponibles.
  - races()* -> idem mais pour les races.
  - origines()* -> idem mais pour les origines.
  - setClasse(:token, :classId, :charId)* -> changer la classe d'un personnage si le token est lié au propriétaire.
  - setRace(:token, :raceId, :charId)* -> idem pour la race.
  - setOrigine(:token, :originId, :charId)* -> idem pour l'origine.
  - deleteCharacter(:token, :charId)* -> efface un personnage.
  - getCharacter(:charId)* -> renvoit les caractéristiques d'un personnage.
  - characters()* -> renvoit une liste des personnages créés, avec quelques caractéristiques importantes.

    `D'autres services sont encore à définir`
