const tabelaNotas = document.getElementById('notasTableDados');
const modalIDANota = document.getElementById('nota-id');
const botaoSalvar = document.getElementById('btn-salvar');
const botaoExcluir = document.getElementById('btn-excluir');
const botaoIncluir = document.getElementById('btn-incluir');

const tagAluno = document.getElementById('alunoDrop')
const tagCurso = document.getElementById('cursoDrop')
const tagCadeira = document.getElementById('cadeiraDrop')
const tagProfessores = document.getElementById('profDrop')
const tagNota = document.getElementById('notaDrop')


botaoSalvar.addEventListener("click", insereOuAtualizaNota);
botaoExcluir.addEventListener("click", excluirNota);
botaoIncluir.addEventListener("click", incluirAluno)

function incluirAluno() {
    mostrarDetalhes("", "", "")
}

async function insereOuAtualizaNota() {
    const alunoId = tagAluno.value;
    const professorId = tagProfessores.value;
    const materiaId = tagCadeira.value;
    const cursoId = tagCurso.value;
    const avaliacaoNota = tagNota.value;
    const notaID = modalIDANota.value;
    console.log(alunoId, professorId, materiaId, cursoId, avaliacaoNota, notaID)

    if (modalIDANota.value === '') {
        await window.senacAPI.inserirNota(alunoId, cursoId, materiaId, professorId, avaliacaoNota);
        incluirAluno()
    } else {
        await window.senacAPI.atualizarNota(alunoId, cursoId, materiaId, professorId, avaliacaoNota, notaId);
        incluirAluno()
    }

    await carregarNotas()
    incluirAluno
}

async function excluirNota() {
     const pID = modalIDANota.value;
    console.log(pID)
    if (pID) {
        await window.senacAPI.excluirNota(pID);
        await carregarNotas();
        limparDados();
    }
}

async function buscarAlunos() {
    const listaAlunos = await window.senacAPI.buscarAlunos();

    tagAluno.innerHTML = ''; // limpa antes

    listaAlunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        tagAluno.appendChild(option);
    });
} 
buscarAlunos()

async function buscarCursos() {
    const listaCursos = await window.senacAPI.buscarCursos();

    tagCurso.innerHTML = ''; // limpa antes

    listaCursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nome;
        tagCurso.appendChild(option);
    });
} 
buscarCursos()

async function buscarProfessores() {
    const listaProfessores = await window.senacAPI.buscarProfessores();

    tagProfessores.innerHTML = ''; // limpa antes

    listaProfessores.forEach(professor => {
        const option = document.createElement('option');
        option.value = professor.id;
        option.textContent = professor.nome;
        tagProfessores.appendChild(option);
    });
} 
buscarProfessores()

async function buscarMaterias() {
    const listaMaterias = await window.senacAPI.buscarMaterias();

    tagCadeira.innerHTML = ''; // limpa antes

    listaMaterias.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.id;
        option.textContent = materia.nome;
        tagCadeira.appendChild(option);
    });
} buscarMaterias();

function mostrarDetalhes(id, idAluno, idCurso, idCadeira, idProfessores, idNota) {
    tagAluno.value = idAluno
    tagCurso.value = idCurso
    tagCadeira.value = idCadeira
    tagProfessores.value = idProfessores
    tagNota.value = idNota
    modalIDANota.value = id
}


async function carregarNotas() {


    const listaNotas = await window.senacAPI.buscarNotas();
    tabelaNotas.innerHTML = "";

    if (!listaNotas || listaNotas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");
        celula.textContent = "Sem dados";
        linha.appendChild(celula);
        tabelaNotas.appendChild(linha);
        return;
    }

    listaNotas.forEach(criarLinhaAluno);
    lucide.createIcons();


}

function criarLinhaNotas(nota) {

    //linha 
    const linha = document.createElement("tr");

    //nome
    const celulaNome = document.createElement("td");
    celulaNome.textContent = nota.aluno_nome
    linha.appendChild(celulaNome);

    //curso
    const celulaCurso = document.createElement("td");
    celulaCurso.textContent = nota.curso_nome;
    linha.appendChild(celulaCurso);

    //materia
    const celulaMateria = document.createElement("td");
    celulaMateria.textContent = nota.cadeira_nome
    linha.appendChild(celulaMateria);

    //professor
    const celulaProfessor = document.createElement("td");
    celulaProfessor.textContent = nota.professores_nome;
    linha.appendChild(celulaProfessor);

    //Nota
    const celulaNota = document.createElement("td");
    celulaNota.textContent = nota.nota;
    linha.appendChild(celulaNota);

    //botao de modificar
    const celulaBotao = document.createElement("td");
    const botao = document.createElement("button");
    botao.addEventListener("click",
        function () { mostrarDetalhes(idAluno, idCurso, idCadeira, idProfessores, idNota) }
    );
    botao.textContent = 'teste';

    const icone = document.createElement("i")
    icone.setAttribute("data-lucide", "edit");

    botao.appendChild(icone);

    celulaBotao.appendChild(botao);


    linha.appendChild(celulaBotao);

    //final adiciono a linha criada com matricula,nome e botao à tabela
    tabelaNotas.appendChild(linha);

    lucide.createIcons();
}

carregarNotas()