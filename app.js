function App() {
    const [tarefas, setTarefas] = React.useState(() => {
        return JSON.parse(localStorage.getItem("tarefas")) || [];
    });

    const [input, setInput] = React.useState("");

    // salvar sempre que mudar
    React.useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    function adicionarTarefa() {
        if (input.trim() === "") {
            alert("Digite uma tarefa válida");
            return;
        }

        setTarefas([
            ...tarefas,
            { nome: input.trim(), concluida: false }
        ]);
        setInput("");
    }

    function toggleTarefa(index) {
        const novas = [...tarefas];
        novas[index].concluida = !novas[index].concluida;
        setTarefas(novas);
    }

    function removerTarefa(index) {
        const novas = tarefas.filter((_, i) => i !== index);
        setTarefas(novas);
    }

    return (
        <div>
            <h1>Questão 1</h1>

            <input
                type="text"
                placeholder="Digite uma tarefa"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={adicionarTarefa}>
                Adicionar
            </button>

            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                        <span
                            onClick={() => toggleTarefa(index)}
                            style={{
                                cursor: "pointer",
                                textDecoration: tarefa.concluida ? "line-through" : "none"
                            }}
                        >
                            {tarefa.nome}
                        </span>

                        <button
                            onClick={() => removerTarefa(index)}
                            style={{ marginLeft: "10px" }}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// render
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);