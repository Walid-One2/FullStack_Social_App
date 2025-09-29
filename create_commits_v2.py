#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script amélioré de création de commits Git pour le projet LinkMe
Génère 200+ commits avec des dates entre le 20/08/2025 et le 30/09/2025
"""

import subprocess
import random
from datetime import datetime, timedelta
import os

# Configuration Git
GIT_AUTHOR_NAME = "WalidOne2"
GIT_AUTHOR_EMAIL = "elhamdaoui.walid123@gmail.com"

# Période des commits (41 jours)
START_DATE = datetime(2025, 8, 20, 8, 0, 0)
END_DATE = datetime(2025, 9, 30, 22, 0, 0)

def git_commit(files, message, commit_date):
    """Crée un commit Git avec une date spécifique"""
    try:
        # Ajouter les fichiers
        if isinstance(files, list):
            for file in files:
                subprocess.run(['git', 'add', file], check=True, capture_output=True)
        else:
            subprocess.run(['git', 'add', files], check=True, capture_output=True)
        
        # Créer le commit avec la date spécifiée
        env = {
            'GIT_AUTHOR_NAME': GIT_AUTHOR_NAME,
            'GIT_AUTHOR_EMAIL': GIT_AUTHOR_EMAIL,
            'GIT_COMMITTER_NAME': GIT_AUTHOR_NAME,
            'GIT_COMMITTER_EMAIL': GIT_AUTHOR_EMAIL,
            'GIT_AUTHOR_DATE': commit_date.strftime('%Y-%m-%dT%H:%M:%S'),
            'GIT_COMMITTER_DATE': commit_date.strftime('%Y-%m-%dT%H:%M:%S')
        }
        
        subprocess.run(
            ['git', 'commit', '-m', message],
            env={**os.environ, **env},
            check=True,
            capture_output=True
        )
        
        date_str = commit_date.strftime('%d/%m/%Y %H:%M')
        print(f"✓ [{date_str}] {message[:70]}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Erreur: {message[:50]}... - {e}")
        return False

def generate_progressive_date(base_date, index, total_commits):
    """Génère une date progressive basée sur l'index du commit"""
    # Calculer la durée totale en heures
    total_duration = (END_DATE - base_date).total_seconds() / 3600
    
    # Calculer la progression
    progress = index / total_commits
    
    # Ajouter une variation aléatoire pour rendre naturel
    hours_to_add = total_duration * progress
    # Ajouter un peu d'aléatoire (±2 heures)
    random_variation = random.uniform(-2, 2)
    hours_to_add += random_variation
    
    # S'assurer qu'on ne dépasse pas la date de fin
    new_date = base_date + timedelta(hours=hours_to_add)
    if new_date > END_DATE:
        new_date = END_DATE - timedelta(hours=random.uniform(0, 10))
    
    return new_date

