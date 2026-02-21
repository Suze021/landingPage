# Landing Page de Portfólio (EN/PT-BR)

Landing page pessoal para currículo/recrutamento com visual minimalista, seletor de projetos e troca de idioma em tempo real.

## Objetivo

- Apresentar perfil profissional de forma direta.
- Destacar projetos com descrição, stack e links.
- Funcionar bem em desktop e celular.
- Separar claramente camadas de index e server.

## Stack

- HTML5
- CSS3
- JavaScript (Vue 3 via CDN)
- Node.js (server HTTP nativo)

## Estrutura do Projeto

- `index/index.html`: estrutura da interface.
- `index/styles.css`: estilos e responsividade.
- `index/js/app.js`: estado Vue e renderização da UI.
- `index/api/portfolioApi.js`: client de API da camada index.
- `server/server.js`: servidor HTTP e rotas da API.
- `server/portfolioData.js`: conteúdo de textos/projetos por idioma.
- `SECURITY.md`: resumo de hardening e limites de segurança.
- `nginx-security.conf`: baseline para hardening em Nginx (opcional).

## Separação Front e Back

- Index (API):
  - A camada index não carrega mais conteúdo hardcoded principal da página.
  - Ele consulta `GET /api/portfolio?lang=en|pt-BR` via `index/api/portfolioApi.js`.

- Server (Backend):
  - O servidor fica em `server/server.js`.
  - Ele entrega arquivos estáticos do `index/` e responde as rotas `/api/*`.

## Funcionalidades

- Seletor de projetos com transição suave.
- Botão de idioma (`PT-BR` / `EN`) sem tradutor automático.
- Troca de idioma atualizando navegação, hero, sobre, projetos, contato e metadados do documento.
- Layout adaptado para celular e desktop.

## Segurança Implementada

- CSP (Content Security Policy).
- `noopener noreferrer` em links externos.
- Sanitização de texto/URL na camada index antes de renderizar.
- Validação de idioma e controle de rotas na camada server.

Observação:
`nmap` e varreduras de rede dependem de proteção no servidor/infra (firewall, portas, WAF).

## Personalização Rápida

- Nome e links de contato: `index/index.html`.
- Textos/traduções/projetos: `server/portfolioData.js`.
- Estilo visual: `index/styles.css`.
- Comportamento da UI: `index/js/app.js`.

## Política de Uso

Este projeto é público para estudo de estrutura e referência técnica.

Permissões:
- Você pode usar este projeto como base conceitual para criar sua própria versão.
- Você pode se inspirar na arquitetura, organização de pastas e abordagem visual.

Restrições:
- Não é permitido copiar e publicar este código original (total ou parcialmente) como se fosse seu.
- Não é permitido redistribuir este repositório sem alterações substanciais.
- Para uso como base, crie uma implementação própria e personalizada.

