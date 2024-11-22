//requirindo o produtoService e suas funções
const produtoService = require('../services/produto.service');

//função get de todos os usuários
const get = async (req, res) => {
    try {
        const produtos = await produtoService.getService(); // Chama o serviço para obter os dados
         // Envia os dados como JSON
        if(produtos.length == 0){
            res.status(204).json({message: "doesn't have any produto registered"})
        }
        res.status(200).json(produtos);
    }catch (error) {
        console.error(error);
        res.status(500).send({"Error":"Can't take the produtos"}); // Retorna um erro 500 caso ocorra uma exceção
    }
};

//função de get de um usuário específicado pelo id do parametro
const getById = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const id = req.params.id;

        //Chama o serviço para obter os dados do usuário especificado pelo id
        const produto = await produtoService.getByIdService(id);

        //Se, não voltar nenhum usuário envia mensagem de erro
        if(produto.length == 0){
            res.status(406).json({"Error":"Please insert a valid id"});
        }
        //Se não, envia o json do usuário
        else{
            res.status(200).send(produto);
        }
    }
    //caso de um catch em um erro manda o erro em forma de json
    catch(error){
    res.status(500).json({ "Error":error.message})
    };
};

const getByCatId = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const catId = req.params.catId;

        //Chama o serviço para obter os dados do usuário especificado pelo id
        const produtos = await produtoService.getByCatIdService(catId);

        //Se, não voltar nenhum usuário envia mensagem de erro
        if(produtos.length == 0){
            res.status(406).json({"Error":"Please insert a valid id"});
        }
        //Se não, envia o json do usuário
        else{
            res.status(200).send(produtos);
        }
    }
    //caso de um catch em um erro manda o erro em forma de json
    catch(error){
    res.status(500).json({ "Error":error.message})
    };
};


//Função de post de um usuário no banco
const add = async (req, res) => {
    //aguarda o envio do dados
    const produto = await produtoService.saveService(req.body)
    .then(()=>res.status(201).json({ message: 'produto has been registered!'}))//responde a mensagem
    .catch((error)=>res.status(500).json({ error: error.message }));//responde em caso de erro
};

module.exports = {get, add, getById, getByCatId}