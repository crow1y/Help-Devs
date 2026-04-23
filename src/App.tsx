import { useState } from "react";
import { IRecurso } from "./types";
import recursosIniciais from "./dados";
import "./estilos.css";

// Categorias disponíveis no filtro lateral
const categorias = ["Todos", "Frontend", "Backend", "DevOps", "Banco de Dados", "Segurança", "IA & ML"];

// Ícones de cada categoria
const icones: Record<string, string> = {
  Todos: "🗂️", Frontend: "🎨", Backend: "⚙️",
  DevOps: "🚀", "Banco de Dados": "🗄️", "Segurança": "🔐", "IA & ML": "🤖",
};

function App() {
  // Estado da lista de recursos
  const [recursos, setRecursos] = useState<IRecurso[]>(recursosIniciais);
  // Estado da categoria selecionada
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  // Estado do campo de busca
  const [busca, setBusca] = useState("");

  // Contadores do dashboard
  const total = recursos.length;
  const salvos = recursos.filter((r) => r.salvo).length;
  const concluidos = recursos.filter((r) => r.concluido).length;
  const pendentes = recursos.filter((r) => !r.concluido).length;

  // Filtra os recursos pela categoria e pela busca
  const recursosFiltrados = recursos.filter((r) => {
    const matchCategoria = categoriaAtiva === "Todos" || r.categoria === categoriaAtiva;
    const matchBusca = r.titulo.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  // Alterna entre salvo e não salvo
  function toggleSalvo(id: number) {
    setRecursos(recursos.map((r) => (r.id === id ? { ...r, salvo: !r.salvo } : r)));
  }

  // Alterna entre concluído e pendente
  function toggleConcluido(id: number) {
    setRecursos(recursos.map((r) => (r.id === id ? { ...r, concluido: !r.concluido } : r)));
  }

  return (
    <>
      {/* NAVBAR */}
      <header>
        <nav className="navbar px-4 py-3">
          <a className="marca">⌨️ Recursos para Devs</a>
          <div className="ms-auto">
            <input
              type="text"
              className="form-control campo-busca"
              placeholder="🔍 Buscar recurso..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </nav>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container-fluid py-4">
        <div className="row g-4">

          {/* SIDEBAR — filtro de categorias */}
          <aside className="col-12 col-md-3">
            <div className="card border-0 p-3">
              <p className="titulo-sidebar mb-3">Categorias</p>
              <div className="d-flex flex-column gap-1">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-categoria w-100 py-2 px-3 ${categoriaAtiva === cat ? "ativo" : ""}`}
                    onClick={() => setCategoriaAtiva(cat)}
                  >
                    {icones[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* SEÇÃO PRINCIPAL */}
          <section className="col-12 col-md-9">

            {/* DASHBOARD */}
            <section className="mb-4">
              <p className="titulo-secao mb-3">📊 Dashboard</p>
              <div className="row g-3">
                {[
                  { label: "Total", valor: total, icone: "📚", cor: "cor-total" },
                  { label: "Salvos", valor: salvos, icone: "🔖", cor: "cor-salvos" },
                  { label: "Concluídos", valor: concluidos, icone: "✅", cor: "cor-concluidos" },
                  { label: "Pendentes", valor: pendentes, icone: "⏳", cor: "cor-pendentes" },
                ].map((item) => (
                  <div key={item.label} className="col-6 col-lg-3">
                    <div className="card-contador p-3 d-flex align-items-center gap-3">
                      <span style={{ fontSize: "1.8rem" }}>{item.icone}</span>
                      <div>
                        <div className={`contador-numero ${item.cor}`}>{item.valor}</div>
                        <div className="contador-legenda">{item.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* LISTA DE RECURSOS */}
            <section>
              <p className="titulo-secao mb-3">📦 Recursos ({recursosFiltrados.length})</p>
              <div className="row g-3">
                {recursosFiltrados.map((recurso) => (
                  <div key={recurso.id} className="col-12 col-sm-6 col-xl-4">
                    <div className={`card-recurso h-100 p-3 d-flex flex-column gap-2 ${recurso.concluido ? "concluido" : ""}`}>

                      {/* Título e botão salvar */}
                      <div className="d-flex justify-content-between align-items-start">
                        <span className={`card-titulo ${recurso.concluido ? "text-decoration-line-through" : ""}`}>
                          {recurso.titulo}
                        </span>
                        <button className="btn-salvo" onClick={() => toggleSalvo(recurso.id)}>
                          {recurso.salvo ? "🔖" : "📌"}
                        </button>
                      </div>

                      {/* Descrição */}
                      <p className="card-descricao mb-0">{recurso.descricao}</p>

                      {/* Badges */}
                      <div className="d-flex gap-2 flex-wrap mt-auto">
                        <span className="badge-categoria">{recurso.categoria}</span>
                        <span className={`ms-auto ${recurso.concluido ? "badge-concluido" : "badge-pendente"}`}>
                          {recurso.concluido ? "✅ Concluído" : "⏳ Pendente"}
                        </span>
                      </div>

                      {/* Botões de ação */}
                      <div className="d-flex gap-2">
                        <a href={recurso.url} target="_blank" rel="noreferrer"
                          className="btn btn-acessar btn-sm flex-grow-1">
                          🔗 Acessar
                        </a>
                        <button
                          className={`btn btn-sm ${recurso.concluido ? "btn-desfazer" : "btn-concluir"}`}
                          onClick={() => toggleConcluido(recurso.id)}
                        >
                          {recurso.concluido ? "↩ Desfazer" : "✔ Concluir"}
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>

          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-5 py-4 px-4">
        <address className="text-center mb-0">
          <strong>Recursos para Devs</strong> — Desenvolvido por{" "}
          <span className="nome-aluno">Igor Cabral</span> | {new Date().getFullYear()} |{" "}
          Desenvolvimento de Software WEB | Prof. Alexandre Almeida
        </address>
      </footer>
    </>
  );
}

export default App;
