let timeStart = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerInterval = null;  // Para armazenar o intervalo do timer

// Função para formatar o tempo (ex: 1 -> 01)
function fomateTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Função para converter hora, minuto e segundo para total de segundos
function convertToTotalSeconds() {
    return (hours * 3600) + (minutes * 60) + seconds;
}

// Função para atualizar os inputs com o tempo formatado
function updateInputs() {
    document.getElementById("hour").value = fomateTime(hours);
    document.getElementById("min").value = fomateTime(minutes);
    document.getElementById("sec").value = fomateTime(seconds);
}

// Função para mostrar apenas os segundos quando o tempo estiver abaixo de 10 segundos
function updateDisplayForLast10Seconds() {
    if (hours === 0 && minutes === 0 && seconds <= 10 && seconds > 0) {
        document.getElementById("hour").style.display = "none";
        document.getElementById("min").style.display = "none";
    } else {
        document.getElementById("hour").style.display = "inline-block";
        document.getElementById("min").style.display = "inline-block";
    }
}


// Função de contagem regressiva
function countdown() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
    } else {
        clearInterval(timerInterval);  // Parar o timer quando chegar a zero
        
        // Mostrar a mensagem de "Tempo esgotado!" na tela
        document.getElementById("timerExpiredMessage").style.display = "block";

        // Tocar o áudio quando o tempo chegar a zero
        var audio = document.getElementById("audio");
        audio.play().catch(function(error) {
            console.log("Erro ao tentar tocar o áudio: ", error);
        });
    }

    // Atualiza os valores dos inputs e a lógica de exibição para os últimos 10 segundos
    updateInputs();
    updateDisplayForLast10Seconds();
}


// Função para iniciar o timer
document.getElementById("start").addEventListener("click", () => {
    if (!timeStart) {
        // Pega os valores dos inputs 
        hours = parseInt(document.getElementById("hour").value) || 0;
        minutes = parseInt(document.getElementById("min").value) || 0;
        seconds = parseInt(document.getElementById("sec").value) || 0;

        // Converte para total de tempo 
        if (hours > 0 || minutes > 0 || seconds > 0) {
            timeStart = true;
            document.getElementById("hour").disabled = true;
            document.getElementById("min").disabled = true;
            document.getElementById("sec").disabled = true;

            // Começa contagem regressiva
            timerInterval = setInterval(countdown, 1000);
        } else {
            alert("Por favor, defina um tempo válido.");
        }
    }
});

// Função para pausar 
document.getElementById("pause").addEventListener("click", () => {
    if (timeStart) {
        timeStart = false;
        clearInterval(timerInterval); 
        document.getElementById("hour").disabled = false;
        document.getElementById("min").disabled = false;
        document.getElementById("sec").disabled = false;
    }
});

// Função de validação dos inputs (limitar valores)
document.getElementById("hour").addEventListener("input", function () {
    validateInput(this, 99);
});

document.getElementById("min").addEventListener("input", function () {
    validateInput(this, 59);
});

document.getElementById("sec").addEventListener("input", function () {
    validateInput(this, 59);
});

// Função para validar se o valor não excede o máximo
function validateInput(input, max) {
    if (input.value > max) {
        input.value = max;
    }
}




