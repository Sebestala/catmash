# 🐱 Catmash - Projet de Vote pour le Chat le Plus Mignon

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Technologies utilisées](#technologies-utilisées)
3. [Architecture du projet](#architecture-du-projet)
4. [Installation](#installation)
5. [Lancement du projet](#lancement-du-projet)
6. [Fonctionnalités](#fonctionnalités)
7. [Améliorations possibles](#améliorations-possibles)

## 🌟 Introduction

Catmash est une application web permettant aux utilisateurs de voter pour le chat le plus mignon et
de consulter un classement des chats les plus populaires. Ce projet a été développé en utilisant une
architecture monorepo avec Turborepo, combinant un frontend Next.js et un backend Express.

## 🚀 Technologies utilisées

- **Turborepo** : Choisi pour sa capacité à gérer efficacement un monorepo, permettant le lancement
  du projet en une seule console, le partage de données entre les packages, et une amélioration
  significative de la rapidité de développement et de build.
- **Next.js v15 et React v19** : Utilisés pour le frontend, offrant des performances optimales et
  les dernières fonctionnalités pour le développement d'applications web modernes.
- **Express** : Choisi pour le backend en raison de sa simplicité et de sa flexibilité, bien que
  dans un contexte différent, j'aurais pu opter pour un backend Next.js pour tirer parti de ses
  fonctionnalités avancées.
- **Tailwind CSS** : Pour un styling rapide et cohérent.
- **Supabase** : Utilisé comme base de données et pour ses fonctionnalités backend-as-a-service.

## 🏗️ Architecture du projet

Le projet est structuré comme suit :

- `apps/`

- `web/` : Application frontend Next.js
- `api/` : Serveur backend Express

- `packages/`

- `types/` : Types partagés entre le frontend et le backend
- `ui/` : Composants UI réutilisables (bien que peu utilisés dans ce projet de petite envergure,
  c'est une architecture appréciée pour sa scalabilité)
- `eslint-config-custom/` : Configuration ESLint partagée
- `tailwind-config/` : Configuration Tailwind partagée
- `tsconfig/` : Configuration TypeScript partagée

### 🖥️ Backend (Express)

L'API Express suit une architecture classique route/controller/service avec un fichier dédié à la
gestion des erreurs pour une meilleure maintenabilité. Un script s'exécute au lancement du serveur
pour récupérer les données des chats depuis une API externe et les stocker dans la base de données
Supabase.

### 🌐 Frontend (Next.js)

L'application frontend utilise les dernières fonctionnalités de Next.js, incluant les Server
Components et les Server Actions pour optimiser les performances et la réactivité. Un contexte React
est utilisé pour gérer le nombre de matchs joués. Les composants réutilisables et moins dépendants
de l'API sont externalisés dans `packages/ui`.

## 📥 Installation

1. Assurez-vous d'avoir Node.js (version 18 ou supérieure) installé sur votre machine.
2. Clonez le repository :

```plaintext
git clone https://github.com/Sebestala/catmash.git
cd catmash
```

3. Installez les dépendances en utilisant l'un des gestionnaires de paquets (Avec pnpm il est
   recommandé la version 8.15.8) :

```plaintext
pnpm install
yarn install
npm install
```

4. Configurez les variables d'environnement :

Créez un fichier `.env` dans `apps/api/` et `apps/web/` avec les variables nécessaires (ex:
SUPABASE_URL, SUPABASE_KEY, etc.)

## 🏁 Lancement du projet

Pour lancer l'ensemble du projet (frontend et backend) en mode développement en utilisant l'un des
gestionnaires de paquets :

```plaintext
pnpm dev
yarn dev
npm dev
```

Pour lancer uniquement le frontend :

```plaintext
pnpm dev:web
yarn dev:web
npm dev:web
```

Pour lancer uniquement le backend :

```plaintext
pnpm dev:api
yarn dev:api
npm dev:api
```

## 🎯 Fonctionnalités

- 🗳️ Vote pour le chat le plus mignon entre deux chats présentés
- 🏆 Page de classement des chats les plus mignons
- 🚀 Utilisation d'une fonction RPC Supabase 'increment_score' pour optimiser les appels API
- 🖼️ Layout partagé avec logo de chat et barre de navigation
- ⚡ Utilisation de Server Components et Server Actions pour optimiser les performances

## 🔧 Améliorations possibles

1. 🧪 **Tests** : Ajouter des tests unitaires et d'intégration pour améliorer la fiabilité du code.
2. 📚 **Storybook** : Implémenter Storybook pour une meilleure documentation et développement des
   composants UI.
3. 🔄 **Streaming ou Webhooks** : Utiliser du streaming ou des webhooks pour rafraîchir en temps
   réel le nombre de matchs joués, au lieu de le faire à chaque vote ou changement de page.
4. 🚀 **Déploiement sur Vercel** : Trouver une solution pour déployer le backend Express sur Vercel,
   ou envisager de migrer vers un backend Next.js pour faciliter le déploiement.
5. ⚡ **Optimisation des performances** : Analyser et optimiser davantage les performances,
   notamment pour le chargement initial et les interactions utilisateur.
6. 🌍 **Internationalisation** : Ajouter le support pour plusieurs langues.
7. ♿ **Accessibilité** : Améliorer l'accessibilité de l'application pour les utilisateurs ayant des
   besoins spécifiques.
8. 📱 **Mode hors ligne** : Implémenter des fonctionnalités de Progressive Web App pour permettre
   une utilisation hors ligne limitée.
