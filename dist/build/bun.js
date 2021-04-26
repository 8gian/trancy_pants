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
var gameContainer = new createjs.Container();
var outerwall = new createjs.Shape();
var innerwall = new createjs.Shape();
var dashboard_bg = new createjs.Shape();
var dashboard_fg = new createjs.Shape();
var titleText1 = new createjs.Text("You are the famous Dr. Trancy Pants, M.D.", "30px Arial", "#fffdfa");
var titleText2 = new createjs.Text("With your help, budding magicians can advance\ntheir studies by entering a deep trance.", "30px Arial", "#fffdfa");
var titleText3 = new createjs.Text("Keep your cabin quiet. If it gets too loud you'll\nwake the magician.", "30px Arial", "#fffdfa");
var titleText4 = new createjs.Text("Don't forget to wake them up at the end,\nor they'll sleep forever.", "30px Arial", "#fffdfa");
var titleText5 = new createjs.Text("Click to begin!", "30px Arial", "#fffdfa");
var tt1bg = new createjs.Shape();
var tt4bg = new createjs.Shape();
var tt5bg = new createjs.Shape();
var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
var youWonText = new createjs.Text("You won!", "20px Arial", "#bdbef2");
var youLostText = new createjs.Text("You lost!", "20px Arial", "#bdbef2");
var tranceleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var noiseleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var trancetable = new createjs.Shape();
var tranceRate = 0.0003;
var walkSpeed = 40 / 1000;
var queue = new createjs.LoadQueue(false);
var player;
var wolfBitmap;
var chairBitmap;
var tvBitmap;
function getObjectBounds() {
    return [chairBitmap.getTransformedBounds(), trancetable.getTransformedBounds(), dashboard_bg.getTransformedBounds()];
}
function cropBounds(bounds, horiz, vert) {
    return new createjs.Rectangle(bounds.x + horiz, bounds.y + vert, bounds.width - 2 * horiz, bounds.height - 2 * vert);
}
function boundsCollide(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) {
        if (obj1.y + obj2.height > obj2.y && obj1.y < obj2.y + obj2.height) {
            return true;
        }
    }
    return false;
}
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
const Tv = new Noise(3, 0, "tvnoise");
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
        this.maxDistressLevel = 3;
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
        this.onWolf = false;
        this.onTv = false;
        this.timeOnTv = 0;
        this.sprite = sprite;
        this.x = startX;
        this.y = startY;
        this.width = width;
        this.height = height;
        this.sprite.x = this.x;
        this.sprite.x = this.y;
    }
    getBounds() {
        return cropBounds(new createjs.Rectangle(this.x, this.y, this.width, this.height), 15, 10);
    }
    update(time) {
        let lastX = this.x;
        let lastY = this.y;
        let horiz = 0;
        let vert = 0;
        if (this.walkingLeft) {
            horiz -= 1;
        }
        if (this.walkingRight) {
            horiz += 1;
        }
        if (this.walkingDown) {
            vert += 1;
        }
        if (this.walkingUp) {
            vert -= 1;
        }
        if (Math.abs(vert) > 0 || Math.abs(horiz) > 0) {
            this.moving = true;
            this.sprite.gotoAndPlay("run");
        }
        else {
            this.moving = false;
            this.sprite.gotoAndStop(0);
        }
        let speed = this.moving ? (1 / Math.sqrt(Math.pow(horiz, 2) + Math.pow(vert, 2))) * walkSpeed : 0;
        this.x += horiz * speed * (time - lastTickTime);
        this.y += vert * speed * (time - lastTickTime);
        if (this.moving) {
            walkingNoise.active = true;
        }
        else {
            walkingNoise.active = false;
        }
        this.x = Math.max(0, Math.min(this.x, canvas.width - 15 - this.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height - 15 - this.height));
        if (this.ejectSpriteFromObjects()) {
            this.x = lastX;
            this.y = lastY;
        }
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        if (this.onTv) {
            this.timeOnTv += time - lastTickTime;
        }
        else {
            this.timeOnTv = 0;
        }
        this.performInteractions();
        if (this.onTv && this.timeOnTv > 3000) {
            wolfNoise.active = true;
        }
    }
    ejectSpriteFromObjects() {
        const bounds = this.getBounds();
        const objects = getObjectBounds();
        for (var i in objects) {
            if (boundsCollide(bounds, objects[i])) {
                if (i == "0") {
                    console.log("hit chair");
                }
                else if (i == "1") {
                    console.log("hit table");
                }
                else if (i == "2") {
                    console.log("hit dashboard");
                }
                console.log("bounds " + objects[i]);
                return true;
            }
        }
        return false;
    }
    performInteractions() {
        var newOnWolf = boundsCollide(this.getBounds(), wolfBitmap.getTransformedBounds());
        var newOnTv = boundsCollide(this.getBounds(), tvBitmap.getTransformedBounds());
        if (newOnTv && !this.onTv) {
            TvNoise.active = !TvNoise.active;
        }
        if (newOnWolf && this.onWolf) {
            wolfNoise.active = false;
            setTimeout(() => { TvNoise.active = true; }, 4000);
        }
        this.onWolf = newOnWolf;
        this.onTv = newOnTv;
    }
}
let wolfNoise = new WolfNoise(Wolf, 2000, 4000);
var logIt = 0;
function gameLoop(event) {
    let time = createjs.Ticker.getTime();
    // let timeLeftover = time % 50;
    // time -= timeLeftover;
    var deltaTime = time - lastTickTime;
    if (tranceLevel < 10) {
        updateTranceLevel(deltaTime);
    }
    player.update(time);
    updateNoiseLevel(time);
    if (tranceLevel >= 10) {
        tranceLevel = 10;
        if (noiseLevel >= 10) {
            playYouWonScene();
        }
    }
    else if (noiseLevel >= 10) {
        playYouLostScene();
    }
    if (tranceLevel < 0) {
        playYouLostScene();
    }
    // end of variable updates, only displays below
    var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100);
    if (logIt % 14 == 0) {
        // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    stage.update();
    lastTickTime = time;
}
function updateNoiseLevel(time) {
    noiseLevel = 0;
    wolfNoise.tick(time);
    noiseLevel += walkingNoise.getActiveNoiseLevel(time) + TvNoise.getActiveNoiseLevel(time) + wolfNoise.getActiveNoiseLevel(time);
    if (noiseLevel > lastNoiseLevel) {
        if (noiseLevel >= 5) {
            if (tranceLevel < 10) {
                tranceLevel -= (noiseLevel - 5);
                tranceLevel = Math.floor(tranceLevel);
            }
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
    stage.addChild(cabinBitmap);
    tt1bg.graphics.beginFill("#406e20").drawRoundRectComplex(0, 0, 660, 230, 10, 10, 10, 10);
    tt1bg.x = 95;
    tt1bg.y = 60;
    tt4bg.graphics.beginFill("#406e20").drawRoundRectComplex(0, 0, 560, 95, 10, 10, 10, 10);
    tt4bg.x = 195;
    tt4bg.y = 360;
    tt5bg.graphics.beginFill("#69b535").drawRoundRectComplex(0, 0, 240, 75, 10, 10, 10, 10);
    tt5bg.x = 515;
    tt5bg.y = 485;
    // intro game text (text declared at the top)
    titleText1.x = 110;
    titleText1.y = 100;
    titleText1.textBaseline = "alphabetic";
    titleText2.x = 110;
    titleText2.y = 150;
    titleText2.textBaseline = "alphabetic";
    titleText3.x = 110;
    titleText3.y = 230;
    titleText3.textBaseline = "alphabetic";
    titleText4.x = 210;
    titleText4.y = 400;
    titleText4.textBaseline = "alphabetic";
    titleText5.x = 540;
    titleText5.y = 530;
    titleText5.textBaseline = "alphabetic";
    //  wait a half second for the cabin image to load before updating the stage
    setTimeout(function () {
        stage.update();
    }, 500);
    setTimeout(function () {
        stage.addChild(tt1bg, titleText1);
        stage.update();
    }, 1000);
    setTimeout(function () {
        stage.addChild(titleText2);
        stage.update();
    }, 2500);
    setTimeout(function () {
        stage.addChild(titleText3);
        stage.update();
    }, 4000);
    setTimeout(function () {
        stage.addChild(tt4bg, titleText4);
        stage.update();
    }, 6500);
    setTimeout(function () {
        stage.addChild(tt5bg, titleText5);
        stage.update();
        canvas.onclick = () => {
            canvas.onclick = null;
            playGameScene();
        };
    }, 7500);
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
        else if (keyEvent.type == "keyup") {
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
    dashboard_bg.setBounds(0, 0, 400, 120);
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
    trancetable.setBounds(0, 0, 250, 120);
    // person on trance table!
    // wolf image
    wolfBitmap = new createjs.Bitmap(queue.getResult("wolfimage"));
    wolfBitmap.x = canvas.width - 150;
    wolfBitmap.y = canvas.height - 100;
    wolfBitmap.scaleX = wolfBitmap.scaleY = .2;
    wolfNoise.active = true;
    // tv
    tvBitmap = new createjs.Bitmap(queue.getResult("tvimage"));
    tvBitmap.x = 40;
    tvBitmap.y = 140;
    tvBitmap.scaleX = tvBitmap.scaleY = 1.5;
    // chair
    chairBitmap = new createjs.Bitmap(queue.getResult("chairimage"));
    chairBitmap.x = 100;
    chairBitmap.y = 170;
    chairBitmap.scaleX = chairBitmap.scaleY = .35;
    var playerSpriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("spritesheetimage")],
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
        { id: "tvimage", src: "res/tvimage.png" },
        { id: "spritesheetimage", src: "res/player-spritemap-v9-redpants.png" },
        { id: "chairimage", src: "res/chair.png" },
        { id: "wolfimage", src: "res/wolf.png" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDeEcsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHlGQUF5RixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDdEosSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHVFQUF1RSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDcEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHFFQUFxRSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDbEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMvRSxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMs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QUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFO0tBQ3pDLENBQUM7QUFDSixDQUFDO0FBekJELGdDQXlCQyIsImZpbGUiOiJidWlsZFxcYnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2FtZS50c1wiKTtcbiIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuaW1wb3J0IHsgbG9hZFNvdW5kcyB9IGZyb20gXCIuL3NvdW5kXCJcbmxldCBjaXJjbGU6IGNyZWF0ZWpzLlNoYXBlXG5sZXQgc3RhZ2U6IGNyZWF0ZWpzLlN0YWdlXG5sZXQgVHZOb2lzZTogUGxheWVyTm9pc2VcbmxldCB3YWxraW5nTm9pc2U6IFBsYXllck5vaXNlXG5sZXQgdHJhbmNlTGV2ZWwgPSAwXG5sZXQgbm9pc2VMZXZlbCA9IDBcbmxldCBsYXN0Tm9pc2VMZXZlbCA9IDBcbmxldCBsYXN0VGlja1RpbWUgPSAwXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxudmFyIGdhbWVDb250YWluZXIgPSBuZXcgY3JlYXRlanMuQ29udGFpbmVyKClcbnZhciBvdXRlcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBpbm5lcndhbGwgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciBkYXNoYm9hcmRfZmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0aXRsZVRleHQxID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3UgYXJlIHRoZSBmYW1vdXMgRHIuIFRyYW5jeSBQYW50cywgTS5ELlwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0MiA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiV2l0aCB5b3VyIGhlbHAsIGJ1ZGRpbmcgbWFnaWNpYW5zIGNhbiBhZHZhbmNlXFxudGhlaXIgc3R1ZGllcyBieSBlbnRlcmluZyBhIGRlZXAgdHJhbmNlLlwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0MyA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiS2VlcCB5b3VyIGNhYmluIHF1aWV0LiBJZiBpdCBnZXRzIHRvbyBsb3VkIHlvdSdsbFxcbndha2UgdGhlIG1hZ2ljaWFuLlwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0NCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiRG9uJ3QgZm9yZ2V0IHRvIHdha2UgdGhlbSB1cCBhdCB0aGUgZW5kLFxcbm9yIHRoZXknbGwgc2xlZXAgZm9yZXZlci5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDUgPSBuZXcgY3JlYXRlanMuVGV4dChcIkNsaWNrIHRvIGJlZ2luIVwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpO1xudmFyIHR0MWJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHQ0YmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0dDViZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJUcmFuY2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiTm9pc2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91V29uVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IHdvbiFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VMb3N0VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGxvc3QhXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZVJhdGU6IG51bWJlciA9IDAuMDAwM1xudmFyIHdhbGtTcGVlZDogbnVtYmVyID0gNDAgLyAxMDAwXG52YXIgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKTtcbnZhciBwbGF5ZXI6IFBsYXllclxudmFyIHdvbGZCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIGNoYWlyQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciB0dkJpdG1hcDogY3JlYXRlanMuQml0bWFwXG5cbmZ1bmN0aW9uIGdldE9iamVjdEJvdW5kcygpIHtcbiAgcmV0dXJuIFtjaGFpckJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCB0cmFuY2V0YWJsZS5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCBkYXNoYm9hcmRfYmcuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKV1cbn1cbmZ1bmN0aW9uIGNyb3BCb3VuZHMoYm91bmRzOiBjcmVhdGVqcy5SZWN0YW5nbGUsIGhvcml6OiBudW1iZXIsIHZlcnQ6IG51bWJlcikge1xuICByZXR1cm4gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZShib3VuZHMueCArIGhvcml6LCBib3VuZHMueSArIHZlcnQsIGJvdW5kcy53aWR0aCAtIDIgKiBob3JpeiwgYm91bmRzLmhlaWdodCAtIDIgKiB2ZXJ0KVxufVxuXG5mdW5jdGlvbiBib3VuZHNDb2xsaWRlKG9iajE6IGNyZWF0ZWpzLlJlY3RhbmdsZSwgb2JqMjogY3JlYXRlanMuUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gIGlmIChvYmoxLnggKyBvYmoxLndpZHRoID4gb2JqMi54ICYmIG9iajEueCA8IG9iajIueCArIG9iajIud2lkdGgpIHtcbiAgICBpZiAob2JqMS55ICsgb2JqMi5oZWlnaHQgPiBvYmoyLnkgJiYgb2JqMS55IDwgb2JqMi55ICsgb2JqMi5oZWlnaHQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5jbGFzcyBOb2lzZSB7XG4gIG5vaXNlTGV2ZWw6IG51bWJlclxuICBkdXJhdGlvbk1zOiBudW1iZXJcbiAgc291bmQ6IHN0cmluZ1xuICBjb25zdHJ1Y3Rvcihub2lzZUxldmVsOiBudW1iZXIsIGR1cmF0aW9uTVM6IG51bWJlciwgc291bmQ6IHN0cmluZykge1xuICAgIHRoaXMubm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbiAgICB0aGlzLmR1cmF0aW9uTXMgPSBkdXJhdGlvbk1TXG4gICAgdGhpcy5zb3VuZCA9IHNvdW5kXG4gIH1cbn1cblxuY29uc3QgV29sZiA9IG5ldyBOb2lzZSgzLCAyMDAwLCBcIndvbGZcIilcbmNvbnN0IE91dHNpZGVXaW5kb3cgPSBuZXcgTm9pc2UoMiwgMTAwMCwgXCJvdXRzaWRlXCIpXG5jb25zdCBXYWxraW5nID0gbmV3IE5vaXNlKDEsIDEwMDAsIFwid2Fsa2luZ1wiKVxuY29uc3QgVHYgPSBuZXcgTm9pc2UoMywgMCwgXCJ0dm5vaXNlXCIpXG5cbmNsYXNzIFRpbWVkTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgKHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zKSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFdvbGZOb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBkaXN0cmVzc0xldmVsOiBudW1iZXIgPSAwXG4gIHN0YXJ0RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBtYXhEaXN0cmVzc0xldmVsOiBudW1iZXIgPSAzXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIHJlcGVhdEFmdGVyOiBudW1iZXJcbiAgaW5pdGlhbFN0YXJ0VGltZTogbnVtYmVyXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgZW5kVGltZTogbnVtYmVyXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlciwgcmVwZWF0QWZ0ZXI6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnJlcGVhdEFmdGVyID0gcmVwZWF0QWZ0ZXJcbiAgICB0aGlzLmVuZFRpbWUgPSBzdGFydFRpbWUgKyBuLmR1cmF0aW9uTXNcbiAgICB0aGlzLmluaXRpYWxTdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuZGlzdHJlc3NMZXZlbCA9IHRoaXMuc3RhcnREaXN0cmVzc0xldmVsXG4gICAgICBpZiAodGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuc291bmRJbnN0YW5jZSEubXV0ZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgdGhpcy5zdGFydFRpbWUgPSAwXG4gICAgICB0aGlzLmVuZFRpbWUgPSAwXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMuYWN0aXZlICYmICF0aGlzLnN0YXJ0VGltZSkge1xuICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5pbml0aWFsU3RhcnRUaW1lXG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3VuZEluc3RhbmNlICYmIHRpbWUgPj0gdGhpcy5lbmRUaW1lKSB7XG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgICBpZiAodGhpcy5yZXBlYXRBZnRlcikge1xuICAgICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSBNYXRoLm1pbih0aGlzLmRpc3RyZXNzTGV2ZWwgKyAxLCB0aGlzLm1heERpc3RyZXNzTGV2ZWwpXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lICs9IHRoaXMubm9pc2UuZHVyYXRpb25NcyArIHRoaXMucmVwZWF0QWZ0ZXJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9ICh0aGlzLmRpc3RyZXNzTGV2ZWwgKyAxKSAvICh0aGlzLm1heERpc3RyZXNzTGV2ZWwgKyAxKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiB0aW1lIDwgdGhpcy5lbmRUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWwgKyB0aGlzLmRpc3RyZXNzTGV2ZWxcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBQbGF5ZXJOb2lzZSB7XG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlOiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2VcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgY29uc3RydWN0b3IobjogTm9pc2UpIHtcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZCwgeyBsb29wOiAtMSwgdm9sdW1lOiAwIH0pXG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9IDFcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9IDBcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG59XG5cbmNsYXNzIFBsYXllciB7XG4gIHNwcml0ZTogY3JlYXRlanMuU3ByaXRlXG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICB3YWxraW5nTGVmdDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nUmlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1VwOiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdEb3duOiBib29sZWFuID0gZmFsc2U7XG4gIG1vdmluZzogYm9vbGVhbiA9IGZhbHNlXG4gIG9uV29sZjogYm9vbGVhbiA9IGZhbHNlXG4gIG9uVHY6IGJvb2xlYW4gPSBmYWxzZVxuICB0aW1lT25UdjogbnVtYmVyID0gMFxuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZTogY3JlYXRlanMuU3ByaXRlLCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcbiAgICB0aGlzLnggPSBzdGFydFhcbiAgICB0aGlzLnkgPSBzdGFydFlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy55XG4gIH1cbiAgZ2V0Qm91bmRzKCk6IGNyZWF0ZWpzLlJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIGNyb3BCb3VuZHMobmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLCAxNSwgMTApXG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgbGV0IGxhc3RYID0gdGhpcy54XG4gICAgbGV0IGxhc3RZID0gdGhpcy55XG4gICAgbGV0IGhvcml6ID0gMFxuICAgIGxldCB2ZXJ0ID0gMFxuICAgIGlmICh0aGlzLndhbGtpbmdMZWZ0KSB7XG4gICAgICBob3JpeiAtPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdSaWdodCkge1xuICAgICAgaG9yaXogKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nRG93bikge1xuICAgICAgdmVydCArPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdVcCkge1xuICAgICAgdmVydCAtPSAxXG4gICAgfVxuICAgIGlmIChNYXRoLmFicyh2ZXJ0KSA+IDAgfHwgTWF0aC5hYnMoaG9yaXopID4gMCkge1xuICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kU3RvcCgwKVxuICAgIH1cbiAgICBsZXQgc3BlZWQgPSB0aGlzLm1vdmluZyA/ICgxIC8gTWF0aC5zcXJ0KE1hdGgucG93KGhvcml6LCAyKSArIE1hdGgucG93KHZlcnQsIDIpKSkgKiB3YWxrU3BlZWQgOiAwXG4gICAgdGhpcy54ICs9IGhvcml6ICogc3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB0aGlzLnkgKz0gdmVydCAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG5cbiAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLngsIGNhbnZhcy53aWR0aCAtIDE1IC0gdGhpcy53aWR0aCkpXG4gICAgdGhpcy55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy55LCBjYW52YXMuaGVpZ2h0IC0gMTUgLSB0aGlzLmhlaWdodCkpXG4gICAgaWYgKHRoaXMuZWplY3RTcHJpdGVGcm9tT2JqZWN0cygpKSB7XG4gICAgICB0aGlzLnggPSBsYXN0WFxuICAgICAgdGhpcy55ID0gbGFzdFlcbiAgICB9XG5cbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueSA9IHRoaXMueVxuICAgIGlmICh0aGlzLm9uVHYpIHtcbiAgICAgIHRoaXMudGltZU9uVHYgKz0gdGltZSAtIGxhc3RUaWNrVGltZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVPblR2ID0gMFxuICAgIH1cbiAgICB0aGlzLnBlcmZvcm1JbnRlcmFjdGlvbnMoKVxuICAgIGlmICh0aGlzLm9uVHYgJiYgdGhpcy50aW1lT25UdiA+IDMwMDApIHtcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfVxuICB9XG4gIGVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKVxuICAgIGNvbnN0IG9iamVjdHMgPSBnZXRPYmplY3RCb3VuZHMoKVxuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0cykge1xuICAgICAgaWYgKGJvdW5kc0NvbGxpZGUoYm91bmRzLCBvYmplY3RzW2ldKSkge1xuICAgICAgICBpZiAoaSA9PSBcIjBcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGNoYWlyXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjFcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IHRhYmxlXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjJcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGRhc2hib2FyZFwiKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm91bmRzIFwiICsgb2JqZWN0c1tpXSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcGVyZm9ybUludGVyYWN0aW9ucygpIHtcbiAgICB2YXIgbmV3T25Xb2xmID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCB3b2xmQml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCkpXG4gICAgdmFyIG5ld09uVHYgPSBib3VuZHNDb2xsaWRlKHRoaXMuZ2V0Qm91bmRzKCksIHR2Qml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCkpXG4gICAgaWYgKG5ld09uVHYgJiYgIXRoaXMub25Udikge1xuICAgICAgVHZOb2lzZS5hY3RpdmUgPSAhVHZOb2lzZS5hY3RpdmVcbiAgICB9XG4gICAgaWYgKG5ld09uV29sZiAmJiB0aGlzLm9uV29sZikge1xuICAgICAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgVHZOb2lzZS5hY3RpdmUgPSB0cnVlIH0sIDQwMDApXG4gICAgfVxuICAgIHRoaXMub25Xb2xmID0gbmV3T25Xb2xmXG4gICAgdGhpcy5vblR2ID0gbmV3T25UdlxuICB9XG59XG5cbmxldCB3b2xmTm9pc2UgPSBuZXcgV29sZk5vaXNlKFdvbGYsIDIwMDAsIDQwMDApXG52YXIgbG9nSXQgPSAwXG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICAvLyBsZXQgdGltZUxlZnRvdmVyID0gdGltZSAlIDUwO1xuICAvLyB0aW1lIC09IHRpbWVMZWZ0b3ZlcjtcbiAgdmFyIGRlbHRhVGltZTogbnVtYmVyID0gdGltZSAtIGxhc3RUaWNrVGltZVxuXG4gIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB9XG4gIHBsYXllci51cGRhdGUodGltZSlcbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuXG4gIGlmICh0cmFuY2VMZXZlbCA+PSAxMCkge1xuICAgIHRyYW5jZUxldmVsID0gMTBcbiAgICBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgICAgcGxheVlvdVdvblNjZW5lKClcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgIHBsYXlZb3VMb3N0U2NlbmUoKVxuICB9XG4gIGlmICh0cmFuY2VMZXZlbCA8IDApIHtcbiAgICBwbGF5WW91TG9zdFNjZW5lKClcbiAgfVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG4gIHZhciByb3VuZGVkVHJhbmNlTGV2ZWwgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCAqIDEwMCkgLyAxMDApXG4gIGlmIChsb2dJdCAlIDE0ID09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpbWU6IFwiICsgKHRpbWUgLyAxMDAwKSArIFwiLCB0cmFuY2U6IFwiICsgcm91bmRlZFRyYW5jZUxldmVsICsgXCIsIG5vaXNlOiBcIiArIG5vaXNlTGV2ZWwpXG4gIH1cbiAgbG9nSXQrK1xuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgd29sZk5vaXNlLnRpY2sodGltZSlcbiAgbm9pc2VMZXZlbCArPSB3YWxraW5nTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIFR2Tm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIHdvbGZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIGlmIChub2lzZUxldmVsID4gbGFzdE5vaXNlTGV2ZWwpIHtcbiAgICBpZiAobm9pc2VMZXZlbCA+PSA1KSB7XG4gICAgICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgICAgICB0cmFuY2VMZXZlbCAtPSAobm9pc2VMZXZlbCAtIDUpXG4gICAgICAgIHRyYW5jZUxldmVsID0gTWF0aC5mbG9vcih0cmFuY2VMZXZlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGFzdE5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RXZlbnQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVLZXlFdmVudClcbiAgdmFyIHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKHN0YWdlLCB0cnVlKVxuICBsb2FkU291bmRzKHF1ZXVlLCBzdGFydFNjZW5lcywgcHJvZ3Jlc3NCYXIpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2NlbmVzKCkge1xuICBwbGF5SW50cm9TY2VuZSgpXG59XG5cbi8vIGludHJvIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlJbnRyb1NjZW5lKCkge1xuICAvLyBtYWtlIHRoZSBzdGFnZVxuXG4gIC8vIGVsZW1lbnRzIG9mIHRoZSB0aXRsZSBwYWdlXG4gIHZhciBjYWJpbkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiaW50cm9jYWJpblwiKSlcbiAgY2FiaW5CaXRtYXAueCA9IGNhYmluQml0bWFwLnkgPSAwXG4gIGNhYmluQml0bWFwLnNjYWxlWCA9IGNhYmluQml0bWFwLnNjYWxlWSA9IC40NVxuICBzdGFnZS5hZGRDaGlsZChjYWJpbkJpdG1hcClcblxuXG4gIHR0MWJnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0MDZlMjBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNjYwLCAyMzAsIDEwLCAxMCwgMTAsIDEwKVxuICB0dDFiZy54ID0gOTVcbiAgdHQxYmcueSA9IDYwXG5cbiAgdHQ0YmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzQwNmUyMFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA1NjAsIDk1LCAxMCwgMTAsIDEwLCAxMClcbiAgdHQ0YmcueCA9IDE5NVxuICB0dDRiZy55ID0gMzYwXG5cbiAgdHQ1YmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzY5YjUzNVwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAyNDAsIDc1LCAxMCwgMTAsIDEwLCAxMClcbiAgdHQ1YmcueCA9IDUxNVxuICB0dDViZy55ID0gNDg1XG5cbiAgLy8gaW50cm8gZ2FtZSB0ZXh0ICh0ZXh0IGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHRpdGxlVGV4dDEueCA9IDExMFxuICB0aXRsZVRleHQxLnkgPSAxMDBcbiAgdGl0bGVUZXh0MS50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQyLnggPSAxMTBcbiAgdGl0bGVUZXh0Mi55ID0gMTUwXG4gIHRpdGxlVGV4dDIudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0My54ID0gMTEwXG4gIHRpdGxlVGV4dDMueSA9IDIzMFxuICB0aXRsZVRleHQzLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDQueCA9IDIxMFxuICB0aXRsZVRleHQ0LnkgPSA0MDBcbiAgdGl0bGVUZXh0NC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQ1LnggPSA1NDBcbiAgdGl0bGVUZXh0NS55ID0gNTMwXG4gIHRpdGxlVGV4dDUudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gIHdhaXQgYSBoYWxmIHNlY29uZCBmb3IgdGhlIGNhYmluIGltYWdlIHRvIGxvYWQgYmVmb3JlIHVwZGF0aW5nIHRoZSBzdGFnZVxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA1MDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHR0MWJnLCB0aXRsZVRleHQxKVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDEwMDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodGl0bGVUZXh0MilcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCAyNTAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHRpdGxlVGV4dDMpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNDAwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0dDRiZywgdGl0bGVUZXh0NClcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA2NTAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHR0NWJnLCB0aXRsZVRleHQ1KVxuICAgIHN0YWdlLnVwZGF0ZSgpXG5cbiAgICBjYW52YXMub25jbGljayA9ICgpID0+IHtcbiAgICAgIGNhbnZhcy5vbmNsaWNrID0gbnVsbFxuICAgICAgcGxheUdhbWVTY2VuZSgpXG4gICAgfVxuICB9LCA3NTAwKVxuICBcbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleXVwXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICB3YWxraW5nTm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoV2Fsa2luZylcbiAgVHZOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShUdilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIC8vICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIC8vIH0sIDEwMDApXG5cbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDEyMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuICBkYXNoYm9hcmRfYmcuc2V0Qm91bmRzKDAsIDAsIDQwMCwgMTIwKVxuXG4gIGRhc2hib2FyZF9mZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzkzY2RiXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDM4MCwgMTAwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfZmcueCA9IDIxMFxuICBkYXNoYm9hcmRfZmcueSA9IDQwXG5cblxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG4gIHRyYW5jZXRhYmxlLnNldEJvdW5kcygwLCAwLCAyNTAsIDEyMClcblxuICAvLyBwZXJzb24gb24gdHJhbmNlIHRhYmxlIVxuXG4gIC8vIHdvbGYgaW1hZ2VcbiAgd29sZkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwid29sZmltYWdlXCIpKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG4gIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG5cbiAgLy8gdHZcbiAgdHZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcInR2aW1hZ2VcIikpO1xuICB0dkJpdG1hcC54ID0gNDBcbiAgdHZCaXRtYXAueSA9IDE0MFxuICB0dkJpdG1hcC5zY2FsZVggPSB0dkJpdG1hcC5zY2FsZVkgPSAxLjVcblxuICAvLyBjaGFpclxuICBjaGFpckJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiY2hhaXJpbWFnZVwiKSk7XG4gIGNoYWlyQml0bWFwLnggPSAxMDBcbiAgY2hhaXJCaXRtYXAueSA9IDE3MFxuICBjaGFpckJpdG1hcC5zY2FsZVggPSBjaGFpckJpdG1hcC5zY2FsZVkgPSAuMzVcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW3F1ZXVlLmdldFJlc3VsdChcInNwcml0ZXNoZWV0aW1hZ2VcIildLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclNwcml0ZSwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIDEwMCwgNDYsIDUwKVxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgdHJhbmNlbGV2ZWx0ZXh0LCBub2lzZWxldmVsdGV4dCwgdHJhbmNldGFibGUsIHdvbGZCaXRtYXAsIHR2Qml0bWFwLCBjaGFpckJpdG1hcCwgcGxheWVyU3ByaXRlKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuICBzdGFnZS5hZGRDaGlsZChnYW1lQ29udGFpbmVyKVxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcbiAgcGxheWVyU3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxufVxuXG5mdW5jdGlvbiBwbGF5WW91TG9zdFNjZW5lKCkge1xuICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91TG9zdFRleHQueCA9IDM2MFxuICB5b3VMb3N0VGV4dC55ID0gMTE1XG4gIHlvdUxvc3RUZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YWdlLmFkZENoaWxkKHlvdUxvc3RUZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG59XG5cbi8vIFwieW91IGxvc3RcIiBwYWdlIGZ1bmN0aW9uXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGluaXQoKVxufVxuIiwiZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgb3V0ZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIGlubmVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBwcm9ncmVzczogbnVtYmVyXG4gIHN0YWdlPzogY3JlYXRlanMuU3RhZ2VcbiAgcmVtb3ZlT25Mb2FkOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKHN0YWdlOiBjcmVhdGVqcy5TdGFnZSwgcmVtb3ZlT25Mb2FkOiBib29sZWFuKSB7XG4gICAgdGhpcy5vdXRlckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5pbm5lckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5vdXRlckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTgxODE4XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgNjAsIDUsIDUsIDUsIDUpXG4gICAgdGhpcy5vdXRlckJhci54ID0gMjAwXG4gICAgdGhpcy5vdXRlckJhci55ID0gMjcwXG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLm91dGVyQmFyKVxuXG4gICAgdGhpcy5pbm5lckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzI3ZmE4XCIpLmRyYXdSZWN0KDAsIDAsIDM4MCwgNDApXG4gICAgdGhpcy5pbm5lckJhci54ID0gMjEwXG4gICAgdGhpcy5pbm5lckJhci55ID0gMjgwXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG5cbiAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZVxuICAgIHRoaXMucmVtb3ZlT25Mb2FkID0gcmVtb3ZlT25Mb2FkXG4gIH1cbiAgaGFuZGxlUHJvZ3Jlc3MoZXZlbnQ6IE9iamVjdCkge1xuICAgIHZhciBwcm9ncmVzc0V2ZW50ID0gPGNyZWF0ZWpzLlByb2dyZXNzRXZlbnQ+ZXZlbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NFdmVudC5wcm9ncmVzc1xuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YWdlKSB7XG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLm91dGVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnVwZGF0ZSgpXG4gICAgICB0aGlzLnN0YWdlID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIGhhbmRsZUNvbXBsZXRlKGV2ZW50OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5yZW1vdmVPbkxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKClcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmV4cG9ydCBsZXQgd29sZlNvdW5kOiBzdHJpbmcgPSBcIndvbGZcIlxuZXhwb3J0IGxldCBvdXRzaWRlU291bmQ6IHN0cmluZyA9IFwib3V0c2lkZVwiXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNvdW5kcyhxdWV1ZTogY3JlYXRlanMuTG9hZFF1ZXVlLCBuZXh0OiAoKSA9PiB2b2lkLCBwcm9ncmVzc0Jhcj86IFByb2dyZXNzQmFyKSB7XG4gIHF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gW1wibXAzXCJdO1xuICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICBxdWV1ZS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzLCBwcm9ncmVzc0JhcilcbiAgfVxuICBxdWV1ZS5vbihcImNvbXBsZXRlXCIsIHtcbiAgICBoYW5kbGVFdmVudDogKGV2ZW50KSA9PiB7XG4gICAgICBpZiAocHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgcXVldWUub2ZmKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MpXG4gICAgICAgIHByb2dyZXNzQmFyLmhhbmRsZUNvbXBsZXRlKGV2ZW50KVxuICAgICAgfVxuICAgICAgbmV4dCgpXG4gICAgfVxuICB9KVxuICBxdWV1ZS5sb2FkTWFuaWZlc3QoW1xuICAgIHsgaWQ6IFwid29sZlwiLCBzcmM6IFwicmVzL3dvbGYubXAzXCIgfSxcbiAgICB7IGlkOiBcIm91dHNpZGVcIiwgc3JjOiBcInJlcy9vdXRzaWRlLm1wM1wiIH0sXG4gICAgeyBpZDogXCJpbnRyb2NhYmluXCIsIHNyYzogXCJyZXMvaW50cm9jYWJpbi5qcGdcIiB9LFxuICAgIHsgaWQ6IFwidHZub2lzZVwiLCBzcmM6IFwicmVzL3R2c291bmQubXAzXCIgfSxcbiAgICB7IGlkOiBcInR2aW1hZ2VcIiwgc3JjOiBcInJlcy90dmltYWdlLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJzcHJpdGVzaGVldGltYWdlXCIsIHNyYzogXCJyZXMvcGxheWVyLXNwcml0ZW1hcC12OS1yZWRwYW50cy5wbmdcIiB9LFxuICAgIHsgaWQ6IFwiY2hhaXJpbWFnZVwiLCBzcmM6IFwicmVzL2NoYWlyLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJ3b2xmaW1hZ2VcIiwgc3JjOiBcInJlcy93b2xmLnBuZ1wiIH1cbiAgXSlcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==