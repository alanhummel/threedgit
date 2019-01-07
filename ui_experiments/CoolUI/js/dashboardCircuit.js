
jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({
            "position": "absolute"
        });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({
                left: 43
            }, 10).animate({
                left: 23
            }, 50).animate({
                left: 23
            }, 10).animate({
                left: 13
            }, 50).animate({
                left: 43
            }, 50).animate({
                left: 33
            }, 50).animate({
                left: 43
            }, 50);
        }
    });
    return this;
}

$(document).ready(function() {
    $("#logo").shake();
});

easing = 'Expo.easeInOut';

var icones = [
    ['images/icons/em_processo_carga.png', 'Em processo'], //0
    ['images/icons/em_processo_carga_com_recarga.png', 'Processo com recarga'], //1
    ['images/icons/em_processo_pausa.png', 'Em processo de pausa'], //2
    ['images/icons/em_processo_pausa_operador.png', 'Pausa por operador'], //3
    ['images/icons/em_processo_recarga.png', 'Processo de recarga'], //4
    ['images/icons/espera_programacao.png', 'Espera de programação'], //5
    ['images/icons/parado_circuito_aberto.png', 'Circuito em aberto'], //6
    ['images/icons/parado_temperatura_alta.png', 'Temperatura alta'], //7
    ['images/icons/processo_encerrado_temp_emergencia.png', 'Temp. em emergência'], //8
    ['images/icons/processo_finalizado.png', 'Processo finalizado'], //9
    ['images/icons/processo_parado_corrente_alta.png', 'Corrente alta'], //10
    ['images/icons/processo_parado_corrente_muito_baixa.png', 'Corrente elevada'], //11
    ['images/icons/processo_parado_envio_plano.png', 'Envio do plano'], //12
    ['images/icons/processo_parado_horario_ponta.png', 'Horário de Ponta'], //13
    ['images/icons/processo_parado_temp_bateria_altissima.png', 'Temp. altíssima'], //14
    ['images/icons/processo_parado_temp_dissipador_retificador.png', 'Temper. elevada do retif.'], //15
    ['images/icons/processo_parado_temp_sonda_baixa.png', 'Temp. da Sonda baixa'], //16
    ['images/icons/retificador_nao_responde.png', 'Retificador não responde'], //17
    ['images/icons/retificador_parado_manutencao.png', 'Retif. parado em man.'], //18
    ['images/icons/sem_comunicacao_interface.png', 'Sem comunicação com a interface'] //19
];

var table = [ ];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [] };

$(function() {
    initialLoadAndStart();
    timelyUpdates();
});

function timelyUpdates() {
    setInterval(function () {
        //var elem = document.getElementById('updateCycle');
        updateJSONData();
        //elem.innerHTML = "Last Update: "+ new Date();
    },5000);
}

function updateJSONData() {
    $.getJSON('doc/circuito27.json', function (circuitos) {
        console.log(circuitos);

        for (var i = 0; i < circuitos.length; i++) {
            updateFields(circuitos, i);
        }
    });

}

