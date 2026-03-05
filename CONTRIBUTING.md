# Contribuindo com o Açaí System Delivery

## 🌿 Estratégia de Branching (GitFlow)

```
main ─────────────────────────────────── (produção, tags de release)
  │
  └── develop ────────────────────────── (integração contínua)
        │
        ├── feature/nome-da-feature ──── (novas funcionalidades)
        ├── feature/outra-feature
        │
        ├── release/v1.0.0 ──────────── (preparação de release)
        │
        └── hotfix/correcao-urgente ──── (correções em produção)
```

### Branches

| Branch | Propósito | Base | Merge para |
|--------|-----------|------|------------|
| `main` | Código em produção | — | — |
| `develop` | Integração de features | `main` | `main` (via release) |
| `feature/*` | Nova funcionalidade | `develop` | `develop` |
| `release/*` | Preparação de versão | `develop` | `main` + `develop` |
| `hotfix/*` | Correção urgente | `main` | `main` + `develop` |

### Fluxo de Trabalho

1. **Nova feature:**
   ```bash
   git checkout develop
   git checkout -b feature/nome-da-feature
   # ... desenvolve ...
   git add -A && git commit -m "feat: descrição"
   git checkout develop
   git merge feature/nome-da-feature
   git push origin develop
   git branch -d feature/nome-da-feature
   ```

2. **Release:**
   ```bash
   git checkout develop
   git checkout -b release/v1.0.0
   # ... ajustes finais, bump de versão ...
   git checkout main
   git merge release/v1.0.0
   git tag -a v1.0.0 -m "Release v1.0.0"
   git checkout develop
   git merge release/v1.0.0
   git branch -d release/v1.0.0
   ```

3. **Hotfix:**
   ```bash
   git checkout main
   git checkout -b hotfix/correcao
   # ... corrige ...
   git checkout main
   git merge hotfix/correcao
   git tag -a v1.0.1 -m "Hotfix v1.0.1"
   git checkout develop
   git merge hotfix/correcao
   git branch -d hotfix/correcao
   ```

## 📝 Conventional Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Documentação |
| `refactor:` | Refatoração sem mudar comportamento |
| `style:` | Formatação, sem mudança de lógica |
| `test:` | Adição/correção de testes |
| `chore:` | Manutenção, configs, dependências |

**Exemplo:** `feat: add JWT authentication with Spring Security`
