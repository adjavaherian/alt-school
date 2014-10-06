//main.js
'use strict';

window.onload = function(){

    //remove everything in here to start your own prototyping
    console.log('Peace, Love and Pixels.');

    var container;
    var camera, scene, projector, renderer;
    var objects = [];

    init();
    animate();

    function updateServer(cube){
        var json = {};
            json[cube.id] = cube.material.color.clone();

        console.log($.fn.jquery, JSON.stringify(json));

        $.ajax({
            url: "http://0.0.0.0:3000/update",

            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // tell YQL what we want and that we want JSON
            data: JSON.stringify(json),

            // work with the response
            success: function( response ) {
                console.log( response ); // server response
            },
            error: function(response){
                console.log( response ); // server response
            }
        });

        return true;
    }

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        var info = document.createElement( 'div' );
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        container.appendChild( info );

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 0, 300, 500 );

        scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry( 100, 100, 100 );

        for ( var i = 0; i < 10; i ++ ) {

            var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;

            scene.add( object );
            objects.push( object );
        }


        projector = new THREE.Projector();

        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor( 0xf0f0f0 );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseDown( event ) {

        event.preventDefault();

        var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        projector.unprojectVector( vector, camera );

        var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = raycaster.intersectObjects( objects );

        if ( intersects.length > 0 ) {

            intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
            //update the server with the object
            updateServer(intersects[ 0 ].object);

        }
    }

    function animate() {

        requestAnimationFrame( animate );
        render();
    }

    var radius = 600;
    var theta = 0;

    function render() {

        theta += 0.1;

        camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

    }

};
