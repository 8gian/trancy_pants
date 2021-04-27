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
var titleText3 = new createjs.Text("Keep your cabin quiet. If it gets too loud, the trance will be interrupted,\nor worse, you'll even wake the magician.\nYour trusty magic wolf Tiesto and your phantom TV \ncan both make a lot of noise. Walk with arrow keys.", "20px Arial", "#fffdfa");
var titleText4 = new createjs.Text("Don't forget to wake them up at the end,\nor they'll sleep forever.", "30px Arial", "#fffdfa");
var titleText5 = new createjs.Text("Click to begin!", "30px Arial", "#fffdfa");
const fallingIntoATranceMessage = "The magician is falling into a trance";
const wolfAgitatedOnMessage = "The TV is on, and Tiesto seems agitated";
const wolfAgitatedMessage = "Tiesto seems agitated";
const wolfQuietedMessage = "You quieted Tiesto";
const tvTurnedOffMessage = "You turned off the phantom TV";
const tvTurnedOnMessage = "You turned on the phantom TV";
const tvOnMessage = "The phantom TV is on";
const tvTurnedOnSelfMessage = "The phantom TV turned on by itself!";
const tvOnWolfHowlingMessage = "The TV is on, and Tiesto is howling";
const tvOnWolfHowlingLoudlyMessage = "The TV is on, and Tiesto is howling loudly";
const tvOnWolfHowlingGrowingMessage = "The TV is on, and Tiesto's howls grow louder";
const wolfNotAgitatedMessage = "Tiesto no longer seems agitated";
const wolfStartsHowlingMessage = "Tiesto is so agitated he starts howling";
const wolfHowlingMessage = "Tiesto is howling";
const wolfHowlingGrowingMessage = "Tiesto's howls grow louder";
const wolfHowlingLoudlyMessage = "Tiesto is howling loudly";
const tranceWakeUpMessage = "The magician's in a trance. Time to wake them up!";
var statusMessage = new createjs.Text(fallingIntoATranceMessage, "16px Arial", "#bdbef2");
var tt1bg = new createjs.Shape();
var tt4bg = new createjs.Shape();
var tt5bg = new createjs.Shape();
var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
var youWonText = new createjs.Text("You won!", "20px Arial", "#bdbef2");
var youLostText = new createjs.Text("You lost!", "20px Arial", "#bdbef2");
var playAgainText = new createjs.Text("Click to play again", "20px Arial", "#bdbef2");
var tranceleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var noiseleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var trancetable = new createjs.Shape();
var tranceRate = 0.0003;
var tranceProgress;
var walkSpeed = 75 / 1000;
var queue = new createjs.LoadQueue(false);
var player;
var wolfBitmap;
var chairBitmap;
var wizBitmap;
var tvBitmap;
let backgroundMusic;
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
        this.startTime = 0;
        this.noise = n;
        this.soundInstance = createjs.Sound.play(this.noise.sound, { loop: -1, volume: 0 });
    }
    getActiveNoiseLevel(time) {
        if (this.active) {
            if (this.startTime == 0) {
                this.startTime = time;
            }
            this.soundInstance.volume = 1;
            return this.noise.noiseLevel;
        }
        else {
            this.startTime = 0;
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
        this.wolfQuietedTime = 0;
        this.wolfAgitatedTime = 0;
        this.timeOffTv = 0;
        this.phantomTvTime = 0;
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
            this.timeOffTv = 0;
        }
        else {
            if (this.timeOffTv == 0) {
                this.timeOffTv = time;
            }
            this.timeOnTv = 0;
        }
        this.performInteractions(time);
        if (this.onTv && this.timeOnTv > 3000) {
            wolfNoise.active = true;
            this.wolfAgitatedTime = time;
        }
        if (this.onWolf) {
            this.wolfQuietedTime = time;
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
    performInteractions(time) {
        var newOnWolf = boundsCollide(this.getBounds(), cropBounds(wolfBitmap.getTransformedBounds(), 15, 11));
        var newOnTv = boundsCollide(this.getBounds(), tvBitmap.getTransformedBounds());
        if (newOnTv && !this.onTv) {
            TvNoise.active = !TvNoise.active;
        }
        if (newOnWolf && this.onWolf) {
            wolfNoise.active = false;
            var self = this;
            setTimeout(() => {
                if (!TvNoise.active) {
                    self.phantomTvTime = time + 4000;
                    TvNoise.active = true;
                }
            }, 4000);
        }
        this.onWolf = newOnWolf;
        this.onTv = newOnTv;
    }
    pickBestMessage(time) {
        if (time > 2000 && time <= this.wolfQuietedTime + 2000) {
            return wolfQuietedMessage;
        }
        if (this.onTv && this.timeOnTv <= 1000) {
            if (TvNoise.active) {
                return tvTurnedOnMessage;
            }
            else {
                return tvTurnedOffMessage;
            }
        }
        if (!wolfNoise.active) {
            if (this.timeOnTv > 1000 && this.timeOnTv <= 4000) {
                if (TvNoise.active) {
                    return wolfAgitatedOnMessage;
                }
                else {
                    return wolfAgitatedMessage;
                }
            }
            if (time > 2000 && time < this.timeOffTv + 2000) {
                return wolfNotAgitatedMessage;
            }
        }
        else {
            if (time > 2000 && time < this.wolfAgitatedTime + 2000) {
                return wolfStartsHowlingMessage;
            }
        }
        if (time >= wolfNoise.startTime && time <= wolfNoise.endTime) {
            if (wolfNoise.distressLevel == wolfNoise.startDistressLevel) {
                return TvNoise.active ? tvOnWolfHowlingMessage : wolfHowlingMessage;
            }
            else if (wolfNoise.distressLevel == wolfNoise.maxDistressLevel) {
                return TvNoise.active ? tvOnWolfHowlingLoudlyMessage : wolfHowlingLoudlyMessage;
            }
            return TvNoise.active ? tvOnWolfHowlingGrowingMessage : wolfHowlingGrowingMessage;
        }
        if (TvNoise.active && time < this.phantomTvTime + 2000) {
            return tvTurnedOnSelfMessage;
        }
        if (noiseLevel < 3) {
            if (tranceLevel >= 10) {
                return tranceWakeUpMessage;
            }
            return fallingIntoATranceMessage;
        }
        if (TvNoise.active) {
            return tvOnMessage;
        }
        return "";
    }
}
let wolfNoise = new WolfNoise(Wolf, 2000, 4000);
var logIt = 0;
function resetVars() {
    wolfNoise = new WolfNoise(Wolf, 2000, 4000);
    tranceLevel = 0;
    noiseLevel = 0;
    lastNoiseLevel = 0;
    lastTickTime = 0;
}
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
        playYouLostScene("youlosetv");
    }
    if (tranceLevel < 0) {
        if (TvNoise.active) {
            playYouLostScene("youlosetv");
        }
        else {
            playYouLostScene("youlosewolf");
        }
    }
    // end of variable updates, only displays below
    tranceProgress.handleProgress(new createjs.ProgressEvent(tranceLevel, 10));
    var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100);
    if (logIt % 14 == 0) {
        // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
    }
    logIt++;
    tranceleveltext.text = roundedTranceLevel.toString();
    noiseleveltext.text = noiseLevel.toString();
    statusMessage.text = player.pickBestMessage(time);
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
    var progressBar = new progressbar_1.ProgressBar(stage, true, 0, 0, 0, 0);
    sound_1.loadSounds(queue, startScenes, progressBar);
}
function startScenes() {
    playIntroScene();
}
// intro page function
function playIntroScene() {
    // make the stage
    stage.removeAllChildren();
    // elements of the title page
    var cabinBitmap = new createjs.Bitmap(queue.getResult("introcabin"));
    cabinBitmap.x = cabinBitmap.y = 0;
    cabinBitmap.scaleX = cabinBitmap.scaleY = .45;
    stage.addChild(cabinBitmap);
    tt1bg.graphics.beginFill("#406e20").drawRoundRectComplex(0, 0, 660, 250, 10, 10, 10, 10);
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
    stage.removeAllChildren();
    gameContainer.removeAllChildren();
    resetVars();
    walkingNoise = new PlayerNoise(Walking);
    TvNoise = new PlayerNoise(Tv);
    // setTimeout(function () {
    //   TvNoise.active = true
    // }, 1000)
    backgroundMusic = createjs.Sound.play("background_music", { loop: -1 });
    backgroundMusic.volume = .4;
    // create a background rectangle
    outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height);
    // create the inner rectangle for the "floor" of the cabin
    innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30);
    // dashboard displaying trance level and noise level
    dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 140, 5, 5, 5, 5);
    dashboard_bg.x = 200;
    dashboard_bg.y = 30;
    dashboard_bg.setBounds(0, 0, 400, 120);
    dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 120, 5, 5, 5, 5);
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
    statusMessage.x = 225;
    statusMessage.y = 145;
    statusMessage.textBaseline = "alphabetic";
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
    wizBitmap = new createjs.Bitmap(queue.getResult("wizardimage"));
    wizBitmap.x = 295;
    wizBitmap.y = 275;
    wizBitmap.scaleX = wizBitmap.scaleY = .4;
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
    gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, /*tranceleveltext,*/ noiseleveltext, statusMessage, trancetable, wizBitmap, wolfBitmap, tvBitmap, chairBitmap, playerSprite);
    gameContainer.setChildIndex(outerwall, 0);
    gameContainer.setChildIndex(innerwall, 1);
    tranceProgress = new progressbar_1.ProgressBar(stage, false, 360, 50, 220, 40);
    gameContainer.addChild(tranceProgress.outerBar, tranceProgress.innerBar);
    stage.addChild(gameContainer);
    // Update stage will render next frame
    stage.update();
    createjs.Ticker.addEventListener("tick", gameLoop);
}
// "you won" page function
function playYouWonScene() {
    wolfNoise.active = false;
    if (wolfNoise.soundInstance) {
        wolfNoise.soundInstance.muted = true;
    }
    TvNoise.active = false;
    TvNoise.soundInstance.muted = true;
    createjs.Ticker.reset();
    backgroundMusic.muted = true;
    backgroundMusic.destroy();
    var youWinSound = createjs.Sound.play("youwin");
    stage.removeAllChildren();
    // place some "you won!" text on the screen (declared at the top)
    youWonText.x = 360;
    youWonText.y = 115;
    youWonText.textBaseline = "alphabetic";
    createjs.Ticker.removeEventListener("tick", gameLoop);
    stage.addChild(youWonText, playAgainText);
    stage.update();
    canvas.onclick = () => {
        canvas.onclick = null;
        playGameScene();
    };
}
function playYouLostScene(losingSound) {
    wolfNoise.active = false;
    if (wolfNoise.soundInstance) {
        wolfNoise.soundInstance.muted = true;
    }
    TvNoise.active = false;
    TvNoise.soundInstance.muted = true;
    createjs.Ticker.reset();
    backgroundMusic.muted = true;
    backgroundMusic.destroy();
    var youLoseSound = createjs.Sound.play(losingSound);
    canvas = stage.canvas;
    stage.removeAllChildren();
    // place some "you won!" text on the screen (declared at the top)
    youLostText.x = 360;
    youLostText.y = 115;
    youLostText.textBaseline = "alphabetic";
    playAgainText.x = 330;
    playAgainText.y = 300;
    stage.addChild(youLostText, playAgainText);
    stage.update();
    canvas.onclick = () => {
        canvas.onclick = null;
        playGameScene();
    };
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
    constructor(stage, removeOnLoad, x, y, width, height) {
        this.outerBar = new createjs.Shape();
        this.innerBar = new createjs.Shape();
        if (!width || !height) {
            width = 400;
            height = 60;
        }
        if (!x || !y) {
            x = 200;
            y = 270;
        }
        this.outerBar.graphics.beginFill("#181818").drawRoundRectComplex(0, 0, width, height, 5, 5, 5, 5);
        this.outerBar.x = x;
        this.outerBar.y = y;
        this.progress = 0;
        if (stage) {
            stage.addChild(this.outerBar);
        }
        this.innerBar.graphics.beginFill("#327fa8").drawRect(0, 0, width - 20, height - 20);
        this.innerBar.x = x + 10;
        this.innerBar.y = y + 10;
        this.innerBar.scaleX = this.progress;
        if (stage) {
            stage.addChild(this.innerBar);
        }
        this.stage = stage;
        this.removeOnLoad = removeOnLoad || false;
    }
    handleProgress(event) {
        var progressEvent = event;
        this.progress = progressEvent.progress;
        this.innerBar.scaleX = this.progress;
        if (this.stage) {
            this.stage.update();
        }
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
        { id: "wolf", src: "res/wolf.wav" },
        { id: "outside", src: "res/outside.mp3" },
        { id: "introcabin", src: "res/introcabin.jpg" },
        { id: "tvnoise", src: "res/tvsound.mp3" },
        { id: "tvimage", src: "res/tvimage.png" },
        { id: "spritesheetimage", src: "res/player-spritemap-v9-redpants.png" },
        { id: "chairimage", src: "res/chair.png" },
        { id: "wolfimage", src: "res/wolf.png" },
        { id: "youlosewolf", src: "res/you_lose_wolf.mp3" },
        { id: "youlosetv", src: "res/you_lose_tv.mp3" },
        { id: "youwin", src: "res/you_win.mp3" },
        { id: "wizardimage", src: "res/wizard.png" },
        { id: "background_music", src: "res/background_music.mp3" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJ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IiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IFR2Tm9pc2U6IFBsYXllck5vaXNlXG5sZXQgd2Fsa2luZ05vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdE5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdGl0bGVUZXh0MSA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGFyZSB0aGUgZmFtb3VzIERyLiBUcmFuY3kgUGFudHMsIE0uRC5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDIgPSBuZXcgY3JlYXRlanMuVGV4dChcIldpdGggeW91ciBoZWxwLCBidWRkaW5nIG1hZ2ljaWFucyBjYW4gYWR2YW5jZVxcbnRoZWlyIHN0dWRpZXMgYnkgZW50ZXJpbmcgYSBkZWVwIHRyYW5jZS5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDMgPSBuZXcgY3JlYXRlanMuVGV4dChcIktlZXAgeW91ciBjYWJpbiBxdWlldC4gSWYgaXQgZ2V0cyB0b28gbG91ZCwgdGhlIHRyYW5jZSB3aWxsIGJlIGludGVycnVwdGVkLFxcbm9yIHdvcnNlLCB5b3UnbGwgZXZlbiB3YWtlIHRoZSBtYWdpY2lhbi5cXG5Zb3VyIHRydXN0eSBtYWdpYyB3b2xmIFRpZXN0byBhbmQgeW91ciBwaGFudG9tIFRWIFxcbmNhbiBib3RoIG1ha2UgYSBsb3Qgb2Ygbm9pc2UuIFdhbGsgd2l0aCBhcnJvdyBrZXlzLlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0NCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiRG9uJ3QgZm9yZ2V0IHRvIHdha2UgdGhlbSB1cCBhdCB0aGUgZW5kLFxcbm9yIHRoZXknbGwgc2xlZXAgZm9yZXZlci5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDUgPSBuZXcgY3JlYXRlanMuVGV4dChcIkNsaWNrIHRvIGJlZ2luIVwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpO1xuY29uc3QgZmFsbGluZ0ludG9BVHJhbmNlTWVzc2FnZSA9IFwiVGhlIG1hZ2ljaWFuIGlzIGZhbGxpbmcgaW50byBhIHRyYW5jZVwiXG5jb25zdCB3b2xmQWdpdGF0ZWRPbk1lc3NhZ2UgPSBcIlRoZSBUViBpcyBvbiwgYW5kIFRpZXN0byBzZWVtcyBhZ2l0YXRlZFwiXG5jb25zdCB3b2xmQWdpdGF0ZWRNZXNzYWdlID0gXCJUaWVzdG8gc2VlbXMgYWdpdGF0ZWRcIlxuY29uc3Qgd29sZlF1aWV0ZWRNZXNzYWdlID0gXCJZb3UgcXVpZXRlZCBUaWVzdG9cIlxuY29uc3QgdHZUdXJuZWRPZmZNZXNzYWdlID0gXCJZb3UgdHVybmVkIG9mZiB0aGUgcGhhbnRvbSBUVlwiXG5jb25zdCB0dlR1cm5lZE9uTWVzc2FnZSA9IFwiWW91IHR1cm5lZCBvbiB0aGUgcGhhbnRvbSBUVlwiXG5jb25zdCB0dk9uTWVzc2FnZSA9IFwiVGhlIHBoYW50b20gVFYgaXMgb25cIlxuY29uc3QgdHZUdXJuZWRPblNlbGZNZXNzYWdlID0gXCJUaGUgcGhhbnRvbSBUViB0dXJuZWQgb24gYnkgaXRzZWxmIVwiXG5jb25zdCB0dk9uV29sZkhvd2xpbmdNZXNzYWdlID0gXCJUaGUgVFYgaXMgb24sIGFuZCBUaWVzdG8gaXMgaG93bGluZ1wiXG5jb25zdCB0dk9uV29sZkhvd2xpbmdMb3VkbHlNZXNzYWdlID0gXCJUaGUgVFYgaXMgb24sIGFuZCBUaWVzdG8gaXMgaG93bGluZyBsb3VkbHlcIlxuY29uc3QgdHZPbldvbGZIb3dsaW5nR3Jvd2luZ01lc3NhZ2UgPSBcIlRoZSBUViBpcyBvbiwgYW5kIFRpZXN0bydzIGhvd2xzIGdyb3cgbG91ZGVyXCJcbmNvbnN0IHdvbGZOb3RBZ2l0YXRlZE1lc3NhZ2UgPSBcIlRpZXN0byBubyBsb25nZXIgc2VlbXMgYWdpdGF0ZWRcIlxuY29uc3Qgd29sZlN0YXJ0c0hvd2xpbmdNZXNzYWdlID0gXCJUaWVzdG8gaXMgc28gYWdpdGF0ZWQgaGUgc3RhcnRzIGhvd2xpbmdcIlxuY29uc3Qgd29sZkhvd2xpbmdNZXNzYWdlID0gXCJUaWVzdG8gaXMgaG93bGluZ1wiXG5jb25zdCB3b2xmSG93bGluZ0dyb3dpbmdNZXNzYWdlID0gXCJUaWVzdG8ncyBob3dscyBncm93IGxvdWRlclwiXG5jb25zdCB3b2xmSG93bGluZ0xvdWRseU1lc3NhZ2UgPSBcIlRpZXN0byBpcyBob3dsaW5nIGxvdWRseVwiXG5jb25zdCB0cmFuY2VXYWtlVXBNZXNzYWdlID0gXCJUaGUgbWFnaWNpYW4ncyBpbiBhIHRyYW5jZS4gVGltZSB0byB3YWtlIHRoZW0gdXAhXCJcbnZhciBzdGF0dXNNZXNzYWdlID0gbmV3IGNyZWF0ZWpzLlRleHQoZmFsbGluZ0ludG9BVHJhbmNlTWVzc2FnZSwgXCIxNnB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKVxudmFyIHR0MWJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHQ0YmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0dDViZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJUcmFuY2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiTm9pc2UgbGV2ZWw6XCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91V29uVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IHdvbiFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VMb3N0VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGxvc3QhXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgcGxheUFnYWluVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiQ2xpY2sgdG8gcGxheSBhZ2FpblwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNldGFibGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0cmFuY2VSYXRlOiBudW1iZXIgPSAwLjAwMDNcbnZhciB0cmFuY2VQcm9ncmVzczogUHJvZ3Jlc3NCYXJcbnZhciB3YWxrU3BlZWQ6IG51bWJlciA9IDc1IC8gMTAwMFxudmFyIHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZShmYWxzZSk7XG52YXIgcGxheWVyOiBQbGF5ZXJcbnZhciB3b2xmQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciBjaGFpckJpdG1hcDogY3JlYXRlanMuQml0bWFwXG52YXIgd2l6Qml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciB0dkJpdG1hcDogY3JlYXRlanMuQml0bWFwXG5sZXQgYmFja2dyb3VuZE11c2ljOiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2VcblxuZnVuY3Rpb24gZ2V0T2JqZWN0Qm91bmRzKCkge1xuICByZXR1cm4gW2NoYWlyQml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCksIHRyYW5jZXRhYmxlLmdldFRyYW5zZm9ybWVkQm91bmRzKCksIGRhc2hib2FyZF9iZy5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpXVxufVxuZnVuY3Rpb24gY3JvcEJvdW5kcyhib3VuZHM6IGNyZWF0ZWpzLlJlY3RhbmdsZSwgaG9yaXo6IG51bWJlciwgdmVydDogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKGJvdW5kcy54ICsgaG9yaXosIGJvdW5kcy55ICsgdmVydCwgYm91bmRzLndpZHRoIC0gMiAqIGhvcml6LCBib3VuZHMuaGVpZ2h0IC0gMiAqIHZlcnQpXG59XG5cbmZ1bmN0aW9uIGJvdW5kc0NvbGxpZGUob2JqMTogY3JlYXRlanMuUmVjdGFuZ2xlLCBvYmoyOiBjcmVhdGVqcy5SZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgaWYgKG9iajEueCArIG9iajEud2lkdGggPiBvYmoyLnggJiYgb2JqMS54IDwgb2JqMi54ICsgb2JqMi53aWR0aCkge1xuICAgIGlmIChvYmoxLnkgKyBvYmoyLmhlaWdodCA+IG9iajIueSAmJiBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBzb3VuZDogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyLCBzb3VuZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgICB0aGlzLnNvdW5kID0gc291bmRcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDAsIFwid29sZlwiKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwLCBcIm91dHNpZGVcIilcbmNvbnN0IFdhbGtpbmcgPSBuZXcgTm9pc2UoMSwgMTAwMCwgXCJ3YWxraW5nXCIpXG5jb25zdCBUdiA9IG5ldyBOb2lzZSgzLCAwLCBcInR2bm9pc2VcIilcblxuY2xhc3MgVGltZWROb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCAodGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgV29sZk5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIGRpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgc3RhcnREaXN0cmVzc0xldmVsOiBudW1iZXIgPSAwXG4gIG1heERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDNcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgcmVwZWF0QWZ0ZXI6IG51bWJlclxuICBpbml0aWFsU3RhcnRUaW1lOiBudW1iZXJcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBlbmRUaW1lOiBudW1iZXJcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyLCByZXBlYXRBZnRlcjogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMucmVwZWF0QWZ0ZXIgPSByZXBlYXRBZnRlclxuICAgIHRoaXMuZW5kVGltZSA9IHN0YXJ0VGltZSArIG4uZHVyYXRpb25Nc1xuICAgIHRoaXMuaW5pdGlhbFN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gdGhpcy5zdGFydERpc3RyZXNzTGV2ZWxcbiAgICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlIS5tdXRlZCA9IHRydWVcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDBcbiAgICAgIHRoaXMuZW5kVGltZSA9IDBcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuc3RhcnRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLmluaXRpYWxTdGFydFRpbWVcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgfVxuICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UgJiYgdGltZSA+PSB0aGlzLmVuZFRpbWUpIHtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLnJlcGVhdEFmdGVyKSB7XG4gICAgICAgIHRoaXMuZGlzdHJlc3NMZXZlbCA9IE1hdGgubWluKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEsIHRoaXMubWF4RGlzdHJlc3NMZXZlbClcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgKz0gdGhpcy5ub2lzZS5kdXJhdGlvbk1zICsgdGhpcy5yZXBlYXRBZnRlclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEpIC8gKHRoaXMubWF4RGlzdHJlc3NMZXZlbCArIDEpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCB0aGlzLmVuZFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbCArIHRoaXMuZGlzdHJlc3NMZXZlbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFBsYXllck5vaXNlIHtcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U6IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICBzdGFydFRpbWU6IG51bWJlciA9IDBcbiAgY29uc3RydWN0b3IobjogTm9pc2UpIHtcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZCwgeyBsb29wOiAtMSwgdm9sdW1lOiAwIH0pXG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lID09IDApIHtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aW1lXG4gICAgICB9XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gMVxuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDBcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAwXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZVxuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2Fsa2luZ0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdVcDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICBvbldvbGY6IGJvb2xlYW4gPSBmYWxzZVxuICBvblR2OiBib29sZWFuID0gZmFsc2VcbiAgdGltZU9uVHY6IG51bWJlciA9IDBcbiAgd29sZlF1aWV0ZWRUaW1lOiBudW1iZXIgPSAwXG4gIHdvbGZBZ2l0YXRlZFRpbWU6IG51bWJlciA9IDBcbiAgdGltZU9mZlR2OiBudW1iZXIgPSAwXG4gIHBoYW50b21UdlRpbWU6IG51bWJlciA9IDBcblxuICBjb25zdHJ1Y3RvcihzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZSwgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlXG4gICAgdGhpcy54ID0gc3RhcnRYXG4gICAgdGhpcy55ID0gc3RhcnRZXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueVxuICB9XG4gIGdldEJvdW5kcygpOiBjcmVhdGVqcy5SZWN0YW5nbGUge1xuICAgIHJldHVybiBjcm9wQm91bmRzKG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSwgMTUsIDEwKVxuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGxldCBsYXN0WCA9IHRoaXMueFxuICAgIGxldCBsYXN0WSA9IHRoaXMueVxuICAgIGxldCBob3JpeiA9IDBcbiAgICBsZXQgdmVydCA9IDBcbiAgICBpZiAodGhpcy53YWxraW5nTGVmdCkge1xuICAgICAgaG9yaXogLT0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nUmlnaHQpIHtcbiAgICAgIGhvcml6ICs9IDFcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ0Rvd24pIHtcbiAgICAgIHZlcnQgKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nVXApIHtcbiAgICAgIHZlcnQgLT0gMVxuICAgIH1cbiAgICBpZiAoTWF0aC5hYnModmVydCkgPiAwIHx8IE1hdGguYWJzKGhvcml6KSA+IDApIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFN0b3AoMClcbiAgICB9XG4gICAgbGV0IHNwZWVkID0gdGhpcy5tb3ZpbmcgPyAoMSAvIE1hdGguc3FydChNYXRoLnBvdyhob3JpeiwgMikgKyBNYXRoLnBvdyh2ZXJ0LCAyKSkpICogd2Fsa1NwZWVkIDogMFxuICAgIHRoaXMueCArPSBob3JpeiAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgdGhpcy55ICs9IHZlcnQgKiBzcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuXG4gICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgICB9XG4gICAgdGhpcy54ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy54LCBjYW52YXMud2lkdGggLSAxNSAtIHRoaXMud2lkdGgpKVxuICAgIHRoaXMueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueSwgY2FudmFzLmhlaWdodCAtIDE1IC0gdGhpcy5oZWlnaHQpKVxuICAgIGlmICh0aGlzLmVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKSkge1xuICAgICAgdGhpcy54ID0gbGFzdFhcbiAgICAgIHRoaXMueSA9IGxhc3RZXG4gICAgfVxuXG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueFxuICAgIHRoaXMuc3ByaXRlLnkgPSB0aGlzLnlcbiAgICBpZiAodGhpcy5vblR2KSB7XG4gICAgICB0aGlzLnRpbWVPblR2ICs9IHRpbWUgLSBsYXN0VGlja1RpbWVcbiAgICAgIHRoaXMudGltZU9mZlR2ID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy50aW1lT2ZmVHYgPT0gMCkge1xuICAgICAgICB0aGlzLnRpbWVPZmZUdiA9IHRpbWVcbiAgICAgIH1cbiAgICAgIHRoaXMudGltZU9uVHYgPSAwXG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUludGVyYWN0aW9ucyh0aW1lKVxuICAgIGlmICh0aGlzLm9uVHYgJiYgdGhpcy50aW1lT25UdiA+IDMwMDApIHtcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgICB0aGlzLndvbGZBZ2l0YXRlZFRpbWUgPSB0aW1lXG4gICAgfVxuICAgIGlmICh0aGlzLm9uV29sZikge1xuICAgICAgdGhpcy53b2xmUXVpZXRlZFRpbWUgPSB0aW1lXG4gICAgfVxuICB9XG4gIGVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKVxuICAgIGNvbnN0IG9iamVjdHMgPSBnZXRPYmplY3RCb3VuZHMoKVxuICAgIGZvciAodmFyIGkgaW4gb2JqZWN0cykge1xuICAgICAgaWYgKGJvdW5kc0NvbGxpZGUoYm91bmRzLCBvYmplY3RzW2ldKSkge1xuICAgICAgICBpZiAoaSA9PSBcIjBcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGNoYWlyXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjFcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IHRhYmxlXCIpXG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PSBcIjJcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IGRhc2hib2FyZFwiKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm91bmRzIFwiICsgb2JqZWN0c1tpXSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcGVyZm9ybUludGVyYWN0aW9ucyh0aW1lOiBudW1iZXIpIHtcbiAgICB2YXIgbmV3T25Xb2xmID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCBjcm9wQm91bmRzKHdvbGZCaXRtYXAuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgMTUsIDExKSlcbiAgICB2YXIgbmV3T25UdiA9IGJvdW5kc0NvbGxpZGUodGhpcy5nZXRCb3VuZHMoKSwgdHZCaXRtYXAuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSlcbiAgICBpZiAobmV3T25UdiAmJiAhdGhpcy5vblR2KSB7XG4gICAgICBUdk5vaXNlLmFjdGl2ZSA9ICFUdk5vaXNlLmFjdGl2ZVxuICAgIH1cbiAgICBpZiAobmV3T25Xb2xmICYmIHRoaXMub25Xb2xmKSB7XG4gICAgICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghVHZOb2lzZS5hY3RpdmUpIHtcbiAgICAgICAgICBzZWxmLnBoYW50b21UdlRpbWUgPSB0aW1lICsgNDAwMFxuICAgICAgICAgIFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LCA0MDAwKVxuICAgIH1cbiAgICB0aGlzLm9uV29sZiA9IG5ld09uV29sZlxuICAgIHRoaXMub25UdiA9IG5ld09uVHZcbiAgfVxuICBwaWNrQmVzdE1lc3NhZ2UodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRpbWUgPiAyMDAwICYmIHRpbWUgPD0gdGhpcy53b2xmUXVpZXRlZFRpbWUgKyAyMDAwKSB7XG4gICAgICByZXR1cm4gd29sZlF1aWV0ZWRNZXNzYWdlXG4gICAgfVxuICAgIGlmICh0aGlzLm9uVHYgJiYgdGhpcy50aW1lT25UdiA8PSAxMDAwKSB7XG4gICAgICBpZiAoVHZOb2lzZS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIHR2VHVybmVkT25NZXNzYWdlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHZUdXJuZWRPZmZNZXNzYWdlXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghd29sZk5vaXNlLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMudGltZU9uVHYgPiAxMDAwICYmIHRoaXMudGltZU9uVHYgPD0gNDAwMCkge1xuICAgICAgICBpZiAoVHZOb2lzZS5hY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm4gd29sZkFnaXRhdGVkT25NZXNzYWdlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHdvbGZBZ2l0YXRlZE1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRpbWUgPiAyMDAwICYmIHRpbWUgPCB0aGlzLnRpbWVPZmZUdiArIDIwMDApIHtcbiAgICAgICAgcmV0dXJuIHdvbGZOb3RBZ2l0YXRlZE1lc3NhZ2VcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRpbWUgPiAyMDAwICYmIHRpbWUgPCB0aGlzLndvbGZBZ2l0YXRlZFRpbWUgKyAyMDAwKSB7XG4gICAgICAgIHJldHVybiB3b2xmU3RhcnRzSG93bGluZ01lc3NhZ2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWUgPj0gd29sZk5vaXNlLnN0YXJ0VGltZSAmJiB0aW1lIDw9IHdvbGZOb2lzZS5lbmRUaW1lKSB7XG4gICAgICBpZiAod29sZk5vaXNlLmRpc3RyZXNzTGV2ZWwgPT0gd29sZk5vaXNlLnN0YXJ0RGlzdHJlc3NMZXZlbCkge1xuICAgICAgICByZXR1cm4gVHZOb2lzZS5hY3RpdmUgPyB0dk9uV29sZkhvd2xpbmdNZXNzYWdlIDogd29sZkhvd2xpbmdNZXNzYWdlXG4gICAgICB9IGVsc2UgaWYgKHdvbGZOb2lzZS5kaXN0cmVzc0xldmVsID09IHdvbGZOb2lzZS5tYXhEaXN0cmVzc0xldmVsKSB7XG4gICAgICAgIHJldHVybiBUdk5vaXNlLmFjdGl2ZSA/IHR2T25Xb2xmSG93bGluZ0xvdWRseU1lc3NhZ2UgOiB3b2xmSG93bGluZ0xvdWRseU1lc3NhZ2VcbiAgICAgIH1cbiAgICAgIHJldHVybiBUdk5vaXNlLmFjdGl2ZSA/IHR2T25Xb2xmSG93bGluZ0dyb3dpbmdNZXNzYWdlIDogd29sZkhvd2xpbmdHcm93aW5nTWVzc2FnZVxuICAgIH1cbiAgICBpZiAoVHZOb2lzZS5hY3RpdmUgJiYgdGltZSA8IHRoaXMucGhhbnRvbVR2VGltZSArIDIwMDApIHtcbiAgICAgIHJldHVybiB0dlR1cm5lZE9uU2VsZk1lc3NhZ2VcbiAgICB9XG4gICAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgICBpZiAodHJhbmNlTGV2ZWwgPj0gMTApIHtcbiAgICAgICAgcmV0dXJuIHRyYW5jZVdha2VVcE1lc3NhZ2VcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxsaW5nSW50b0FUcmFuY2VNZXNzYWdlXG4gICAgfVxuICAgIGlmIChUdk5vaXNlLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHR2T25NZXNzYWdlXG4gICAgfVxuICAgIHJldHVybiBcIlwiXG4gIH1cbn1cblxubGV0IHdvbGZOb2lzZSA9IG5ldyBXb2xmTm9pc2UoV29sZiwgMjAwMCwgNDAwMClcbnZhciBsb2dJdCA9IDBcblxuZnVuY3Rpb24gcmVzZXRWYXJzKCkge1xuICB3b2xmTm9pc2UgPSBuZXcgV29sZk5vaXNlKFdvbGYsIDIwMDAsIDQwMDApXG4gIHRyYW5jZUxldmVsID0gMFxuICBub2lzZUxldmVsID0gMFxuICBsYXN0Tm9pc2VMZXZlbCA9IDBcbiAgbGFzdFRpY2tUaW1lID0gMFxufVxuXG5mdW5jdGlvbiBnYW1lTG9vcChldmVudDogT2JqZWN0KSB7XG4gIGxldCB0aW1lID0gY3JlYXRlanMuVGlja2VyLmdldFRpbWUoKTtcbiAgLy8gbGV0IHRpbWVMZWZ0b3ZlciA9IHRpbWUgJSA1MDtcbiAgLy8gdGltZSAtPSB0aW1lTGVmdG92ZXI7XG4gIHZhciBkZWx0YVRpbWU6IG51bWJlciA9IHRpbWUgLSBsYXN0VGlja1RpbWVcblxuICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZSlcbiAgfVxuICBwbGF5ZXIudXBkYXRlKHRpbWUpXG4gIHVwZGF0ZU5vaXNlTGV2ZWwodGltZSlcblxuICBpZiAodHJhbmNlTGV2ZWwgPj0gMTApIHtcbiAgICB0cmFuY2VMZXZlbCA9IDEwXG4gICAgaWYgKG5vaXNlTGV2ZWwgPj0gMTApIHtcbiAgICAgIHBsYXlZb3VXb25TY2VuZSgpXG4gICAgfVxuICB9IGVsc2UgaWYgKG5vaXNlTGV2ZWwgPj0gMTApIHtcbiAgICBwbGF5WW91TG9zdFNjZW5lKFwieW91bG9zZXR2XCIpXG4gIH1cbiAgaWYgKHRyYW5jZUxldmVsIDwgMCkge1xuICAgIGlmIChUdk5vaXNlLmFjdGl2ZSkge1xuICAgICAgcGxheVlvdUxvc3RTY2VuZShcInlvdWxvc2V0dlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5WW91TG9zdFNjZW5lKFwieW91bG9zZXdvbGZcIilcbiAgICB9XG4gIH1cblxuICAvLyBlbmQgb2YgdmFyaWFibGUgdXBkYXRlcywgb25seSBkaXNwbGF5cyBiZWxvd1xuICB0cmFuY2VQcm9ncmVzcy5oYW5kbGVQcm9ncmVzcyhuZXcgY3JlYXRlanMuUHJvZ3Jlc3NFdmVudCh0cmFuY2VMZXZlbCwgMTApKVxuICB2YXIgcm91bmRlZFRyYW5jZUxldmVsID0gKE1hdGgucm91bmQodHJhbmNlTGV2ZWwgKiAxMDApIC8gMTAwKVxuICBpZiAobG9nSXQgJSAxNCA9PSAwKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0aW1lOiBcIiArICh0aW1lIC8gMTAwMCkgKyBcIiwgdHJhbmNlOiBcIiArIHJvdW5kZWRUcmFuY2VMZXZlbCArIFwiLCBub2lzZTogXCIgKyBub2lzZUxldmVsKVxuICB9XG4gIGxvZ0l0KytcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHQgPSByb3VuZGVkVHJhbmNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgbm9pc2VsZXZlbHRleHQudGV4dCA9IG5vaXNlTGV2ZWwudG9TdHJpbmcoKTtcbiAgc3RhdHVzTWVzc2FnZS50ZXh0ID0gcGxheWVyLnBpY2tCZXN0TWVzc2FnZSh0aW1lKVxuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgd29sZk5vaXNlLnRpY2sodGltZSlcbiAgbm9pc2VMZXZlbCArPSB3YWxraW5nTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIFR2Tm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIHdvbGZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIGlmIChub2lzZUxldmVsID4gbGFzdE5vaXNlTGV2ZWwpIHtcbiAgICBpZiAobm9pc2VMZXZlbCA+PSA1KSB7XG4gICAgICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgICAgICB0cmFuY2VMZXZlbCAtPSAobm9pc2VMZXZlbCAtIDUpXG4gICAgICAgIHRyYW5jZUxldmVsID0gTWF0aC5mbG9vcih0cmFuY2VMZXZlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGFzdE5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RXZlbnQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVLZXlFdmVudClcbiAgdmFyIHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKHN0YWdlLCB0cnVlLCAwLCAwLCAwLCAwKVxuICBsb2FkU291bmRzKHF1ZXVlLCBzdGFydFNjZW5lcywgcHJvZ3Jlc3NCYXIpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2NlbmVzKCkge1xuICBwbGF5SW50cm9TY2VuZSgpXG59XG5cbi8vIGludHJvIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlJbnRyb1NjZW5lKCkge1xuICAvLyBtYWtlIHRoZSBzdGFnZVxuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG5cbiAgdHQxYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzQwNmUyMFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA2NjAsIDI1MCwgMTAsIDEwLCAxMCwgMTApXG4gIHR0MWJnLnggPSA5NVxuICB0dDFiZy55ID0gNjBcblxuICB0dDRiZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNDA2ZTIwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDU2MCwgOTUsIDEwLCAxMCwgMTAsIDEwKVxuICB0dDRiZy54ID0gMTk1XG4gIHR0NGJnLnkgPSAzNjBcblxuICB0dDViZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNjliNTM1XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDI0MCwgNzUsIDEwLCAxMCwgMTAsIDEwKVxuICB0dDViZy54ID0gNTE1XG4gIHR0NWJnLnkgPSA0ODVcblxuICAvLyBpbnRybyBnYW1lIHRleHQgKHRleHQgZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgdGl0bGVUZXh0MS54ID0gMTEwXG4gIHRpdGxlVGV4dDEueSA9IDEwMFxuICB0aXRsZVRleHQxLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDIueCA9IDExMFxuICB0aXRsZVRleHQyLnkgPSAxNTBcbiAgdGl0bGVUZXh0Mi50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQzLnggPSAxMTBcbiAgdGl0bGVUZXh0My55ID0gMjMwXG4gIHRpdGxlVGV4dDMudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0NC54ID0gMjEwXG4gIHRpdGxlVGV4dDQueSA9IDQwMFxuICB0aXRsZVRleHQ0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDUueCA9IDU0MFxuICB0aXRsZVRleHQ1LnkgPSA1MzBcbiAgdGl0bGVUZXh0NS50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQxYmcsIHRpdGxlVGV4dDEpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgMTAwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0aXRsZVRleHQyKVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDI1MDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodGl0bGVUZXh0MylcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA0MDAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHR0NGJnLCB0aXRsZVRleHQ0KVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDY1MDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQ1YmcsIHRpdGxlVGV4dDUpXG4gICAgc3RhZ2UudXBkYXRlKClcblxuICAgIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgY2FudmFzLm9uY2xpY2sgPSBudWxsXG4gICAgICBwbGF5R2FtZVNjZW5lKClcbiAgICB9XG4gIH0sIDc1MDApXG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleXVwXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIGdhbWVDb250YWluZXIucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICByZXNldFZhcnMoKVxuICB3YWxraW5nTm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoV2Fsa2luZylcbiAgVHZOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShUdilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIC8vICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIC8vIH0sIDEwMDApXG4gIGJhY2tncm91bmRNdXNpYyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWNrZ3JvdW5kX211c2ljXCIsIHsgbG9vcDogLTEgfSlcbiAgYmFja2dyb3VuZE11c2ljLnZvbHVtZSA9IC40XG5cbiAgLy8gY3JlYXRlIGEgYmFja2dyb3VuZCByZWN0YW5nbGVcbiAgb3V0ZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0ZDFjMjBcIikuZHJhd1JlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxuXG4gIC8vIGNyZWF0ZSB0aGUgaW5uZXIgcmVjdGFuZ2xlIGZvciB0aGUgXCJmbG9vclwiIG9mIHRoZSBjYWJpblxuICBpbm5lcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzdlNmE5NFwiKS5kcmF3UmVjdCgxNSwgMTUsIGNhbnZhcy53aWR0aCAtIDMwLCBjYW52YXMuaGVpZ2h0IC0gMzApXG5cbiAgLy8gZGFzaGJvYXJkIGRpc3BsYXlpbmcgdHJhbmNlIGxldmVsIGFuZCBub2lzZSBsZXZlbFxuICBkYXNoYm9hcmRfYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE0MTY3MFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDE0MCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2JnLnggPSAyMDBcbiAgZGFzaGJvYXJkX2JnLnkgPSAzMFxuICBkYXNoYm9hcmRfYmcuc2V0Qm91bmRzKDAsIDAsIDQwMCwgMTIwKVxuXG4gIGRhc2hib2FyZF9mZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzkzY2RiXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDM4MCwgMTIwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfZmcueCA9IDIxMFxuICBkYXNoYm9hcmRfZmcueSA9IDQwXG5cblxuICAvLyBtZXRyaWNzIHRleHQgbGFiZWxzXG4gIHRyYW5jZWxhYmVsLnggPSAyMjVcbiAgdHJhbmNlbGFiZWwueSA9IDc1XG4gIHRyYW5jZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGFiZWwueCA9IDIyNVxuICBub2lzZWxhYmVsLnkgPSAxMTVcbiAgbm9pc2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyBtZXRyaWNzIG51bWJlcnNcbiAgdHJhbmNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgdHJhbmNlbGV2ZWx0ZXh0LnkgPSA3NVxuICB0cmFuY2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsZXZlbHRleHQueCA9IDM2MFxuICBub2lzZWxldmVsdGV4dC55ID0gMTE1XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHN0YXR1c01lc3NhZ2UueCA9IDIyNVxuICBzdGF0dXNNZXNzYWdlLnkgPSAxNDVcbiAgc3RhdHVzTWVzc2FnZS50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuXG4gIC8vIHRyYW5jZSB0YWJsZSFcbiAgdHJhbmNldGFibGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI2JkZjJlMlwiKS5kcmF3UmVjdCgwLCAwLCAyNTAsIDEyMClcbiAgdHJhbmNldGFibGUueCA9IDI3NVxuICB0cmFuY2V0YWJsZS55ID0gMjUwXG4gIHRyYW5jZXRhYmxlLnNldEJvdW5kcygwLCAwLCAyNTAsIDEyMClcblxuICAvLyBwZXJzb24gb24gdHJhbmNlIHRhYmxlIVxuXG4gIC8vIHdvbGYgaW1hZ2VcbiAgd29sZkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwid29sZmltYWdlXCIpKTtcbiAgd29sZkJpdG1hcC54ID0gY2FudmFzLndpZHRoIC0gMTUwXG4gIHdvbGZCaXRtYXAueSA9IGNhbnZhcy5oZWlnaHQgLSAxMDBcbiAgd29sZkJpdG1hcC5zY2FsZVggPSB3b2xmQml0bWFwLnNjYWxlWSA9IC4yXG4gIHdvbGZOb2lzZS5hY3RpdmUgPSB0cnVlXG5cbiAgd2l6Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ3aXphcmRpbWFnZVwiKSlcbiAgd2l6Qml0bWFwLnggPSAyOTVcbiAgd2l6Qml0bWFwLnkgPSAyNzVcbiAgd2l6Qml0bWFwLnNjYWxlWCA9IHdpekJpdG1hcC5zY2FsZVkgPSAuNFxuXG4gIC8vIHR2XG4gIHR2Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ0dmltYWdlXCIpKTtcbiAgdHZCaXRtYXAueCA9IDQwXG4gIHR2Qml0bWFwLnkgPSAxNDBcbiAgdHZCaXRtYXAuc2NhbGVYID0gdHZCaXRtYXAuc2NhbGVZID0gMS41XG5cbiAgLy8gY2hhaXJcbiAgY2hhaXJCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImNoYWlyaW1hZ2VcIikpO1xuICBjaGFpckJpdG1hcC54ID0gMTAwXG4gIGNoYWlyQml0bWFwLnkgPSAxNzBcbiAgY2hhaXJCaXRtYXAuc2NhbGVYID0gY2hhaXJCaXRtYXAuc2NhbGVZID0gLjM1XG5cbiAgdmFyIHBsYXllclNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICBpbWFnZXM6IFtxdWV1ZS5nZXRSZXN1bHQoXCJzcHJpdGVzaGVldGltYWdlXCIpXSxcbiAgICBmcmFtZXM6IHtcbiAgICAgIHdpZHRoOiA0NixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjb3VudDogNDBcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHJ1bjogWzI0LCAzMSwgXCJydW5cIiwgMSAvIDVdXG4gICAgfVxuICB9KVxuICB2YXIgcGxheWVyU3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShwbGF5ZXJTcHJpdGVTaGVldClcbiAgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJTcHJpdGUsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLSAxMDAsIDQ2LCA1MClcblxuICAvLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNvbnRhaW5lciBmb3IgdGhpcyBzY2VuZVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKG91dGVyd2FsbCwgaW5uZXJ3YWxsLCBkYXNoYm9hcmRfYmcsIGRhc2hib2FyZF9mZywgdHJhbmNlbGFiZWwsIG5vaXNlbGFiZWwsIC8qdHJhbmNlbGV2ZWx0ZXh0LCovIG5vaXNlbGV2ZWx0ZXh0LCBzdGF0dXNNZXNzYWdlLCB0cmFuY2V0YWJsZSwgd2l6Qml0bWFwLCB3b2xmQml0bWFwLCB0dkJpdG1hcCwgY2hhaXJCaXRtYXAsIHBsYXllclNwcml0ZSlcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcbiAgdHJhbmNlUHJvZ3Jlc3MgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIGZhbHNlLCAzNjAsIDUwLCAyMjAsIDQwKVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKHRyYW5jZVByb2dyZXNzLm91dGVyQmFyLCB0cmFuY2VQcm9ncmVzcy5pbm5lckJhcilcbiAgc3RhZ2UuYWRkQ2hpbGQoZ2FtZUNvbnRhaW5lcilcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBpZiAod29sZk5vaXNlLnNvdW5kSW5zdGFuY2UpIHtcbiAgICB3b2xmTm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgfVxuICBUdk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIFR2Tm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgY3JlYXRlanMuVGlja2VyLnJlc2V0KClcbiAgYmFja2dyb3VuZE11c2ljLm11dGVkID0gdHJ1ZVxuICBiYWNrZ3JvdW5kTXVzaWMuZGVzdHJveSgpXG4gIHZhciB5b3VXaW5Tb3VuZCA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJ5b3V3aW5cIilcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdVdvblRleHQueCA9IDM2MFxuICB5b3VXb25UZXh0LnkgPSAxMTVcbiAgeW91V29uVGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgY3JlYXRlanMuVGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxuXG4gIHN0YWdlLmFkZENoaWxkKHlvdVdvblRleHQsIHBsYXlBZ2FpblRleHQpXG5cbiAgc3RhZ2UudXBkYXRlKClcbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY2FudmFzLm9uY2xpY2sgPSBudWxsXG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheVlvdUxvc3RTY2VuZShsb3NpbmdTb3VuZDogc3RyaW5nKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBpZiAod29sZk5vaXNlLnNvdW5kSW5zdGFuY2UpIHtcbiAgICB3b2xmTm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgfVxuICBUdk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIFR2Tm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgY3JlYXRlanMuVGlja2VyLnJlc2V0KClcbiAgYmFja2dyb3VuZE11c2ljLm11dGVkID0gdHJ1ZVxuICBiYWNrZ3JvdW5kTXVzaWMuZGVzdHJveSgpXG4gIHZhciB5b3VMb3NlU291bmQgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KGxvc2luZ1NvdW5kKVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VMb3N0VGV4dC54ID0gMzYwXG4gIHlvdUxvc3RUZXh0LnkgPSAxMTVcbiAgeW91TG9zdFRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHBsYXlBZ2FpblRleHQueCA9IDMzMFxuICBwbGF5QWdhaW5UZXh0LnkgPSAzMDBcblxuICBzdGFnZS5hZGRDaGlsZCh5b3VMb3N0VGV4dCwgcGxheUFnYWluVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxuICBjYW52YXMub25jbGljayA9ICgpID0+IHtcbiAgICBjYW52YXMub25jbGljayA9IG51bGxcbiAgICBwbGF5R2FtZVNjZW5lKClcbiAgfVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIG91dGVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBpbm5lckJhcjogY3JlYXRlanMuU2hhcGVcbiAgcHJvZ3Jlc3M6IG51bWJlclxuICBzdGFnZT86IGNyZWF0ZWpzLlN0YWdlXG4gIHJlbW92ZU9uTG9hZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihzdGFnZT86IGNyZWF0ZWpzLlN0YWdlLCByZW1vdmVPbkxvYWQ/OiBib29sZWFuLCB4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB3aWR0aD86IG51bWJlciwgaGVpZ2h0PzogbnVtYmVyKSB7XG4gICAgdGhpcy5vdXRlckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgdGhpcy5pbm5lckJhciA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpXG4gICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICB3aWR0aCA9IDQwMFxuICAgICAgaGVpZ2h0ID0gNjBcbiAgICB9XG4gICAgaWYgKCF4IHx8ICF5KSB7XG4gICAgICB4ID0gMjAwXG4gICAgICB5ID0gMjcwXG4gICAgfVxuICAgIHRoaXMub3V0ZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE4MTgxOFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCB3aWR0aCwgaGVpZ2h0LCA1LCA1LCA1LCA1KVxuICAgIHRoaXMub3V0ZXJCYXIueCA9IHhcbiAgICB0aGlzLm91dGVyQmFyLnkgPSB5XG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBpZiAoc3RhZ2UpIHtcbiAgICAgIHN0YWdlLmFkZENoaWxkKHRoaXMub3V0ZXJCYXIpXG4gICAgfVxuXG4gICAgdGhpcy5pbm5lckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMzI3ZmE4XCIpLmRyYXdSZWN0KDAsIDAsIHdpZHRoIC0gMjAsIGhlaWdodCAtIDIwKVxuICAgIHRoaXMuaW5uZXJCYXIueCA9IHggKyAxMFxuICAgIHRoaXMuaW5uZXJCYXIueSA9IHkgKyAxMFxuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuXG4gICAgaWYgKHN0YWdlKSB7XG4gICAgICBzdGFnZS5hZGRDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgIH1cbiAgICB0aGlzLnN0YWdlID0gc3RhZ2VcbiAgICB0aGlzLnJlbW92ZU9uTG9hZCA9IHJlbW92ZU9uTG9hZCB8fCBmYWxzZVxuICB9XG4gIGhhbmRsZVByb2dyZXNzKGV2ZW50OiBPYmplY3QpIHtcbiAgICB2YXIgcHJvZ3Jlc3NFdmVudCA9IDxjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50PmV2ZW50XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzRXZlbnQucHJvZ3Jlc3NcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZS51cGRhdGUoKVxuICAgIH1cbiAgfVxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3RhZ2UpIHtcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMub3V0ZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS5yZW1vdmVDaGlsZCh0aGlzLmlubmVyQmFyKVxuICAgICAgdGhpcy5zdGFnZSEudXBkYXRlKClcbiAgICAgIHRoaXMuc3RhZ2UgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbiAgaGFuZGxlQ29tcGxldGUoZXZlbnQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLnJlbW92ZU9uTG9hZCkge1xuICAgICAgdGhpcy5yZW1vdmUoKVxuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSBcIi4vcHJvZ3Jlc3NiYXJcIlxuZXhwb3J0IGxldCB3b2xmU291bmQ6IHN0cmluZyA9IFwid29sZlwiXG5leHBvcnQgbGV0IG91dHNpZGVTb3VuZDogc3RyaW5nID0gXCJvdXRzaWRlXCJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkU291bmRzKHF1ZXVlOiBjcmVhdGVqcy5Mb2FkUXVldWUsIG5leHQ6ICgpID0+IHZvaWQsIHByb2dyZXNzQmFyPzogUHJvZ3Jlc3NCYXIpIHtcbiAgcXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbXCJtcDNcIl07XG4gIGlmIChwcm9ncmVzc0Jhcikge1xuICAgIHF1ZXVlLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXIuaGFuZGxlUHJvZ3Jlc3MsIHByb2dyZXNzQmFyKVxuICB9XG4gIHF1ZXVlLm9uKFwiY29tcGxldGVcIiwge1xuICAgIGhhbmRsZUV2ZW50OiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChwcm9ncmVzc0Jhcikge1xuICAgICAgICBxdWV1ZS5vZmYoXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcylcbiAgICAgICAgcHJvZ3Jlc3NCYXIuaGFuZGxlQ29tcGxldGUoZXZlbnQpXG4gICAgICB9XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH0pXG4gIHF1ZXVlLmxvYWRNYW5pZmVzdChbXG4gICAgeyBpZDogXCJ3b2xmXCIsIHNyYzogXCJyZXMvd29sZi53YXZcIiB9LFxuICAgIHsgaWQ6IFwib3V0c2lkZVwiLCBzcmM6IFwicmVzL291dHNpZGUubXAzXCIgfSxcbiAgICB7IGlkOiBcImludHJvY2FiaW5cIiwgc3JjOiBcInJlcy9pbnRyb2NhYmluLmpwZ1wiIH0sXG4gICAgeyBpZDogXCJ0dm5vaXNlXCIsIHNyYzogXCJyZXMvdHZzb3VuZC5tcDNcIiB9LFxuICAgIHsgaWQ6IFwidHZpbWFnZVwiLCBzcmM6IFwicmVzL3R2aW1hZ2UucG5nXCIgfSxcbiAgICB7IGlkOiBcInNwcml0ZXNoZWV0aW1hZ2VcIiwgc3JjOiBcInJlcy9wbGF5ZXItc3ByaXRlbWFwLXY5LXJlZHBhbnRzLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJjaGFpcmltYWdlXCIsIHNyYzogXCJyZXMvY2hhaXIucG5nXCIgfSxcbiAgICB7IGlkOiBcIndvbGZpbWFnZVwiLCBzcmM6IFwicmVzL3dvbGYucG5nXCIgfSxcbiAgICB7IGlkOiBcInlvdWxvc2V3b2xmXCIsIHNyYzogXCJyZXMveW91X2xvc2Vfd29sZi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwieW91bG9zZXR2XCIsIHNyYzogXCJyZXMveW91X2xvc2VfdHYubXAzXCIgfSxcbiAgICB7IGlkOiBcInlvdXdpblwiLCBzcmM6IFwicmVzL3lvdV93aW4ubXAzXCIgfSxcbiAgICB7IGlkOiBcIndpemFyZGltYWdlXCIsIHNyYzogXCJyZXMvd2l6YXJkLnBuZ1wiIH0sXG4gICAgeyBpZDogXCJiYWNrZ3JvdW5kX211c2ljXCIsIHNyYzogXCJyZXMvYmFja2dyb3VuZF9tdXNpYy5tcDNcIiB9XG4gIF0pXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=