# 🔧 Guide de débogage - LinkMe

## Problèmes identifiés et solutions

### 1. Configuration de sécurité corrigée
- ✅ **Problème** : Configuration de sécurité incorrecte dans `security.yaml`
- ✅ **Solution** : Séparation des firewalls `login` et `api`

### 2. Logs de débogage ajoutés
- ✅ **Frontend** : Logs détaillés dans tous les composants
- ✅ **Backend** : Vérification des endpoints API

### 3. Scripts de test créés
- ✅ `debug-endpoints.js` - Test des endpoints API
- ✅ `check-routes.php` - Vérification des routes
- ✅ `check-controllers.php` - Vérification des contrôleurs

## 🚀 Instructions de débogage

### Étape 1: Démarrer l'application
```bash
cd linkme-main
make up
make db-init
```

### Étape 2: Vérifier les logs
Ouvrez la console du navigateur (F12) et regardez les logs :
- Les logs commencent par "Toggling like for post:"
- Les logs commencent par "Adding comment for post:"
- Les logs commencent par "Loading user posts for userId:"

### Étape 3: Tester les endpoints
```bash
node debug-endpoints.js
```

### Étape 4: Vérifier les contrôleurs
```bash
php check-controllers.php
```

## 🔍 Problèmes possibles et solutions

### Problème 1: "User not authenticated"
**Cause** : Token JWT invalide ou manquant
**Solution** : 
1. Vérifier que l'utilisateur est connecté
2. Vérifier que le token est présent dans localStorage
3. Vérifier que le token est envoyé dans les headers

### Problème 2: "Post not found"
**Cause** : ID de post invalide
**Solution** :
1. Vérifier que le post existe dans la base de données
2. Vérifier que l'ID est correct

### Problème 3: "Access denied"
**Cause** : L'utilisateur n'est pas l'auteur du post/commentaire
**Solution** :
1. Vérifier que l'utilisateur est bien l'auteur
2. Vérifier les permissions

### Problème 4: CORS errors
**Cause** : Configuration CORS incorrecte
**Solution** :
1. Vérifier la configuration dans `nelmio_cors.yaml`
2. Vérifier que le frontend utilise la bonne URL

## 📊 Vérifications à faire

### 1. Vérifier la base de données
```bash
make bash-backend
php bin/console doctrine:schema:validate
php bin/console doctrine:migrations:status
```

### 2. Vérifier les logs du serveur
```bash
make logs
```

### 3. Vérifier la configuration
```bash
make bash-backend
php bin/console debug:router
php bin/console debug:container
```

## 🎯 Tests à effectuer

1. **Créer un compte** et se connecter
2. **Créer un post** et vérifier qu'il apparaît sur Home
3. **Liker un post** et vérifier que le compteur se met à jour
4. **Commenter un post** et vérifier que le commentaire s'ajoute
5. **Aller sur le profil** et vérifier que les posts s'affichent
6. **Supprimer un post** et vérifier qu'il disparaît

## 📝 Logs à surveiller

### Frontend (Console du navigateur)
- `Toggling like for post: X` - Tentative de like
- `Like result: {liked: true/false, likesCount: X}` - Résultat du like
- `Adding comment for post: X` - Tentative de commentaire
- `Comment added: {...}` - Commentaire ajouté
- `Loading user posts for userId: X` - Chargement des posts du profil

### Backend (Logs Docker)
- `POST /api/posts/{id}/like` - Endpoint de like appelé
- `POST /api/posts/{id}/comments` - Endpoint de commentaire appelé
- `DELETE /api/posts/{id}` - Endpoint de suppression appelé

## 🚨 Si les problèmes persistent

1. **Redémarrer les conteneurs** :
   ```bash
   make down
   make up
   ```

2. **Vider le cache** :
   ```bash
   make clear-backend-cache
   ```

3. **Recréer la base de données** :
   ```bash
   make db-force-update
   ```

4. **Vérifier les permissions** :
   ```bash
   chmod +x start-and-test.sh
   ./start-and-test.sh
   ```
