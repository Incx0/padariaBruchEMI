//requirindo express e o declarando
const express = require('express');

const cors = require('cors');
//-o const app se torna o apelido do express para caso eu precise chamar algumas de suas funções
const app = express();

//requirindo a conexão dos banco de dados
const dbMysql = require('./src/database/dbMysql');
const cnntDbMongo = require('./src/database/dbMongo');
const userRoute = require('./src/routes/user.route');
const produtoRoute = require('./src/routes/produto.route');
const categoriaRoute = require('./src/routes/categoria.route');
const pedidoRoute = require('./src/routes/pedido.route');
const encomendaRoute = require('./src/routes/encomenda.route');
const notaFiscalRoute = require('./src/routes/notaFiscal.route')

//porta do servidor
const port = 3000;

cnntDbMongo();
//eu sei que está mal feito
dbMysql.connect();

//declarando que o tipo de dado do servidor vai ser JSON
app.use(express.json());

app.use(cors({
    origin: '*'
}));

//declarando a rota do router do user
app.use("/user",userRoute)

//declarando a rota do router do produto
app.use("/produto",produtoRoute)

//declarando a rota do router do produto
app.use("/categoria",categoriaRoute)

//declarando a rota do router do produto
app.use("/pedido",pedidoRoute)

//declarando a rota do router do produto_pedido
app.use("/encomenda",encomendaRoute)

app.use("/nota-fiscal", notaFiscalRoute)



//declarando por qual porta o server vai atender no caso o valor do const port
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))