const mysql = require('mysql'); // Importa a biblioteca MySQL
const bcrypt = require('bcrypt'); // Importa a biblioteca bcrypt para criptografia de senhas

// Função para conectar ao banco de dados MySQL
const connect = () => {
  console.log("Waiting MysqlDb connection ('-n-)...!");
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'padariabrunchbd'
  });
  connection.connect(); // Estabelece a conexão
  console.log("MysqlDb connected ('u')!");
  return connection; // Retorna o objeto de conexão
};






// Função para obter todos os usuários do banco de dados
const getColaboradores = async (callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let sql = 'select id, name, email from colaborador'; // Consulta SQL para obter os usuários
  await connection.query(sql, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let colaboradors = results; // Armazena os resultados da consulta em uma variável
    callback(colaboradors);
  });
  connection.end();
};

// Função para obter um usuário específico pelo seu id
const getColaboradoresById = async (colaboradorId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let id = colaboradorId; // Armazena o id do usuário

  if (!id) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'select name, email from colaborador where id =?'; // Consulta SQL para obter o usuário pelo id

  connection.query(sql, colaboradorId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let colaborador = results; // Armazena os resultados da consulta em uma variável
    return callback(colaborador);
  });
};

// Função para adicionar um novo usuário ao banco de dados
const addColaborador = async (colaborador, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let { name, email, telefone, cpf, password } = colaborador; // Desestrutura o objeto colaborador para obter os dados do usuário

  if (!name || !email || !telefone || !cpf || !password) { // Verifica se todos os campos obrigatórios foram preenchidos
    return callback({ error: 'Insira os dados corretamente' }); // Retorna um erro caso algum campo esteja faltando
  }

  colaborador.password = await bcrypt.hash(colaborador.password, 10); // Criptografa a senha do usuário

  let sql = 'insert into colaborador set ?'; // Consulta SQL para inserir um novo usuário

  connection.query(sql, colaborador, (error, results, fields) => { // Executa a consulta
    if (error) {
      callback({ error: 'Erro ao cadastrar o usuário' }); // Chama a função de callback com um erro caso ocorra algum problema na inserção
      return; // Finaliza a execução da função
    }

    callback({ message: 'Usuário cadastrado com sucesso' });

    connection.end();
  });
};

const loginCompare = (colaborador, callback)=>{
    let connection = connect();

    let {name, password} = colaborador

    if(!name || !password){
        return callback({error:"Insert the correct fields"})
    }

    let sql = 'select name, password from colaborador where name = ?'

    connection.query(sql,name,(error, results, fields)=>{
        if (error) throw error;


        if(results.length == 0){
            return callback({error:'Wrong colaborador or password'})
        }

        var colaborador = results[0];

        const passwordIsValid = bcrypt.compareSync(password, colaborador.password)

        if(name == colaborador.name && passwordIsValid){
            return callback({message:'Logged'})
        }

        return callback({error:"Wrong colaborador or password"})
    })

    connection.end();
};





// Função para obter todos os produto do banco de dados
const getproduto = async (callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let sql = 'select id,name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, isDeleted from produto'; // Consulta SQL para obter os produto
  await connection.query(sql, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let produto = results; // Armazena os resultados da consulta em uma variável
    callback(produto);
  });
  connection.end();
};

// Função para obter um produto específico pelo seu id
const getprodutoById = async (produtoId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let id = produtoId; // Armazena o id do produto

  if (!id) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'select name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, isDeleted from produto where id =?'; // Consulta SQL para obter o produto pelo id

  connection.query(sql, produtoId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let produto = results; // Armazena os resultados da consulta em uma variável
    return callback(produto);
  });
};

const getprodutoByCatId = async (categoriaId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let catId = categoriaId; // Armazena o id da categoria

  if (!catId) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'select id, name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, isDeleted from produto where categorias_id =?'; // Consulta SQL para obter o produto pelo id

  connection.query(sql, categoriaId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let produto = results; // Armazena os resultados da consulta em uma variável
    return callback(produto);
  });
};

// Função para adicionar um novo produto ao banco de dados
const addProduto = async (produto, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let { name, descri, valor, disp, categorias_id } = produto; // Desestrutura o objeto produto para obter os dados do produto

  if (!name || !descri || !valor || !disp || !categorias_id) { // Verifica se todos os campos obrigatórios foram preenchidos
    return callback({ error: 'Insira os dados corretamente' }); // Retorna um erro caso algum campo esteja faltando
  }


  let sql = 'insert into produto set ?'; // Consulta SQL para inserir um novo produto

  connection.query(sql, produto, (error, results, fields) => { // Executa a consulta
    if (error) {
      callback({ error: 'Erro ao cadastrar o produto' }); // Chama a função de callback com um erro caso ocorra algum problema na inserção
      return; // Finaliza a execução da função
    }

    callback({ message: 'produto cadastrado com sucesso' });

    connection.end();
  });
};





