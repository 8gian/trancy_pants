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
var titleText3 = new createjs.Text("Keep your cabin quiet. If it gets too loud, the trance will be interrupted,\nor worse, you'll even wake the magician.\nYour trusty magic wolf Tiesto and your phantom TV \ncan both make a lot of noise.", "20px Arial", "#fffdfa");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJ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IiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IFR2Tm9pc2U6IFBsYXllck5vaXNlXG5sZXQgd2Fsa2luZ05vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdE5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdGl0bGVUZXh0MSA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGFyZSB0aGUgZmFtb3VzIERyLiBUcmFuY3kgUGFudHMsIE0uRC5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDIgPSBuZXcgY3JlYXRlanMuVGV4dChcIldpdGggeW91ciBoZWxwLCBidWRkaW5nIG1hZ2ljaWFucyBjYW4gYWR2YW5jZVxcbnRoZWlyIHN0dWRpZXMgYnkgZW50ZXJpbmcgYSBkZWVwIHRyYW5jZS5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDMgPSBuZXcgY3JlYXRlanMuVGV4dChcIktlZXAgeW91ciBjYWJpbiBxdWlldC4gSWYgaXQgZ2V0cyB0b28gbG91ZCwgdGhlIHRyYW5jZSB3aWxsIGJlIGludGVycnVwdGVkLFxcbm9yIHdvcnNlLCB5b3UnbGwgZXZlbiB3YWtlIHRoZSBtYWdpY2lhbi5cXG5Zb3VyIHRydXN0eSBtYWdpYyB3b2xmIFRpZXN0byBhbmQgeW91ciBwaGFudG9tIFRWIFxcbmNhbiBib3RoIG1ha2UgYSBsb3Qgb2Ygbm9pc2UuXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIilcbnZhciB0aXRsZVRleHQ0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJEb24ndCBmb3JnZXQgdG8gd2FrZSB0aGVtIHVwIGF0IHRoZSBlbmQsXFxub3IgdGhleSdsbCBzbGVlcCBmb3JldmVyLlwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0NSA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiQ2xpY2sgdG8gYmVnaW4hXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIik7XG5jb25zdCBmYWxsaW5nSW50b0FUcmFuY2VNZXNzYWdlID0gXCJUaGUgbWFnaWNpYW4gaXMgZmFsbGluZyBpbnRvIGEgdHJhbmNlXCJcbmNvbnN0IHdvbGZBZ2l0YXRlZE9uTWVzc2FnZSA9IFwiVGhlIFRWIGlzIG9uLCBhbmQgVGllc3RvIHNlZW1zIGFnaXRhdGVkXCJcbmNvbnN0IHdvbGZBZ2l0YXRlZE1lc3NhZ2UgPSBcIlRpZXN0byBzZWVtcyBhZ2l0YXRlZFwiXG5jb25zdCB3b2xmUXVpZXRlZE1lc3NhZ2UgPSBcIllvdSBxdWlldGVkIFRpZXN0b1wiXG5jb25zdCB0dlR1cm5lZE9mZk1lc3NhZ2UgPSBcIllvdSB0dXJuZWQgb2ZmIHRoZSBwaGFudG9tIFRWXCJcbmNvbnN0IHR2VHVybmVkT25NZXNzYWdlID0gXCJZb3UgdHVybmVkIG9uIHRoZSBwaGFudG9tIFRWXCJcbmNvbnN0IHR2T25NZXNzYWdlID0gXCJUaGUgcGhhbnRvbSBUViBpcyBvblwiXG5jb25zdCB0dlR1cm5lZE9uU2VsZk1lc3NhZ2UgPSBcIlRoZSBwaGFudG9tIFRWIHR1cm5lZCBvbiBieSBpdHNlbGYhXCJcbmNvbnN0IHR2T25Xb2xmSG93bGluZ01lc3NhZ2UgPSBcIlRoZSBUViBpcyBvbiwgYW5kIFRpZXN0byBpcyBob3dsaW5nXCJcbmNvbnN0IHR2T25Xb2xmSG93bGluZ0xvdWRseU1lc3NhZ2UgPSBcIlRoZSBUViBpcyBvbiwgYW5kIFRpZXN0byBpcyBob3dsaW5nIGxvdWRseVwiXG5jb25zdCB0dk9uV29sZkhvd2xpbmdHcm93aW5nTWVzc2FnZSA9IFwiVGhlIFRWIGlzIG9uLCBhbmQgVGllc3RvJ3MgaG93bHMgZ3JvdyBsb3VkZXJcIlxuY29uc3Qgd29sZk5vdEFnaXRhdGVkTWVzc2FnZSA9IFwiVGllc3RvIG5vIGxvbmdlciBzZWVtcyBhZ2l0YXRlZFwiXG5jb25zdCB3b2xmU3RhcnRzSG93bGluZ01lc3NhZ2UgPSBcIlRpZXN0byBpcyBzbyBhZ2l0YXRlZCBoZSBzdGFydHMgaG93bGluZ1wiXG5jb25zdCB3b2xmSG93bGluZ01lc3NhZ2UgPSBcIlRpZXN0byBpcyBob3dsaW5nXCJcbmNvbnN0IHdvbGZIb3dsaW5nR3Jvd2luZ01lc3NhZ2UgPSBcIlRpZXN0bydzIGhvd2xzIGdyb3cgbG91ZGVyXCJcbmNvbnN0IHdvbGZIb3dsaW5nTG91ZGx5TWVzc2FnZSA9IFwiVGllc3RvIGlzIGhvd2xpbmcgbG91ZGx5XCJcbmNvbnN0IHRyYW5jZVdha2VVcE1lc3NhZ2UgPSBcIlRoZSBtYWdpY2lhbidzIGluIGEgdHJhbmNlLiBUaW1lIHRvIHdha2UgdGhlbSB1cCFcIlxudmFyIHN0YXR1c01lc3NhZ2UgPSBuZXcgY3JlYXRlanMuVGV4dChmYWxsaW5nSW50b0FUcmFuY2VNZXNzYWdlLCBcIjE2cHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpXG52YXIgdHQxYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0dDRiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHR0NWJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VXb25UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3Ugd29uIVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdUxvc3RUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3UgbG9zdCFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBwbGF5QWdhaW5UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJDbGljayB0byBwbGF5IGFnYWluXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZVJhdGU6IG51bWJlciA9IDAuMDAwM1xudmFyIHRyYW5jZVByb2dyZXNzOiBQcm9ncmVzc0JhclxudmFyIHdhbGtTcGVlZDogbnVtYmVyID0gNzUgLyAxMDAwXG52YXIgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKTtcbnZhciBwbGF5ZXI6IFBsYXllclxudmFyIHdvbGZCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIGNoYWlyQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciB3aXpCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIHR2Qml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbmxldCBiYWNrZ3JvdW5kTXVzaWM6IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZVxuXG5mdW5jdGlvbiBnZXRPYmplY3RCb3VuZHMoKSB7XG4gIHJldHVybiBbY2hhaXJCaXRtYXAuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgdHJhbmNldGFibGUuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgZGFzaGJvYXJkX2JnLmdldFRyYW5zZm9ybWVkQm91bmRzKCldXG59XG5mdW5jdGlvbiBjcm9wQm91bmRzKGJvdW5kczogY3JlYXRlanMuUmVjdGFuZ2xlLCBob3JpejogbnVtYmVyLCB2ZXJ0OiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUoYm91bmRzLnggKyBob3JpeiwgYm91bmRzLnkgKyB2ZXJ0LCBib3VuZHMud2lkdGggLSAyICogaG9yaXosIGJvdW5kcy5oZWlnaHQgLSAyICogdmVydClcbn1cblxuZnVuY3Rpb24gYm91bmRzQ29sbGlkZShvYmoxOiBjcmVhdGVqcy5SZWN0YW5nbGUsIG9iajI6IGNyZWF0ZWpzLlJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICBpZiAob2JqMS54ICsgb2JqMS53aWR0aCA+IG9iajIueCAmJiBvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoKSB7XG4gICAgaWYgKG9iajEueSArIG9iajIuaGVpZ2h0ID4gb2JqMi55ICYmIG9iajEueSA8IG9iajIueSArIG9iajIuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuY2xhc3MgTm9pc2Uge1xuICBub2lzZUxldmVsOiBudW1iZXJcbiAgZHVyYXRpb25NczogbnVtYmVyXG4gIHNvdW5kOiBzdHJpbmdcbiAgY29uc3RydWN0b3Iobm9pc2VMZXZlbDogbnVtYmVyLCBkdXJhdGlvbk1TOiBudW1iZXIsIHNvdW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG4gICAgdGhpcy5kdXJhdGlvbk1zID0gZHVyYXRpb25NU1xuICAgIHRoaXMuc291bmQgPSBzb3VuZFxuICB9XG59XG5cbmNvbnN0IFdvbGYgPSBuZXcgTm9pc2UoMywgMjAwMCwgXCJ3b2xmXCIpXG5jb25zdCBPdXRzaWRlV2luZG93ID0gbmV3IE5vaXNlKDIsIDEwMDAsIFwib3V0c2lkZVwiKVxuY29uc3QgV2Fsa2luZyA9IG5ldyBOb2lzZSgxLCAxMDAwLCBcIndhbGtpbmdcIilcbmNvbnN0IFR2ID0gbmV3IE5vaXNlKDMsIDAsIFwidHZub2lzZVwiKVxuXG5jbGFzcyBUaW1lZE5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25NcykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBXb2xmTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgZGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBzdGFydERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgbWF4RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gM1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICByZXBlYXRBZnRlcjogbnVtYmVyXG4gIGluaXRpYWxTdGFydFRpbWU6IG51bWJlclxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGVuZFRpbWU6IG51bWJlclxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIsIHJlcGVhdEFmdGVyOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5yZXBlYXRBZnRlciA9IHJlcGVhdEFmdGVyXG4gICAgdGhpcy5lbmRUaW1lID0gc3RhcnRUaW1lICsgbi5kdXJhdGlvbk1zXG4gICAgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSB0aGlzLnN0YXJ0RGlzdHJlc3NMZXZlbFxuICAgICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UhLm11dGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMFxuICAgICAgdGhpcy5lbmRUaW1lID0gMFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZSArIHRoaXMuaW5pdGlhbFN0YXJ0VGltZVxuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICB9XG4gICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSAmJiB0aW1lID49IHRoaXMuZW5kVGltZSkge1xuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMucmVwZWF0QWZ0ZXIpIHtcbiAgICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gTWF0aC5taW4odGhpcy5kaXN0cmVzc0xldmVsICsgMSwgdGhpcy5tYXhEaXN0cmVzc0xldmVsKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZSArPSB0aGlzLm5vaXNlLmR1cmF0aW9uTXMgKyB0aGlzLnJlcGVhdEFmdGVyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAodGhpcy5kaXN0cmVzc0xldmVsICsgMSkgLyAodGhpcy5tYXhEaXN0cmVzc0xldmVsICsgMSlcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8IHRoaXMuZW5kVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsICsgdGhpcy5kaXN0cmVzc0xldmVsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgUGxheWVyTm9pc2Uge1xuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZTogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIHN0YXJ0VGltZTogbnVtYmVyID0gMFxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSkge1xuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAgfSlcbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy5zdGFydFRpbWUgPT0gMCkge1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWVcbiAgICAgIH1cbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAxXG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMFxuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlLnZvbHVtZSA9IDBcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG59XG5cbmNsYXNzIFBsYXllciB7XG4gIHNwcml0ZTogY3JlYXRlanMuU3ByaXRlXG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICB3YWxraW5nTGVmdDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nUmlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1VwOiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdEb3duOiBib29sZWFuID0gZmFsc2U7XG4gIG1vdmluZzogYm9vbGVhbiA9IGZhbHNlXG4gIG9uV29sZjogYm9vbGVhbiA9IGZhbHNlXG4gIG9uVHY6IGJvb2xlYW4gPSBmYWxzZVxuICB0aW1lT25UdjogbnVtYmVyID0gMFxuICB3b2xmUXVpZXRlZFRpbWU6IG51bWJlciA9IDBcbiAgd29sZkFnaXRhdGVkVGltZTogbnVtYmVyID0gMFxuICB0aW1lT2ZmVHY6IG51bWJlciA9IDBcbiAgcGhhbnRvbVR2VGltZTogbnVtYmVyID0gMFxuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZTogY3JlYXRlanMuU3ByaXRlLCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcbiAgICB0aGlzLnggPSBzdGFydFhcbiAgICB0aGlzLnkgPSBzdGFydFlcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy55XG4gIH1cbiAgZ2V0Qm91bmRzKCk6IGNyZWF0ZWpzLlJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIGNyb3BCb3VuZHMobmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLCAxNSwgMTApXG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgbGV0IGxhc3RYID0gdGhpcy54XG4gICAgbGV0IGxhc3RZID0gdGhpcy55XG4gICAgbGV0IGhvcml6ID0gMFxuICAgIGxldCB2ZXJ0ID0gMFxuICAgIGlmICh0aGlzLndhbGtpbmdMZWZ0KSB7XG4gICAgICBob3JpeiAtPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdSaWdodCkge1xuICAgICAgaG9yaXogKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nRG93bikge1xuICAgICAgdmVydCArPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdVcCkge1xuICAgICAgdmVydCAtPSAxXG4gICAgfVxuICAgIGlmIChNYXRoLmFicyh2ZXJ0KSA+IDAgfHwgTWF0aC5hYnMoaG9yaXopID4gMCkge1xuICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kUGxheShcInJ1blwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgICB0aGlzLnNwcml0ZS5nb3RvQW5kU3RvcCgwKVxuICAgIH1cbiAgICBsZXQgc3BlZWQgPSB0aGlzLm1vdmluZyA/ICgxIC8gTWF0aC5zcXJ0KE1hdGgucG93KGhvcml6LCAyKSArIE1hdGgucG93KHZlcnQsIDIpKSkgKiB3YWxrU3BlZWQgOiAwXG4gICAgdGhpcy54ICs9IGhvcml6ICogc3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcbiAgICB0aGlzLnkgKz0gdmVydCAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG5cbiAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhbGtpbmdOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLngsIGNhbnZhcy53aWR0aCAtIDE1IC0gdGhpcy53aWR0aCkpXG4gICAgdGhpcy55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy55LCBjYW52YXMuaGVpZ2h0IC0gMTUgLSB0aGlzLmhlaWdodCkpXG4gICAgaWYgKHRoaXMuZWplY3RTcHJpdGVGcm9tT2JqZWN0cygpKSB7XG4gICAgICB0aGlzLnggPSBsYXN0WFxuICAgICAgdGhpcy55ID0gbGFzdFlcbiAgICB9XG5cbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueSA9IHRoaXMueVxuICAgIGlmICh0aGlzLm9uVHYpIHtcbiAgICAgIHRoaXMudGltZU9uVHYgKz0gdGltZSAtIGxhc3RUaWNrVGltZVxuICAgICAgdGhpcy50aW1lT2ZmVHYgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnRpbWVPZmZUdiA9PSAwKSB7XG4gICAgICAgIHRoaXMudGltZU9mZlR2ID0gdGltZVxuICAgICAgfVxuICAgICAgdGhpcy50aW1lT25UdiA9IDBcbiAgICB9XG4gICAgdGhpcy5wZXJmb3JtSW50ZXJhY3Rpb25zKHRpbWUpXG4gICAgaWYgKHRoaXMub25UdiAmJiB0aGlzLnRpbWVPblR2ID4gMzAwMCkge1xuICAgICAgd29sZk5vaXNlLmFjdGl2ZSA9IHRydWVcbiAgICAgIHRoaXMud29sZkFnaXRhdGVkVGltZSA9IHRpbWVcbiAgICB9XG4gICAgaWYgKHRoaXMub25Xb2xmKSB7XG4gICAgICB0aGlzLndvbGZRdWlldGVkVGltZSA9IHRpbWVcbiAgICB9XG4gIH1cbiAgZWplY3RTcHJpdGVGcm9tT2JqZWN0cygpOiBib29sZWFuIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpXG4gICAgY29uc3Qgb2JqZWN0cyA9IGdldE9iamVjdEJvdW5kcygpXG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3RzKSB7XG4gICAgICBpZiAoYm91bmRzQ29sbGlkZShib3VuZHMsIG9iamVjdHNbaV0pKSB7XG4gICAgICAgIGlmIChpID09IFwiMFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgY2hhaXJcIilcbiAgICAgICAgfSBlbHNlIGlmIChpID09IFwiMVwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgdGFibGVcIilcbiAgICAgICAgfSBlbHNlIGlmIChpID09IFwiMlwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgZGFzaGJvYXJkXCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJib3VuZHMgXCIgKyBvYmplY3RzW2ldKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBwZXJmb3JtSW50ZXJhY3Rpb25zKHRpbWU6IG51bWJlcikge1xuICAgIHZhciBuZXdPbldvbGYgPSBib3VuZHNDb2xsaWRlKHRoaXMuZ2V0Qm91bmRzKCksIGNyb3BCb3VuZHMod29sZkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCAxNSwgMTEpKVxuICAgIHZhciBuZXdPblR2ID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCB0dkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpKVxuICAgIGlmIChuZXdPblR2ICYmICF0aGlzLm9uVHYpIHtcbiAgICAgIFR2Tm9pc2UuYWN0aXZlID0gIVR2Tm9pc2UuYWN0aXZlXG4gICAgfVxuICAgIGlmIChuZXdPbldvbGYgJiYgdGhpcy5vbldvbGYpIHtcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCFUdk5vaXNlLmFjdGl2ZSkge1xuICAgICAgICAgIHNlbGYucGhhbnRvbVR2VGltZSA9IHRpbWUgKyA0MDAwXG4gICAgICAgICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sIDQwMDApXG4gICAgfVxuICAgIHRoaXMub25Xb2xmID0gbmV3T25Xb2xmXG4gICAgdGhpcy5vblR2ID0gbmV3T25UdlxuICB9XG4gIHBpY2tCZXN0TWVzc2FnZSh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAodGltZSA+IDIwMDAgJiYgdGltZSA8PSB0aGlzLndvbGZRdWlldGVkVGltZSArIDIwMDApIHtcbiAgICAgIHJldHVybiB3b2xmUXVpZXRlZE1lc3NhZ2VcbiAgICB9XG4gICAgaWYgKHRoaXMub25UdiAmJiB0aGlzLnRpbWVPblR2IDw9IDEwMDApIHtcbiAgICAgIGlmIChUdk5vaXNlLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gdHZUdXJuZWRPbk1lc3NhZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0dlR1cm5lZE9mZk1lc3NhZ2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF3b2xmTm9pc2UuYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy50aW1lT25UdiA+IDEwMDAgJiYgdGhpcy50aW1lT25UdiA8PSA0MDAwKSB7XG4gICAgICAgIGlmIChUdk5vaXNlLmFjdGl2ZSkge1xuICAgICAgICAgIHJldHVybiB3b2xmQWdpdGF0ZWRPbk1lc3NhZ2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gd29sZkFnaXRhdGVkTWVzc2FnZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGltZSA+IDIwMDAgJiYgdGltZSA8IHRoaXMudGltZU9mZlR2ICsgMjAwMCkge1xuICAgICAgICByZXR1cm4gd29sZk5vdEFnaXRhdGVkTWVzc2FnZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGltZSA+IDIwMDAgJiYgdGltZSA8IHRoaXMud29sZkFnaXRhdGVkVGltZSArIDIwMDApIHtcbiAgICAgICAgcmV0dXJuIHdvbGZTdGFydHNIb3dsaW5nTWVzc2FnZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZSA+PSB3b2xmTm9pc2Uuc3RhcnRUaW1lICYmIHRpbWUgPD0gd29sZk5vaXNlLmVuZFRpbWUpIHtcbiAgICAgIGlmICh3b2xmTm9pc2UuZGlzdHJlc3NMZXZlbCA9PSB3b2xmTm9pc2Uuc3RhcnREaXN0cmVzc0xldmVsKSB7XG4gICAgICAgIHJldHVybiBUdk5vaXNlLmFjdGl2ZSA/IHR2T25Xb2xmSG93bGluZ01lc3NhZ2UgOiB3b2xmSG93bGluZ01lc3NhZ2VcbiAgICAgIH0gZWxzZSBpZiAod29sZk5vaXNlLmRpc3RyZXNzTGV2ZWwgPT0gd29sZk5vaXNlLm1heERpc3RyZXNzTGV2ZWwpIHtcbiAgICAgICAgcmV0dXJuIFR2Tm9pc2UuYWN0aXZlID8gdHZPbldvbGZIb3dsaW5nTG91ZGx5TWVzc2FnZSA6IHdvbGZIb3dsaW5nTG91ZGx5TWVzc2FnZVxuICAgICAgfVxuICAgICAgcmV0dXJuIFR2Tm9pc2UuYWN0aXZlID8gdHZPbldvbGZIb3dsaW5nR3Jvd2luZ01lc3NhZ2UgOiB3b2xmSG93bGluZ0dyb3dpbmdNZXNzYWdlXG4gICAgfVxuICAgIGlmIChUdk5vaXNlLmFjdGl2ZSAmJiB0aW1lIDwgdGhpcy5waGFudG9tVHZUaW1lICsgMjAwMCkge1xuICAgICAgcmV0dXJuIHR2VHVybmVkT25TZWxmTWVzc2FnZVxuICAgIH1cbiAgICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAgIGlmICh0cmFuY2VMZXZlbCA+PSAxMCkge1xuICAgICAgICByZXR1cm4gdHJhbmNlV2FrZVVwTWVzc2FnZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbGxpbmdJbnRvQVRyYW5jZU1lc3NhZ2VcbiAgICB9XG4gICAgaWYgKFR2Tm9pc2UuYWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHZPbk1lc3NhZ2VcbiAgICB9XG4gICAgcmV0dXJuIFwiXCJcbiAgfVxufVxuXG5sZXQgd29sZk5vaXNlID0gbmV3IFdvbGZOb2lzZShXb2xmLCAyMDAwLCA0MDAwKVxudmFyIGxvZ0l0ID0gMFxuXG5mdW5jdGlvbiByZXNldFZhcnMoKSB7XG4gIHdvbGZOb2lzZSA9IG5ldyBXb2xmTm9pc2UoV29sZiwgMjAwMCwgNDAwMClcbiAgdHJhbmNlTGV2ZWwgPSAwXG4gIG5vaXNlTGV2ZWwgPSAwXG4gIGxhc3ROb2lzZUxldmVsID0gMFxuICBsYXN0VGlja1RpbWUgPSAwXG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICAvLyBsZXQgdGltZUxlZnRvdmVyID0gdGltZSAlIDUwO1xuICAvLyB0aW1lIC09IHRpbWVMZWZ0b3ZlcjtcbiAgdmFyIGRlbHRhVGltZTogbnVtYmVyID0gdGltZSAtIGxhc3RUaWNrVGltZVxuXG4gIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB9XG4gIHBsYXllci51cGRhdGUodGltZSlcbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuXG4gIGlmICh0cmFuY2VMZXZlbCA+PSAxMCkge1xuICAgIHRyYW5jZUxldmVsID0gMTBcbiAgICBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgICAgcGxheVlvdVdvblNjZW5lKClcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgIHBsYXlZb3VMb3N0U2NlbmUoXCJ5b3Vsb3NldHZcIilcbiAgfVxuICBpZiAodHJhbmNlTGV2ZWwgPCAwKSB7XG4gICAgaWYgKFR2Tm9pc2UuYWN0aXZlKSB7XG4gICAgICBwbGF5WW91TG9zdFNjZW5lKFwieW91bG9zZXR2XCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXlZb3VMb3N0U2NlbmUoXCJ5b3Vsb3Nld29sZlwiKVxuICAgIH1cbiAgfVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG4gIHRyYW5jZVByb2dyZXNzLmhhbmRsZVByb2dyZXNzKG5ldyBjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50KHRyYW5jZUxldmVsLCAxMCkpXG4gIHZhciByb3VuZGVkVHJhbmNlTGV2ZWwgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCAqIDEwMCkgLyAxMDApXG4gIGlmIChsb2dJdCAlIDE0ID09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpbWU6IFwiICsgKHRpbWUgLyAxMDAwKSArIFwiLCB0cmFuY2U6IFwiICsgcm91bmRlZFRyYW5jZUxldmVsICsgXCIsIG5vaXNlOiBcIiArIG5vaXNlTGV2ZWwpXG4gIH1cbiAgbG9nSXQrK1xuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuICBzdGF0dXNNZXNzYWdlLnRleHQgPSBwbGF5ZXIucGlja0Jlc3RNZXNzYWdlKHRpbWUpXG4gIHN0YWdlLnVwZGF0ZSgpO1xuICBsYXN0VGlja1RpbWUgPSB0aW1lO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVOb2lzZUxldmVsKHRpbWU6IG51bWJlcikge1xuICBub2lzZUxldmVsID0gMFxuICB3b2xmTm9pc2UudGljayh0aW1lKVxuICBub2lzZUxldmVsICs9IHdhbGtpbmdOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpICsgVHZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpICsgd29sZk5vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSlcbiAgaWYgKG5vaXNlTGV2ZWwgPiBsYXN0Tm9pc2VMZXZlbCkge1xuICAgIGlmIChub2lzZUxldmVsID49IDUpIHtcbiAgICAgIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgICAgIHRyYW5jZUxldmVsIC09IChub2lzZUxldmVsIC0gNSlcbiAgICAgICAgdHJhbmNlTGV2ZWwgPSBNYXRoLmZsb29yKHRyYW5jZUxldmVsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBsYXN0Tm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlFdmVudClcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleUV2ZW50KVxuICB2YXIgcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIHRydWUsIDAsIDAsIDAsIDApXG4gIGxvYWRTb3VuZHMocXVldWUsIHN0YXJ0U2NlbmVzLCBwcm9ncmVzc0Jhcilcbn1cblxuZnVuY3Rpb24gc3RhcnRTY2VuZXMoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcblxuICAvLyBlbGVtZW50cyBvZiB0aGUgdGl0bGUgcGFnZVxuICB2YXIgY2FiaW5CaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImludHJvY2FiaW5cIikpXG4gIGNhYmluQml0bWFwLnggPSBjYWJpbkJpdG1hcC55ID0gMFxuICBjYWJpbkJpdG1hcC5zY2FsZVggPSBjYWJpbkJpdG1hcC5zY2FsZVkgPSAuNDVcbiAgc3RhZ2UuYWRkQ2hpbGQoY2FiaW5CaXRtYXApXG5cblxuICB0dDFiZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNDA2ZTIwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDY2MCwgMjUwLCAxMCwgMTAsIDEwLCAxMClcbiAgdHQxYmcueCA9IDk1XG4gIHR0MWJnLnkgPSA2MFxuXG4gIHR0NGJnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0MDZlMjBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNTYwLCA5NSwgMTAsIDEwLCAxMCwgMTApXG4gIHR0NGJnLnggPSAxOTVcbiAgdHQ0YmcueSA9IDM2MFxuXG4gIHR0NWJnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM2OWI1MzVcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMjQwLCA3NSwgMTAsIDEwLCAxMCwgMTApXG4gIHR0NWJnLnggPSA1MTVcbiAgdHQ1YmcueSA9IDQ4NVxuXG4gIC8vIGludHJvIGdhbWUgdGV4dCAodGV4dCBkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB0aXRsZVRleHQxLnggPSAxMTBcbiAgdGl0bGVUZXh0MS55ID0gMTAwXG4gIHRpdGxlVGV4dDEudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0Mi54ID0gMTEwXG4gIHRpdGxlVGV4dDIueSA9IDE1MFxuICB0aXRsZVRleHQyLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDMueCA9IDExMFxuICB0aXRsZVRleHQzLnkgPSAyMzBcbiAgdGl0bGVUZXh0My50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQ0LnggPSAyMTBcbiAgdGl0bGVUZXh0NC55ID0gNDAwXG4gIHRpdGxlVGV4dDQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0NS54ID0gNTQwXG4gIHRpdGxlVGV4dDUueSA9IDUzMFxuICB0aXRsZVRleHQ1LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vICB3YWl0IGEgaGFsZiBzZWNvbmQgZm9yIHRoZSBjYWJpbiBpbWFnZSB0byBsb2FkIGJlZm9yZSB1cGRhdGluZyB0aGUgc3RhZ2VcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNTAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0dDFiZywgdGl0bGVUZXh0MSlcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCAxMDAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHRpdGxlVGV4dDIpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgMjUwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0aXRsZVRleHQzKVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDQwMDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQ0YmcsIHRpdGxlVGV4dDQpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNjUwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0dDViZywgdGl0bGVUZXh0NSlcbiAgICBzdGFnZS51cGRhdGUoKVxuXG4gICAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBjYW52YXMub25jbGljayA9IG51bGxcbiAgICAgIHBsYXlHYW1lU2NlbmUoKVxuICAgIH1cbiAgfSwgNzUwMClcblxufVxuXG5mdW5jdGlvbiBoYW5kbGVLZXlFdmVudChldmVudDogT2JqZWN0KSB7XG4gIGxldCBrZXlFdmVudCA9IDxLZXlib2FyZEV2ZW50PmV2ZW50O1xuICBpZiAocGxheWVyKSB7XG4gICAgaWYgKGtleUV2ZW50LnR5cGUgPT0gXCJrZXlkb3duXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5dXBcIikge1xuICAgICAgc3dpdGNoIChrZXlFdmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nVXAgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lU2NlbmUoKSB7XG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgZ2FtZUNvbnRhaW5lci5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIHJlc2V0VmFycygpXG4gIHdhbGtpbmdOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShXYWxraW5nKVxuICBUdk5vaXNlID0gbmV3IFBsYXllck5vaXNlKFR2KVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgLy8gICBUdk5vaXNlLmFjdGl2ZSA9IHRydWVcbiAgLy8gfSwgMTAwMClcbiAgYmFja2dyb3VuZE11c2ljID0gY3JlYXRlanMuU291bmQucGxheShcImJhY2tncm91bmRfbXVzaWNcIiwgeyBsb29wOiAtMSB9KVxuICBiYWNrZ3JvdW5kTXVzaWMudm9sdW1lID0gLjRcblxuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICBvdXRlcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzRkMWMyMFwiKS5kcmF3UmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG5cbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgY2FudmFzLndpZHRoIC0gMzAsIGNhbnZhcy5oZWlnaHQgLSAzMClcblxuICAvLyBkYXNoYm9hcmQgZGlzcGxheWluZyB0cmFuY2UgbGV2ZWwgYW5kIG5vaXNlIGxldmVsXG4gIGRhc2hib2FyZF9iZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTQxNjcwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgMTQwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfYmcueCA9IDIwMFxuICBkYXNoYm9hcmRfYmcueSA9IDMwXG4gIGRhc2hib2FyZF9iZy5zZXRCb3VuZHMoMCwgMCwgNDAwLCAxMjApXG5cbiAgZGFzaGJvYXJkX2ZnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzOTNjZGJcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMzgwLCAxMjAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9mZy54ID0gMjEwXG4gIGRhc2hib2FyZF9mZy55ID0gNDBcblxuXG4gIC8vIG1ldHJpY3MgdGV4dCBsYWJlbHNcbiAgdHJhbmNlbGFiZWwueCA9IDIyNVxuICB0cmFuY2VsYWJlbC55ID0gNzVcbiAgdHJhbmNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsYWJlbC54ID0gMjI1XG4gIG5vaXNlbGFiZWwueSA9IDExNVxuICBub2lzZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIG1ldHJpY3MgbnVtYmVyc1xuICB0cmFuY2VsZXZlbHRleHQueCA9IDM2MFxuICB0cmFuY2VsZXZlbHRleHQueSA9IDc1XG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxldmVsdGV4dC54ID0gMzYwXG4gIG5vaXNlbGV2ZWx0ZXh0LnkgPSAxMTVcbiAgbm9pc2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgc3RhdHVzTWVzc2FnZS54ID0gMjI1XG4gIHN0YXR1c01lc3NhZ2UueSA9IDE0NVxuICBzdGF0dXNNZXNzYWdlLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG5cbiAgLy8gdHJhbmNlIHRhYmxlIVxuICB0cmFuY2V0YWJsZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjYmRmMmUyXCIpLmRyYXdSZWN0KDAsIDAsIDI1MCwgMTIwKVxuICB0cmFuY2V0YWJsZS54ID0gMjc1XG4gIHRyYW5jZXRhYmxlLnkgPSAyNTBcbiAgdHJhbmNldGFibGUuc2V0Qm91bmRzKDAsIDAsIDI1MCwgMTIwKVxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG5cbiAgLy8gd29sZiBpbWFnZVxuICB3b2xmQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ3b2xmaW1hZ2VcIikpO1xuICB3b2xmQml0bWFwLnggPSBjYW52YXMud2lkdGggLSAxNTBcbiAgd29sZkJpdG1hcC55ID0gY2FudmFzLmhlaWdodCAtIDEwMFxuICB3b2xmQml0bWFwLnNjYWxlWCA9IHdvbGZCaXRtYXAuc2NhbGVZID0gLjJcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IHRydWVcblxuICB3aXpCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcIndpemFyZGltYWdlXCIpKVxuICB3aXpCaXRtYXAueCA9IDI5NVxuICB3aXpCaXRtYXAueSA9IDI3NVxuICB3aXpCaXRtYXAuc2NhbGVYID0gd2l6Qml0bWFwLnNjYWxlWSA9IC40XG5cbiAgLy8gdHZcbiAgdHZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcInR2aW1hZ2VcIikpO1xuICB0dkJpdG1hcC54ID0gNDBcbiAgdHZCaXRtYXAueSA9IDE0MFxuICB0dkJpdG1hcC5zY2FsZVggPSB0dkJpdG1hcC5zY2FsZVkgPSAxLjVcblxuICAvLyBjaGFpclxuICBjaGFpckJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwiY2hhaXJpbWFnZVwiKSk7XG4gIGNoYWlyQml0bWFwLnggPSAxMDBcbiAgY2hhaXJCaXRtYXAueSA9IDE3MFxuICBjaGFpckJpdG1hcC5zY2FsZVggPSBjaGFpckJpdG1hcC5zY2FsZVkgPSAuMzVcblxuICB2YXIgcGxheWVyU3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgIGltYWdlczogW3F1ZXVlLmdldFJlc3VsdChcInNwcml0ZXNoZWV0aW1hZ2VcIildLFxuICAgIGZyYW1lczoge1xuICAgICAgd2lkdGg6IDQ2LFxuICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgIGNvdW50OiA0MFxuICAgIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgcnVuOiBbMjQsIDMxLCBcInJ1blwiLCAxIC8gNV1cbiAgICB9XG4gIH0pXG4gIHZhciBwbGF5ZXJTcHJpdGUgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHBsYXllclNwcml0ZVNoZWV0KVxuICBwbGF5ZXIgPSBuZXcgUGxheWVyKHBsYXllclNwcml0ZSwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAtIDEwMCwgNDYsIDUwKVxuXG4gIC8vIGFkZCBlbGVtZW50cyB0byB0aGUgY29udGFpbmVyIGZvciB0aGlzIHNjZW5lXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQob3V0ZXJ3YWxsLCBpbm5lcndhbGwsIGRhc2hib2FyZF9iZywgZGFzaGJvYXJkX2ZnLCB0cmFuY2VsYWJlbCwgbm9pc2VsYWJlbCwgLyp0cmFuY2VsZXZlbHRleHQsKi8gbm9pc2VsZXZlbHRleHQsIHN0YXR1c01lc3NhZ2UsIHRyYW5jZXRhYmxlLCB3aXpCaXRtYXAsIHdvbGZCaXRtYXAsIHR2Qml0bWFwLCBjaGFpckJpdG1hcCwgcGxheWVyU3ByaXRlKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgob3V0ZXJ3YWxsLCAwKVxuICBnYW1lQ29udGFpbmVyLnNldENoaWxkSW5kZXgoaW5uZXJ3YWxsLCAxKVxuICB0cmFuY2VQcm9ncmVzcyA9IG5ldyBQcm9ncmVzc0JhcihzdGFnZSwgZmFsc2UsIDM2MCwgNTAsIDIyMCwgNDApXG4gIGdhbWVDb250YWluZXIuYWRkQ2hpbGQodHJhbmNlUHJvZ3Jlc3Mub3V0ZXJCYXIsIHRyYW5jZVByb2dyZXNzLmlubmVyQmFyKVxuICBzdGFnZS5hZGRDaGlsZChnYW1lQ29udGFpbmVyKVxuXG4gIC8vIFVwZGF0ZSBzdGFnZSB3aWxsIHJlbmRlciBuZXh0IGZyYW1lXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcbn1cblxuXG5cbi8vIFwieW91IHdvblwiIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlZb3VXb25TY2VuZSgpIHtcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIGlmICh3b2xmTm9pc2Uuc291bmRJbnN0YW5jZSkge1xuICAgIHdvbGZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICB9XG4gIFR2Tm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgVHZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICBjcmVhdGVqcy5UaWNrZXIucmVzZXQoKVxuICBiYWNrZ3JvdW5kTXVzaWMubXV0ZWQgPSB0cnVlXG4gIGJhY2tncm91bmRNdXNpYy5kZXN0cm95KClcbiAgdmFyIHlvdVdpblNvdW5kID0gY3JlYXRlanMuU291bmQucGxheShcInlvdXdpblwiKVxuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIC8vIHBsYWNlIHNvbWUgXCJ5b3Ugd29uIVwiIHRleHQgb24gdGhlIHNjcmVlbiAoZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgeW91V29uVGV4dC54ID0gMzYwXG4gIHlvdVdvblRleHQueSA9IDExNVxuICB5b3VXb25UZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG5cbiAgc3RhZ2UuYWRkQ2hpbGQoeW91V29uVGV4dCwgcGxheUFnYWluVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxuICBjYW52YXMub25jbGljayA9ICgpID0+IHtcbiAgICBjYW52YXMub25jbGljayA9IG51bGxcbiAgICBwbGF5R2FtZVNjZW5lKClcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5WW91TG9zdFNjZW5lKGxvc2luZ1NvdW5kOiBzdHJpbmcpIHtcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIGlmICh3b2xmTm9pc2Uuc291bmRJbnN0YW5jZSkge1xuICAgIHdvbGZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICB9XG4gIFR2Tm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgVHZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICBjcmVhdGVqcy5UaWNrZXIucmVzZXQoKVxuICBiYWNrZ3JvdW5kTXVzaWMubXV0ZWQgPSB0cnVlXG4gIGJhY2tncm91bmRNdXNpYy5kZXN0cm95KClcbiAgdmFyIHlvdUxvc2VTb3VuZCA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkobG9zaW5nU291bmQpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdUxvc3RUZXh0LnggPSAzNjBcbiAgeW91TG9zdFRleHQueSA9IDExNVxuICB5b3VMb3N0VGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgcGxheUFnYWluVGV4dC54ID0gMzMwXG4gIHBsYXlBZ2FpblRleHQueSA9IDMwMFxuXG4gIHN0YWdlLmFkZENoaWxkKHlvdUxvc3RUZXh0LCBwbGF5QWdhaW5UZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNhbnZhcy5vbmNsaWNrID0gbnVsbFxuICAgIHBsYXlHYW1lU2NlbmUoKVxuICB9XG59XG5cbi8vIFwieW91IGxvc3RcIiBwYWdlIGZ1bmN0aW9uXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGluaXQoKVxufVxuIiwiZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgb3V0ZXJCYXI6IGNyZWF0ZWpzLlNoYXBlXG4gIGlubmVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBwcm9ncmVzczogbnVtYmVyXG4gIHN0YWdlPzogY3JlYXRlanMuU3RhZ2VcbiAgcmVtb3ZlT25Mb2FkOiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKHN0YWdlPzogY3JlYXRlanMuU3RhZ2UsIHJlbW92ZU9uTG9hZD86IGJvb2xlYW4sIHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHdpZHRoPzogbnVtYmVyLCBoZWlnaHQ/OiBudW1iZXIpIHtcbiAgICB0aGlzLm91dGVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICB0aGlzLmlubmVyQmFyID0gbmV3IGNyZWF0ZWpzLlNoYXBlKClcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICAgIHdpZHRoID0gNDAwXG4gICAgICBoZWlnaHQgPSA2MFxuICAgIH1cbiAgICBpZiAoIXggfHwgIXkpIHtcbiAgICAgIHggPSAyMDBcbiAgICAgIHkgPSAyNzBcbiAgICB9XG4gICAgdGhpcy5vdXRlckJhci5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTgxODE4XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIHdpZHRoLCBoZWlnaHQsIDUsIDUsIDUsIDUpXG4gICAgdGhpcy5vdXRlckJhci54ID0geFxuICAgIHRoaXMub3V0ZXJCYXIueSA9IHlcbiAgICB0aGlzLnByb2dyZXNzID0gMFxuICAgIGlmIChzdGFnZSkge1xuICAgICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICB9XG5cbiAgICB0aGlzLmlubmVyQmFyLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzMjdmYThcIikuZHJhd1JlY3QoMCwgMCwgd2lkdGggLSAyMCwgaGVpZ2h0IC0gMjApXG4gICAgdGhpcy5pbm5lckJhci54ID0geCArIDEwXG4gICAgdGhpcy5pbm5lckJhci55ID0geSArIDEwXG4gICAgdGhpcy5pbm5lckJhci5zY2FsZVggPSB0aGlzLnByb2dyZXNzXG5cbiAgICBpZiAoc3RhZ2UpIHtcbiAgICAgIHN0YWdlLmFkZENoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgfVxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZVxuICAgIHRoaXMucmVtb3ZlT25Mb2FkID0gcmVtb3ZlT25Mb2FkIHx8IGZhbHNlXG4gIH1cbiAgaGFuZGxlUHJvZ3Jlc3MoZXZlbnQ6IE9iamVjdCkge1xuICAgIHZhciBwcm9ncmVzc0V2ZW50ID0gPGNyZWF0ZWpzLlByb2dyZXNzRXZlbnQ+ZXZlbnRcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NFdmVudC5wcm9ncmVzc1xuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuICAgIGlmICh0aGlzLnN0YWdlKSB7XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZSgpXG4gICAgfVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICAgICAgdGhpcy5zdGFnZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuICBoYW5kbGVDb21wbGV0ZShldmVudDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlT25Mb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5leHBvcnQgbGV0IHdvbGZTb3VuZDogc3RyaW5nID0gXCJ3b2xmXCJcbmV4cG9ydCBsZXQgb3V0c2lkZVNvdW5kOiBzdHJpbmcgPSBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTb3VuZHMocXVldWU6IGNyZWF0ZWpzLkxvYWRRdWV1ZSwgbmV4dDogKCkgPT4gdm9pZCwgcHJvZ3Jlc3NCYXI/OiBQcm9ncmVzc0Jhcikge1xuICBxdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFtcIm1wM1wiXTtcbiAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgcXVldWUub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcywgcHJvZ3Jlc3NCYXIpXG4gIH1cbiAgcXVldWUub24oXCJjb21wbGV0ZVwiLCB7XG4gICAgaGFuZGxlRXZlbnQ6IChldmVudCkgPT4ge1xuICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgIHF1ZXVlLm9mZihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzKVxuICAgICAgICBwcm9ncmVzc0Jhci5oYW5kbGVDb21wbGV0ZShldmVudClcbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH1cbiAgfSlcbiAgcXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICB7IGlkOiBcIndvbGZcIiwgc3JjOiBcInJlcy93b2xmLndhdlwiIH0sXG4gICAgeyBpZDogXCJvdXRzaWRlXCIsIHNyYzogXCJyZXMvb3V0c2lkZS5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiaW50cm9jYWJpblwiLCBzcmM6IFwicmVzL2ludHJvY2FiaW4uanBnXCIgfSxcbiAgICB7IGlkOiBcInR2bm9pc2VcIiwgc3JjOiBcInJlcy90dnNvdW5kLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ0dmltYWdlXCIsIHNyYzogXCJyZXMvdHZpbWFnZS5wbmdcIiB9LFxuICAgIHsgaWQ6IFwic3ByaXRlc2hlZXRpbWFnZVwiLCBzcmM6IFwicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCIgfSxcbiAgICB7IGlkOiBcImNoYWlyaW1hZ2VcIiwgc3JjOiBcInJlcy9jaGFpci5wbmdcIiB9LFxuICAgIHsgaWQ6IFwid29sZmltYWdlXCIsIHNyYzogXCJyZXMvd29sZi5wbmdcIiB9LFxuICAgIHsgaWQ6IFwieW91bG9zZXdvbGZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ5b3Vsb3NldHZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV90di5tcDNcIiB9LFxuICAgIHsgaWQ6IFwieW91d2luXCIsIHNyYzogXCJyZXMveW91X3dpbi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwid2l6YXJkaW1hZ2VcIiwgc3JjOiBcInJlcy93aXphcmQucG5nXCIgfSxcbiAgICB7IGlkOiBcImJhY2tncm91bmRfbXVzaWNcIiwgc3JjOiBcInJlcy9iYWNrZ3JvdW5kX211c2ljLm1wM1wiIH1cbiAgXSlcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==