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

let canvas;
window.onload = () => {
    // create a Stage by getting a reference to a canvas
    let stage = new createjs.Stage('demoCanvas');
    canvas = stage.canvas;
    // create a Shape DisplayObject
    // let circle = new createjs.Shape()
    // circle.graphics.beginFill('red').drawCircle(0, 0, 40)
    // Set position of Shape instance.
    // circle.x = circle.y = 150
    // Add Shape instance to stage display list.
    // stage.addChild(circle)
    // create a background rectangle
    var outerwall = new createjs.Shape();
    outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height);
    stage.addChild(outerwall);
    stage.setChildIndex(outerwall, 0);
    // create the inner rectangle for the "floor" of the cabin
    var innerwall = new createjs.Shape();
    innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30);
    stage.addChild(innerwall);
    stage.setChildIndex(innerwall, 1);
    // dashboard displaying trance level and noise level
    var dashboard_bg = new createjs.Shape();
    dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5);
    dashboard_bg.x = 200;
    dashboard_bg.y = 30;
    stage.addChild(dashboard_bg);
    var dashboard_fg = new createjs.Shape();
    dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5);
    dashboard_fg.x = 210;
    dashboard_fg.y = 40;
    stage.addChild(dashboard_fg);
    // metrics text labels
    var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
    trancelabel.x = 225;
    trancelabel.y = 75;
    trancelabel.textBaseline = "alphabetic";
    stage.addChild(trancelabel);
    var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
    noiselabel.x = 225;
    noiselabel.y = 115;
    noiselabel.textBaseline = "alphabetic";
    stage.addChild(noiselabel);
    // metrics numbers
    var trancelevel = new createjs.Text("#", "20px Arial", "#bdbef2");
    trancelevel.x = 360;
    trancelevel.y = 75;
    trancelevel.textBaseline = "alphabetic";
    stage.addChild(trancelevel);
    var noiselevel = new createjs.Text("#", "20px Arial", "#bdbef2");
    noiselevel.x = 360;
    noiselevel.y = 115;
    noiselevel.textBaseline = "alphabetic";
    stage.addChild(noiselevel);
    // trance table!
    var trancetable = new createjs.Shape();
    trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120);
    trancetable.x = 275;
    trancetable.y = 250;
    stage.addChild(trancetable);
    // person on trance table!
    // create a grey circle - wolf!
    let greycircle = new createjs.Shape();
    greycircle.graphics.beginFill('grey').drawCircle(0, 0, 40);
    greycircle.x = canvas.width - 100;
    greycircle.y = canvas.height - 100;
    stage.addChild(greycircle);
    // wolf text
    var wolflabel = new createjs.Text("Wolf", "20px Arial", "#302a36");
    wolflabel.x = canvas.width - 120;
    wolflabel.y = canvas.height - 100;
    wolflabel.textBaseline = "alphabetic";
    stage.addChild(wolflabel);
    // stage.setChildIndex(wolflabel, 4)
    // Update stage will render next frame
    stage.update();
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSSxNQUF3QjtBQUU1QixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixvREFBb0Q7SUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUM1QyxNQUFNLEdBQXNCLEtBQUssQ0FBQyxNQUFNO0lBQ3hDLCtCQUErQjtJQUMvQixvQ0FBb0M7SUFDcEMsd0RBQXdEO0lBQ3hELGtDQUFrQztJQUNsQyw0QkFBNEI7SUFDNUIsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUV6QixnQ0FBZ0M7SUFDaEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFF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LENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ2xDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3pCLG9DQUFvQztJQUlwQyxzQ0FBc0M7SUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNoQixDQUFDIiwiZmlsZSI6ImJ1aWxkXFxidW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwibGV0IGNhbnZhczpIVE1MQ2FudmFzRWxlbWVudFxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAvLyBjcmVhdGUgYSBTdGFnZSBieSBnZXR0aW5nIGEgcmVmZXJlbmNlIHRvIGEgY2FudmFzXG4gIGxldCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgLy8gY3JlYXRlIGEgU2hhcGUgRGlzcGxheU9iamVjdFxuICAvLyBsZXQgY2lyY2xlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgLy8gY2lyY2xlLmdyYXBoaWNzLmJlZ2luRmlsbCgncmVkJykuZHJhd0NpcmNsZSgwLCAwLCA0MClcbiAgLy8gU2V0IHBvc2l0aW9uIG9mIFNoYXBlIGluc3RhbmNlLlxuICAvLyBjaXJjbGUueCA9IGNpcmNsZS55ID0gMTUwXG4gIC8vIEFkZCBTaGFwZSBpbnN0YW5jZSB0byBzdGFnZSBkaXNwbGF5IGxpc3QuXG4gIC8vIHN0YWdlLmFkZENoaWxkKGNpcmNsZSlcblxuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICB2YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIG91dGVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNGQxYzIwXCIpLmRyYXdSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcbiAgc3RhZ2UuYWRkQ2hpbGQob3V0ZXJ3YWxsKVxuICBzdGFnZS5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiBcbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIHZhciBpbm5lcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgaW5uZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM3ZTZhOTRcIikuZHJhd1JlY3QoMTUsIDE1LCBjYW52YXMud2lkdGggLSAzMCwgY2FudmFzLmhlaWdodCAtIDMwKVxuICBzdGFnZS5hZGRDaGlsZChpbm5lcndhbGwpXG4gIHN0YWdlLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgdmFyIGRhc2hib2FyZF9iZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuICBzdGFnZS5hZGRDaGlsZChkYXNoYm9hcmRfYmcpXG5cbiAgdmFyIGRhc2hib2FyZF9mZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuICBzdGFnZS5hZGRDaGlsZChkYXNoYm9hcmRfZmcpXG5cbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB2YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbiAgdHJhbmNlbGFiZWwueCA9IDIyNVxuICB0cmFuY2VsYWJlbC55ID0gNzVcbiAgdHJhbmNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHRyYW5jZWxhYmVsKVxuXG4gIHZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbiAgbm9pc2VsYWJlbC54ID0gMjI1XG4gIG5vaXNlbGFiZWwueSA9IDExNVxuICBub2lzZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuICBzdGFnZS5hZGRDaGlsZChub2lzZWxhYmVsKVxuXG4gIC8vIG1ldHJpY3MgbnVtYmVyc1xuICB2YXIgdHJhbmNlbGV2ZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbiAgdHJhbmNlbGV2ZWwueCA9IDM2MFxuICB0cmFuY2VsZXZlbC55ID0gNzVcbiAgdHJhbmNlbGV2ZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHRyYW5jZWxldmVsKVxuXG4gIHZhciBub2lzZWxldmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG4gIG5vaXNlbGV2ZWwueCA9IDM2MFxuICBub2lzZWxldmVsLnkgPSAxMTVcbiAgbm9pc2VsZXZlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgc3RhZ2UuYWRkQ2hpbGQobm9pc2VsZXZlbClcblxuICAvLyB0cmFuY2UgdGFibGUhXG4gIHZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICB0cmFuY2V0YWJsZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjYmRmMmUyXCIpLmRyYXdSZWN0KDAsIDAsIDI1MCwgMTIwKVxuICB0cmFuY2V0YWJsZS54ID0gMjc1XG4gIHRyYW5jZXRhYmxlLnkgPSAyNTBcbiAgc3RhZ2UuYWRkQ2hpbGQodHJhbmNldGFibGUpXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcbiAgXG5cbiAgLy8gY3JlYXRlIGEgZ3JleSBjaXJjbGUgLSB3b2xmIVxuICBsZXQgZ3JleWNpcmNsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gIGdyZXljaXJjbGUuZ3JhcGhpY3MuYmVnaW5GaWxsKCdncmV5JykuZHJhd0NpcmNsZSgwLCAwLCA0MClcbiAgZ3JleWNpcmNsZS54ID0gY2FudmFzLndpZHRoIC0gMTAwXG4gIGdyZXljaXJjbGUueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgc3RhZ2UuYWRkQ2hpbGQoZ3JleWNpcmNsZSlcblxuICAvLyB3b2xmIHRleHRcbiAgdmFyIHdvbGZsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiV29sZlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjMzAyYTM2XCIpO1xuICB3b2xmbGFiZWwueCA9IGNhbnZhcy53aWR0aCAtIDEyMDtcbiAgd29sZmxhYmVsLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwO1xuICB3b2xmbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHN0YWdlLmFkZENoaWxkKHdvbGZsYWJlbClcbiAgLy8gc3RhZ2Uuc2V0Q2hpbGRJbmRleCh3b2xmbGFiZWwsIDQpXG5cblxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG59Il0sInNvdXJjZVJvb3QiOiIifQ==