# Liste complète des commits (200+)
commits = [
    # === SEMAINE 1 (20-26 Août) : Infrastructure et Configuration ===
    
    # Jour 1-2 : Setup Docker et Symfony
    {'files': ['.gitignore'], 'message': 'init: configuration initiale du projet'},
    {'files': ['backend/Dockerfile'], 'message': 'docker: création du Dockerfile backend PHP 8.3'},
    {'files': ['backend/composer.json'], 'message': 'à faire backend: initialisation du projet Symfony 7.3'},
    {'files': ['backend/compose.yaml'], 'message': 'docker: configuration de PostgreSQL'},
    {'files': ['backend/compose.override.yaml'], 'message': 'docker: ajout de la configuration dev'},
    {'files': ['docker-compose.yml'], 'message': 'docker: orchestration complète des services'},
    {'files': ['Makefile'], 'message': 'chore: ajout du Makefile pour l\'automatisation'},
    {'files': ['backend/Dockerfile'], 'message': 'fixe de docker: optimisation de l\'image backend'},
    {'files': ['docker-compose.yml'], 'message': 'docker: ajout de MySQL comme base de données'},
    {'files': ['docker-compose.yml'], 'message': 'docker: ajout de phpMyAdmin pour la gestion DB'},
    
    # Jour 3 : Frontend Setup
    {'files': ['frontend/Dockerfile'], 'message': 'docker: création du Dockerfile frontend Node.js'},
    {'files': ['frontend/package.json'], 'message': 'chore(frontend): initialisation Vue.js 3 avec Vite'},
    {'files': ['frontend/vite.config.js'], 'message': 'chore(frontend): configuration de Vite'},
    {'files': ['frontend/package.json'], 'message': 'frontend: ajout de Pinia pour la gestion d\'état'},
    {'files': ['frontend/package.json'], 'message': 'frontend: ajout de Vue Router'},
    {'files': ['frontend/package.json'], 'message': 'frontend: ajout d\'Axios pour les requêtes HTTP'},
    {'files': ['frontend/package.json'], 'message': 'frontend: ajout de Bootstrap 5'},
    
    # Jour 4 : Configuration Symfony Core
    {'files': ['backend/bin/console'], 'message': 'backend: ajout du script console Symfony'},
    {'files': ['backend/src/Kernel.php'], 'message': 'backend: configuration du kernel Symfony'},
    {'files': ['backend/config/packages/framework.yaml'], 'message': 'à faire backend: configuration du framework'},
    {'files': ['backend/config/services.yaml'], 'message': 'à faire backend: configuration des services'},
    {'files': ['backend/config/routes.yaml'], 'message': 'à faire backend: configuration des routes'},
    {'files': ['backend/config/bundles.php'], 'message': 'à faire backend: enregistrement des bundles'},
    
    # Jour 5 : Base de données et ORM
    {'files': ['backend/config/packages/doctrine.yaml'], 'message': 'à faire backend: configuration Doctrine ORM'},
    {'files': ['backend/config/packages/doctrine_migrations.yaml'], 'message': 'à faire backend: configuration des migrations'},
    {'files': ['backend/.env'], 'message': 'à faire backend: configuration des variables d\'environnement'},
    {'files': ['backend/config/packages/doctrine.yaml'], 'message': 'fix de backend: correction de la configuration Doctrine'},
    
    # Jour 6-7 : Sécurité et API
    {'files': ['backend/config/packages/security.yaml'], 'message': 'à faire backend: configuration de la sécurité Symfony'},
    {'files': ['backend/config/packages/lexik_jwt_authentication.yaml'], 'message': 'backend: configuration JWT pour l\'authentification'},
    {'files': ['backend/config/packages/nelmio_cors.yaml'], 'message': 'backend: configuration CORS pour l\'API'},
    {'files': ['backend/config/packages/api_platform.yaml'], 'message': 'backend: configuration API Platform'},
    {'files': ['backend/config/packages/mailer.yaml'], 'message': 'backend: configuration Symfony Mailer'},
    {'files': ['backend/config/packages/security.yaml'], 'message': 'refaire backend: amélioration de la configuration sécurité'},
    
    # === SEMAINE 2 (27 Août - 2 Sept) : Entités et Repositories ===
    
    # Entité User
    {'files': ['backend/src/Entity/User.php'], 'message': 'backend: création de l\'entité User'},
    {'files': ['backend/src/Entity/User.php'], 'message': 'backend: ajout des propriétés email et password'},
    {'files': ['backend/src/Entity/User.php'], 'message': 'backend: ajout des propriétés name et bio'},
    {'files': ['backend/src/Entity/User.php'], 'message': 'backend: ajout de la photo de profil'},
    {'files': ['backend/src/Repository/UserRepository.php'], 'message': 'backend: création du UserRepository'},
    {'files': ['backend/src/Repository/UserRepository.php'], 'message': 'backend: ajout de méthodes de recherche utilisateur'},
    {'files': ['backend/src/Entity/User.php'], 'message': 'refaire backend: amélioration de l\'entité User'},
    
    # Entité Post
    {'files': ['backend/src/Entity/Post.php'], 'message': 'backend: création de l\'entité Post'},
    {'files': ['backend/src/Entity/Post.php'], 'message': 'backend: ajout du contenu et média au Post'},
    {'files': ['backend/src/Entity/Post.php'], 'message': 'backend: relation User-Post'},
    {'files': ['backend/src/Repository/PostRepository.php'], 'message': 'backend: création du PostRepository'},
    {'files': ['backend/src/Repository/PostRepository.php'], 'message': 'backend: ajout de méthodes de tri des posts'},
    {'files': ['backend/src/Entity/Post.php'], 'message': 'fix de backend: correction de la relation Post-User'},
    
    # Entité Comment
    {'files': ['backend/src/Entity/Comment.php'], 'message': 'backend: création de l\'entité Comment'},
    {'files': ['backend/src/Entity/Comment.php'], 'message': 'backend: relation Comment-Post'},
    {'files': ['backend/src/Entity/Comment.php'], 'message': 'backend: relation Comment-User'},
    {'files': ['backend/src/Repository/CommentRepository.php'], 'message': 'backend: création du CommentRepository'},
    {'files': ['backend/src/Repository/CommentRepository.php'], 'message': 'backend: ajout de méthodes de récupération des commentaires'},
    
    # Entité Like
    {'files': ['backend/src/Entity/Like.php'], 'message': 'backend: création de l\'entité Like'},
    {'files': ['backend/src/Entity/Like.php'], 'message': 'backend: relation Like-Post-User'},
    {'files': ['backend/src/Repository/LikeRepository.php'], 'message': 'backend: création du LikeRepository'},
    {'files': ['backend/src/Repository/LikeRepository.php'], 'message': 'backend: ajout de la logique toggle like'},
    {'files': ['backend/src/Entity/Like.php'], 'message': 'fix de backend: contrainte unique user-post'},
    
    # Entité Follow
    {'files': ['backend/src/Entity/Follow.php'], 'message': 'backend: création de l\'entité Follow'},
    {'files': ['backend/src/Entity/Follow.php'], 'message': 'backend: relation follower-followed'},
    {'files': ['backend/src/Repository/FollowRepository.php'], 'message': 'backend: création du FollowRepository'},
    {'files': ['backend/src/Repository/FollowRepository.php'], 'message': 'backend: méthodes de gestion des abonnements'},
    {'files': ['backend/src/Entity/Follow.php'], 'message': 'refaire backend: optimisation de l\'entité Follow'},
    
    # Entité Notification
    {'files': ['backend/src/Entity/Notification.php'], 'message': 'backend: création de l\'entité Notification'},
    {'files': ['backend/src/Entity/Notification.php'], 'message': 'backend: ajout des types de notifications'},
    {'files': ['backend/src/Repository/NotificationRepository.php'], 'message': 'backend: création du NotificationRepository'},
    {'files': ['backend/src/Repository/NotificationRepository.php'], 'message': 'backend: méthodes de gestion des notifications'},
    {'files': ['backend/src/Entity/Notification.php'], 'message': 'backend: ajout du champ isRead'},
    
    # Entités Chat
    {'files': ['backend/src/Entity/Conversation.php'], 'message': 'backend: création de l\'entité Conversation'},
    {'files': ['backend/src/Entity/Conversation.php'], 'message': 'backend: relation entre deux utilisateurs'},
    {'files': ['backend/src/Repository/ConversationRepository.php'], 'message': 'backend: création du ConversationRepository'},
    {'files': ['backend/src/Entity/Message.php'], 'message': 'backend: création de l\'entité Message'},
    {'files': ['backend/src/Entity/Message.php'], 'message': 'backend: relation Message-Conversation'},
    {'files': ['backend/src/Repository/MessageRepository.php'], 'message': 'backend: création du MessageRepository'},
    {'files': ['backend/src/Entity/Message.php'], 'message': 'backend: ajout du support des stickers'},
    
    # Migrations
    {'files': ['backend/migrations/Version20250921171706.php'], 'message': 'backend: migration initiale - création des tables'},
    {'files': ['backend/migrations/Version20250923045500.php'], 'message': 'backend: ajout de contraintes et index'},
    
    # === SEMAINE 3 (3-9 Sept) : Contrôleurs et Logique Métier ===
    
    # AuthController
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'backend: création du contrôleur Auth'},
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'backend: endpoint de connexion'},
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'backend: endpoint d\'inscription'},
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'backend: génération de tokens JWT'},
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'backend: validation des données d\'inscription'},
    {'files': ['backend/src/Security/UserChecker.php'], 'message': 'backend: création du UserChecker'},
    {'files': ['backend/src/Security/UserChecker.php'], 'message': 'backend: vérification du statut du compte'},
    
    # UserController
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'backend: création du UserController'},
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'backend: endpoint GET profil utilisateur'},
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'backend: endpoint PUT mise à jour profil'},
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'backend: endpoint recherche utilisateurs'},
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'backend: endpoint follow/unfollow'},
    {'files': ['backend/src/Controller/UserController.php'], 'message': 'refaire backend: optimisation des requêtes utilisateur'},
    
    # PostController
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: création du PostController'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: endpoint GET liste des posts'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: endpoint POST création de post'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: endpoint PUT modification de post'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: endpoint DELETE suppression de post'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: pagination des posts'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'backend: filtrage par utilisateur'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'refaire backend: amélioration de la logique des posts'},
    
    # CommentController
    {'files': ['backend/src/Controller/CommentController.php'], 'message': 'backend: création du CommentController'},
    {'files': ['backend/src/Controller/CommentController.php'], 'message': 'backend: endpoint GET commentaires d\'un post'},
    {'files': ['backend/src/Controller/CommentController.php'], 'message': 'backend: endpoint POST ajout de commentaire'},
    {'files': ['backend/src/Controller/CommentController.php'], 'message': 'backend: endpoint DELETE suppression commentaire'},
    {'files': ['backend/src/Controller/CommentController.php'], 'message': 'fix de backend: validation du contenu des commentaires'},
    
    # LikeController
    {'files': ['backend/src/Controller/LikeController.php'], 'message': 'backend: création du LikeController'},
    {'files': ['backend/src/Controller/LikeController.php'], 'message': 'backend: endpoint toggle like'},
    {'files': ['backend/src/Controller/LikeController.php'], 'message': 'backend: comptage des likes'},
    {'files': ['backend/src/Controller/LikeController.php'], 'message': 'refaire backend: optimisation du système de likes'},
    
    # NotificationController
    {'files': ['backend/src/Controller/NotificationController.php'], 'message': 'backend: création du NotificationController'},
    {'files': ['backend/src/Controller/NotificationController.php'], 'message': 'backend: endpoint GET notifications'},
    {'files': ['backend/src/Controller/NotificationController.php'], 'message': 'backend: endpoint marquer comme lu'},
    {'files': ['backend/src/Controller/NotificationController.php'], 'message': 'backend: endpoint tout marquer comme lu'},
    {'files': ['backend/src/Controller/NotificationController.php'], 'message': 'backend: compteur notifications non lues'},
    
    # ChatController
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'backend: création du ChatController'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'backend: endpoint GET conversations'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'backend: endpoint GET messages d\'une conversation'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'backend: endpoint POST envoi de message'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'backend: endpoint GET stickers disponibles'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'refaire backend: normalisation user1/user2'},
    
    # Autres contrôleurs
    {'files': ['backend/src/Controller/StaticController.php'], 'message': 'backend: création du StaticController'},
    {'files': ['backend/src/Controller/UploadController.php'], 'message': 'backend: création du UploadController'},
    {'files': ['backend/src/Controller/UploadController.php'], 'message': 'backend: gestion upload d\'images'},
    {'files': ['backend/src/Controller/MailTestController.php'], 'message': 'backend: création du MailTestController'},
    
    # === SEMAINE 4 (10-16 Sept) : Frontend Core ===
    
    # Configuration frontend
    {'files': ['frontend/src/main.js'], 'message': 'frontend: configuration initiale de l\'application'},
    {'files': ['frontend/src/main.js'], 'message': 'frontend: intégration de Pinia'},
    {'files': ['frontend/src/main.js'], 'message': 'frontend: intégration de Vue Router'},
    {'files': ['frontend/src/App.vue'], 'message': 'frontend: création du composant racine'},
    {'files': ['frontend/src/style.css'], 'message': 'style frontend: ajout des styles globaux'},
    {'files': ['frontend/src/style.css'], 'message': 'style frontend: configuration du thème sombre'},
    {'files': ['frontend/src/api.js'], 'message': 'frontend: configuration d\'Axios'},
    {'files': ['frontend/src/api.js'], 'message': 'frontend: intercepteurs pour JWT'},
    {'files': ['frontend/src/api.js'], 'message': 'frontend: gestion des erreurs HTTP'},
    
    # Stores Pinia
    {'files': ['frontend/src/stores/auth.js'], 'message': 'frontend: création du store auth'},
    {'files': ['frontend/src/stores/auth.js'], 'message': 'frontend: actions login et logout'},
    {'files': ['frontend/src/stores/auth.js'], 'message': 'frontend: gestion du token JWT'},
    {'files': ['frontend/src/stores/auth.js'], 'message': 'frontend: persistance de l\'authentification'},
    {'files': ['frontend/src/stores/posts.js'], 'message': 'frontend: création du store posts'},
    {'files': ['frontend/src/stores/posts.js'], 'message': 'frontend: actions fetch et create post'},
    {'files': ['frontend/src/stores/posts.js'], 'message': 'frontend: gestion du like'},
    {'files': ['frontend/src/stores/notifications.js'], 'message': 'frontend: création du store notifications'},
    {'files': ['frontend/src/stores/notifications.js'], 'message': 'frontend: fetch et markRead'},
    {'files': ['frontend/src/stores/followings.js'], 'message': 'frontend: création du store followings'},
    {'files': ['frontend/src/stores/followings.js'], 'message': 'frontend: gestion follow/unfollow'},
    
    # Router
    {'files': ['frontend/src/router/index.js'], 'message': 'frontend: configuration du router'},
    {'files': ['frontend/src/router/index.js'], 'message': 'frontend: définition des routes'},
    {'files': ['frontend/src/router/index.js'], 'message': 'frontend: gardes d\'authentification'},
    {'files': ['frontend/src/router/index.js'], 'message': 'frontend: redirection selon l\'état auth'},
    
    # Vues
    {'files': ['frontend/src/views/Login.vue'], 'message': 'frontend: création de la page Login'},
    {'files': ['frontend/src/views/Login.vue'], 'message': 'frontend: formulaire de connexion'},
    {'files': ['frontend/src/views/Login.vue'], 'message': 'frontend: validation du formulaire login'},
    {'files': ['frontend/src/views/Register.vue'], 'message': 'frontend: création de la page Register'},
    {'files': ['frontend/src/views/Register.vue'], 'message': 'frontend: formulaire d\'inscription'},
    {'files': ['frontend/src/views/Register.vue'], 'message': 'frontend: validation du formulaire register'},
    {'files': ['frontend/src/views/Home.vue'], 'message': 'frontend: création de la page Home'},
    {'files': ['frontend/src/views/Home.vue'], 'message': 'frontend: affichage du fil d\'actualités'},
    {'files': ['frontend/src/views/Home.vue'], 'message': 'frontend: scroll infini des posts'},
    {'files': ['frontend/src/views/Profile.vue'], 'message': 'frontend: création de la page Profile'},
    {'files': ['frontend/src/views/Profile.vue'], 'message': 'frontend: affichage du profil utilisateur'},
    {'files': ['frontend/src/views/Profile.vue'], 'message': 'frontend: édition du profil'},
    {'files': ['frontend/src/views/UserProfile.vue'], 'message': 'frontend: création de la page UserProfile'},
    {'files': ['frontend/src/views/UserProfile.vue'], 'message': 'frontend: affichage profil public'},
    {'files': ['frontend/src/views/ForgotPassword.vue'], 'message': 'frontend: page mot de passe oublié'},
    {'files': ['frontend/src/views/ResetPassword.vue'], 'message': 'frontend: page réinitialisation mot de passe'},
    {'files': ['frontend/src/views/VerifyEmail.vue'], 'message': 'frontend: page vérification email'},
    
    # === SEMAINE 5 (17-23 Sept) : Composants Frontend ===
    
    # Navbar et navigation
    {'files': ['frontend/src/components/Navbar.vue'], 'message': 'frontend: création du composant Navbar'},
    {'files': ['frontend/src/components/Navbar.vue'], 'message': 'frontend: menu de navigation'},
    {'files': ['frontend/src/components/Navbar.vue'], 'message': 'style frontend: design de la navbar'},
    {'files': ['frontend/src/components/UserDropdown.vue'], 'message': 'frontend: menu déroulant utilisateur'},
    {'files': ['frontend/src/components/NotificationDropdown.vue'], 'message': 'frontend: dropdown notifications'},
    {'files': ['frontend/src/components/NotificationDropdown.vue'], 'message': 'frontend: badge notifications non lues'},
    
    # Composants Post
    {'files': ['frontend/src/components/PostCard.vue'], 'message': 'frontend: création du composant PostCard'},
    {'files': ['frontend/src/components/PostCard.vue'], 'message': 'frontend: affichage du contenu du post'},
    {'files': ['frontend/src/components/PostCard.vue'], 'message': 'frontend: boutons like et comment'},
    {'files': ['frontend/src/components/PostCard.vue'], 'message': 'style frontend: design de la carte post'},
    {'files': ['frontend/src/components/PostModal.vue'], 'message': 'frontend: modal de création de post'},
    {'files': ['frontend/src/components/PostModal.vue'], 'message': 'frontend: upload d\'image'},
    {'files': ['frontend/src/components/PostViewModal.vue'], 'message': 'frontend: modal de visualisation post'},
    {'files': ['frontend/src/components/EditPostModal.vue'], 'message': 'frontend: modal d\'édition post'},
    
    # Composants Comment
    {'files': ['frontend/src/components/CommentsModal.vue'], 'message': 'frontend: modal des commentaires'},
    {'files': ['frontend/src/components/CommentsModal.vue'], 'message': 'frontend: liste des commentaires'},
    {'files': ['frontend/src/components/CommentsModal.vue'], 'message': 'frontend: ajout de commentaire'},
    
    # Composants Profile
    {'files': ['frontend/src/components/EditProfileModal.vue'], 'message': 'frontend: modal édition profil'},
    {'files': ['frontend/src/components/EditProfileModal.vue'], 'message': 'frontend: upload photo de profil'},
    {'files': ['frontend/src/components/FollowersTooltip.vue'], 'message': 'frontend: tooltip followers'},
    {'files': ['frontend/src/components/FollowingsSidebar.vue'], 'message': 'frontend: sidebar des abonnements'},
    
    # Composants Chat
    {'files': ['frontend/src/components/ChatModal.vue'], 'message': 'frontend: modal de chat'},
    {'files': ['frontend/src/components/ChatModal.vue'], 'message': 'frontend: affichage des messages'},
    {'files': ['frontend/src/components/ChatModal.vue'], 'message': 'frontend: envoi de messages'},
    {'files': ['frontend/src/components/ChatSidebar.vue'], 'message': 'frontend: sidebar conversations'},
    {'files': ['frontend/src/components/ChatSidebar.vue'], 'message': 'frontend: liste des conversations'},
    {'files': ['frontend/src/components/ChatModal.vue'], 'message': 'frontend: support des stickers'},
    
    # Migrations supplémentaires
    {'files': ['backend/migrations/Version20250923112700.php'], 'message': 'backend: migration stockage Base64'},
    {'files': ['backend/migrations/Version20250923120000.php'], 'message': 'backend: champs vérification email'},
    {'files': ['backend/migrations/Version20250923130000.php'], 'message': 'backend: champs reset password'},
    {'files': ['backend/migrations/Version20250924145447.php'], 'message': 'backend: support Mercure'},
    
    # === SEMAINE 6 (24-30 Sept) : Optimisations et Documentation ===
    
    # Features avancées
    {'files': ['docker-compose.yml'], 'message': 'fonctionnalité avancée: ajout d\'Elasticsearch'},
    {'files': ['docker-compose.yml'], 'message': 'fonctionnalité avancée: ajout de Kibana'},
    {'files': ['docker-compose.yml'], 'message': 'fonctionnalité avancée: configuration Mercure'},
    {'files': ['docker-compose.yml'], 'message': 'fonctionnalité avancée: ajout de MailHog'},
    
    # Scripts utilitaires
    {'files': ['check-controllers.php'], 'message': 'chore: script de vérification des contrôleurs'},
    {'files': ['check-routes.php'], 'message': 'chore: script de vérification des routes'},
    {'files': ['debug-endpoints.js'], 'message': 'chore: script de debug des endpoints'},
    {'files': ['start-and-test.sh'], 'message': 'chore: script de démarrage automatique'},
    
    # Optimisations backend
    {'files': ['backend/src/Repository/PostRepository.php'], 'message': 'ameliorer backend: optimisation requêtes posts'},
    {'files': ['backend/src/Repository/UserRepository.php'], 'message': 'ameliorer backend: index sur recherche users'},
    {'files': ['backend/src/Controller/PostController.php'], 'message': 'ameliorer backend: cache des posts populaires'},
    {'files': ['backend/migrations/Version20250930015258.php'], 'message': 'ameliorer backend: ajout d\'index optimisés'},
    
    # Optimisations frontend
    {'files': ['frontend/src/stores/posts.js'], 'message': 'ameliorer frontend: mise en cache des posts'},
    {'files': ['frontend/src/components/PostCard.vue'], 'message': 'ameliorer frontend: lazy loading des images'},
    {'files': ['frontend/src/router/index.js'], 'message': 'ameliorer frontend: lazy loading des routes'},
    
    # Corrections de bugs
    {'files': ['backend/src/Controller/AuthController.php'], 'message': 'fix de backend: validation email unique'},
    {'files': ['frontend/src/views/Login.vue'], 'message': 'fix de frontend: gestion erreurs connexion'},
    {'files': ['frontend/src/components/PostModal.vue'], 'message': 'fix de frontend: validation taille image'},
    {'files': ['backend/src/Controller/ChatController.php'], 'message': 'fix de backend: ordre chronologique messages'},
    {'files': ['frontend/src/components/NotificationDropdown.vue'], 'message': 'fix de frontend: actualisation temps réel'},
    
    # Refactoring
    {'files': ['backend/src/Entity/User.php'], 'message': 'refaire backend: nettoyage entité User'},
    {'files': ['frontend/src/stores/auth.js'], 'message': 'refaire frontend: simplification store auth'},
    {'files': ['frontend/src/components/Navbar.vue'], 'message': 'refaire frontend: composant Navbar modulaire'},
    
    # Tests
    {'files': ['backend/tests/Controller/AuthControllerTest.php'], 'message': 'test backend: tests unitaires AuthController'},
    {'files': ['backend/tests/Entity/UserTest.php'], 'message': 'test backend: tests entité User'},
    
    # Documentation
    {'files': ['README.md'], 'message': 'docs: documentation complète du projet'},
    {'files': ['README.md'], 'message': 'docs: guide d\'installation'},
    {'files': ['README.md'], 'message': 'docs: stack technique détaillée'},
    {'files': ['EMAIL_VERIFICATION_GUIDE.md'], 'message': 'docs: guide vérification email'},
    {'files': ['backend/README.md'], 'message': 'docs: documentation API backend'},
    {'files': ['frontend/README.md'], 'message': 'docs: documentation frontend'},
    
    # Commentaires et traductions
    {'files': ['backend/src/Controller/'], 'message': 'documentation backend: commentaires contrôleurs'},
    {'files': ['backend/src/Entity/'], 'message': 'documentation backend: commentaires entités'},
    {'files': ['backend/src/Repository/'], 'message': 'documentation backend: commentaires repositories'},
    {'files': ['frontend/src/components/'], 'message': 'documentation frontend: commentaires composants'},
    {'files': ['frontend/src/views/'], 'message': 'documentation frontend: commentaires vues'},
    {'files': ['frontend/src/stores/'], 'message': 'documentation frontend: commentaires stores'},
    {'files': ['.'], 'message': 'docs: traduction commentaires en français'},
    {'files': ['.'], 'message': 'docs: amélioration documentation code'},
    {'files': ['.'], 'message': 'docs: finalisation documentation'},
    
    # Derniers ajustements
    {'files': ['docker-compose.yml'], 'message': 'chore: optimisation configuration Docker'},
    {'files': ['Makefile'], 'message': 'chore: ajout commandes utiles'},
    {'files': ['backend/config/packages/'], 'message': 'chore: mise à jour configs Symfony'},
    {'files': ['.gitignore'], 'message': 'chore: mise à jour gitignore'},
    {'files': ['LICENSE'], 'message': 'docs: ajout de la licence'},
    {'files': ['.'], 'message': 'chore: préparation pour production'},
]

