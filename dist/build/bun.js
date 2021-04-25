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
class Noise {
    constructor(noiseLevel, durationMS) {
        this.noiseLevel = noiseLevel;
        this.durationMs = durationMS;
    }
}
const Wolf = new Noise(3, 2000);
const OutsideWindow = new Noise(2, 1000);
class TimedNoise {
    constructor(n, startTime) {
        this.startTime = startTime;
        this.noise = n;
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
    noiseLevel = 0;
    let time = createjs.Ticker.getTime();
    var deltaTime = time - lastTickTime;
    updateNoiseLevel(time);
    updateTranceLevel(deltaTime);
    // end of variable updates, only displays below
    var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100);
    if (logIt % 14 == 0) {
        console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel);
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    let e = (event);
    stage.update();
    lastTickTime = time;
}
function updateNoiseLevel(time) {
    for (var n of noises) {
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
    playIntroScene();
    // playGameScene();
}
// intro page function
function playIntroScene() {
    // make the stage
    stage = new createjs.Stage('demoCanvas');
    canvas = stage.canvas;
    // elements of the title page
    var cabinBitmap = new createjs.Bitmap("res/introcabin.jpg");
    cabinBitmap.x = cabinBitmap.y = 0;
    cabinBitmap.scaleX = cabinBitmap.scaleY = .45;
    // introContainer.addChild(cabinBitmap)
    stage.addChild(cabinBitmap);
    //  wait a half second for the cabin image to load before updating the stage
    setTimeout(function () {
        stage.update();
    }, 500);
    // wait 3 seconds then start game
    setTimeout(function () {
        playGameScene();
    }, 3000);
}
function playGameScene() {
    canvas = stage.canvas;
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
    setTimeout(function () {
        playYouWonScene();
    }, 4000);
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSSxNQUFzQjtBQUMxQixJQUFJLEtBQXFCO0FBQ3pCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDO0FBQ3BCLElBQUksTUFBeUI7QUFDN0IsZ0RBQWdEO0FBQ2hELElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtBQUM1QyxpREFBaUQ7QUFDakQsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7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QVcsQ0FBQyxLQUFLLENBQUM7SUFFL0IsVUFBVSxDQUFDO1FBQ1QsZUFBZSxFQUFFO0lBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULENBQUM7QUFJRCwwQkFBMEI7QUFDMUIsU0FBUyxlQUFlO0lBQ3RCLE1BQU0sR0FBc0IsS0FBSyxDQUFDLE1BQU07SUFDeEMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO0lBQ3pCLGlFQUFpRTtJQUNqRSxVQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDbEIsVUFBVSxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQ2xCLFVBQVUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBRXZDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBRTFCLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDaEIsQ0FBQztBQUVELDJCQUEyQjtBQUUzQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixJQUFJLEVBQUU7QUFDUixDQUFDIiwiZmlsZSI6ImJ1aWxkXFxidW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwibGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4vLyB2YXIgaW50cm9Db250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG4vLyB2YXIgeW91V29uQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VXb25UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3Ugd29uIVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNldGFibGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbmxldCBncmV5Y2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbnZhciB3b2xmbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIldvbGZcIiwgXCIyMHB4IEFyaWFsXCIsIFwiIzMwMmEzNlwiKTtcbnZhciB0cmFuY2VSYXRlOiBudW1iZXIgPSAwLjAwMDVcblxuY2xhc3MgTm9pc2Uge1xuICBub2lzZUxldmVsOiBudW1iZXJcbiAgZHVyYXRpb25NczogbnVtYmVyXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDApXG5jb25zdCBPdXRzaWRlV2luZG93ID0gbmV3IE5vaXNlKDIsIDEwMDApXG5cbmNsYXNzIFRpbWVkTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zKSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbnZhciBub2lzZXMgPSBbXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDIwMDApLFxuICBuZXcgVGltZWROb2lzZShXb2xmLCAzMDAwKSxcbiAgbmV3IFRpbWVkTm9pc2UoV29sZiwgNjAwMCksXG4gIG5ldyBUaW1lZE5vaXNlKE91dHNpZGVXaW5kb3csIDc1MDApXG5dXG5cbnZhciBsb2dJdCA9IDBcblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IE9iamVjdCkge1xuICBub2lzZUxldmVsID0gMFxuICBsZXQgdGltZSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKCk7XG4gIHZhciBkZWx0YVRpbWU6IG51bWJlciA9IHRpbWUgLSBsYXN0VGlja1RpbWVcblxuICB1cGRhdGVOb2lzZUxldmVsKHRpbWUpXG4gIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZSlcblxuICAvLyBlbmQgb2YgdmFyaWFibGUgdXBkYXRlcywgb25seSBkaXNwbGF5cyBiZWxvd1xuICB2YXIgcm91bmRlZFRyYW5jZUxldmVsID0gKE1hdGgucm91bmQodHJhbmNlTGV2ZWwgKiAxMDApIC8gMTAwKVxuICBpZiAobG9nSXQgJSAxNCA9PSAwKSB7XG4gICAgY29uc29sZS5sb2coXCJ0aW1lOiBcIiArICh0aW1lIC8gMTAwMCkgKyBcIiwgdHJhbmNlOiBcIiArIHJvdW5kZWRUcmFuY2VMZXZlbCArIFwiLCBub2lzZTogXCIgKyBub2lzZUxldmVsKVxuICB9XG4gIGxvZ0l0KytcblxuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuXG4gIGxldCBlID0gPEV2ZW50PihldmVudCk7XG4gIHN0YWdlLnVwZGF0ZSgpO1xuICBsYXN0VGlja1RpbWUgPSB0aW1lO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVOb2lzZUxldmVsKHRpbWU6IG51bWJlcikge1xuICBmb3IgKHZhciBuIG9mIG5vaXNlcykge1xuICAgIG5vaXNlTGV2ZWwgKz0gbi5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKCk7XG4gIC8vIHBsYXlHYW1lU2NlbmUoKTtcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBcbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChcInJlcy9pbnRyb2NhYmluLmpwZ1wiKTtcbiAgY2FiaW5CaXRtYXAueCA9IGNhYmluQml0bWFwLnkgPSAwXG4gIGNhYmluQml0bWFwLnNjYWxlWCA9IGNhYmluQml0bWFwLnNjYWxlWSA9IC40NVxuICAvLyBpbnRyb0NvbnRhaW5lci5hZGRDaGlsZChjYWJpbkJpdG1hcClcblxuICBzdGFnZS5hZGRDaGlsZChjYWJpbkJpdG1hcClcbiAgLy8gIHdhaXQgYSBoYWxmIHNlY29uZCBmb3IgdGhlIGNhYmluIGltYWdlIHRvIGxvYWQgYmVmb3JlIHVwZGF0aW5nIHRoZSBzdGFnZVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS51cGRhdGUoKVxufSwgNTAwKTtcblxuICAvLyB3YWl0IDMgc2Vjb25kcyB0aGVuIHN0YXJ0IGdhbWVcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcGxheUdhbWVTY2VuZSgpXG59LCAzMDAwKTtcbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuXG4gIC8vIGNyZWF0ZSBhIGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gIG91dGVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNGQxYzIwXCIpLmRyYXdSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcblxuICAvLyBjcmVhdGUgdGhlIGlubmVyIHJlY3RhbmdsZSBmb3IgdGhlIFwiZmxvb3JcIiBvZiB0aGUgY2FiaW5cbiAgaW5uZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM3ZTZhOTRcIikuZHJhd1JlY3QoMTUsIDE1LCBjYW52YXMud2lkdGggLSAzMCwgY2FudmFzLmhlaWdodCAtIDMwKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgZGFzaGJvYXJkX2JnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxNDE2NzBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCAxMjAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9iZy54ID0gMjAwXG4gIGRhc2hib2FyZF9iZy55ID0gMzBcblxuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuXG4gIC8vIG1ldHJpY3MgdGV4dCBsYWJlbHNcbiAgdHJhbmNlbGFiZWwueCA9IDIyNVxuICB0cmFuY2VsYWJlbC55ID0gNzVcbiAgdHJhbmNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsYWJlbC54ID0gMjI1XG4gIG5vaXNlbGFiZWwueSA9IDExNVxuICBub2lzZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIG1ldHJpY3MgbnVtYmVyc1xuICB0cmFuY2VsZXZlbHRleHQueCA9IDM2MFxuICB0cmFuY2VsZXZlbHRleHQueSA9IDc1XG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxldmVsdGV4dC54ID0gMzYwXG4gIG5vaXNlbGV2ZWx0ZXh0LnkgPSAxMTVcbiAgbm9pc2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gdHJhbmNlIHRhYmxlIVxuICB0cmFuY2V0YWJsZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjYmRmMmUyXCIpLmRyYXdSZWN0KDAsIDAsIDI1MCwgMTIwKVxuICB0cmFuY2V0YWJsZS54ID0gMjc1XG4gIHRyYW5jZXRhYmxlLnkgPSAyNTBcblxuICAvLyBwZXJzb24gb24gdHJhbmNlIHRhYmxlIVxuXG4gIC8vIHdvbGYgaW1hZ2VcbiAgdmFyIHdvbGZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKFwicmVzL3dvbGYucG5nXCIpO1xuICB3b2xmQml0bWFwLnggPSBjYW52YXMud2lkdGggLSAxNTBcbiAgd29sZkJpdG1hcC55ID0gY2FudmFzLmhlaWdodCAtIDEwMFxuICB3b2xmQml0bWFwLnNjYWxlWCA9IHdvbGZCaXRtYXAuc2NhbGVZID0gLjJcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW1wicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCJdLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXJTcHJpdGUueCA9IGNhbnZhcy53aWR0aCAvIDJcbiAgcGxheWVyU3ByaXRlLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG5cbiAgLy8gYWRkIGVsZW1lbnRzIHRvIHRoZSBjb250YWluZXIgZm9yIHRoaXMgc2NlbmVcbiAgZ2FtZUNvbnRhaW5lci5hZGRDaGlsZChvdXRlcndhbGwsIGlubmVyd2FsbCwgZGFzaGJvYXJkX2JnLCBkYXNoYm9hcmRfZmcsIHRyYW5jZWxhYmVsLCBub2lzZWxhYmVsLCB0cmFuY2VsZXZlbHRleHQsIG5vaXNlbGV2ZWx0ZXh0LCB0cmFuY2V0YWJsZSwgd29sZkJpdG1hcCwgcGxheWVyU3ByaXRlKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuICBzdGFnZS5hZGRDaGlsZChnYW1lQ29udGFpbmVyKVxuICBcbiAgLy8gVXBkYXRlIHN0YWdlIHdpbGwgcmVuZGVyIG5leHQgZnJhbWVcbiAgc3RhZ2UudXBkYXRlKClcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxuICBwbGF5ZXJTcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBwbGF5WW91V29uU2NlbmUoKVxufSwgNDAwMCk7XG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKSBcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn0iXSwic291cmNlUm9vdCI6IiJ9