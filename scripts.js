//Fazendo o relógio funcionar
setInterval(() => {var horario = document.getElementById('relogio')
var data = new Date()
var hora = data.getHours()
var minuto = data.getMinutes()
minuto = String(minuto).padStart(2, '0')

horario.innerHTML = `${hora}:${minuto}`
    
}, 1000)

//Selecionando os Icones
var desktopIcon = document.querySelectorAll('.desktop-icon')

desktopIcon.forEach(function(icon){
    icon.addEventListener('click', function(){
        this.classList.toggle('selected')
    })
})

//movendo os icones
$(".desktop-icon").draggable({
    containment: ".area-de-trabalho",
    stop: function(){
        $(this).removeClass('selected');
        $(this).addClass('selected');
    }
});

//abrindo a tela iniciar
function iniciar(){
    let elemento = document.getElementById('menu-iniciar');
    if (elemento.style.display === "block"){
        elemento.style.display = "none";
    } else{
        elemento.style.display = "block";
    }
}

//fechando iniciar ao clicar na area de trabalho
function fecharIniciar(){
    let elemento = document.getElementById('menu-iniciar');
    elemento.style.display = "none";
}

//funcao para abrir janela
function abrirJanela(janela){
    let elemento = document.getElementById(janela);
    let statusIniciar = document.getElementById('menu-iniciar');

        fecharIniciar();

    if (elemento.style.display === "none" || elemento.style.display === "")
        elemento.style.display = "flex";
}

$(function() {
    let zIndexAtual = 100;

    // 1. Tornar as janelas arrastáveis
    $(".janela").draggable({
        handle: ".topo-janela", // Só arrasta se puxar pelo topo
        containment: "#windowsXP", // Não deixa sair da tela
        start: function() {
            focarJanela($(this));
        }
    });

    // 2. Função para trazer a janela para frente (z-index)
    function focarJanela(janela) {
        zIndexAtual++;
        janela.css("z-index", zIndexAtual);
    }

    // Ao clicar em qualquer lugar da janela, ela vem para frente
    $(".janela").mousedown(function() {
        focarJanela($(this));
    });

    // 3. Lógica dos botões (Fechar)
    $(".botao-fechar").click(function() {
        $(this).closest(".janela").hide();
    });

    // 4. Lógica de Maximizar (Simples)
    $(".botao-maximizar").click(function() {
        let janela = $(this).closest(".janela");

        if(!janela.hasClass("maximizada")){
            janela.data("original", {
                width: janela.css("width"),
                height: janela.css("height"),
                top: janela.css("top"),
                left: janela.css("left"),
            });
        }

        let original = janela.data("original");

        if (janela.hasClass("maximizada")) {
            janela.css(original);
            janela.removeClass("maximizada");
        } else {
            janela.css({width: "100vw", height: "calc(100vh - 40px)", top: "0", left: "0"});
            janela.addClass("maximizada");
        }
    });
});