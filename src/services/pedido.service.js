//requirindo o database
const dbMysql = require('../database/dbMysql');

//função que salva pedido
const saveService = (message) => {
    //retorna o objeto (message no caso) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject) => {
        //espera a resposta do "addpedido"
        await dbMysql.addPedido(message, (err) => {
            //se o tipo da "message err" for "error" envia o erro
            if (err.hasOwnProperty('error')) {
                //o reject rejeita o Promisse(é como se tivesse dado um erro) e envia outra coisa, no caso um objeto "Error"
               reject(new Error("Erro ao registrar o pedido: " + err.error));
            }
            //se não apenas envia como "message normal"
            else {
                //o resolve aceita o promisse segue o caminho(como se tivesse dado certo) e envia a messagem de êxito
              resolve(err.message);
            }
        });
    });
};

//função de get de todos os pedidos
const getService = () => {
    //retorna o objeto (o json do pedidos) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise((resolve, reject) => {
        dbMysql.getPedido((pedido) => {
            if (pedido) {
                resolve(pedido); // Resolve(segue em frente) a promessa com os dados dos pedidos
            } else {
                reject(new Error("Error can't take the pedido")); // Rejeita(deu merda) a promessa em caso de erro
            }
        });
    });
};

//função de get de um pedido por um id específico
const getByIdService = (id)=>{
    //retorna o objeto (o json do pedido) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject)=>{
        dbMysql.getPedidoById(id, (pedido)=>{
            if(!pedido){
                reject(new Error({Error:"Can't take the pedido"}));// Rejeita(deu merda) a promessa em caso de erro
            }
            else{
                resolve(pedido);// Resolve(segue em frente) a promessa com os dados do pedido
            }
        });
    });
};


module.exports = { saveService , getService, getByIdService}