INSERT INTO turma (nome, ano_letivo) VALUES
('Engenharia de Software A', 2025),
('Engenharia de Software B', 2025);

INSERT INTO aluno (nome, email, cpf, data_nascimento, turma_id) VALUES
('Ana Silva', 'ana.silva@email.com', '123.456.789-00', '2005-03-15', 1),
('Carla Souza', 'carla.souza@email.com', '456.789.123-00', '2005-01-05', 1),
('Francisco Costa', 'francisco.costa@email.com', '987.654.321-00', '2004-07-22', 1),
('Diego Alves', 'diego.alves@email.com', '321.654.987-00', '2003-11-30', 1),
('Elisa Ramos', 'elisa.ramos@email.com', '789.123.456-00', '2004-05-10', 1),
('Felipe Lima', 'felipe.lima@email.com', '654.987.321-00', '2005-08-18', 2),
('Hugo Fernandes', 'hugo.fernandes@email.com', '357.951.456-00', '2004-12-12', 2),
('Isabela Rocha', 'isabela.rocha@email.com', '951.357.852-00', '2005-04-08', 2);

INSERT INTO professor (nome, cpf, email, disciplina, turma_id) VALUES
('Luiz Camargo', '123.456.789-00', 'luiz@email.com', 'Programação Web', 1),
('Diego Sauter', '987.654.321-00', 'diego@email.com', 'Qualidade de Software', 1),
('Janaina Fontana', '456.789.123-00', 'janaina@email.com', 'Projeto e Arquitetura', 1),
('Claudinei Dias', '321.654.987-00', 'claudinei@email.com', 'Segurança da Informação', 1);

SELECT * FROM turma;
SELECT * FROM aluno;
SELECT * FROM professor;