function updateFields(jsonContent, index) {
    var element = document.getElementById( 'C'+ ( index ) );
    var imgId = document.getElementById('imgId' + ( index ));
    var circuitoId = document.getElementById('circuitoId' + ( index ));
    var endId = document.getElementById('endId' + ( index  ));
    var descricaoId = document.getElementById('descricaoId' + ( index ));
    var tensaoId = document.getElementById('tensaoId' + ( index ));
    var correnteId = document.getElementById('correnteId' + ( index ));
    var cargaId = document.getElementById('cargaId' + ( index ));
    var voltBatId = document.getElementById('voltBatId' + ( index ));
    var voltElemId = document.getElementById('voltElemId' + ( index ));
    var tempBatId = document.getElementById('tempBatId' + ( index ));
    var tempDissipId = document.getElementById('tempDissipId' + ( index ));
    var faseId = document.getElementById('faseId' + ( index ));
    var tempoProcessoId = document.getElementById('tempoProcessoId' + ( index ));
    var planoId = document.getElementById('planoId' + ( index ));

    var hasChanged = false;
    var componentsChanged = [];

    if (descricaoId.textContent.localeCompare(icones[jsonContent[index].icone][1])!=0) {
        imgId.src = icones[jsonContent[index].icone][0];
        descricaoId.textContent = icones[jsonContent[index].icone][1];
        hasChanged = true;
        componentsChanged.push(descricaoId);
        componentsChanged.push(imgId);
    }

    if (circuitoId.textContent.localeCompare('Circuito ' + jsonContent[index].circuitoNumero)!=0) {
        circuitoId.textContent = 'Circuito ' + jsonContent[index].circuitoNumero;
        hasChanged = true;
        componentsChanged.push(circuitoId);
    }
    if (endId.innerHTML.localeCompare(jsonContent[index].end)!=0) {
        endId.innerHTML = jsonContent[index].end;
        hasChanged = true;
        componentsChanged.push(endId);
    }
    if (tensaoId.textContent.localeCompare(jsonContent[index].tensao)!=0) {
        tensaoId.textContent = jsonContent[index].tensao;
        hasChanged = true;
        componentsChanged.push(tensaoId);
    }
    if (correnteId.textContent.localeCompare(jsonContent[index].corrente)!=0) {
        correnteId.textContent = jsonContent[index].corrente;
        hasChanged = true;
        componentsChanged.push(correnteId);
    }
    if (cargaId.textContent.localeCompare(jsonContent[index].carga)!=0) {
        cargaId.textContent = jsonContent[index].carga;
        hasChanged = true;
        componentsChanged.push(cargaId);
    }
    if (voltBatId.textContent.localeCompare(jsonContent[index].voltBat)!=0) {
        voltBatId.textContent = jsonContent[index].voltBat;
        hasChanged = true;
        componentsChanged.push(voltBatId);
    }
    if (voltElemId.textContent.localeCompare(jsonContent[index].voltElem)!=0) {
        voltElemId.textContent = jsonContent[index].voltElem;
        hasChanged = true;
        componentsChanged.push(voltElemId);
    }
    if (tempBatId.textContent.localeCompare(jsonContent[index].tempBat)!=0) {
        tempBatId.textContent = jsonContent[index].tempBat;
        hasChanged = true;
        componentsChanged.push(tempBatId);
    }
    if (tempDissipId.textContent.localeCompare(jsonContent[index].tempDissip)!=0) {
        tempDissipId.textContent = jsonContent[index].tempDissip;
        hasChanged = true;
        componentsChanged.push(tempDissipId);
    }
    if (faseId.textContent.localeCompare(jsonContent[index].fase)!=0) {
        faseId.textContent = jsonContent[index].fase;
        hasChanged = true;
        componentsChanged.push(faseId);
    }
    if (tempoProcessoId.textContent.localeCompare(jsonContent[index].tempoProcesso)!=0) {
        tempoProcessoId.textContent = jsonContent[index].tempoProcesso;
        hasChanged = true;
        componentsChanged.push(tempoProcessoId);
    }
    if (planoId.textContent.localeCompare(jsonContent[index].plano)!=0) {
        planoId.textContent = jsonContent[index].plano;
        hasChanged = true;
        componentsChanged.push(planoId);
    }

    // Flash the whole circuit info if changed
    if (hasChanged) {
        $(element).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).animate({opacity:100},{duration:10, complete: function(){
            for (var i = 0; i < componentsChanged.length; i++) {
                var originalFontSize = $(componentsChanged[i]).css('font-size');
                $(componentsChanged[i])
                    .animate({
                        fontSize: '31px'
                    })
                    .animate({
                        fontSize: originalFontSize
                    })
                    .animate({
                        fontSize: '31px'
                    })
                    .animate({
                        fontSize: originalFontSize
                    })
                    .animate({
                        fontSize: '31px'
                    })
                    .animate({
                        fontSize: originalFontSize
                    })
                    .animate({
                        fontSize: '31px'
                    })
                    .animate({
                        fontSize: originalFontSize
                    });
            }
        }});
    }
}

function initialLoadAndStart() {
    $.getJSON('doc/circuito27.json', function (circuitos) {
        console.log(circuitos);
        var rows = 4;
        var columns = 4;

        initVisualization(circuitos);
        animate();
    });
}

