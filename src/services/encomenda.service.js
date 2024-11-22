//requirindo o database
const dbMysql = require('../database/dbMysql');

//função que salva encomenda
const saveService = (message) => {
    //retorna o objeto (message no caso) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject) => {
        //espera a resposta do "addencomenda"
        await dbMysql.addEncomenda(message, (err) => {
            //se o tipo da "message err" for "error" envia o erro
            if (err.hasOwnProperty('error')) {
                //o reject rejeita o Promisse(é como se tivesse dado um erro) e envia outra coisa, no caso um objeto "Error"
               reject(new Error("Erro ao registrar a encomenda: " + err.error));
            }
            //se não apenas envia como "message normal"
            else {
                //o resolve aceita o promisse segue o caminho(como se tivesse dado certo) e envia a messagem de êxito
              resolve(err.message);
            }
        });
    });
};

//função de get de todos os encomendas
const getService = () => {
    //retorna o objeto (o json das encomendas) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise((resolve, reject) => {
        dbMysql.getEncomenda((encomenda) => {
            if (encomenda) {
                resolve(encomenda); // Resolve(segue em frente) a promessa com os dados dos encomendas
            } else {
                reject(new Error("Error can't take the produto")); // Rejeita(deu merda) a promessa em caso de erro
            }
        });
    });
};
//função de get de uma encomenda por um id específico
const getByIdService = (id)=>{
    //retorna o objeto (o json do encomenda) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject)=>{
        dbMysql.getEncomendaById(id, (encomenda)=>{
            if(!encomenda){
                reject(new Error({Error:"Can't take the encomenda"}));// Rejeita(deu merda) a promessa em caso de erro
            }
            else{
                resolve(encomenda);// Resolve(segue em frente) a promessa com os dados do encomenda
            }
        });
    });
};


module.exports = { saveService , getService, getByIdService}