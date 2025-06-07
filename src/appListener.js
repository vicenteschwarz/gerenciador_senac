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
    modalAbrirAluno,
    modalAbrirMateria,
    modalAbrirNotas } = require('./janelaModal')



const { buscarMaterias,
    deletarMateria,
    atualizarMateria,
    inserirMateria } = require('./cadeira/cadeirasDB')

const { buscarNotas, deletarNota, atualizarNota, inserirNota } = require('./notas/notas_db')

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
    ipcMain.on('window-cursos', modalAbrirCurso),
    ipcMain.on('abrir-materia', modalAbrirMateria),
    ipcMain.on('abrir-nota', modalAbrirNotas)
}

function registrarMateriasHandler() {
    ipcMain.handle('buscar-materias', buscarMaterias);
    ipcMain.handle('deletar-materias', deletarMateria);
    ipcMain.handle('atualizar-materias', atualizarMateria);
    ipcMain.handle('inserir-materias', inserirMateria);
}

function registrarNotasHandler() {
    ipcMain.handle('buscar-notas', buscarNotas);
    ipcMain.handle('excluir-nota', deletarNota);
    ipcMain.handle('att-nota', atualizarNota);
    ipcMain.handle('inserir-nota', inserirNota);
}

function registrarListeners() {
        registrarAlunoHandler(),
        registrarProfessorHandler(),
        registrarCursoHandler(),
        registrarJanelas(),
        registrarMateriasHandler(),
        registrarNotasHandler()
        
}

module.exports = {
    registrarListeners
}