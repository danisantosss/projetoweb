USE gerenciador_escolar;

INSERT INTO turma (nome, ano_letivo) VALUES ('Turma A', 2024);

INSERT INTO aluno (nome, cpf, data_nascimento, turma_id) 
VALUES ('Daniel', '123.456.789-00', '2005-03-15', 1);

INSERT INTO professor (nome, cpf, email, disciplina)
VALUES ('Luiz Camargo', '123.456.789-00', 'camargo@email.com', 'Programação Web');

INSERT INTO turma_professor (turma_id, professor_id)
VALUES (1, 1);