# Landing Page de Portfólio (EN/PT-BR)

Landing page pessoal para currículo/recrutamento com visual minimalista, seletor de projetos e troca de idioma em tempo real.

## Objetivo

- Apresentar perfil profissional de forma direta.
- Destacar projetos com descrição, stack e links.
- Funcionar bem em desktop e celular.
- Separar claramente camadas de frontend e backend.

## Stack

- HTML5
- CSS3
- JavaScript (Vue 3 via CDN)
- Node.js (server HTTP nativo)

## Estrutura do Projeto

- `frontend/index.html`: estrutura da interface.
- `frontend/styles.css`: estilos e responsividade.
- `frontend/js/app.js`: estado Vue e renderização da UI.
- `frontend/api/portfolioApi.js`: client de API do frontend.
- `backend/server/server.js`: servidor HTTP e rotas da API.
- `backend/server/portfolioData.js`: conteúdo de textos/projetos por idioma.
- `SECURITY.md`: resumo de hardening e limites de segurança.
- `nginx-security.conf`: baseline para hardening em Nginx (opcional).

## Separação Front e Back

- Frontend (API):
  - O frontend não carrega mais conteúdo hardcoded principal da página.
  - Ele consulta `GET /api/portfolio?lang=en|pt-BR` via `frontend/api/portfolioApi.js`.

- Backend (Server):
  - O servidor fica em `backend/server/server.js`.
  - Ele entrega arquivos estáticos do `frontend/` e responde as rotas `/api/*`.

## Funcionalidades

- Seletor de projetos com transição suave.
- Botão de idioma (`PT-BR` / `EN`) sem tradutor automático.
- Troca de idioma atualizando navegação, hero, sobre, projetos, contato e metadados do documento.
- Layout adaptado para celular e desktop.

## Segurança Implementada

- CSP (Content Security Policy).
- `noopener noreferrer` em links externos.
- Sanitização de texto/URL no frontend antes de renderizar.
- Validação de idioma e controle de rotas no backend.

Observação:
`nmap` e varreduras de rede dependem de proteção no servidor/infra (firewall, portas, WAF).

## Personalização Rápida

- Nome e links de contato: `frontend/index.html`.
- Textos/traduções/projetos: `backend/server/portfolioData.js`.
- Estilo visual: `frontend/styles.css`.
- Comportamento da UI: `frontend/js/app.js`.

## Política de Uso

Este projeto é público para estudo de estrutura e referência técnica.

Permissões:
- Você pode usar este projeto como base conceitual para criar sua própria versão.
- Você pode se inspirar na arquitetura, organização de pastas e abordagem visual.

Restrições:
- Não é permitido copiar e publicar este código original (total ou parcialmente) como se fosse seu.
- Não é permitido redistribuir este repositório sem alterações substanciais.
- Para uso como base, crie uma implementação própria e personalizada.
