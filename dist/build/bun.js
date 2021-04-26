/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const progressbar_1 = __webpack_require__(/*! ./progressbar */ "./src/progressbar.ts");
const sound_1 = __webpack_require__(/*! ./sound */ "./src/sound.ts");
let circle;
let stage;
let TvNoise;
let walkingNoise;
let tranceLevel = 0;
let noiseLevel = 0;
let lastNoiseLevel = 0;
let lastTickTime = 0;
let canvas;
// var introContainer = new createjs.Container()
var gameContainer = new createjs.Container();
// var youWonContainer = new createjs.Container()
var outerwall = new createjs.Shape();
var innerwall = new createjs.Shape();
var dashboard_bg = new createjs.Shape();
var dashboard_fg = new createjs.Shape();
var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
var youWonText = new createjs.Text("You won!", "20px Arial", "#bdbef2");
var youLostText = new createjs.Text("You lost!", "20px Arial", "#bdbef2");
var tranceleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var noiseleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var trancetable = new createjs.Shape();
let greycircle = new createjs.Shape();
var wolflabel = new createjs.Text("Wolf", "20px Arial", "#302a36");
var tranceRate = 0.0003;
var walkSpeed = 40 / 1000;
var queue = new createjs.LoadQueue(false);
var player;
var wolfBitmap;
var chairBitmap;
var tvBitmap;
function getObjectBounds() {
    return [chairBitmap.getTransformedBounds(), trancetable.getTransformedBounds(), dashboard_bg.getTransformedBounds()];
}
function cropBounds(bounds, horiz, vert) {
    return new createjs.Rectangle(bounds.x + horiz, bounds.y + vert, bounds.width - 2 * horiz, bounds.height - 2 * vert);
}
function boundsCollide(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) {
        if (obj1.y + obj2.height > obj2.y && obj1.y < obj2.y + obj2.height) {
            return true;
        }
    }
    return false;
}
class Noise {
    constructor(noiseLevel, durationMS, sound) {
        this.noiseLevel = noiseLevel;
        this.durationMs = durationMS;
        this.sound = sound;
    }
}
const Wolf = new Noise(3, 2000, "wolf");
const OutsideWindow = new Noise(2, 1000, "outside");
const Walking = new Noise(1, 1000, "walking");
const Tv = new Noise(3, 0, "tvnoise");
class TimedNoise {
    constructor(n, startTime) {
        this.soundInstance = undefined;
        this.startTime = startTime;
        this.noise = n;
    }
    tick(time) {
        if (this.startTime <= time && !this.soundInstance) {
            this.soundInstance = createjs.Sound.play(this.noise.sound);
        }
    }
    getActiveNoiseLevel(time) {
        if (this.startTime <= time && time < (this.startTime + this.noise.durationMs)) {
            return this.noise.noiseLevel;
        }
        return 0;
    }
}
class WolfNoise {
    constructor(n, startTime, repeatAfter) {
        this.distressLevel = 0;
        this.startDistressLevel = 0;
        this.maxDistressLevel = 3;
        this.active = false;
        this.soundInstance = undefined;
        this.startTime = startTime;
        this.noise = n;
        this.repeatAfter = repeatAfter;
        this.endTime = startTime + n.durationMs;
        this.initialStartTime = startTime;
    }
    tick(time) {
        if (!this.active) {
            this.distressLevel = this.startDistressLevel;
            if (this.soundInstance) {
                this.soundInstance.muted = true;
                this.soundInstance = undefined;
            }
            this.startTime = 0;
            this.endTime = 0;
            return;
        }
        if (this.active && !this.startTime) {
            this.startTime = time + this.initialStartTime;
            this.endTime = this.startTime + this.noise.durationMs;
        }
        if (this.soundInstance && time >= this.endTime) {
            this.endTime = this.startTime + this.noise.durationMs;
            this.soundInstance = undefined;
            if (this.repeatAfter) {
                this.distressLevel = Math.min(this.distressLevel + 1, this.maxDistressLevel);
                this.startTime += this.noise.durationMs + this.repeatAfter;
                this.endTime = this.startTime + this.noise.durationMs;
            }
        }
        if (this.startTime <= time && !this.soundInstance) {
            this.soundInstance = createjs.Sound.play(this.noise.sound);
            this.soundInstance.volume = (this.distressLevel + 1) / (this.maxDistressLevel + 1);
        }
    }
    getActiveNoiseLevel(time) {
        if (this.active) {
            if (this.startTime <= time && time < this.endTime) {
                return this.noise.noiseLevel + this.distressLevel;
            }
        }
        return 0;
    }
}
class PlayerNoise {
    constructor(n) {
        this.active = false;
        this.noise = n;
        this.soundInstance = createjs.Sound.play(this.noise.sound, { loop: -1, volume: 0 });
    }
    getActiveNoiseLevel(time) {
        if (this.active) {
            this.soundInstance.volume = 1;
            return this.noise.noiseLevel;
        }
        else {
            this.soundInstance.volume = 0;
        }
        return 0;
    }
}
class Player {
    constructor(sprite, startX, startY, width, height) {
        this.walkingLeft = false;
        this.walkingRight = false;
        this.walkingUp = false;
        this.walkingDown = false;
        this.moving = false;
        this.onWolf = false;
        this.onTv = false;
        this.timeOnTv = 0;
        this.sprite = sprite;
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;
        this.sprite.x = this.x;
        this.sprite.x = this.y;
    }
    getBounds() {
        return cropBounds(new createjs.Rectangle(this.x, this.y, this.width, this.height), 15, 10);
    }
    update(time) {
        let lastX = this.x;
        let lastY = this.y;
        let horiz = 0;
        let vert = 0;
        if (this.walkingLeft) {
            horiz -= 1;
        }
        if (this.walkingRight) {
            horiz += 1;
        }
        if (this.walkingDown) {
            vert += 1;
        }
        if (this.walkingUp) {
            vert -= 1;
        }
        if (Math.abs(vert) > 0 || Math.abs(horiz) > 0) {
            this.moving = true;
            this.sprite.gotoAndPlay("run");
        }
        else {
            this.moving = false;
            this.sprite.gotoAndStop(0);
        }
        let speed = this.moving ? (1 / Math.sqrt(Math.pow(horiz, 2) + Math.pow(vert, 2))) * walkSpeed : 0;
        this.x += horiz * speed * (time - lastTickTime);
        this.y += vert * speed * (time - lastTickTime);
        if (this.moving) {
            walkingNoise.active = true;
        }
        else {
            walkingNoise.active = false;
        }
        this.x = Math.max(0, Math.min(this.x, canvas.width - 15 - this.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height - 15 - this.height));
        if (this.ejectSpriteFromObjects()) {
            this.x = lastX;
            this.y = lastY;
        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        if (this.onTv) {
            this.timeOnTv += time - lastTickTime;
        }
        else {
            this.timeOnTv = 0;
        }
        this.performInteractions();
        if (this.onTv && this.timeOnTv > 3000) {
            wolfNoise.active = true;
        }
    }
    ejectSpriteFromObjects() {
        const bounds = this.getBounds();
        const objects = getObjectBounds();
        for (var i in objects) {
            if (boundsCollide(bounds, objects[i])) {
                if (i == "0") {
                    console.log("hit chair");
                }
                else if (i == "1") {
                    console.log("hit table");
                }
                else if (i == "2") {
                    console.log("hit dashboard");
                }
                console.log("bounds " + objects[i]);
                return true;
            }
        }
        return false;
    }
    performInteractions() {
        var newOnWolf = boundsCollide(this.getBounds(), wolfBitmap.getTransformedBounds());
        var newOnTv = boundsCollide(this.getBounds(), tvBitmap.getTransformedBounds());
        if (newOnTv && !this.onTv) {
            TvNoise.active = !TvNoise.active;
        }
        if (newOnWolf && this.onWolf) {
            wolfNoise.active = false;
            setTimeout(() => { TvNoise.active = true; }, 4000);
        }
        this.onWolf = newOnWolf;
        this.onTv = newOnTv;
    }
}
let wolfNoise = new WolfNoise(Wolf, 2000, 4000);
var logIt = 0;
function gameLoop(event) {
    let time = createjs.Ticker.getTime();
    // let timeLeftover = time % 50;
    // time -= timeLeftover;
    var deltaTime = time - lastTickTime;
    if (tranceLevel < 10) {
        updateTranceLevel(deltaTime);
    }
    player.update(time);
    updateNoiseLevel(time);
    if (tranceLevel >= 10) {
        tranceLevel = 10;
        if (noiseLevel >= 10) {
            playYouWonScene();
        }
    }
    else if (noiseLevel >= 10) {
        playYouLostScene();
    }
    if (tranceLevel < 0) {
        playYouLostScene();
    }
    // end of variable updates, only displays below
    var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100);
    if (logIt % 14 == 0) {
        // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    stage.update();
    lastTickTime = time;
}
function updateNoiseLevel(time) {
    noiseLevel = 0;
    wolfNoise.tick(time);
    noiseLevel += walkingNoise.getActiveNoiseLevel(time) + TvNoise.getActiveNoiseLevel(time) + wolfNoise.getActiveNoiseLevel(time);
    if (noiseLevel > lastNoiseLevel) {
        if (noiseLevel >= 5) {
            tranceLevel -= (noiseLevel - 5);
            tranceLevel = Math.floor(tranceLevel);
        }
    }
    lastNoiseLevel = noiseLevel;
}
function updateTranceLevel(deltaTime) {
    // look at the noise level
    // if the noise level is < 3
    if (noiseLevel < 3) {
        // increase the trance level by 0.5 every 1000 ms (1 s)
        tranceLevel += tranceRate * deltaTime;
    }
}
function init() {
    stage = new createjs.Stage('demoCanvas');
    canvas = stage.canvas;
    document.addEventListener("keydown", handleKeyEvent);
    document.addEventListener("keyup", handleKeyEvent);
    var progressBar = new progressbar_1.ProgressBar(stage, true);
    sound_1.loadSounds(queue, startScenes, progressBar);
}
function startScenes() {
    playIntroScene();
}
// intro page function
function playIntroScene() {
    // make the stage
    // elements of the title page
    var cabinBitmap = new createjs.Bitmap(queue.getResult("introcabin"));
    cabinBitmap.x = cabinBitmap.y = 0;
    cabinBitmap.scaleX = cabinBitmap.scaleY = .45;
    // introContainer.addChild(cabinBitmap)
    stage.addChild(cabinBitmap);
    //  wait a half second for the cabin image to load before updating the stage
    setTimeout(function () {
        stage.update();
    }, 500);
    canvas.onclick = () => {
        canvas.onclick = null;
        playGameScene();
    };
}
function handleKeyEvent(event) {
    let keyEvent = event;
    if (player) {
        if (keyEvent.type == "keydown") {
            switch (keyEvent.key) {
                case "ArrowRight":
                    player.walkingRight = true;
                    break;
                case "ArrowLeft":
                    player.walkingLeft = true;
                    break;
                case "ArrowDown":
                    player.walkingDown = true;
                    break;
                case "ArrowUp":
                    player.walkingUp = true;
                    break;
            }
        }
        else if (keyEvent.type == "keyup") {
            switch (keyEvent.key) {
                case "ArrowRight":
                    player.walkingRight = false;
                    break;
                case "ArrowLeft":
                    player.walkingLeft = false;
                    break;
                case "ArrowDown":
                    player.walkingDown = false;
                    break;
                case "ArrowUp":
                    player.walkingUp = false;
                    break;
            }
        }
    }
}
function playGameScene() {
    walkingNoise = new PlayerNoise(Walking);
    TvNoise = new PlayerNoise(Tv);
    // setTimeout(function () {
    //   TvNoise.active = true
    // }, 1000)
    // create a background rectangle
    outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height);
    // create the inner rectangle for the "floor" of the cabin
    innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30);
    // dashboard displaying trance level and noise level
    dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5);
    dashboard_bg.x = 200;
    dashboard_bg.y = 30;
    dashboard_bg.setBounds(0, 0, 400, 120);
    dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5);
    dashboard_fg.x = 210;
    dashboard_fg.y = 40;
    // metrics text labels
    trancelabel.x = 225;
    trancelabel.y = 75;
    trancelabel.textBaseline = "alphabetic";
    noiselabel.x = 225;
    noiselabel.y = 115;
    noiselabel.textBaseline = "alphabetic";
    // metrics numbers
    tranceleveltext.x = 360;
    tranceleveltext.y = 75;
    tranceleveltext.textBaseline = "alphabetic";
    noiseleveltext.x = 360;
    noiseleveltext.y = 115;
    noiseleveltext.textBaseline = "alphabetic";
    // trance table!
    trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120);
    trancetable.x = 275;
    trancetable.y = 250;
    trancetable.setBounds(0, 0, 250, 120);
    // person on trance table!
    // wolf image
    wolfBitmap = new createjs.Bitmap(queue.getResult("wolfimage"));
    wolfBitmap.x = canvas.width - 150;
    wolfBitmap.y = canvas.height - 100;
    wolfBitmap.scaleX = wolfBitmap.scaleY = .2;
    wolfNoise.active = true;
    // tv
    tvBitmap = new createjs.Bitmap(queue.getResult("tvimage"));
    tvBitmap.x = 40;
    tvBitmap.y = 140;
    tvBitmap.scaleX = tvBitmap.scaleY = 1.5;
    // chair
    chairBitmap = new createjs.Bitmap(queue.getResult("chairimage"));
    chairBitmap.x = 100;
    chairBitmap.y = 170;
    chairBitmap.scaleX = chairBitmap.scaleY = .35;
    var playerSpriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("spritesheetimage")],
        frames: {
            width: 46,
            height: 50,
            count: 40
        },
        animations: {
            run: [24, 31, "run", 1 / 5]
        }
    });
    var playerSprite = new createjs.Sprite(playerSpriteSheet);
    player = new Player(playerSprite, canvas.width / 2, canvas.height - 100, 46, 50);
    // add elements to the container for this scene
    gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, tranceleveltext, noiseleveltext, trancetable, wolfBitmap, tvBitmap, chairBitmap, playerSprite);
    gameContainer.setChildIndex(outerwall, 0);
    gameContainer.setChildIndex(innerwall, 1);
    stage.addChild(gameContainer);
    // Update stage will render next frame
    stage.update();
    createjs.Ticker.addEventListener("tick", gameLoop);
    playerSprite.gotoAndPlay("run");
}
// "you won" page function
function playYouWonScene() {
    wolfNoise.active = false;
    canvas = stage.canvas;
    stage.removeAllChildren();
    // place some "you won!" text on the screen (declared at the top)
    youWonText.x = 360;
    youWonText.y = 115;
    youWonText.textBaseline = "alphabetic";
    stage.addChild(youWonText);
    stage.update();
}
function playYouLostScene() {
    wolfNoise.active = false;
    canvas = stage.canvas;
    stage.removeAllChildren();
    // place some "you won!" text on the screen (declared at the top)
    youLostText.x = 360;
    youLostText.y = 115;
    youLostText.textBaseline = "alphabetic";
    stage.addChild(youLostText);
    stage.update();
}
// "you lost" page function
window.onload = () => {
    init();
};


