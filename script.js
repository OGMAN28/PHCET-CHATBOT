document.addEventListener('DOMContentLoaded', function() {
    var chatBox = document.querySelector('.chatbox');
    var userInput = document.querySelector('.chat-input textarea');
    var sendBtn = document.getElementById('send-btn');
    var chatbot = document.querySelector('.chatbot');
    var chatbotToggler = document.querySelector('.chatbot-toggler');
    var closeBtn = document.querySelector('.close-btn');
    var intentsData;

    // Load intents data from intents.json
    fetch('intents.json')
        .then(response => response.json())
        .then(data => {
            intentsData = data.intents;
        })
        .catch(error => {
            console.error('Error loading intents data:', error);
        });

    // Function to toggle chatbot
    chatbotToggler.addEventListener('click', function() {
        chatbot.classList.toggle('open');
    });

    // Function to close chatbot
    closeBtn.addEventListener('click', function() {
        chatbot.classList.remove('open');
    });

    sendBtn.addEventListener('click', function() {
        var userMessage = userInput.value.trim();
        if (userMessage !== '') {
            displayMessage('' + userMessage);
            var botResponse = getResponse(userMessage);
            displayBotResponse(botResponse);
            userInput.value = '';
        }
    });

    function displayMessage(message) {
        var userMessageContainer = document.createElement('li');
        userMessageContainer.classList.add('chat', 'outgoing');
    
        // Create a container for the message text
        var messageContainer = document.createElement('div');
        var userIcon = '<span class="material-symbols-outlined">person</span>'; // Replace 'your_icon_here' with the desired icon
        messageContainer.innerHTML = userIcon;
    
        // Append the message to the container
        messageContainer.innerHTML += message;
    
        // Append the container to the chat message
        userMessageContainer.appendChild(messageContainer);
    
        chatBox.appendChild(userMessageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    

    function displayBotResponse(response) {
        var formattedResponse = response.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        var chatMessage = document.createElement('li');
        chatMessage.classList.add('chat', 'incoming');
    
        // Create a container for the message text
        var messageContainer = document.createElement('div');
        var botIcon = '<span class="material-symbols-outlined">smart_toy</span>'; // Replace 'your_icon_here' with the desired icon
        messageContainer.innerHTML = botIcon;
    
        // Append the formatted response to the container
        messageContainer.innerHTML += formattedResponse;
    
        // Append the container to the chat message
        chatMessage.appendChild(messageContainer);
    
        chatBox.appendChild(chatMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    

    function getResponse(input) {
        if (!intentsData) {
            return "I'm still learning. Please try again later.";
        }

        var response = "I'm sorry, I didn't understand that."; // Default response for unrecognized input

        // Loop through intents data to find a matching pattern
        for (var i = 0; i < intentsData.length; i++) {
            var intent = intentsData[i];
            if (intent.patterns && Array.isArray(intent.patterns)) {
                for (var j = 0; j < intent.patterns.length; j++) {
                    var pattern = new RegExp(intent.patterns[j], 'i');
                    if (pattern.test(input)) {
                        response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                        break;
                    }
                }
            }
        }
        return response;
    }
});
