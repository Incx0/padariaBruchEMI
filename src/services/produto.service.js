//requirindo o database
const dbMysql = require('../database/dbMysql');

//função que salva produto
const saveService = (message) => {
    //retorna o objeto (message no caso) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject) => {
        //espera a resposta do "addproduto"
        await dbMysql.addproduto(message, (err) => {
            //se o tipo da "message err" for "error" envia o erro
            if (err.hasOwnProperty('error')) {
                //o reject rejeita o Promisse(é como se tivesse dado um erro) e envia outra coisa, no caso um objeto "Error"
               reject(new Error("Erro ao registrar o produto: " + err.error));
            }
            //se não apenas envia como "message normal"
            else {
                //o resolve aceita o promisse segue o caminho(como se tivesse dado certo) e envia a messagem de êxito
              resolve(err.message);
            }
        });
    });
};

//função de get de todos os produtos
const getService = () => {
    //retorna o objeto (o json do produtos) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise((resolve, reject) => {
        dbMysql.getProdutos((produto) => {
            if (produto) {
                resolve(produto); // Resolve(segue em frente) a promessa com os dados dos produtos
            } else {
                reject(new Error("Error can't take the produto")); // Rejeita(deu merda) a promessa em caso de erro
            }
        });
    });
};

//função de get de um produto por um id específico
const getByIdService = (id)=>{
    //retorna o objeto (o json do produto) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject)=>{
        dbMysql.getProdutosById(id, (produto)=>{
            if(!produto){
                reject(new Error({Error:"Can't take the produto"}));// Rejeita(deu merda) a promessa em caso de erro
            }
            else{
                resolve(produto);// Resolve(segue em frente) a promessa com os dados do produto
            }
        });
    });
};

const getByCatIdService = (catId)=>{
    //retorna o objeto (o json do produto) assincrono que pode ainda não estar finalizado quando retornar(usando O new Promisse)
    return new Promise(async (resolve, reject)=>{
        dbMysql.getProdutosByCatId(catId, (produtos)=>{
            if(!produtos){
                reject(new Error({Error:"Can't take the produtos"}));// Rejeita(deu merda) a promessa em caso de erro
            }
            else{
                resolve(produtos);// Resolve(segue em frente) a promessa com os dados do produto
            }
        });
    });
};


module.exports = { saveService , getService, getByIdService, getByCatIdService}