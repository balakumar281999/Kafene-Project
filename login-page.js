$(document).ready(function(){
    var form = document.getElementById('SigIn-Form');
    form.onsubmit = function(e){
        e.preventDefault();
    }
    var username = document.getElementById('SigIn_Input_UserName');
    var password = document.getElementById('SigIn_Input_Password');
    var loginBtn = document.getElementById('SignIn_Btn');
    loginBtn.onclick = function(){
        if(username.value == password.value){
            alert('Login Successfully');
            localStorage.setItem('isLogedIn',true);
            var obj = {
                username : username.value,
                password : password.value,
            }
            localStorage.setItem('userInfo',JSON.stringify(obj));
            location.assign('./orders-page.html');
        }
        else{
            alert('Please enter valid credential!');
        }
    }
})