//requirindo o database
const dbMysql = require('../database/dbMysql');

//função que salva colaborador
const saveService = (message) => {
    //retorna o objeto (message no caso) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject) => {
        //espera a resposta do "addUser"
        await dbMysql.addColaborador(message, (err) => {
            //se o tipo da "message err" for "error" envia o erro
            if (err.hasOwnProperty('error')) {
                //o reject rejeita o Promisse(é como se tivesse dado um erro) e envia outra coisa, no caso um objeto "Error"
               reject(new Error("Erro ao registrar o colaborador: " + err.error));
            }
            //se não apenas envia como "message normal"
            else {
                //o resolve aceita o promisse segue o caminho(como se tivesse dado certo) e envia a messagem de êxito
              resolve(err.message);
            }
        });
    });
};

//função de get de todos os colaboradores
const getService = () => {
    //retorna o objeto (o json do colaboradores) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise((resolve, reject) => {
        dbMysql.getColaboradores((users) => {
            if (users) {
                resolve(users); // Resolve(segue em frente) a promessa com os dados dos colaboradores
            } else {
                reject(new Error("Error can't take the users")); // Rejeita(deu merda) a promessa em caso de erro
            }
        });
    });
};

//função de get de um colaborador por um id específico
const getByIdService = (id)=>{
    //retorna o objeto (o json do colaborador) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject)=>{
        dbMysql.getColaboradoresById(id, (user)=>{
            if(!user){
                reject(new Error({Error:"Can't take the user"}));// Rejeita(deu merda) a promessa em caso de erro
            }
            else{
                resolve(user);// Resolve(segue em frente) a promessa com os dados do colaborador
            }
        });
    });
};

const getAndCompareLogin = (message)=>{
    return new Promise(async (resolve, reject)=>{
        dbMysql.loginCompare(message, (err)=>{
            if(err.hasOwnProperty('error')){
                reject(new Error(err.error));
            }else{
                resolve(err.message)
            }
        });
    });
};

const getAndCompareColaboradorLogin = (message)=>{
    return new Promise(async (resolve, reject)=>{
        dbMysql.loginCompareColaborador(message, (err)=>{
            if(err.hasOwnProperty('error')){
                reject(new Error(err.error));
            }else{
                resolve(err.message)
            }
        });
    });
};

module.exports = { saveService , getService, getByIdService, getAndCompareLogin, getAndCompareColaboradorLogin}
