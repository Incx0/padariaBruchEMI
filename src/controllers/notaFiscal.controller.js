const notaFiscalService = require('../services/notaFiscal.service');
const mongoose = require('mongoose');
const NotaFiscal = require('../models/Notas_Fiscais'); // Aqui deve estar o modelo diretamente

// Função para gerar número aleatório único
const gerarNumeroNotaUnico = async () => {
  let numeroUnico;

  while (true) {
    // Gerar número aleatório (personalize o intervalo conforme necessário)
    numeroUnico = Math.floor(Math.random() * 1000000);  // Exemplo: número aleatório entre 0 e 999999

    // Verificar se o número já existe na coleção
    const existe = await NotaFiscal.findOne({ numero_nota: numeroUnico });

    if (!existe) {
      // Se não existe, então é único, podemos retornar
      break;
    }
  }

  return numeroUnico;
};

const save = async (req, res) => {
  const { numero_nota, data_emissao, cliente, valor_total, itens, forma_pagamento, estabelecimento } = req.body;
  const { nome, cpf } = cliente;
  const { nome_prod, quantidade, preco_unitario, observacoes } = itens;
  const { nome_esta, cnpj, endereco } = estabelecimento;

  // Verificar se os campos obrigatórios foram preenchidos
  if (!data_emissao || !cliente || !cliente.nome || !cliente.cpf || !valor_total || !itens || itens.length === 0 || !itens[0].nome_prod || !itens[0].quantidade || !itens[0].preco_unitario || !itens[0].observacoes || !forma_pagamento || !estabelecimento || !estabelecimento.nome_esta || !estabelecimento.cnpj || !estabelecimento.endereco) {
    return res.status(400).send({ message: "Insert the correct fields!" });
  }

  // Gerar um número de nota único, se não fornecido
  let numeroNotaGerado = numero_nota;
  if (!numeroNotaGerado) {
    numeroNotaGerado = await gerarNumeroNotaUnico();
  }

  // Criar a nota fiscal com os dados fornecidos
  const notaFiscal = new NotaFiscal({ // Corrigido: Remover ".model"
    numero_nota: numeroNotaGerado,
    data_emissao,
    cliente,
    valor_total,
    itens,
    forma_pagamento,
    estabelecimento
  });

  // Salvar a nota fiscal no banco de dados
  try {
    const savedNotaFiscal = await notaFiscalService.saveService(notaFiscal);

    res.status(201).send({
      message: "Invoice created with success!",
      nota_fiscal: {
        id: savedNotaFiscal._id,
        numero_nota: savedNotaFiscal.numero_nota,
        data_emissao: savedNotaFiscal.data_emissao,
        cliente: savedNotaFiscal.cliente,
        valor_total: savedNotaFiscal.valor_total
      }
    });
  } catch (error) {
    res.status(400).send({ message: "Error to create the invoice!" });
  }
};

const findAll = async (req, res)=>{
    const notaFiscals = await notaFiscalService.findAllService();

    if(notaFiscals.length === 0){
        return res.status(200).send({message:"Don't have any invoice's registered"});
    }

    res.status(200).send(notaFiscals);
};

const findById = async (req, res)=>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message:`insert a valid id`});
    }

    const notaFiscal = await notaFiscalService.findByIdService(id);

    if(!notaFiscal){
        res.status(200).send({message:`invoice by id:${id} not found`});
    };

    res.status(200).send(notaFiscal);
}

module.exports = {save, findAll, findById};