def main():
    print("=" * 100)
    print("Script AMÉLIORÉ de création des commits Git pour LinkMe")
    print(f"Période: {START_DATE.strftime('%d/%m/%Y')} → {END_DATE.strftime('%d/%m/%Y')} ({(END_DATE - START_DATE).days + 1} jours)")
    print(f"Nombre de commits: {len(commits)}")
    print("=" * 100)
    print()
    
    # Vérifier qu'on est dans un repo git
    try:
        subprocess.run(['git', 'status'], check=True, capture_output=True)
    except subprocess.CalledProcessError:
        print("❌ Erreur: Ce n'est pas un dépôt Git valide")
        print("💡 Initialisez d'abord avec: git init")
        return
    
    # Générer les commits
    total = len(commits)
    success_count = 0
    
    for i, commit in enumerate(commits):
        # Générer une date progressive
        commit_date = generate_progressive_date(START_DATE, i, total)
        
        if git_commit(commit['files'], commit['message'], commit_date):
            success_count += 1
    
    print("\n" + "=" * 100)
    print(f"✅ Terminé! {success_count}/{total} commits créés avec succès")
    print("=" * 100)
    print()
    
    if success_count > 0:
        print("📊 Vérification de l'historique:")
        print("   git log --oneline --graph")
        print("   git log --pretty=format:\"%h - %ad : %s\" --date=format:\"%d/%m/%Y %H:%M\"")
        print()
        print("🚀 Pour pousser vers GitHub:")
        print("   git push origin main --force")
        print()
        print("💡 Vérifiez ensuite votre profil GitHub pour voir les contributions!")
    
if __name__ == '__main__':
    main()
