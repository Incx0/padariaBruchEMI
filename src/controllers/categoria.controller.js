//requirindo o categoriaService e suas funções
const categoriaService = require('../services/categoria.service');

//função get de todos os usuários
const get = async (req, res) => {
    try {
        const categorias = await categoriaService.getService(); // Chama o serviço para obter os dados
         // Envia os dados como JSON
        if(categorias.length == 0){
            res.status(204).json({message: "doesn't have any categoria registered"})
        }
        res.status(200).json(categorias);
    }catch (error) {
        console.error(error);
        res.status(500).send({"Error":"Can't take the categorias"}); // Retorna um erro 500 caso ocorra uma exceção
    }
};

//função de get de um usuário específicado pelo id do parametro
const getById = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const id = req.params.id;

        //Chama o serviço para obter os dados do usuário especificado pelo id
        const categoria = await categoriaService.getByIdService(id);

        //Se, não voltar nenhum usuário envia mensagem de erro
        if(categoria.length == 0){
            res.status(406).json({"Error":"Please insert a valid id "});
        }
        //Se não, envia o json do usuário
        else{
            res.status(200).send(categoria);
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
    const categoria = await categoriaService.saveService(req.body)
    .then(()=>res.status(201).json({ message: 'categoria has been registered!'}))//responde a mensagem
    .catch((error)=>res.status(500).json({ error: error.message }));//responde em caso de erro
};

module.exports = {get, add, getById}