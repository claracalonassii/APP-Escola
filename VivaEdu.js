document.addEventListener("DOMContentLoaded", function () {

    configurarLogin();
    configurarCadastro();
    configurarMostrarSenha();
    carregarUsuario();
    mostrarData();
    carregarStatusAtividades();

});



function configurarLogin() {

    const formulario = document.getElementById("formLogin");

    if (!formulario) return;

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value.trim();
        const mensagem = document.getElementById("mensagemLogin");

        mensagem.textContent = "";
        mensagem.className = "mensagem-login";

        // E-mail fixo
        const emailCorreto = "claracalonassi@escola.pr.gov.br";
        const senhaValida = /^[0-9]{6}$/.test(senha);

        if (email === emailCorreto && senhaValida) {

            localStorage.setItem("vivaeduUsuario", JSON.stringify({
                nome: "Clara Calonassi",
                email: emailCorreto
            }));

            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.className = "mensagem-login sucesso";

            setTimeout(function () {
                window.location.href = "Vinicio.html";
            }, 600);

        } else {
            mensagem.textContent = "E-mail ou senha incorretos!";
            mensagem.className = "mensagem-login erro";
        }
    });
}



function configurarCadastro() {

    const formulario = document.getElementById("formCadastro");

    if (!formulario) return;

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nomeCadastro").value.trim();
        const email = document.getElementById("emailCadastro").value.trim().toLowerCase();
        const senha = document.getElementById("senhaCadastro").value.trim();
        const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
        const mensagem = document.getElementById("mensagemCadastro");

        mensagem.textContent = "";
        mensagem.className = "mensagem-login";

        // Campos vazios
        if (!nome || !email || !senha || !confirmarSenha) {
            mensagem.textContent = "Preencha todos os campos.";
            mensagem.className = "mensagem-login erro";
            return;
        }

        // E-mail escolar
        if (!/^[^\s@]+@escola\.pr\.gov\.br$/i.test(email)) {
            mensagem.textContent = "E-mail incorreto! Use um e-mail @escola.pr.gov.br.";
            mensagem.className = "mensagem-login erro";
            return;
        }

        // Senha 6 dígitos
        if (!/^[0-9]{6}$/.test(senha)) {
            mensagem.textContent = "Senha incorreta! Digite exatamente 6 números.";
            mensagem.className = "mensagem-login erro";
            return;
        }

        // Confirmar senha
        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não são iguais.";
            mensagem.className = "mensagem-login erro";
            return;
        }

        // Salvar conta
        localStorage.setItem("vivaeduConta", JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        }));

        // Deixar logado
        localStorage.setItem("vivaeduUsuario", JSON.stringify({
            nome: nome,
            email: email
        }));

        mensagem.textContent = "Cadastro realizado com sucesso!";
        mensagem.className = "mensagem-login sucesso";

        setTimeout(function () {
            window.location.href = "Vinicio.html";
        }, 600);
    });
}




function configurarMostrarSenha() {

    const botao = document.getElementById("mostrarSenha");
    const senha = document.getElementById("senha");

    if (!botao || !senha) return;

    botao.addEventListener("click", function () {
        senha.type = senha.type === "password" ? "text" : "password";
    });
}



function carregarUsuario() {

    const usuarioSalvo = localStorage.getItem("vivaeduUsuario");
    if (!usuarioSalvo) return;

    try {
        const usuario = JSON.parse(usuarioSalvo);

        const nome = document.getElementById("nomeUsuario");
        const saudacao = document.getElementById("nomeSaudacao");
        const avatar = document.getElementById("avatar");

        if (nome && usuario.nome) {
            nome.textContent = usuario.nome;
        }

        if (saudacao && usuario.nome) {
            saudacao.textContent = usuario.nome.split(" ")[0];
        }

        if (avatar && usuario.nome) {
            avatar.textContent = usuario.nome.charAt(0).toUpperCase();
        }

    } catch (erro) {
        console.log("Erro ao carregar usuário.");
    }
}



function mostrarData() {

    const elemento = document.getElementById("dataAtual");
    if (!elemento) return;

    const hoje = new Date();

    elemento.textContent = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}


function sairSistema() {
    localStorage.removeItem("vivaeduUsuario");
    window.location.href = "VivaEdu.html";
}

function sair() {
    sairSistema();
}

function marcarEntregue(botao) {

    const atividade = botao.closest(".atividade-completa");

    atividade.setAttribute("data-status", "entregue");

    const status = atividade.querySelector(".status");

    status.textContent = "Entregue";
    status.classList.remove("pendente");
    status.classList.add("entregue");

    botao.textContent = "Entregue ✔";
    botao.disabled = true;

    salvarStatusAtividades();

    const filtroAtivo = document.querySelector(".filtro.ativo");

    if (filtroAtivo) {

        if (filtroAtivo.textContent.includes("Pendentes")) {
            filtrarAtividades("pendente", filtroAtivo);
        } else if (filtroAtivo.textContent.includes("Entregues")) {
            filtrarAtividades("entregue", filtroAtivo);
        } else {
            filtrarAtividades("todas", filtroAtivo);
        }

    }

    mostrarAviso("Atividade marcada como entregue!");
}
function salvarStatusAtividades() {

    const atividades = document.querySelectorAll(".atividade-completa");
    const estados = [];

    atividades.forEach(function (atividade) {
        estados.push(atividade.getAttribute("data-status"));
    });

    localStorage.setItem("statusAtividades", JSON.stringify(estados));
}

function carregarStatusAtividades() {

    const dados = JSON.parse(localStorage.getItem("statusAtividades"));

    if (!dados) return;

    const atividades = document.querySelectorAll(".atividade-completa");

    atividades.forEach(function (atividade, indice) {

        if (dados[indice] === "entregue") {

            atividade.setAttribute("data-status", "entregue");

            const status = atividade.querySelector(".status");
            status.textContent = "Entregue";
            status.classList.remove("pendente");
            status.classList.add("entregue");

            const botao = atividade.querySelector(".botao-ver");
            botao.textContent = "Entregue ✔";
            botao.disabled = true;
        }

    });

}

function mostrarAviso(mensagem) {

    const aviso = document.getElementById("notificacaoSistema");

    if (!aviso) {
        alert(mensagem);
        return;
    }

    aviso.textContent = mensagem;
    aviso.classList.add("mostrar");

    setTimeout(function () {
        aviso.classList.remove("mostrar");
    }, 2500);
}
