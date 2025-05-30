const db = require('../db');

async function buscarAlunos() {

    const resultado = await db.query('SELECT * FROM alunos order by id')

    return resultado.rows;

}

async function deletarAluno(event,pId){    
    console.log('deletar ',pId)
    console.log(event);
    const resultado = await db.query('DELETE FROM alunos WHERE ID = $1',[pId]);
    return resultado.rows;

}

async function atualizarAluno(event,pNome, pMatricula, pId ){
    console.log('att', pId)
    console.log('teste handler', pId, pNome, pMatricula)
    const result = await db.query('UPDATE alunos SET nome=$1, matricula=$2 WHERE ID =$3',[pNome, pMatricula, pId])
    return result.rows
    
}

async function inserirAluno(event, pNome, pMatricula){
    const result = await db.query('INSERT INTO alunos(nome, matricula) VALUES($1, $2)',[pNome, pMatricula])
    return result.rows
}
//criar duas funções e tacar para aluno.js



module.exports = {
    buscarAlunos,
    deletarAluno,
    atualizarAluno,
    inserirAluno
}