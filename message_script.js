// Оборачиваем в DOMContentLoaded, чтобы скрипт начал работу только когда весь HTML загрузится
document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById("messages");
    const input = document.getElementById("input");
    const usernameInput = document.getElementById("username");

    // Загружаем данные
    let messages = JSON.parse(localStorage.getItem("chat")) || [];
    
    // Подтягиваем сохраненное имя
    usernameInput.value = localStorage.getItem("username") || "";

    // Функция отрисовки
    function renderMessages() {
        const myName = usernameInput.value.trim();
        messagesDiv.innerHTML = "";

        messages.forEach(msg => {
            const div = document.createElement("div");
            // Проверка: если имя совпадает — красим в зеленый (me), если нет — в серый (other)
            div.className = "message " + (msg.name === myName ? "me" : "other");

            div.innerHTML = `
                <b>${msg.name}</b><br/>
                ${msg.text}
                <div class="time">${msg.time}</div>
            `;
            messagesDiv.appendChild(div);
        });

        // Авто-прокрутка вниз
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function getTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0");
    }

    // Сделаем функцию доступной для onclick в HTML
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

    // Слушатели событий
    usernameInput.addEventListener("change", () => {
        localStorage.setItem("username", usernameInput.value);
        renderMessages();
    });

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            window.sendMessage();
        }
    });

    // Первый запуск отрисовки
    renderMessages();
});