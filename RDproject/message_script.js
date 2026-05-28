
document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById("messages");
    const input = document.getElementById("input");
    const usernameInput = document.getElementById("username");

   
    let messages = JSON.parse(localStorage.getItem("chat")) || [];
    

    usernameInput.value = localStorage.getItem("username") || "";


    function renderMessages() {
        const myName = usernameInput.value.trim();
        messagesDiv.innerHTML = "";

        messages.forEach(msg => {
            const div = document.createElement("div");
           
            div.className = "message " + (msg.name === myName ? "me" : "other");

            div.innerHTML = `
                <b>${msg.name}</b><br/>
                ${msg.text}
                <div class="time">${msg.time}</div>
            `;
            messagesDiv.appendChild(div);
        });

   
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function getTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0");
    }


    window.sendMessage = function() {
        const text = input.value.trim();
        const name = usernameInput.value.trim();

        if (!name) {
            alert("Пожалуйста, введите своё имя в поле профиля (внизу)");
            usernameInput.focus();
            return;
        }

        if (!text) return;

        const message = { 
            name: name, 
            text: text, 
            time: getTime() 
        };

        messages.push(message);
        localStorage.setItem("chat", JSON.stringify(messages));

        input.value = "";
        renderMessages();
    };


    usernameInput.addEventListener("change", () => {
        localStorage.setItem("username", usernameInput.value);
        renderMessages();
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            window.sendMessage();
        }
    });

    renderMessages();
});