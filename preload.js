const { contextBridge, ipcRenderer } = require('electron');
//alunos
function buscarAlunos() {
    return ipcRenderer.invoke('buscar-alunos');
}

function excluirAlunos(pID){
    return ipcRenderer.invoke('deletar-alunos',pID);
}

function atualizarAluno(pNome, pMatricula, pID){
    console.log('teste atualizar aluno preload')
    return ipcRenderer.invoke('att-alunos', pNome, pMatricula, pID)
}

function inserirAluno(pNome, pMatricula){
    return ipcRenderer.invoke('insert-alunos', pNome, pMatricula)
}

//profes

function buscarProfessores(){
    return ipcRenderer.invoke('buscar-professores')
}

function deletarProfessor( pID){
    return ipcRenderer.invoke('deletar-professor', pID);
}

function attProfessor( pNome, pCpf, pID){
    return ipcRenderer.invoke('att-professor', pNome, pCpf, pID)
}

function inserirProfessor(pNome, pCpf) {
    return ipcRenderer.invoke('inserir-professor', pNome, pCpf)
}

//cursos

function buscarCursos(){
    return ipcRenderer.invoke('buscar-cursos')
}

function deletarCurso(pID){
    return ipcRenderer.invoke('deletar-curso', pID)
}

function atualizarCurso(pNome, pCpf, pID){
    return ipcRenderer.invoke('att-curso',pNome, pCpf, pID)
}

function inserirCurso(pNome, pCpf){
    return ipcRenderer.invoke('insert-curso', pNome, pCpf)
}

//materias/cadeiras

function buscarMaterias() {
    return ipcRenderer.invoke('buscar-materias');
}

function excluirMaterias(pID) {
    return ipcRenderer.invoke('deletar-materias', pID);
}

function atualizarMaterias(pNome, pDescricao, pIdCurso, pId) {
    return ipcRenderer.invoke('atualizar-materias', pNome, pDescricao, pIdCurso, pId);
}

function inserirMaterias(pNome, pDescricao, pIdCurso) {
    return ipcRenderer.invoke('inserir-materias', pNome, pDescricao, pIdCurso);
}

//notas
function buscarNotas() {
    return ipcRenderer.invoke('buscar-notas')
}

function excluirNota(event, id){
    return ipcRenderer.invoke('excluir-nota', id)
}

function atualizarNota(event, alunoId, cursoId, materiaId, professorId, avaliacaoNota, notaId){
    return ipcRenderer.invoke('att-nota', alunoId, cursoId, materiaId, professorId, avaliacaoNota, notaId)
}

function inserirNota(event, alunoId, cursoId, materiaId, professorId, avaliacaoNota){
    return ipcRenderer.invoke('inserir-nota', alunoId, cursoId, materiaId, professorId, avaliacaoNota)
}


contextBridge.exposeInMainWorld('senacAPI',

    {
        buscarAlunos: buscarAlunos,
        excluirAlunos: excluirAlunos,
        atualizarAluno: atualizarAluno,
        inserirAluno: inserirAluno,

        buscarProfessores:buscarProfessores,
        deletarProfessor:deletarProfessor,
        attProfessor:attProfessor,
        inserirProfessor:inserirProfessor,

        buscarCursos: buscarCursos,
        deletarCurso: deletarCurso,
        atualizarCurso: atualizarCurso,
        inserirCurso: inserirCurso,

        buscarMaterias: buscarMaterias,
        excluirMaterias: excluirMaterias,
        atualizarMaterias: atualizarMaterias,
        inserirMaterias: inserirMaterias,

        buscarNotas:buscarNotas,
        excluirNota:excluirNota,
        atualizarNota:atualizarNota,
        inserirNota: inserirNota
    }
)

function windowAluno(){
    ipcRenderer.send('window-alunos')
}

function windowProfessor(){
    ipcRenderer.send('window-professores')
}

function windowCurso(){
    ipcRenderer.send('window-cursos')
}

function abrirMateria() {
    ipcRenderer.send('abrir-materia')
}

function abrirNota(){
    ipcRenderer.send('abrir-nota')
}

contextBridge.exposeInMainWorld('windowAPI',
    {
        windowAluno:windowAluno ,
        windowProfessor:windowProfessor,
        windowCurso:windowCurso,
        abrirMateria:abrirMateria,
        abrirNota:abrirNota
    }
)