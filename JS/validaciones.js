document.addEventListener('DOMContentLoaded', () => {
    var txt1 = document.getElementById('txtTituloEstudio');
    var txt2 = document.getElementById('txtDescEstudio');
    var txt3 = document.getElementById('txtCtdExperimentos');
    var txt4 = document.getElementById('txtTituloExperimento');
    var txt5 = document.getElementById('txtCtdMarcas');
    var btn1 = document.getElementById('btnDatosEstudio');
    var btn2 = document.getElementById('setCtdMarcasBtn');
    var btn3 = document.getElementById('btnEditarMarcaClase');
    var btn4 = document.getElementById('btnCambiosExperimento');

    var chk1 = document.getElementById('chbxFrAb');
    var chk2 = document.getElementById('chbxFrRel');
    var chk3 = document.getElementById('chbxFrRelPorcnt');
    var chk4 = document.getElementById('chbxFrAbAcum');
    var chk5 = document.getElementById('chbxFrRelAcum');

    var slc1 = document.getElementById('selectExperimentosID');
    var slc2 = document.getElementById('selectMarcasClase');

    txt2.disabled = true;
    txt3.disabled = true;
    txt4.disabled = true;
    txt5.disabled = true;
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn4.disabled = true;

    chk1.disabled = true;
    chk2.disabled = true;
    chk3.disabled = true;
    chk4.disabled = true;
    chk5.disabled = true;

    slc1.disabled = true;
    slc2.disabled = true;

    txt1.addEventListener('keyup', () => {
        console.log('a');
        if (txt1.value.trim() != '') {
            txt2.disabled = false;
            txt3.disabled = false;
        } else {
            txt2.disabled = true;
            txt3.disabled = true;
            btn1.disabled = true;
        }
    })

    txt3.addEventListener('keyup', e => {
        if (txt3.value.trim() != '') {
            btn1.disabled = false;
        } else {
            btn1.disabled = true;

        }
    });

    btn1.addEventListener('click', e => {
        slc1.disabled = false;
        txt4.disabled = false;
    });

    txt3.addEventListener('keypress', e => {
        return soloNumeros(e);
    });

    txt4.addEventListener('keyup', e=>{
        if (txt4.value.trim() != ''){
            txt5.disabled = false;
            chk1.disabled = false;
            chk2.disabled = false;
            chk3.disabled = false;
            chk4.disabled = false;
            chk5.disabled = false;
        } else {
            txt5.disabled = true;
            chk1.disabled = true;
            chk2.disabled = true;
            chk3.disabled = true;
            chk4.disabled = true;
            chk5.disabled = true;
        }
    });

    txt5.addEventListener('keypress', e => {
        return soloNumeros(e);
    });

    txt5.addEventListener('keyup', e => {
        btn2.disabled = txt5.value.trim()=='';
    });

    btn2.addEventListener('click', e=>{
        slc2.disabled=false;
        btn3.disabled=false;
    });

    function soloNumeros(e) {
        var key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }
});