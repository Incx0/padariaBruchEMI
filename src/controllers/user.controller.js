//requirindo o userService e suas funções
const userService = require('../services/user.service');

//função get de todos os usuários
const get = async (req, res) => {
    try {
        const users = await userService.getService(); // Chama o serviço para obter os dados
         // Envia os dados como JSON
        if(users.length == 0){
            res.status(204).json({message: "doesn't have any user registered"})
        }
        res.status(200).json(users);
    }catch (error) {
        console.error(error);
        res.status(500).send({"Error":"Can't take the users"}); // Retorna um erro 500 caso ocorra uma exceção
    }
};

//função de get de um usuário específicado pelo id do parametro
const getById = async (req, res) =>{
    try{
        //defino o valor do id como a resposta do requiremento do "params.id"
        const id = req.params.id;

        //Chama o serviço para obter os dados do usuário especificado pelo id
        const user = await userService.getByIdService(id);

        //Se, não voltar nenhum usuário envia mensagem de erro
        if(user.length == 0){
            res.status(406).json({"Error":"Please insert a valid id"});
        }
        //Se não, envia o json do usuário
        else{
            res.status(200).send(user);
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
    const user = await userService.saveService(req.body)
    .then(()=>res.status(201).json({ message: 'User has been registered!'}))//responde a mensagem
    .catch((error)=>res.status(500).json({ error: error.message }));//responde em caso de erro
};

const login = async (req, res) => {
    return userService.getAndCompareLogin(req.body)
      .then((msg) => res.status(200).json({ message: "Logged" }))
      .catch((error) => res.status(400).json({ error: error.message }));
};

const loginColaborador = async (req, res) => {
    return userService.getAndCompareLoginColaborador(req.body)
      .then((msg) => res.status(200).json({ message: "Logged" }))
      .catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = {get, add, getById, login, loginColaborador}
