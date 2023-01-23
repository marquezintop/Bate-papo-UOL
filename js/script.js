let username = null;
let usernameAPI;
let messageList = [];
let typedMessage;
const typedMessageEnter  = document.querySelector('.message-written');
const typedUsernameEnter = document.querySelector('.login-name');

function getMessagesAtServer () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(getMessagesSucess);
    promise.catch(getMessagesError);
}

function getMessagesSucess (res) {
    console.log('Deu certo');
    messageList = res.data;
    loadingMessages();
}

function getMessagesError() {
    console.log('Deu ruim no getMessages');
}

function validatingUsername(){
username = document.querySelector('.login-name').value;
usernameAPI = {name: username};
console.log(usernameAPI);
const validatingUsernameAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usernameAPI);
validatingUsernameAPI.then(sucessProcessName);
validatingUsernameAPI.catch(errorProcessName);
}

typedUsernameEnter.addEventListener("keypress", function(keyPressed) {
    if (keyPressed.key === "Enter") {
      keyPressed.preventDefault();
      document.querySelector(".enter-login").click();
    }
  });

function sucessProcessName() {
    console.log('Você entrou, parabéns');
    document.querySelector('.login-screen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    getMessagesAtServer();
    setInterval(getMessagesAtServer, 3000);
    setInterval (userStatus, 5000);
}

function errorProcessName() {
    console.log('ERRO');
    if (username === null || username === undefined || username === '') {
        alert("Nome vazio, por favor escreva o seu nome abaixo");
    } else {
    alert("Nome de usuário já utilizado, tente outro nome");
    document.querySelector('input').value = '';
    }
}

function userStatus() {
    const userStatusAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usernameAPI);
    userStatusAPI.then(userIsOn);
    userStatusAPI.catch(userIsOff);
}

function userIsOn() {
    console.log('Você esta online');
}

function userIsOff() {
    console.log('Deu muito ruim');
    leavingMessage();
}

function sendMessage() {
    typedMessage = document.querySelector('.message-written').value;
    const messageWritten = {from: username, to: 'Todos', text: typedMessage, type: 'message'};
    const messageWrittenAPI = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageWritten);
    document.querySelector('.message-written').value = '';
    messageWrittenAPI.then(sendMessageSucess);
    messageWrittenAPI.catch(sendMessageError);
}

typedMessageEnter.addEventListener("keypress", function(keyPressed) {
    if (keyPressed.key === "Enter") {
      keyPressed.preventDefault();
      document.getElementById("btn").click();
    }
  });

function sendMessageSucess() {
    console.log('Mensagem enviada');
    getMessagesAtServer();
}

function sendMessageError() {
    console.log('Mensagem não enviada');
    window.location.reload();
}

function loadingMessages() {
    const messages = document.querySelector('ul');
    messages.innerHTML = '';
    let template;
    for(let i=0; i<messageList.length; i++) {
        if (messageList[i].type === 'status') {
            template = `<li class="chat-box-joining" data-test="message">
            <div>
            <span class="time">${messageList[i].time} </span>
            <span class="user">${messageList[i].from}</span> 
            ${messageList[i].text}
            </div>
        </li>`;
        } else if (messageList[i].type === 'message') {
            template = `<li class="chat-box-public" data-test="message">
            <div>
            <span class="time">${messageList[i].time} </span>
            <span class="user">${messageList[i].from}</span> 
            para <span class="user">${messageList[i].to}</span>: 
            ${messageList[i].text}
            </div>
            </li>`;
        } else if (messageList[i].to === username || messageList[i].from === username){
            template = `<li class="chat-box-private" data-test="message">
            <div>
            <span class="time">${messageList[i].time} </span>
            <span class="user">${messageList[i].from}</span> 
            para <span class="user">${messageList[i].to}</span>: 
            ${messageList[i].text}
            </div>
            </li>`;
        } else if (messageList[i].to !== username || messageList[i].from === username) {
            template = '';
        }
    messages.innerHTML = messages.innerHTML + template;
}
    
    messages.lastChild.scrollIntoView();
}




