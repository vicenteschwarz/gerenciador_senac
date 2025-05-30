const db = require('../db')

async function buscarProfessores() {
    const result = await db.query('SELECT * from professores order by ID')
    return result.rows
}

async function deletarProfessor(event, pId) {
    const result = await db.query('DELETE from professores WHERE ID=$1', [pId])
    return result.rows
}

async function attProfessor(event, pNome, pCpf, pId) {
    console.log(pNome, pCpf, pId)
    const result = await db.query('UPDATE public.professores SET nome=$1, cpf=$2 WHERE ID=$3', [pNome, pCpf, pId])
    console.log(pNome, pCpf, pId)
    return result.rows
}

async function inserirProfessor(event, pNome, pCpf) {
    const result = await db.query('INSERT INTO professores(nome, cpf) VALUES($1, $2)', [pNome, pCpf])
    return result.rows
}



module.exports = {
    buscarProfessores,
    deletarProfessor,
    attProfessor,
    inserirProfessor
}