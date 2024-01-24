

$('main header button').click(() => {
    const checker = $('#formContainer').is(':visible')
    if (checker) {
        $('#formContainer').slideUp()
    } else {
        $('#formContainer').slideDown()
    }
})

$('#pencilEditor').click(() => {
    let promptValue = prompt('Digite o novo nome da lista. (Max 20 caracteres)')
    if (promptValue.length > 20) {
        alert('O nome da lista não pode ter mais de 20 caracteres.')
    }else if (promptValue.length === 0) {
        alert('O nome da lista não pode ser vazio.')
    }else {
        $('header div h1').text(promptValue)
    }
})
