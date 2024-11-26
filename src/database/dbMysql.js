const mysql = require('mysql2'); // Importa a biblioteca MySQL
const bcrypt = require('bcrypt'); // Importa a biblioteca bcrypt para criptografia de senhas

// Função para conectar ao banco de dados MySQL
const connect = async () => {
  console.log("Waiting MysqlDb connection ('-n-)...!");
  const connection = await mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    port: '29740',
    user: 'root',
    password: 'SHeEaEyQWpdaIhzSkYGXQidmLGIFSMWx',
    database: 'railway'
  }).promise();  // Garantindo que você está utilizando o promise() aqui
  console.log("MysqlDb connected ('u')!");
  return connection; // Retorna a conexão com Promises
};






// Função para obter todos os colaboradores do banco de dados
const getColaboradores = async (callback) => {
  let connection = null;
  try {
    connection = await connect(); // Cria a conexão com o banco de dados
    let sql = 'SELECT id, name, email FROM colaborador'; // Consulta SQL

    const [results] = await connection.query(sql); // Executa a consulta
    callback(results); // Passa os resultados para o callback
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao obter colaboradores' });
  } finally {
    if (connection) {
      connection.end(); // Fecha a conexão
    }
  }
};


// Função para obter um colaborador específico pelo seu id
const getColaboradoresById = async (colaboradorId, callback) => {
  let connection = null;
  try {
    connection = await connect(); // Cria a conexão com o banco de dados
    let sql = 'SELECT name, email FROM colaborador WHERE id = ?'; // Consulta SQL

    const [results] = await connection.query(sql, [colaboradorId]); // Executa a consulta com o id
    callback(results); // Passa os resultados para o callback
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao obter o colaborador' });
  } finally {
    if (connection) {
      connection.end(); // Fecha a conexão após finalizar
    }
  }
};

