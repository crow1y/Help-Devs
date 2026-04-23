# DevResources 🖥️

Sistema de gerenciamento de recursos e materiais de estudo para desenvolvedores.

## Como executar

```bash
npm install
npm run dev
```

## Arquitetura

### Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis da UI
│   ├── Navbar.tsx     # Barra de navegação + busca
│   ├── Sidebar.tsx    # Filtro de categorias
│   ├── Dashboard.tsx  # Contadores dinâmicos
│   ├── ListaRecursos.tsx  # Grid de cards
│   ├── CardRecurso.tsx    # Card individual de recurso
│   └── Footer.tsx     # Rodapé com identificação
├── data/
│   └── recursosIniciais.ts  # Dados mockados iniciais
├── styles/
│   └── global.css     # Personalizações de cores e fontes
├── types/
│   └── tipos.ts       # Interfaces TypeScript centralizadas
├── App.tsx            # Componente raiz + estado global
└── main.tsx           # Entry point
```

### Justificativa da Arquitetura

**Estado centralizado no App.tsx:** Toda a lógica de estado (`useState`) foi colocada no `App.tsx` para facilitar a comunicação entre componentes irmãos (Sidebar, Dashboard e ListaRecursos precisam reagir aos mesmos dados). Isso evita prop-drilling excessivo e mantém o fluxo de dados previsível (dados descem via props, eventos sobem via callbacks).

**Separação por responsabilidade:**
- `types/tipos.ts` centraliza todas as interfaces TypeScript, garantindo um único ponto de verdade para os contratos de dados.
- `data/` separa os dados da lógica de apresentação.
- `components/` contém apenas componentes de UI sem lógica de negócio.
- `styles/global.css` personaliza cores e fontes sem modificar o Bootstrap.

**Componentização granular:** O `CardRecurso` foi separado do `ListaRecursos` para ser reutilizável e manter cada arquivo focado em uma única responsabilidade.

## Tecnologias

- **React 19** + **Vite** — build rápido e HMR
- **TypeScript** — tipagem forte em todas as props e estados
- **Bootstrap 5 via CDN** — grid responsivo e utilitários
- **CSS externo** — personalização de tema (dark mode estilo terminal)

---

Desenvolvido por **Igor Cabral** | Desenvolvimento de Software WEB | Prof. Alexandre Almeida
