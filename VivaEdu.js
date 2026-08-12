document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarData();

        carregarUsuario();

    }
);


function mostrarData() {

    const elemento =
        document.getElementById(
            "dataAtual"
        );


    if (!elemento) {
        return;
    }


    const hoje = new Date();


    elemento.textContent =
        hoje.toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


function carregarUsuario() {

    const usuario =
        localStorage.getItem(
            "vivaeduUsuario"
        );


    if (!usuario) {
        return;
    }


    const nome =
        document.getElementById(
            "nomeUsuario"
        );


    const saudacao =
        document.getElementById(
            "nomeSaudacao"
        );


    const avatar =
        document.getElementById(
            "avatar"
        );


    if (nome) {

        nome.textContent =
            usuario;

    }


    if (saudacao) {

        saudacao.textContent =
            usuario
                .split(" ")[0];

    }


    if (avatar) {

        avatar.textContent =
            usuario
                .charAt(0)
                .toUpperCase();

    }

}


function mostrarPagina(
    paginaId,
    botao
) {

    const paginas =
        document.querySelectorAll(
            ".pagina"
        );


    paginas.forEach(
        function(pagina) {

            pagina.classList.remove(
                "ativa"
            );

        }
    );


    const pagina =
        document.getElementById(
            paginaId
        );


    if (pagina) {

        pagina.classList.add(
            "ativa"
        );

    }


    const botoes =
        document.querySelectorAll(
            ".menu-item"
        );


    botoes.forEach(
        function(item) {

            item.classList.remove(
                "ativo"
            );

        }
    );


    if (botao) {

        botao.classList.add(
            "ativo"
        );

    }

}


function sair() {

    localStorage.removeItem(
        "vivaeduUsuario"
    );


    window.location.href =
        "login.html";

}
