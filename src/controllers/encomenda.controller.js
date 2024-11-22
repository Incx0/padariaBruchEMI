//requirindo o encomendaService e suas funções
const encomendaService = require('../services/encomenda.service');

//função get de todos os usuários
const get = async (req, res) => {
    try {
        const encomendas = await encomendaService.getService(); // Chama o serviço para obter os dados
         // Envia os dados como JSON
        if(encomendas.length == 0){
            return res.status(204).json({message: "doesn't have any 'encomenda' registered"})
        }
        res.status(200).json(encomendas);
    }catch (error) {
        console.error(error);
        return res.status(500).send({"Error":"Can't take the 'encomenda'"}); // Retorna um erro 500 caso ocorra uma exceção
    }
};

//função de get de um usuário específicado pelo id do parametro
const getById = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const id = req.params.id;

        //Chama o serviço para obter os dados do usuário especificado pelo id
        const encomenda = await encomendaService.getByIdService(id);

        //Se, não voltar nenhum usuário envia mensagem de erro
        if(encomenda.length == 0){
            return res.status(204).json({message: "doesn't have any 'encomenda' registered"})
        }
        //Se não, envia o json do usuário
        else{
            return res.status(200).send(encomenda);
        }
    }
    //caso de um catch em um erro manda o erro em forma de json
    catch(error){
     return res.status(500).json({ "Error":error.message})
    };
};


//Função de post de um usuário no banco
const add = async (req, res) => {
    //aguarda o envio do dados
    const encomenda = await encomendaService.saveService(req.body)
    .then(()=>res.status(201).json({ message: 'produto has been registered!'}))//responde a mensagem
    .catch((error)=>res.status(500).json({ error: error.message }));//responde em caso de erro
};

module.exports = {get, add, getById}