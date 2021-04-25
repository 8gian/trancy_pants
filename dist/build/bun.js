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
var outerwall = new createjs.Shape();
var innerwall = new createjs.Shape();
var dashboard_bg = new createjs.Shape();
var dashboard_fg = new createjs.Shape();
var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
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
    playGameScene();
}
function playGameScene() {
    // create a Stage by getting a reference to a canvas
    stage = new createjs.Stage('demoCanvas');
    canvas = stage.canvas;
    // create a Shape DisplayObject
    // let circle = new createjs.Shape()
    // circle.graphics.beginFill('red').drawCircle(0, 0, 40)
    // Set position of Shape instance.
    // circle.x = circle.y = 150
    // Add Shape instance to stage display list.
    // stage.addChild(circle)
    // create a background rectangle
    outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height);
    stage.addChild(outerwall);
    stage.setChildIndex(outerwall, 0);
    // create the inner rectangle for the "floor" of the cabin
    innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30);
    stage.addChild(innerwall);
    stage.setChildIndex(innerwall, 1);
    // dashboard displaying trance level and noise level
    dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5);
    dashboard_bg.x = 200;
    dashboard_bg.y = 30;
    stage.addChild(dashboard_bg);
    dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5);
    dashboard_fg.x = 210;
    dashboard_fg.y = 40;
    stage.addChild(dashboard_fg);
    // metrics text labels
    trancelabel.x = 225;
    trancelabel.y = 75;
    trancelabel.textBaseline = "alphabetic";
    stage.addChild(trancelabel);
    noiselabel.x = 225;
    noiselabel.y = 115;
    noiselabel.textBaseline = "alphabetic";
    stage.addChild(noiselabel);
    // metrics numbers
    tranceleveltext.x = 360;
    tranceleveltext.y = 75;
    tranceleveltext.textBaseline = "alphabetic";
    stage.addChild(tranceleveltext);
    noiseleveltext.x = 360;
    noiseleveltext.y = 115;
    noiseleveltext.textBaseline = "alphabetic";
    stage.addChild(noiseleveltext);
    // trance table!
    trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120);
    trancetable.x = 275;
    trancetable.y = 250;
    stage.addChild(trancetable);
    // person on trance table!
    // create a grey circle - wolf!
    greycircle.graphics.beginFill('grey').drawCircle(0, 0, 40);
    greycircle.x = canvas.width - 100;
    greycircle.y = canvas.height - 100;
    stage.addChild(greycircle);
    // wolf text
    wolflabel.x = canvas.width - 120;
    wolflabel.y = canvas.height - 100;
    wolflabel.textBaseline = "alphabetic";
    stage.addChild(wolflabel);
    // stage.setChildIndex(wolflabel, 4)
    // Update stage will render next frame
    stage.update();
    createjs.Ticker.addEventListener("tick", gameLoop);
}
window.onload = () => {
    init();
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSSxNQUFzQjtBQUMxQixJQUFJLEtBQXFCO0FBQ3pCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDO0FBQ3BCLElBQUksTUFBeUI7QUFDN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcs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O0lBQ1osU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNqQyxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ2xDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3pCLG9DQUFvQztJQUVwQyxzQ0FBc0M7SUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRTtJQUNkLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUNwRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkIsSUFBSSxFQUFFO0FBQ1IsQ0FBQyIsImZpbGUiOiJidWlsZC9idW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwibGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZXRhYmxlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG5sZXQgZ3JleWNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG52YXIgd29sZmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJXb2xmXCIsIFwiMjBweCBBcmlhbFwiLCBcIiMzMDJhMzZcIik7XG52YXIgdHJhbmNlUmF0ZTogbnVtYmVyID0gMC4wMDA1XG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBjb25zdHJ1Y3Rvcihub2lzZUxldmVsOiBudW1iZXIsIGR1cmF0aW9uTVM6IG51bWJlcikge1xuICAgIHRoaXMubm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbiAgICB0aGlzLmR1cmF0aW9uTXMgPSBkdXJhdGlvbk1TXG4gIH1cbn1cblxuY29uc3QgV29sZiA9IG5ldyBOb2lzZSgzLCAyMDAwKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwKVxuXG5jbGFzcyBUaW1lZE5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25NcykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG52YXIgbm9pc2VzID0gW1xuICBuZXcgVGltZWROb2lzZShPdXRzaWRlV2luZG93LCAyMDAwKSxcbiAgbmV3IFRpbWVkTm9pc2UoV29sZiwgMzAwMCksXG4gIG5ldyBUaW1lZE5vaXNlKFdvbGYsIDYwMDApLFxuICBuZXcgVGltZWROb2lzZShPdXRzaWRlV2luZG93LCA3NTAwKVxuXVxuXG52YXIgbG9nSXQgPSAwXG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICB2YXIgZGVsdGFUaW1lOiBudW1iZXIgPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG5cbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuICB1cGRhdGVUcmFuY2VMZXZlbChkZWx0YVRpbWUpXG5cbiAgLy8gZW5kIG9mIHZhcmlhYmxlIHVwZGF0ZXMsIG9ubHkgZGlzcGxheXMgYmVsb3dcbiAgdmFyIHJvdW5kZWRUcmFuY2VMZXZlbCA9IChNYXRoLnJvdW5kKHRyYW5jZUxldmVsICogMTAwKSAvIDEwMClcbiAgaWYgKGxvZ0l0ICUgMTQgPT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFwidGltZTogXCIgKyAodGltZSAvIDEwMDApICsgXCIsIHRyYW5jZTogXCIgKyByb3VuZGVkVHJhbmNlTGV2ZWwgKyBcIiwgbm9pc2U6IFwiICsgbm9pc2VMZXZlbClcbiAgfVxuICBsb2dJdCsrXG5cbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcblxuICBsZXQgZSA9IDxFdmVudD4oZXZlbnQpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgZm9yICh2YXIgbiBvZiBub2lzZXMpIHtcbiAgICBub2lzZUxldmVsICs9IG4uZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBwbGF5R2FtZVNjZW5lKCk7XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lU2NlbmUoKSB7XG4gIC8vIGNyZWF0ZSBhIFN0YWdlIGJ5IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gYSBjYW52YXNcbiAgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2RlbW9DYW52YXMnKVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIC8vIGNyZWF0ZSBhIFNoYXBlIERpc3BsYXlPYmplY3RcbiAgLy8gbGV0IGNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gIC8vIGNpcmNsZS5ncmFwaGljcy5iZWdpbkZpbGwoJ3JlZCcpLmRyYXdDaXJjbGUoMCwgMCwgNDApXG4gIC8vIFNldCBwb3NpdGlvbiBvZiBTaGFwZSBpbnN0YW5jZS5cbiAgLy8gY2lyY2xlLnggPSBjaXJjbGUueSA9IDE1MFxuICAvLyBBZGQgU2hhcGUgaW5zdGFuY2UgdG8gc3RhZ2UgZGlzcGxheSBsaXN0LlxuICAvLyBzdGFnZS5hZGRDaGlsZChjaXJjbGUpXG5cbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuICBzdGFnZS5hZGRDaGlsZChvdXRlcndhbGwpXG4gIHN0YWdlLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG4gIHN0YWdlLmFkZENoaWxkKGlubmVyd2FsbClcbiAgc3RhZ2Uuc2V0Q2hpbGRJbmRleChpbm5lcndhbGwsIDEpXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuICBzdGFnZS5hZGRDaGlsZChkYXNoYm9hcmRfYmcpXG5cbiAgZGFzaGJvYXJkX2ZnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzOTNjZGJcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMzgwLCAxMDAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9mZy54ID0gMjEwXG4gIGRhc2hib2FyZF9mZy55ID0gNDBcbiAgc3RhZ2UuYWRkQ2hpbGQoZGFzaGJvYXJkX2ZnKVxuXG4gIC8vIG1ldHJpY3MgdGV4dCBsYWJlbHNcbiAgdHJhbmNlbGFiZWwueCA9IDIyNVxuICB0cmFuY2VsYWJlbC55ID0gNzVcbiAgdHJhbmNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHRyYW5jZWxhYmVsKVxuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgc3RhZ2UuYWRkQ2hpbGQobm9pc2VsYWJlbClcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHRyYW5jZWxldmVsdGV4dClcblxuICBub2lzZWxldmVsdGV4dC54ID0gMzYwXG4gIG5vaXNlbGV2ZWx0ZXh0LnkgPSAxMTVcbiAgbm9pc2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKG5vaXNlbGV2ZWx0ZXh0KVxuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG4gIHN0YWdlLmFkZENoaWxkKHRyYW5jZXRhYmxlKVxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG5cblxuICAvLyBjcmVhdGUgYSBncmV5IGNpcmNsZSAtIHdvbGYhXG4gIGdyZXljaXJjbGUuZ3JhcGhpY3MuYmVnaW5GaWxsKCdncmV5JykuZHJhd0NpcmNsZSgwLCAwLCA0MClcbiAgZ3JleWNpcmNsZS54ID0gY2FudmFzLndpZHRoIC0gMTAwXG4gIGdyZXljaXJjbGUueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgc3RhZ2UuYWRkQ2hpbGQoZ3JleWNpcmNsZSlcblxuICAvLyB3b2xmIHRleHRcbiAgd29sZmxhYmVsLnggPSBjYW52YXMud2lkdGggLSAxMjA7XG4gIHdvbGZsYWJlbC55ID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbiAgd29sZmxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuICBzdGFnZS5hZGRDaGlsZCh3b2xmbGFiZWwpXG4gIC8vIHN0YWdlLnNldENoaWxkSW5kZXgod29sZmxhYmVsLCA0KVxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgaW5pdCgpXG59Il0sInNvdXJjZVJvb3QiOiIifQ==