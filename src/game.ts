import { loadSounds } from "./sound"
let circle: createjs.Shape
let stage: createjs.Stage
let tranceLevel = 0
let noiseLevel = 0
let lastTickTime = 0
let canvas: HTMLCanvasElement
// var introContainer = new createjs.Container()
var gameContainer = new createjs.Container()
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
let greycircle = new createjs.Shape()
var wolflabel = new createjs.Text("Wolf", "20px Arial", "#302a36");
var tranceRate: number = 0.0005
var queue = new createjs.LoadQueue(true);

class Noise {
  noiseLevel: number
  durationMs: number
  sound: string
  constructor(noiseLevel: number, durationMS: number, sound: string) {
    this.noiseLevel = noiseLevel
    this.durationMs = durationMS
    this.sound = sound
  }
}

const Wolf = new Noise(3, 2000, "wolf")
const OutsideWindow = new Noise(2, 1000, "outside")

class TimedNoise {
  startTime: number
  noise: Noise
  soundInstance?: createjs.AbstractSoundInstance = undefined
  constructor(n: Noise, startTime: number) {
    this.startTime = startTime
    this.noise = n
  }
  tick(time: number) {
    if (this.startTime <= time && !this.soundInstance) {
      this.soundInstance = createjs.Sound.play(this.noise.sound)
    }
  }
  getActiveNoiseLevel(time: number): number {
    if (this.startTime <= time && time < (this.startTime + this.noise.durationMs)) {
      return this.noise.noiseLevel
    }
    return 0
  }
}

var noises = [
  new TimedNoise(OutsideWindow, 2000),
  new TimedNoise(Wolf, 3000),
  new TimedNoise(Wolf, 6000),
  new TimedNoise(OutsideWindow, 7500)
]

var logIt = 0

function gameLoop(event: Object) {
  noiseLevel = 0
  let time = createjs.Ticker.getTime();
  var deltaTime: number = time - lastTickTime

  updateNoiseLevel(time)
  updateTranceLevel(deltaTime)

  // end of variable updates, only displays below
  var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100)
  if (logIt % 14 == 0) {
    console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
  }
  logIt++

  tranceleveltext.text = roundedTranceLevel.toString();
  noiseleveltext.text = noiseLevel.toString();

  let e = <Event>(event);
  stage.update();
  lastTickTime = time;
}

function updateNoiseLevel(time: number) {
  for (var n of noises) {
    noiseLevel += n.getActiveNoiseLevel(time)
  }
}

function updateTranceLevel(deltaTime: number) {
  // look at the noise level
  // if the noise level is < 3
  if (noiseLevel < 3) {
    // increase the trance level by 0.5 every 1000 ms (1 s)
    tranceLevel += tranceRate * deltaTime
  }
}

function init() {
  loadSounds(queue, startScenes)
}

function startScenes() {
  playIntroScene()
  playGameScene()
}

// intro page function
function playIntroScene() {
  // make the stage
  stage = new createjs.Stage('demoCanvas')
  canvas = <HTMLCanvasElement>stage.canvas

  // elements of the title page
  var cabinBitmap = new createjs.Bitmap("res/introcabin.jpg");
  cabinBitmap.x = cabinBitmap.y = 0
  cabinBitmap.scaleX = cabinBitmap.scaleY = .45
  // introContainer.addChild(cabinBitmap)

  stage.addChild(cabinBitmap)
  //  wait a half second for the cabin image to load before updating the stage
  setTimeout(function () {
    stage.update()
  }, 500);

  // wait 3 seconds then start game
  setTimeout(function () {
    playGameScene()
  }, 3000);
}

function playGameScene() {
  canvas = <HTMLCanvasElement>stage.canvas

  // create a background rectangle
  outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height)

  // create the inner rectangle for the "floor" of the cabin
  innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30)

  // dashboard displaying trance level and noise level
  dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5)
  dashboard_bg.x = 200
  dashboard_bg.y = 30

  dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5)
  dashboard_fg.x = 210
  dashboard_fg.y = 40

  // metrics text labels
  trancelabel.x = 225
  trancelabel.y = 75
  trancelabel.textBaseline = "alphabetic";

  noiselabel.x = 225
  noiselabel.y = 115
  noiselabel.textBaseline = "alphabetic";

  // metrics numbers
  tranceleveltext.x = 360
  tranceleveltext.y = 75
  tranceleveltext.textBaseline = "alphabetic";

  noiseleveltext.x = 360
  noiseleveltext.y = 115
  noiseleveltext.textBaseline = "alphabetic";

  // trance table!
  trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120)
  trancetable.x = 275
  trancetable.y = 250

  // person on trance table!

  // wolf image
  var wolfBitmap = new createjs.Bitmap("res/wolf.png");
  wolfBitmap.x = canvas.width - 150
  wolfBitmap.y = canvas.height - 100
  wolfBitmap.scaleX = wolfBitmap.scaleY = .2

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
  })
  var playerSprite = new createjs.Sprite(playerSpriteSheet)
  playerSprite.x = canvas.width / 2
  playerSprite.y = canvas.height - 100

  // add elements to the container for this scene
  gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, tranceleveltext, noiseleveltext, trancetable, wolfBitmap, playerSprite)
  gameContainer.setChildIndex(outerwall, 0)
  gameContainer.setChildIndex(innerwall, 1)
  stage.addChild(gameContainer)

  // Update stage will render next frame
  stage.update()
  createjs.Ticker.addEventListener("tick", gameLoop)
  playerSprite.gotoAndPlay("run")

  setTimeout(function () {
    playYouWonScene()
  }, 4000);
}



// "you won" page function
function playYouWonScene() {
  canvas = <HTMLCanvasElement>stage.canvas
  stage.removeAllChildren()
  // place some "you won!" text on the screen (declared at the top)
  youWonText.x = 360
  youWonText.y = 115
  youWonText.textBaseline = "alphabetic";

  stage.addChild(youWonText)

  stage.update()
}

// "you lost" page function

window.onload = () => {
  init()
}