/*jslint nomen:true, white:true, browser:true */
/*global jQuery, console, window, document, THREE: true */

(function($){
	'use strict';

	var Diamond = {

		init: function() {
			this.setUpScene();
		},

		setUpScene: function() {

			var width = window.innerWidth,
				height = window.innerHeight,
				self = this;

			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setSize(width, height);
			this.renderer.setClearColor(0xffffff, 1);
			$('body').append(this.renderer.domElement);

			this.scene = new THREE.Scene;

			var loader = new THREE.JSONLoader();
		    loader.load('/assets/diamond.json', function(geometry){
		    	var material = new THREE.MeshLambertMaterial({color: 0xb7d6e2, shading: THREE.FlatShading});
		    	self.mesh = new THREE.Mesh(geometry, material);
		    	self.mesh.scale.set(40,40,40);
		    	self.mesh.position.set(100, 50, 100);
		    	self.scene.add(self.mesh);
		    	self.camera.lookAt(self.mesh.position);
		    });

			this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
			this.camera.position.y = 160;
			this.camera.position.z = 400;
			this.scene.add(this.camera);

			var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
			var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xd8e2e6, side: THREE.BackSide });
			var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
			this.scene.add(skybox);

			var pointLight = new THREE.PointLight(0xffffff);
			pointLight.position.set(0, 300, 200);
			this.scene.add(pointLight);

			var sideLight = new THREE.PointLight(0xffffff);
			sideLight.position.set(600, 200, 100);
			this.scene.add(sideLight);

			var lowerLight = new THREE.PointLight(0xffffff);
			lowerLight.position.set(0, 0, 200);
			this.scene.add(lowerLight);

			this.clock = new THREE.Clock;
			this.render();
		},

		render: function() {
			var self = this;

			this.renderer.render(this.scene, this.camera);
			if(this.mesh) {
				this.mesh.rotation.y -= this.clock.getDelta();
			}
			requestAnimationFrame(function() {
				self.render();
			});
		}
	};

	$(document).ready(function() {
		Diamond.init();
	});

}(jQuery));