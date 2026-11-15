const contacts = document.querySelectorAll(".conversation");

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