/***/ }),

/***/ "./src/progressbar.ts":
/*!****************************!*\
  !*** ./src/progressbar.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
class ProgressBar {
    constructor(stage, removeOnLoad) {
        this.outerBar = new createjs.Shape();
        this.innerBar = new createjs.Shape();
        this.outerBar.graphics.beginFill("#181818").drawRoundRectComplex(0, 0, 400, 60, 5, 5, 5, 5);
        this.outerBar.x = 200;
        this.outerBar.y = 270;
        this.progress = 0;
        stage.addChild(this.outerBar);
        this.innerBar.graphics.beginFill("#327fa8").drawRect(0, 0, 380, 40);
        this.innerBar.x = 210;
        this.innerBar.y = 280;
        this.innerBar.scaleX = this.progress;
        stage.addChild(this.innerBar);
        this.stage = stage;
        this.removeOnLoad = removeOnLoad;
    }
    handleProgress(event) {
        var progressEvent = event;
        this.progress = progressEvent.progress;
        this.innerBar.scaleX = this.progress;
        this.stage.update();
    }
    remove() {
        if (this.stage) {
            this.stage.removeChild(this.outerBar);
            this.stage.removeChild(this.innerBar);
            this.stage.update();
            this.stage = undefined;
        }
    }
    handleComplete(event) {
        if (this.removeOnLoad) {
            this.remove();
        }
    }
}
exports.ProgressBar = ProgressBar;


/***/ }),

