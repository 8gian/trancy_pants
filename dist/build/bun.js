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
        { id: "background_music", src: "res/background_music.mp3" }
    ]);
}
exports.loadSounds = loadSounds;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb2dyZXNzYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9zb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsdUZBQTJDO0FBQzNDLHFFQUFvQztBQUNwQyxJQUFJLE1BQXNCO0FBQzFCLElBQUksS0FBcUI7QUFDekIsSUFBSSxPQUFvQjtBQUN4QixJQUFJLFlBQXlCO0FBQzdCLElBQUksV0FBVyxHQUFHLENBQUM7QUFDbkIsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNsQixJQUFJLGNBQWMsR0FBRyxDQUFDO0FBQ3RCLElBQUksWUFBWSxHQUFHLENBQUM7QUFDcEIsSUFBSSxNQUF5QjtBQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDeEcsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHlGQUF5RixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDdEosSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHVFQUF1RSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDcEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLHFFQUFxRSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUM7QUFDbEksSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMvRSxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM5RSxJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMs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QUM7QUE3QkQsZ0NBNkJDIiwiZmlsZSI6ImJ1aWxkL2J1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dhbWUudHNcIik7XG4iLCJpbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gXCIuL3Byb2dyZXNzYmFyXCJcbmltcG9ydCB7IGxvYWRTb3VuZHMgfSBmcm9tIFwiLi9zb3VuZFwiXG5sZXQgY2lyY2xlOiBjcmVhdGVqcy5TaGFwZVxubGV0IHN0YWdlOiBjcmVhdGVqcy5TdGFnZVxubGV0IFR2Tm9pc2U6IFBsYXllck5vaXNlXG5sZXQgd2Fsa2luZ05vaXNlOiBQbGF5ZXJOb2lzZVxubGV0IHRyYW5jZUxldmVsID0gMFxubGV0IG5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdE5vaXNlTGV2ZWwgPSAwXG5sZXQgbGFzdFRpY2tUaW1lID0gMFxubGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbnZhciBnYW1lQ29udGFpbmVyID0gbmV3IGNyZWF0ZWpzLkNvbnRhaW5lcigpXG52YXIgb3V0ZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgaW5uZXJ3YWxsID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2JnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgZGFzaGJvYXJkX2ZnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdGl0bGVUZXh0MSA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiWW91IGFyZSB0aGUgZmFtb3VzIERyLiBUcmFuY3kgUGFudHMsIE0uRC5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDIgPSBuZXcgY3JlYXRlanMuVGV4dChcIldpdGggeW91ciBoZWxwLCBidWRkaW5nIG1hZ2ljaWFucyBjYW4gYWR2YW5jZVxcbnRoZWlyIHN0dWRpZXMgYnkgZW50ZXJpbmcgYSBkZWVwIHRyYW5jZS5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDMgPSBuZXcgY3JlYXRlanMuVGV4dChcIktlZXAgeW91ciBjYWJpbiBxdWlldC4gSWYgaXQgZ2V0cyB0b28gbG91ZCB5b3UnbGxcXG53YWtlIHRoZSBtYWdpY2lhbi5cIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKVxudmFyIHRpdGxlVGV4dDQgPSBuZXcgY3JlYXRlanMuVGV4dChcIkRvbid0IGZvcmdldCB0byB3YWtlIHRoZW0gdXAgYXQgdGhlIGVuZCxcXG5vciB0aGV5J2xsIHNsZWVwIGZvcmV2ZXIuXCIsIFwiMzBweCBBcmlhbFwiLCBcIiNmZmZkZmFcIilcbnZhciB0aXRsZVRleHQ1ID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJDbGljayB0byBiZWdpbiFcIiwgXCIzMHB4IEFyaWFsXCIsIFwiI2ZmZmRmYVwiKTtcbnZhciB0dDFiZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xudmFyIHR0NGJnID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHQ1YmcgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbnZhciB0cmFuY2VsYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiVHJhbmNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIG5vaXNlbGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIk5vaXNlIGxldmVsOlwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHlvdVdvblRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSB3b24hXCIsIFwiMjBweCBBcmlhbFwiLCBcIiNiZGJlZjJcIik7XG52YXIgeW91TG9zdFRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIllvdSBsb3N0IVwiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHBsYXlBZ2FpblRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIkNsaWNrIHRvIHBsYXkgYWdhaW5cIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciB0cmFuY2VsZXZlbHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChcIiNcIiwgXCIyMHB4IEFyaWFsXCIsIFwiI2JkYmVmMlwiKTtcbnZhciBub2lzZWxldmVsdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiI1wiLCBcIjIwcHggQXJpYWxcIiwgXCIjYmRiZWYyXCIpO1xudmFyIHRyYW5jZXRhYmxlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG52YXIgdHJhbmNlUmF0ZTogbnVtYmVyID0gMC4wMDAzXG52YXIgd2Fsa1NwZWVkOiBudW1iZXIgPSA0MCAvIDEwMDBcbnZhciBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoZmFsc2UpO1xudmFyIHBsYXllcjogUGxheWVyXG52YXIgd29sZkJpdG1hcDogY3JlYXRlanMuQml0bWFwXG52YXIgY2hhaXJCaXRtYXA6IGNyZWF0ZWpzLkJpdG1hcFxudmFyIHR2Qml0bWFwOiBjcmVhdGVqcy5CaXRtYXBcbmxldCBiYWNrZ3JvdW5kTXVzaWM6IGNyZWF0ZWpzLkFic3RyYWN0U291bmRJbnN0YW5jZVxuXG5mdW5jdGlvbiBnZXRPYmplY3RCb3VuZHMoKSB7XG4gIHJldHVybiBbY2hhaXJCaXRtYXAuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgdHJhbmNldGFibGUuZ2V0VHJhbnNmb3JtZWRCb3VuZHMoKSwgZGFzaGJvYXJkX2JnLmdldFRyYW5zZm9ybWVkQm91bmRzKCldXG59XG5mdW5jdGlvbiBjcm9wQm91bmRzKGJvdW5kczogY3JlYXRlanMuUmVjdGFuZ2xlLCBob3JpejogbnVtYmVyLCB2ZXJ0OiBudW1iZXIpIHtcbiAgcmV0dXJuIG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUoYm91bmRzLnggKyBob3JpeiwgYm91bmRzLnkgKyB2ZXJ0LCBib3VuZHMud2lkdGggLSAyICogaG9yaXosIGJvdW5kcy5oZWlnaHQgLSAyICogdmVydClcbn1cblxuZnVuY3Rpb24gYm91bmRzQ29sbGlkZShvYmoxOiBjcmVhdGVqcy5SZWN0YW5nbGUsIG9iajI6IGNyZWF0ZWpzLlJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICBpZiAob2JqMS54ICsgb2JqMS53aWR0aCA+IG9iajIueCAmJiBvYmoxLnggPCBvYmoyLnggKyBvYmoyLndpZHRoKSB7XG4gICAgaWYgKG9iajEueSArIG9iajIuaGVpZ2h0ID4gb2JqMi55ICYmIG9iajEueSA8IG9iajIueSArIG9iajIuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuY2xhc3MgTm9pc2Uge1xuICBub2lzZUxldmVsOiBudW1iZXJcbiAgZHVyYXRpb25NczogbnVtYmVyXG4gIHNvdW5kOiBzdHJpbmdcbiAgY29uc3RydWN0b3Iobm9pc2VMZXZlbDogbnVtYmVyLCBkdXJhdGlvbk1TOiBudW1iZXIsIHNvdW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5vaXNlTGV2ZWwgPSBub2lzZUxldmVsXG4gICAgdGhpcy5kdXJhdGlvbk1zID0gZHVyYXRpb25NU1xuICAgIHRoaXMuc291bmQgPSBzb3VuZFxuICB9XG59XG5cbmNvbnN0IFdvbGYgPSBuZXcgTm9pc2UoMywgMjAwMCwgXCJ3b2xmXCIpXG5jb25zdCBPdXRzaWRlV2luZG93ID0gbmV3IE5vaXNlKDIsIDEwMDAsIFwib3V0c2lkZVwiKVxuY29uc3QgV2Fsa2luZyA9IG5ldyBOb2lzZSgxLCAxMDAwLCBcIndhbGtpbmdcIilcbmNvbnN0IFR2ID0gbmV3IE5vaXNlKDMsIDAsIFwidHZub2lzZVwiKVxuXG5jbGFzcyBUaW1lZE5vaXNlIHtcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgbm9pc2U6IE5vaXNlXG4gIHNvdW5kSW5zdGFuY2U/OiBjcmVhdGVqcy5BYnN0cmFjdFNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgY29uc3RydWN0b3IobjogTm9pc2UsIHN0YXJ0VGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWVcbiAgICB0aGlzLm5vaXNlID0gblxuICB9XG4gIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgIXRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgdGhpcy5zb3VuZEluc3RhbmNlID0gY3JlYXRlanMuU291bmQucGxheSh0aGlzLm5vaXNlLnNvdW5kKVxuICAgIH1cbiAgfVxuICBnZXRBY3RpdmVOb2lzZUxldmVsKHRpbWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8ICh0aGlzLnN0YXJ0VGltZSArIHRoaXMubm9pc2UuZHVyYXRpb25NcykpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vaXNlLm5vaXNlTGV2ZWxcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5jbGFzcyBXb2xmTm9pc2Uge1xuICBzdGFydFRpbWU6IG51bWJlclxuICBub2lzZTogTm9pc2VcbiAgZGlzdHJlc3NMZXZlbDogbnVtYmVyID0gMFxuICBzdGFydERpc3RyZXNzTGV2ZWw6IG51bWJlciA9IDBcbiAgbWF4RGlzdHJlc3NMZXZlbDogbnVtYmVyID0gM1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZVxuICByZXBlYXRBZnRlcjogbnVtYmVyXG4gIGluaXRpYWxTdGFydFRpbWU6IG51bWJlclxuICBzb3VuZEluc3RhbmNlPzogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlID0gdW5kZWZpbmVkXG4gIGVuZFRpbWU6IG51bWJlclxuICBjb25zdHJ1Y3RvcihuOiBOb2lzZSwgc3RhcnRUaW1lOiBudW1iZXIsIHJlcGVhdEFmdGVyOiBudW1iZXIpIHtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IHN0YXJ0VGltZVxuICAgIHRoaXMubm9pc2UgPSBuXG4gICAgdGhpcy5yZXBlYXRBZnRlciA9IHJlcGVhdEFmdGVyXG4gICAgdGhpcy5lbmRUaW1lID0gc3RhcnRUaW1lICsgbi5kdXJhdGlvbk1zXG4gICAgdGhpcy5pbml0aWFsU3RhcnRUaW1lID0gc3RhcnRUaW1lXG4gIH1cbiAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmRpc3RyZXNzTGV2ZWwgPSB0aGlzLnN0YXJ0RGlzdHJlc3NMZXZlbFxuICAgICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UhLm11dGVkID0gdHJ1ZVxuICAgICAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gMFxuICAgICAgdGhpcy5lbmRUaW1lID0gMFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGl2ZSAmJiAhdGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGltZSArIHRoaXMuaW5pdGlhbFN0YXJ0VGltZVxuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICB9XG4gICAgaWYgKHRoaXMuc291bmRJbnN0YW5jZSAmJiB0aW1lID49IHRoaXMuZW5kVGltZSkge1xuICAgICAgdGhpcy5lbmRUaW1lID0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLm5vaXNlLmR1cmF0aW9uTXNcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMucmVwZWF0QWZ0ZXIpIHtcbiAgICAgICAgdGhpcy5kaXN0cmVzc0xldmVsID0gTWF0aC5taW4odGhpcy5kaXN0cmVzc0xldmVsICsgMSwgdGhpcy5tYXhEaXN0cmVzc0xldmVsKVxuICAgICAgICB0aGlzLnN0YXJ0VGltZSArPSB0aGlzLm5vaXNlLmR1cmF0aW9uTXMgKyB0aGlzLnJlcGVhdEFmdGVyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuc3RhcnRUaW1lICsgdGhpcy5ub2lzZS5kdXJhdGlvbk1zXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXJ0VGltZSA8PSB0aW1lICYmICF0aGlzLnNvdW5kSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZSA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkodGhpcy5ub2lzZS5zb3VuZClcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAodGhpcy5kaXN0cmVzc0xldmVsICsgMSkgLyAodGhpcy5tYXhEaXN0cmVzc0xldmVsICsgMSlcbiAgICB9XG4gIH1cbiAgZ2V0QWN0aXZlTm9pc2VMZXZlbCh0aW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lIDw9IHRpbWUgJiYgdGltZSA8IHRoaXMuZW5kVGltZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsICsgdGhpcy5kaXN0cmVzc0xldmVsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cblxuY2xhc3MgUGxheWVyTm9pc2Uge1xuICBub2lzZTogTm9pc2VcbiAgc291bmRJbnN0YW5jZTogY3JlYXRlanMuQWJzdHJhY3RTb3VuZEluc3RhbmNlXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yKG46IE5vaXNlKSB7XG4gICAgdGhpcy5ub2lzZSA9IG5cbiAgICB0aGlzLnNvdW5kSW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KHRoaXMubm9pc2Uuc291bmQsIHsgbG9vcDogLTEsIHZvbHVtZTogMCB9KVxuICB9XG4gIGdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAxXG4gICAgICByZXR1cm4gdGhpcy5ub2lzZS5ub2lzZUxldmVsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmRJbnN0YW5jZS52b2x1bWUgPSAwXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cblxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZVxuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2Fsa2luZ0xlZnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgd2Fsa2luZ1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gIHdhbGtpbmdVcDogYm9vbGVhbiA9IGZhbHNlO1xuICB3YWxraW5nRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBtb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZVxuICBvbldvbGY6IGJvb2xlYW4gPSBmYWxzZVxuICBvblR2OiBib29sZWFuID0gZmFsc2VcbiAgdGltZU9uVHY6IG51bWJlciA9IDBcblxuICBjb25zdHJ1Y3RvcihzcHJpdGU6IGNyZWF0ZWpzLlNwcml0ZSwgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlXG4gICAgdGhpcy54ID0gc3RhcnRYXG4gICAgdGhpcy55ID0gc3RhcnRZXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLnNwcml0ZS54ID0gdGhpcy54XG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueVxuICB9XG4gIGdldEJvdW5kcygpOiBjcmVhdGVqcy5SZWN0YW5nbGUge1xuICAgIHJldHVybiBjcm9wQm91bmRzKG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSwgMTUsIDEwKVxuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIGxldCBsYXN0WCA9IHRoaXMueFxuICAgIGxldCBsYXN0WSA9IHRoaXMueVxuICAgIGxldCBob3JpeiA9IDBcbiAgICBsZXQgdmVydCA9IDBcbiAgICBpZiAodGhpcy53YWxraW5nTGVmdCkge1xuICAgICAgaG9yaXogLT0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nUmlnaHQpIHtcbiAgICAgIGhvcml6ICs9IDFcbiAgICB9XG4gICAgaWYgKHRoaXMud2Fsa2luZ0Rvd24pIHtcbiAgICAgIHZlcnQgKz0gMVxuICAgIH1cbiAgICBpZiAodGhpcy53YWxraW5nVXApIHtcbiAgICAgIHZlcnQgLT0gMVxuICAgIH1cbiAgICBpZiAoTWF0aC5hYnModmVydCkgPiAwIHx8IE1hdGguYWJzKGhvcml6KSA+IDApIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFBsYXkoXCJydW5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5zcHJpdGUuZ290b0FuZFN0b3AoMClcbiAgICB9XG4gICAgbGV0IHNwZWVkID0gdGhpcy5tb3ZpbmcgPyAoMSAvIE1hdGguc3FydChNYXRoLnBvdyhob3JpeiwgMikgKyBNYXRoLnBvdyh2ZXJ0LCAyKSkpICogd2Fsa1NwZWVkIDogMFxuICAgIHRoaXMueCArPSBob3JpeiAqIHNwZWVkICogKHRpbWUgLSBsYXN0VGlja1RpbWUpXG4gICAgdGhpcy55ICs9IHZlcnQgKiBzcGVlZCAqICh0aW1lIC0gbGFzdFRpY2tUaW1lKVxuXG4gICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB3YWxraW5nTm9pc2UuYWN0aXZlID0gZmFsc2VcbiAgICB9XG4gICAgdGhpcy54ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy54LCBjYW52YXMud2lkdGggLSAxNSAtIHRoaXMud2lkdGgpKVxuICAgIHRoaXMueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMueSwgY2FudmFzLmhlaWdodCAtIDE1IC0gdGhpcy5oZWlnaHQpKVxuICAgIGlmICh0aGlzLmVqZWN0U3ByaXRlRnJvbU9iamVjdHMoKSkge1xuICAgICAgdGhpcy54ID0gbGFzdFhcbiAgICAgIHRoaXMueSA9IGxhc3RZXG4gICAgfVxuXG4gICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueFxuICAgIHRoaXMuc3ByaXRlLnkgPSB0aGlzLnlcbiAgICBpZiAodGhpcy5vblR2KSB7XG4gICAgICB0aGlzLnRpbWVPblR2ICs9IHRpbWUgLSBsYXN0VGlja1RpbWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lT25UdiA9IDBcbiAgICB9XG4gICAgdGhpcy5wZXJmb3JtSW50ZXJhY3Rpb25zKClcbiAgICBpZiAodGhpcy5vblR2ICYmIHRoaXMudGltZU9uVHYgPiAzMDAwKSB7XG4gICAgICB3b2xmTm9pc2UuYWN0aXZlID0gdHJ1ZVxuICAgIH1cbiAgfVxuICBlamVjdFNwcml0ZUZyb21PYmplY3RzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKClcbiAgICBjb25zdCBvYmplY3RzID0gZ2V0T2JqZWN0Qm91bmRzKClcbiAgICBmb3IgKHZhciBpIGluIG9iamVjdHMpIHtcbiAgICAgIGlmIChib3VuZHNDb2xsaWRlKGJvdW5kcywgb2JqZWN0c1tpXSkpIHtcbiAgICAgICAgaWYgKGkgPT0gXCIwXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCBjaGFpclwiKVxuICAgICAgICB9IGVsc2UgaWYgKGkgPT0gXCIxXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCB0YWJsZVwiKVxuICAgICAgICB9IGVsc2UgaWYgKGkgPT0gXCIyXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdCBkYXNoYm9hcmRcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcImJvdW5kcyBcIiArIG9iamVjdHNbaV0pXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHBlcmZvcm1JbnRlcmFjdGlvbnMoKSB7XG4gICAgdmFyIG5ld09uV29sZiA9IGJvdW5kc0NvbGxpZGUodGhpcy5nZXRCb3VuZHMoKSwgY3JvcEJvdW5kcyh3b2xmQml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCksIDE1LCAxMSkpXG4gICAgdmFyIG5ld09uVHYgPSBib3VuZHNDb2xsaWRlKHRoaXMuZ2V0Qm91bmRzKCksIHR2Qml0bWFwLmdldFRyYW5zZm9ybWVkQm91bmRzKCkpXG4gICAgaWYgKG5ld09uVHYgJiYgIXRoaXMub25Udikge1xuICAgICAgVHZOb2lzZS5hY3RpdmUgPSAhVHZOb2lzZS5hY3RpdmVcbiAgICB9XG4gICAgaWYgKG5ld09uV29sZiAmJiB0aGlzLm9uV29sZikge1xuICAgICAgY29uc29sZS5sb2coXCJoaXQgd29sZlwiKVxuICAgICAgd29sZk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgVHZOb2lzZS5hY3RpdmUgPSB0cnVlIH0sIDQwMDApXG4gICAgfVxuICAgIHRoaXMub25Xb2xmID0gbmV3T25Xb2xmXG4gICAgdGhpcy5vblR2ID0gbmV3T25UdlxuICB9XG59XG5cbmxldCB3b2xmTm9pc2UgPSBuZXcgV29sZk5vaXNlKFdvbGYsIDIwMDAsIDQwMDApXG52YXIgbG9nSXQgPSAwXG5cbmZ1bmN0aW9uIHJlc2V0VmFycygpIHtcbiAgd29sZk5vaXNlID0gbmV3IFdvbGZOb2lzZShXb2xmLCAyMDAwLCA0MDAwKVxuICB0cmFuY2VMZXZlbCA9IDBcbiAgbm9pc2VMZXZlbCA9IDBcbiAgbGFzdE5vaXNlTGV2ZWwgPSAwXG4gIGxhc3RUaWNrVGltZSA9IDBcbn1cblxuZnVuY3Rpb24gZ2FtZUxvb3AoZXZlbnQ6IE9iamVjdCkge1xuICBsZXQgdGltZSA9IGNyZWF0ZWpzLlRpY2tlci5nZXRUaW1lKCk7XG4gIC8vIGxldCB0aW1lTGVmdG92ZXIgPSB0aW1lICUgNTA7XG4gIC8vIHRpbWUgLT0gdGltZUxlZnRvdmVyO1xuICB2YXIgZGVsdGFUaW1lOiBudW1iZXIgPSB0aW1lIC0gbGFzdFRpY2tUaW1lXG5cbiAgaWYgKHRyYW5jZUxldmVsIDwgMTApIHtcbiAgICB1cGRhdGVUcmFuY2VMZXZlbChkZWx0YVRpbWUpXG4gIH1cbiAgcGxheWVyLnVwZGF0ZSh0aW1lKVxuICB1cGRhdGVOb2lzZUxldmVsKHRpbWUpXG5cbiAgaWYgKHRyYW5jZUxldmVsID49IDEwKSB7XG4gICAgdHJhbmNlTGV2ZWwgPSAxMFxuICAgIGlmIChub2lzZUxldmVsID49IDEwKSB7XG4gICAgICBwbGF5WW91V29uU2NlbmUoKVxuICAgIH1cbiAgfSBlbHNlIGlmIChub2lzZUxldmVsID49IDEwKSB7XG4gICAgcGxheVlvdUxvc3RTY2VuZShcInlvdWxvc2V0dlwiKVxuICB9XG4gIGlmICh0cmFuY2VMZXZlbCA8IDApIHtcbiAgICBpZiAoVHZOb2lzZS5hY3RpdmUpIHtcbiAgICAgIHBsYXlZb3VMb3N0U2NlbmUoXCJ5b3Vsb3NldHZcIilcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheVlvdUxvc3RTY2VuZShcInlvdWxvc2V3b2xmXCIpXG4gICAgfVxuICB9XG5cbiAgLy8gZW5kIG9mIHZhcmlhYmxlIHVwZGF0ZXMsIG9ubHkgZGlzcGxheXMgYmVsb3dcbiAgdmFyIHJvdW5kZWRUcmFuY2VMZXZlbCA9IChNYXRoLnJvdW5kKHRyYW5jZUxldmVsICogMTAwKSAvIDEwMClcbiAgaWYgKGxvZ0l0ICUgMTQgPT0gMCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwidGltZTogXCIgKyAodGltZSAvIDEwMDApICsgXCIsIHRyYW5jZTogXCIgKyByb3VuZGVkVHJhbmNlTGV2ZWwgKyBcIiwgbm9pc2U6IFwiICsgbm9pc2VMZXZlbClcbiAgfVxuICBsb2dJdCsrXG4gIHRyYW5jZWxldmVsdGV4dC50ZXh0ID0gcm91bmRlZFRyYW5jZUxldmVsLnRvU3RyaW5nKCk7XG4gIG5vaXNlbGV2ZWx0ZXh0LnRleHQgPSBub2lzZUxldmVsLnRvU3RyaW5nKCk7XG4gIHN0YWdlLnVwZGF0ZSgpO1xuICBsYXN0VGlja1RpbWUgPSB0aW1lO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVOb2lzZUxldmVsKHRpbWU6IG51bWJlcikge1xuICBub2lzZUxldmVsID0gMFxuICB3b2xmTm9pc2UudGljayh0aW1lKVxuICBub2lzZUxldmVsICs9IHdhbGtpbmdOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpICsgVHZOb2lzZS5nZXRBY3RpdmVOb2lzZUxldmVsKHRpbWUpICsgd29sZk5vaXNlLmdldEFjdGl2ZU5vaXNlTGV2ZWwodGltZSlcbiAgaWYgKG5vaXNlTGV2ZWwgPiBsYXN0Tm9pc2VMZXZlbCkge1xuICAgIGlmIChub2lzZUxldmVsID49IDUpIHtcbiAgICAgIGlmICh0cmFuY2VMZXZlbCA8IDEwKSB7XG4gICAgICAgIHRyYW5jZUxldmVsIC09IChub2lzZUxldmVsIC0gNSlcbiAgICAgICAgdHJhbmNlTGV2ZWwgPSBNYXRoLmZsb29yKHRyYW5jZUxldmVsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBsYXN0Tm9pc2VMZXZlbCA9IG5vaXNlTGV2ZWxcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHJhbmNlTGV2ZWwoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgLy8gbG9vayBhdCB0aGUgbm9pc2UgbGV2ZWxcbiAgLy8gaWYgdGhlIG5vaXNlIGxldmVsIGlzIDwgM1xuICBpZiAobm9pc2VMZXZlbCA8IDMpIHtcbiAgICAvLyBpbmNyZWFzZSB0aGUgdHJhbmNlIGxldmVsIGJ5IDAuNSBldmVyeSAxMDAwIG1zICgxIHMpXG4gICAgdHJhbmNlTGV2ZWwgKz0gdHJhbmNlUmF0ZSAqIGRlbHRhVGltZVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdkZW1vQ2FudmFzJylcbiAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PnN0YWdlLmNhbnZhc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlFdmVudClcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGhhbmRsZUtleUV2ZW50KVxuICB2YXIgcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoc3RhZ2UsIHRydWUpXG4gIGxvYWRTb3VuZHMocXVldWUsIHN0YXJ0U2NlbmVzLCBwcm9ncmVzc0Jhcilcbn1cblxuZnVuY3Rpb24gc3RhcnRTY2VuZXMoKSB7XG4gIHBsYXlJbnRyb1NjZW5lKClcbn1cblxuLy8gaW50cm8gcGFnZSBmdW5jdGlvblxuZnVuY3Rpb24gcGxheUludHJvU2NlbmUoKSB7XG4gIC8vIG1ha2UgdGhlIHN0YWdlXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcblxuICAvLyBlbGVtZW50cyBvZiB0aGUgdGl0bGUgcGFnZVxuICB2YXIgY2FiaW5CaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImludHJvY2FiaW5cIikpXG4gIGNhYmluQml0bWFwLnggPSBjYWJpbkJpdG1hcC55ID0gMFxuICBjYWJpbkJpdG1hcC5zY2FsZVggPSBjYWJpbkJpdG1hcC5zY2FsZVkgPSAuNDVcbiAgc3RhZ2UuYWRkQ2hpbGQoY2FiaW5CaXRtYXApXG5cblxuICB0dDFiZy5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNDA2ZTIwXCIpLmRyYXdSb3VuZFJlY3RDb21wbGV4KDAsIDAsIDY2MCwgMjMwLCAxMCwgMTAsIDEwLCAxMClcbiAgdHQxYmcueCA9IDk1XG4gIHR0MWJnLnkgPSA2MFxuXG4gIHR0NGJnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM0MDZlMjBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNTYwLCA5NSwgMTAsIDEwLCAxMCwgMTApXG4gIHR0NGJnLnggPSAxOTVcbiAgdHQ0YmcueSA9IDM2MFxuXG4gIHR0NWJnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM2OWI1MzVcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgMjQwLCA3NSwgMTAsIDEwLCAxMCwgMTApXG4gIHR0NWJnLnggPSA1MTVcbiAgdHQ1YmcueSA9IDQ4NVxuXG4gIC8vIGludHJvIGdhbWUgdGV4dCAodGV4dCBkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB0aXRsZVRleHQxLnggPSAxMTBcbiAgdGl0bGVUZXh0MS55ID0gMTAwXG4gIHRpdGxlVGV4dDEudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0Mi54ID0gMTEwXG4gIHRpdGxlVGV4dDIueSA9IDE1MFxuICB0aXRsZVRleHQyLnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIHRpdGxlVGV4dDMueCA9IDExMFxuICB0aXRsZVRleHQzLnkgPSAyMzBcbiAgdGl0bGVUZXh0My50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICB0aXRsZVRleHQ0LnggPSAyMTBcbiAgdGl0bGVUZXh0NC55ID0gNDAwXG4gIHRpdGxlVGV4dDQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgdGl0bGVUZXh0NS54ID0gNTQwXG4gIHRpdGxlVGV4dDUueSA9IDUzMFxuICB0aXRsZVRleHQ1LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIC8vICB3YWl0IGEgaGFsZiBzZWNvbmQgZm9yIHRoZSBjYWJpbiBpbWFnZSB0byBsb2FkIGJlZm9yZSB1cGRhdGluZyB0aGUgc3RhZ2VcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNTAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0dDFiZywgdGl0bGVUZXh0MSlcbiAgICBzdGFnZS51cGRhdGUoKVxuICB9LCAxMDAwKVxuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN0YWdlLmFkZENoaWxkKHRpdGxlVGV4dDIpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgMjUwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0aXRsZVRleHQzKVxuICAgIHN0YWdlLnVwZGF0ZSgpXG4gIH0sIDQwMDApXG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgc3RhZ2UuYWRkQ2hpbGQodHQ0YmcsIHRpdGxlVGV4dDQpXG4gICAgc3RhZ2UudXBkYXRlKClcbiAgfSwgNjUwMClcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzdGFnZS5hZGRDaGlsZCh0dDViZywgdGl0bGVUZXh0NSlcbiAgICBzdGFnZS51cGRhdGUoKVxuXG4gICAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBjYW52YXMub25jbGljayA9IG51bGxcbiAgICAgIHBsYXlHYW1lU2NlbmUoKVxuICAgIH1cbiAgfSwgNzUwMClcblxufVxuXG5mdW5jdGlvbiBoYW5kbGVLZXlFdmVudChldmVudDogT2JqZWN0KSB7XG4gIGxldCBrZXlFdmVudCA9IDxLZXlib2FyZEV2ZW50PmV2ZW50O1xuICBpZiAocGxheWVyKSB7XG4gICAgaWYgKGtleUV2ZW50LnR5cGUgPT0gXCJrZXlkb3duXCIpIHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdSaWdodCA9IHRydWVcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdMZWZ0ID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ0Rvd24gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1VwID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlFdmVudC50eXBlID09IFwia2V5dXBcIikge1xuICAgICAgc3dpdGNoIChrZXlFdmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSBcIkFycm93UmlnaHRcIjpcbiAgICAgICAgICBwbGF5ZXIud2Fsa2luZ1JpZ2h0ID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdMZWZ0ID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dEb3duXCI6XG4gICAgICAgICAgcGxheWVyLndhbGtpbmdEb3duID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgICAgIHBsYXllci53YWxraW5nVXAgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lU2NlbmUoKSB7XG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgZ2FtZUNvbnRhaW5lci5yZW1vdmVBbGxDaGlsZHJlbigpXG4gIHJlc2V0VmFycygpXG4gIHdhbGtpbmdOb2lzZSA9IG5ldyBQbGF5ZXJOb2lzZShXYWxraW5nKVxuICBUdk5vaXNlID0gbmV3IFBsYXllck5vaXNlKFR2KVxuICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgLy8gICBUdk5vaXNlLmFjdGl2ZSA9IHRydWVcbiAgLy8gfSwgMTAwMClcbiAgYmFja2dyb3VuZE11c2ljID0gY3JlYXRlanMuU291bmQucGxheShcImJhY2tncm91bmRfbXVzaWNcIiwgeyBsb29wOiB0cnVlIH0pXG4gIGJhY2tncm91bmRNdXNpYy52b2x1bWUgPSAuNFxuXG4gIC8vIGNyZWF0ZSBhIGJhY2tncm91bmQgcmVjdGFuZ2xlXG4gIG91dGVyd2FsbC5ncmFwaGljcy5iZWdpbkZpbGwoXCIjNGQxYzIwXCIpLmRyYXdSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodClcblxuICAvLyBjcmVhdGUgdGhlIGlubmVyIHJlY3RhbmdsZSBmb3IgdGhlIFwiZmxvb3JcIiBvZiB0aGUgY2FiaW5cbiAgaW5uZXJ3YWxsLmdyYXBoaWNzLmJlZ2luRmlsbChcIiM3ZTZhOTRcIikuZHJhd1JlY3QoMTUsIDE1LCBjYW52YXMud2lkdGggLSAzMCwgY2FudmFzLmhlaWdodCAtIDMwKVxuXG4gIC8vIGRhc2hib2FyZCBkaXNwbGF5aW5nIHRyYW5jZSBsZXZlbCBhbmQgbm9pc2UgbGV2ZWxcbiAgZGFzaGJvYXJkX2JnLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMxNDE2NzBcIikuZHJhd1JvdW5kUmVjdENvbXBsZXgoMCwgMCwgNDAwLCAxMjAsIDUsIDUsIDUsIDUpXG4gIGRhc2hib2FyZF9iZy54ID0gMjAwXG4gIGRhc2hib2FyZF9iZy55ID0gMzBcbiAgZGFzaGJvYXJkX2JnLnNldEJvdW5kcygwLCAwLCA0MDAsIDEyMClcblxuICBkYXNoYm9hcmRfZmcuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzM5M2NkYlwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCAzODAsIDEwMCwgNSwgNSwgNSwgNSlcbiAgZGFzaGJvYXJkX2ZnLnggPSAyMTBcbiAgZGFzaGJvYXJkX2ZnLnkgPSA0MFxuXG5cbiAgLy8gbWV0cmljcyB0ZXh0IGxhYmVsc1xuICB0cmFuY2VsYWJlbC54ID0gMjI1XG4gIHRyYW5jZWxhYmVsLnkgPSA3NVxuICB0cmFuY2VsYWJlbC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICBub2lzZWxhYmVsLnggPSAyMjVcbiAgbm9pc2VsYWJlbC55ID0gMTE1XG4gIG5vaXNlbGFiZWwudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG5cbiAgLy8gbWV0cmljcyBudW1iZXJzXG4gIHRyYW5jZWxldmVsdGV4dC54ID0gMzYwXG4gIHRyYW5jZWxldmVsdGV4dC55ID0gNzVcbiAgdHJhbmNlbGV2ZWx0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xuXG4gIG5vaXNlbGV2ZWx0ZXh0LnggPSAzNjBcbiAgbm9pc2VsZXZlbHRleHQueSA9IDExNVxuICBub2lzZWxldmVsdGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcblxuICAvLyB0cmFuY2UgdGFibGUhXG4gIHRyYW5jZXRhYmxlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiNiZGYyZTJcIikuZHJhd1JlY3QoMCwgMCwgMjUwLCAxMjApXG4gIHRyYW5jZXRhYmxlLnggPSAyNzVcbiAgdHJhbmNldGFibGUueSA9IDI1MFxuICB0cmFuY2V0YWJsZS5zZXRCb3VuZHMoMCwgMCwgMjUwLCAxMjApXG5cbiAgLy8gcGVyc29uIG9uIHRyYW5jZSB0YWJsZSFcblxuICAvLyB3b2xmIGltYWdlXG4gIHdvbGZCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcIndvbGZpbWFnZVwiKSk7XG4gIHdvbGZCaXRtYXAueCA9IGNhbnZhcy53aWR0aCAtIDE1MFxuICB3b2xmQml0bWFwLnkgPSBjYW52YXMuaGVpZ2h0IC0gMTAwXG4gIHdvbGZCaXRtYXAuc2NhbGVYID0gd29sZkJpdG1hcC5zY2FsZVkgPSAuMlxuICB3b2xmTm9pc2UuYWN0aXZlID0gdHJ1ZVxuXG4gIC8vIHR2XG4gIHR2Qml0bWFwID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChxdWV1ZS5nZXRSZXN1bHQoXCJ0dmltYWdlXCIpKTtcbiAgdHZCaXRtYXAueCA9IDQwXG4gIHR2Qml0bWFwLnkgPSAxNDBcbiAgdHZCaXRtYXAuc2NhbGVYID0gdHZCaXRtYXAuc2NhbGVZID0gMS41XG5cbiAgLy8gY2hhaXJcbiAgY2hhaXJCaXRtYXAgPSBuZXcgY3JlYXRlanMuQml0bWFwKHF1ZXVlLmdldFJlc3VsdChcImNoYWlyaW1hZ2VcIikpO1xuICBjaGFpckJpdG1hcC54ID0gMTAwXG4gIGNoYWlyQml0bWFwLnkgPSAxNzBcbiAgY2hhaXJCaXRtYXAuc2NhbGVYID0gY2hhaXJCaXRtYXAuc2NhbGVZID0gLjM1XG5cbiAgdmFyIHBsYXllclNwcml0ZVNoZWV0ID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICBpbWFnZXM6IFtxdWV1ZS5nZXRSZXN1bHQoXCJzcHJpdGVzaGVldGltYWdlXCIpXSxcbiAgICBmcmFtZXM6IHtcbiAgICAgIHdpZHRoOiA0NixcbiAgICAgIGhlaWdodDogNTAsXG4gICAgICBjb3VudDogNDBcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHJ1bjogWzI0LCAzMSwgXCJydW5cIiwgMSAvIDVdXG4gICAgfVxuICB9KVxuICB2YXIgcGxheWVyU3ByaXRlID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShwbGF5ZXJTcHJpdGVTaGVldClcbiAgcGxheWVyID0gbmV3IFBsYXllcihwbGF5ZXJTcHJpdGUsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLSAxMDAsIDQ2LCA1MClcblxuICAvLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNvbnRhaW5lciBmb3IgdGhpcyBzY2VuZVxuICBnYW1lQ29udGFpbmVyLmFkZENoaWxkKG91dGVyd2FsbCwgaW5uZXJ3YWxsLCBkYXNoYm9hcmRfYmcsIGRhc2hib2FyZF9mZywgdHJhbmNlbGFiZWwsIG5vaXNlbGFiZWwsIHRyYW5jZWxldmVsdGV4dCwgbm9pc2VsZXZlbHRleHQsIHRyYW5jZXRhYmxlLCB3b2xmQml0bWFwLCB0dkJpdG1hcCwgY2hhaXJCaXRtYXAsIHBsYXllclNwcml0ZSlcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KG91dGVyd2FsbCwgMClcbiAgZ2FtZUNvbnRhaW5lci5zZXRDaGlsZEluZGV4KGlubmVyd2FsbCwgMSlcbiAgc3RhZ2UuYWRkQ2hpbGQoZ2FtZUNvbnRhaW5lcilcblxuICAvLyBVcGRhdGUgc3RhZ2Ugd2lsbCByZW5kZXIgbmV4dCBmcmFtZVxuICBzdGFnZS51cGRhdGUoKVxuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpY2tcIiwgZ2FtZUxvb3ApXG59XG5cblxuXG4vLyBcInlvdSB3b25cIiBwYWdlIGZ1bmN0aW9uXG5mdW5jdGlvbiBwbGF5WW91V29uU2NlbmUoKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBpZiAod29sZk5vaXNlLnNvdW5kSW5zdGFuY2UpIHtcbiAgICB3b2xmTm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgfVxuICBUdk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIFR2Tm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgY3JlYXRlanMuVGlja2VyLnJlc2V0KClcbiAgYmFja2dyb3VuZE11c2ljLm11dGVkID0gdHJ1ZVxuICBiYWNrZ3JvdW5kTXVzaWMuZGVzdHJveSgpXG4gIHZhciB5b3VXaW5Tb3VuZCA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoXCJ5b3V3aW5cIilcbiAgc3RhZ2UucmVtb3ZlQWxsQ2hpbGRyZW4oKVxuICAvLyBwbGFjZSBzb21lIFwieW91IHdvbiFcIiB0ZXh0IG9uIHRoZSBzY3JlZW4gKGRlY2xhcmVkIGF0IHRoZSB0b3ApXG4gIHlvdVdvblRleHQueCA9IDM2MFxuICB5b3VXb25UZXh0LnkgPSAxMTVcbiAgeW91V29uVGV4dC50ZXh0QmFzZWxpbmUgPSBcImFscGhhYmV0aWNcIjtcbiAgY3JlYXRlanMuVGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIGdhbWVMb29wKVxuXG4gIHN0YWdlLmFkZENoaWxkKHlvdVdvblRleHQsIHBsYXlBZ2FpblRleHQpXG5cbiAgc3RhZ2UudXBkYXRlKClcbiAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY2FudmFzLm9uY2xpY2sgPSBudWxsXG4gICAgcGxheUdhbWVTY2VuZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheVlvdUxvc3RTY2VuZShsb3NpbmdTb3VuZDogc3RyaW5nKSB7XG4gIHdvbGZOb2lzZS5hY3RpdmUgPSBmYWxzZVxuICBpZiAod29sZk5vaXNlLnNvdW5kSW5zdGFuY2UpIHtcbiAgICB3b2xmTm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgfVxuICBUdk5vaXNlLmFjdGl2ZSA9IGZhbHNlXG4gIFR2Tm9pc2Uuc291bmRJbnN0YW5jZS5tdXRlZCA9IHRydWVcbiAgY3JlYXRlanMuVGlja2VyLnJlc2V0KClcbiAgYmFja2dyb3VuZE11c2ljLm11dGVkID0gdHJ1ZVxuICBiYWNrZ3JvdW5kTXVzaWMuZGVzdHJveSgpXG4gIHZhciB5b3VMb3NlU291bmQgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KGxvc2luZ1NvdW5kKVxuICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+c3RhZ2UuY2FudmFzXG4gIHN0YWdlLnJlbW92ZUFsbENoaWxkcmVuKClcbiAgLy8gcGxhY2Ugc29tZSBcInlvdSB3b24hXCIgdGV4dCBvbiB0aGUgc2NyZWVuIChkZWNsYXJlZCBhdCB0aGUgdG9wKVxuICB5b3VMb3N0VGV4dC54ID0gMzYwXG4gIHlvdUxvc3RUZXh0LnkgPSAxMTVcbiAgeW91TG9zdFRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XG4gIHBsYXlBZ2FpblRleHQueCA9IDMzMFxuICBwbGF5QWdhaW5UZXh0LnkgPSAzMDBcblxuICBzdGFnZS5hZGRDaGlsZCh5b3VMb3N0VGV4dCwgcGxheUFnYWluVGV4dClcblxuICBzdGFnZS51cGRhdGUoKVxuICBjYW52YXMub25jbGljayA9ICgpID0+IHtcbiAgICBjYW52YXMub25jbGljayA9IG51bGxcbiAgICBwbGF5R2FtZVNjZW5lKClcbiAgfVxufVxuXG4vLyBcInlvdSBsb3N0XCIgcGFnZSBmdW5jdGlvblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpbml0KClcbn1cbiIsImV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIG91dGVyQmFyOiBjcmVhdGVqcy5TaGFwZVxuICBpbm5lckJhcjogY3JlYXRlanMuU2hhcGVcbiAgcHJvZ3Jlc3M6IG51bWJlclxuICBzdGFnZT86IGNyZWF0ZWpzLlN0YWdlXG4gIHJlbW92ZU9uTG9hZDogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihzdGFnZTogY3JlYXRlanMuU3RhZ2UsIHJlbW92ZU9uTG9hZDogYm9vbGVhbikge1xuICAgIHRoaXMub3V0ZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMuaW5uZXJCYXIgPSBuZXcgY3JlYXRlanMuU2hhcGUoKVxuICAgIHRoaXMub3V0ZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzE4MTgxOFwiKS5kcmF3Um91bmRSZWN0Q29tcGxleCgwLCAwLCA0MDAsIDYwLCA1LCA1LCA1LCA1KVxuICAgIHRoaXMub3V0ZXJCYXIueCA9IDIwMFxuICAgIHRoaXMub3V0ZXJCYXIueSA9IDI3MFxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5vdXRlckJhcilcblxuICAgIHRoaXMuaW5uZXJCYXIuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzMyN2ZhOFwiKS5kcmF3UmVjdCgwLCAwLCAzODAsIDQwKVxuICAgIHRoaXMuaW5uZXJCYXIueCA9IDIxMFxuICAgIHRoaXMuaW5uZXJCYXIueSA9IDI4MFxuICAgIHRoaXMuaW5uZXJCYXIuc2NhbGVYID0gdGhpcy5wcm9ncmVzc1xuXG4gICAgc3RhZ2UuYWRkQ2hpbGQodGhpcy5pbm5lckJhcilcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2VcbiAgICB0aGlzLnJlbW92ZU9uTG9hZCA9IHJlbW92ZU9uTG9hZFxuICB9XG4gIGhhbmRsZVByb2dyZXNzKGV2ZW50OiBPYmplY3QpIHtcbiAgICB2YXIgcHJvZ3Jlc3NFdmVudCA9IDxjcmVhdGVqcy5Qcm9ncmVzc0V2ZW50PmV2ZW50XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzRXZlbnQucHJvZ3Jlc3NcbiAgICB0aGlzLmlubmVyQmFyLnNjYWxlWCA9IHRoaXMucHJvZ3Jlc3NcbiAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdGFnZSkge1xuICAgICAgdGhpcy5zdGFnZSEucmVtb3ZlQ2hpbGQodGhpcy5vdXRlckJhcilcbiAgICAgIHRoaXMuc3RhZ2UhLnJlbW92ZUNoaWxkKHRoaXMuaW5uZXJCYXIpXG4gICAgICB0aGlzLnN0YWdlIS51cGRhdGUoKVxuICAgICAgdGhpcy5zdGFnZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuICBoYW5kbGVDb21wbGV0ZShldmVudDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMucmVtb3ZlT25Mb2FkKSB7XG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tIFwiLi9wcm9ncmVzc2JhclwiXG5leHBvcnQgbGV0IHdvbGZTb3VuZDogc3RyaW5nID0gXCJ3b2xmXCJcbmV4cG9ydCBsZXQgb3V0c2lkZVNvdW5kOiBzdHJpbmcgPSBcIm91dHNpZGVcIlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTb3VuZHMocXVldWU6IGNyZWF0ZWpzLkxvYWRRdWV1ZSwgbmV4dDogKCkgPT4gdm9pZCwgcHJvZ3Jlc3NCYXI/OiBQcm9ncmVzc0Jhcikge1xuICBxdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFtcIm1wM1wiXTtcbiAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgcXVldWUub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0Jhci5oYW5kbGVQcm9ncmVzcywgcHJvZ3Jlc3NCYXIpXG4gIH1cbiAgcXVldWUub24oXCJjb21wbGV0ZVwiLCB7XG4gICAgaGFuZGxlRXZlbnQ6IChldmVudCkgPT4ge1xuICAgICAgaWYgKHByb2dyZXNzQmFyKSB7XG4gICAgICAgIHF1ZXVlLm9mZihcInByb2dyZXNzXCIsIHByb2dyZXNzQmFyLmhhbmRsZVByb2dyZXNzKVxuICAgICAgICBwcm9ncmVzc0Jhci5oYW5kbGVDb21wbGV0ZShldmVudClcbiAgICAgIH1cbiAgICAgIG5leHQoKVxuICAgIH1cbiAgfSlcbiAgcXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICB7IGlkOiBcIndvbGZcIiwgc3JjOiBcInJlcy93b2xmLndhdlwiIH0sXG4gICAgeyBpZDogXCJvdXRzaWRlXCIsIHNyYzogXCJyZXMvb3V0c2lkZS5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiaW50cm9jYWJpblwiLCBzcmM6IFwicmVzL2ludHJvY2FiaW4uanBnXCIgfSxcbiAgICB7IGlkOiBcInR2bm9pc2VcIiwgc3JjOiBcInJlcy90dnNvdW5kLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ0dmltYWdlXCIsIHNyYzogXCJyZXMvdHZpbWFnZS5wbmdcIiB9LFxuICAgIHsgaWQ6IFwic3ByaXRlc2hlZXRpbWFnZVwiLCBzcmM6IFwicmVzL3BsYXllci1zcHJpdGVtYXAtdjktcmVkcGFudHMucG5nXCIgfSxcbiAgICB7IGlkOiBcImNoYWlyaW1hZ2VcIiwgc3JjOiBcInJlcy9jaGFpci5wbmdcIiB9LFxuICAgIHsgaWQ6IFwid29sZmltYWdlXCIsIHNyYzogXCJyZXMvd29sZi5wbmdcIiB9LFxuICAgIHsgaWQ6IFwieW91bG9zZXdvbGZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV93b2xmLm1wM1wiIH0sXG4gICAgeyBpZDogXCJ5b3Vsb3NldHZcIiwgc3JjOiBcInJlcy95b3VfbG9zZV90di5tcDNcIiB9LFxuICAgIHsgaWQ6IFwieW91d2luXCIsIHNyYzogXCJyZXMveW91X3dpbi5tcDNcIiB9LFxuICAgIHsgaWQ6IFwiYmFja2dyb3VuZF9tdXNpY1wiLCBzcmM6IFwicmVzL2JhY2tncm91bmRfbXVzaWMubXAzXCIgfVxuICBdKVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9