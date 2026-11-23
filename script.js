const contacts = document.querySelectorAll(".conversation");
const messageInp = document.querySelector("#sender-message-input");
const messageHistory = document.querySelector(".messages");
const fullframe = document.querySelector(".fullframe");
const prfSettingsBtn = document.getElementById("prf-sttgs-btn");
const prfSettingsPopup = document.getElementById("prf-sttgs-popup");
const prfSttgsBtnClose = document.getElementById("prf-sttgs-popup-close");
const sendBtn = document.getElementById("main-sendBtn");

// Função para enviar uma mensagem, definindo a base dela e o conteúdo de texto.
function sendMessage() {

    const inputText = messageInp.value.trim();

    if(!inputText) {
        return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    });
    const date = now.toLocaleDateString();

    const newMsg = document.createElement("article");
        newMsg.classList.add("message", "sender");
        newMsg.innerHTML = `
        <div class="message-content">
            <div class="message-meta" data-time="${time}" data-date="${date}">
                <span>You</span><time>${time}</time>
            </div>
        </div>
        `;

        const bubble = document.createElement("div");

        bubble.classList.add("bubble");
        bubble.textContent = inputText;
        newMsg.querySelector(".message-content").appendChild(bubble);
        
        messageInp.value = '';
        messageHistory.appendChild(newMsg);

        messageHistory.scrollTop = messageHistory.scrollHeight;

}

function displayOnClick(clickElement, targetElement, displayType) {

    // Minha função está checando todos os erros possíveis antes de executar o código de verdade, 
    // isso previne qualquer comportamento não desejado. :)
    if (!(clickElement instanceof HTMLElement)) {
        console.log("Example of usage: displayOnClick(Element to be clicked, element to be affected, display type);");
        throw new TypeError('Expected an HTML element for "clickElement"');
    }
    
    if (!(targetElement instanceof HTMLElement)) {
        console.log("Example of usage: displayOnClick(Element to be clicked, element to be affected, display type);");
        throw new TypeError('Expected an HTML element for "targetElement"');
    }
    
    if (typeof displayType !== 'string') {
        console.log("Example of usage: displayOnClick(Element to be clicked, element to be affected, display type);");
        throw new TypeError('Expected a string for "displayType"');
    }

    // Isso define os tipos de display permitidos, assim ao usar a função, não permite colocar algo inválido no meio,
    // tipo displayOnClick(Aelement, Belement, banana);
    const validDisplays = ["flex", "none", "grid", "block", "inline", "inline-block", "inline-flex", "inline-grid", "inline-table", "table", "contents"];
    
    if (!validDisplays.includes(displayType)) {
        throw new TypeError('Invalid display type. Try "flex", "none", "grid", "block", "inline" or other.');
    }

    clickElement.addEventListener("click", () => {
        targetElement.style.display = displayType;
    });

}

// Funcionalidade visual, ao clicar nos contatos, deixa o selecionado com o estilo "active" e os outros sem nada. Ao clicar com o botão direito em um contato, o contato é definido como "não lido".
contacts.forEach((contact) => {
    contact.addEventListener("click", (e) => {
        const conversationClicked = e.target.closest(".conversation");
        const unreadSign = contact.querySelector(".unread-sign");

        contacts.forEach((contact) => {
            contact.classList.remove("active");
        });

        if(conversationClicked && unreadSign) {
            unreadSign.remove();
        }

        contact.classList.add("active");

        console.log(e);
    });

    contact.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const conversationClicked = e.target.closest(".conversation");
        const unreadSignSpan = `
            <span class="unread-sign" aria-label="Unread message"></span>
        `;
        const unreadSign = contact.querySelector(".unread-sign");
        const conversationBottom = conversationClicked.querySelector(".conversation-bottom");
        
        if(!unreadSign) {
            conversationBottom.innerHTML += unreadSignSpan;
        }
    });
});

// Event Listener para enviar a mensagem ao apertar Enter.
messageInp.addEventListener("keydown", (e) => {

    if(e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();
    }
    
});

// Envia a mensagem ao clicar no botão de envio.
sendBtn.addEventListener("click", sendMessage);

// Ao apertar "Alt + P", adiciona um scroll no site inteiro, permitindo ver as coisas caso estejam além da área principal do site.
document.addEventListener("keydown", (e) => {

    if(e.altKey && e.code === 'KeyP') {
        e.preventDefault();
        
        fullframe.classList.toggle("fullframe-scroll");
    }
    
});

// Ao clicar no botão de configurações do perfil, deixa o popup visível.
displayOnClick(prfSettingsBtn, prfSettingsPopup, "flex");

// Ao clicar no botão de fechar, deixa o popup invisível.
displayOnClick(prfSttgsBtnClose, prfSettingsPopup, "none");

/*****************************************************************************************************
 * [Prioridade é definida pela ordem e por números depois do TO DO] 
 TO DO (1): Adicionar a funcionalidade das configurações do perfil (e.g., "Alterar o nome de usuário", "Alterar tamanho da fonte", "Alterar o tema do site").
 TO DO (3): Adicionar funcionalidade de trocar conversas, não apenas o visual.
 TO DO (3): Salvar as conversas em um objeto ou JSON.
****************************************************************************************************/