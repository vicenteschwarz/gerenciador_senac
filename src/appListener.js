const { ipcMain } = require('electron')
const {
    buscarAlunos,
    deletarAluno,
    atualizarAluno,
    inserirAluno } = require('./aluno/aluno_db')

const {
    buscarProfessores,
    deletarProfessor,
    attProfessor,
    inserirProfessor } = require('./professor/professor_db')

const {
    buscarCursos,
    deletarCurso,
    atualizarCurso,
    inserirCurso} = require('./cursos/cursos_db')

const {
    modalAbrirCurso,
    modalAbrirProfessor,
    modalAbrirAluno } = require('./janelaModal')

function registrarProfessorHandler() {
    ipcMain.handle('buscar-professores', buscarProfessores)
    ipcMain.handle('deletar-professor', deletarProfessor)
    ipcMain.handle('att-professor', attProfessor)
    ipcMain.handle('inserir-professor', inserirProfessor)
}

function registrarAlunoHandler() {
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAluno);
    ipcMain.handle('att-alunos', atualizarAluno);
    ipcMain.handle('insert-alunos', inserirAluno)
}

function registrarCursoHandler(){
    ipcMain.handle('buscar-cursos', buscarCursos)
    ipcMain.handle('deletar-curso', deletarCurso)
    ipcMain.handle('att-curso', atualizarCurso)
    ipcMain.handle('insert-curso', inserirCurso)

}

function registrarJanelas() {
    ipcMain.on('window-alunos', modalAbrirAluno)
    ipcMain.on('window-professores', modalAbrirProfessor,)
    ipcMain.on('window-cursos', modalAbrirCurso)
}

function registrarListeners() {
        registrarAlunoHandler(),
        registrarProfessorHandler(),
        registrarCursoHandler(),
        registrarJanelas()
}

module.exports = {
    registrarListeners
}