// Função para obter todos os categoria do banco de dados
const getCategoria = async (callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let sql = 'select id, nome from categorias'; // Consulta SQL para obter os categoria
  await connection.query(sql, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let categoria = results; // Armazena os resultados da consulta em uma variável
    callback(categoria);
  });
  connection.end();
};

// Função para obter um categoria específico pelo seu id
const getCategoriaById = async (categoriaId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let id = categoriaId; // Armazena o id do categoria

  if (!id) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'select nome from categorias where id =?'; // Consulta SQL para obter o categoria pelo id

  connection.query(sql, categoriaId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let categoria = results; // Armazena os resultados da consulta em uma variável
    return callback(categoria);
  });
};

// Função para adicionar um novo categoria ao banco de dados
const addCategoria = async (categoria, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let {name} = categoria; // Desestrutura o objeto categoria para obter os dados do categoria

  if (!name) { // Verifica se todos os campos obrigatórios foram preenchidos
    return callback({ error: 'Insira os dados corretamente' }); // Retorna um erro caso algum campo esteja faltando
  }


  let sql = 'insert into categorias set ?'; // Consulta SQL para inserir um novo categoria

  connection.query(sql, categoria, (error, results, fields) => { // Executa a consulta
    if (error) {
      callback({ error: 'Erro ao cadastrar o categoria' }); // Chama a função de callback com um erro caso ocorra algum problema na inserção
      return; // Finaliza a execução da função
    }

    callback({ message: 'categoria cadastrado com sucesso' });

    connection.end();
  });
};





// Função para obter todos os encomenda do banco de dados
const getEncomenda = async (callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let sql = 'SELECT encomendas.id AS encomenda_id, encomendas.nome_cliente, encomendas.endereco, encomendas.dh_encomendado, encomendas.dh_entrega, encomendas.valor_total, prodenc.id AS prodenc_id, prodenc.encomenda_id, prodenc.produto_id, prodenc.quant, prodenc.peso, produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent FROM encomendas LEFT JOIN prodenc ON encomendas.id = prodenc.encomenda_id LEFT JOIN produto ON prodenc.produto_id = produto.id;'; // Consulta SQL para obter as encomendas
  await connection.query(sql, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let encomenda = results; // Armazena os resultados da consulta em uma variável
    callback(encomenda);
  });
  connection.end();
};

// Função para obter um encomenda específico pelo seu id
const getEncomendaById = async (encomendaId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let id = encomendaId; // Armazena o id do encomenda

  if (!id) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'SELECT encomendas.id AS encomenda_id, encomendas.nome_cliente, encomendas.endereco, encomendas.dh_encomendado, encomendas.dh_entrega, encomendas.valor_total, prodenc.id AS prodenc_id, prodenc.encomenda_id, prodenc.produto_id, prodenc.quant, prodenc.peso, produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent FROM encomendas LEFT JOIN prodenc ON encomendas.id = prodenc.encomenda_id LEFT JOIN produto ON prodenc.produto_id = produto.id where encomendas.id =?'; // Consulta SQL para obter o encomenda pelo id

  connection.query(sql, encomendaId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let encomenda = results; // Armazena os resultados da consulta em uma variável
    return callback(encomenda);
  });
};

const addEncomenda = async (encomenda, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let { nome_cliente, endereco, dh_encomendado, dh_entrega, valor_total, produto_id, quant, peso } = encomenda; // Desestrutura o objeto encomenda para obter os dados do encomenda

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!nome_cliente || !endereco || !dh_encomendado || !dh_entrega || !valor_total || !produto_id || (!quant && !peso)) { 
    return callback({ error: 'Insira os dados corretamente' }); 
  }

  connection.beginTransaction((err) => {
    if (err) {
      return callback({ error: 'Erro ao iniciar transação' });
    }

    // Primeiro INSERT na tabela encomendas
    let sqlEncomenda = 'INSERT INTO encomendas SET ?';
    let encomendaData = { nome_cliente, endereco, dh_encomendado, dh_entrega, valor_total }; // Dados para tabela encomenda

    connection.query(sqlEncomenda, encomendaData, (error, results) => {
      if (error) {
        return connection.rollback(() => {
          callback({ error: 'Erro ao inserir na tabela encomendas' });
        });
      }

      let encomendaId = results.insertId; // Obtém o ID gerado para a encomenda

      // Segundo INSERT na tabela prodenc
      let sqlProdEnc = 'INSERT INTO prodenc SET ?';
      let prodEncData = {
        produto_id, // ID do produto
        encomenda_id: encomendaId, // ID gerado para a encomenda
        quant,
        peso
      };

      connection.query(sqlProdEnc, prodEncData, (error) => {
        if (error) {
          return connection.rollback(() => {
            callback({ error: 'Erro ao inserir na tabela prodenc' });
          });
        }

        // Confirma a transação
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              callback({ error: 'Erro ao confirmar transação' });
            });
          }

          callback({ message: 'Dados inseridos com sucesso em encomendas e prodenc' });
          connection.end(); // Fecha a conexão após sucesso
        });
      });
    });
  });
};





