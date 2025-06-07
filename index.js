const tagselect = document.getElementById("campoDrop");
const tagselect2 = document.getElementById("campoDrop2")

async function carregarTabela() {
const listaProfessores = await window.senacAPI.buscarProfessores();
listaProfessores.forEach(mostrarDetalhes)
}

carregarTabela()

lista.forEach(mostrarDetalhes)

function mostrarDetalhes(linha) {
    const option = document.createElement("option");
    option.value = linha.id
    option.textContent = linha.nome
    tagselect.appendChild(option);
}

//---

async function carregarTabela2() {
const listaAlunos = await window.senacAPI.buscarAlunos();
listaAlunos.forEach(mostrarDetalhes2)
}

carregarTabela2()

lista.forEach(mostrarDetalhes2)

function mostrarDetalhes2(linha) {
    const option2 = document.createElement("option");
    option2.value = linha.id
    option2.textContent = linha.nome
    tagselect2.appendChild(option);
}

