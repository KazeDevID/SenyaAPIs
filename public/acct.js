function Login(){

    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;
    
        if(user == "Admin" && password == "1234"){
                    location.href = "api.html";
                    console.log("nice");
        }
        
    }