// Função para obter todos os pedido do banco de dados
const getPedido = async (callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let sql = 'SELECT pedidos.id AS pedido_id, pedidos.nome_cliente, pedidos.mesa_cliente, pedidos.date_hour, pedidos.valor_total, prodped.id AS prodped_id, prodped.pedidos_id, prodped.produto_id, prodped.quant, produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent FROM pedidos LEFT JOIN prodped ON pedidos.id = prodped.pedidos_id LEFT JOIN produto ON prodped.produto_id = produto.id;'; // Consulta SQL para obter os pedido
  await connection.query(sql, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let pedido = results; // Armazena os resultados da consulta em uma variável
    callback(pedido);
  });
  connection.end();
};

// Função para obter um pedido específico pelo seu id
const getPedidoById = async (pedidoId, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let date_hour, obs, cliente_colaborador_id = pedidoId; // Armazena o id do pedido

  if (!date_hour|| !obs ||!cliente_colaborador_id) { // Verifica se o id é válido
    return callback({ error: 'Insert an valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'SELECT pedidos.id AS pedido_id, pedidos.nome_cliente, pedidos.mesa_cliente, pedidos.date_hour, pedidos.valor_total, prodped.id AS prodped_id, prodped.pedidos_id, prodped.produto_id, prodped.quant, produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent FROM pedidos LEFT JOIN prodped ON pedidos.id = prodped.pedidos_id LEFT JOIN produto ON prodped.produto_id = produto.id where pedidos.id =?'; // Consulta SQL para obter o pedido pelo id

  connection.query(sql, pedidoId, (error, results, fields) => { // Executa a consulta
    if (error) throw error; // Lança um erro caso ocorra algum problema na consulta

    let pedido = results; // Armazena os resultados da consulta em uma variável
    return callback(pedido);
  });
};

// Função para adicionar um novo pedido ao banco de dados
const addPedido = async (pedido, callback) => {
  let connection = connect(); // Cria uma conexão com o banco de dados

  let { nome_cliente, mesa_cliente, date_hour, obs, valor_total, produto_id, quant} = pedido; // Desestrutura o objeto pedido para obter os dados do pedido

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!nome_cliente || !mesa_cliente || !date_hour || !obs || !valor_total || !produto_id || !quant) { 
    return callback({ error: 'Insira os dados corretamente' }); 
  }

  connection.beginTransaction((err) => {
    if (err) {
      return callback({ error: 'Erro ao iniciar transação' });
    }

    // Primeiro INSERT na tabela pedidos
    let sqlPedido = 'INSERT INTO pedidos SET ?';
    let pedidoData = { nome_cliente, mesa_cliente, date_hour, obs, valor_total }; // Dados para tabela pedido

    connection.query(sqlPedido, pedidoData, (error, results) => {
      if (error) {
        return connection.rollback(() => {
          callback({ error: 'Erro ao inserir na tabela pedidos' });
        });
      }

      let pedidoId = results.insertId; // Obtém o ID gerado para a pedido

      // Segundo INSERT na tabela prodped
      let sqlProdPed = 'INSERT INTO prodped SET ?';
      let prodPedData = {
        produto_id, // ID do produto
        pedidos_id: pedidoId, // ID gerado para a pedido
        quant,
      };

      connection.query(sqlProdPed, prodPedData, (error) => {
        if (error) {
          return connection.rollback(() => {
            callback({ error: 'Erro ao inserir na tabela prodped' });
          });
        }

        // Confirma a transação
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              callback({ error: 'Erro ao confirmar transação' });
            });
          }

          callback({ message: 'Dados inseridos com sucesso em pedidos e prodped' });
          connection.end(); // Fecha a conexão após sucesso
        });
      });
    });
  });
};

// Exporta as funções para serem utilizadas em outros módulos
module.exports = {connect, getColaboradores, addColaborador, getColaboradoresById, loginCompare, getproduto, addProduto, getprodutoById, getCategoria, getCategoriaById, addCategoria, getEncomenda, getEncomendaById, addEncomenda, getPedido, getPedidoById, addPedido, getprodutoByCatId};