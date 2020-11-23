function AdicionarDiv(x) {
    var cont = AddCount(x);
    console.log("Valor cont: " + cont);
    console.log($("form").find("#entradaCPF").val());
    var cpfValue = $("form").find("#entradaCPF").val();
    var nomeValue = $("form").find("#entradaNome").val();

    if (cpfValue == "") {
        alert("Por favor, preencha o campo CPF");
    }
    else if (cpfValue.length != 14) {
        alert("CPF com tamanho invalido");
    }
    else if (!TestaCPF(cpfValue)) {
        alert("CPF com digito inválido");
    }
    else if (nomeValue == "") {
        alert("Por favor, preencha o campo nome");
    }
    else {

        $('#formulario').append('<div class="row"><div class="form-group col-sm-4" id="campoCPF-' + cont + '"><input type="text" name="CPFBen-' + cont + '" id="CPFBen" placeholder="CPF:" value="' + cpfValue + '" style="border: none;" disabled></div> <div class="form-group col-sm-4" id="campoNome-' + cont + '"><input type="text" name="NomeBen-' + cont + '" id="NomeBen" placeholder="Nome:" value="' + nomeValue + '" disabled style="border: none;"></div> <div class="form-group col-sm-4" id="campoBotoes-' + cont + '"><button type="button" id="Alt-1" name="Alterar" class="btn btn-sm btn-primary btn-apagar" onclick="Habilitar(' + cont + ')"> Alterar </button> <button type="button" id="' + cont + '" class="btn btn-sm btn-danger btn-apagar" onclick="ExcluirDiv(' + cont + ')"> Excluir </button></div><div class="w-100"></div></div>');

        $("form").find("#entradaCPF").val("");
        $("form").find("#entradaNome").val("");
        document.getElementById("add-campo").innerHTML = "Incluir";
        var btnAlterar = document.getElementsByName("Alterar");
        for (var i = 0; i < btnAlterar.length; i++) {
            btnAlterar[i].disabled = false;
        }
    }
}


function AddCount(x) {

    console.log("valor count " + count);
    console.log("valor pametro: " + x);

    if (x > count) {
        count = x;
    }
    else {
        count++;
    }
    return count;
}

function Habilitar(id) {
    console.log("Habilitar id: " + id);
    var cpfBen = document.getElementsByName("CPFBen-" + id + "")[0].value;
    console.log(cpfBen);

    var nomeBen = document.getElementsByName("NomeBen-" + id + "")[0].value;
    console.log(nomeBen);

    //var btnAlterar = $("form").find('input[id="Alt-1"]').map(function () {
    //    return $(this);
    //}).get();

    var btnAlterar = document.getElementsByName("Alterar");
    for (var i = 0; i < btnAlterar.length; i++) {
        btnAlterar[i].disabled = true;
    }
   
    //btnAlterar.disabled = true;
    document.getElementById("add-campo").innerHTML = "Salvar";

    $("form").find("#entradaCPF").val(cpfBen);
    $("form").find("#entradaNome").val(nomeBen);
    ExcluirDiv(id);
};

function ExcluirDiv(id) {
    console.log(id);
    console.log($('#campoCPF-' + id + ''));
    console.log($('#campoNome-' + id + ''));
    console.log($('#campoBotoes-' + id + ''));
    $('#campoCPF-' + id + '').remove();
    $('#campoNome-' + id + '').remove();
    $('#campoBotoes-' + id + '').remove();
}

jQuery(function ($) {
    $("#CPF").mask("999.999.999-99");
    $("#CEP").mask("99999-999");
    $("#Telefone").mask("(99)99999-9999");
    $("#CPFBen").mask("999.999.999-99");
    $("#entradaCPF").mask("999.999.999-99");
});

$(document).ready(function () {
    $(".modal-dialog").css("width", "50%");
});

function TestaCPF(strCPF) {
    strCPF = strCPF.replaceAll('.', '');
    strCPF = strCPF.replaceAll('-', '');
    console.log(strCPF);
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

