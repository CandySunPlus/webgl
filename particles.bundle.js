/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;
	;
	var Particle = (function () {
	    function Particle(screen, color, size) {
	        if (color === void 0) { color = null; }
	        if (size === void 0) { size = 4; }
	        this.isCached = false;
	        var directions = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];
	        this.ctx = screen.getContext('2d');
	        this.radius = Math.floor(Math.random() * size);
	        this.x = Math.floor(Math.random() * screen.width);
	        this.y = Math.floor(Math.random() * screen.height);
	        this.color = color ? color : this.getRandomColor();
	        this.opacity = .4;
	        this.direction = directions[Math.floor(Math.random() * (directions.length - 1))];
	        this.initVelocity();
	        this.initCacheCtx();
	    }
	    Particle.prototype.render = function (particles) {
	        this.move(particles);
	        if (!this.isCached) {
	            this.cache();
	        }
	        this.ctx.drawImage(this.cacheCtx.canvas, this.x - this.radius, this.y - this.radius);
	    };
	    Object.defineProperty(Particle.prototype, "colorString", {
	        get: function () {
	            return "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + this.opacity + ")";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Particle.prototype.cache = function () {
	        this.cacheCtx.fillStyle = this.colorString;
	        this.cacheCtx.beginPath();
	        this.cacheCtx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2, false);
	        this.cacheCtx.closePath();
	        this.cacheCtx.fill();
	        this.isCached = true;
	    };
	    Particle.prototype.initCacheCtx = function () {
	        var cacheCanvas = document.createElement('canvas');
	        cacheCanvas.width = this.radius * 2;
	        cacheCanvas.height = this.radius * 2;
	        this.cacheCtx = cacheCanvas.getContext('2d');
	    };
	    Particle.prototype.initVelocity = function () {
	        var velbase;
	        switch (this.direction) {
	            case 'top':
	                velbase = { x: 0, y: -1 };
	                break;
	            case 'top-right':
	                velbase = { x: 0.5, y: -0.5 };
	                break;
	            case 'right':
	                velbase = { x: 1, y: -0 };
	                break;
	            case 'bottom-right':
	                velbase = { x: 0.5, y: 0.5 };
	                break;
	            case 'bottom':
	                velbase = { x: 0, y: 1 };
	                break;
	            case 'bottom-left':
	                velbase = { x: -0.5, y: 1 };
	                break;
	            case 'left':
	                velbase = { x: -1, y: 0 };
	                break;
	            case 'top-left':
	                velbase = { x: -0.5, y: -0.5 };
	                break;
	            default:
	                velbase = { x: 0, y: 0 };
	                break;
	        }
	        this.vx = velbase.x * Math.random();
	        this.vy = velbase.y * Math.random();
	    };
	    Particle.prototype.linkTo = function (p) {
	        var dx = this.x - p.x, dy = this.y - p.y, opacity = 0.4, distance = 90, dist = Math.sqrt(dx * dx + dy * dy);
	        if (dist <= distance) {
	            var lineOpacity = opacity - (dist / (1 / opacity)) / distance;
	            if (lineOpacity > 0) {
	                this.ctx.strokeStyle = "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + lineOpacity + ")";
	                this.ctx.lineWidth = 1;
	                this.ctx.beginPath();
	                this.ctx.moveTo(this.x, this.y);
	                this.ctx.lineTo(p.x, p.y);
	                this.ctx.stroke();
	                this.ctx.closePath();
	            }
	        }
	    };
	    Particle.prototype.move = function (particles) {
	        for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
	            var particle = particles_1[_i];
	            this.linkTo(particle);
	        }
	        this.vx = (this.x + this.radius > this.ctx.canvas.width || this.x < 0) ? -this.vx : this.vx;
	        this.vy = (this.y + this.radius > this.ctx.canvas.height || this.y < 0) ? -this.vy : this.vy;
	        this.x += this.vx * 7;
	        this.y += this.vy * 7;
	    };
	    Particle.prototype.getRandomColor = function () {
	        return {
	            r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
	            g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
	            b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
	        };
	    };
	    return Particle;
	}());
	var ParticlesApp = (function () {
	    function ParticlesApp(width, height, num) {
	        var _this = this;
	        this.particles = [];
	        this.render = function () {
	            _this.ctx.clearRect(0, 0, _this.screen.width, _this.screen.height);
	            for (var _i = 0, _a = _this.particles; _i < _a.length; _i++) {
	                var particle = _a[_i];
	                particle.render(_this.particles);
	            }
	            requestAnimationFrame(_this.render);
	        };
	        this.screen = this.initRetinaCanvas(width, height);
	        this.ctx = this.screen.getContext('2d');
	        this.initParticles(num);
	    }
	    ParticlesApp.prototype.run = function () {
	        document.body.insertAdjacentElement('afterbegin', this.screen);
	        this.render();
	    };
	    ParticlesApp.prototype.initParticles = function (num) {
	        var color = { r: 255, g: 255, b: 255 };
	        for (var i = 0; i < num; i++) {
	            this.particles.push(new Particle(this.screen, color));
	        }
	    };
	    ParticlesApp.prototype.initRetinaCanvas = function (width, height) {
	        var canvas = document.createElement('canvas');
	        var dpr = window.devicePixelRatio || 1;
	        canvas.width = width * dpr;
	        canvas.height = height * dpr;
	        canvas.style.width = width + 'px';
	        canvas.style.height = height + 'px';
	        return canvas;
	    };
	    return ParticlesApp;
	}());
	var particlesApp = new ParticlesApp(window.innerWidth, window.innerHeight, 300);
	particlesApp.run();


/***/ }
/******/ ]);