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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUs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QUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUU7UUFDL0MsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQztRQUN4QyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUcsR0FBRyxFQUFFLGlCQUFpQixFQUFDO0tBQzFDLENBQUM7QUFDSixDQUFDO0FBdEJELGdDQXNCQyIsImZpbGUiOiJidWlsZC9idW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5pbXBvcnQgeyBsb2FkU291bmRzIH0gZnJvbSBcIi4vc291bmRcIlxubGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCBUdk5vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHdhbGtpbmdOb2lzZTogUGxheWVyTm9pc2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3ROb2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4vLyB2YXIgaW50cm9Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG4vLyB2YXIgeW91V29uQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VXb25UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3Ugd29uIVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdUxvc3RUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3UgbG9zdCFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZXRhYmxlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG5sZXQgZ3JleWNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG52YXIgd29sZmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJXb2xmXCIsIFwiMjBweCBBcmlhbFwiLCBcIiMzMDJhMzZcIik7XG52YXIgdHJhbmNlUmF0ZTogbnVtYmVyID0gMC4wMDA1XG52YXIgd2Fsa1NwZWVkOiBudW1iZXIgPSAyMCAvIDEwMDBcbnZhciBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpO1xudmFyIHBsYXllcjogUGxheWVyXG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBzb3VuZDogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyLCBzb3VuZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgICB0aGlzLnNvdW5kID0gc291bmRcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDAsIFwid29sZlwiKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwLCBcIm91dHNpZGVcIilcbmNvbnN0IFdhbGtpbmcgPSBuZXcgTm9pc2UoMSwgMTAwMCwgXCJ3YWxraW5nXCIpXG5jb25zdCBUdiA9IG5ldyBOb2lzZSg1LCAwLCBcInR2bm9pc2VcIilcblxuY2xhc3MgVGltZWROb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCAodGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgV29sZk5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIGRpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgc3RhcnREaXN0cmVzc0xldmVsOiBudW1iZXIgPSAwXG4gIG1heERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDRcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgcmVwZWF0QWZ0ZXI6IG51bWJlclxuICBpbml0aWFsU3RhcnRUaW1lOiBudW1iZXJcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBlbmRUaW1lOiBudW1iZXJcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyLCByZXBlYXRBZnRlcjogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMucmVwZWF0QWZ0ZXIgPSByZXBlYXRBZnRlclxuICAgIHRoaXMuZW5kVGltZSA9IHN0YXJ0VGltZSArIG4uZHVyYXRpb25Nc1xuICAgIHRoaXMuaW5pdGlhbFN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gdGhpcy5zdGFydERpc3RyZXNzTGV2ZWxcbiAgICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlIS5tdXRlZCA9IHRydWVcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDBcbiAgICAgIHRoaXMuZW5kVGltZSA9IDBcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuc3RhcnRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLmluaXRpYWxTdGFydFRpbWVcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgfVxuICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UgJiYgdGltZSA+PSB0aGlzLmVuZFRpbWUpIHtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLnJlcGVhdEFmdGVyKSB7XG4gICAgICAgIHRoaXMuZGlzdHJlc3NMZXZlbCA9IE1hdGgubWluKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEsIHRoaXMubWF4RGlzdHJlc3NMZXZlbClcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgKz0gdGhpcy5ub2lzZS5kdXJhdGlvbk1zICsgdGhpcy5yZXBlYXRBZnRlclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEpIC8gKHRoaXMubWF4RGlzdHJlc3NMZXZlbCArIDEpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCB0aGlzLmVuZFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbCArIHRoaXMuZGlzdHJlc3NMZXZlbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFBsYXllck5vaXNlIHtcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U6IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSkge1xuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAgfSlcbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gMVxuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gMFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG5cbn1cblxuY2xhc3MgUGxheWVyIHtcbiAgc3ByaXRlOiBjcmVhdGVqcy5TcHJpdGVcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIHdhbGtpbmdMZWZ0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdSaWdodDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nVXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ0Rvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgbW92aW5nOiBib29sZWFuID0gZmFsc2VcblxuICBjb25zdHJ1Y3RvcihzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZSwgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlXG4gICAgdGhpcy54ID0gc3RhcnRYXG4gICAgdGhpcy55ID0gc3RhcnRZXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueVxuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLndhbGtpbmdMZWZ0KSB7XG4gICAgICB0aGlzLnggLT0gd2Fsa1NwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdEb3duKSB7XG4gICAgICB0aGlzLnkgKz0gd2Fsa1NwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdSaWdodCkge1xuICAgICAgdGhpcy54ICs9IHdhbGtTcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nVXApIHtcbiAgICAgIHRoaXMueSAtPSB3YWxrU3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB9XG4gICAgaWYgKHRoaXMuc3ByaXRlLnggPT0gdGhpcy54ICYmIHRoaXMuc3ByaXRlLnkgPT0gdGhpcy55KSB7XG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kU3RvcCgwKVxuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLngsIGNhbnZhcy53aWR0aCAtIDE1IC0gdGhpcy53aWR0aCkpXG4gICAgdGhpcy55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy55LCBjYW52YXMuaGVpZ2h0IC0gMTUgLSB0aGlzLmhlaWdodCkpXG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueFxuICAgIHRoaXMuc3ByaXRlLnkgPSB0aGlzLnlcbiAgfVxufVxuXG5sZXQgd29sZk5vaXNlID0gbmV3IFdvbGZOb2lzZShXb2xmLCAyMDAwLCAzMDAwKVxudmFyIGxvZ0l0ID0gMFxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudDogT2JqZWN0KSB7XG4gIGxldCB0aW1lID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUoKTtcbiAgLy8gbGV0IHRpbWVMZWZ0b3ZlciA9IHRpbWUgJSA1MDtcbiAgLy8gdGltZSAtPSB0aW1lTGVmdG92ZXI7XG4gIHZhciBkZWx0YVRpbWU6IG51bWJlciA9IHRpbWUgLSBsYXN0VGlja1RpbWVcblxuICB1cGRhdGVUcmFuY2VMZXZlbChkZWx0YVRpbWUpXG4gIHBsYXllci51cGRhdGUodGltZSlcbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG4gIHZhciByb3VuZGVkVHJhbmNlTGV2ZWwgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCAqIDEwMCkgLyAxMDApXG4gIGlmIChsb2dJdCAlIDE0ID09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpbWU6IFwiICsgKHRpbWUgLyAxMDAwKSArIFwiLCB0cmFuY2U6IFwiICsgcm91bmRlZFRyYW5jZUxldmVsICsgXCIsIG5vaXNlOiBcIiArIG5vaXNlTGV2ZWwpXG4gIH1cbiAgbG9nSXQrK1xuXG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0ID0gcm91bmRlZFRyYW5jZUxldmVsLnRvU3RyaW5nKCk7XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHQgPSBub2lzZUxldmVsLnRvU3RyaW5nKCk7XG4gIGlmICh0cmFuY2VMZXZlbCA+PSAxNSkge1xuICAgIHBsYXlZb3VXb25TY2VuZSgpXG4gIH1cbiAgaWYgKHRyYW5jZUxldmVsIDwgMCkge1xuICAgIHBsYXlZb3VMb3N0U2NlbmUoKVxuICB9XG5cbiAgbGV0IGUgPSA8RXZlbnQ+KGV2ZW50KTtcbiAgc3RhZ2UudXBkYXRlKCk7XG4gIGxhc3RUaWNrVGltZSA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKSB7XG4gIG5vaXNlTGV2ZWwgPSAwXG4gIHdvbGZOb2lzZS50aWNrKHRpbWUpXG4gIG5vaXNlTGV2ZWwgKz0gd2Fsa2luZ05vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSkgKyBUdk5vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSkgKyB3b2xmTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKVxuICBpZiAobm9pc2VMZXZlbCA+IGxhc3ROb2lzZUxldmVsKSB7XG4gICAgaWYgKG5vaXNlTGV2ZWwgPj0gNSkge1xuICAgICAgdHJhbmNlTGV2ZWwgLT0gKG5vaXNlTGV2ZWwgLSA1KVxuICAgICAgdHJhbmNlTGV2ZWwgPSBNYXRoLmZsb29yKHRyYW5jZUxldmVsKVxuICAgIH1cbiAgfVxuICBsYXN0Tm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlFdmVudClcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleUV2ZW50KVxuICB2YXIgcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIHRydWUpXG4gIGxvYWRTb3VuZHMocXVldWUsIHN0YXJ0U2NlbmVzLCBwcm9ncmVzc0Jhcilcbn1cblxuZnVuY3Rpb24gc3RhcnRTY2VuZXMoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIC8vIGludHJvQ29udGFpbmVyLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgd2Fsa2luZ05vaXNlID0gbmV3IFBsYXllck5vaXNlKFdhbGtpbmcpXG4gIFR2Tm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoVHYpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAvLyAgIFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZVxuPDw8PDw8PCBIRUFEXG4gIC8vIH0sIDEwMDApXG49PT09PT09XG4gIC8vIH0sIDE1MDAwKVxuPj4+Pj4+PiAyOWJlZjRlIChBZGQgd29sZiBub2lzZSB0aGF0IGdldHMgbG91ZGVyIGFuZCBkZWNyZWFzZXMgdHJhbmNlIGxldmVsLilcblxuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICBvdXRlcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzRkMWMyMFwiKS5kcmF3UmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG5cbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgY2FudmFzLndpZHRoIC0gMzAsIGNhbnZhcy5oZWlnaHQgLSAzMClcblxuICAvLyBkYXNoYm9hcmQgZGlzcGxheWluZyB0cmFuY2UgbGV2ZWwgYW5kIG5vaXNlIGxldmVsXG4gIGRhc2hib2FyZF9iZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTQxNjcwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgMTIwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfYmcueCA9IDIwMFxuICBkYXNoYm9hcmRfYmcueSA9IDMwXG5cbiAgZGFzaGJvYXJkX2ZnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzOTNjZGJcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMzgwLCAxMDAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9mZy54ID0gMjEwXG4gIGRhc2hib2FyZF9mZy55ID0gNDBcblxuICBcbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB0cmFuY2VsYWJlbC54ID0gMjI1XG4gIHRyYW5jZWxhYmVsLnkgPSA3NVxuICB0cmFuY2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxhYmVsLnggPSAyMjVcbiAgbm9pc2VsYWJlbC55ID0gMTE1XG4gIG5vaXNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gbWV0cmljcyBudW1iZXJzXG4gIHRyYW5jZWxldmVsdGV4dC54ID0gMzYwXG4gIHRyYW5jZWxldmVsdGV4dC55ID0gNzVcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgbm9pc2VsZXZlbHRleHQueSA9IDExNVxuICBub2lzZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyB0cmFuY2UgdGFibGUhXG4gIHRyYW5jZXRhYmxlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNiZGYyZTJcIikuZHJhd1JlY3QoMCwgMCwgMjUwLCAxMjApXG4gIHRyYW5jZXRhYmxlLnggPSAyNzVcbiAgdHJhbmNldGFibGUueSA9IDI1MFxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG5cbiAgLy8gd29sZiBpbWFnZVxuICB2YXIgd29sZkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoXCJyZXMvd29sZi5wbmdcIik7XG4gIHdvbGZCaXRtYXAueCA9IGNhbnZhcy53aWR0aCAtIDE1MFxuICB3b2xmQml0bWFwLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG4gIHdvbGZCaXRtYXAuc2NhbGVYID0gd29sZkJpdG1hcC5zY2FsZVkgPSAuMlxuICB3b2xmTm9pc2UuYWN0aXZlID0gdHJ1ZVxuXG4gIC8vIHR2XG4gIHZhciB0dkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoXCJyZXMvdHZpbWFnZS5wbmdcIik7XG4gIHR2Qml0bWFwLnggPSA0MFxuICB0dkJpdG1hcC55ID0gMTQwXG4gIHR2Qml0bWFwLnNjYWxlWCA9IHR2Qml0bWFwLnNjYWxlWSA9IDEuNVxuXG4gIC8vIGNoYWlyXG4gIHZhciBjaGFpckJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoXCJyZXMvY2hhaXIucG5nXCIpO1xuICBjaGFpckJpdG1hcC54ID0gMTAwXG4gIGNoYWlyQml0bWFwLnkgPSAxNzBcbiAgY2hhaXJCaXRtYXAuc2NhbGVYID0gY2hhaXJCaXRtYXAuc2NhbGVZID0gLjM1XG5cbiAgdmFyIHBsYXllclNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICBpbWFnZXM6IFtcInJlcy9wbGF5ZXItc3ByaXRlbWFwLXY5LXJlZHBhbnRzLnBuZ1wiXSxcbiAgICBmcmFtZXM6IHtcbiAgICAgIHdpZHRoOiA0NixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjb3VudDogNDBcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHJ1bjogWzI0LCAzMSwgXCJydW5cIiwgMSAvIDVdXG4gICAgfVxuICB9KVxuICB2YXIgcGxheWVyU3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShwbGF5ZXJTcHJpdGVTaGVldClcbiAgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJTcHJpdGUsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLSAxMDAsIDQ2LCA1MClcblxuICAvLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNvbnRhaW5lciBmb3IgdGhpcyBzY2VuZVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKG91dGVyd2FsbCwgaW5uZXJ3YWxsLCBkYXNoYm9hcmRfYmcsIGRhc2hib2FyZF9mZywgdHJhbmNlbGFiZWwsIG5vaXNlbGFiZWwsIHRyYW5jZWxldmVsdGV4dCwgbm9pc2VsZXZlbHRleHQsIHRyYW5jZXRhYmxlLCB3b2xmQml0bWFwLCB0dkJpdG1hcCwgY2hhaXJCaXRtYXAsICBwbGF5ZXJTcHJpdGUpXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChvdXRlcndhbGwsIDApXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChpbm5lcndhbGwsIDEpXG4gIHN0YWdlLmFkZENoaWxkKGdhbWVDb250YWluZXIpXG5cbiAgLy8gVXBkYXRlIHN0YWdlIHdpbGwgcmVuZGVyIG5leHQgZnJhbWVcbiAgc3RhZ2UudXBkYXRlKClcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxuICBwbGF5ZXJTcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcbn1cblxuXG5cbi8vIFwieW91IHdvblwiIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlZb3VXb25TY2VuZSgpIHtcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdVdvblRleHQueCA9IDM2MFxuICB5b3VXb25UZXh0LnkgPSAxMTVcbiAgeW91V29uVGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBzdGFnZS5hZGRDaGlsZCh5b3VXb25UZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG59XG5cbmZ1bmN0aW9uIHBsYXlZb3VMb3N0U2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VMb3N0VGV4dC54ID0gMzYwXG4gIHlvdUxvc3RUZXh0LnkgPSAxMTVcbiAgeW91TG9zdFRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91TG9zdFRleHQpXG5cbiAgc3RhZ2UudXBkYXRlKClcbn1cblxuLy8gXCJ5b3UgbG9zdFwiIHBhZ2UgZnVuY3Rpb25cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgaW5pdCgpXG59XG4iLCJleHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIge1xuICBvdXRlckJhcjogY3JlYXRlanMuU2hhcGVcbiAgaW5uZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIHByb2dyZXNzOiBudW1iZXJcbiAgc3RhZ2U/OiBjcmVhdGVqcy5TdGFnZVxuICByZW1vdmVPbkxvYWQ6IGJvb2xlYW5cbiAgY29uc3RydWN0b3Ioc3RhZ2U6IGNyZWF0ZWpzLlN0YWdlLCByZW1vdmVPbkxvYWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm91dGVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICB0aGlzLmlubmVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICB0aGlzLm91dGVyQmFyLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxODE4MThcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCA2MCwgNSwgNSwgNSwgNSlcbiAgICB0aGlzLm91dGVyQmFyLnggPSAyMDBcbiAgICB0aGlzLm91dGVyQmFyLnkgPSAyNzBcbiAgICB0aGlzLnByb2dyZXNzID0gMFxuICAgIHN0YWdlLmFkZENoaWxkKHRoaXMub3V0ZXJCYXIpXG5cbiAgICB0aGlzLmlubmVyQmFyLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzMjdmYThcIikuZHJhd1JlY3QoMCwgMCwgMzgwLCA0MClcbiAgICB0aGlzLmlubmVyQmFyLnggPSAyMTBcbiAgICB0aGlzLmlubmVyQmFyLnkgPSAyODBcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcblxuICAgIHN0YWdlLmFkZENoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlXG4gICAgdGhpcy5yZW1vdmVPbkxvYWQgPSByZW1vdmVPbkxvYWRcbiAgfVxuICBoYW5kbGVQcm9ncmVzcyhldmVudDogT2JqZWN0KSB7XG4gICAgdmFyIHByb2dyZXNzRXZlbnQgPSA8Y3JlYXRlanMuUHJvZ3Jlc3NFdmVudD5ldmVudFxuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzc0V2ZW50LnByb2dyZXNzXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG4gICAgdGhpcy5zdGFnZSEudXBkYXRlKClcbiAgfVxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhZ2UpIHtcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMub3V0ZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEudXBkYXRlKClcbiAgICAgIHRoaXMuc3RhZ2UgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbiAgaGFuZGxlQ29tcGxldGUoZXZlbnQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLnJlbW92ZU9uTG9hZCkge1xuICAgICAgdGhpcy5yZW1vdmUoKVxuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuZXhwb3J0IGxldCB3b2xmU291bmQ6IHN0cmluZyA9IFwid29sZlwiXG5leHBvcnQgbGV0IG91dHNpZGVTb3VuZDogc3RyaW5nID0gXCJvdXRzaWRlXCJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkU291bmRzKHF1ZXVlOiBjcmVhdGVqcy5Mb2FkUXVldWUsIG5leHQ6ICgpID0+IHZvaWQsIHByb2dyZXNzQmFyPzogUHJvZ3Jlc3NCYXIpIHtcbiAgcXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbXCJtcDNcIl07XG4gIGlmIChwcm9ncmVzc0Jhcikge1xuICAgIHF1ZXVlLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MsIHByb2dyZXNzQmFyKVxuICB9XG4gIHF1ZXVlLm9uKFwiY29tcGxldGVcIiwge1xuICAgIGhhbmRsZUV2ZW50OiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChwcm9ncmVzc0Jhcikge1xuICAgICAgICBxdWV1ZS5vZmYoXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcylcbiAgICAgICAgcHJvZ3Jlc3NCYXIuaGFuZGxlQ29tcGxldGUoZXZlbnQpXG4gICAgICB9XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH0pXG4gIHF1ZXVlLmxvYWRNYW5pZmVzdChbXG4gICAgeyBpZDogXCJ3b2xmXCIsIHNyYzogXCJyZXMvd29sZi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwib3V0c2lkZVwiLCBzcmM6IFwicmVzL291dHNpZGUubXAzXCIgfSxcbiAgICB7IGlkOiBcImludHJvY2FiaW5cIiwgc3JjOiBcInJlcy9pbnRyb2NhYmluLmpwZ1wiIH0sXG4gICAgeyBpZDogXCJ0dm5vaXNlXCIsIHNyYzogXCJyZXMvdHZzb3VuZC5tcDNcIn0sXG4gICAgeyBpZDogXCJ0dmltYWdlXCIsICBzcmM6IFwicmVzL3R2aW1hZ2UucG5nXCJ9XG4gIF0pXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=