/* jshint devel:true */
'use strict';

var stats, scene, camera, renderer;

var options = {
	instructions: true,
	speed: 10,
	inner: false,
	innerRadius: 0,
	outer: false,
	openingRadius: 1
};
var initGUI = function() {
	var width = $('#opening').width();

	var gui = new dat.GUI();

	gui.add(options, 'instructions').onChange(function() {
		$('#instructions').toggle();
	});
	gui.add(options, 'speed', 1, 20);

	gui.add(options, 'inner').onChange(function() {
		$('#opening').toggle();
	});
	gui.add(options, 'innerRadius', 0, 500).onChange(function(val){
		$('#opening').width(  width + Math.floor(2 * val));
		$('#opening').css('left', - val);
	});

	gui.add(options, 'outer').onChange(function(val) {
		scene.children[0].visible = val;
	});
	gui.add(options, 'openingRadius', 0.1, 1.5).onChange(function(val) {
		scene.children[0].scale.x = val;
		scene.children[0].scale.y = val;
	});

};

var largeRect = function(len) {
	var length = 2.2 * len,
        height = len;

    var rectShape = new THREE.Shape();
    rectShape.moveTo(-length, -height);
    rectShape.lineTo(-length, height);
    rectShape.lineTo(length, height);
    rectShape.lineTo(length, -height);
    rectShape.lineTo(-length, -height);

    var geometry = new THREE.ShapeGeometry(rectShape);

    var material = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    var mesh = new THREE.Mesh(geometry, material);
   	mesh.position.z = 75;
   	mesh.visible = false;
    return mesh;
};

var square = function() {
    var rectLength = 1,
        rectWidth = 1;

    var rectShape = new THREE.Shape();
    rectShape.moveTo(0, 0);
    rectShape.lineTo(0, rectWidth);
    rectShape.lineTo(rectLength, rectWidth);
    rectShape.lineTo(rectLength, 0);
    rectShape.lineTo(0, 0);

    var geometry = new THREE.ShapeGeometry(rectShape);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.floor(Math.random() * 299) - 150; //  (-150  150)
    mesh.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return mesh;
};

var triangle = function() {
	var randNum = function(val) {
		var num = val || 3;
		var rand = Math.floor(Math.random() * 2);
		if ( rand === 1) {
			return Math.floor(Math.random() * num);
		} 
		else {
			return -1 * Math.floor(Math.random() * num);
		} 
	};

	var triShape = new THREE.Shape();
	var originX = randNum(), originY = randNum();
	triShape.moveTo(originX, originY);
	triShape.lineTo(randNum(), randNum());
	triShape.lineTo(randNum(), randNum());
	triShape.lineTo(originX, originY);

	var geometry = new THREE.ShapeGeometry(triShape);

	var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.floor(Math.random() * 299) - 150; //  (-150  150)
    mesh.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return mesh;
};

var circle = function() {
    var circleGeometry = new THREE.CircleGeometry(1, 50);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var circle = new THREE.Mesh(circleGeometry, material);
    circle.position.x = Math.floor(Math.random() * 299) - 150; //  (-150  150)
    circle.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return circle;
};

var render = function() {
    requestAnimationFrame(render);

    for (var i = 1, l = scene.children.length; i < l; i++) {
        var object = scene.children[i];
        object.position.z += options.speed;

        if (object.position.z > 50) {
            object.position.z = -250;
        }

    }
    if (scene.children.length < 1500) {
    	scene.add(circle());
    	scene.add(square());
        scene.add(triangle());
    }

    renderer.render(scene, camera);

    stats.update();
};


var init = function() {

	// FPS Meter
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms, 2: mb
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);

	// THREE.js init
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 100;

	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	initGUI();
	scene.add(largeRect(13));
	render();
};



init();