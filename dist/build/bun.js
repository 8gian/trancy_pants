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
var queue = new createjs.LoadQueue(false);
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
        this.soundInstance = undefined;
        this.active = false;
        this.noise = n;
    }
    getActiveNoiseLevel(time) {
        if (this.active) {
            return this.noise.noiseLevel;
        }
        return 0;
    }
}
var noises = [
    new TimedNoise(OutsideWindow, 2000),
    new TimedNoise(Wolf, 3000),
    new TimedNoise(Wolf, 6000),
    new TimedNoise(OutsideWindow, 7000),
];
var walkingNoise = new PlayerNoise(Walking);
var logIt = 0;
function gameLoop(event) {
    let time = createjs.Ticker.getTime();
    let timeLeftover = time % 50;
    time -= timeLeftover;
    var deltaTime = time - lastTickTime;
    updateTranceLevel(deltaTime);
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
    noiseLevel += walkingNoise.getActiveNoiseLevel(time);
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
    if (keyEvent.type == "keydown" && keyEvent.key == "ArrowRight") {
        walkingNoise.active = true;
    }
    else if (keyEvent.type == "keyup" && keyEvent.key == "ArrowRight") {
        walkingNoise.active = false;
    }
    console.log("walking active: " + walkingNoise.active);
}
function playGameScene() {
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
    playerSprite.x = canvas.width / 2;
    playerSprite.y = canvas.height - 100;
    // add elements to the container for this scene
    gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, tranceleveltext, noiseleveltext, trancetable, wolfBitmap, playerSprite);
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
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxXQUFXLEdBQUcsQ0FBQztBQUNuQixJQUFJLFVBQVUsR0FBRyxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbkUsSUFBSSxVQUFVLEdBQVcsTUFBTTtBQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFMUMsTUFBTSxLQUFLO0lBSVQsWUFBWSxVQUFrQixFQUFFLFVB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O2dCQUNqRCxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUNsQztZQUNELElBQUksRUFBRTtRQUNSLENBQUM7S0FDRixDQUFDO0lBQ0YsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNqQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRTtRQUNuQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFO1FBQ3pDLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUU7S0FDaEQsQ0FBQztBQUNKLENBQUM7QUFwQkQsZ0NBb0JDIiwiZmlsZSI6ImJ1aWxkL2J1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbi8vIHZhciBpbnRyb0NvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIGdhbWVDb250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbi8vIHZhciB5b3VXb25Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBvdXRlcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBpbm5lcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfZmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0cmFuY2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiVHJhbmNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIk5vaXNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdVdvblRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSB3b24hXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xubGV0IGdyZXljaXJjbGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxudmFyIHdvbGZsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiV29sZlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjMzAyYTM2XCIpO1xudmFyIHRyYW5jZVJhdGU6IG51bWJlciA9IDAuMDAwNVxudmFyIHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSk7XG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBzb3VuZDogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyLCBzb3VuZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgICB0aGlzLnNvdW5kID0gc291bmRcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDAsIFwid29sZlwiKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwLCBcIm91dHNpZGVcIilcbmNvbnN0IFdhbGtpbmcgPSBuZXcgTm9pc2UoMSwgMTAwMCwgXCJ3YWxraW5nXCIpXG5cbmNsYXNzIFRpbWVkTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zKSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFBsYXllck5vaXNlIHtcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgY29uc3RydWN0b3IobjogTm9pc2UpIHtcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG59XG5cbnZhciBub2lzZXMgPSBbXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDIwMDApLFxuICBuZXcgVGltZWROb2lzZShXb2xmLCAzMDAwKSxcbiAgbmV3IFRpbWVkTm9pc2UoV29sZiwgNjAwMCksXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDcwMDApLFxuXVxuXG52YXIgd2Fsa2luZ05vaXNlID0gbmV3IFBsYXllck5vaXNlKFdhbGtpbmcpXG5cbnZhciBsb2dJdCA9IDBcblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQgdGltZSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKCk7XG4gIGxldCB0aW1lTGVmdG92ZXIgPSB0aW1lICUgNTA7XG4gIHRpbWUgLT0gdGltZUxlZnRvdmVyO1xuICB2YXIgZGVsdGFUaW1lOiBudW1iZXIgPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG5cbiAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB1cGRhdGVOb2lzZUxldmVsKHRpbWUpXG5cbiAgLy8gZW5kIG9mIHZhcmlhYmxlIHVwZGF0ZXMsIG9ubHkgZGlzcGxheXMgYmVsb3dcbiAgdmFyIHJvdW5kZWRUcmFuY2VMZXZlbCA9IChNYXRoLnJvdW5kKHRyYW5jZUxldmVsICogMTAwKSAvIDEwMClcbiAgaWYgKGxvZ0l0ICUgMTQgPT0gMCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGltZTogXCIgKyAodGltZSAvIDEwMDApICsgXCIsIHRyYW5jZTogXCIgKyByb3VuZGVkVHJhbmNlTGV2ZWwgKyBcIiwgbm9pc2U6IFwiICsgbm9pc2VMZXZlbClcbiAgfVxuICBsb2dJdCsrXG5cbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgaWYgKHRyYW5jZUxldmVsID49IDUpIHtcbiAgICBwbGF5WW91V29uU2NlbmUoKVxuICB9XG5cbiAgbGV0IGUgPSA8RXZlbnQ+KGV2ZW50KTtcbiAgc3RhZ2UudXBkYXRlKCk7XG4gIGxhc3RUaWNrVGltZSA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKSB7XG4gIG5vaXNlTGV2ZWwgPSAwXG4gIGZvciAodmFyIG4gb2Ygbm9pc2VzKSB7XG4gICAgbi50aWNrKHRpbWUpXG4gICAgbm9pc2VMZXZlbCArPSBuLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSlcbiAgfVxuICBub2lzZUxldmVsICs9IHdhbGtpbmdOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RXZlbnQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVLZXlFdmVudClcbiAgdmFyIHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKHN0YWdlLCB0cnVlKVxuICBsb2FkU291bmRzKHF1ZXVlLCBzdGFydFNjZW5lcywgcHJvZ3Jlc3NCYXIpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2NlbmVzKCkge1xuICBwbGF5SW50cm9TY2VuZSgpXG59XG5cbi8vIGludHJvIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlJbnRyb1NjZW5lKCkge1xuICAvLyBtYWtlIHRoZSBzdGFnZVxuXG4gIC8vIGVsZW1lbnRzIG9mIHRoZSB0aXRsZSBwYWdlXG4gIHZhciBjYWJpbkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiaW50cm9jYWJpblwiKSlcbiAgY2FiaW5CaXRtYXAueCA9IGNhYmluQml0bWFwLnkgPSAwXG4gIGNhYmluQml0bWFwLnNjYWxlWCA9IGNhYmluQml0bWFwLnNjYWxlWSA9IC40NVxuICAvLyBpbnRyb0NvbnRhaW5lci5hZGRDaGlsZChjYWJpbkJpdG1hcClcblxuICBzdGFnZS5hZGRDaGlsZChjYWJpbkJpdG1hcClcbiAgLy8gIHdhaXQgYSBoYWxmIHNlY29uZCBmb3IgdGhlIGNhYmluIGltYWdlIHRvIGxvYWQgYmVmb3JlIHVwZGF0aW5nIHRoZSBzdGFnZVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA1MDApO1xuXG4gIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBsYXlHYW1lU2NlbmUoKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUtleUV2ZW50KGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IGtleUV2ZW50ID0gPEtleWJvYXJkRXZlbnQ+ZXZlbnQ7XG4gIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiICYmIGtleUV2ZW50LmtleSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIH0gZWxzZSBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleXVwXCIgJiYga2V5RXZlbnQua2V5ID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIH1cbiAgY29uc29sZS5sb2coXCJ3YWxraW5nIGFjdGl2ZTogXCIgKyB3YWxraW5nTm9pc2UuYWN0aXZlKVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICBvdXRlcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzRkMWMyMFwiKS5kcmF3UmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG5cbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgY2FudmFzLndpZHRoIC0gMzAsIGNhbnZhcy5oZWlnaHQgLSAzMClcblxuICAvLyBkYXNoYm9hcmQgZGlzcGxheWluZyB0cmFuY2UgbGV2ZWwgYW5kIG5vaXNlIGxldmVsXG4gIGRhc2hib2FyZF9iZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTQxNjcwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgMTIwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfYmcueCA9IDIwMFxuICBkYXNoYm9hcmRfYmcueSA9IDMwXG5cbiAgZGFzaGJvYXJkX2ZnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzOTNjZGJcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMzgwLCAxMDAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9mZy54ID0gMjEwXG4gIGRhc2hib2FyZF9mZy55ID0gNDBcblxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuICAvLyB3b2xmIGltYWdlXG4gIHZhciB3b2xmQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy93b2xmLnBuZ1wiKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG5cbiAgdmFyIHBsYXllclNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICBpbWFnZXM6IFtcInJlcy9wbGF5ZXItc3ByaXRlbWFwLXY5LXJlZHBhbnRzLnBuZ1wiXSxcbiAgICBmcmFtZXM6IHtcbiAgICAgIHdpZHRoOiA0NixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjb3VudDogNDBcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHJ1bjogWzI0LCAzMSwgXCJydW5cIiwgMSAvIDVdXG4gICAgfVxuICB9KVxuICB2YXIgcGxheWVyU3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShwbGF5ZXJTcHJpdGVTaGVldClcbiAgcGxheWVyU3ByaXRlLnggPSBjYW52YXMud2lkdGggLyAyXG4gIHBsYXllclNwcml0ZS55ID0gY2FudmFzLmhlaWdodCAtIDEwMFxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgdHJhbmNlbGV2ZWx0ZXh0LCBub2lzZWxldmVsdGV4dCwgdHJhbmNldGFibGUsIHdvbGZCaXRtYXAsIHBsYXllclNwcml0ZSlcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcbiAgc3RhZ2UuYWRkQ2hpbGQoZ2FtZUNvbnRhaW5lcilcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG4gIHBsYXllclNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxufVxuXG5cblxuLy8gXCJ5b3Ugd29uXCIgcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheVlvdVdvblNjZW5lKCkge1xuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn0iLCJleHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIge1xuICBvdXRlckJhcjogY3JlYXRlanMuU2hhcGVcbiAgaW5uZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIHByb2dyZXNzOiBudW1iZXJcbiAgc3RhZ2U/OiBjcmVhdGVqcy5TdGFnZVxuICByZW1vdmVPbkxvYWQ6IGJvb2xlYW5cbiAgY29uc3RydWN0b3Ioc3RhZ2U6IGNyZWF0ZWpzLlN0YWdlLCByZW1vdmVPbkxvYWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm91dGVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICB0aGlzLmlubmVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICB0aGlzLm91dGVyQmFyLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxODE4MThcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCA2MCwgNSwgNSwgNSwgNSlcbiAgICB0aGlzLm91dGVyQmFyLnggPSAyMDBcbiAgICB0aGlzLm91dGVyQmFyLnkgPSAyNzBcbiAgICB0aGlzLnByb2dyZXNzID0gMFxuICAgIHN0YWdlLmFkZENoaWxkKHRoaXMub3V0ZXJCYXIpXG5cbiAgICB0aGlzLmlubmVyQmFyLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzMjdmYThcIikuZHJhd1JlY3QoMCwgMCwgMzgwLCA0MClcbiAgICB0aGlzLmlubmVyQmFyLnggPSAyMTBcbiAgICB0aGlzLmlubmVyQmFyLnkgPSAyODBcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcblxuICAgIHN0YWdlLmFkZENoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlXG4gICAgdGhpcy5yZW1vdmVPbkxvYWQgPSByZW1vdmVPbkxvYWRcbiAgfVxuICBoYW5kbGVQcm9ncmVzcyhldmVudDogT2JqZWN0KSB7XG4gICAgdmFyIHByb2dyZXNzRXZlbnQgPSA8Y3JlYXRlanMuUHJvZ3Jlc3NFdmVudD5ldmVudFxuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzc0V2ZW50LnByb2dyZXNzXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG4gICAgdGhpcy5zdGFnZSEudXBkYXRlKClcbiAgfVxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhZ2UpIHtcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMub3V0ZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEudXBkYXRlKClcbiAgICAgIHRoaXMuc3RhZ2UgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbiAgaGFuZGxlQ29tcGxldGUoZXZlbnQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLnJlbW92ZU9uTG9hZCkge1xuICAgICAgdGhpcy5yZW1vdmUoKVxuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuZXhwb3J0IGxldCB3b2xmU291bmQ6IHN0cmluZyA9IFwid29sZlwiXG5leHBvcnQgbGV0IG91dHNpZGVTb3VuZDogc3RyaW5nID0gXCJvdXRzaWRlXCJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkU291bmRzKHF1ZXVlOiBjcmVhdGVqcy5Mb2FkUXVldWUsIG5leHQ6ICgpID0+IHZvaWQsIHByb2dyZXNzQmFyPzogUHJvZ3Jlc3NCYXIpIHtcbiAgcXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbXCJtcDNcIl07XG4gIGlmIChwcm9ncmVzc0Jhcikge1xuICAgIHF1ZXVlLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MsIHByb2dyZXNzQmFyKVxuICB9XG4gIHF1ZXVlLm9uKFwiY29tcGxldGVcIiwge1xuICAgIGhhbmRsZUV2ZW50OiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChwcm9ncmVzc0Jhcikge1xuICAgICAgICBxdWV1ZS5vZmYoXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcylcbiAgICAgICAgcHJvZ3Jlc3NCYXIuaGFuZGxlQ29tcGxldGUoZXZlbnQpXG4gICAgICB9XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH0pXG4gIHF1ZXVlLmxvYWRNYW5pZmVzdChbXG4gICAgeyBpZDogXCJ3b2xmXCIsIHNyYzogXCJyZXMvd29sZi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwib3V0c2lkZVwiLCBzcmM6IFwicmVzL291dHNpZGUubXAzXCIgfSxcbiAgICB7IGlkOiBcImludHJvY2FiaW5cIiwgc3JjOiBcInJlcy9pbnRyb2NhYmluLmpwZ1wiIH0sXG4gIF0pXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=