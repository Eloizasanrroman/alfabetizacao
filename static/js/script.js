function continuar() {

    const responsavel = document.getElementById("responsavel").value.trim();
    const aluno = document.getElementById("aluno").value.trim();
    const mensagemErro = document.getElementById("mensagemErro");

    mensagemErro.textContent = "";

    if (responsavel === "" || aluno === "") {
        mensagemErro.textContent = "Preencha os dois nomes para continuar.";
        return;
    }

    window.location.href = `/niveis?aluno=${encodeURIComponent(aluno)}`;
}


function voltarNiveis() {
    window.location.href = "/niveis";
}


function iniciarNivel(nivel) {

    if (nivel === "inicio") {
        window.location.href = "/atividade";
    }

}


/* =========================
   ATIVIDADE 1
========================= */

let atividadeAtual = 0;
let tentativas = 0;
let vogaisErradas = [];
let revisandoErros = false;


const vogais = [
    {
        letra: "A",
        opcoes: ["A", "E", "I"]
    },

    {
        letra: "E",
        opcoes: ["O", "E", "A"]
    },

    {
        letra: "I",
        opcoes: ["A", "U", "I"]
    },

    {
        letra: "O",
        opcoes: ["O", "U", "E"]
    },

    {
        letra: "U",
        opcoes: ["I", "A", "U"]
    }
];


function responder(resposta) {

    const atividade = vogais[atividadeAtual];
    const resultado = document.getElementById("resultado");

    if (resposta === atividade.letra) {

        resultado.textContent = "Muito bem! 🦒";
        resultado.style.color = "#7ca88a";

        setTimeout(() => {

            tentativas = 0;

            if (revisandoErros) {

                revisarProximaErrada();

            } else {

                atividadeAtual++;

                if (atividadeAtual < vogais.length) {

                    mostrarVogal();

                } else {

                    iniciarRevisao();

                }

            }

        }, 800);

    } else {

        tentativas++;

        if (tentativas === 1) {

            resultado.textContent = "Vamos tentar de novo!";
            resultado.style.color = "#c98282";

        } else {

            resultado.textContent =
                "Ainda não é esse, vamos tentar de novo!";

            resultado.style.color = "#c98282";

            if (!revisandoErros) {

                if (!vogaisErradas.includes(atividadeAtual)) {
                    vogaisErradas.push(atividadeAtual);
                }

                setTimeout(() => {

                    tentativas = 0;
                    atividadeAtual++;

                    if (atividadeAtual < vogais.length) {

                        mostrarVogal();

                    } else {

                        iniciarRevisao();

                    }

                }, 1000);

            } else {

                setTimeout(() => {

                    tentativas = 0;
                    mostrarVogal();

                }, 1000);

            }

        }

    }

}


function iniciarRevisao() {

    if (vogaisErradas.length > 0) {

        revisandoErros = true;

        atividadeAtual = vogaisErradas[0];

        mostrarVogal();

    } else {

        finalizarAtividade();

    }

}


function revisarProximaErrada() {

    vogaisErradas.shift();

    if (vogaisErradas.length > 0) {

        atividadeAtual = vogaisErradas[0];

        mostrarVogal();

    } else {

        revisandoErros = false;

        finalizarAtividade();

    }

}


function mostrarVogal() {

    const atividade = vogais[atividadeAtual];

    document.getElementById("letra").textContent = atividade.letra;

    const opcoes = document.getElementById("opcoes");

    opcoes.innerHTML = "";

    atividade.opcoes.forEach(function(opcao) {

        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = opcao;

        botao.onclick = function() {
            responder(opcao);
        };

        opcoes.appendChild(botao);

    });

    document.getElementById("resultado").textContent = "";

}


function finalizarAtividade() {

    const card = document.querySelector(".atividade-card");

    card.innerHTML = `

        <div class="girafa atividade-girafa">

            <img
                src="/static/img/girafinha.png"
                alt="Girafinha"
            >

        </div>


        <h1 class="titulo-atividade">

            Atividade 1 concluída com sucesso! 🎉

        </h1>


        <p class="instrucao">

            Deseja avançar para a atividade 2?

        </p>


        <button
            class="continuar-atividade"
            onclick="avancarAtividade()"
        >

            Continuar

        </button>

    `;

}


function avancarAtividade() {

    window.location.href = "/atividade2";

}






