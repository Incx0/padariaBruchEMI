const mongoose = require('mongoose');

const Notas_FiscaisSchema = new mongoose.Schema({
    numero_nota: {
        type: String,
        required: true,
        unique: true
    },
    data_emissao: {
        type: String,
        required: true
    },
    cliente: {
        nome: {
            type: String
        },
        cpf: {
            type: String
        }
    },
    valor_total: {
        type: Number,
        required: true
    },
    itens: [{
        nome_prod: {
            type: String,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        },
        preco_unitario: {
            type: Number,
            required: true
        },
        observacoes: {
            type: String,
        }
    }],
    forma_pagamento: {
        type: String,
        required: true
    },
    estabelecimento: {
        nome_esta: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        }
    }
});

const Notas_Fiscais = mongoose.model("Notas_Fiscais", Notas_FiscaisSchema);

// Função para gerar número de nota fiscal único
const gerarNumeroNota = async () => {
    let numeroNotaUnico;

    // Continuar tentando até encontrar um número único
    while (true) {
        // Gerar número aleatório (você pode personalizar o intervalo do número)
        numeroNotaUnico = Math.floor(Math.random() * 1000000000).toString(); // Exemplo: número aleatório entre 0 e 999999999

        // Verificar se o número já existe na coleção
        const existe = await Notas_Fiscais.exists({ numero_nota: numeroNotaUnico });

        if (!existe) {
            // Se não existe, então é único, e podemos retornar
            break;
        }
    }

    return numeroNotaUnico;
};


module.exports = Notas_Fiscais;
