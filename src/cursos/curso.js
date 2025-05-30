const tabelaCurso = document.getElementById('cursoTableDados');
const modalNomeCurso = document.getElementById('curso-nome');
const modalDescricaoCruso = document.getElementById('curso-descricao');
const modalIDCurso = document.getElementById('curso-id');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoIncluir = document.getElementById('btn-incluir')

botaoSalvar.addEventListener("click", insereOuAtualizaCurso);
botaoExcluir.addEventListener("click", excluirCurso);
botaoIncluir.addEventListener("click", incluirCurso)

function incluirCurso() {
    mostrarDetalhes("", "", "")
}

function mostrarDetalhes(nome, descricao, id) {
    modalIDCurso.value = id;
    modalDescricaoCruso.value = descricao;
    modalNomeCurso.value = nome;
}

async function insereOuAtualizaCurso() {
    const pID = modalIDCurso.value;
    const pNome = modalNomeCurso.value;
    const pDescricao = modalDescricaoCruso.value;
    if(!pNome || !pDescricao){
        alert('Erro ao tentar inserir/atualizar o curso. Preencha o nome e a descrição corretamente por favor.')
        return
    }
    if (pID === "") {
        console.log("vou inserir o curso ", pNome);
        await insereCurso(pNome, pDescricao);
        return
    } else {
        console.log("vou atualizar o id ", pID);
        await atualizaCurso(pNome, pDescricao, pID);
    }

    carregarCursos();
    mostrarDetalhes("", "", "");
}

async function insereCurso() {

    const pNome = modalNomeCurso.value;
    const pDescricao = modalDescricaoCruso.value;

    console.log("vou inserir o curso ", pNome);

    const retorno = await window.senacAPI.inserirCurso(pNome, pDescricao)
    carregarCursos();
    mostrarDetalhes("", "", "");
}

async function atualizaCurso() {
    const pID = modalIDCurso.value
    const pNome = modalNomeCurso.value
    const pDescricao = modalDescricaoCruso.value;

    console.log("vou atualizar o id ", pID);

    const retorno = await window.senacAPI.atualizarCurso(pNome, pDescricao, pID)

    carregarCursos();
    mostrarDetalhes("", "", "");
}

async function excluirCurso() {
    const pID = modalIDCurso.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.deletarCurso(pID);

    
    carregarCursos();
    mostrarDetalhes("", "", "");
}


async function carregarCursos() {


    const listaCursos = await window.senacAPI.buscarCursos();
    tabelaCurso.innerHTML = "";

    console.log(listaCursos)
    listaCursos.forEach(criarLinhaCurso)

    if (!listaCursos.length > 0) {

        tabelaCurso.textContent = "sem dados"
    }

    lucide.createIcons(); // renderiza os ícones do Lucide

}

function criarLinhaCurso(curso) {
    //paragrafo.textContent = paragrafo.textContent + aluno.nome

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = curso.nome;
    linha.appendChild(celulanome);

    //matricula
    const celulaDescricao = document.createElement("td");
    celulaDescricao.textContent = curso.descricao;
    linha.appendChild(celulaDescricao);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(curso.nome, curso.descricao, curso.id) }
    );
    botao.textContent = 'teste';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");

    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);

    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaCurso.appendChild(linha);

    lucide.createIcons();
}




carregarCursos()