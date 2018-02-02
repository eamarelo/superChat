            var socket = io.connect('http://localhost:8080');

            var pseudo = prompt('Quel est votre pseudo ?');
            socket.emit('new_constumer', pseudo);
            document.title = pseudo + ' - ' + document.title;

            socket.on('message', function(data) {
                insereMessage(data.pseudo, data.message)
            })

            socket.on('new_constumer', function(pseudo) {
                $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
            })

            
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val();
                socket.emit('message', message, pseudo); 
                insereMessage(pseudo, message); 

                $('#message').val('').focus(); 
                return false; 
            });
            
            function insereMessage(pseudo, message) {
                $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
            }