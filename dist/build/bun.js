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
var noises = [
    new TimedNoise(OutsideWindow, 2000),
    new TimedNoise(Wolf, 3000),
    new TimedNoise(Wolf, 6000),
    new TimedNoise(OutsideWindow, 7000),
];
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
    if (tranceLevel >= 5) {
        playYouWonScene();
    }
    let e = (event);
    stage.update();
    lastTickTime = time;
}
function updateNoiseLevel(time) {
    noiseLevel = 0;
    for (var n of noises) {
        n.tick(time);
        noiseLevel += n.getActiveNoiseLevel(time);
    }
    noiseLevel += walkingNoise.getActiveNoiseLevel(time) + TvNoise.getActiveNoiseLevel(time);
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
    canvas = stage.canvas;
    stage.removeAllChildren();
    // place some "you won!" text on the screen (declared at the top)
    youWonText.x = 360;
    youWonText.y = 115;
    youWonText.textBaseline = "alphabetic";
    stage.addChild(youWonText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDO0FBQ3BCLElBQUksTUFBeUI7QUFDN0IsZ0RBQWdEO0FBQ2hELElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtBQUM1QyxpREFBaUQ7QUFDakQsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDOUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDeEUsSUFBSSxlQUFlLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDckUsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDdkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3JDLElBQUksU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25FLElBQUksVUFBVSxHQUFXLE1BQU07QUFDL0IsSUFBSSxTQUFTLEdBQVcsRUFBRSxHQUFHLElBQUk7QUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFR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Q0FBQyxDQUFDO0lBQzdDLElBQUksV0FBVyxFQUFFO1FBQ2YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7S0FDOUQ7SUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtRQUNuQixXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixJQUFJLFdBQVcsRUFBRTtnQkFDZixLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsY0FBYyxDQUFDO2dCQUNqRCxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUNsQztZQUNELElBQUksRUFBRTtRQUNSLENBQUM7S0FDRixDQUFDO0lBQ0YsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNqQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRTtRQUNuQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUU7UUFDL0MsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBQztRQUN4QyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUcsR0FBRyxFQUFFLGlCQUFpQixFQUFDO0tBQzFDLENBQUM7QUFDSixDQUFDO0FBdEJELGdDQXNCQyIsImZpbGUiOiJidWlsZFxcYnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuaW1wb3J0IHsgbG9hZFNvdW5kcyB9IGZyb20gXCIuL3NvdW5kXCJcbmxldCBjaXJjbGU6IGNyZWF0ZWpzLlNoYXBlXG5sZXQgc3RhZ2U6IGNyZWF0ZWpzLlN0YWdlXG5sZXQgVHZOb2lzZTogUGxheWVyTm9pc2VcbmxldCB3YWxraW5nTm9pc2U6IFBsYXllck5vaXNlXG5sZXQgdHJhbmNlTGV2ZWwgPSAwXG5sZXQgbm9pc2VMZXZlbCA9IDBcbmxldCBsYXN0VGlja1RpbWUgPSAwXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuLy8gdmFyIGludHJvQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgZ2FtZUNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxuLy8gdmFyIHlvdVdvbkNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIG91dGVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGlubmVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9iZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9mZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJUcmFuY2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiTm9pc2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91V29uVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IHdvbiFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZXRhYmxlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG5sZXQgZ3JleWNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG52YXIgd29sZmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJXb2xmXCIsIFwiMjBweCBBcmlhbFwiLCBcIiMzMDJhMzZcIik7XG52YXIgdHJhbmNlUmF0ZTogbnVtYmVyID0gMC4wMDA1XG52YXIgd2Fsa1NwZWVkOiBudW1iZXIgPSAyMCAvIDEwMDBcbnZhciBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpO1xudmFyIHBsYXllcjogUGxheWVyXG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBzb3VuZDogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyLCBzb3VuZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgICB0aGlzLnNvdW5kID0gc291bmRcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDAsIFwid29sZlwiKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwLCBcIm91dHNpZGVcIilcbmNvbnN0IFdhbGtpbmcgPSBuZXcgTm9pc2UoMSwgMTAwMCwgXCJ3YWxraW5nXCIpXG5jb25zdCBUdiA9IG5ldyBOb2lzZSg1LCAwLCBcInR2bm9pc2VcIilcblxuY2xhc3MgVGltZWROb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCAodGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgUGxheWVyTm9pc2Uge1xuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZTogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlKSB7XG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQsIHsgbG9vcDogLTEsIHZvbHVtZTogMCB9KVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAxXG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAwXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZVxuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2Fsa2luZ0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdVcDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZVxuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZTogY3JlYXRlanMuU3ByaXRlLCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcbiAgICB0aGlzLnggPSBzdGFydFhcbiAgICB0aGlzLnkgPSBzdGFydFlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy55XG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMud2Fsa2luZ0xlZnQpIHtcbiAgICAgIHRoaXMueCAtPSB3YWxrU3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ0Rvd24pIHtcbiAgICAgIHRoaXMueSArPSB3YWxrU3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ1JpZ2h0KSB7XG4gICAgICB0aGlzLnggKz0gd2Fsa1NwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdVcCkge1xuICAgICAgdGhpcy55IC09IHdhbGtTcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuICAgIH1cbiAgICBpZiAodGhpcy5zcHJpdGUueCA9PSB0aGlzLnggJiYgdGhpcy5zcHJpdGUueSA9PSB0aGlzLnkpIHtcbiAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRTdG9wKDApXG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHRoaXMueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueCwgY2FudmFzLndpZHRoIC0gMTUgLSB0aGlzLndpZHRoKSlcbiAgICB0aGlzLnkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnksIGNhbnZhcy5oZWlnaHQgLSAxNSAtIHRoaXMuaGVpZ2h0KSlcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueSA9IHRoaXMueVxuICB9XG59XG5cbnZhciBub2lzZXMgPSBbXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDIwMDApLFxuICBuZXcgVGltZWROb2lzZShXb2xmLCAzMDAwKSxcbiAgbmV3IFRpbWVkTm9pc2UoV29sZiwgNjAwMCksXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDcwMDApLFxuXVxuXG5cbnZhciBsb2dJdCA9IDBcblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQgdGltZSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKCk7XG4gIC8vIGxldCB0aW1lTGVmdG92ZXIgPSB0aW1lICUgNTA7XG4gIC8vIHRpbWUgLT0gdGltZUxlZnRvdmVyO1xuICB2YXIgZGVsdGFUaW1lOiBudW1iZXIgPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG5cbiAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICBwbGF5ZXIudXBkYXRlKHRpbWUpXG4gIHVwZGF0ZU5vaXNlTGV2ZWwodGltZSlcblxuICAvLyBlbmQgb2YgdmFyaWFibGUgdXBkYXRlcywgb25seSBkaXNwbGF5cyBiZWxvd1xuICB2YXIgcm91bmRlZFRyYW5jZUxldmVsID0gKE1hdGgucm91bmQodHJhbmNlTGV2ZWwgKiAxMDApIC8gMTAwKVxuICBpZiAobG9nSXQgJSAxNCA9PSAwKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aW1lOiBcIiArICh0aW1lIC8gMTAwMCkgKyBcIiwgdHJhbmNlOiBcIiArIHJvdW5kZWRUcmFuY2VMZXZlbCArIFwiLCBub2lzZTogXCIgKyBub2lzZUxldmVsKVxuICB9XG4gIGxvZ0l0KytcblxuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuICBpZiAodHJhbmNlTGV2ZWwgPj0gNSkge1xuICAgIHBsYXlZb3VXb25TY2VuZSgpXG4gIH1cblxuICBsZXQgZSA9IDxFdmVudD4oZXZlbnQpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgZm9yICh2YXIgbiBvZiBub2lzZXMpIHtcbiAgICBuLnRpY2sodGltZSlcbiAgICBub2lzZUxldmVsICs9IG4uZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKVxuICB9XG4gIG5vaXNlTGV2ZWwgKz0gd2Fsa2luZ05vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSkgKyBUdk5vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlFdmVudClcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleUV2ZW50KVxuICB2YXIgcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIHRydWUpXG4gIGxvYWRTb3VuZHMocXVldWUsIHN0YXJ0U2NlbmVzLCBwcm9ncmVzc0Jhcilcbn1cblxuZnVuY3Rpb24gc3RhcnRTY2VuZXMoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIC8vIGludHJvQ29udGFpbmVyLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0xlZnRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0xlZnQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgd2Fsa2luZ05vaXNlID0gbmV3IFBsYXllck5vaXNlKFdhbGtpbmcpXG4gIFR2Tm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoVHYpXG4gIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAvLyAgIFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAvLyB9LCAxMDAwKVxuXG4gIC8vIGNyZWF0ZSBhIGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gIG91dGVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNGQxYzIwXCIpLmRyYXdSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcblxuICAvLyBjcmVhdGUgdGhlIGlubmVyIHJlY3RhbmdsZSBmb3IgdGhlIFwiZmxvb3JcIiBvZiB0aGUgY2FiaW5cbiAgaW5uZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM3ZTZhOTRcIikuZHJhd1JlY3QoMTUsIDE1LCBjYW52YXMud2lkdGggLSAzMCwgY2FudmFzLmhlaWdodCAtIDMwKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgZGFzaGJvYXJkX2JnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxNDE2NzBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCAxMjAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9iZy54ID0gMjAwXG4gIGRhc2hib2FyZF9iZy55ID0gMzBcblxuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuXG4gIFxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuICAvLyB3b2xmIGltYWdlXG4gIHZhciB3b2xmQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy93b2xmLnBuZ1wiKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG5cbiAgLy8gdHZcbiAgdmFyIHR2Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy90dmltYWdlLnBuZ1wiKTtcbiAgdHZCaXRtYXAueCA9IDQwXG4gIHR2Qml0bWFwLnkgPSAxNDBcbiAgdHZCaXRtYXAuc2NhbGVYID0gdHZCaXRtYXAuc2NhbGVZID0gMS41XG5cbiAgLy8gY2hhaXJcbiAgdmFyIGNoYWlyQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy9jaGFpci5wbmdcIik7XG4gIGNoYWlyQml0bWFwLnggPSAxMDBcbiAgY2hhaXJCaXRtYXAueSA9IDE3MFxuICBjaGFpckJpdG1hcC5zY2FsZVggPSBjaGFpckJpdG1hcC5zY2FsZVkgPSAuMzVcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW1wicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCJdLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclNwcml0ZSwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIDEwMCwgNDYsIDUwKVxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgdHJhbmNlbGV2ZWx0ZXh0LCBub2lzZWxldmVsdGV4dCwgdHJhbmNldGFibGUsIHdvbGZCaXRtYXAsIHR2Qml0bWFwLCBjaGFpckJpdG1hcCwgIHBsYXllclNwcml0ZSlcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcbiAgc3RhZ2UuYWRkQ2hpbGQoZ2FtZUNvbnRhaW5lcilcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG4gIHBsYXllclNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxufVxuXG5cblxuLy8gXCJ5b3Ugd29uXCIgcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheVlvdVdvblNjZW5lKCkge1xuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIG91dGVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBpbm5lckJhcjogY3JlYXRlanMuU2hhcGVcbiAgcHJvZ3Jlc3M6IG51bWJlclxuICBzdGFnZT86IGNyZWF0ZWpzLlN0YWdlXG4gIHJlbW92ZU9uTG9hZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihzdGFnZTogY3JlYXRlanMuU3RhZ2UsIHJlbW92ZU9uTG9hZDogYm9vbGVhbikge1xuICAgIHRoaXMub3V0ZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMuaW5uZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMub3V0ZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE4MTgxOFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDYwLCA1LCA1LCA1LCA1KVxuICAgIHRoaXMub3V0ZXJCYXIueCA9IDIwMFxuICAgIHRoaXMub3V0ZXJCYXIueSA9IDI3MFxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5vdXRlckJhcilcblxuICAgIHRoaXMuaW5uZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzMyN2ZhOFwiKS5kcmF3UmVjdCgwLCAwLCAzODAsIDQwKVxuICAgIHRoaXMuaW5uZXJCYXIueCA9IDIxMFxuICAgIHRoaXMuaW5uZXJCYXIueSA9IDI4MFxuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2VcbiAgICB0aGlzLnJlbW92ZU9uTG9hZCA9IHJlbW92ZU9uTG9hZFxuICB9XG4gIGhhbmRsZVByb2dyZXNzKGV2ZW50OiBPYmplY3QpIHtcbiAgICB2YXIgcHJvZ3Jlc3NFdmVudCA9IDxjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50PmV2ZW50XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzRXZlbnQucHJvZ3Jlc3NcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcbiAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICAgICAgdGhpcy5zdGFnZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuICBoYW5kbGVDb21wbGV0ZShldmVudDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlT25Mb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5leHBvcnQgbGV0IHdvbGZTb3VuZDogc3RyaW5nID0gXCJ3b2xmXCJcbmV4cG9ydCBsZXQgb3V0c2lkZVNvdW5kOiBzdHJpbmcgPSBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTb3VuZHMocXVldWU6IGNyZWF0ZWpzLkxvYWRRdWV1ZSwgbmV4dDogKCkgPT4gdm9pZCwgcHJvZ3Jlc3NCYXI/OiBQcm9ncmVzc0Jhcikge1xuICBxdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFtcIm1wM1wiXTtcbiAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgcXVldWUub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcywgcHJvZ3Jlc3NCYXIpXG4gIH1cbiAgcXVldWUub24oXCJjb21wbGV0ZVwiLCB7XG4gICAgaGFuZGxlRXZlbnQ6IChldmVudCkgPT4ge1xuICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgIHF1ZXVlLm9mZihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzKVxuICAgICAgICBwcm9ncmVzc0Jhci5oYW5kbGVDb21wbGV0ZShldmVudClcbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH1cbiAgfSlcbiAgcXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICB7IGlkOiBcIndvbGZcIiwgc3JjOiBcInJlcy93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJvdXRzaWRlXCIsIHNyYzogXCJyZXMvb3V0c2lkZS5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiaW50cm9jYWJpblwiLCBzcmM6IFwicmVzL2ludHJvY2FiaW4uanBnXCIgfSxcbiAgICB7IGlkOiBcInR2bm9pc2VcIiwgc3JjOiBcInJlcy90dnNvdW5kLm1wM1wifSxcbiAgICB7IGlkOiBcInR2aW1hZ2VcIiwgIHNyYzogXCJyZXMvdHZpbWFnZS5wbmdcIn1cbiAgXSlcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==