const tabelaMateria = document.getElementById('materiasTableDados');
const modalNomeMateria = document.getElementById('materia-nome');
const modalDescricaoMateria = document.getElementById('materia-descricao');
const modalIDMateria = document.getElementById('materia-id');
const modalIdCurso = document.getElementById('cursos-id')
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoIncluir = document.getElementById('btn-incluir')

botaoSalvar.addEventListener("click", insereOuAtualizaMateria);
botaoExcluir.addEventListener("click", excluirMateria);
botaoIncluir.addEventListener("click", incluirMateria)

function incluirMateria() {
    mostrarDetalhes("", "", "", "")
}

function mostrarDetalhes(nome, descricao, id, id_curso) {
    modalIDMateria.value = id;
    modalDescricaoMateria.value = descricao;
    modalNomeMateria.value = nome;
    modalIdCurso.value = id_curso
}

async function insereOuAtualizaMateria() {
    const pID = modalIDMateria.value;
    const pNome = modalNomeMateria.value;
    const pDescricao = modalDescricaoMateria.value;
    const pIdCurso = modalIdCurso.value;

    console.log(pIdCurso)

    if (!pNome || !pDescricao || !pIdCurso) {
        alert("Por favor, preencha nome, descrição e id de curso.");
        return;
    }

    if (pID === "") {
        await insereMateria(pNome, pDescricao, pIdCurso);
    } else {
        await atualizaMateria(pNome, pDescricao, pIdCurso, pID);
    }

    carregarMaterias();
    mostrarDetalhes("", "", "", "");
}

async function insereMateria(pNome, pDescricao, pIdCurso) {
    console.log("vou inserir a matéria ", pNome, " com curso ", pIdCurso);

    const retorno = await window.senacAPI.inserirMaterias(pNome, pDescricao, pIdCurso);

    carregarMaterias();
    mostrarDetalhes("", "", "", "");
}

async function atualizaMateria(pNome, pDescricao, pId, pIdCurso) {
    console.log("vou atualizar o id ", pId, " com curso ", pIdCurso);

    const retorno = await window.senacAPI.atualizarMaterias(pNome, pDescricao, pId, pIdCurso);

    carregarMaterias();
    mostrarDetalhes("", "", "", "");
}

async function excluirMateria() {
    const pID = modalIDMateria.value;
    console.log("vou deletar o id ", pID);

    const retorno = await window.senacAPI.excluirMaterias(pID);


    carregarMaterias();
    mostrarDetalhes("", "", "", "");
}


async function carregarMaterias() {


    const listaMaterias = await window.senacAPI.buscarMaterias();
    tabelaMateria.innerHTML = "";

    console.log(listaMaterias)
    listaMaterias.forEach(criarLinhaMateria)

    if (!listaMaterias.length > 0) {

        tabelaMateria.textContent = "sem dados"
    }
    //carregarSelect()
    lucide.createIcons(); // renderiza os ícones do Lucide

}
/*
function optionSelect(id_cursos) {
    //select

    console.log('id dos cursos', id_cursos)

    const calcularOption = document.createElement('option')
    calcularOption.value = id_cursos.id_curso
    calcularOption.value = id_cursos.id
    calcularOption.textContent = id_cursos.descricao
    calcularOption.textContent = id_cursos.nome
    //ouvinte de click
    calcularOption.addEventListener('change', function () {
        mostrarDetalhes(id_cursos.id_curso);
    });


    modalIdCurso.appendChild(calcularOption)
}

async function carregarSelect() {
    const listaCursos = await window.senacAPI.buscarCursos();

    //console.log(listaCursos)

    listaCursos.forEach(optionSelect)
    if (!listaCursos.length > 0) {

        modalIdCurso.textContent = "sem dados"
    }
}
*/

//--

const tagselect = document.getElementById("campoDrop");

async function carregarTabela() {
const listaCursos = await window.senacAPI.buscarCursos();
listaCursos.forEach(mostrarDetalhes)
}

function mostrarDetalhes(linha) {
    const option = document.createElement("option");
    option.value = linha.id
    option.textContent = linha.nome
    tagselect.appendChild(option);
}

function criarLinhaMateria(materia) {

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulanome = document.createElement("td");
    celulanome.textContent = materia.nome;
    linha.appendChild(celulanome);

    //descricao
    const celulaDescricao = document.createElement("td");
    celulaDescricao.textContent = materia.descricao;
    linha.appendChild(celulaDescricao);

    const celulaIdCurso = document.createElement("td");
    celulaIdCurso.textContent = materia.id_curso;
    linha.appendChild(celulaIdCurso);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(materia.nome, materia.descricao, materia.id, materia.id_curso) }
    );
    botao.textContent = 'teste';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");

    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);

    //final adiciono a linha criada com descricao,nome e botao à tabela
    tabelaMateria.appendChild(linha);

    lucide.createIcons();
}

carregarMaterias()



