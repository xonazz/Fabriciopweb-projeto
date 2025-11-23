const form = document.getElementById("atividadeForm");
const lista = document.getElementById("listaAtividades");
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    themeBtn.textContent =
        document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = document.getElementById("data").value;
    const nome = document.getElementById("nome").value;
    const inicio = document.getElementById("inicio").value;
    const fim = document.getElementById("fim").value;
    const descricao = document.getElementById("descricao").value;

    const atividade = document.createElement("div");
    atividade.classList.add("atividade");

    atividade.innerHTML = `
        <p><strong>${nome}</strong></p>
        <p>${data}</p>
        <p>${inicio} — ${fim}</p>
        <p>${descricao}</p>

        <div class="btn-group">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Excluir</button>
        </div>
    `;

    lista.appendChild(atividade);

    // BOTÃO EXCLUIR
    atividade.querySelector(".btn-delete").addEventListener("click", () => {
        atividade.remove();
    });

    // BOTÃO EDITAR
    atividade.querySelector(".btn-edit").addEventListener("click", () => {
        document.getElementById("data").value = data;
        document.getElementById("nome").value = nome;
        document.getElementById("inicio").value = inicio;
        document.getElementById("fim").value = fim;
        document.getElementById("descricao").value = descricao;

        atividade.remove();
    });

    form.reset();
});
