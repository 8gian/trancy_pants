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
    // dashboard displaying trance level and noise level
    var dashboard_bg = new createjs.Shape();
    dashboard_bg.graphics.beginFill("#141670").drawRect(0, 0, 400, 100);
    dashboard_bg.x = 200;
    dashboard_bg.y = 50;
    stage.addChild(dashboard_bg);
    stage.setChildIndex(dashboard_bg, 0);
    // trance table!
    // person on trance table!
    // create a grey circle - wolf!
    let greycircle = new createjs.Shape();
    greycircle.graphics.beginFill('grey').drawCircle(0, 0, 60);
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
    // create a background rectangle
    var outerwall = new createjs.Shape();
    outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.addChild(outerwall);
    stage.setChildIndex(outerwall, 0);
    var innerwall = new createjs.Shape();
    innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, stage.canvas.width - 30, stage.canvas.height - 30);
    stage.addChild(innerwall);
    stage.setChildIndex(innerwall, 1);
    // Update stage will render next frame
    stage.update();
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsSUFBSSxNQUF3QjtBQUU1QixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixvREFBb0Q7SUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUM1QyxNQUFNLEdBQXNCLEtBQUssQ0FBQyxNQUFNO0lBQ3hDLCtCQUErQjtJQUMvQixvQ0FBb0M7SUFDcEMsd0RBQXdEO0lBQ3hELGtDQUFrQztJQUNsQyw0QkFBNEI7SUFDNUIsNENBQTRDO0lBQzVDLHlCQUF5QjtJQUV6QixvREFBb0Q7SUFDcEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNuRSxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUc7SUFDcEIsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ25CLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQzVCLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUVwQyxnQkFBZ0I7SUFHaEIsMEJBQTBCO0lBRzFCLCtCQUErQjtJQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzFELFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHO0lBQ2pDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBRTFCLFlBQVk7SUFDWixJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRSxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2pDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDbEMsU0FBUyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDdEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDekIsb0NBQW9DO0lBRXBDLGdDQUFnQztJQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBc0IsS0FBSyxDQUFDLE1BQU8sQ0FBQyxLQUFLLEVBQXNCLEtBQUssQ0FBQyxNQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3pJLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUVqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBc0IsS0FBSyxDQUFDLE1BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFzQixLQUFLLENBQUMsTUFBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckosS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDekIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRWpDLHNDQUFzQztJQUN0QyxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2hCLENBQUMiLCJmaWxlIjoiYnVpbGRcXGJ1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJsZXQgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIC8vIGNyZWF0ZSBhIFN0YWdlIGJ5IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gYSBjYW52YXNcbiAgbGV0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICAvLyBjcmVhdGUgYSBTaGFwZSBEaXNwbGF5T2JqZWN0XG4gIC8vIGxldCBjaXJjbGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAvLyBjaXJjbGUuZ3JhcGhpY3MuYmVnaW5GaWxsKCdyZWQnKS5kcmF3Q2lyY2xlKDAsIDAsIDQwKVxuICAvLyBTZXQgcG9zaXRpb24gb2YgU2hhcGUgaW5zdGFuY2UuXG4gIC8vIGNpcmNsZS54ID0gY2lyY2xlLnkgPSAxNTBcbiAgLy8gQWRkIFNoYXBlIGluc3RhbmNlIHRvIHN0YWdlIGRpc3BsYXkgbGlzdC5cbiAgLy8gc3RhZ2UuYWRkQ2hpbGQoY2lyY2xlKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgdmFyIGRhc2hib2FyZF9iZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3UmVjdCgwLCAwLCA0MDAsIDEwMClcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSA1MFxuICBzdGFnZS5hZGRDaGlsZChkYXNoYm9hcmRfYmcpXG4gIHN0YWdlLnNldENoaWxkSW5kZXgoZGFzaGJvYXJkX2JnLCAwKVxuXG4gIC8vIHRyYW5jZSB0YWJsZSFcblxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG4gIFxuXG4gIC8vIGNyZWF0ZSBhIGdyZXkgY2lyY2xlIC0gd29sZiFcbiAgbGV0IGdyZXljaXJjbGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICBncmV5Y2lyY2xlLmdyYXBoaWNzLmJlZ2luRmlsbCgnZ3JleScpLmRyYXdDaXJjbGUoMCwgMCwgNjApXG4gIGdyZXljaXJjbGUueCA9IGNhbnZhcy53aWR0aCAtIDEwMFxuICBncmV5Y2lyY2xlLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG4gIHN0YWdlLmFkZENoaWxkKGdyZXljaXJjbGUpXG5cbiAgLy8gd29sZiB0ZXh0XG4gIHZhciB3b2xmbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIldvbGZcIiwgXCIyMHB4IEFyaWFsXCIsIFwiIzMwMmEzNlwiKTtcbiAgd29sZmxhYmVsLnggPSBjYW52YXMud2lkdGggLSAxMjA7XG4gIHdvbGZsYWJlbC55ID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbiAgd29sZmxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuICBzdGFnZS5hZGRDaGlsZCh3b2xmbGFiZWwpXG4gIC8vIHN0YWdlLnNldENoaWxkSW5kZXgod29sZmxhYmVsLCA0KVxuXG4gIC8vIGNyZWF0ZSBhIGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gIHZhciBvdXRlcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgKDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXMpLndpZHRoLCAoPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhcykuaGVpZ2h0KVxuICBzdGFnZS5hZGRDaGlsZChvdXRlcndhbGwpXG4gIHN0YWdlLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuIFxuICB2YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgKDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXMpLndpZHRoIC0gMzAsICg8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzKS5oZWlnaHQgLSAzMClcbiAgc3RhZ2UuYWRkQ2hpbGQoaW5uZXJ3YWxsKVxuICBzdGFnZS5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxufSJdLCJzb3VyY2VSb290IjoiIn0=