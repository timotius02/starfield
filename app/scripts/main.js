/* jshint devel:true */
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);

var inner = false;
var outer = false;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var options = {
	inner: false,
	innerRadius: 1,
	outer: false,
	openingRadius: 1
}
function initGUI() {

	var gui = new dat.GUI();

	gui.add(options, 'inner').onChange(function(val) {
		inner = val;
	})
	gui.add(options, 'innerRadius', 1, 20);

	gui.add(options, 'outer').onChange(function(val) {
		outer = val;
	});
	gui.add(options, 'openingRadius', 1, 20);
}

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
}

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
	}

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
}

var circle = function() {
    var circleGeometry = new THREE.CircleGeometry(1, 50);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var circle = new THREE.Mesh(circleGeometry, material);
    circle.position.x = Math.floor(Math.random() * 299) - 150; //  (-150  150)
    circle.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return circle;
}

var largeCircle = function(len) {
	var radius = len || 1;
	var circleGeometry = new THREE.CircleGeometry(radius, 50);
	var material = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    var circle = new THREE.Mesh(circleGeometry, material);
    circle.position.z  = 75;
    return circle;
}

scene.add(largeCircle(20));
var render = function() {
    requestAnimationFrame(render);

    for (var i = 1, l = scene.children.length; i < l; i++) {
        var object = scene.children[i];
        object.position.z += 4;

        if (object.position.z > 50)
            object.position.z = -250;

    }
    if (scene.children.length < 1500) {
    	scene.add(circle());
    	scene.add(square());
        scene.add(triangle());
    }

    renderer.render(scene, camera);

    stats.update()
};

initGUI();
render();
