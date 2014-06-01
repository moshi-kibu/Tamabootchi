![Imgur](http://i.imgur.com/UdLPjuG.png)

##Learning Competencies
Work with full-stack technologies to create a custom web app
Managing the development process

##Summary
This is a tamagotchi-style game which mimics life at Dev Bootcamp by reducing it to three potential actions - code, eat and sleep. =)

The game uses AJAX call-backs which are triggered by click events captured by javascript and jquery. It has a Postgresql database (accessed through Active Record) which it uses to store users' login information and Tamabootchi statuses. The game is built using the Sinatra framework.

The game logic itself is simple - a Tamabootchi cannot code if it is too sleepy or hungry, and sleeping increases hunger and vice versa. The trick of the game is to balance the opposing needs of the Tamabootchi.
     
