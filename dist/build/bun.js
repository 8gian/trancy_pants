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
            if (tranceLevel < 10) {
                tranceLevel -= (noiseLevel - 5);
                tranceLevel = Math.floor(tranceLevel);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUs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QUUsV0FBVyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7S0FDOUQ7SUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixJQUFJLFdBQVcsRUFBRTtnQkFDZixLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsY0FBYyxDQUFDO2dCQUNqRCxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUNsQztZQUNELElBQUksRUFBRTtRQUNSLENBQUM7S0FDRixDQUFDO0lBQ0YsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNqQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRTtRQUNuQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUU7UUFDL0MsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtRQUN6QyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxzQ0FBc0MsRUFBRTtRQUN2RSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTtRQUMxQyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRTtLQUN6QyxDQUFDO0FBQ0osQ0FBQztBQXpCRCxnQ0F5QkMiLCJmaWxlIjoiYnVpbGQvYnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuaW1wb3J0IHsgbG9hZFNvdW5kcyB9IGZyb20gXCIuL3NvdW5kXCJcbmxldCBjaXJjbGU6IGNyZWF0ZWpzLlNoYXBlXG5sZXQgc3RhZ2U6IGNyZWF0ZWpzLlN0YWdlXG5sZXQgVHZOb2lzZTogUGxheWVyTm9pc2VcbmxldCB3YWxraW5nTm9pc2U6IFBsYXllck5vaXNlXG5sZXQgdHJhbmNlTGV2ZWwgPSAwXG5sZXQgbm9pc2VMZXZlbCA9IDBcbmxldCBsYXN0Tm9pc2VMZXZlbCA9IDBcbmxldCBsYXN0VGlja1RpbWUgPSAwXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuLy8gdmFyIGludHJvQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgZ2FtZUNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxuLy8gdmFyIHlvdVdvbkNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIG91dGVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGlubmVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9iZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9mZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJUcmFuY2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiTm9pc2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91V29uVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IHdvbiFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VMb3N0VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGxvc3QhXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xubGV0IGdyZXljaXJjbGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxudmFyIHdvbGZsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiV29sZlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjMzAyYTM2XCIpO1xudmFyIHRyYW5jZVJhdGU6IG51bWJlciA9IDAuMDAwM1xudmFyIHdhbGtTcGVlZDogbnVtYmVyID0gNDAgLyAxMDAwXG52YXIgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKTtcbnZhciBwbGF5ZXI6IFBsYXllclxudmFyIHdvbGZCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIGNoYWlyQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciB0dkJpdG1hcDogY3JlYXRlanMuQml0bWFwXG5cbmZ1bmN0aW9uIGdldE9iamVjdEJvdW5kcygpIHtcbiAgcmV0dXJuIFtjaGFpckJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCB0cmFuY2V0YWJsZS5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCBkYXNoYm9hcmRfYmcuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKV1cbn1cbmZ1bmN0aW9uIGNyb3BCb3VuZHMoYm91bmRzOiBjcmVhdGVqcy5SZWN0YW5nbGUsIGhvcml6OiBudW1iZXIsIHZlcnQ6IG51bWJlcikge1xuICByZXR1cm4gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZShib3VuZHMueCArIGhvcml6LCBib3VuZHMueSArIHZlcnQsIGJvdW5kcy53aWR0aCAtIDIgKiBob3JpeiwgYm91bmRzLmhlaWdodCAtIDIgKiB2ZXJ0KVxufVxuXG5mdW5jdGlvbiBib3VuZHNDb2xsaWRlKG9iajE6IGNyZWF0ZWpzLlJlY3RhbmdsZSwgb2JqMjogY3JlYXRlanMuUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gIGlmIChvYmoxLnggKyBvYmoxLndpZHRoID4gb2JqMi54ICYmIG9iajEueCA8IG9iajIueCArIG9iajIud2lkdGgpIHtcbiAgICBpZiAob2JqMS55ICsgb2JqMi5oZWlnaHQgPiBvYmoyLnkgJiYgb2JqMS55IDwgb2JqMi55ICsgb2JqMi5oZWlnaHQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5jbGFzcyBOb2lzZSB7XG4gIG5vaXNlTGV2ZWw6IG51bWJlclxuICBkdXJhdGlvbk1zOiBudW1iZXJcbiAgc291bmQ6IHN0cmluZ1xuICBjb25zdHJ1Y3Rvcihub2lzZUxldmVsOiBudW1iZXIsIGR1cmF0aW9uTVM6IG51bWJlciwgc291bmQ6IHN0cmluZykge1xuICAgIHRoaXMubm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbiAgICB0aGlzLmR1cmF0aW9uTXMgPSBkdXJhdGlvbk1TXG4gICAgdGhpcy5zb3VuZCA9IHNvdW5kXG4gIH1cbn1cblxuY29uc3QgV29sZiA9IG5ldyBOb2lzZSgzLCAyMDAwLCBcIndvbGZcIilcbmNvbnN0IE91dHNpZGVXaW5kb3cgPSBuZXcgTm9pc2UoMiwgMTAwMCwgXCJvdXRzaWRlXCIpXG5jb25zdCBXYWxraW5nID0gbmV3IE5vaXNlKDEsIDEwMDAsIFwid2Fsa2luZ1wiKVxuY29uc3QgVHYgPSBuZXcgTm9pc2UoMywgMCwgXCJ0dm5vaXNlXCIpXG5cbmNsYXNzIFRpbWVkTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zKSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFdvbGZOb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBkaXN0cmVzc0xldmVsOiBudW1iZXIgPSAwXG4gIHN0YXJ0RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBtYXhEaXN0cmVzc0xldmVsOiBudW1iZXIgPSAzXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIHJlcGVhdEFmdGVyOiBudW1iZXJcbiAgaW5pdGlhbFN0YXJ0VGltZTogbnVtYmVyXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgZW5kVGltZTogbnVtYmVyXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlciwgcmVwZWF0QWZ0ZXI6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnJlcGVhdEFmdGVyID0gcmVwZWF0QWZ0ZXJcbiAgICB0aGlzLmVuZFRpbWUgPSBzdGFydFRpbWUgKyBuLmR1cmF0aW9uTXNcbiAgICB0aGlzLmluaXRpYWxTdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuZGlzdHJlc3NMZXZlbCA9IHRoaXMuc3RhcnREaXN0cmVzc0xldmVsXG4gICAgICBpZiAodGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuc291bmRJbnN0YW5jZSEubXV0ZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwXG4gICAgICB0aGlzLmVuZFRpbWUgPSAwXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLnN0YXJ0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5pbml0aWFsU3RhcnRUaW1lXG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3VuZEluc3RhbmNlICYmIHRpbWUgPj0gdGhpcy5lbmRUaW1lKSB7XG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgICBpZiAodGhpcy5yZXBlYXRBZnRlcikge1xuICAgICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSBNYXRoLm1pbih0aGlzLmRpc3RyZXNzTGV2ZWwgKyAxLCB0aGlzLm1heERpc3RyZXNzTGV2ZWwpXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lICs9IHRoaXMubm9pc2UuZHVyYXRpb25NcyArIHRoaXMucmVwZWF0QWZ0ZXJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9ICh0aGlzLmRpc3RyZXNzTGV2ZWwgKyAxKSAvICh0aGlzLm1heERpc3RyZXNzTGV2ZWwgKyAxKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgdGhpcy5lbmRUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWwgKyB0aGlzLmRpc3RyZXNzTGV2ZWxcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBQbGF5ZXJOb2lzZSB7XG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlOiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2VcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgY29uc3RydWN0b3IobjogTm9pc2UpIHtcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZCwgeyBsb29wOiAtMSwgdm9sdW1lOiAwIH0pXG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9IDFcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9IDBcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG59XG5cbmNsYXNzIFBsYXllciB7XG4gIHNwcml0ZTogY3JlYXRlanMuU3ByaXRlXG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICB3YWxraW5nTGVmdDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nUmlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1VwOiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdEb3duOiBib29sZWFuID0gZmFsc2U7XG4gIG1vdmluZzogYm9vbGVhbiA9IGZhbHNlXG4gIG9uV29sZjogYm9vbGVhbiA9IGZhbHNlXG4gIG9uVHY6IGJvb2xlYW4gPSBmYWxzZVxuICB0aW1lT25UdjogbnVtYmVyID0gMFxuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZTogY3JlYXRlanMuU3ByaXRlLCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcbiAgICB0aGlzLnggPSBzdGFydFhcbiAgICB0aGlzLnkgPSBzdGFydFlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy55XG4gIH1cbiAgZ2V0Qm91bmRzKCk6IGNyZWF0ZWpzLlJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIGNyb3BCb3VuZHMobmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLCAxNSwgMTApXG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgbGV0IGxhc3RYID0gdGhpcy54XG4gICAgbGV0IGxhc3RZID0gdGhpcy55XG4gICAgbGV0IGhvcml6ID0gMFxuICAgIGxldCB2ZXJ0ID0gMFxuICAgIGlmICh0aGlzLndhbGtpbmdMZWZ0KSB7XG4gICAgICBob3JpeiAtPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdSaWdodCkge1xuICAgICAgaG9yaXogKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nRG93bikge1xuICAgICAgdmVydCArPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdVcCkge1xuICAgICAgdmVydCAtPSAxXG4gICAgfVxuICAgIGlmIChNYXRoLmFicyh2ZXJ0KSA+IDAgfHwgTWF0aC5hYnMoaG9yaXopID4gMCkge1xuICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kU3RvcCgwKVxuICAgIH1cbiAgICBsZXQgc3BlZWQgPSB0aGlzLm1vdmluZyA/ICgxIC8gTWF0aC5zcXJ0KE1hdGgucG93KGhvcml6LCAyKSArIE1hdGgucG93KHZlcnQsIDIpKSkgKiB3YWxrU3BlZWQgOiAwXG4gICAgdGhpcy54ICs9IGhvcml6ICogc3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB0aGlzLnkgKz0gdmVydCAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG5cbiAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLngsIGNhbnZhcy53aWR0aCAtIDE1IC0gdGhpcy53aWR0aCkpXG4gICAgdGhpcy55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy55LCBjYW52YXMuaGVpZ2h0IC0gMTUgLSB0aGlzLmhlaWdodCkpXG4gICAgaWYgKHRoaXMuZWplY3RTcHJpdGVGcm9tT2JqZWN0cygpKSB7XG4gICAgICB0aGlzLnggPSBsYXN0WFxuICAgICAgdGhpcy55ID0gbGFzdFlcbiAgICB9XG5cbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueSA9IHRoaXMueVxuICAgIGlmICh0aGlzLm9uVHYpIHtcbiAgICAgIHRoaXMudGltZU9uVHYgKz0gdGltZSAtIGxhc3RUaWNrVGltZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVPblR2ID0gMFxuICAgIH1cbiAgICB0aGlzLnBlcmZvcm1JbnRlcmFjdGlvbnMoKVxuICAgIGlmICh0aGlzLm9uVHYgJiYgdGhpcy50aW1lT25UdiA+IDMwMDApIHtcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfVxuICB9XG4gIGVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKVxuICAgIGNvbnN0IG9iamVjdHMgPSBnZXRPYmplY3RCb3VuZHMoKVxuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0cykge1xuICAgICAgaWYgKGJvdW5kc0NvbGxpZGUoYm91bmRzLCBvYmplY3RzW2ldKSkge1xuICAgICAgICBpZiAoaSA9PSBcIjBcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGNoYWlyXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjFcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IHRhYmxlXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjJcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGRhc2hib2FyZFwiKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm91bmRzIFwiICsgb2JqZWN0c1tpXSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcGVyZm9ybUludGVyYWN0aW9ucygpIHtcbiAgICB2YXIgbmV3T25Xb2xmID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCB3b2xmQml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCkpXG4gICAgdmFyIG5ld09uVHYgPSBib3VuZHNDb2xsaWRlKHRoaXMuZ2V0Qm91bmRzKCksIHR2Qml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCkpXG4gICAgaWYgKG5ld09uVHYgJiYgIXRoaXMub25Udikge1xuICAgICAgVHZOb2lzZS5hY3RpdmUgPSAhVHZOb2lzZS5hY3RpdmVcbiAgICB9XG4gICAgaWYgKG5ld09uV29sZiAmJiB0aGlzLm9uV29sZikge1xuICAgICAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgVHZOb2lzZS5hY3RpdmUgPSB0cnVlIH0sIDQwMDApXG4gICAgfVxuICAgIHRoaXMub25Xb2xmID0gbmV3T25Xb2xmXG4gICAgdGhpcy5vblR2ID0gbmV3T25UdlxuICB9XG59XG5cbmxldCB3b2xmTm9pc2UgPSBuZXcgV29sZk5vaXNlKFdvbGYsIDIwMDAsIDQwMDApXG52YXIgbG9nSXQgPSAwXG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICAvLyBsZXQgdGltZUxlZnRvdmVyID0gdGltZSAlIDUwO1xuICAvLyB0aW1lIC09IHRpbWVMZWZ0b3ZlcjtcbiAgdmFyIGRlbHRhVGltZTogbnVtYmVyID0gdGltZSAtIGxhc3RUaWNrVGltZVxuXG4gIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB9XG4gIHBsYXllci51cGRhdGUodGltZSlcbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuXG4gIGlmICh0cmFuY2VMZXZlbCA+PSAxMCkge1xuICAgIHRyYW5jZUxldmVsID0gMTBcbiAgICBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgICAgcGxheVlvdVdvblNjZW5lKClcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgIHBsYXlZb3VMb3N0U2NlbmUoKVxuICB9XG4gIGlmICh0cmFuY2VMZXZlbCA8IDApIHtcbiAgICBwbGF5WW91TG9zdFNjZW5lKClcbiAgfVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG4gIHZhciByb3VuZGVkVHJhbmNlTGV2ZWwgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCAqIDEwMCkgLyAxMDApXG4gIGlmIChsb2dJdCAlIDE0ID09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpbWU6IFwiICsgKHRpbWUgLyAxMDAwKSArIFwiLCB0cmFuY2U6IFwiICsgcm91bmRlZFRyYW5jZUxldmVsICsgXCIsIG5vaXNlOiBcIiArIG5vaXNlTGV2ZWwpXG4gIH1cbiAgbG9nSXQrK1xuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgd29sZk5vaXNlLnRpY2sodGltZSlcbiAgbm9pc2VMZXZlbCArPSB3YWxraW5nTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIFR2Tm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIHdvbGZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIGlmIChub2lzZUxldmVsID4gbGFzdE5vaXNlTGV2ZWwpIHtcbiAgICBpZiAobm9pc2VMZXZlbCA+PSA1KSB7XG4gICAgICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgICAgICB0cmFuY2VMZXZlbCAtPSAobm9pc2VMZXZlbCAtIDUpXG4gICAgICAgIHRyYW5jZUxldmVsID0gTWF0aC5mbG9vcih0cmFuY2VMZXZlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGFzdE5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RXZlbnQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVLZXlFdmVudClcbiAgdmFyIHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKHN0YWdlLCB0cnVlKVxuICBsb2FkU291bmRzKHF1ZXVlLCBzdGFydFNjZW5lcywgcHJvZ3Jlc3NCYXIpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2NlbmVzKCkge1xuICBwbGF5SW50cm9TY2VuZSgpXG59XG5cbi8vIGludHJvIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlJbnRyb1NjZW5lKCkge1xuICAvLyBtYWtlIHRoZSBzdGFnZVxuXG4gIC8vIGVsZW1lbnRzIG9mIHRoZSB0aXRsZSBwYWdlXG4gIHZhciBjYWJpbkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiaW50cm9jYWJpblwiKSlcbiAgY2FiaW5CaXRtYXAueCA9IGNhYmluQml0bWFwLnkgPSAwXG4gIGNhYmluQml0bWFwLnNjYWxlWCA9IGNhYmluQml0bWFwLnNjYWxlWSA9IC40NVxuICAvLyBpbnRyb0NvbnRhaW5lci5hZGRDaGlsZChjYWJpbkJpdG1hcClcblxuICBzdGFnZS5hZGRDaGlsZChjYWJpbkJpdG1hcClcbiAgLy8gIHdhaXQgYSBoYWxmIHNlY29uZCBmb3IgdGhlIGNhYmluIGltYWdlIHRvIGxvYWQgYmVmb3JlIHVwZGF0aW5nIHRoZSBzdGFnZVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA1MDApO1xuXG4gIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNhbnZhcy5vbmNsaWNrID0gbnVsbFxuICAgIHBsYXlHYW1lU2NlbmUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUtleUV2ZW50KGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IGtleUV2ZW50ID0gPEtleWJvYXJkRXZlbnQ+ZXZlbnQ7XG4gIGlmIChwbGF5ZXIpIHtcbiAgICBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleWRvd25cIikge1xuICAgICAgc3dpdGNoIChrZXlFdmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1JpZ2h0ID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0xlZnQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nVXAgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleUV2ZW50LnR5cGUgPT0gXCJrZXl1cFwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgd2Fsa2luZ05vaXNlID0gbmV3IFBsYXllck5vaXNlKFdhbGtpbmcpXG4gIFR2Tm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoVHYpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAvLyAgIFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAvLyB9LCAxMDAwKVxuXG4gIC8vIGNyZWF0ZSBhIGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gIG91dGVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNGQxYzIwXCIpLmRyYXdSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcblxuICAvLyBjcmVhdGUgdGhlIGlubmVyIHJlY3RhbmdsZSBmb3IgdGhlIFwiZmxvb3JcIiBvZiB0aGUgY2FiaW5cbiAgaW5uZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM3ZTZhOTRcIikuZHJhd1JlY3QoMTUsIDE1LCBjYW52YXMud2lkdGggLSAzMCwgY2FudmFzLmhlaWdodCAtIDMwKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgZGFzaGJvYXJkX2JnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxNDE2NzBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCAxMjAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9iZy54ID0gMjAwXG4gIGRhc2hib2FyZF9iZy55ID0gMzBcbiAgZGFzaGJvYXJkX2JnLnNldEJvdW5kcygwLCAwLCA0MDAsIDEyMClcblxuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuXG5cbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB0cmFuY2VsYWJlbC54ID0gMjI1XG4gIHRyYW5jZWxhYmVsLnkgPSA3NVxuICB0cmFuY2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxhYmVsLnggPSAyMjVcbiAgbm9pc2VsYWJlbC55ID0gMTE1XG4gIG5vaXNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gbWV0cmljcyBudW1iZXJzXG4gIHRyYW5jZWxldmVsdGV4dC54ID0gMzYwXG4gIHRyYW5jZWxldmVsdGV4dC55ID0gNzVcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgbm9pc2VsZXZlbHRleHQueSA9IDExNVxuICBub2lzZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyB0cmFuY2UgdGFibGUhXG4gIHRyYW5jZXRhYmxlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNiZGYyZTJcIikuZHJhd1JlY3QoMCwgMCwgMjUwLCAxMjApXG4gIHRyYW5jZXRhYmxlLnggPSAyNzVcbiAgdHJhbmNldGFibGUueSA9IDI1MFxuICB0cmFuY2V0YWJsZS5zZXRCb3VuZHMoMCwgMCwgMjUwLCAxMjApXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuICAvLyB3b2xmIGltYWdlXG4gIHdvbGZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcIndvbGZpbWFnZVwiKSk7XG4gIHdvbGZCaXRtYXAueCA9IGNhbnZhcy53aWR0aCAtIDE1MFxuICB3b2xmQml0bWFwLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG4gIHdvbGZCaXRtYXAuc2NhbGVYID0gd29sZkJpdG1hcC5zY2FsZVkgPSAuMlxuICB3b2xmTm9pc2UuYWN0aXZlID0gdHJ1ZVxuXG4gIC8vIHR2XG4gIHR2Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ0dmltYWdlXCIpKTtcbiAgdHZCaXRtYXAueCA9IDQwXG4gIHR2Qml0bWFwLnkgPSAxNDBcbiAgdHZCaXRtYXAuc2NhbGVYID0gdHZCaXRtYXAuc2NhbGVZID0gMS41XG5cbiAgLy8gY2hhaXJcbiAgY2hhaXJCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImNoYWlyaW1hZ2VcIikpO1xuICBjaGFpckJpdG1hcC54ID0gMTAwXG4gIGNoYWlyQml0bWFwLnkgPSAxNzBcbiAgY2hhaXJCaXRtYXAuc2NhbGVYID0gY2hhaXJCaXRtYXAuc2NhbGVZID0gLjM1XG5cbiAgdmFyIHBsYXllclNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICBpbWFnZXM6IFtxdWV1ZS5nZXRSZXN1bHQoXCJzcHJpdGVzaGVldGltYWdlXCIpXSxcbiAgICBmcmFtZXM6IHtcbiAgICAgIHdpZHRoOiA0NixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjb3VudDogNDBcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHJ1bjogWzI0LCAzMSwgXCJydW5cIiwgMSAvIDVdXG4gICAgfVxuICB9KVxuICB2YXIgcGxheWVyU3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShwbGF5ZXJTcHJpdGVTaGVldClcbiAgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJTcHJpdGUsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLSAxMDAsIDQ2LCA1MClcblxuICAvLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNvbnRhaW5lciBmb3IgdGhpcyBzY2VuZVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKG91dGVyd2FsbCwgaW5uZXJ3YWxsLCBkYXNoYm9hcmRfYmcsIGRhc2hib2FyZF9mZywgdHJhbmNlbGFiZWwsIG5vaXNlbGFiZWwsIHRyYW5jZWxldmVsdGV4dCwgbm9pc2VsZXZlbHRleHQsIHRyYW5jZXRhYmxlLCB3b2xmQml0bWFwLCB0dkJpdG1hcCwgY2hhaXJCaXRtYXAsIHBsYXllclNwcml0ZSlcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcbiAgc3RhZ2UuYWRkQ2hpbGQoZ2FtZUNvbnRhaW5lcilcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG4gIHBsYXllclNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxufVxuXG5cblxuLy8gXCJ5b3Ugd29uXCIgcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheVlvdVdvblNjZW5lKCkge1xuICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91V29uVGV4dC54ID0gMzYwXG4gIHlvdVdvblRleHQueSA9IDExNVxuICB5b3VXb25UZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YWdlLmFkZENoaWxkKHlvdVdvblRleHQpXG5cbiAgc3RhZ2UudXBkYXRlKClcbn1cblxuZnVuY3Rpb24gcGxheVlvdUxvc3RTY2VuZSgpIHtcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdUxvc3RUZXh0LnggPSAzNjBcbiAgeW91TG9zdFRleHQueSA9IDExNVxuICB5b3VMb3N0VGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBzdGFnZS5hZGRDaGlsZCh5b3VMb3N0VGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIG91dGVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBpbm5lckJhcjogY3JlYXRlanMuU2hhcGVcbiAgcHJvZ3Jlc3M6IG51bWJlclxuICBzdGFnZT86IGNyZWF0ZWpzLlN0YWdlXG4gIHJlbW92ZU9uTG9hZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihzdGFnZTogY3JlYXRlanMuU3RhZ2UsIHJlbW92ZU9uTG9hZDogYm9vbGVhbikge1xuICAgIHRoaXMub3V0ZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMuaW5uZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMub3V0ZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE4MTgxOFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDYwLCA1LCA1LCA1LCA1KVxuICAgIHRoaXMub3V0ZXJCYXIueCA9IDIwMFxuICAgIHRoaXMub3V0ZXJCYXIueSA9IDI3MFxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5vdXRlckJhcilcblxuICAgIHRoaXMuaW5uZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzMyN2ZhOFwiKS5kcmF3UmVjdCgwLCAwLCAzODAsIDQwKVxuICAgIHRoaXMuaW5uZXJCYXIueCA9IDIxMFxuICAgIHRoaXMuaW5uZXJCYXIueSA9IDI4MFxuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2VcbiAgICB0aGlzLnJlbW92ZU9uTG9hZCA9IHJlbW92ZU9uTG9hZFxuICB9XG4gIGhhbmRsZVByb2dyZXNzKGV2ZW50OiBPYmplY3QpIHtcbiAgICB2YXIgcHJvZ3Jlc3NFdmVudCA9IDxjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50PmV2ZW50XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzRXZlbnQucHJvZ3Jlc3NcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcbiAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICAgICAgdGhpcy5zdGFnZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuICBoYW5kbGVDb21wbGV0ZShldmVudDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlT25Mb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5leHBvcnQgbGV0IHdvbGZTb3VuZDogc3RyaW5nID0gXCJ3b2xmXCJcbmV4cG9ydCBsZXQgb3V0c2lkZVNvdW5kOiBzdHJpbmcgPSBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTb3VuZHMocXVldWU6IGNyZWF0ZWpzLkxvYWRRdWV1ZSwgbmV4dDogKCkgPT4gdm9pZCwgcHJvZ3Jlc3NCYXI/OiBQcm9ncmVzc0Jhcikge1xuICBxdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFtcIm1wM1wiXTtcbiAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgcXVldWUub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcywgcHJvZ3Jlc3NCYXIpXG4gIH1cbiAgcXVldWUub24oXCJjb21wbGV0ZVwiLCB7XG4gICAgaGFuZGxlRXZlbnQ6IChldmVudCkgPT4ge1xuICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgIHF1ZXVlLm9mZihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzKVxuICAgICAgICBwcm9ncmVzc0Jhci5oYW5kbGVDb21wbGV0ZShldmVudClcbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH1cbiAgfSlcbiAgcXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICB7IGlkOiBcIndvbGZcIiwgc3JjOiBcInJlcy93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJvdXRzaWRlXCIsIHNyYzogXCJyZXMvb3V0c2lkZS5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiaW50cm9jYWJpblwiLCBzcmM6IFwicmVzL2ludHJvY2FiaW4uanBnXCIgfSxcbiAgICB7IGlkOiBcInR2bm9pc2VcIiwgc3JjOiBcInJlcy90dnNvdW5kLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ0dmltYWdlXCIsIHNyYzogXCJyZXMvdHZpbWFnZS5wbmdcIiB9LFxuICAgIHsgaWQ6IFwic3ByaXRlc2hlZXRpbWFnZVwiLCBzcmM6IFwicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCIgfSxcbiAgICB7IGlkOiBcImNoYWlyaW1hZ2VcIiwgc3JjOiBcInJlcy9jaGFpci5wbmdcIiB9LFxuICAgIHsgaWQ6IFwid29sZmltYWdlXCIsIHNyYzogXCJyZXMvd29sZi5wbmdcIiB9XG4gIF0pXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=