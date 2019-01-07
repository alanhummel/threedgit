easing = 'Expo.easeInOut';
var selectedBank;

var table = [];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [] };



$(function() {
    initialLoadAndStart();
    timelyUpdates();
});

function updateJSONData() {
//                var showData = $('#show-data');
    var element;
    $.getJSON('doc/bancos.json', function (bancos) {
        console.log(bancos);

//                    showData.empty();
        var oldColor;
        for (var i = 0; i < bancos.length; i++) {
//                        var content = '<li>' + bancos[i].id + ' : ' + bancos[i].nome; + '</li>';
//                        var list = $('<ul />').html(content);
//                        showData.append(list);
            element = document.getElementById( 'B'+ (i + 1) );

            // Update and flash if there are changes in the colors
            oldColor = element.style.backgroundColor;
            oldColor = oldColor.replace(/\s/g, '');
            oldColor = oldColor.substr(0,12);

            if (oldColor.localeCompare(bancos[i].colorStatus.substr(0,12))!=0) {
                element.style.backgroundColor = bancos[i].colorStatus;
                $('#B' + (i + 1)).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            }
        }

    });

//                showData.text('Loading the JSON file.');
}

function initialLoadAndStart() {
    $.getJSON('doc/bancos.json', function (bancos) {
        console.log(bancos);
        var rows = 4;
        var columns = 7;

        //table.empty();

        for (var index = 0; index < bancos.length; index++) {
            var column = index % columns;
            var row = (index - column) / columns;
            table.push(bancos[index].nome);
            table.push(column + 1);
            table.push(row + 1);
            table.push(bancos[index].colorStatus);
        }
        initVisualization();
        animate();
    });
}

function timelyUpdates() {
    setInterval(function () {
        //var elem = document.getElementById('updateCycle');
        updateJSONData();
        //elem.innerHTML = "Last Update: "+ new Date();
    },5000);
}

function initVisualization() {
    //initChartComponent();

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera.position.z = 800;
    camera.position.z = 2384.0;

    scene = new THREE.Scene();

    // table

    for ( var i = 0; i < table.length; i += 4 ) {
        var linearPosition = ((i/4) + 1);


        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor =  table[ i + 3 ];
        element.id = 'B'+linearPosition;
        element.setAttribute("onclick","openBank('"+element.id+"')");

        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = table[ i ];
        element.appendChild( symbol );

        var object = new THREE.CSS3DObject( element );
        object.position.x = Math.random() * 20000 - 2000;
        object.position.y = -20000 - 2000;
        object.position.z = -20000 - 2000;
        scene.add( object );

        objects.push( object );

        var object = new THREE.Object3D();
        object.position.x = ( table[ i + 1 ] * 360 ) - 1440;
        object.position.y = - ( table[ i + 2 ] * 360 ) + 940;
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

//				var button = document.getElementById( 'getCoordinates' );
//				button.addEventListener( 'click', function ( event ) {
//				    alert(" X Position: " + camera.position.x + " Y Position: " + camera.position.y + " Z Position: " + camera.position.z);
//				}, false );

    transitionInBanks( targets.table, 2000 );

    window.addEventListener( 'resize', onWindowResize, false );
}

function transitionInBanks( targets, duration ) {

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

function animateElementTransition( i, duration ) {

    TWEEN.removeAll();


    var object = objects[ i ];

    var tween = new TWEEN.Tween( object.position )
        .to( { x: camera.position.x, y: camera.position.y, z: camera.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    new TWEEN.Tween( object.rotation )
        .to( { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    tween.onComplete(redirectToPage);

    new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( render )
        .start();

}

function redirectToPage() {
    window.location.href = "dashboardCircuit.html?bank=" + selectedBank;
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

function openBank(data) {
    var i = obtainTableIndex(data);
    selectedBank = data;
    animateElementTransition(i, 500);
}

function obtainTableObject(elementId) {
    for (var i = 0, l = objects.length; i < l; ++i) {
        var object = objects[i];
        var element = object.element;
        if (element.id == elementId) {
            return object;
        }
    }
    return null;
}

function obtainTableIndex(elementId) {
    for (var i = 0, l = objects.length; i < l; ++i) {
        var object = objects[i];
        var element = object.element;
        if (element.id == elementId) {
            return i;
        }
    }
    return null;
}
