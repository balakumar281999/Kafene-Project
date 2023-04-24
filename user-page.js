$(document).ready(function(){
    let MenuItem = document.getElementsByClassName('MenuItem');
    MenuItem[2].classList.add('active-MenuItem');
    
    var searchContainer = document.getElementById('searchContainer');
    searchContainer.onsubmit = function(e){
        e.preventDefault();
    }
    function  renderuserRows(rowData){
        let id = $('<td>').html(rowData.id);
        let userimage = $('<img>').attr('src',rowData.profilePic)
        let userAvatar = $('<td>').append(userimage)
        let userName = $('<td>').html(rowData.fullName);
        let formatDate = rowData.dob.split('-');
        let dob = $('<td>').html(formatDate[0] + " " + formatDate[1] + ", " + formatDate[2] + '<br>').attr('class','primary-text');
        let gender = $('<td>').html(rowData.gender);
        let currentLocation = $('<td>').html(rowData.currentCity + ', ' + rowData.currentCountry);
        let tr = $('<tr>').append(id,userAvatar,userName,dob,gender,currentLocation);

        return tr;
    }

    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users',function(userData){
        console.log(userData)
        for(let i = 0; i<userData.length;i++){
            $('#userRows').append(renderuserRows(userData[i]));
        }
    })
    
    let searchBox = document.getElementById('searchBox');
    searchBox.onkeyup = function(){
        let filter = searchBox.value.toUpperCase();
        let table = document.getElementById('userRows')
        let userRow = table.getElementsByTagName("tr");
        for (i = 0; i < userRow.length; i++){
            let td = userRow[i].getElementsByTagName("td")[2];
            if (td) {
                let tdTxtValue = td.textContent || td.innerText;
                if (tdTxtValue.toUpperCase().indexOf(filter) > -1){
                    userRow[i].style.display = "";
                } 
                else{
                    userRow[i].style.display = "none";
                }
            }
        }       
    }
    let resetBtn = document.getElementById('resetBtn');
    resetBtn.onclick = function(){
        let table = document.getElementById('userRows')
        let userRow = table.getElementsByTagName("tr");
        for(let i = 0;i<userRow.length;i++){
            userRow[i].style.display = 'table-row';
        }
    }
})