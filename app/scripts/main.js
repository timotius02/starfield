/* jshint devel:true */
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    cube.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return cube;
}

var circle = function() {
    var circleGeometry = new THREE.CircleGeometry(1, 50);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var circle = new THREE.Mesh(circleGeometry, material);
    circle.position.x = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    circle.position.y = Math.floor(Math.random() * 199) - 100; //  (-100  100)
    return circle;
}

var render = function() {
    requestAnimationFrame(render);

    for (var i = 0, l = scene.children.length; i < l; i++) {
        var object = scene.children[i];
        object.position.z += 3;

        if (object.position.z > 90)
            object.position.z = -200;

    }
    if (scene.children.length < 1000) {
        scene.add(square());
        scene.add(circle());

    }

    renderer.render(scene, camera);

    stats.update()
};

render();
