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
var tranceRate = 0.0005;
var walkSpeed = 20 / 1000;
var queue = new createjs.LoadQueue(false);
var player;
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
const Tv = new Noise(5, 0, "tvnoise");
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
        this.maxDistressLevel = 4;
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
        this.sprite = sprite;
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;
        this.sprite.x = this.x;
        this.sprite.x = this.y;
    }
    update(time) {
        if (this.walkingLeft) {
            this.x -= walkSpeed * (time - lastTickTime);
        }
        if (this.walkingDown) {
            this.y += walkSpeed * (time - lastTickTime);
        }
        if (this.walkingRight) {
            this.x += walkSpeed * (time - lastTickTime);
        }
        if (this.walkingUp) {
            this.y -= walkSpeed * (time - lastTickTime);
        }
        if (this.sprite.x == this.x && this.sprite.y == this.y) {
            this.sprite.gotoAndStop(0);
            this.moving = false;
        }
        else {
            if (!this.moving) {
                this.moving = true;
                this.sprite.gotoAndPlay("run");
            }
        }
        if (this.moving) {
            walkingNoise.active = true;
        }
        else {
            walkingNoise.active = false;
        }
        this.x = Math.max(0, Math.min(this.x, canvas.width - 15 - this.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height - 15 - this.height));
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}
let wolfNoise = new WolfNoise(Wolf, 2000, 3000);
var logIt = 0;
function gameLoop(event) {
    let time = createjs.Ticker.getTime();
    // let timeLeftover = time % 50;
    // time -= timeLeftover;
    var deltaTime = time - lastTickTime;
    updateTranceLevel(deltaTime);
    player.update(time);
    updateNoiseLevel(time);
    // end of variable updates, only displays below
    var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100);
    if (logIt % 14 == 0) {
        // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    if (tranceLevel >= 15) {
        playYouWonScene();
    }
    if (tranceLevel < 0) {
        playYouLostScene();
    }
    let e = (event);
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
        else {
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
    // person on trance table!
    // wolf image
    var wolfBitmap = new createjs.Bitmap("res/wolf.png");
    wolfBitmap.x = canvas.width - 150;
    wolfBitmap.y = canvas.height - 100;
    wolfBitmap.scaleX = wolfBitmap.scaleY = .2;
    wolfNoise.active = true;
    // tv
    var tvBitmap = new createjs.Bitmap("res/tvimage.png");
    tvBitmap.x = 40;
    tvBitmap.y = 140;
    tvBitmap.scaleX = tvBitmap.scaleY = 1.5;
    // chair
    var chairBitmap = new createjs.Bitmap("res/chair.png");
    chairBitmap.x = 100;
    chairBitmap.y = 170;
    chairBitmap.scaleX = chairBitmap.scaleY = .35;
    var playerSpriteSheet = new createjs.SpriteSheet({
        images: ["res/player-spritemap-v9-redpants.png"],
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
        { id: "tvimage", src: "res/tvimage.png" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUs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LEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUU7UUFDekMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRTtRQUMvQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFDO1FBQ3hDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRyxHQUFHLEVBQUUsaUJBQWlCLEVBQUM7S0FDMUMsQ0FBQztBQUNKLENBQUM7QUF0QkQsZ0NBc0JDIiwiZmlsZSI6ImJ1aWxkL2J1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IFR2Tm9pc2U6IFBsYXllck5vaXNlXG5sZXQgd2Fsa2luZ05vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdE5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbi8vIHZhciBpbnRyb0NvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIGdhbWVDb250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbi8vIHZhciB5b3VXb25Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBvdXRlcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBpbm5lcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfZmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0cmFuY2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiVHJhbmNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIk5vaXNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdVdvblRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSB3b24hXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91TG9zdFRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSBsb3N0IVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNldGFibGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbmxldCBncmV5Y2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbnZhciB3b2xmbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIldvbGZcIiwgXCIyMHB4IEFyaWFsXCIsIFwiIzMwMmEzNlwiKTtcbnZhciB0cmFuY2VSYXRlOiBudW1iZXIgPSAwLjAwMDVcbnZhciB3YWxrU3BlZWQ6IG51bWJlciA9IDIwIC8gMTAwMFxudmFyIHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSk7XG52YXIgcGxheWVyOiBQbGF5ZXJcblxuY2xhc3MgTm9pc2Uge1xuICBub2lzZUxldmVsOiBudW1iZXJcbiAgZHVyYXRpb25NczogbnVtYmVyXG4gIHNvdW5kOiBzdHJpbmdcbiAgY29uc3RydWN0b3Iobm9pc2VMZXZlbDogbnVtYmVyLCBkdXJhdGlvbk1TOiBudW1iZXIsIHNvdW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG4gICAgdGhpcy5kdXJhdGlvbk1zID0gZHVyYXRpb25NU1xuICAgIHRoaXMuc291bmQgPSBzb3VuZFxuICB9XG59XG5cbmNvbnN0IFdvbGYgPSBuZXcgTm9pc2UoMywgMjAwMCwgXCJ3b2xmXCIpXG5jb25zdCBPdXRzaWRlV2luZG93ID0gbmV3IE5vaXNlKDIsIDEwMDAsIFwib3V0c2lkZVwiKVxuY29uc3QgV2Fsa2luZyA9IG5ldyBOb2lzZSgxLCAxMDAwLCBcIndhbGtpbmdcIilcbmNvbnN0IFR2ID0gbmV3IE5vaXNlKDUsIDAsIFwidHZub2lzZVwiKVxuXG5jbGFzcyBUaW1lZE5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25NcykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBXb2xmTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgZGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBzdGFydERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgbWF4RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gNFxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICByZXBlYXRBZnRlcjogbnVtYmVyXG4gIGluaXRpYWxTdGFydFRpbWU6IG51bWJlclxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGVuZFRpbWU6IG51bWJlclxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIsIHJlcGVhdEFmdGVyOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5yZXBlYXRBZnRlciA9IHJlcGVhdEFmdGVyXG4gICAgdGhpcy5lbmRUaW1lID0gc3RhcnRUaW1lICsgbi5kdXJhdGlvbk1zXG4gICAgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSB0aGlzLnN0YXJ0RGlzdHJlc3NMZXZlbFxuICAgICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UhLm11dGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMFxuICAgICAgdGhpcy5lbmRUaW1lID0gMFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZSArIHRoaXMuaW5pdGlhbFN0YXJ0VGltZVxuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICB9XG4gICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSAmJiB0aW1lID49IHRoaXMuZW5kVGltZSkge1xuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMucmVwZWF0QWZ0ZXIpIHtcbiAgICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gTWF0aC5taW4odGhpcy5kaXN0cmVzc0xldmVsICsgMSwgdGhpcy5tYXhEaXN0cmVzc0xldmVsKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZSArPSB0aGlzLm5vaXNlLmR1cmF0aW9uTXMgKyB0aGlzLnJlcGVhdEFmdGVyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAodGhpcy5kaXN0cmVzc0xldmVsICsgMSkgLyAodGhpcy5tYXhEaXN0cmVzc0xldmVsICsgMSlcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8IHRoaXMuZW5kVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsICsgdGhpcy5kaXN0cmVzc0xldmVsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgUGxheWVyTm9pc2Uge1xuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZTogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlKSB7XG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQsIHsgbG9vcDogLTEsIHZvbHVtZTogMCB9KVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAxXG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAwXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZVxuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2Fsa2luZ0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdVcDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZTogY3JlYXRlanMuU3ByaXRlLCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcbiAgICB0aGlzLnggPSBzdGFydFhcbiAgICB0aGlzLnkgPSBzdGFydFlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy55XG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMud2Fsa2luZ0xlZnQpIHtcbiAgICAgIHRoaXMueCAtPSB3YWxrU3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ0Rvd24pIHtcbiAgICAgIHRoaXMueSArPSB3YWxrU3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ1JpZ2h0KSB7XG4gICAgICB0aGlzLnggKz0gd2Fsa1NwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdVcCkge1xuICAgICAgdGhpcy55IC09IHdhbGtTcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuICAgIH1cbiAgICBpZiAodGhpcy5zcHJpdGUueCA9PSB0aGlzLnggJiYgdGhpcy5zcHJpdGUueSA9PSB0aGlzLnkpIHtcbiAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRTdG9wKDApXG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHRoaXMueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueCwgY2FudmFzLndpZHRoIC0gMTUgLSB0aGlzLndpZHRoKSlcbiAgICB0aGlzLnkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnksIGNhbnZhcy5oZWlnaHQgLSAxNSAtIHRoaXMuaGVpZ2h0KSlcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueSA9IHRoaXMueVxuICB9XG59XG5cbmxldCB3b2xmTm9pc2UgPSBuZXcgV29sZk5vaXNlKFdvbGYsIDIwMDAsIDMwMDApXG52YXIgbG9nSXQgPSAwXG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICAvLyBsZXQgdGltZUxlZnRvdmVyID0gdGltZSAlIDUwO1xuICAvLyB0aW1lIC09IHRpbWVMZWZ0b3ZlcjtcbiAgdmFyIGRlbHRhVGltZTogbnVtYmVyID0gdGltZSAtIGxhc3RUaWNrVGltZVxuXG4gIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZSlcbiAgcGxheWVyLnVwZGF0ZSh0aW1lKVxuICB1cGRhdGVOb2lzZUxldmVsKHRpbWUpXG5cbiAgLy8gZW5kIG9mIHZhcmlhYmxlIHVwZGF0ZXMsIG9ubHkgZGlzcGxheXMgYmVsb3dcbiAgdmFyIHJvdW5kZWRUcmFuY2VMZXZlbCA9IChNYXRoLnJvdW5kKHRyYW5jZUxldmVsICogMTAwKSAvIDEwMClcbiAgaWYgKGxvZ0l0ICUgMTQgPT0gMCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGltZTogXCIgKyAodGltZSAvIDEwMDApICsgXCIsIHRyYW5jZTogXCIgKyByb3VuZGVkVHJhbmNlTGV2ZWwgKyBcIiwgbm9pc2U6IFwiICsgbm9pc2VMZXZlbClcbiAgfVxuICBsb2dJdCsrXG5cbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgaWYgKHRyYW5jZUxldmVsID49IDE1KSB7XG4gICAgcGxheVlvdVdvblNjZW5lKClcbiAgfVxuICBpZiAodHJhbmNlTGV2ZWwgPCAwKSB7XG4gICAgcGxheVlvdUxvc3RTY2VuZSgpXG4gIH1cblxuICBsZXQgZSA9IDxFdmVudD4oZXZlbnQpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgd29sZk5vaXNlLnRpY2sodGltZSlcbiAgbm9pc2VMZXZlbCArPSB3YWxraW5nTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIFR2Tm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIHdvbGZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIGlmIChub2lzZUxldmVsID4gbGFzdE5vaXNlTGV2ZWwpIHtcbiAgICBpZiAobm9pc2VMZXZlbCA+PSA1KSB7XG4gICAgICB0cmFuY2VMZXZlbCAtPSAobm9pc2VMZXZlbCAtIDUpXG4gICAgICB0cmFuY2VMZXZlbCA9IE1hdGguZmxvb3IodHJhbmNlTGV2ZWwpXG4gICAgfVxuICB9XG4gIGxhc3ROb2lzZUxldmVsID0gbm9pc2VMZXZlbFxufVxuXG5mdW5jdGlvbiB1cGRhdGVUcmFuY2VMZXZlbChkZWx0YVRpbWU6IG51bWJlcikge1xuICAvLyBsb29rIGF0IHRoZSBub2lzZSBsZXZlbFxuICAvLyBpZiB0aGUgbm9pc2UgbGV2ZWwgaXMgPCAzXG4gIGlmIChub2lzZUxldmVsIDwgMykge1xuICAgIC8vIGluY3JlYXNlIHRoZSB0cmFuY2UgbGV2ZWwgYnkgMC41IGV2ZXJ5IDEwMDAgbXMgKDEgcylcbiAgICB0cmFuY2VMZXZlbCArPSB0cmFuY2VSYXRlICogZGVsdGFUaW1lXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2RlbW9DYW52YXMnKVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleUV2ZW50KVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaGFuZGxlS2V5RXZlbnQpXG4gIHZhciBwcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhcihzdGFnZSwgdHJ1ZSlcbiAgbG9hZFNvdW5kcyhxdWV1ZSwgc3RhcnRTY2VuZXMsIHByb2dyZXNzQmFyKVxufVxuXG5mdW5jdGlvbiBzdGFydFNjZW5lcygpIHtcbiAgcGxheUludHJvU2NlbmUoKVxufVxuXG4vLyBpbnRybyBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5SW50cm9TY2VuZSgpIHtcbiAgLy8gbWFrZSB0aGUgc3RhZ2VcblxuICAvLyBlbGVtZW50cyBvZiB0aGUgdGl0bGUgcGFnZVxuICB2YXIgY2FiaW5CaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImludHJvY2FiaW5cIikpXG4gIGNhYmluQml0bWFwLnggPSBjYWJpbkJpdG1hcC55ID0gMFxuICBjYWJpbkJpdG1hcC5zY2FsZVggPSBjYWJpbkJpdG1hcC5zY2FsZVkgPSAuNDVcbiAgLy8gaW50cm9Db250YWluZXIuYWRkQ2hpbGQoY2FiaW5CaXRtYXApXG5cbiAgc3RhZ2UuYWRkQ2hpbGQoY2FiaW5CaXRtYXApXG4gIC8vICB3YWl0IGEgaGFsZiBzZWNvbmQgZm9yIHRoZSBjYWJpbiBpbWFnZSB0byBsb2FkIGJlZm9yZSB1cGRhdGluZyB0aGUgc3RhZ2VcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNTAwKTtcblxuICBjYW52YXMub25jbGljayA9ICgpID0+IHtcbiAgICBwbGF5R2FtZVNjZW5lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVLZXlFdmVudChldmVudDogT2JqZWN0KSB7XG4gIGxldCBrZXlFdmVudCA9IDxLZXlib2FyZEV2ZW50PmV2ZW50O1xuICBpZiAocGxheWVyKSB7XG4gICAgaWYgKGtleUV2ZW50LnR5cGUgPT0gXCJrZXlkb3duXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICB3YWxraW5nTm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoV2Fsa2luZylcbiAgVHZOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShUdilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIC8vICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIC8vIH0sIDEwMDApXG5cbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuXG4gIGRhc2hib2FyZF9mZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzkzY2RiXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDM4MCwgMTAwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfZmcueCA9IDIxMFxuICBkYXNoYm9hcmRfZmcueSA9IDQwXG5cblxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuICAvLyB3b2xmIGltYWdlXG4gIHZhciB3b2xmQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy93b2xmLnBuZ1wiKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG4gIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG5cbiAgLy8gdHZcbiAgdmFyIHR2Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy90dmltYWdlLnBuZ1wiKTtcbiAgdHZCaXRtYXAueCA9IDQwXG4gIHR2Qml0bWFwLnkgPSAxNDBcbiAgdHZCaXRtYXAuc2NhbGVYID0gdHZCaXRtYXAuc2NhbGVZID0gMS41XG5cbiAgLy8gY2hhaXJcbiAgdmFyIGNoYWlyQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy9jaGFpci5wbmdcIik7XG4gIGNoYWlyQml0bWFwLnggPSAxMDBcbiAgY2hhaXJCaXRtYXAueSA9IDE3MFxuICBjaGFpckJpdG1hcC5zY2FsZVggPSBjaGFpckJpdG1hcC5zY2FsZVkgPSAuMzVcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW1wicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCJdLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclNwcml0ZSwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIDEwMCwgNDYsIDUwKVxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgdHJhbmNlbGV2ZWx0ZXh0LCBub2lzZWxldmVsdGV4dCwgdHJhbmNldGFibGUsIHdvbGZCaXRtYXAsIHR2Qml0bWFwLCBjaGFpckJpdG1hcCwgcGxheWVyU3ByaXRlKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuICBzdGFnZS5hZGRDaGlsZChnYW1lQ29udGFpbmVyKVxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcbiAgcGxheWVyU3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG5mdW5jdGlvbiBwbGF5WW91TG9zdFNjZW5lKCkge1xuICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91TG9zdFRleHQueCA9IDM2MFxuICB5b3VMb3N0VGV4dC55ID0gMTE1XG4gIHlvdUxvc3RUZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YWdlLmFkZENoaWxkKHlvdUxvc3RUZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG59XG5cbi8vIFwieW91IGxvc3RcIiBwYWdlIGZ1bmN0aW9uXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGluaXQoKVxufVxuIiwiZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgb3V0ZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIGlubmVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBwcm9ncmVzczogbnVtYmVyXG4gIHN0YWdlPzogY3JlYXRlanMuU3RhZ2VcbiAgcmVtb3ZlT25Mb2FkOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKHN0YWdlOiBjcmVhdGVqcy5TdGFnZSwgcmVtb3ZlT25Mb2FkOiBib29sZWFuKSB7XG4gICAgdGhpcy5vdXRlckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5pbm5lckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5vdXRlckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTgxODE4XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgNjAsIDUsIDUsIDUsIDUpXG4gICAgdGhpcy5vdXRlckJhci54ID0gMjAwXG4gICAgdGhpcy5vdXRlckJhci55ID0gMjcwXG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLm91dGVyQmFyKVxuXG4gICAgdGhpcy5pbm5lckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzI3ZmE4XCIpLmRyYXdSZWN0KDAsIDAsIDM4MCwgNDApXG4gICAgdGhpcy5pbm5lckJhci54ID0gMjEwXG4gICAgdGhpcy5pbm5lckJhci55ID0gMjgwXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG5cbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZVxuICAgIHRoaXMucmVtb3ZlT25Mb2FkID0gcmVtb3ZlT25Mb2FkXG4gIH1cbiAgaGFuZGxlUHJvZ3Jlc3MoZXZlbnQ6IE9iamVjdCkge1xuICAgIHZhciBwcm9ncmVzc0V2ZW50ID0gPGNyZWF0ZWpzLlByb2dyZXNzRXZlbnQ+ZXZlbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NFdmVudC5wcm9ncmVzc1xuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YWdlKSB7XG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLm91dGVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gICAgICB0aGlzLnN0YWdlID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIGhhbmRsZUNvbXBsZXRlKGV2ZW50OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVPbkxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKClcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmV4cG9ydCBsZXQgd29sZlNvdW5kOiBzdHJpbmcgPSBcIndvbGZcIlxuZXhwb3J0IGxldCBvdXRzaWRlU291bmQ6IHN0cmluZyA9IFwib3V0c2lkZVwiXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNvdW5kcyhxdWV1ZTogY3JlYXRlanMuTG9hZFF1ZXVlLCBuZXh0OiAoKSA9PiB2b2lkLCBwcm9ncmVzc0Jhcj86IFByb2dyZXNzQmFyKSB7XG4gIHF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gW1wibXAzXCJdO1xuICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICBxdWV1ZS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzLCBwcm9ncmVzc0JhcilcbiAgfVxuICBxdWV1ZS5vbihcImNvbXBsZXRlXCIsIHtcbiAgICBoYW5kbGVFdmVudDogKGV2ZW50KSA9PiB7XG4gICAgICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgcXVldWUub2ZmKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MpXG4gICAgICAgIHByb2dyZXNzQmFyLmhhbmRsZUNvbXBsZXRlKGV2ZW50KVxuICAgICAgfVxuICAgICAgbmV4dCgpXG4gICAgfVxuICB9KVxuICBxdWV1ZS5sb2FkTWFuaWZlc3QoW1xuICAgIHsgaWQ6IFwid29sZlwiLCBzcmM6IFwicmVzL3dvbGYubXAzXCIgfSxcbiAgICB7IGlkOiBcIm91dHNpZGVcIiwgc3JjOiBcInJlcy9vdXRzaWRlLm1wM1wiIH0sXG4gICAgeyBpZDogXCJpbnRyb2NhYmluXCIsIHNyYzogXCJyZXMvaW50cm9jYWJpbi5qcGdcIiB9LFxuICAgIHsgaWQ6IFwidHZub2lzZVwiLCBzcmM6IFwicmVzL3R2c291bmQubXAzXCJ9LFxuICAgIHsgaWQ6IFwidHZpbWFnZVwiLCAgc3JjOiBcInJlcy90dmltYWdlLnBuZ1wifVxuICBdKVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9