function initVisualization(circuitos) {
    //initChartComponent();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera.position.z = 800;
    camera.position.z = 2277.0;

    scene = new THREE.Scene();

    var rows = 4;
    var columns = 4;

    // circuitos

    for ( var i = 0; i < circuitos.length; i ++ ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = "rgba(0,0,0,0.50)";
        element.id = 'C'+i;
        element.setAttribute("onclick","testClick('" + element.id + "')");

        var circuito = document.createElement('div');
        circuito.textContent = 'Circuito ' + circuitos[ i ].circuitoNumero;
        circuito.className = 'circuito';
        circuito.id = 'circuitoId'+i;
        element.appendChild(circuito);

        var end = document.createElement( 'div' );
        end.className = 'end';
        end.innerHTML = circuitos[ i ].end;
        end.id = 'endId'+i;
        element.appendChild( end );

        var descricao = document.createElement('div');
        descricao.textContent = icones[circuitos[i].icone][1];
        descricao.className = 'descricao';
        descricao.id = 'descricaoId' + i;
        element.appendChild( descricao );

        // ------------ dados ---------------

        var dados = document.createElement('div');
        dados.textContent = "Tensão: ";
        dados.className = 'dados';

        var tensao = document.createElement('b');
        tensao.textContent = circuitos[ i ].tensao;
        tensao.style = 'color:#FF0000';
        tensao.id = 'tensaoId'+i;
        dados.appendChild(tensao);

        dados.appendChild(document.createElement('br'));

        //dados.textContent += "Corrente: ";

        var emCorrenteLabel = document.createElement('em');
        emCorrenteLabel.textContent = 'Corrente: ';

        dados.appendChild(emCorrenteLabel);

        var corrente = document.createElement('b');
        corrente.textContent = circuitos[ i ].corrente;
        corrente.style = 'color:#B87AC4';
        corrente.id = 'correnteId'+i;
        dados.appendChild(corrente);

        dados.appendChild(document.createElement('br'));

        var emCargaLabel = document.createElement('em');
        emCargaLabel.textContent = 'Carga: ';

        dados.appendChild(emCargaLabel);

        var carga = document.createElement('b');
        carga.textContent = circuitos[ i ].carga;
        carga.id = 'cargaId'+i;
        carga.style = 'color:#00FF00';
        dados.appendChild(carga);

        dados.appendChild(document.createElement('br'));

        var emVoltElemLabel = document.createElement('em');
        emVoltElemLabel.textContent = 'Volt/Elem.: ';

        dados.appendChild(emVoltElemLabel);

        var voltElem = document.createElement('b');
        voltElem.textContent = circuitos[ i ].voltElem;
        //voltElem.style = 'color: rgba(200,200,255,0.5)';
        voltElem.id = 'voltElemId'+i;
        dados.appendChild(voltElem);

        dados.appendChild(document.createElement('br'));

        var emVoltBatLabel = document.createElement('em');
        emVoltBatLabel.textContent = 'Volt/Bat.:';

        dados.appendChild(emVoltBatLabel);

        var voltBat = document.createElement('b');
        voltBat.textContent = circuitos [ i ].voltBat;
        voltBat.style = 'color:#FF0000';
        voltBat.id = 'voltBatId'+i;
        dados.appendChild(voltBat);

        dados.appendChild(document.createElement('br'));

        var emTempBatLabel = document.createElement('em');
        emTempBatLabel.textContent = 'Temp. Bat.:';

        dados.appendChild(emTempBatLabel);

        var tempBat = document.createElement('b');
        tempBat.textContent = circuitos[i].tempBat;
        //tempBat.style = 'color: rgba(200,200,255,0.5)';
        tempBat.id = 'tempBatId'+i;
        dados.appendChild(tempBat);

        dados.appendChild(document.createElement('br'));

        var emTempDissipLabel = document.createElement('em');
        emTempDissipLabel.textContent = 'Temp. Dissip.:';

        dados.appendChild(emTempDissipLabel);

        var tempDissip = document.createElement('b');
        tempDissip.textContent = circuitos[i].tempDissip;
        //tempDissip.style = 'color:#000000';
        tempDissip.id = 'tempDissipId'+i;
        dados.appendChild(tempDissip);

        dados.appendChild(document.createElement('br'));

        var emFaseLabel = document.createElement('em');
        emFaseLabel.textContent = 'Fase:';

        dados.appendChild(emFaseLabel);

        var fase = document.createElement('b');
        fase.textContent = circuitos[i].fase;
        //fase.style = 'color:#000000';
        fase.id = 'faseId'+i;
        dados.appendChild(fase);

        element.appendChild( dados );

        // ------------ dados  abaixo ---------------

        var dadosAbaixo = document.createElement('div');
        dadosAbaixo.className = 'dadosAbaixo';

        var emTempoProcessoLabel =  document.createElement('em');
        emTempoProcessoLabel.textContent = 'Tempo Processo: ';

        dadosAbaixo.appendChild(emTempoProcessoLabel);

        var tempoProcesso = document.createElement('b');
        tempoProcesso.textContent = circuitos[i].tempoProcesso;
        //tempoProcesso.style = 'color:#000000';
        tempoProcesso.id = 'tempoProcessoId'+i;
        dadosAbaixo.appendChild(tempoProcesso);

        dadosAbaixo.appendChild(document.createElement('br'));

        var emPlanoLabel = document.createElement('em');
        emPlanoLabel.textContent = 'Plano: ';

        dadosAbaixo.appendChild(emPlanoLabel);

        var plano = document.createElement('b');
        plano.textContent = circuitos[i].plano;
        //plano.style = 'color:#000000';
        plano.id = 'planoId'+i;
        dadosAbaixo.appendChild(plano);


        element.appendChild(dadosAbaixo);


        var img = document.createElement('img');
        img.className = 'image';
        img.src = icones[circuitos[i].icone][0];
        img.id = 'imgId' + i;
        element.appendChild( img );

        var object = new THREE.CSS3DObject( element );
        object.position.x = 0;//* 4000 - 2000;
        object.position.y = 0;//* 4000 - 2000;
        object.position.z = Math.random() -20000;//* 4000 - 2000;
        scene.add( object );

        objects.push( object );

        var column = i % columns;
        var row = (i - column) / columns;

        var object = new THREE.Object3D();
        object.position.x = ( column * 360 ) - 540;
        object.position.y = - ( row * 360 ) + 610;
        object.position.z = 0;

        targets.table.push( object );
    }

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.noRotate = true;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 4300;
    controls.animationOn = true;
    controls.addEventListener( 'change', render );

    var button = document.getElementById( 'center' );
    button.addEventListener( 'click', function ( event ) {
        controls.reset(true);
    }, false );

    var returnButton = document.getElementById('ReturnToBankButton');
    returnButton.addEventListener( 'click', function ( event) {
        transitionOutCircuits(1000);
    }, false);

//				var button = document.getElementById( 'getCoordinates' );
//				button.addEventListener( 'click', function ( event ) {
//				    alert(" X Position: " + camera.position.x + " Y Position: " + camera.position.y + " Z Position: " + camera.position.z);
//				}, false );

    transitionInCircuits( targets.table, 1000 );

    window.addEventListener( 'resize', onWindowResize, false );
}

function transitionInCircuits( targets, duration ) {

    TWEEN.removeAll();

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = objects[ i ];
        var target = targets[ i ];

        new TWEEN.Tween( object.position )
            .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( object.rotation )
            .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

    }

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}


function transitionOutCircuits( duration ) {

    TWEEN.removeAll();

    var tween;

    for ( var i = 0; i < objects.length; i ++ ) {

        var object = objects[ i ];

        tween = new TWEEN.Tween( object.position )
            .to( { x: 0, y: 0, z: -20000 }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

        new TWEEN.Tween( object.rotation )
            .to( { x: 0, y: 0, z: -20000 }, Math.random() * duration + duration )
            .easing( TWEEN.Easing.Exponential.InOut )
            .start();

    }
    tween.onComplete(redirectToPage);

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

function redirectToPage() {
    window.location.href = "dashboardBank.html";
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function animate() {

    requestAnimationFrame( animate );

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render( scene, camera );

}

function testClick(data) {
    alert(data);
}