/* =========================
   ATIVIDADE 2
========================= */

let atividade2Atual = 0;
let tentativas2 = 0;
let errosAtividade2 = [];
let revisandoErros2 = false;


const atividades2 = [

    {
        letra: "A",

        opcoes: [
            "aviao.png",
            "elefante.png",
            "ilha.png"
        ],

        correta: 0
    },

    {
        letra: "E",

        opcoes: [
            "ovelha.png",
            "elefante.png",
            "aviao.png"
        ],

        correta: 1
    },

    {
        letra: "I",

        opcoes: [
            "aviao.png",
            "uva.png",
            "ilha.png"
        ],

        correta: 2
    },

    {
        letra: "O",

        opcoes: [
            "ovelha.png",
            "uva.png",
            "elefante.png"
        ],

        correta: 0
    },

    {
        letra: "U",

        opcoes: [
            "ilha.png",
            "aviao.png",
            "uva.png"
        ],

        correta: 2
    }

];


function mostrarAtividade2() {

    const atividade = atividades2[atividade2Atual];

    document.getElementById("letra").textContent = atividade.letra;

    document.getElementById("resultado").textContent = "";


    document.getElementById("imagem0").src =
        `/static/img/${atividade.opcoes[0]}`;

    document.getElementById("imagem1").src =
        `/static/img/${atividade.opcoes[1]}`;

    document.getElementById("imagem2").src =
        `/static/img/${atividade.opcoes[2]}`;

}


function responderAtividade2(opcao) {

    const atividade = atividades2[atividade2Atual];

    const resultado = document.getElementById("resultado");


    if (opcao === atividade.correta) {

        resultado.textContent = "Muito bem! 🦒";
        resultado.style.color = "#7ca88a";


        setTimeout(() => {

            tentativas2 = 0;


            if (revisandoErros2) {

                revisarProximaAtividade2();

            } else {

                atividade2Atual++;


                if (atividade2Atual < atividades2.length) {

                    mostrarAtividade2();

                } else {

                    iniciarRevisaoAtividade2();

                }

            }

        }, 800);


    } else {

        tentativas2++;


        if (tentativas2 === 1) {

            resultado.textContent = "Vamos tentar de novo!";
            resultado.style.color = "#c98282";


        } else {

            resultado.textContent =
                "Ainda não é esse, vamos tentar de novo!";

            resultado.style.color = "#c98282";


            if (!revisandoErros2) {

                if (!errosAtividade2.includes(atividade2Atual)) {

                    errosAtividade2.push(atividade2Atual);

                }


                setTimeout(() => {

                    tentativas2 = 0;

                    atividade2Atual++;


                    if (atividade2Atual < atividades2.length) {

                        mostrarAtividade2();

                    } else {

                        iniciarRevisaoAtividade2();

                    }

                }, 1000);


            } else {

                setTimeout(() => {

                    tentativas2 = 0;

                    mostrarAtividade2();

                }, 1000);

            }

        }

    }

}


function iniciarRevisaoAtividade2() {

    if (errosAtividade2.length > 0) {

        revisandoErros2 = true;

        atividade2Atual = errosAtividade2[0];

        mostrarAtividade2();

    } else {

        finalizarAtividade2();

    }

}


function revisarProximaAtividade2() {

    errosAtividade2.shift();


    if (errosAtividade2.length > 0) {

        atividade2Atual = errosAtividade2[0];

        mostrarAtividade2();

    } else {

        revisandoErros2 = false;

        finalizarAtividade2();

    }

}


function finalizarAtividade2() {

    const card = document.querySelector(".atividade-card");

    card.innerHTML = `

        <div class="girafa atividade-girafa">

            <img
                src="/static/img/girafinha.png"
                alt="Girafinha"
            >

        </div>


        <h1 class="titulo-atividade">

            Atividade 2 concluída com sucesso! 🎉

        </h1>


        <p class="instrucao">

            Deseja avançar para a atividade 3?

        </p>


        <button
            class="continuar-atividade"
            onclick="avancarAtividade3()"
        >

            Continuar

        </button>

    `;

}


function avancarAtividade3() {

    window.location.href = "/atividade3";

}


/* =========================
   INICIAR CADA ATIVIDADE
========================= */

if (window.location.pathname === "/atividade") {

    mostrarVogal();

}


if (window.location.pathname === "/atividade2") {

    mostrarAtividade2();

}