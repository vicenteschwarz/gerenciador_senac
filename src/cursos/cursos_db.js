const db = require('../db');

async function buscarCursos() {

    const resultado = await db.query('SELECT * FROM cursos order by id')

    return resultado.rows;

}

async function deletarCurso(event,pId){    
    console.log('deletar curso ',pId)
    console.log(event);
    const resultado = await db.query('DELETE FROM cursos WHERE ID = $1',[pId]);
    return resultado.rows;

}

async function atualizarCurso(event,pNome, pDescricao, pId ){
    console.log('att', pId)
    console.log('teste handler', pId, pNome, pDescricao)
    const result = await db.query('UPDATE cursos SET nome=$1, descricao=$2 WHERE ID =$3',[pNome, pDescricao, pId])
    return result.rows
    
}

async function inserirCurso(event, pNome, pDescricao){
    const result = await db.query('INSERT INTO cursos(nome, descricao) VALUES($1, $2)',[pNome, pDescricao])
    return result.rows
}



module.exports = {
    buscarCursos,
    inserirCurso,
    deletarCurso,
    atualizarCurso
}