let names = []
function Name(){
resposta = {name: prompt("Qual o seu nome de usuário?")}


const joining = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', resposta)
joining.then(sucessProcessName);
joining.catch(errorProcessName);}

Name()

function sucessProcessName(opa) {
    console.log('Você entrou, parabéns')
    console.log(opa)
}
function errorProcessName() {
    console.log('ERRO')
    alert("Nome de usuário já utilizado, tente outro nome")
    Name()
}
function get() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promessa.then(processarResposta)
}
function processarResposta(resposta) {
	console.log(resposta.data);
}
setInterval (get, 5000)