// Função para adicionar um novo colaborador ao banco de dados
const addColaborador = async (colaborador, callback) => {
  let connection = null;  // Inicializa a variável para a conexão
  let { name, email, telefone, cpf, password } = colaborador; // Obtém os dados do colaborador

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!name || !email || !telefone || !cpf || !password) {
    return callback({ error: 'Insira os dados corretamente' });
  }

  // Criptografa a senha
  colaborador.password = await bcrypt.hash(password, 10);

  // Consulta SQL para inserir um novo colaborador
  let sql = 'INSERT INTO colaborador SET ?';

  try {
    connection = await connect();  // Aguarda a conexão ser estabelecida
    const [results] = await connection.query(sql, colaborador); // Executa a consulta com o colaborador
    callback({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao cadastrar o usuário' });
  } finally {
    if (connection) {
      connection.end();  // Fecha a conexão corretamente
    }
  }
};

// Função para login de colaborador
const loginCompare = async (colaborador, callback) => {
  let connection = null;  // Inicializa a variável para a conexão
  let { name, password } = colaborador;

  // Verifica se os campos obrigatórios foram preenchidos
  if (!name || !password) {
    return callback({ error: 'Insira os campos corretamente' });
  }

  // Consulta SQL para buscar o colaborador pelo nome
  let sql = 'SELECT name, password FROM admins WHERE name = ?';

  try {
    connection = await connect();  // Aguarda a conexão ser estabelecida
    const [results] = await connection.query(sql, [name]); // Executa a consulta com o nome do colaborador

    if (results.length == 0) {
      return callback({ error: 'nome de usuário ou senha incorretos' });
    }

    const colaboradorData = results[0]; // Obtém os dados do colaborador
    const passwordIsValid = await bcrypt.compare(password, colaboradorData.password); // Compara as senhas

    if (passwordIsValid) {
      return callback({ message: 'Login bem-sucedido' });
    } else {
      return callback({ error: 'Colaborador ou senha incorretos' });
    }
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro no login' });
  } finally {
    if (connection) {
      connection.end();  // Fecha a conexão após a operação
    }
  }
};





// Função para obter todos os produto do banco de dados
const getProdutos = async (callback) => {
  let connection = null;  // Inicializa a variável para a conexão
  let sql = 'select id, name, descri, valor_kg, valor_un, valor_cent, disp, imagem, categorias_id, isDeleted from produto'; // Consulta SQL para obter os produtos

  try {
    connection = await connect(); // Cria a conexão com o banco de dados
    const [results] = await connection.query(sql); // Executa a consulta SQL

    // Armazena os resultados da consulta em uma variável
    let produto = results; 

    callback(produto);  // Passa os resultados para o callback
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao obter produtos' }); // Caso ocorra algum erro, chama o callback com a mensagem de erro
  } finally {
    if (connection) {
      connection.end(); // Fecha a conexão corretamente
    }
  }
};

// Função para obter um produto específico pelo seu id
const getProdutoById = async (produtoId, callback) => {
  let connection = null;  // Inicializa a variável para a conexão

  if (!produtoId) {  // Verifica se o id é válido
    return callback({ error: 'Insert a valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'SELECT name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, imagem, isDeleted FROM produto WHERE id = ?'; // Consulta SQL para obter o produto pelo id

  try {
    connection = await connect();  // Cria a conexão com o banco de dados
    const [results] = await connection.query(sql, [produtoId]);  // Executa a consulta de forma assíncrona

    if (results.length === 0) {
      return callback({ error: 'Produto não encontrado' });  // Caso não encontre o produto
    }

    let produto = results[0];  // Armazena o resultado da consulta na variável
    return callback(produto);   // Retorna o produto no callback

  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao buscar o produto' });  // Caso ocorra um erro na consulta
  } finally {
    if (connection) {
      connection.end();  // Fecha a conexão corretamente
    }
  }
};

const getProdutosByCatId = async (categoriaId, callback) => {
  let connection = null;  // Inicializa a variável para a conexão

  if (!categoriaId) {  // Verifica se o id da categoria é válido
    return callback({ error: 'Insert a valid category ID!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'SELECT id, name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, imagem, isDeleted FROM produto WHERE categorias_id = ?'; // Consulta SQL para obter os produtos pela categoria

  try {
    connection = await connect();  // Cria a conexão com o banco de dados
    const [results] = await connection.query(sql, [categoriaId]);  // Executa a consulta de forma assíncrona

    if (results.length === 0) {
      return callback({ error: 'No products found for this category' });  // Caso não encontre produtos para a categoria
    }

    let produtos = results;  // Armazena os resultados da consulta na variável
    return callback(produtos);  // Retorna os produtos no callback

  } catch (error) {
    console.error(error);
    callback({ error: 'Error retrieving products by category' });  // Caso ocorra um erro na consulta
  } finally {
    if (connection) {
      connection.end();  // Fecha a conexão corretamente
    }
  }
};

// Função para adicionar um novo produto ao banco de dados
const addProduto = async (produto, callback) => {
  let connection = null;  // Inicializa a variável para a conexão

  let { name, descri, valor_kg, valor_un, valor_cent, disp, categorias_id, imagem } = produto; // Desestrutura o objeto produto para obter os dados

  // Se 'disp' não foi informado no corpo da requisição, atribuímos um valor padrão (exemplo: 1 ou 0)
  if (disp === undefined || disp === null) {
    disp = 1; // ou qualquer valor padrão que você queira, por exemplo 0 ou outro valor
  }

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!name || !descri || (!valor_un && !valor_kg && !valor_cent && valor_un !== 0 && valor_kg !== 0 && valor_cent !== 0) || disp === undefined || !categorias_id || !imagem) {
    return callback({ error: 'Insira os dados corretamente' });
  }

  let sql = 'INSERT INTO produto SET ?'; // Consulta SQL para inserir um novo produto

  try {
    connection = await connect(); // Cria a conexão com o banco de dados
    const [results] = await connection.query(sql, produto); // Executa a consulta assíncrona

    // Caso o produto seja inserido com sucesso
    callback({ message: 'Produto cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    callback({ error: 'Erro ao cadastrar o produto' }); // Caso ocorra um erro na inserção
  } finally {
    if (connection) {
      connection.end();  // Fecha a conexão
    }
  }
};






// Função para obter todos os categoria do banco de dados
const getCategoria = async (callback) => {
  let connection = await connect(); // Obtém a conexão com o banco de dados
  
  let sql = 'SELECT id, nome FROM categorias'; // Consulta SQL para obter as categorias
  
  try {
    // Executa a consulta usando Promise
    const [results] = await connection.query(sql);  // Usando query diretamente, já que a conexão é baseada em Promise
    
    let categoria = results; // Armazena os resultados da consulta em uma variável
    callback(categoria); // Passa os resultados para o callback
  } catch (error) {
    console.error(error); // Exibe o erro, se houver
    callback({ error: 'Erro ao obter categorias' }); // Passa o erro para o callback
  } finally {
    connection.end(); // Fecha a conexão de maneira assíncrona
  }
};

// Função para obter um categoria específico pelo seu id
const getCategoriaById = async (categoriaId, callback) => {
  let connection = await connect(); // Cria a conexão com o banco de dados
  
  if (!categoriaId) { // Verifica se o id é válido
    return callback({ error: 'Insert a valid id!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = 'SELECT nome FROM categorias WHERE id = ?'; // Consulta SQL para obter a categoria pelo id

  try {
    // Executa a consulta com Promise, sem o uso de connection.promise()
    const [results] = await connection.query(sql, [categoriaId]); // Usa a query diretamente com Promises
    
    if (results.length === 0) {
      return callback({ error: 'Categoria não encontrada' }); // Caso não haja categoria com o id
    }

    let categoria = results[0]; // Armazena os resultados da consulta em uma variável
    callback(categoria); // Passa os resultados para o callback
  } catch (error) {
    console.error(error); // Exibe o erro, se houver
    callback({ error: 'Erro ao obter a categoria' }); // Passa o erro para o callback
  } finally {
    connection.end(); // Fecha a conexão de maneira assíncrona
  }
};


// Função para adicionar um novo categoria ao banco de dados
const addCategoria = async (categoria, callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let { name } = categoria; // Desestrutura o objeto categoria para obter os dados da categoria

  if (!name) { // Verifica se o campo 'name' está preenchido
    return callback({ error: 'Insira os dados corretamente' }); // Retorna um erro caso algum campo esteja faltando
  }

  let sql = 'INSERT INTO categorias SET ?'; // Consulta SQL para inserir um novo categoria

  try {
    // Executa a consulta com Promises
    const [results] = await connection.query(sql, categoria); // Aqui, connection.query já suporta Promises

    callback({ message: 'Categoria cadastrada com sucesso' }); // Retorna sucesso
  } catch (error) {
    console.error(error); // Exibe o erro, caso ocorra
    callback({ error: 'Erro ao cadastrar a categoria' }); // Retorna erro caso ocorra falha
  } finally {
    connection.end(); // Fecha a conexão
  }
};







// Função para obter todos os encomenda do banco de dados
const getEncomenda = async (callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let sql = `SELECT encomendas.id AS encomenda_id, encomendas.nome_cliente, encomendas.endereco, encomendas.dh_encomendado, encomendas.dh_entrega, encomendas.valor_total, 
            prodenc.id AS prodenc_id, prodenc.encomenda_id, prodenc.produto_id, prodenc.quant, prodenc.peso, prodenc.obs, 
            produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, 
            produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent 
            FROM encomendas 
            LEFT JOIN prodenc ON encomendas.id = prodenc.encomenda_id 
            LEFT JOIN produto ON prodenc.produto_id = produto.id`; // Consulta SQL para obter as encomendas

  try {
    // Executa a consulta com Promise
    const [results] = await connection.query(sql); // Usando query com Promises
    callback(results); // Passa os resultados para o callback
  } catch (error) {
    console.error(error); // Exibe o erro caso ocorra
    callback({ error: 'Erro ao obter as encomendas' }); // Passa o erro para o callback
  } finally {
    connection.end(); // Fecha a conexão
  }
};

const getEncomendaById = async (encomendaId, callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let id = encomendaId; // Armazena o id da encomenda

  if (!id) { // Verifica se o id é válido
    return callback({ error: 'Insira um id válido!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = `SELECT encomendas.id AS encomenda_id, encomendas.nome_cliente, encomendas.endereco, encomendas.dh_encomendado, encomendas.dh_entrega, encomendas.valor_total, 
            prodenc.id AS prodenc_id, prodenc.encomenda_id, prodenc.produto_id, prodenc.quant, prodenc.peso, prodenc.obs, 
            produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, produto.disp AS disponibilidade, 
            produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent 
            FROM encomendas 
            LEFT JOIN prodenc ON encomendas.id = prodenc.encomenda_id 
            LEFT JOIN produto ON prodenc.produto_id = produto.id 
            WHERE encomendas.id = ?`; // Consulta SQL para obter a encomenda pelo id

  try {
    // Executa a consulta com Promise
    const [results] = await connection.query(sql, [encomendaId]); // Usando query com Promises (diretamente)

    if (results.length === 0) {
      return callback({ error: 'Encomenda não encontrada!' }); // Retorna erro caso a encomenda não exista
    }

    callback(results); // Passa os resultados para o callback
  } catch (error) {
    console.error(error); // Exibe o erro caso ocorra
    callback({ error: 'Erro ao obter a encomenda' }); // Passa o erro para o callback
  } finally {
    connection.end(); // Fecha a conexão
  }
};




const addEncomenda = async (encomenda, callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let { nome_cliente, endereco, dh_encomendado, dh_entrega, valor_total, produtos } = encomenda; // Agora, produtos é um array de objetos { produto_id, quant, peso }

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!nome_cliente || !endereco || !dh_encomendado || !dh_entrega || !valor_total || !produtos || produtos.length === 0) {
    return callback({ error: 'Insira os dados corretamente' });
  }

  try {
    // Inicia a transação
    await connection.beginTransaction(); // Usando o método diretamente da conexão, sem o promise()

    // Primeiro INSERT na tabela encomendas
    let sqlEncomenda = 'INSERT INTO encomendas SET ?';
    let encomendaData = { nome_cliente, endereco, dh_encomendado, dh_entrega, valor_total };

    const [encomendaResult] = await connection.query(sqlEncomenda, encomendaData); // Usando query diretamente
    let encomendaId = encomendaResult.insertId; // Obtém o ID gerado para a encomenda

    // Agora, insere múltiplos produtos na tabela prodenc
    let sqlProdEnc = 'INSERT INTO prodenc SET ?';
    
    // Itera sobre o array de produtos e faz um INSERT para cada item
    for (let produto of produtos) {
      let { produto_id, quant, peso } = produto;

      // Verifica se cada produto tem pelo menos um valor (quant ou peso)
      if (!produto_id || !(quant || peso)) {
        throw new Error('Produto inválido. Quantidade ou peso deve ser informado.');
      }

      // Dados para a tabela prodenc
      let prodEncData = {
        produto_id,
        encomenda_id: encomendaId,
        obs,
        quant,
        peso
      };

      // Insere o produto na tabela prodenc
      await connection.query(sqlProdEnc, prodEncData);
    }

    // Confirma a transação
    await connection.commit();

    callback({ message: 'Dados inseridos com sucesso em encomendas e prodenc' });
  } catch (error) {
    console.error(error);
    // Caso haja erro, faz o rollback
    await connection.rollback();
    callback({ error: 'Erro ao inserir dados nas tabelas encomendas e prodenc' });
  } finally {
    connection.end(); // Fecha a conexão após a transação
  }
};








// Função para obter todos os pedido do banco de dados
const getPedido = async (callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let sql = `SELECT pedidos.id AS pedido_id, pedidos.nome_cliente, pedidos.mesa_cliente, pedidos.date_hour, pedidos.valor_total, 
             prodped.id AS prodped_id, prodped.pedidos_id, prodped.produto_id, prodped.quant, prodped.obs, 
             produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, 
             produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent 
             FROM pedidos 
             LEFT JOIN prodped ON pedidos.id = prodped.pedidos_id 
             LEFT JOIN produto ON prodped.produto_id = produto.id`; // Consulta SQL para obter os pedidos

  try {
    const [results] = await connection.query(sql); // Usando o método query da conexão que já retorna uma Promise

    let pedido = results; // Armazena os resultados da consulta em uma variável
    callback(pedido); // Retorna os resultados usando o callback
  } catch (error) {
    console.error(error); // Exibe o erro no console caso ocorra
    callback({ error: 'Erro ao obter pedidos' }); // Retorna um erro para o callback
  } finally {
    connection.end(); // Fecha a conexão após a execução
  }
};



// Função para obter um pedido específico pelo seu id
const getPedidoById = async (pedidoId, callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  if (!pedidoId) { // Verifica se o ID do pedido foi fornecido
    return callback({ error: 'Insira um id válido!' }); // Retorna um erro caso o id seja inválido
  }

  let sql = `SELECT pedidos.id AS pedido_id, pedidos.nome_cliente, pedidos.mesa_cliente, pedidos.date_hour, pedidos.valor_total, 
             prodped.id AS prodped_id, prodped.pedidos_id, prodped.produto_id, prodped.quant, prodped.obs, 
             produto.id AS produto_id, produto.name AS nome_produto, produto.descri AS descricao_produto, 
             produto.disp AS disponibilidade, produto.imagem, produto.valor_kg, produto.valor_un, produto.valor_cent 
             FROM pedidos 
             LEFT JOIN prodped ON pedidos.id = prodped.pedidos_id 
             LEFT JOIN produto ON prodped.produto_id = produto.id 
             WHERE pedidos.id = ?`; // Consulta SQL para obter o pedido pelo id

  try {
    const [results] = await connection.query(sql, [pedidoId]); // Usando o método query da conexão que já retorna uma Promise
    let pedido = results; // Armazena os resultados da consulta em uma variável
    callback(pedido); // Passa os resultados para o callback
  } catch (error) {
    console.error(error); // Exibe o erro no console caso ocorra
    callback({ error: 'Erro ao obter o pedido' }); // Retorna um erro para o callback
  } finally {
    connection.end(); // Fecha a conexão após a execução
  }
};



// Função para adicionar um novo pedido ao banco de dados
const addPedido = async (pedido, callback) => {
  let connection = await connect(); // Cria uma conexão com o banco de dados

  let { nome_cliente, mesa_cliente, date_hour, obs, valor_total, produtos } = pedido; // Desestrutura o objeto pedido para obter os dados

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!nome_cliente || !mesa_cliente || !date_hour || !obs || !valor_total || !produtos || produtos.length === 0) {
    return callback({ error: 'Insira os dados corretamente' }); // Retorna um erro caso algum campo esteja faltando
  }

  try {
    await connection.beginTransaction(); // Inicia a transação

    // Primeiro INSERT na tabela pedidos
    let sqlPedido = 'INSERT INTO pedidos SET ?';
    let pedidoData = { nome_cliente, mesa_cliente, date_hour, obs, valor_total }; // Dados para tabela pedidos

    const [pedidoResults] = await connection.query(sqlPedido, pedidoData); // Executa a consulta
    let pedidoId = pedidoResults.insertId; // Obtém o ID gerado para o pedido

    // Segundo INSERT para cada produto no array de "produtos"
    let sqlProdPed = 'INSERT INTO prodped SET ?';

    // Loop para inserir cada produto e sua quantidade
    for (let produto of produtos) {
      let { produto_id, quant } = produto;

      if (!produto_id || !quant) {
        // Verifica se cada produto tem id e quantidade
        throw new Error('Produto id e quantidade são obrigatórios');
      }

      let prodPedData = {
        produto_id,   // ID do produto
        pedidos_id: pedidoId, // ID gerado para o pedido
        obs,
        quant,        // Quantidade do produto
      };

      // Insere o produto na tabela prodped
      await connection.query(sqlProdPed, prodPedData);
    }

    // Confirma a transação
    await connection.commit();

    callback({ message: 'Dados inseridos com sucesso em pedidos e prodped' }); // Retorna mensagem de sucesso
  } catch (error) {
    console.error(error); // Exibe o erro no console

    // Rollback em caso de erro
    await connection.rollback();
    callback({ error: 'Erro ao inserir os dados' }); // Retorna mensagem de erro
  } finally {
    connection.end(); // Fecha a conexão após a execução
  }
};




// Exporta as funções para serem utilizadas em outros módulos
module.exports = {connect, getColaboradores, addColaborador, getColaboradoresById, loginCompare, getProdutos, addProduto, getProdutoById, getCategoria, getCategoriaById, addCategoria, getEncomenda, getEncomendaById, addEncomenda, getPedido, getPedidoById, addPedido, getProdutosByCatId};
