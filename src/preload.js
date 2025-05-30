const { contextBridge, ipcRenderer } = require('electron')
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
        inserirCurso: inserirCurso
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

contextBridge.exposeInMainWorld('windowAPI',
    {
        windowAluno:windowAluno ,
        windowProfessor:windowProfessor,
        windowCurso:windowCurso
    }
)