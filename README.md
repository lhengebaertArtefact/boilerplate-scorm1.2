# Intégration SCORM 1.2 dans une application React

Ce projet montre comment intégrer SCORM 1.2 dans une application React. SCORM (Sharable Content Object Reference Model) est un ensemble de standards qui permet de partager et de réutiliser des contenus e-learning à travers différents systèmes. Ce guide explique chaque fonction, son utilité et comment utiliser le module pour interagir avec un Learning Management System (LMS) compatible avec SCORM 1.2.

## Démarrage

### Aperçu des fonctions SCORM

L'objet `Scorm` de ce projet fournit plusieurs fonctions essentielles pour interagir avec un LMS compatible SCORM. Voici une explication détaillée de chaque fonction.

- initializeLMS() --> Initialise la communication avec le LMS. Cette fonction initialise la communication avec le LMS. Elle doit être appelée lors du chargement du cours pour établir une connexion avec le LMS.Sans initialisation, l'API SCORM ne pourra pas envoyer ou recevoir de données. Cette étape est cruciale pour suivre la progression, les scores et autres données de l'apprenant.

- finishLMS() --> Termine la communication avec le LMS. Cette fonction doit être appelée avant de quitter le cours pour s'assurer que toutes les données sont correctement sauvegardées.

- recordObjectiveProgress(objectiveId, score) --> Enregistre la progression pour un objectif spécifique en créant ou mettant à jour une interaction dans le SCORM.

- setObjective(objectiveId) --> Crée un objectif si il n'existe pas. Retourne l'index de l'objectif créé.

- setObjectiveStatus(objectiveId: string, status: "completed" | "incomplete") Définit le statut de complétion d'un objectif spécifique.

- getObjectiveStatus(objectiveId) --> Récupère le statut actuel d'un objectif. Retourne "completed", "incomplete", ou null si l'objectif n'existe pas. Si l'objectif n'existe pas,

- getSuspendData() --> Récupère les données stockées dans le LMS, permettant de reprendre la session là où elle a été interrompue.

- setSuspendData(data) --> Sauvegarde les données pour enregistrer l'état de progression de l'apprenant.

## Création et empaquetage du cours

- Préparer les fichiers SCORM : Incluez le fichier imsmanifest.xml et autres fichiers SCORM dans le répertoire build.
- Compiler le projet : Exécutez la commande pour compiler le projet React :

```bash

npm run build

```

- Créer le fichier .zip : Accédez au répertoire build et compressez le contenu en un fichier .zip :

```bash

cd build
zip -r ../course-package.zip

```

- Assurez-vous que le fichier imsmanifest.xml est à la racine du fichier .zip.

- Télécharger sur le LMS : Téléchargez le fichier .zip sur le LMS pour déployer le cours.
