const db = require('../db');

async function buscarMaterias() {
    const resultado = await db.query('SELECT * FROM cadeiras ORDER BY id');
    return resultado.rows;
}

async function deletarMateria(event, pId) {
    const resultado = await db.query('DELETE FROM cadeiras WHERE id = $1', [pId]);
    return resultado.rows;
}

async function atualizarMateria(event, pNome, pDescricao, pIdCurso, pId) {
    console.log('vou att db')

    const resultado = await db.query(
        'UPDATE public.cadeiras SET nome = $1, descricao = $2, curso = $3 WHERE id = $4', [pNome, pDescricao, pIdCurso, pId]
    );
    return resultado.rows;
}

async function inserirMateria(event, pNome, pDescricao, pIdCurso) {
    const resultado = await db.query(
        'INSERT INTO public.cadeiras(nome, descricao, curso) VALUES ($1, $2, $3)', [pNome, pDescricao, pIdCurso]
    );
    return resultado.rows;
}

module.exports = {
    buscarMaterias,
    deletarMateria,
    atualizarMateria,
    inserirMateria
};
