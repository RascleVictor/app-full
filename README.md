# DevSecOps Fullstack Application

## Description

Ce projet est une application **Fullstack sécurisée** qui suit les bonnes pratiques DevSecOps, incluant :

- **CI/CD complet** pour le backend et le frontend avec GitHub Actions.
- **Tests automatisés** pour le backend (Spring Boot 4) et le frontend (React + Vitest).
- **Sécurisation des conteneurs Docker** avec analyse de vulnérabilités via **Trivy**.
- **Facilité de déploiement** grâce à `docker-compose`.

L'objectif est de fournir une base pour développer une application web sécurisée et maintenable, avec une méthodologie DevSecOps appliquée.

---

## Architecture

- **Backend** : Spring Boot 4, Java 21, Spring Data JPA, Spring Security, JWT.
- **Frontend** : React 18, Vite, Vitest pour les tests.
- **Base de données** : MySQL (configurable via Docker Compose).
- **Conteneurisation** : Docker pour backend et frontend.

---

## Fonctionnalités

- Authentification et autorisation avec JWT.
- Pages publiques et protégées.
- Gestion de l'état utilisateur côté frontend.
- Tests unitaires et d'intégration pour backend et frontend.
- CI/CD pour build, test et packaging.
- Analyse de sécurité des conteneurs Docker avec Trivy.

---

## Prérequis

- Docker & Docker Compose
- Node.js >= 20
- Maven >= 3.9
- JDK 21

---

## Installation et lancement

1. **Cloner le projet** :

```bash
git clone <repo-url>
cd appsecure 
docker-compose up -d
