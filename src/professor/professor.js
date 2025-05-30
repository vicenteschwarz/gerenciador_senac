const tabelaProfessor = document.getElementById('profsTableDados');
const modalNomeProfessor = document.getElementById('professor-nome');
const modalCpfProfessor = document.getElementById('professor-cpf');
const modalIDProfessor = document.getElementById('professor-id');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoIncluir = document.getElementById('btn-incluir')

botaoSalvar.addEventListener("click", insereOuAtualizaProfessor);
botaoExcluir.addEventListener("click", excluirProfessor);
botaoIncluir.addEventListener("click", incluirProfessor)

function incluirProfessor() {
    mostrarDetalhes("", "", "")
}

function mostrarDetalhes(nome, cpf, id) {
    modalIDProfessor.value = id;
    modalCpfProfessor.value = cpf;
    modalNomeProfessor.value = nome;
}

async function insereOuAtualizaProfessor() {
    const pID = modalIDProfessor.value;
    const pNome = modalNomeProfessor.value;
    const pCpf = modalCpfProfessor.value;
    if(!pNome || !pMatricula){
        alert('Erro ao tentar inserir/atualizar o professor. Preencha o nome e o CPF corretamente por favor.')}
    if (pID === "") {
        insereProfessor(pNome, pCpf);
        return
    } else {
        atualizaProfessor(pNome, pCpf, pID);

    }

    carregarProfessor();
    mostrarDetalhes("", "", "");
}

async function insereProfessor() {
    const pNome = modalNomeProfessor.value;
    const pCpf = modalCpfProfessor.value;

    console.log(pNome,pCpf)

    const retorno = await window.senacAPI.inserirProfessor(pNome, pCpf);

    carregarProfessor();
    mostrarDetalhes("", "", "");
}

async function atualizaProfessor() {
    const pID = modalIDProfessor.value;
    const pNome = modalNomeProfessor.value;
    const pCpf = modalCpfProfessor.value;

    const retorno = await window.senacAPI.attProfessor( pNome, pCpf, pID);

    carregarProfessor();
    mostrarDetalhes("", "", "");
}

async function excluirProfessor() {
    const pID = modalIDProfessor.value;

    const retorno = await window.senacAPI.deletarProfessor(pID);

    carregarProfessor();
    mostrarDetalhes("", "", "");
}


async function carregarProfessor() {


    const listaProfessores = await window.senacAPI.buscarProfessores();
    tabelaProfessor.innerHTML = "";

    listaProfessores.forEach(criarLinhaProfessor)

    if (!listaProfessores.length > 0) {

        tabelaProfessor.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaProfessor(professor) {
    //paragrafo.textContent = paragrafo.textContent + professor.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = professor.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaCpf = document.createElement("td");
    celulaCpf.textContent = professor.cpf;
    linha.appendChild(celulaCpf);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(professor.nome, professor.cpf, professor.id) }
    );
    botao.textContent = 'teste';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");

    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);

    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaProfessor.appendChild(linha);

    lucide.createIcons();
}

carregarProfessor()