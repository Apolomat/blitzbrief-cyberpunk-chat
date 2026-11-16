const contacts = document.querySelectorAll(".conversation");
const messageInp = document.querySelector("#sender-message-input");
const messageHistory = document.querySelector(".messages");

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

messageInp.addEventListener("keydown", (e) => {
    let inputText = messageInp.value;
    let now = new Date();
    let time = now.toLocaleTimeString();
    let date = now.toLocaleDateString();

    if(e.key === "Enter") {
        e.preventDefault();
        const newMsg = document.createElement("article");
        newMsg.classList.add("message", "sender");
        newMsg.innerHTML = `
        <div class="message-content">
            <div class="message-meta" data-time="${time}" data-date="${date}">
                <span>You</span><time>2:30 PM</time>
            </div>
            <div class="bubble">${inputText}</div>
        </div>
        `;
        
        messageInp.value = '';
        messageHistory.appendChild(newMsg);
    }
    
});