var now = new Date()
let activityValue = []
const submitButton = $('button[type="submit"]')
const resetButton = $('button[type="reset"]')
const inputValue = $('form input[type="text"]')

function toggleFormVisibility() {
    const formIsVisible = $("#formContainer").is(":visible");
    if (formIsVisible) {
        $("#formContainer").slideUp();
    } else {
        $("#formContainer").slideDown();
    }
}

function updateListName() {
    let newName = prompt("Digite o novo nome da lista. (Max 20 caracteres)");

    if (newName.length > 20) {
        alert("O nome da lista não pode ter mais de 20 caracteres.");
    } else if (newName.trim() === "") {
        alert("O nome da lista não pode ser vazio.");
    } else {
        $("header div h1").text(newName);
    }
}

function checkInputValue() {
    const inputValue = $('form input[type="text"]').val();
    const input = $('form input[type="text"]');

    if (inputValue.length > 90) {
        alert("O nome da atividade não pode ter mais de 90 caracteres.");
    } else if (activityValue.includes(inputValue)) {
        alert("O nome da atividade já existe.");
    } else if (inputValue.trim() === "") {
        input.val("");
        alert("O nome da atividade não pode ser vazio.");
    } else {
        activityValue.push(inputValue);
        createActivity();
    }
}

function createActivity(){
    let date = now.getDate()
    let month = now.getMonth() +1
    let year = now.getFullYear()
    let hour = now.getHours()
    let minute = now.getMinutes()
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (month < 10) {
        month = '0' + month;
    }

    let activityValue= $('form input[type="text"]').val()
    let idLiNumber = $('li').length + 1
    let idLi = `activity${idLiNumber}`

    let input = $('<input>', {type: 'checkbox'});
    let span = $('<span>', {class: 'disableSelect'});
    let label = $('<label>').append(input, span);
    let h3 = $('<h3>', {class: 'disableSelect', text: activityValue});
    let p = $('<p>', {class: 'disableSelect'}).text(`${date}/${month}/${year} • ${hour}:${minute}`);
    let div = $('<div>').append(h3, p);
    let divContent = $('<div>', {id: 'contentLiContainer'}).append(label, div);
    let trashButton = $('<button>', {id: 'trash', type: 'button'});
    $(trashButton).html('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.32834 4.40172C9.03938 4.37777 8.79595 4.58652 8.77304 4.85869L8.16791 11.9751C8.12812 12.4417 7.72604 12.8 7.25679 12.8H2.74304C2.27379 12.8 1.87172 12.4417 1.83193 11.9751L1.22683 4.85905C1.20334 4.58627 0.958115 4.37734 0.671925 4.40168C0.385375 4.42511 0.178636 4.67007 0.201708 4.94116L0.806821 12.0574C0.88947 13.0303 1.73798 13.8 2.74304 13.8H7.25679C8.26186 13.8 9.11037 13.0303 9.19302 12.0574L9.79813 4.94117C9.8212 4.67009 9.61489 4.42514 9.32834 4.40172ZM2.4854 2.30001H0.714263C0.426438 2.30001 0.199987 2.52768 0.199987 2.80001C0.199987 3.07234 0.426438 3.30001 0.714263 3.30001H9.28558C9.5734 3.30001 9.79985 3.07234 9.79985 2.80001C9.79985 2.52768 9.5734 2.30001 9.28558 2.30001H7.51443L6.9168 0.543C6.84776 0.340253 6.65256 0.200012 6.42847 0.200012H3.57137C3.34728 0.200012 3.15208 0.340253 3.08304 0.543L2.4854 2.30001ZM3.56862 2.30001L3.94294 1.20001H6.05689L6.43122 2.30001H3.56862ZM6.94275 5.60001C6.94275 5.32768 6.7163 5.10001 6.42847 5.10001C6.14065 5.10001 5.91419 5.32768 5.91419 5.60001V10.5C5.91419 10.7723 6.14065 11 6.42847 11C6.7163 11 6.94275 10.7723 6.94275 10.5V5.60001ZM3.05709 5.60001V10.5C3.05709 10.7723 3.28354 11 3.57137 11C3.85919 11 4.08564 10.7723 4.08564 10.5V5.60001C4.08564 5.32768 3.85919 5.10001 3.57137 5.10001C3.28354 5.10001 3.05709 5.32768 3.05709 5.60001Z"/></svg>');
    let li = $('<li>', {id: idLi}).append(divContent, trashButton);

    li.hide();
    $('ul').prepend(li);
    li.slideDown(500);
    $('form input[type="text"]').val('');

    if($('li').length == 1){
        $(`#${idLi}`).addClass('firstLi')
        $('#noActivities').css('display', 'none')
    }else if($('li'.length == 2)){
        $('.firstLi').removeClass('firstLi')
    }
}

function addActivity(e){
    if ($(inputValue).val() == '') {
    }else{
        e.preventDefault();
        checkInputValue();
    }
}

function removeActivity(e){
    let liOfTrash = e.currentTarget.offsetParent;
    let h3ValueOfLi = $(`#${liOfTrash.id} div h3`).text()
    activityValue
    $(liOfTrash).slideUp(300, function(){
        $(liOfTrash).remove();

        let lengthOfList = $('li').length

        if(lengthOfList == 0){
            $('#noActivities').css('display', 'block')
        }else if(lengthOfList == 1){
            $('li').addClass('firstLi')
        }else if($('li'.length > 1)){
            $('.firstLi').removeClass('firstLi')
        }
    })
    activityValue = jQuery.grep(activityValue, function(n) {
        return n!= h3ValueOfLi;
    })
}

function hideForm(){
    $(inputValue).val('');
    $('#formContainer').slideUp();
}

function clickedOverH3 (e){
    let liOfH3 = e.target.offsetParent
    let liSelected = `#${$(liOfH3).attr('id')}`
    let checkboxClicked = $(`${liSelected} label input[type="checkbox"]`)
    let checkOrNot = $(`${liSelected} label input[type="checkbox"]`).prop('checked')

    if(!checkOrNot){
        $(checkboxClicked).prop('checked', true)
        $(`${liSelected} div h3`).css('text-decoration', 'line-through')
    }else{
        $(checkboxClicked).prop('checked', false)
        $(`${liSelected} div h3`).css('text-decoration', 'none')
    }
}

function checkboxClicked(e){
    let liOfH3 = e.target.nextElementSibling.offsetParent.offsetParent
    let liSelected = `#${$(liOfH3).attr('id')}`
    let checkOrNot = $(`${liSelected} label input[type="checkbox"]`).prop('checked')

    if(checkOrNot){
        $(`${liSelected} div h3`).css('text-decoration', 'line-through')
    }else{
        $(`${liSelected} div h3`).css('text-decoration', 'none')
    }
}

$('main header button').click(toggleFormVisibility)

$('header div').click(updateListName)

$(document).on('click', '#trash', removeActivity)

$(submitButton).click(addActivity)

$(resetButton).click(hideForm);

$(document).on('click', 'div h3', clickedOverH3)

$(document).on('click', 'label input[type="checkbox"]', checkboxClicked)

