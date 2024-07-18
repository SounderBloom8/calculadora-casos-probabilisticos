document.addEventListener('DOMContentLoaded', () => {
    var tituloEstudio = 'Titulo Predeterminado';
    var ctdExperimentos = 0;
    var descEstudio = 'Este estudio esta chido';
    var ExperimentosArreglo = [];

    document.getElementById('btnDatosEstudio').addEventListener('click', (e) => {
        e.preventDefault();
        tituloEstudio = document.getElementById('txtTituloEstudio').value;
        descEstudio = document.getElementById('txtDescEstudio').value;
        ctdExperimentos = parseInt(document.getElementById('txtCtdExperimentos').value);
        document.getElementById('lblExperimentoTitulo').innerHTML = 'Experimento 1';
        if (ctdExperimentos > 0) {
            EliminarHijos(document.getElementById('selectExperimentosID'));
            for (var i = 0; i < ctdExperimentos; i++) {
                var ArregloVacioMarcasClase = [];
                var ArregloVacioParametrosBooleanos = [];

                var Experimento = {
                    titulo: '',
                    descripcion: '',
                    marcasDeClase: ArregloVacioMarcasClase,
                    parametrosBooleanos: ArregloVacioParametrosBooleanos
                };

                ExperimentosArreglo.push(Experimento);
                addElementoHTML('option', 'listaOpcionExp' + (i + 1), document.getElementById('selectExperimentosID'), 'Experimento ' + (i + 1));
            }
        } else {
            EliminarHijos(document.getElementById('selectExperimentosID'));
            addElementoHTML('option', '', document.getElementById('selectExperimentosID'), 'Experimentos');
            document.getElementById('lblExperimentoTitulo').innerHTML = 'Datos del Experimento';
            alert('Ingresa al menos un Experimento');
        }

    });

    document.getElementById('setCtdMarcasBtn').addEventListener('click', () => {
        var ctdMrcClas = parseInt(document.getElementById('txtCtdMarcas').value);
        document.getElementById('selectMarcasClase');
        EliminarHijos(document.getElementById('selectMarcasClase'));
        for (var i = 0; i < ctdMrcClas; i++) {
            addElementoHTML('option', 'listaOpcionMarcasClase' + (i + 1), document.getElementById('selectMarcasClase'), 'Marca ' + (i + 1));
        }
    });

    document.getElementById('btnEditarMarcaClase').addEventListener('click', () => {
        var select = document.getElementById('selectMarcasClase');
        var selectedOption = select.selectedIndex;
        var tituloModal = 'Editar Marca de Clase ' + (selectedOption + 1);
        marcaSeleccionadaActualIndex = selectedOption;
        document.getElementById('tituloModalmcClase').innerHTML = tituloModal;
    });

    document.getElementById('selectExperimentosID').addEventListener('change', () => {
        var select = document.getElementById('selectExperimentosID');
        var selectedOption = select.selectedIndex;
        document.getElementById('lblExperimentoTitulo').innerHTML = 'Experimento ' + (selectedOption + 1);

        AnalizarSiHabilitarAplicarCambiosBTN(selectedOption);
    })

    document.getElementById('GuardarMarcaClasebtn').addEventListener('click', () => {
        var Marca = {
            titulo: document.getElementById('txtModalTituloMarca').value,
            frecuencia: document.getElementById('txtModalfrecuenciaMarca').value,
            medide: document.getElementById('txtModalMedidaMarca').value,
        }

        var select = document.getElementById('selectExperimentosID');
        var selectedOption = select.selectedIndex;

        ExperimentosArreglo[selectedOption].marcasDeClase.push(Marca);
        $('#exampleModal').modal('hide');

        Swal.fire({
            title: "Guardado",
            text: "La Marca de Clase se Guardó con Éxito!",
            icon: "success"
        });

        AnalizarSiHabilitarAplicarCambiosBTN(selectedOption);
    })

    document.getElementById('btnCambiosExperimento').addEventListener('click', (e) => {
        e.preventDefault();
        var select = document.getElementById('selectExperimentosID');
        var selectedOption = select.selectedIndex;

        var parametrosBooleanosLeidos = [
            document.querySelector('#chbxFrAb').checked,
            document.querySelector('#chbxFrRel').checked,
            document.querySelector('#chbxFrRelPorcnt').checked,
            document.querySelector('#chbxFrAbAcum').checked,
            document.querySelector('#chbxFrRelAcum').checked
        ];

        ExperimentosArreglo[selectedOption].parametrosBooleanos = parametrosBooleanosLeidos;
        ExperimentosArreglo[selectedOption].titulo = document.getElementById('txtTituloExperimento').value;
        ExperimentosArreglo[selectedOption].descripcion = document.getElementById('txtTituloExperimento').value;

        Swal.fire({
            title: "Guardado",
            text: "Datos del Experimento Guardados con Éxito!",
            icon: "success"
        });
    });

    document.getElementById('crearBtn').addEventListener('click', (e) => {
        e.preventDefault();
        var elementoPadre = document.getElementById('ContenidoHTMLpdf');
        addElementoHTML('h1', 'tituloEstudioIDfinal', elementoPadre, tituloEstudio);
        addElementoHTML('p', 'descripcionEstudioIDfinal', elementoPadre, descEstudio);
        addElementoHTML('hr', '', elementoPadre);

        for (var i = 0; i < ExperimentosArreglo.length; i++) {
            crearTabla(
                'tablaExperimento' + (i + 1),
                ExperimentosArreglo[i].titulo,
                ExperimentosArreglo[i].parametrosBooleanos,
                ExperimentosArreglo[i].marcasDeClase,
                /*ExperimentosArreglo[i].descripcion*/ ''
            );

            var ArregloNombresMarcaClase = [];
            var ArregloFrecuenciaClase = [];

            for (var a = 0; a < ExperimentosArreglo[i].marcasDeClase.length; a++) {
                ArregloNombresMarcaClase.push(ExperimentosArreglo[i].marcasDeClase[a].titulo);
                ArregloFrecuenciaClase.push(ExperimentosArreglo[i].marcasDeClase[a].frecuencia);

            }

            //GRAFICA
            new Chart(addElementoHTML('canvas', 'graficaTabla' + (i + 1), elementoPadre), {
                type: 'bar',
                data: {
                    labels: ArregloNombresMarcaClase,
                    datasets: [{
                        label: 'Frecuencia',
                        data: ArregloFrecuenciaClase,
                        borderWidth: 3,
                        borderColor: '#0e7d07',
                        backgroundColor: '#97e084'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            addElementoHTML('hr', '', elementoPadre).classList = 'mt-5';
        }
    });

    var crearTabla = (idTabla, titleExp, HeaderBool, marcasDeClase, descripcionExp) => {
        var totalFrecuenciaAsoluta = 0;
        var frR_Acum = 0;
        var frAbs_Acum = 0;
        var padre = document.getElementById('ContenidoHTMLpdf');

        addElementoHTML('h4', '', padre, titleExp);
        addElementoHTML('p', '', padre, descripcionExp);
        //CREAMOS TABLA ==============================================================================================
        var tabla = addElementoHTML('table', idTabla, padre);
        tabla.className = 'table table-bordered';

        //CREAMOS CABECERA TABLA ======================================================================================
        var headerTabla = addElementoHTML('tr', 'row' + idTabla + '1', tabla); //Fila

        //COLUMNAS-----------------------------------------------------------------------------
        addElementoHTML('th', 'headCol' + idTabla + '0', headerTabla, 'Marca de Clase');

        for (var i = 0; i < marcasDeClase.length; i++) {
            totalFrecuenciaAsoluta += parseInt(marcasDeClase[i].frecuencia);
        }

        for (var i = 0; i < marcasDeClase.length; i++) {
            var fila = addElementoHTML('tr', 'row' + idTabla + (i + 2), tabla);

            addElementoHTML('td', 'marcaClase' + idTabla + '0', fila, marcasDeClase[i].titulo);

            var frTmp = (marcasDeClase[i].frecuencia) / totalFrecuenciaAsoluta;
            var fpTmp = frTmp * 100;


            if (HeaderBool[0]) {
                addElementoHTML('td', 'frecuenciaAbsoluta' + idTabla + '1', fila, marcasDeClase[i].frecuencia);
            }
            if (HeaderBool[1]) {
                addElementoHTML('td', 'frecuenciaRelativa' + idTabla + '1', fila, NumeroPeriodico(frTmp));
            }
            if (HeaderBool[2]) {
                addElementoHTML('td', 'frecuenciaPorcentual' + idTabla + '1', fila, NumeroPeriodico(fpTmp) + "%");
            }
            if (HeaderBool[3]) {
                frAbs_Acum += parseInt(marcasDeClase[i].frecuencia);
                addElementoHTML('td', 'frecuenciaAbsAcum' + idTabla + '1', fila, NumeroPeriodico(frAbs_Acum));
            }
            if (HeaderBool[4]) {
                frR_Acum += frTmp;
                addElementoHTML('td', 'frecuenciaRelAcum' + idTabla + '1', fila, NumeroPeriodico(frR_Acum));
            }
        }

        if (HeaderBool[0]) {
            addElementoHTML('th', 'headCol' + idTabla + '1', headerTabla, 'Frecuencia Absoluta');
        }
        if (HeaderBool[1]) {
            addElementoHTML('th', 'headCol' + idTabla + '2', headerTabla, 'Frecuencia Relativa');
        }
        if (HeaderBool[2]) {
            addElementoHTML('th', 'headCol' + idTabla + '3', headerTabla, 'Frecuencia Porcentual');
        }
        if (HeaderBool[3]) {
            addElementoHTML('th', 'headCol' + idTabla + '4', headerTabla, 'Frecuencia Absoluta Acumulada');
        }
        if (HeaderBool[4]) {
            addElementoHTML('th', 'headCol' + idTabla + '5', headerTabla, 'Frecuencia Relativa Acumulada');
        }
    };

    function EliminarHijos(Padre) {
        while (Padre.hasChildNodes()) {
            Padre.removeChild(Padre.firstChild);
        }
    }

    function addElementoHTML(etiqueta, idHijo, Padre, contenido = '') {
        var elemento = document.createElement(etiqueta);
        elemento.id = idHijo;
        elemento.innerHTML = contenido;
        Padre.appendChild(elemento);
        return elemento;
    }

    function AnalizarSiHabilitarAplicarCambiosBTN(ExperimentoIndex) {
        if (document.getElementById('selectMarcasClase').childElementCount == ExperimentosArreglo[ExperimentoIndex].marcasDeClase.length) {
            var btn4 = document.getElementById('btnCambiosExperimento');
            btn4.disabled = false;
        } else {
            var btn4 = document.getElementById('btnCambiosExperimento');
            btn4.disabled = true;
        }
    }
});