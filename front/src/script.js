if(localStorage.getItem("token") !== null) {
    var postDiv = document.getElementById('posts');
    let data = "";
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if(this.readyState === 4) {
            console.log(this);
            let response = JSON.parse(this.responseText);

            response.forEach((post) => {
                postDiv.innerHTML += 
                    `<div class="card logged-out">
                        <div class="card-header"> ${post.title} </div>
                            <div class="card-body">
                            <p class="card-text">${post.content} </p>
                        </div>
                    </div>
                    <br>`; 
            });
        }
    });

    xhr.open("GET", "http://localhost:3000/posts/listAllPosts");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

    xhr.send(data);

    document.querySelectorAll('.logged-out').forEach((el) => {
        el.classList.add('d-none');
    });
    document.querySelectorAll('.logged-in').forEach((el) => {
        el.classList.remove('d-none');
    });
}
else {

    window.location.href = "/login.html";

    if(window.location.href = "/login.html") {

        var form = document.getElementById("loginForm");
      
        form.addEventListener("submit", function(event) {
                event.preventDefault();

                var loginMail = document.getElementById("email").value;
                var loginPass = document.getElementById("password").value;
                var loginData = "email=" + loginMail + "&password=" + loginPass;
      
                var XHR = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                    if(this.readyState === 4) {
                        console.log(this);
                        let response = JSON.parse(this.responseText);
                        localStorage.setItem("token", response.token);
                        window.location.href = "/index.html";
                    }
                });
  
                XHR.open("POST", "https://localhost:3000/user/login");
      
                XHR.send(loginData);

        });

    }
    else if(window.location.href = "/register.html") {

        var form = document.getElementById("registerForm");
    
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            var registerMail = document.getElementById("mail").value;
            var registerPass = document.getElementById("password").value;
            var roles = document.getElementById("roles");
            var role = roles.options[roles.selectedIndex].value;

            var registerData = "email=" + registerMail + "&password=" + registerPass + "&role=" + role;
          
            var XHR = new XMLHttpRequest();
      
            XHR.open("POST", "https://localhost:3000/user/register");
          
            XHR.send(registerData);
    
        });

    }

}