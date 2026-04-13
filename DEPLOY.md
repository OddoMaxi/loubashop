# 🚀 Guide Déploiement GitHub + Hostinger

## PARTIE 1 : Créer et pousser sur GitHub

### 1.1 Initialiser le repo Git local
```bash
cd c:\project\loubashop
git init
git add .
git commit -m "Initial commit - LoubaShop v1.0"
```

### 1.2 Créer le repo sur GitHub
1. Va sur https://github.com/new
2. **Repository name**: `loubashop` (ou ton nom préféré)
3. **Description**: "LoubaShop - Revendeur Minelab Afrique de l'Ouest"
4. **Visibility**: Public (ou Private si tu préfères)
5. **Ne coche PAS** "Add a README" (on en a déjà un)
6. Clique **Create repository**

### 1.3 Connecter et pousser le code
Remplace `TON_USER` par ton nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/TON_USER/loubashop.git
git branch -M main
git push -u origin main
```

**Vérifie** : Ton code doit être visible sur https://github.com/TON_USER/loubashop

---

## PARTIE 2 : Configurer Hostinger avec GitHub

### 2.1 Accéder à Git Integration dans Hostinger
1. Connecte-toi à ton **hPanel Hostinger**
2. Va dans **Websites** → Clique sur ton site
3. Cherche **Advanced** → **Git**
4. Clique **Add Repository**

### 2.2 Configurer le repository
- **Git Provider**: GitHub
- **Repository**: `TON_USER/loubashop` (ton username + nom du repo)
- **Branch**: `main`
- **Install path**: `/public_html` (ou `/` selon ton hébergement)
- **Build command**: Laisse vide (site statique)

### 2.3 Authentification GitHub
Si demandé :
1. Clique **Authorize Hostinger**
2. Connecte-toi à ton compte GitHub
3. Accepte les permissions

### 2.4 Premier déploiement
- Clique sur **Deploy** ou **Add Repository**
- Attends que le statut passe à **Success** (2-3 minutes)

### 2.5 Activer le Auto-Deployment (Optionnel mais recommandé)
1. Dans la configuration Git, cherche **Auto-deployment**
2. Active l'option **Enable automatic deployment**
3. Cela déploiera automatiquement à chaque `git push`

---

## PARTIE 3 : Vérifier le déploiement

### 3.1 Vérifier les fichiers
Dans hPanel → **Files** → **File Manager** → `public_html`
Tu dois voir :
```
public_html/
├── index.html
├── product.html
├── style.css
├── product.css
├── main.js
├── product.js
├── products-data.js
├── *.png (images)
└── ...
```

### 3.2 Tester le site
Ouvre ton domaine : `https://ton-domaine.com`

### 3.3 Activer SSL (HTTPS)
1. Dans hPanel → **Websites**
2. Clique sur **SSL** à côté de ton domaine
3. Active le certificat **Let's Encrypt** (gratuit)
4. Attends l'activation (quelques minutes)

---

## PARTIE 4 : Mettre à jour le site (Future)

Après chaque modification locale :

```bash
cd c:\project\loubashop

# Voir les modifications
git status

# Ajouter les changements
git add .

# Commit
git commit -m "Description des changements"

# Pousser (déclenche auto-deploy si activé)
git push origin main
```

**Si auto-deploy est désactivé** :
1. Va dans hPanel → **Git**
2. Clique sur **Deploy** manuellement

---

## 🆘 Dépannage

### Problème : "Repository not found"
- Vérifie que le repo est en **Public** sur GitHub
- Si **Private**: Génère un Personal Access Token sur GitHub (Settings → Developer settings → Personal access tokens)

### Problème : "Permission denied"
- Vérifie que tu as donné l'autorisation à Hostinger dans GitHub
- Révoque et ré-autorise dans GitHub → Settings → Applications

### Problème : Les fichiers n'apparaissent pas
- Vérifie le **Install path** (doit être `/public_html`)
- Vérifie que tu pousses sur la bonne **branch** (`main`)

---

## ✅ Check-list finale

- [ ] Repo GitHub créé et code poussé
- [ ] Git configuré dans Hostinger
- [ ] Premier déploiement réussi
- [ ] Site accessible sur le domaine
- [ ] SSL (HTTPS) activé
- [ ] Auto-deployment activé (optionnel)

**Besoin d'aide ?** Contacte le support Hostinger ou vérifie leur doc : https://support.hostinger.com