/***/ "./src/sound.ts":
/*!**********************!*\
  !*** ./src/sound.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSounds = exports.outsideSound = exports.wolfSound = void 0;
exports.wolfSound = "wolf";
exports.outsideSound = "outside";
function loadSounds(queue, next, progressBar) {
    queue.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["mp3"];
    if (progressBar) {
        queue.on("progress", progressBar.handleProgress, progressBar);
    }
    queue.on("complete", {
        handleEvent: (event) => {
            if (progressBar) {
                queue.off("progress", progressBar.handleProgress);
                progressBar.handleComplete(event);
            }
            next();
        }
    });
    queue.loadManifest([
        { id: "wolf", src: "res/wolf.mp3" },
        { id: "outside", src: "res/outside.mp3" },
        { id: "introcabin", src: "res/introcabin.jpg" },
        { id: "tvnoise", src: "res/tvsound.mp3" },
        { id: "tvimage", src: "res/tvimage.png" },
        { id: "spritesheetimage", src: "res/player-spritemap-v9-redpants.png" },
        { id: "chairimage", src: "res/chair.png" },
        { id: "wolfimage", src: "res/wolf.png" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUs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O0lBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDbkIsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQztnQkFDakQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDbEM7WUFDRCxJQUFJLEVBQUU7UUFDUixDQUFDO0tBQ0YsQ0FBQztJQUNGLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDakIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUU7UUFDbkMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtRQUN6QyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFO1FBQy9DLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUU7UUFDekMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtRQUN6QyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsc0NBQXNDLEVBQUU7UUFDdkUsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUU7UUFDMUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUU7S0FDekMsQ0FBQztBQUNKLENBQUM7QUF6QkQsZ0NBeUJDIiwiZmlsZSI6ImJ1aWxkL2J1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IFR2Tm9pc2U6IFBsYXllck5vaXNlXG5sZXQgd2Fsa2luZ05vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdE5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbi8vIHZhciBpbnRyb0NvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIGdhbWVDb250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbi8vIHZhciB5b3VXb25Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBvdXRlcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBpbm5lcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfZmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0cmFuY2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiVHJhbmNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIk5vaXNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdVdvblRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSB3b24hXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91TG9zdFRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSBsb3N0IVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNldGFibGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbmxldCBncmV5Y2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbnZhciB3b2xmbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIldvbGZcIiwgXCIyMHB4IEFyaWFsXCIsIFwiIzMwMmEzNlwiKTtcbnZhciB0cmFuY2VSYXRlOiBudW1iZXIgPSAwLjAwMDNcbnZhciB3YWxrU3BlZWQ6IG51bWJlciA9IDQwIC8gMTAwMFxudmFyIHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSk7XG52YXIgcGxheWVyOiBQbGF5ZXJcbnZhciB3b2xmQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciBjaGFpckJpdG1hcDogY3JlYXRlanMuQml0bWFwXG52YXIgdHZCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxuXG5mdW5jdGlvbiBnZXRPYmplY3RCb3VuZHMoKSB7XG4gIHJldHVybiBbY2hhaXJCaXRtYXAuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgdHJhbmNldGFibGUuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgZGFzaGJvYXJkX2JnLmdldFRyYW5zZm9ybWVkQm91bmRzKCldXG59XG5mdW5jdGlvbiBjcm9wQm91bmRzKGJvdW5kczogY3JlYXRlanMuUmVjdGFuZ2xlLCBob3JpejogbnVtYmVyLCB2ZXJ0OiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUoYm91bmRzLnggKyBob3JpeiwgYm91bmRzLnkgKyB2ZXJ0LCBib3VuZHMud2lkdGggLSAyICogaG9yaXosIGJvdW5kcy5oZWlnaHQgLSAyICogdmVydClcbn1cblxuZnVuY3Rpb24gYm91bmRzQ29sbGlkZShvYmoxOiBjcmVhdGVqcy5SZWN0YW5nbGUsIG9iajI6IGNyZWF0ZWpzLlJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICBpZiAob2JqMS54ICsgb2JqMS53aWR0aCA+IG9iajIueCAmJiBvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoKSB7XG4gICAgaWYgKG9iajEueSArIG9iajIuaGVpZ2h0ID4gb2JqMi55ICYmIG9iajEueSA8IG9iajIueSArIG9iajIuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuY2xhc3MgTm9pc2Uge1xuICBub2lzZUxldmVsOiBudW1iZXJcbiAgZHVyYXRpb25NczogbnVtYmVyXG4gIHNvdW5kOiBzdHJpbmdcbiAgY29uc3RydWN0b3Iobm9pc2VMZXZlbDogbnVtYmVyLCBkdXJhdGlvbk1TOiBudW1iZXIsIHNvdW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG4gICAgdGhpcy5kdXJhdGlvbk1zID0gZHVyYXRpb25NU1xuICAgIHRoaXMuc291bmQgPSBzb3VuZFxuICB9XG59XG5cbmNvbnN0IFdvbGYgPSBuZXcgTm9pc2UoMywgMjAwMCwgXCJ3b2xmXCIpXG5jb25zdCBPdXRzaWRlV2luZG93ID0gbmV3IE5vaXNlKDIsIDEwMDAsIFwib3V0c2lkZVwiKVxuY29uc3QgV2Fsa2luZyA9IG5ldyBOb2lzZSgxLCAxMDAwLCBcIndhbGtpbmdcIilcbmNvbnN0IFR2ID0gbmV3IE5vaXNlKDMsIDAsIFwidHZub2lzZVwiKVxuXG5jbGFzcyBUaW1lZE5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25NcykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBXb2xmTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgZGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBzdGFydERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgbWF4RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gM1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICByZXBlYXRBZnRlcjogbnVtYmVyXG4gIGluaXRpYWxTdGFydFRpbWU6IG51bWJlclxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGVuZFRpbWU6IG51bWJlclxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIsIHJlcGVhdEFmdGVyOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5yZXBlYXRBZnRlciA9IHJlcGVhdEFmdGVyXG4gICAgdGhpcy5lbmRUaW1lID0gc3RhcnRUaW1lICsgbi5kdXJhdGlvbk1zXG4gICAgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSB0aGlzLnN0YXJ0RGlzdHJlc3NMZXZlbFxuICAgICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UhLm11dGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMFxuICAgICAgdGhpcy5lbmRUaW1lID0gMFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZSArIHRoaXMuaW5pdGlhbFN0YXJ0VGltZVxuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICB9XG4gICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSAmJiB0aW1lID49IHRoaXMuZW5kVGltZSkge1xuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMucmVwZWF0QWZ0ZXIpIHtcbiAgICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gTWF0aC5taW4odGhpcy5kaXN0cmVzc0xldmVsICsgMSwgdGhpcy5tYXhEaXN0cmVzc0xldmVsKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZSArPSB0aGlzLm5vaXNlLmR1cmF0aW9uTXMgKyB0aGlzLnJlcGVhdEFmdGVyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAodGhpcy5kaXN0cmVzc0xldmVsICsgMSkgLyAodGhpcy5tYXhEaXN0cmVzc0xldmVsICsgMSlcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8IHRoaXMuZW5kVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsICsgdGhpcy5kaXN0cmVzc0xldmVsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgUGxheWVyTm9pc2Uge1xuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZTogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlKSB7XG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQsIHsgbG9vcDogLTEsIHZvbHVtZTogMCB9KVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAxXG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAwXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZVxuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2Fsa2luZ0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdVcDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICBvbldvbGY6IGJvb2xlYW4gPSBmYWxzZVxuICBvblR2OiBib29sZWFuID0gZmFsc2VcbiAgdGltZU9uVHY6IG51bWJlciA9IDBcblxuICBjb25zdHJ1Y3RvcihzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZSwgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlXG4gICAgdGhpcy54ID0gc3RhcnRYXG4gICAgdGhpcy55ID0gc3RhcnRZXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueVxuICB9XG4gIGdldEJvdW5kcygpOiBjcmVhdGVqcy5SZWN0YW5nbGUge1xuICAgIHJldHVybiBjcm9wQm91bmRzKG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSwgMTUsIDEwKVxuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGxldCBsYXN0WCA9IHRoaXMueFxuICAgIGxldCBsYXN0WSA9IHRoaXMueVxuICAgIGxldCBob3JpeiA9IDBcbiAgICBsZXQgdmVydCA9IDBcbiAgICBpZiAodGhpcy53YWxraW5nTGVmdCkge1xuICAgICAgaG9yaXogLT0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nUmlnaHQpIHtcbiAgICAgIGhvcml6ICs9IDFcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ0Rvd24pIHtcbiAgICAgIHZlcnQgKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nVXApIHtcbiAgICAgIHZlcnQgLT0gMVxuICAgIH1cbiAgICBpZiAoTWF0aC5hYnModmVydCkgPiAwIHx8IE1hdGguYWJzKGhvcml6KSA+IDApIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFN0b3AoMClcbiAgICB9XG4gICAgbGV0IHNwZWVkID0gdGhpcy5tb3ZpbmcgPyAoMSAvIE1hdGguc3FydChNYXRoLnBvdyhob3JpeiwgMikgKyBNYXRoLnBvdyh2ZXJ0LCAyKSkpICogd2Fsa1NwZWVkIDogMFxuICAgIHRoaXMueCArPSBob3JpeiAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgdGhpcy55ICs9IHZlcnQgKiBzcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuXG4gICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgICB9XG4gICAgdGhpcy54ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy54LCBjYW52YXMud2lkdGggLSAxNSAtIHRoaXMud2lkdGgpKVxuICAgIHRoaXMueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueSwgY2FudmFzLmhlaWdodCAtIDE1IC0gdGhpcy5oZWlnaHQpKVxuICAgIGlmICh0aGlzLmVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKSkge1xuICAgICAgdGhpcy54ID0gbGFzdFhcbiAgICAgIHRoaXMueSA9IGxhc3RZXG4gICAgfVxuXG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueFxuICAgIHRoaXMuc3ByaXRlLnkgPSB0aGlzLnlcbiAgICBpZiAodGhpcy5vblR2KSB7XG4gICAgICB0aGlzLnRpbWVPblR2ICs9IHRpbWUgLSBsYXN0VGlja1RpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lT25UdiA9IDBcbiAgICB9XG4gICAgdGhpcy5wZXJmb3JtSW50ZXJhY3Rpb25zKClcbiAgICBpZiAodGhpcy5vblR2ICYmIHRoaXMudGltZU9uVHYgPiAzMDAwKSB7XG4gICAgICB3b2xmTm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgIH1cbiAgfVxuICBlamVjdFNwcml0ZUZyb21PYmplY3RzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKClcbiAgICBjb25zdCBvYmplY3RzID0gZ2V0T2JqZWN0Qm91bmRzKClcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdHMpIHtcbiAgICAgIGlmIChib3VuZHNDb2xsaWRlKGJvdW5kcywgb2JqZWN0c1tpXSkpIHtcbiAgICAgICAgaWYgKGkgPT0gXCIwXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCBjaGFpclwiKVxuICAgICAgICB9IGVsc2UgaWYgKGkgPT0gXCIxXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCB0YWJsZVwiKVxuICAgICAgICB9IGVsc2UgaWYgKGkgPT0gXCIyXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCBkYXNoYm9hcmRcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcImJvdW5kcyBcIiArIG9iamVjdHNbaV0pXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHBlcmZvcm1JbnRlcmFjdGlvbnMoKSB7XG4gICAgdmFyIG5ld09uV29sZiA9IGJvdW5kc0NvbGxpZGUodGhpcy5nZXRCb3VuZHMoKSwgd29sZkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpKVxuICAgIHZhciBuZXdPblR2ID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCB0dkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpKVxuICAgIGlmIChuZXdPblR2ICYmICF0aGlzLm9uVHYpIHtcbiAgICAgIFR2Tm9pc2UuYWN0aXZlID0gIVR2Tm9pc2UuYWN0aXZlXG4gICAgfVxuICAgIGlmIChuZXdPbldvbGYgJiYgdGhpcy5vbldvbGYpIHtcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZSB9LCA0MDAwKVxuICAgIH1cbiAgICB0aGlzLm9uV29sZiA9IG5ld09uV29sZlxuICAgIHRoaXMub25UdiA9IG5ld09uVHZcbiAgfVxufVxuXG5sZXQgd29sZk5vaXNlID0gbmV3IFdvbGZOb2lzZShXb2xmLCAyMDAwLCA0MDAwKVxudmFyIGxvZ0l0ID0gMFxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudDogT2JqZWN0KSB7XG4gIGxldCB0aW1lID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUoKTtcbiAgLy8gbGV0IHRpbWVMZWZ0b3ZlciA9IHRpbWUgJSA1MDtcbiAgLy8gdGltZSAtPSB0aW1lTGVmdG92ZXI7XG4gIHZhciBkZWx0YVRpbWU6IG51bWJlciA9IHRpbWUgLSBsYXN0VGlja1RpbWVcblxuICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZSlcbiAgfVxuICBwbGF5ZXIudXBkYXRlKHRpbWUpXG4gIHVwZGF0ZU5vaXNlTGV2ZWwodGltZSlcblxuICBpZiAodHJhbmNlTGV2ZWwgPj0gMTApIHtcbiAgICB0cmFuY2VMZXZlbCA9IDEwXG4gICAgaWYgKG5vaXNlTGV2ZWwgPj0gMTApIHtcbiAgICAgIHBsYXlZb3VXb25TY2VuZSgpXG4gICAgfVxuICB9IGVsc2UgaWYgKG5vaXNlTGV2ZWwgPj0gMTApIHtcbiAgICBwbGF5WW91TG9zdFNjZW5lKClcbiAgfVxuICBpZiAodHJhbmNlTGV2ZWwgPCAwKSB7XG4gICAgcGxheVlvdUxvc3RTY2VuZSgpXG4gIH1cblxuICAvLyBlbmQgb2YgdmFyaWFibGUgdXBkYXRlcywgb25seSBkaXNwbGF5cyBiZWxvd1xuICB2YXIgcm91bmRlZFRyYW5jZUxldmVsID0gKE1hdGgucm91bmQodHJhbmNlTGV2ZWwgKiAxMDApIC8gMTAwKVxuICBpZiAobG9nSXQgJSAxNCA9PSAwKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aW1lOiBcIiArICh0aW1lIC8gMTAwMCkgKyBcIiwgdHJhbmNlOiBcIiArIHJvdW5kZWRUcmFuY2VMZXZlbCArIFwiLCBub2lzZTogXCIgKyBub2lzZUxldmVsKVxuICB9XG4gIGxvZ0l0KytcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgc3RhZ2UudXBkYXRlKCk7XG4gIGxhc3RUaWNrVGltZSA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKSB7XG4gIG5vaXNlTGV2ZWwgPSAwXG4gIHdvbGZOb2lzZS50aWNrKHRpbWUpXG4gIG5vaXNlTGV2ZWwgKz0gd2Fsa2luZ05vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSkgKyBUdk5vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSkgKyB3b2xmTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKVxuICBpZiAobm9pc2VMZXZlbCA+IGxhc3ROb2lzZUxldmVsKSB7XG4gICAgaWYgKG5vaXNlTGV2ZWwgPj0gNSkge1xuICAgICAgdHJhbmNlTGV2ZWwgLT0gKG5vaXNlTGV2ZWwgLSA1KVxuICAgICAgdHJhbmNlTGV2ZWwgPSBNYXRoLmZsb29yKHRyYW5jZUxldmVsKVxuICAgIH1cbiAgfVxuICBsYXN0Tm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlFdmVudClcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleUV2ZW50KVxuICB2YXIgcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIHRydWUpXG4gIGxvYWRTb3VuZHMocXVldWUsIHN0YXJ0U2NlbmVzLCBwcm9ncmVzc0Jhcilcbn1cblxuZnVuY3Rpb24gc3RhcnRTY2VuZXMoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIC8vIGludHJvQ29udGFpbmVyLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY2FudmFzLm9uY2xpY2sgPSBudWxsXG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleXVwXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICB3YWxraW5nTm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoV2Fsa2luZylcbiAgVHZOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShUdilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIC8vICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIC8vIH0sIDEwMDApXG5cbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuICBkYXNoYm9hcmRfYmcuc2V0Qm91bmRzKDAsIDAsIDQwMCwgMTIwKVxuXG4gIGRhc2hib2FyZF9mZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzkzY2RiXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDM4MCwgMTAwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfZmcueCA9IDIxMFxuICBkYXNoYm9hcmRfZmcueSA9IDQwXG5cblxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG4gIHRyYW5jZXRhYmxlLnNldEJvdW5kcygwLCAwLCAyNTAsIDEyMClcblxuICAvLyBwZXJzb24gb24gdHJhbmNlIHRhYmxlIVxuXG4gIC8vIHdvbGYgaW1hZ2VcbiAgd29sZkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwid29sZmltYWdlXCIpKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG4gIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG5cbiAgLy8gdHZcbiAgdHZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcInR2aW1hZ2VcIikpO1xuICB0dkJpdG1hcC54ID0gNDBcbiAgdHZCaXRtYXAueSA9IDE0MFxuICB0dkJpdG1hcC5zY2FsZVggPSB0dkJpdG1hcC5zY2FsZVkgPSAxLjVcblxuICAvLyBjaGFpclxuICBjaGFpckJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiY2hhaXJpbWFnZVwiKSk7XG4gIGNoYWlyQml0bWFwLnggPSAxMDBcbiAgY2hhaXJCaXRtYXAueSA9IDE3MFxuICBjaGFpckJpdG1hcC5zY2FsZVggPSBjaGFpckJpdG1hcC5zY2FsZVkgPSAuMzVcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW3F1ZXVlLmdldFJlc3VsdChcInNwcml0ZXNoZWV0aW1hZ2VcIildLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclNwcml0ZSwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIDEwMCwgNDYsIDUwKVxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgdHJhbmNlbGV2ZWx0ZXh0LCBub2lzZWxldmVsdGV4dCwgdHJhbmNldGFibGUsIHdvbGZCaXRtYXAsIHR2Qml0bWFwLCBjaGFpckJpdG1hcCwgcGxheWVyU3ByaXRlKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuICBzdGFnZS5hZGRDaGlsZChnYW1lQ29udGFpbmVyKVxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcbiAgcGxheWVyU3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG5mdW5jdGlvbiBwbGF5WW91TG9zdFNjZW5lKCkge1xuICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91TG9zdFRleHQueCA9IDM2MFxuICB5b3VMb3N0VGV4dC55ID0gMTE1XG4gIHlvdUxvc3RUZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YWdlLmFkZENoaWxkKHlvdUxvc3RUZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG59XG5cbi8vIFwieW91IGxvc3RcIiBwYWdlIGZ1bmN0aW9uXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGluaXQoKVxufVxuIiwiZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgb3V0ZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIGlubmVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBwcm9ncmVzczogbnVtYmVyXG4gIHN0YWdlPzogY3JlYXRlanMuU3RhZ2VcbiAgcmVtb3ZlT25Mb2FkOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKHN0YWdlOiBjcmVhdGVqcy5TdGFnZSwgcmVtb3ZlT25Mb2FkOiBib29sZWFuKSB7XG4gICAgdGhpcy5vdXRlckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5pbm5lckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5vdXRlckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTgxODE4XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgNjAsIDUsIDUsIDUsIDUpXG4gICAgdGhpcy5vdXRlckJhci54ID0gMjAwXG4gICAgdGhpcy5vdXRlckJhci55ID0gMjcwXG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLm91dGVyQmFyKVxuXG4gICAgdGhpcy5pbm5lckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzI3ZmE4XCIpLmRyYXdSZWN0KDAsIDAsIDM4MCwgNDApXG4gICAgdGhpcy5pbm5lckJhci54ID0gMjEwXG4gICAgdGhpcy5pbm5lckJhci55ID0gMjgwXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG5cbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZVxuICAgIHRoaXMucmVtb3ZlT25Mb2FkID0gcmVtb3ZlT25Mb2FkXG4gIH1cbiAgaGFuZGxlUHJvZ3Jlc3MoZXZlbnQ6IE9iamVjdCkge1xuICAgIHZhciBwcm9ncmVzc0V2ZW50ID0gPGNyZWF0ZWpzLlByb2dyZXNzRXZlbnQ+ZXZlbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NFdmVudC5wcm9ncmVzc1xuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YWdlKSB7XG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLm91dGVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gICAgICB0aGlzLnN0YWdlID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIGhhbmRsZUNvbXBsZXRlKGV2ZW50OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVPbkxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKClcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmV4cG9ydCBsZXQgd29sZlNvdW5kOiBzdHJpbmcgPSBcIndvbGZcIlxuZXhwb3J0IGxldCBvdXRzaWRlU291bmQ6IHN0cmluZyA9IFwib3V0c2lkZVwiXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNvdW5kcyhxdWV1ZTogY3JlYXRlanMuTG9hZFF1ZXVlLCBuZXh0OiAoKSA9PiB2b2lkLCBwcm9ncmVzc0Jhcj86IFByb2dyZXNzQmFyKSB7XG4gIHF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gW1wibXAzXCJdO1xuICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICBxdWV1ZS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzLCBwcm9ncmVzc0JhcilcbiAgfVxuICBxdWV1ZS5vbihcImNvbXBsZXRlXCIsIHtcbiAgICBoYW5kbGVFdmVudDogKGV2ZW50KSA9PiB7XG4gICAgICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgcXVldWUub2ZmKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MpXG4gICAgICAgIHByb2dyZXNzQmFyLmhhbmRsZUNvbXBsZXRlKGV2ZW50KVxuICAgICAgfVxuICAgICAgbmV4dCgpXG4gICAgfVxuICB9KVxuICBxdWV1ZS5sb2FkTWFuaWZlc3QoW1xuICAgIHsgaWQ6IFwid29sZlwiLCBzcmM6IFwicmVzL3dvbGYubXAzXCIgfSxcbiAgICB7IGlkOiBcIm91dHNpZGVcIiwgc3JjOiBcInJlcy9vdXRzaWRlLm1wM1wiIH0sXG4gICAgeyBpZDogXCJpbnRyb2NhYmluXCIsIHNyYzogXCJyZXMvaW50cm9jYWJpbi5qcGdcIiB9LFxuICAgIHsgaWQ6IFwidHZub2lzZVwiLCBzcmM6IFwicmVzL3R2c291bmQubXAzXCIgfSxcbiAgICB7IGlkOiBcInR2aW1hZ2VcIiwgc3JjOiBcInJlcy90dmltYWdlLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJzcHJpdGVzaGVldGltYWdlXCIsIHNyYzogXCJyZXMvcGxheWVyLXNwcml0ZW1hcC12OS1yZWRwYW50cy5wbmdcIiB9LFxuICAgIHsgaWQ6IFwiY2hhaXJpbWFnZVwiLCBzcmM6IFwicmVzL2NoYWlyLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJ3b2xmaW1hZ2VcIiwgc3JjOiBcInJlcy93b2xmLnBuZ1wiIH1cbiAgXSlcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==