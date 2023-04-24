$(document).ready(function(){
    let MenuItem = document.getElementsByClassName('MenuItem');
    MenuItem[1].classList.add('active-MenuItem');

    function  renderProductRows(rowData){
        let id = $('<td>').html(rowData.id);
        let productName = $('<td>').html(rowData.medicineName).attr('class','primary-text');
        let productBrand = $('<td>').html(rowData.medicineBrand)
        let formatDate = rowData.expiryDate.split('-');
        let expiryDate = $('<td>').html(formatDate[0] + " " + formatDate[1] + ", " + formatDate[2] + '<br>').attr('class','primary-text');
        let unitPrice = $('<td>').html("$" + rowData.unitPrice);
        let stock = $('<td>').html(rowData.stock);
        let tr = $('<tr>').append(id,productName,productBrand,expiryDate,unitPrice,stock);

        return tr;
    }

    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products',function(productData){
        console.log(productData)
        for(let i = 0; i<productData.length;i++){
            $('#productRows').append(renderProductRows(productData[i]));
        }
    })
    let rowCounter = document.getElementById('rowCount');
    let productExpired = document.getElementsByName('productExpired');
    productExpired[0].onclick = function(){
        let table = document.getElementById('productRows')
        let userRow = table.getElementsByTagName("tr");
        for (i = 0; i < userRow.length; i++){
            let td = userRow[i].getElementsByTagName("td")[3];
            let todayDate = new Date().getFullYear()
            console.log(todayDate)
            if (td) {
                let tdTxtValue = td.textContent || td.innerText;
                if (tdTxtValue.split(',')[1] < todayDate){
                    if(productExpired[0].checked == true){
                        userRow[i].style.display = "";
                    }
                    else{
                        userRow[i].style.display = "none";
                    }
                }
            }
        }
        let rowCount = 0;
        for(j = 0;j<userRow.length; j++){
            if(userRow[j].style.display == 'none'){
                ;
            }
            else{
                rowCount++;
            }
        }
        rowCounter.innerText = "Count: " + rowCount 
    }
    
    let productStock = document.getElementsByName('productStock');
    productStock[0].onclick = function(){
        let table = document.getElementById('productRows')
        let userRow = table.getElementsByTagName("tr");
        for (i = 0; i < userRow.length; i++){
            let td = userRow[i].getElementsByTagName("td")[5];
            if (td) {
                let tdTxtValue = td.textContent || td.innerText;
                if (tdTxtValue < 100){
                    if(productStock[0].checked == true){
                        userRow[i].style.display = "";
                    }
                    else{
                        userRow[i].style.display = "none";
                    }
                }
            }
        }
        let rowCount = 0;
        for(j = 0;j<userRow.length; j++){
            if(userRow[j].style.display == 'none'){
                ;
            }
            else{
                rowCount++;
            }
        }
        rowCounter.innerText = "Count: " + rowCount 
    }
})