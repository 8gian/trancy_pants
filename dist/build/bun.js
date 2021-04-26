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
var playAgainText = new createjs.Text("Click to play again", "20px Arial", "#bdbef2");
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
        var newOnWolf = boundsCollide(this.getBounds(), cropBounds(wolfBitmap.getTransformedBounds(), 15, 11));
        var newOnTv = boundsCollide(this.getBounds(), tvBitmap.getTransformedBounds());
        if (newOnTv && !this.onTv) {
            TvNoise.active = !TvNoise.active;
        }
        if (newOnWolf && this.onWolf) {
            console.log("hit wolf");
            wolfNoise.active = false;
            setTimeout(() => { TvNoise.active = true; }, 4000);
        }
        this.onWolf = newOnWolf;
        this.onTv = newOnTv;
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
    stage.removeAllChildren();
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
    stage.removeAllChildren();
    gameContainer.removeAllChildren();
    resetVars();
    walkingNoise = new PlayerNoise(Walking);
    TvNoise = new PlayerNoise(Tv);
    // setTimeout(function () {
    //   TvNoise.active = true
    // }, 1000)
    backgroundMusic = createjs.Sound.play("background_music", { loop: true });
    backgroundMusic.volume = .4;
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
        startScenes();
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
        startScenes();
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
        { id: "wolfimage", src: "res/wolf.png" },
        { id: "youlosewolf", src: "res/you_lose_wolf.mp3" },
        { id: "youlosetv", src: "res/you_lose_tv.mp3" },
        { id: "youwin", src: "res/you_win.mp3" },
        { id: "background_music", src: "res/background_music.mp3" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDeEcsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHlGQUF5RixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDdEosSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHVFQUF1RSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDcEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHFFQUFxRSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDbEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMvRSxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMs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O0FBN0JELGdDQTZCQyIsImZpbGUiOiJidWlsZC9idW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nYW1lLnRzXCIpO1xuIiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5pbXBvcnQgeyBsb2FkU291bmRzIH0gZnJvbSBcIi4vc291bmRcIlxubGV0IGNpcmNsZTogY3JlYXRlanMuU2hhcGVcbmxldCBzdGFnZTogY3JlYXRlanMuU3RhZ2VcbmxldCBUdk5vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHdhbGtpbmdOb2lzZTogUGxheWVyTm9pc2VcbmxldCB0cmFuY2VMZXZlbCA9IDBcbmxldCBub2lzZUxldmVsID0gMFxubGV0IGxhc3ROb2lzZUxldmVsID0gMFxubGV0IGxhc3RUaWNrVGltZSA9IDBcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG52YXIgZ2FtZUNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKVxudmFyIG91dGVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGlubmVyd2FsbCA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9iZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIGRhc2hib2FyZF9mZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRpdGxlVGV4dDEgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSBhcmUgdGhlIGZhbW91cyBEci4gVHJhbmN5IFBhbnRzLCBNLkQuXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIilcbnZhciB0aXRsZVRleHQyID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJXaXRoIHlvdXIgaGVscCwgYnVkZGluZyBtYWdpY2lhbnMgY2FuIGFkdmFuY2VcXG50aGVpciBzdHVkaWVzIGJ5IGVudGVyaW5nIGEgZGVlcCB0cmFuY2UuXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIilcbnZhciB0aXRsZVRleHQzID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJLZWVwIHlvdXIgY2FiaW4gcXVpZXQuIElmIGl0IGdldHMgdG9vIGxvdWQgeW91J2xsXFxud2FrZSB0aGUgbWFnaWNpYW4uXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIilcbnZhciB0aXRsZVRleHQ0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJEb24ndCBmb3JnZXQgdG8gd2FrZSB0aGVtIHVwIGF0IHRoZSBlbmQsXFxub3IgdGhleSdsbCBzbGVlcCBmb3JldmVyLlwiLCBcIjMwcHggQXJpYWxcIiwgXCIjZmZmZGZhXCIpXG52YXIgdGl0bGVUZXh0NSA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiQ2xpY2sgdG8gYmVnaW4hXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIik7XG52YXIgdHQxYmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0dDRiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHR0NWJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIlRyYW5jZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJOb2lzZSBsZXZlbDpcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB5b3VXb25UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3Ugd29uIVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdUxvc3RUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJZb3UgbG9zdCFcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBwbGF5QWdhaW5UZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJDbGljayB0byBwbGF5IGFnYWluXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgdHJhbmNlbGV2ZWx0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCIjXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgbm9pc2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2V0YWJsZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHRyYW5jZVJhdGU6IG51bWJlciA9IDAuMDAwM1xudmFyIHdhbGtTcGVlZDogbnVtYmVyID0gNDAgLyAxMDAwXG52YXIgcXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKGZhbHNlKTtcbnZhciBwbGF5ZXI6IFBsYXllclxudmFyIHdvbGZCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIGNoYWlyQml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbnZhciB0dkJpdG1hcDogY3JlYXRlanMuQml0bWFwXG5sZXQgYmFja2dyb3VuZE11c2ljOiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2VcblxuZnVuY3Rpb24gZ2V0T2JqZWN0Qm91bmRzKCkge1xuICByZXR1cm4gW2NoYWlyQml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCksIHRyYW5jZXRhYmxlLmdldFRyYW5zZm9ybWVkQm91bmRzKCksIGRhc2hib2FyZF9iZy5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpXVxufVxuZnVuY3Rpb24gY3JvcEJvdW5kcyhib3VuZHM6IGNyZWF0ZWpzLlJlY3RhbmdsZSwgaG9yaXo6IG51bWJlciwgdmVydDogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKGJvdW5kcy54ICsgaG9yaXosIGJvdW5kcy55ICsgdmVydCwgYm91bmRzLndpZHRoIC0gMiAqIGhvcml6LCBib3VuZHMuaGVpZ2h0IC0gMiAqIHZlcnQpXG59XG5cbmZ1bmN0aW9uIGJvdW5kc0NvbGxpZGUob2JqMTogY3JlYXRlanMuUmVjdGFuZ2xlLCBvYmoyOiBjcmVhdGVqcy5SZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgaWYgKG9iajEueCArIG9iajEud2lkdGggPiBvYmoyLnggJiYgb2JqMS54IDwgb2JqMi54ICsgb2JqMi53aWR0aCkge1xuICAgIGlmIChvYmoxLnkgKyBvYmoyLmhlaWdodCA+IG9iajIueSAmJiBvYmoxLnkgPCBvYmoyLnkgKyBvYmoyLmhlaWdodCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNsYXNzIE5vaXNlIHtcbiAgbm9pc2VMZXZlbDogbnVtYmVyXG4gIGR1cmF0aW9uTXM6IG51bWJlclxuICBzb3VuZDogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKG5vaXNlTGV2ZWw6IG51bWJlciwgZHVyYXRpb25NUzogbnVtYmVyLCBzb3VuZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ub2lzZUxldmVsID0gbm9pc2VMZXZlbFxuICAgIHRoaXMuZHVyYXRpb25NcyA9IGR1cmF0aW9uTVNcbiAgICB0aGlzLnNvdW5kID0gc291bmRcbiAgfVxufVxuXG5jb25zdCBXb2xmID0gbmV3IE5vaXNlKDMsIDIwMDAsIFwid29sZlwiKVxuY29uc3QgT3V0c2lkZVdpbmRvdyA9IG5ldyBOb2lzZSgyLCAxMDAwLCBcIm91dHNpZGVcIilcbmNvbnN0IFdhbGtpbmcgPSBuZXcgTm9pc2UoMSwgMTAwMCwgXCJ3YWxraW5nXCIpXG5jb25zdCBUdiA9IG5ldyBOb2lzZSgzLCAwLCBcInR2bm9pc2VcIilcblxuY2xhc3MgVGltZWROb2lzZSB7XG4gIHN0YXJ0VGltZTogbnVtYmVyXG4gIG5vaXNlOiBOb2lzZVxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlLCBzdGFydFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgfVxuICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCAodGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgV29sZk5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIGRpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgc3RhcnREaXN0cmVzc0xldmVsOiBudW1iZXIgPSAwXG4gIG1heERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDNcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2VcbiAgcmVwZWF0QWZ0ZXI6IG51bWJlclxuICBpbml0aWFsU3RhcnRUaW1lOiBudW1iZXJcbiAgc291bmRJbnN0YW5jZT86IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICBlbmRUaW1lOiBudW1iZXJcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyLCByZXBlYXRBZnRlcjogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICAgIHRoaXMucmVwZWF0QWZ0ZXIgPSByZXBlYXRBZnRlclxuICAgIHRoaXMuZW5kVGltZSA9IHN0YXJ0VGltZSArIG4uZHVyYXRpb25Nc1xuICAgIHRoaXMuaW5pdGlhbFN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gdGhpcy5zdGFydERpc3RyZXNzTGV2ZWxcbiAgICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlIS5tdXRlZCA9IHRydWVcbiAgICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IDBcbiAgICAgIHRoaXMuZW5kVGltZSA9IDBcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUgJiYgIXRoaXMuc3RhcnRUaW1lKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLmluaXRpYWxTdGFydFRpbWVcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgfVxuICAgIGlmICh0aGlzLnNvdW5kSW5zdGFuY2UgJiYgdGltZSA+PSB0aGlzLmVuZFRpbWUpIHtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLnJlcGVhdEFmdGVyKSB7XG4gICAgICAgIHRoaXMuZGlzdHJlc3NMZXZlbCA9IE1hdGgubWluKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEsIHRoaXMubWF4RGlzdHJlc3NMZXZlbClcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgKz0gdGhpcy5ub2lzZS5kdXJhdGlvbk1zICsgdGhpcy5yZXBlYXRBZnRlclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25Nc1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zdGFydFRpbWUgPD0gdGltZSAmJiAhdGhpcy5zb3VuZEluc3RhbmNlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQpXG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gKHRoaXMuZGlzdHJlc3NMZXZlbCArIDEpIC8gKHRoaXMubWF4RGlzdHJlc3NMZXZlbCArIDEpXG4gICAgfVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmIHRpbWUgPCB0aGlzLmVuZFRpbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbCArIHRoaXMuZGlzdHJlc3NMZXZlbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmNsYXNzIFBsYXllck5vaXNlIHtcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U6IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZVxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSkge1xuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAgfSlcbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gMVxuICAgICAgcmV0dXJuIHRoaXMubm9pc2Uubm9pc2VMZXZlbFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvdW5kSW5zdGFuY2Uudm9sdW1lID0gMFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG5cbn1cblxuY2xhc3MgUGxheWVyIHtcbiAgc3ByaXRlOiBjcmVhdGVqcy5TcHJpdGVcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIHdhbGtpbmdMZWZ0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdSaWdodDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nVXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ0Rvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgbW92aW5nOiBib29sZWFuID0gZmFsc2VcbiAgb25Xb2xmOiBib29sZWFuID0gZmFsc2VcbiAgb25UdjogYm9vbGVhbiA9IGZhbHNlXG4gIHRpbWVPblR2OiBudW1iZXIgPSAwXG5cbiAgY29uc3RydWN0b3Ioc3ByaXRlOiBjcmVhdGVqcy5TcHJpdGUsIHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZVxuICAgIHRoaXMueCA9IHN0YXJ0WFxuICAgIHRoaXMueSA9IHN0YXJ0WVxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueFxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnlcbiAgfVxuICBnZXRCb3VuZHMoKTogY3JlYXRlanMuUmVjdGFuZ2xlIHtcbiAgICByZXR1cm4gY3JvcEJvdW5kcyhuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCksIDE1LCAxMClcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICBsZXQgbGFzdFggPSB0aGlzLnhcbiAgICBsZXQgbGFzdFkgPSB0aGlzLnlcbiAgICBsZXQgaG9yaXogPSAwXG4gICAgbGV0IHZlcnQgPSAwXG4gICAgaWYgKHRoaXMud2Fsa2luZ0xlZnQpIHtcbiAgICAgIGhvcml6IC09IDFcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ1JpZ2h0KSB7XG4gICAgICBob3JpeiArPSAxXG4gICAgfVxuICAgIGlmICh0aGlzLndhbGtpbmdEb3duKSB7XG4gICAgICB2ZXJ0ICs9IDFcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ1VwKSB7XG4gICAgICB2ZXJ0IC09IDFcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKHZlcnQpID4gMCB8fCBNYXRoLmFicyhob3JpeikgPiAwKSB7XG4gICAgICB0aGlzLm1vdmluZyA9IHRydWVcbiAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRQbGF5KFwicnVuXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92aW5nID0gZmFsc2VcbiAgICAgIHRoaXMuc3ByaXRlLmdvdG9BbmRTdG9wKDApXG4gICAgfVxuICAgIGxldCBzcGVlZCA9IHRoaXMubW92aW5nID8gKDEgLyBNYXRoLnNxcnQoTWF0aC5wb3coaG9yaXosIDIpICsgTWF0aC5wb3codmVydCwgMikpKSAqIHdhbGtTcGVlZCA6IDBcbiAgICB0aGlzLnggKz0gaG9yaXogKiBzcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuICAgIHRoaXMueSArPSB2ZXJ0ICogc3BlZWQgKiAodGltZSAtIGxhc3RUaWNrVGltZSlcblxuICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgd2Fsa2luZ05vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHRoaXMueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueCwgY2FudmFzLndpZHRoIC0gMTUgLSB0aGlzLndpZHRoKSlcbiAgICB0aGlzLnkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnksIGNhbnZhcy5oZWlnaHQgLSAxNSAtIHRoaXMuaGVpZ2h0KSlcbiAgICBpZiAodGhpcy5lamVjdFNwcml0ZUZyb21PYmplY3RzKCkpIHtcbiAgICAgIHRoaXMueCA9IGxhc3RYXG4gICAgICB0aGlzLnkgPSBsYXN0WVxuICAgIH1cblxuICAgIHRoaXMuc3ByaXRlLnggPSB0aGlzLnhcbiAgICB0aGlzLnNwcml0ZS55ID0gdGhpcy55XG4gICAgaWYgKHRoaXMub25Udikge1xuICAgICAgdGhpcy50aW1lT25UdiArPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZU9uVHYgPSAwXG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUludGVyYWN0aW9ucygpXG4gICAgaWYgKHRoaXMub25UdiAmJiB0aGlzLnRpbWVPblR2ID4gMzAwMCkge1xuICAgICAgd29sZk5vaXNlLmFjdGl2ZSA9IHRydWVcbiAgICB9XG4gIH1cbiAgZWplY3RTcHJpdGVGcm9tT2JqZWN0cygpOiBib29sZWFuIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpXG4gICAgY29uc3Qgb2JqZWN0cyA9IGdldE9iamVjdEJvdW5kcygpXG4gICAgZm9yICh2YXIgaSBpbiBvYmplY3RzKSB7XG4gICAgICBpZiAoYm91bmRzQ29sbGlkZShib3VuZHMsIG9iamVjdHNbaV0pKSB7XG4gICAgICAgIGlmIChpID09IFwiMFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgY2hhaXJcIilcbiAgICAgICAgfSBlbHNlIGlmIChpID09IFwiMVwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgdGFibGVcIilcbiAgICAgICAgfSBlbHNlIGlmIChpID09IFwiMlwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoaXQgZGFzaGJvYXJkXCIpXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJib3VuZHMgXCIgKyBvYmplY3RzW2ldKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBwZXJmb3JtSW50ZXJhY3Rpb25zKCkge1xuICAgIHZhciBuZXdPbldvbGYgPSBib3VuZHNDb2xsaWRlKHRoaXMuZ2V0Qm91bmRzKCksIGNyb3BCb3VuZHMod29sZkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpLCAxNSwgMTEpKVxuICAgIHZhciBuZXdPblR2ID0gYm91bmRzQ29sbGlkZSh0aGlzLmdldEJvdW5kcygpLCB0dkJpdG1hcC5nZXRUcmFuc2Zvcm1lZEJvdW5kcygpKVxuICAgIGlmIChuZXdPblR2ICYmICF0aGlzLm9uVHYpIHtcbiAgICAgIFR2Tm9pc2UuYWN0aXZlID0gIVR2Tm9pc2UuYWN0aXZlXG4gICAgfVxuICAgIGlmIChuZXdPbldvbGYgJiYgdGhpcy5vbldvbGYpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0IHdvbGZcIilcbiAgICAgIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IFR2Tm9pc2UuYWN0aXZlID0gdHJ1ZSB9LCA0MDAwKVxuICAgIH1cbiAgICB0aGlzLm9uV29sZiA9IG5ld09uV29sZlxuICAgIHRoaXMub25UdiA9IG5ld09uVHZcbiAgfVxufVxuXG5sZXQgd29sZk5vaXNlID0gbmV3IFdvbGZOb2lzZShXb2xmLCAyMDAwLCA0MDAwKVxudmFyIGxvZ0l0ID0gMFxuXG5mdW5jdGlvbiByZXNldFZhcnMoKSB7XG4gIHdvbGZOb2lzZSA9IG5ldyBXb2xmTm9pc2UoV29sZiwgMjAwMCwgNDAwMClcbiAgdHJhbmNlTGV2ZWwgPSAwXG4gIG5vaXNlTGV2ZWwgPSAwXG4gIGxhc3ROb2lzZUxldmVsID0gMFxuICBsYXN0VGlja1RpbWUgPSAwXG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKGV2ZW50OiBPYmplY3QpIHtcbiAgbGV0IHRpbWUgPSBjcmVhdGVqcy5UaWNrZXIuZ2V0VGltZSgpO1xuICAvLyBsZXQgdGltZUxlZnRvdmVyID0gdGltZSAlIDUwO1xuICAvLyB0aW1lIC09IHRpbWVMZWZ0b3ZlcjtcbiAgdmFyIGRlbHRhVGltZTogbnVtYmVyID0gdGltZSAtIGxhc3RUaWNrVGltZVxuXG4gIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lKVxuICB9XG4gIHBsYXllci51cGRhdGUodGltZSlcbiAgdXBkYXRlTm9pc2VMZXZlbCh0aW1lKVxuXG4gIGlmICh0cmFuY2VMZXZlbCA+PSAxMCkge1xuICAgIHRyYW5jZUxldmVsID0gMTBcbiAgICBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgICAgcGxheVlvdVdvblNjZW5lKClcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9pc2VMZXZlbCA+PSAxMCkge1xuICAgIHBsYXlZb3VMb3N0U2NlbmUoXCJ5b3Vsb3NldHZcIilcbiAgfVxuICBpZiAodHJhbmNlTGV2ZWwgPCAwKSB7XG4gICAgaWYgKFR2Tm9pc2UuYWN0aXZlKSB7XG4gICAgICBwbGF5WW91TG9zdFNjZW5lKFwieW91bG9zZXR2XCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXlZb3VMb3N0U2NlbmUoXCJ5b3Vsb3Nld29sZlwiKVxuICAgIH1cbiAgfVxuXG4gIC8vIGVuZCBvZiB2YXJpYWJsZSB1cGRhdGVzLCBvbmx5IGRpc3BsYXlzIGJlbG93XG4gIHZhciByb3VuZGVkVHJhbmNlTGV2ZWwgPSAoTWF0aC5yb3VuZCh0cmFuY2VMZXZlbCAqIDEwMCkgLyAxMDApXG4gIGlmIChsb2dJdCAlIDE0ID09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpbWU6IFwiICsgKHRpbWUgLyAxMDAwKSArIFwiLCB0cmFuY2U6IFwiICsgcm91bmRlZFRyYW5jZUxldmVsICsgXCIsIG5vaXNlOiBcIiArIG5vaXNlTGV2ZWwpXG4gIH1cbiAgbG9nSXQrK1xuICB0cmFuY2VsZXZlbHRleHQudGV4dCA9IHJvdW5kZWRUcmFuY2VMZXZlbC50b1N0cmluZygpO1xuICBub2lzZWxldmVsdGV4dC50ZXh0ID0gbm9pc2VMZXZlbC50b1N0cmluZygpO1xuICBzdGFnZS51cGRhdGUoKTtcbiAgbGFzdFRpY2tUaW1lID0gdGltZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpIHtcbiAgbm9pc2VMZXZlbCA9IDBcbiAgd29sZk5vaXNlLnRpY2sodGltZSlcbiAgbm9pc2VMZXZlbCArPSB3YWxraW5nTm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIFR2Tm9pc2UuZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lKSArIHdvbGZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpXG4gIGlmIChub2lzZUxldmVsID4gbGFzdE5vaXNlTGV2ZWwpIHtcbiAgICBpZiAobm9pc2VMZXZlbCA+PSA1KSB7XG4gICAgICBpZiAodHJhbmNlTGV2ZWwgPCAxMCkge1xuICAgICAgICB0cmFuY2VMZXZlbCAtPSAobm9pc2VMZXZlbCAtIDUpXG4gICAgICAgIHRyYW5jZUxldmVsID0gTWF0aC5mbG9vcih0cmFuY2VMZXZlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGFzdE5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRyYW5jZUxldmVsKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gIC8vIGxvb2sgYXQgdGhlIG5vaXNlIGxldmVsXG4gIC8vIGlmIHRoZSBub2lzZSBsZXZlbCBpcyA8IDNcbiAgaWYgKG5vaXNlTGV2ZWwgPCAzKSB7XG4gICAgLy8gaW5jcmVhc2UgdGhlIHRyYW5jZSBsZXZlbCBieSAwLjUgZXZlcnkgMTAwMCBtcyAoMSBzKVxuICAgIHRyYW5jZUxldmVsICs9IHRyYW5jZVJhdGUgKiBkZWx0YVRpbWVcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZGVtb0NhbnZhcycpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RXZlbnQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBoYW5kbGVLZXlFdmVudClcbiAgdmFyIHByb2dyZXNzQmFyID0gbmV3IFByb2dyZXNzQmFyKHN0YWdlLCB0cnVlKVxuICBsb2FkU291bmRzKHF1ZXVlLCBzdGFydFNjZW5lcywgcHJvZ3Jlc3NCYXIpXG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2NlbmVzKCkge1xuICBwbGF5SW50cm9TY2VuZSgpXG59XG5cbi8vIGludHJvIHBhZ2UgZnVuY3Rpb25cbmZ1bmN0aW9uIHBsYXlJbnRyb1NjZW5lKCkge1xuICAvLyBtYWtlIHRoZSBzdGFnZVxuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG5cbiAgLy8gZWxlbWVudHMgb2YgdGhlIHRpdGxlIHBhZ2VcbiAgdmFyIGNhYmluQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJpbnRyb2NhYmluXCIpKVxuICBjYWJpbkJpdG1hcC54ID0gY2FiaW5CaXRtYXAueSA9IDBcbiAgY2FiaW5CaXRtYXAuc2NhbGVYID0gY2FiaW5CaXRtYXAuc2NhbGVZID0gLjQ1XG4gIHN0YWdlLmFkZENoaWxkKGNhYmluQml0bWFwKVxuXG5cbiAgdHQxYmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzQwNmUyMFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA2NjAsIDIzMCwgMTAsIDEwLCAxMCwgMTApXG4gIHR0MWJnLnggPSA5NVxuICB0dDFiZy55ID0gNjBcblxuICB0dDRiZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNDA2ZTIwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDU2MCwgOTUsIDEwLCAxMCwgMTAsIDEwKVxuICB0dDRiZy54ID0gMTk1XG4gIHR0NGJnLnkgPSAzNjBcblxuICB0dDViZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNjliNTM1XCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDI0MCwgNzUsIDEwLCAxMCwgMTAsIDEwKVxuICB0dDViZy54ID0gNTE1XG4gIHR0NWJnLnkgPSA0ODVcblxuICAvLyBpbnRybyBnYW1lIHRleHQgKHRleHQgZGVjbGFyZWQgYXQgdGhlIHRvcClcbiAgdGl0bGVUZXh0MS54ID0gMTEwXG4gIHRpdGxlVGV4dDEueSA9IDEwMFxuICB0aXRsZVRleHQxLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDIueCA9IDExMFxuICB0aXRsZVRleHQyLnkgPSAxNTBcbiAgdGl0bGVUZXh0Mi50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQzLnggPSAxMTBcbiAgdGl0bGVUZXh0My55ID0gMjMwXG4gIHRpdGxlVGV4dDMudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0NC54ID0gMjEwXG4gIHRpdGxlVGV4dDQueSA9IDQwMFxuICB0aXRsZVRleHQ0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDUueCA9IDU0MFxuICB0aXRsZVRleHQ1LnkgPSA1MzBcbiAgdGl0bGVUZXh0NS50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyAgd2FpdCBhIGhhbGYgc2Vjb25kIGZvciB0aGUgY2FiaW4gaW1hZ2UgdG8gbG9hZCBiZWZvcmUgdXBkYXRpbmcgdGhlIHN0YWdlXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDUwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQxYmcsIHRpdGxlVGV4dDEpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgMTAwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0aXRsZVRleHQyKVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDI1MDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodGl0bGVUZXh0MylcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCA0MDAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHR0NGJnLCB0aXRsZVRleHQ0KVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDY1MDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQ1YmcsIHRpdGxlVGV4dDUpXG4gICAgc3RhZ2UudXBkYXRlKClcblxuICAgIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgY2FudmFzLm9uY2xpY2sgPSBudWxsXG4gICAgICBwbGF5R2FtZVNjZW5lKClcbiAgICB9XG4gIH0sIDc1MDApXG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlS2V5RXZlbnQoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQga2V5RXZlbnQgPSA8S2V5Ym9hcmRFdmVudD5ldmVudDtcbiAgaWYgKHBsYXllcikge1xuICAgIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5ZG93blwiKSB7XG4gICAgICBzd2l0Y2ggKGtleUV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiQXJyb3dSaWdodFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nUmlnaHQgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdVcCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5RXZlbnQudHlwZSA9PSBcImtleXVwXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93TGVmdFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nTGVmdCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nRG93biA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZVNjZW5lKCkge1xuICBzdGFnZS5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIGdhbWVDb250YWluZXIucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICByZXNldFZhcnMoKVxuICB3YWxraW5nTm9pc2UgPSBuZXcgUGxheWVyTm9pc2UoV2Fsa2luZylcbiAgVHZOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShUdilcbiAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIC8vICAgVHZOb2lzZS5hY3RpdmUgPSB0cnVlXG4gIC8vIH0sIDEwMDApXG4gIGJhY2tncm91bmRNdXNpYyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJiYWNrZ3JvdW5kX211c2ljXCIsIHsgbG9vcDogdHJ1ZSB9KVxuICBiYWNrZ3JvdW5kTXVzaWMudm9sdW1lID0gLjRcblxuICAvLyBjcmVhdGUgYSBiYWNrZ3JvdW5kIHJlY3RhbmdsZVxuICBvdXRlcndhbGwuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzRkMWMyMFwiKS5kcmF3UmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXG5cbiAgLy8gY3JlYXRlIHRoZSBpbm5lciByZWN0YW5nbGUgZm9yIHRoZSBcImZsb29yXCIgb2YgdGhlIGNhYmluXG4gIGlubmVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjN2U2YTk0XCIpLmRyYXdSZWN0KDE1LCAxNSwgY2FudmFzLndpZHRoIC0gMzAsIGNhbnZhcy5oZWlnaHQgLSAzMClcblxuICAvLyBkYXNoYm9hcmQgZGlzcGxheWluZyB0cmFuY2UgbGV2ZWwgYW5kIG5vaXNlIGxldmVsXG4gIGRhc2hib2FyZF9iZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjMTQxNjcwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDQwMCwgMTIwLCA1LCA1LCA1LCA1KVxuICBkYXNoYm9hcmRfYmcueCA9IDIwMFxuICBkYXNoYm9hcmRfYmcueSA9IDMwXG4gIGRhc2hib2FyZF9iZy5zZXRCb3VuZHMoMCwgMCwgNDAwLCAxMjApXG5cbiAgZGFzaGJvYXJkX2ZnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMzOTNjZGJcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMzgwLCAxMDAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9mZy54ID0gMjEwXG4gIGRhc2hib2FyZF9mZy55ID0gNDBcblxuXG4gIC8vIG1ldHJpY3MgdGV4dCBsYWJlbHNcbiAgdHJhbmNlbGFiZWwueCA9IDIyNVxuICB0cmFuY2VsYWJlbC55ID0gNzVcbiAgdHJhbmNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgbm9pc2VsYWJlbC54ID0gMjI1XG4gIG5vaXNlbGFiZWwueSA9IDExNVxuICBub2lzZWxhYmVsLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vIG1ldHJpY3MgbnVtYmVyc1xuICB0cmFuY2VsZXZlbHRleHQueCA9IDM2MFxuICB0cmFuY2VsZXZlbHRleHQueSA9IDc1XG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxldmVsdGV4dC54ID0gMzYwXG4gIG5vaXNlbGV2ZWx0ZXh0LnkgPSAxMTVcbiAgbm9pc2VsZXZlbHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gdHJhbmNlIHRhYmxlIVxuICB0cmFuY2V0YWJsZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjYmRmMmUyXCIpLmRyYXdSZWN0KDAsIDAsIDI1MCwgMTIwKVxuICB0cmFuY2V0YWJsZS54ID0gMjc1XG4gIHRyYW5jZXRhYmxlLnkgPSAyNTBcbiAgdHJhbmNldGFibGUuc2V0Qm91bmRzKDAsIDAsIDI1MCwgMTIwKVxuXG4gIC8vIHBlcnNvbiBvbiB0cmFuY2UgdGFibGUhXG5cbiAgLy8gd29sZiBpbWFnZVxuICB3b2xmQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ3b2xmaW1hZ2VcIikpO1xuICB3b2xmQml0bWFwLnggPSBjYW52YXMud2lkdGggLSAxNTBcbiAgd29sZkJpdG1hcC55ID0gY2FudmFzLmhlaWdodCAtIDEwMFxuICB3b2xmQml0bWFwLnNjYWxlWCA9IHdvbGZCaXRtYXAuc2NhbGVZID0gLjJcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IHRydWVcblxuICAvLyB0dlxuICB0dkJpdG1hcCA9IG5ldyBjcmVhdGVqcy5CaXRtYXAocXVldWUuZ2V0UmVzdWx0KFwidHZpbWFnZVwiKSk7XG4gIHR2Qml0bWFwLnggPSA0MFxuICB0dkJpdG1hcC55ID0gMTQwXG4gIHR2Qml0bWFwLnNjYWxlWCA9IHR2Qml0bWFwLnNjYWxlWSA9IDEuNVxuXG4gIC8vIGNoYWlyXG4gIGNoYWlyQml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJjaGFpcmltYWdlXCIpKTtcbiAgY2hhaXJCaXRtYXAueCA9IDEwMFxuICBjaGFpckJpdG1hcC55ID0gMTcwXG4gIGNoYWlyQml0bWFwLnNjYWxlWCA9IGNoYWlyQml0bWFwLnNjYWxlWSA9IC4zNVxuXG4gIHZhciBwbGF5ZXJTcHJpdGVTaGVldCA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgaW1hZ2VzOiBbcXVldWUuZ2V0UmVzdWx0KFwic3ByaXRlc2hlZXRpbWFnZVwiKV0sXG4gICAgZnJhbWVzOiB7XG4gICAgICB3aWR0aDogNDYsXG4gICAgICBoZWlnaHQ6IDUwLFxuICAgICAgY291bnQ6IDQwXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBydW46IFsyNCwgMzEsIFwicnVuXCIsIDEgLyA1XVxuICAgIH1cbiAgfSlcbiAgdmFyIHBsYXllclNwcml0ZSA9IG5ldyBjcmVhdGVqcy5TcHJpdGUocGxheWVyU3ByaXRlU2hlZXQpXG4gIHBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyU3ByaXRlLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC0gMTAwLCA0NiwgNTApXG5cbiAgLy8gYWRkIGVsZW1lbnRzIHRvIHRoZSBjb250YWluZXIgZm9yIHRoaXMgc2NlbmVcbiAgZ2FtZUNvbnRhaW5lci5hZGRDaGlsZChvdXRlcndhbGwsIGlubmVyd2FsbCwgZGFzaGJvYXJkX2JnLCBkYXNoYm9hcmRfZmcsIHRyYW5jZWxhYmVsLCBub2lzZWxhYmVsLCB0cmFuY2VsZXZlbHRleHQsIG5vaXNlbGV2ZWx0ZXh0LCB0cmFuY2V0YWJsZSwgd29sZkJpdG1hcCwgdHZCaXRtYXAsIGNoYWlyQml0bWFwLCBwbGF5ZXJTcHJpdGUpXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChvdXRlcndhbGwsIDApXG4gIGdhbWVDb250YWluZXIuc2V0Q2hpbGRJbmRleChpbm5lcndhbGwsIDEpXG4gIHN0YWdlLmFkZENoaWxkKGdhbWVDb250YWluZXIpXG5cbiAgLy8gVXBkYXRlIHN0YWdlIHdpbGwgcmVuZGVyIG5leHQgZnJhbWVcbiAgc3RhZ2UudXBkYXRlKClcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxufVxuXG5cblxuLy8gXCJ5b3Ugd29uXCIgcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheVlvdVdvblNjZW5lKCkge1xuICB3b2xmTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgaWYgKHdvbGZOb2lzZS5zb3VuZEluc3RhbmNlKSB7XG4gICAgd29sZk5vaXNlLnNvdW5kSW5zdGFuY2UubXV0ZWQgPSB0cnVlXG4gIH1cbiAgVHZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBUdk5vaXNlLnNvdW5kSW5zdGFuY2UubXV0ZWQgPSB0cnVlXG4gIGNyZWF0ZWpzLlRpY2tlci5yZXNldCgpXG4gIGJhY2tncm91bmRNdXNpYy5tdXRlZCA9IHRydWVcbiAgYmFja2dyb3VuZE11c2ljLmRlc3Ryb3koKVxuICB2YXIgeW91V2luU291bmQgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KFwieW91d2luXCIpXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VXb25UZXh0LnggPSAzNjBcbiAgeW91V29uVGV4dC55ID0gMTE1XG4gIHlvdVdvblRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIGNyZWF0ZWpzLlRpY2tlci5yZW1vdmVFdmVudExpc3RlbmVyKFwidGlja1wiLCBnYW1lTG9vcClcblxuICBzdGFnZS5hZGRDaGlsZCh5b3VXb25UZXh0LCBwbGF5QWdhaW5UZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNhbnZhcy5vbmNsaWNrID0gbnVsbFxuICAgIHN0YXJ0U2NlbmVzKClcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5WW91TG9zdFNjZW5lKGxvc2luZ1NvdW5kOiBzdHJpbmcpIHtcbiAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIGlmICh3b2xmTm9pc2Uuc291bmRJbnN0YW5jZSkge1xuICAgIHdvbGZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICB9XG4gIFR2Tm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgVHZOb2lzZS5zb3VuZEluc3RhbmNlLm11dGVkID0gdHJ1ZVxuICBjcmVhdGVqcy5UaWNrZXIucmVzZXQoKVxuICBiYWNrZ3JvdW5kTXVzaWMubXV0ZWQgPSB0cnVlXG4gIGJhY2tncm91bmRNdXNpYy5kZXN0cm95KClcbiAgdmFyIHlvdUxvc2VTb3VuZCA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkobG9zaW5nU291bmQpXG4gIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5zdGFnZS5jYW52YXNcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdUxvc3RUZXh0LnggPSAzNjBcbiAgeW91TG9zdFRleHQueSA9IDExNVxuICB5b3VMb3N0VGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgcGxheUFnYWluVGV4dC54ID0gMzMwXG4gIHBsYXlBZ2FpblRleHQueSA9IDMwMFxuXG4gIHN0YWdlLmFkZENoaWxkKHlvdUxvc3RUZXh0LCBwbGF5QWdhaW5UZXh0KVxuXG4gIHN0YWdlLnVwZGF0ZSgpXG4gIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNhbnZhcy5vbmNsaWNrID0gbnVsbFxuICAgIHN0YXJ0U2NlbmVzKClcbiAgfVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIG91dGVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBpbm5lckJhcjogY3JlYXRlanMuU2hhcGVcbiAgcHJvZ3Jlc3M6IG51bWJlclxuICBzdGFnZT86IGNyZWF0ZWpzLlN0YWdlXG4gIHJlbW92ZU9uTG9hZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihzdGFnZTogY3JlYXRlanMuU3RhZ2UsIHJlbW92ZU9uTG9hZDogYm9vbGVhbikge1xuICAgIHRoaXMub3V0ZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMuaW5uZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMub3V0ZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE4MTgxOFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDYwLCA1LCA1LCA1LCA1KVxuICAgIHRoaXMub3V0ZXJCYXIueCA9IDIwMFxuICAgIHRoaXMub3V0ZXJCYXIueSA9IDI3MFxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5vdXRlckJhcilcblxuICAgIHRoaXMuaW5uZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzMyN2ZhOFwiKS5kcmF3UmVjdCgwLCAwLCAzODAsIDQwKVxuICAgIHRoaXMuaW5uZXJCYXIueCA9IDIxMFxuICAgIHRoaXMuaW5uZXJCYXIueSA9IDI4MFxuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2VcbiAgICB0aGlzLnJlbW92ZU9uTG9hZCA9IHJlbW92ZU9uTG9hZFxuICB9XG4gIGhhbmRsZVByb2dyZXNzKGV2ZW50OiBPYmplY3QpIHtcbiAgICB2YXIgcHJvZ3Jlc3NFdmVudCA9IDxjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50PmV2ZW50XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzRXZlbnQucHJvZ3Jlc3NcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcbiAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICAgICAgdGhpcy5zdGFnZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuICBoYW5kbGVDb21wbGV0ZShldmVudDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlT25Mb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5leHBvcnQgbGV0IHdvbGZTb3VuZDogc3RyaW5nID0gXCJ3b2xmXCJcbmV4cG9ydCBsZXQgb3V0c2lkZVNvdW5kOiBzdHJpbmcgPSBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTb3VuZHMocXVldWU6IGNyZWF0ZWpzLkxvYWRRdWV1ZSwgbmV4dDogKCkgPT4gdm9pZCwgcHJvZ3Jlc3NCYXI/OiBQcm9ncmVzc0Jhcikge1xuICBxdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFtcIm1wM1wiXTtcbiAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgcXVldWUub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcywgcHJvZ3Jlc3NCYXIpXG4gIH1cbiAgcXVldWUub24oXCJjb21wbGV0ZVwiLCB7XG4gICAgaGFuZGxlRXZlbnQ6IChldmVudCkgPT4ge1xuICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgIHF1ZXVlLm9mZihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzKVxuICAgICAgICBwcm9ncmVzc0Jhci5oYW5kbGVDb21wbGV0ZShldmVudClcbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH1cbiAgfSlcbiAgcXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICB7IGlkOiBcIndvbGZcIiwgc3JjOiBcInJlcy93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJvdXRzaWRlXCIsIHNyYzogXCJyZXMvb3V0c2lkZS5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiaW50cm9jYWJpblwiLCBzcmM6IFwicmVzL2ludHJvY2FiaW4uanBnXCIgfSxcbiAgICB7IGlkOiBcInR2bm9pc2VcIiwgc3JjOiBcInJlcy90dnNvdW5kLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ0dmltYWdlXCIsIHNyYzogXCJyZXMvdHZpbWFnZS5wbmdcIiB9LFxuICAgIHsgaWQ6IFwic3ByaXRlc2hlZXRpbWFnZVwiLCBzcmM6IFwicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCIgfSxcbiAgICB7IGlkOiBcImNoYWlyaW1hZ2VcIiwgc3JjOiBcInJlcy9jaGFpci5wbmdcIiB9LFxuICAgIHsgaWQ6IFwid29sZmltYWdlXCIsIHNyYzogXCJyZXMvd29sZi5wbmdcIiB9LFxuICAgIHsgaWQ6IFwieW91bG9zZXdvbGZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ5b3Vsb3NldHZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV90di5tcDNcIiB9LFxuICAgIHsgaWQ6IFwieW91d2luXCIsIHNyYzogXCJyZXMveW91X3dpbi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiYmFja2dyb3VuZF9tdXNpY1wiLCBzcmM6IFwicmVzL2JhY2tncm91bmRfbXVzaWMubXAzXCIgfVxuICBdKVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9