const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

function createWindow_modal(telaPai, arqHtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,

        modal: true,
        parent: telaPai,


        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arqHtml);

    return janela;
}

function modalAbrirProfessor(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        createWindow_modal(mainWindow, "./src/professor/professor.html")
    } else {
        alert("Não foi possível abrir o modal: Janela principal ta paia")
    }
}

function modalAbrirAluno(event) {
    let mainWindow = getJanelaPrincipal()
    if (mainWindow) {
        createWindow_modal(mainWindow, "./src/aluno/aluno.html")
    } else {
        alert("Não foi possível abrir o modal: Janela principal ta paia")
    }
}

function modalAbrirCurso(event){
    let mainWindow = getJanelaPrincipal()
    if(mainWindow){
        createWindow_modal(mainWindow, './src/cursos/cursos.html')
    } else {
        alert("Não foi possível abrir o modal: Janela principal ta paia")
    }
}

module.exports = {
    createWindow_modal,
    modalAbrirProfessor,
    modalAbrirAluno,
    modalAbrirCurso
}