# Guide de Test - Vérification d'Email et Réinitialisation de Mot de Passe

## 🎉 Fonctionnalités Implémentées

### ✅ Vérification d'Email lors de l'Inscription
- **Inscription** : L'utilisateur s'inscrit mais n'est pas connecté automatiquement
- **Email de vérification** : Un email est envoyé avec un lien de vérification
- **Vérification obligatoire** : L'utilisateur ne peut pas se connecter tant que son email n'est pas vérifié
- **Page de vérification** : Interface utilisateur pour confirmer l'email avec redirection automatique

### ✅ Réinitialisation de Mot de Passe
- **Lien "Mot de passe oublié"** : Ajouté sur la page de connexion
- **Formulaire de demande** : L'utilisateur saisit son email
- **Email de réinitialisation** : Lien sécurisé avec token temporaire (30 minutes)
- **Page de réinitialisation** : Interface pour saisir un nouveau mot de passe
- **Confirmation** : Message de succès et redirection vers la connexion

## 🧪 Comment Tester

### 1. Démarrer les Services
```bash
# Démarrer MailHog et le backend
docker compose up -d mailhog backend

# Démarrer le frontend
docker compose up -d frontend
```

### 2. Accéder aux Interfaces
- **Frontend** : http://localhost:5173
- **MailHog** : http://localhost:8025 (pour voir les emails)
- **Backend API** : http://localhost:8000

### 3. Test de l'Inscription avec Vérification d'Email

1. **Aller sur** http://localhost:5173/register
2. **S'inscrire** avec un nouvel email (ex: `test@example.com`)
3. **Vérifier** que vous n'êtes pas connecté automatiquement
4. **Aller sur** http://localhost:8025 pour voir l'email de vérification
5. **Cliquer** sur le lien de vérification dans l'email
6. **Vérifier** que vous êtes redirigé vers la page de vérification
7. **Attendre** la redirection automatique vers la page de connexion (10 secondes)
8. **Se connecter** avec vos identifiants

### 4. Test de la Réinitialisation de Mot de Passe

1. **Aller sur** http://localhost:5173/login
2. **Cliquer** sur "Forgot your password?"
3. **Saisir** votre email
4. **Aller sur** http://localhost:8025 pour voir l'email de réinitialisation
5. **Cliquer** sur le lien de réinitialisation dans l'email
6. **Saisir** un nouveau mot de passe
7. **Confirmer** le nouveau mot de passe
8. **Vérifier** la redirection vers la page de connexion
9. **Se connecter** avec le nouveau mot de passe

## 🔧 Endpoints API Créés

### Inscription avec Vérification
```
POST /api/user/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Username"
}
```

### Vérification d'Email
```
GET /api/user/verify-email?token=VERIFICATION_TOKEN
```

### Demande de Réinitialisation
```
POST /api/user/forgot-password
{
  "email": "user@example.com"
}
```

### Réinitialisation de Mot de Passe
```
POST /api/user/reset-password
{
  "token": "RESET_TOKEN",
  "password": "newpassword123"
}
```

## 🛡️ Sécurité Implémentée

- **Tokens sécurisés** : Générés avec `random_bytes(32)`
- **Expiration** : Token de réinitialisation expire en 30 minutes
- **Validation** : Vérification de l'existence et de la validité des tokens
- **Protection** : Les utilisateurs non vérifiés ne peuvent pas se connecter
- **Messages génériques** : Pas de révélation d'informations sensibles

## 📧 Configuration MailHog

MailHog est configuré pour intercepter tous les emails :
- **SMTP** : localhost:1025
- **Interface Web** : http://localhost:8025
- **Configuration** : `MAILER_DSN=smtp://mailhog:1025`

## 🎨 Interface Utilisateur

### Pages Créées
- `/verify-email` - Page de vérification d'email
- `/forgot-password` - Page de demande de réinitialisation
- `/reset-password` - Page de réinitialisation de mot de passe

### Fonctionnalités UI
- **Design responsive** : Compatible mobile et desktop
- **Animations** : Transitions fluides et indicateurs de chargement
- **Messages d'erreur** : Gestion des erreurs avec messages clairs
- **Compteurs** : Redirection automatique avec compte à rebours
- **Validation** : Validation côté client des formulaires

## 🚀 Test Automatisé

Un script de test est disponible :
```bash
node test-email-verification.js
```

Ce script teste :
1. L'inscription d'un nouvel utilisateur
2. Le blocage de la connexion sans vérification
3. La demande de réinitialisation de mot de passe
4. L'envoi des emails via MailHog

## 📝 Notes Importantes

- **Base de données** : Les colonnes `is_verified`, `verification_token`, `reset_password_token`, et `reset_password_expires_at` ont été ajoutées à la table `user`
- **UserChecker** : Vérifie automatiquement le statut de vérification lors de la connexion
- **Emails HTML** : Les emails sont formatés avec du HTML pour une meilleure présentation
- **URLs** : Les liens dans les emails pointent vers le frontend (localhost:5173)

## 🎯 Prochaines Étapes Possibles

- Ajouter la possibilité de renvoyer l'email de vérification
- Implémenter l'expiration des tokens de vérification
- Ajouter des notifications push pour les emails
- Personnaliser les templates d'emails
- Ajouter la vérification par SMS
