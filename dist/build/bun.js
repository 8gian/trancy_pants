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
var windownoiselevel = 2;
var wolfnoiselevel = 3;
var tranceRate = 0.0005;
function gameLoop(event) {
    noiseLevel = 0;
    let time = createjs.Ticker.getTime();
    console.log(time);
    var deltaTime = time - lastTickTime;
    if (time < 1000) {
        // tranceLevel = 0;
    }
    else if (time < 2000) {
        // tranceLevel = 1;
    }
    else if (time < 3000) {
        // tranceLevel = 2;
        noiseLevel += windownoiselevel;
    }
    else if (time < 4000) {
        // tranceLevel = 3;
        noiseLevel += wolfnoiselevel;
    }
    else if (time < 5000) {
        // tranceLevel = 3;
        noiseLevel += wolfnoiselevel + windownoiselevel;
    }
    else if (time < 6000) {
        // tranceLevel = 3;
    }
    else if (time < 7000) {
        // tranceLevel = 3;
    }
    updateTranceLevel(deltaTime);
    // end of variable updates, only displays below
    tranceleveltext.text = (Math.round(tranceLevel * 10) / 10).toString();
    noiseleveltext.text = noiseLevel.toString();
    let e = (event);
    stage.update();
    lastTickTime = time;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSSxNQUFzQjtBQUMxQixJQUFJLEtBQXFCO0FBQ3pCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDO0FBQ3BCLElBQUksTUFBeUI7QUFDN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDOUUsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUUsSUFBSSxlQUFlLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDckUsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDdkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3JDLElBQUksU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25FLElBQUksZ0JBQWdCLEdBQUcsQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksVUFBVSxHQUFVLE1BQU07QUFHOUIsU0FBUyxRQUFRLENBQUMsS0FBYTtJQUM3QixVQUFVLEdBQUcsQ0FBQztJQUNkLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDakIsSUFBSSxTQUFTLEdBQVUsSUFBSSxHQUFHLFlBQVk7SUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1FBQ2YsbUJBQW1CO0tBQ3BCO1NBQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1FBQ3RCLG1CQUFtQjtLQUNwQjtTQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtRQUN0QixtQkFBbUI7UUFDbkIsVUFBVSxJQUFJLGdCQUFnQjtLQUMvQjtTQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtRQUN0QixtQkFBbUI7UUFDbkIsVUFBVSxJQUFJLGNBQWM7S0FDN0I7U0FBTSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7UUFDdEIsbUJBQW1CO1FBQ25CLFVBQVUsSUFBSSxjQUFjLEdBQUcsZ0JBQWdCO0tBQ2hEO1NBQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1FBQ3RCLG1CQUFtQjtLQUNwQjtTQUFNLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtRQUN0QixtQkFBbUI7S0FDcEI7SUFFRCxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFFNUIsK0NBQStDO0lBRS9DLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsRSxjQUFjLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUU1QyxJQUFJLENBQUMsR0FBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDdEIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsU0FBZ0I7SUFDekMsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1QixJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7UUFDbEIsdURBQXVEO1FBQ3ZELFdBQVcsSUFBSSxVQUFVLEdBQUcsU0FBUztLQUN0QztBQUNILENBQUM7QUFFRCxTQUFTLElBQUk7SUFDWCxhQUFhLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ3BCLG9EQUFvRDtJQUNwRCxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUN4QyxNQUFNLEdBQXNCLEtBQUssQ0FBQyxNQUFNO0lBQ3hDLCtCQUErQjtJQUMvQixvQ0FBb0M7SUFDcEMsd0RBQXdEO0lBQ3hELGtDQUFrQztJQUNsQyw0QkFBNEI7SUFDNUIsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUV6QixnQ0FBZ0M7SUFDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ25GLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUVqQywwREFBMEQ7SUFDMUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDL0YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDekIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLG9EQUFvRDtJQUNwRCxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLFlBQVksQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUNwQixZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFFNUIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDcEIsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ25CLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBRTVCLHNCQUFzQjtJQUN0QixXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDbkIsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ2xCLFdBQVcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBRTNCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUNsQixVQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDbEIsVUFBVSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFFMUIsa0JBQWtCO0lBQ2xCLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUN2QixlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsZUFBZSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDNUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFFL0IsY0FBYyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQ3RCLGNBQWMsQ0FBQyxDQUFDLEdBQUcsR0FBRztJQUN0QixjQUFjLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUU5QixnQkFBZ0I7SUFDaEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNsRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDbkIsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHO0lBQ25CLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBRTNCLDBCQUEwQjtJQUcxQiwrQkFBK0I7SUFDL0IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzFELFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHO0lBQ2pDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBRTFCLFlBQVk7SUFDWixTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDbEMsU0FBUyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDdEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDekIsb0NBQW9DO0lBRXBDLHNDQUFzQztJQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFO0lBQ2QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBQ3BELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixJQUFJLEVBQUU7QUFDUixDQUFDIiwiZmlsZSI6ImJ1aWxkXFxidW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwibGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZXRhYmxlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG5sZXQgZ3JleWNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG52YXIgd29sZmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJXb2xmXCIsIFwiMjBweCBBcmlhbFwiLCBcIiMzMDJhMzZcIik7XG52YXIgd2luZG93bm9pc2VsZXZlbCA9IDJcbnZhciB3b2xmbm9pc2VsZXZlbCA9IDNcbnZhciB0cmFuY2VSYXRlOm51bWJlciA9IDAuMDAwNVxuXG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICBjb25zb2xlLmxvZyh0aW1lKVxuICB2YXIgZGVsdGFUaW1lOm51bWJlciA9IHRpbWUgLSBsYXN0VGlja1RpbWVcbiAgaWYgKHRpbWUgPCAxMDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAwO1xuICB9IGVsc2UgaWYgKHRpbWUgPCAyMDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAxO1xuICB9IGVsc2UgaWYgKHRpbWUgPCAzMDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAyO1xuICAgIG5vaXNlTGV2ZWwgKz0gd2luZG93bm9pc2VsZXZlbFxuICB9IGVsc2UgaWYgKHRpbWUgPCA0MDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAzO1xuICAgIG5vaXNlTGV2ZWwgKz0gd29sZm5vaXNlbGV2ZWxcbiAgfSBlbHNlIGlmICh0aW1lIDwgNTAwMCkge1xuICAgIC8vIHRyYW5jZUxldmVsID0gMztcbiAgICBub2lzZUxldmVsICs9IHdvbGZub2lzZWxldmVsICsgd2luZG93bm9pc2VsZXZlbFxuICB9IGVsc2UgaWYgKHRpbWUgPCA2MDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAzO1xuICB9IGVsc2UgaWYgKHRpbWUgPCA3MDAwKSB7XG4gICAgLy8gdHJhbmNlTGV2ZWwgPSAzO1xuICB9XG5cbiAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG5cbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCoxMCkvMTApLnRvU3RyaW5nKCk7XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHQgPSBub2lzZUxldmVsLnRvU3RyaW5nKCk7XG5cbiAgbGV0IGUgPSA8RXZlbnQ+KGV2ZW50KTtcbiAgc3RhZ2UudXBkYXRlKCk7XG4gIGxhc3RUaWNrVGltZSA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTpudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHBsYXlHYW1lU2NlbmUoKTtcbn1cblxuZnVuY3Rpb24gcGxheUdhbWVTY2VuZSgpIHtcbiAgLy8gY3JlYXRlIGEgU3RhZ2UgYnkgZ2V0dGluZyBhIHJlZmVyZW5jZSB0byBhIGNhbnZhc1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgLy8gY3JlYXRlIGEgU2hhcGUgRGlzcGxheU9iamVjdFxuICAvLyBsZXQgY2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgLy8gY2lyY2xlLmdyYXBoaWNzLmJlZ2luRmlsbCgncmVkJykuZHJhd0NpcmNsZSgwLCAwLCA0MClcbiAgLy8gU2V0IHBvc2l0aW9uIG9mIFNoYXBlIGluc3RhbmNlLlxuICAvLyBjaXJjbGUueCA9IGNpcmNsZS55ID0gMTUwXG4gIC8vIEFkZCBTaGFwZSBpbnN0YW5jZSB0byBzdGFnZSBkaXNwbGF5IGxpc3QuXG4gIC8vIHN0YWdlLmFkZENoaWxkKGNpcmNsZSlcblxuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICBvdXRlcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzRkMWMyMFwiKS5kcmF3UmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG4gIHN0YWdlLmFkZENoaWxkKG91dGVyd2FsbClcbiAgc3RhZ2Uuc2V0Q2hpbGRJbmRleChvdXRlcndhbGwsIDApXG5cbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgY2FudmFzLndpZHRoIC0gMzAsIGNhbnZhcy5oZWlnaHQgLSAzMClcbiAgc3RhZ2UuYWRkQ2hpbGQoaW5uZXJ3YWxsKVxuICBzdGFnZS5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcblxuICAvLyBkYXNoYm9hcmQgZGlzcGxheWluZyB0cmFuY2UgbGV2ZWwgYW5kIG5vaXNlIGxldmVsXG4gIGRhc2hib2FyZF9iZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTQxNjcwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgMTIwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfYmcueCA9IDIwMFxuICBkYXNoYm9hcmRfYmcueSA9IDMwXG4gIHN0YWdlLmFkZENoaWxkKGRhc2hib2FyZF9iZylcblxuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuICBzdGFnZS5hZGRDaGlsZChkYXNoYm9hcmRfZmcpXG5cbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB0cmFuY2VsYWJlbC54ID0gMjI1XG4gIHRyYW5jZWxhYmVsLnkgPSA3NVxuICB0cmFuY2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgc3RhZ2UuYWRkQ2hpbGQodHJhbmNlbGFiZWwpXG5cbiAgbm9pc2VsYWJlbC54ID0gMjI1XG4gIG5vaXNlbGFiZWwueSA9IDExNVxuICBub2lzZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuICBzdGFnZS5hZGRDaGlsZChub2lzZWxhYmVsKVxuXG4gIC8vIG1ldHJpY3MgbnVtYmVyc1xuICB0cmFuY2VsZXZlbHRleHQueCA9IDM2MFxuICB0cmFuY2VsZXZlbHRleHQueSA9IDc1XG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgc3RhZ2UuYWRkQ2hpbGQodHJhbmNlbGV2ZWx0ZXh0KVxuXG4gIG5vaXNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgbm9pc2VsZXZlbHRleHQueSA9IDExNVxuICBub2lzZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgc3RhZ2UuYWRkQ2hpbGQobm9pc2VsZXZlbHRleHQpXG5cbiAgLy8gdHJhbmNlIHRhYmxlIVxuICB0cmFuY2V0YWJsZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjYmRmMmUyXCIpLmRyYXdSZWN0KDAsIDAsIDI1MCwgMTIwKVxuICB0cmFuY2V0YWJsZS54ID0gMjc1XG4gIHRyYW5jZXRhYmxlLnkgPSAyNTBcbiAgc3RhZ2UuYWRkQ2hpbGQodHJhbmNldGFibGUpXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuXG4gIC8vIGNyZWF0ZSBhIGdyZXkgY2lyY2xlIC0gd29sZiFcbiAgZ3JleWNpcmNsZS5ncmFwaGljcy5iZWdpbkZpbGwoJ2dyZXknKS5kcmF3Q2lyY2xlKDAsIDAsIDQwKVxuICBncmV5Y2lyY2xlLnggPSBjYW52YXMud2lkdGggLSAxMDBcbiAgZ3JleWNpcmNsZS55ID0gY2FudmFzLmhlaWdodCAtIDEwMFxuICBzdGFnZS5hZGRDaGlsZChncmV5Y2lyY2xlKVxuXG4gIC8vIHdvbGYgdGV4dFxuICB3b2xmbGFiZWwueCA9IGNhbnZhcy53aWR0aCAtIDEyMDtcbiAgd29sZmxhYmVsLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xuICB3b2xmbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHdvbGZsYWJlbClcbiAgLy8gc3RhZ2Uuc2V0Q2hpbGRJbmRleCh3b2xmbGFiZWwsIDQpXG5cbiAgLy8gVXBkYXRlIHN0YWdlIHdpbGwgcmVuZGVyIG5leHQgZnJhbWVcbiAgc3RhZ2UudXBkYXRlKClcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn0iXSwic291cmNlUm9vdCI6IiJ9