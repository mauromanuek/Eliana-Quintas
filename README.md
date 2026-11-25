# Eliana Quintas — Website Oficial

Website estático construído em React, TypeScript, Vite e Tailwind CSS, pronto para alojamento no **GitHub** e deploy como **Static Site no Render**.

## Estrutura estática

- `src/` — Código-fonte da aplicação e imagens dos serviços (`src/assets/images/`).
- `public/` — Recursos públicos estáticos copiados diretamente para `dist/`.
- `render.yaml` — Configuração automática para Static Site no Render (`staticPublishPath: ./dist`).

## Execução local

```bash
npm install
npm run dev
```

## Build estático

```bash
npm run build
```

O resultado final totalmente estático é gerado na pasta `dist/`.

## Deploy no Render (via GitHub)

1. Suba este repositório para o GitHub (`git push`).
2. No Render, crie um novo **Static Site** (ou **Blueprint** usando `render.yaml`) ligado ao repositório:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
