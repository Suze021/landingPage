# Landing Page de Portfólio (EN/PT-BR)

Landing page pessoal com foco em currículo e recrutamento, com visual minimalista, seletor de projetos e troca de idioma em tempo real (inglês e português brasileiro).

## Objetivo

- Apresentar perfil profissional de forma direta.
- Destacar projetos com descrição, stack e links.
- Funcionar bem em desktop e celular.
- Aplicar boas práticas de segurança para site estático.

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vue 3 via CDN)

## Estrutura do Projeto

- `main.html`: estrutura da página, marcação e bindings Vue.
- `styles.css`: estilo visual, layout responsivo e animações.
- `script.js`: estado reativo, i18n (EN/PT-BR), seletor de projetos e saneamento de dados.
- `SECURITY.md`: guia de segurança da aplicação e hosting.
- `nginx-security.conf`: exemplo de configuração Nginx com headers e hardening.

## Funcionalidades Principais

- Seletor de projetos com transição suave.
- Botão de idioma no topo (`PT-BR` / `EN`) sem uso de tradutor automático.
- Troca de idioma com atualização de:
  - navegação
  - hero
  - seção sobre
  - seção de projetos
  - seção de contato
  - rodapé
  - `title`, `meta description` e `lang` do documento
- Layout adaptado para mobile com:
  - navegação horizontal utilizável no topo
  - alvos de toque adequados
  - seletor de projetos com rolagem horizontal e snap

## Segurança Implementada

- CSP (Content Security Policy) no HTML.
- `noopener noreferrer` em links externos.
- Saneamento de texto e URLs no `script.js`.
- Bloqueio de esquemas perigosos em links (`javascript:` etc.).
- Sem uso de `innerHTML` para renderização de conteúdo dinâmico.

Observação:
`nmap` e testes de rede dependem de proteção no servidor/infra (firewall, portas fechadas, WAF). O frontend sozinho não consegue bloquear varredura de portas.

## Como Rodar Localmente

Opção 1 (Python):

```bash
python -m http.server 5500
```

Opção 2 (Node):

```bash
npx serve .
```

Depois acesse no navegador:

- `http://localhost:5500/main.html` (Python)
- ou URL exibida pelo `serve`.

## Personalização Rápida

- Nome: editar em `main.html` (`YOUR NAME`).
- E-mail e links sociais: editar em `main.html` (seção contato).
- Conteúdo de textos e traduções: editar em `script.js` no objeto `localeContent`.
- Projetos (EN/PT-BR): editar em `script.js` dentro de `localeContent.en.projects` e `localeContent["pt-BR"].projects`.

## Deploy

Para produção, publique como site estático e aplique headers de segurança no servidor/CDN.

Se usar Nginx, utilize `nginx-security.conf` como base e ajuste:

- `server_name`
- `root`
- certificados TLS
