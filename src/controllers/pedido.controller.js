//requirindo o pedidoService e suas funções
const pedidoService = require('../services/pedido.service');

//função get de todos os pedidos
const get = async (req, res) => {
    try {
        const pedidos = await pedidoService.getService(); // Chama o serviço para obter os dados
         // Envia os dados como JSON
        if(pedidos.length == 0){
            res.status(204).json({message: "doesn't have any orders registered"})
        }
        res.status(200).json(pedidos);
    }catch (error) {
        console.error(error);
        res.status(500).send({"Error":"Can't take the pedidos"}); // Retorna um erro 500 caso ocorra uma exceção
    }
};

//função de get de um pedido específicado pelo id do parametro
const getById = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const id = req.params.id;

        //Chama o serviço para obter os dados do pedido especificado pelo id
        const pedido = await pedidoService.getByIdService(id);

        //Se, não voltar nenhum pedido envia mensagem de erro
        if(pedido.length == 0){
            res.status(406).json({"Error":"Please insert a valid id "});
        }
        //Se não, envia o json do pedido
        else{
            res.status(200).send(pedido);
        }
    }
    //caso de um catch em um erro manda o erro em forma de json
    catch(error){
    res.status(500).json({ "Error":error.message})
    };
};


//Função de post de um pedido no banco
const add = async (req, res) => {
    //aguarda o envio do dados
    const pedido = await pedidoService.saveService(req.body)
    .then(()=>res.status(201).json({ message: 'pedido has been registered!'}))//responde a mensagem
    .catch((error)=>res.status(500).json({ error: error.message }));//responde em caso de erro
};

module.exports = {get, add, getById}