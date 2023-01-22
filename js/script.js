let username = '';
let usernameAPI;
let messageList = []
let typedMessage

function getMessagesAtServer () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(getMessagesSucess)
    promise.catch(getMessagesError)
}

function getMessagesSucess (res) {
    console.log('Deu certo')
    messageList = res.data
    loadingMessages()
}

function getMessagesError() {
    console.log('Deu ruim no getMessages')
}

function validatingUsername(){
username = prompt("Qual o seu nome de usuário?");
usernameAPI = {name: username};
console.log(usernameAPI);
const validatingUsernameAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usernameAPI);
validatingUsernameAPI.then(sucessProcessName);
validatingUsernameAPI.catch(errorProcessName);
}

function joiningMessage() {
    const messageJoining = {from: username, to: 'Todos', text: "entra na sala...", type: 'status'};
    const messageJoiningAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageJoining);
    messageJoiningAPI.then(joiningMessageSucess)
    messageJoiningAPI.catch(joiningMessageError)
}

function joiningMessageSucess() {
    console.log('Mensagem de joining foi um sucesso')
    getMessagesAtServer()
}

function joiningMessageError() {
    console.log('Deu ruim no joining')
}

function leavingMessage() {
    const messageLeaving = {from: username, to: 'Todos', text: "sai na sala...", type: 'status'};
    const messageLeavingAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageLeaving);
    messageLeavingAPI.then(leavingMessageSucess)
    messageLeavingAPI.catch(leavingMessageError)
}

function leavingMessageSucess() {
    console.log('Mensagem de leaving foi um sucesso')
    getMessagesAtServer()
}

function leavingMessageError() {
    console.log('Deu ruim no leaving')
}


validatingUsername()


function sucessProcessName() {
    console.log('Você entrou, parabéns');
    joiningMessage();
    getMessagesAtServer()
    setInterval(getMessagesAtServer, 3000)
}

function errorProcessName() {
    console.log('ERRO');
    alert("Nome de usuário já utilizado, tente outro nome");
    validatingUsername();
}

function userStatus() {
    const userStatusAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usernameAPI);
    userStatusAPI.then(userIsOn);
    userStatusAPI.catch(userIsOff);
}

setInterval (userStatus, 5000)

function userIsOn() {
    console.log('Você esta online');
}

function userIsOff() {
    console.log('Deu muito ruim')
    leavingMessage()
}

function sendMessage() {
    typedMessage = document.querySelector('input').value
    const messageWritten = {from: username, to: 'Todos', text: typedMessage, type: 'message'}
    const messageWrittenAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageWritten)
    document.querySelector('input').value = ''
    messageWrittenAPI.then(sendMessageSucess)
    messageWrittenAPI.catch(sendMessageError)
}

function sendMessageSucess() {
    console.log('Mensagem enviada')
    getMessagesAtServer()
}

function sendMessageError() {
    console.log('Mensagem não enviada')
    window.location.reload()
}

function loadingMessages() {
    const messages = document.querySelector('ul')
    messages.innerHTML = ''
    let template
    for(let i=0; i<messageList.length; i++) {
        if (messageList[i].type === 'status') {
            template = `<li class="chat-box-joining" data-test="message"><div><span class="time">${messageList[i].time} </span><span class="user">${messageList[i].from}</span> ${messageList[i].text}</div>
        </li>`  
        } else if (messageList[i].type === 'message') {
            template = `<li class="chat-box-public" data-test="message"><div><span class="time">${messageList[i].time} </span><span class="user">${messageList[i].from}</span> para <span class="user">${messageList[i].to}</span> ${messageList[i].text}</div>
            </li>`
        } else if (messageList[i].to === username){
            template = `<li class="chat-box-private" data-test="message"><div><span class="time">${messageList[i].time} </span><span class="user">${messageList[i].from}</span> para <span class="user">${messageList[i].to}</span> ${messageList[i].text}</div>
            </li>`
        }
    messages.innerHTML = messages.innerHTML + template
    }
}




