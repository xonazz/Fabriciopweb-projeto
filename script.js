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
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Horário:</strong> ${inicio} às ${fim}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
    `;

    lista.appendChild(atividade);

    form.reset();
});
