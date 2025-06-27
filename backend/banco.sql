INSERT INTO turma (nome, ano_letivo) VALUES
('Engenharia de Software A', 2025),
('Engenharia de Software B', 2025);

INSERT INTO aluno (nome, email, cpf, data_nascimento, turma_id) VALUES
('Ana Silva', 'ana.silva@email.com', '12345678900', '2005-03-15', 1),
('Carla Souza', 'carla.souza@email.com', '45678912300', '2005-01-05', 1),
('Francisco Costa', 'francisco.costa@email.com', '98765432100', '2004-07-22', 1),
('Diego Alves', 'diego.alves@email.com', '32165498700', '2003-11-30', 1),
('Elisa Ramos', 'elisa.ramos@email.com', '78912345600', '2004-05-10', 1),
('Felipe Lima', 'felipe.lima@email.com', '65498732100', '2005-08-18', 2),
('Hugo Fernandes', 'hugo.fernandes@email.com', '35795145600', '2004-12-12', 2),
('Isabela Rocha', 'isabela.rocha@email.com', '95135785200', '2005-04-08', 2);

INSERT INTO professor (nome, cpf, email, disciplina, turma_id) VALUES
('Luiz Camargo', '123.456.789-00', 'luiz@email.com', 'Programação Web', 1),
('Diego Sauter', '987.654.321-00', 'diego@email.com', 'Qualidade de Software', 1),
('Janaina Fontana', '456.789.123-00', 'janaina@email.com', 'Projeto e Arquitetura', 1),
('Claudinei Dias', '321.654.987-00', 'claudinei@email.com', 'Segurança da Informação', 1);

SELECT * FROM turma;
SELECT * FROM aluno;
SELECT * FROM professor;