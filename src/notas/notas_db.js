const db = require('../db');

async function buscarNotas() {
    const resultado = await db.query(
        `SELECT alunos.id, 
        alunos.nome as aluno_nome, 
        cursos.id, 
        cursos.nome as curso_nome,
        cadeiras.id,
        cadeiras.nome as cadeira_nome,
        professores.id,
        professores.nome as professores_nome,
        avaliacao as nota FROM NOTAS
        JOIN professores ON notas.id_professor = professores.id
        JOIN alunos ON notas.id_aluno = alunos.id
        JOIN cursos ON notas.curso = cursos.id
        JOIN cadeiras ON notas.id_materia = cadeiras.id`);
    return resultado.rows;
}

function atualizarNota(event, alunoId, cursoId, materiaId, professorId, avaliacaoNota, notaId) {
    const resultado = db.query(`
        UPDATE public.notas
	SET id_aluno=$1, id_curso=$2, id_materia=$3, id_professor=$4, avaliacao=$5
	WHERE id = $6`, [alunoId, cursoId, materiaId, professorId, avaliacaoNota, notaId]);
    return resultado.rows
}

function deletarNota(event, id) {
    const resultado = db.query(`
        DELETE FROM notas
        WHERE id = $1`, [id]);
    return resultado.rows
}

function inserirNota(event, alunoId, cursoId, materiaId, professorId, avaliacaoNota) {
    const resultado = db.query(`
        INSERT INTO notas (id_aluno, id_curso, id_materia, id_professor, avaliacao)
        VALUES ($1, $2, $3, $4, $5)`, [alunoId, cursoId, materiaId, professorId, avaliacaoNota]);
    return resultado.rows
}


module.exports = {
    buscarNotas,
    deletarNota,
    atualizarNota,
    inserirNota
};

