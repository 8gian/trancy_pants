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
var noises = [
    new TimedNoise(OutsideWindow, 2000),
    new TimedNoise(Wolf, 3000),
    new TimedNoise(Wolf, 6000),
    new TimedNoise(OutsideWindow, 7500)
];
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
        console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel);
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    if (tranceLevel > 20) {
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
    var progressBar = new progressbar_1.ProgressBar(stage, true);
    sound_1.loadSounds(queue, startScenes, progressBar);
}
function startScenes() {
    playIntroScene();
    playGameScene();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxXQUFXLEdBQUcsQ0FBQztBQUNuQixJQUFJLFVBQVUsR0FBRyxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixnREFBZ0Q7QUFDaEQsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO0FBQzVDLGlEQUFpRDtBQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN4RSxJQUFJLGVBQWUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxJQUFJLGNBQWMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbkUsSUFBSSxVQUFVLEdBQVcsTUFBTTtBQUMvQixJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFMUMsTUFBTSxLQUFLO0lBSVQsWUFBWSxVQUFrQixFQUFFLFVB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QyxjQUFjLEVBQUUsV0FBVyxDQUFDO0tBQzlEO0lBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDbkIsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQztnQkFDakQsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDbEM7WUFDRCxJQUFJLEVBQUU7UUFDUixDQUFDO0tBQ0YsQ0FBQztJQUNGLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDakIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUU7UUFDbkMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtRQUN6QyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFO0tBQ2hELENBQUM7QUFDSixDQUFDO0FBcEJELGdDQW9CQyIsImZpbGUiOiJidWlsZC9idW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5pbXBvcnQgeyBsb2FkU291bmRzIH0gZnJvbSBcIi4vc291bmRcIlxubGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4vLyB2YXIgaW50cm9Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG4vLyB2YXIgeW91V29uQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VXb25UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3Ugd29uIVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNldGFibGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbmxldCBncmV5Y2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbnZhciB3b2xmbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIldvbGZcIiwgXCIyMHB4IEFyaWFsXCIsIFwiIzMwMmEzNlwiKTtcbnZhciB0cmFuY2VSYXRlOiBudW1iZXIgPSAwLjAwMDVcbnZhciBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpO1xuXG5jbGFzcyBOb2lzZSB7XG4gIG5vaXNlTGV2ZWw6IG51bWJlclxuICBkdXJhdGlvbk1zOiBudW1iZXJcbiAgc291bmQ6IHN0cmluZ1xuICBjb25zdHJ1Y3Rvcihub2lzZUxldmVsOiBudW1iZXIsIGR1cmF0aW9uTVM6IG51bWJlciwgc291bmQ6IHN0cmluZykge1xuICAgIHRoaXMubm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbiAgICB0aGlzLmR1cmF0aW9uTXMgPSBkdXJhdGlvbk1TXG4gICAgdGhpcy5zb3VuZCA9IHNvdW5kXG4gIH1cbn1cblxuY29uc3QgV29sZiA9IG5ldyBOb2lzZSgzLCAyMDAwLCBcIndvbGZcIilcbmNvbnN0IE91dHNpZGVXaW5kb3cgPSBuZXcgTm9pc2UoMiwgMTAwMCwgXCJvdXRzaWRlXCIpXG5cbmNsYXNzIFRpbWVkTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zKSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbnZhciBub2lzZXMgPSBbXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDIwMDApLFxuICBuZXcgVGltZWROb2lzZShXb2xmLCAzMDAwKSxcbiAgbmV3IFRpbWVkTm9pc2UoV29sZiwgNjAwMCksXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDc1MDApXG5dXG5cbnZhciBsb2dJdCA9IDBcblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQgdGltZSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKCk7XG4gIGxldCB0aW1lTGVmdG92ZXIgPSB0aW1lICUgNTA7XG4gIHRpbWUgLT0gdGltZUxlZnRvdmVyO1xuICB2YXIgZGVsdGFUaW1lOiBudW1iZXIgPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG5cbiAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB1cGRhdGVOb2lzZUxldmVsKHRpbWUpXG5cbiAgLy8gZW5kIG9mIHZhcmlhYmxlIHVwZGF0ZXMsIG9ubHkgZGlzcGxheXMgYmVsb3dcbiAgdmFyIHJvdW5kZWRUcmFuY2VMZXZlbCA9IChNYXRoLnJvdW5kKHRyYW5jZUxldmVsICogMTAwKSAvIDEwMClcbiAgaWYgKGxvZ0l0ICUgMTQgPT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFwidGltZTogXCIgKyAodGltZSAvIDEwMDApICsgXCIsIHRyYW5jZTogXCIgKyByb3VuZGVkVHJhbmNlTGV2ZWwgKyBcIiwgbm9pc2U6IFwiICsgbm9pc2VMZXZlbClcbiAgfVxuICBsb2dJdCsrXG5cbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgaWYgKHRyYW5jZUxldmVsID4gMjApIHtcbiAgICBwbGF5WW91V29uU2NlbmUoKVxuICB9XG5cbiAgbGV0IGUgPSA8RXZlbnQ+KGV2ZW50KTtcbiAgc3RhZ2UudXBkYXRlKCk7XG4gIGxhc3RUaWNrVGltZSA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKSB7XG4gIG5vaXNlTGV2ZWwgPSAwXG4gIGZvciAodmFyIG4gb2Ygbm9pc2VzKSB7XG4gICAgbi50aWNrKHRpbWUpXG4gICAgbm9pc2VMZXZlbCArPSBuLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUcmFuY2VMZXZlbChkZWx0YVRpbWU6IG51bWJlcikge1xuICAvLyBsb29rIGF0IHRoZSBub2lzZSBsZXZlbFxuICAvLyBpZiB0aGUgbm9pc2UgbGV2ZWwgaXMgPCAzXG4gIGlmIChub2lzZUxldmVsIDwgMykge1xuICAgIC8vIGluY3JlYXNlIHRoZSB0cmFuY2UgbGV2ZWwgYnkgMC41IGV2ZXJ5IDEwMDAgbXMgKDEgcylcbiAgICB0cmFuY2VMZXZlbCArPSB0cmFuY2VSYXRlICogZGVsdGFUaW1lXG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2RlbW9DYW52YXMnKVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHZhciBwcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhcihzdGFnZSwgdHJ1ZSlcbiAgbG9hZFNvdW5kcyhxdWV1ZSwgc3RhcnRTY2VuZXMsIHByb2dyZXNzQmFyKVxufVxuXG5mdW5jdGlvbiBzdGFydFNjZW5lcygpIHtcbiAgcGxheUludHJvU2NlbmUoKVxuICBwbGF5R2FtZVNjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIC8vIGludHJvQ29udGFpbmVyLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuXG4gIGRhc2hib2FyZF9mZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzkzY2RiXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDM4MCwgMTAwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfZmcueCA9IDIxMFxuICBkYXNoYm9hcmRfZmcueSA9IDQwXG5cbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB0cmFuY2VsYWJlbC54ID0gMjI1XG4gIHRyYW5jZWxhYmVsLnkgPSA3NVxuICB0cmFuY2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxhYmVsLnggPSAyMjVcbiAgbm9pc2VsYWJlbC55ID0gMTE1XG4gIG5vaXNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gbWV0cmljcyBudW1iZXJzXG4gIHRyYW5jZWxldmVsdGV4dC54ID0gMzYwXG4gIHRyYW5jZWxldmVsdGV4dC55ID0gNzVcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgbm9pc2VsZXZlbHRleHQueSA9IDExNVxuICBub2lzZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyB0cmFuY2UgdGFibGUhXG4gIHRyYW5jZXRhYmxlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNiZGYyZTJcIikuZHJhd1JlY3QoMCwgMCwgMjUwLCAxMjApXG4gIHRyYW5jZXRhYmxlLnggPSAyNzVcbiAgdHJhbmNldGFibGUueSA9IDI1MFxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG5cbiAgLy8gd29sZiBpbWFnZVxuICB2YXIgd29sZkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoXCJyZXMvd29sZi5wbmdcIik7XG4gIHdvbGZCaXRtYXAueCA9IGNhbnZhcy53aWR0aCAtIDE1MFxuICB3b2xmQml0bWFwLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG4gIHdvbGZCaXRtYXAuc2NhbGVYID0gd29sZkJpdG1hcC5zY2FsZVkgPSAuMlxuXG4gIHZhciBwbGF5ZXJTcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgaW1hZ2VzOiBbXCJyZXMvcGxheWVyLXNwcml0ZW1hcC12OS1yZWRwYW50cy5wbmdcIl0sXG4gICAgZnJhbWVzOiB7XG4gICAgICB3aWR0aDogNDYsXG4gICAgICBoZWlnaHQ6IDUwLFxuICAgICAgY291bnQ6IDQwXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBydW46IFsyNCwgMzEsIFwicnVuXCIsIDEgLyA1XVxuICAgIH1cbiAgfSlcbiAgdmFyIHBsYXllclNwcml0ZSA9IG5ldyBjcmVhdGVqcy5TcHJpdGUocGxheWVyU3ByaXRlU2hlZXQpXG4gIHBsYXllclNwcml0ZS54ID0gY2FudmFzLndpZHRoIC8gMlxuICBwbGF5ZXJTcHJpdGUueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcblxuICAvLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNvbnRhaW5lciBmb3IgdGhpcyBzY2VuZVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKG91dGVyd2FsbCwgaW5uZXJ3YWxsLCBkYXNoYm9hcmRfYmcsIGRhc2hib2FyZF9mZywgdHJhbmNlbGFiZWwsIG5vaXNlbGFiZWwsIHRyYW5jZWxldmVsdGV4dCwgbm9pc2VsZXZlbHRleHQsIHRyYW5jZXRhYmxlLCB3b2xmQml0bWFwLCBwbGF5ZXJTcHJpdGUpXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChvdXRlcndhbGwsIDApXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChpbm5lcndhbGwsIDEpXG4gIHN0YWdlLmFkZENoaWxkKGdhbWVDb250YWluZXIpXG5cbiAgLy8gVXBkYXRlIHN0YWdlIHdpbGwgcmVuZGVyIG5leHQgZnJhbWVcbiAgc3RhZ2UudXBkYXRlKClcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxuICBwbGF5ZXJTcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcbn1cblxuXG5cbi8vIFwieW91IHdvblwiIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlZb3VXb25TY2VuZSgpIHtcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91V29uVGV4dC54ID0gMzYwXG4gIHlvdVdvblRleHQueSA9IDExNVxuICB5b3VXb25UZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YWdlLmFkZENoaWxkKHlvdVdvblRleHQpXG5cbiAgc3RhZ2UudXBkYXRlKClcbn1cblxuLy8gXCJ5b3UgbG9zdFwiIHBhZ2UgZnVuY3Rpb25cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgaW5pdCgpXG59IiwiZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgb3V0ZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIGlubmVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBwcm9ncmVzczogbnVtYmVyXG4gIHN0YWdlPzogY3JlYXRlanMuU3RhZ2VcbiAgcmVtb3ZlT25Mb2FkOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKHN0YWdlOiBjcmVhdGVqcy5TdGFnZSwgcmVtb3ZlT25Mb2FkOiBib29sZWFuKSB7XG4gICAgdGhpcy5vdXRlckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5pbm5lckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5vdXRlckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTgxODE4XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgNjAsIDUsIDUsIDUsIDUpXG4gICAgdGhpcy5vdXRlckJhci54ID0gMjAwXG4gICAgdGhpcy5vdXRlckJhci55ID0gMjcwXG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLm91dGVyQmFyKVxuXG4gICAgdGhpcy5pbm5lckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzI3ZmE4XCIpLmRyYXdSZWN0KDAsIDAsIDM4MCwgNDApXG4gICAgdGhpcy5pbm5lckJhci54ID0gMjEwXG4gICAgdGhpcy5pbm5lckJhci55ID0gMjgwXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG5cbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZVxuICAgIHRoaXMucmVtb3ZlT25Mb2FkID0gcmVtb3ZlT25Mb2FkXG4gIH1cbiAgaGFuZGxlUHJvZ3Jlc3MoZXZlbnQ6IE9iamVjdCkge1xuICAgIHZhciBwcm9ncmVzc0V2ZW50ID0gPGNyZWF0ZWpzLlByb2dyZXNzRXZlbnQ+ZXZlbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NFdmVudC5wcm9ncmVzc1xuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YWdlKSB7XG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLm91dGVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gICAgICB0aGlzLnN0YWdlID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIGhhbmRsZUNvbXBsZXRlKGV2ZW50OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVPbkxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKClcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmV4cG9ydCBsZXQgd29sZlNvdW5kOiBzdHJpbmcgPSBcIndvbGZcIlxuZXhwb3J0IGxldCBvdXRzaWRlU291bmQ6IHN0cmluZyA9IFwib3V0c2lkZVwiXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNvdW5kcyhxdWV1ZTogY3JlYXRlanMuTG9hZFF1ZXVlLCBuZXh0OiAoKSA9PiB2b2lkLCBwcm9ncmVzc0Jhcj86IFByb2dyZXNzQmFyKSB7XG4gIHF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gW1wibXAzXCJdO1xuICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICBxdWV1ZS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzLCBwcm9ncmVzc0JhcilcbiAgfVxuICBxdWV1ZS5vbihcImNvbXBsZXRlXCIsIHtcbiAgICBoYW5kbGVFdmVudDogKGV2ZW50KSA9PiB7XG4gICAgICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgcXVldWUub2ZmKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MpXG4gICAgICAgIHByb2dyZXNzQmFyLmhhbmRsZUNvbXBsZXRlKGV2ZW50KVxuICAgICAgfVxuICAgICAgbmV4dCgpXG4gICAgfVxuICB9KVxuICBxdWV1ZS5sb2FkTWFuaWZlc3QoW1xuICAgIHsgaWQ6IFwid29sZlwiLCBzcmM6IFwicmVzL3dvbGYubXAzXCIgfSxcbiAgICB7IGlkOiBcIm91dHNpZGVcIiwgc3JjOiBcInJlcy9vdXRzaWRlLm1wM1wiIH0sXG4gICAgeyBpZDogXCJpbnRyb2NhYmluXCIsIHNyYzogXCJyZXMvaW50cm9jYWJpbi5qcGdcIiB9LFxuICBdKVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9