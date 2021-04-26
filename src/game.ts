import { ProgressBar } from "./progressbar"
import { loadSounds } from "./sound"
let circle: createjs.Shape
let stage: createjs.Stage
let TvNoise: PlayerNoise
let walkingNoise: PlayerNoise
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
var walkSpeed: number = 20 / 1000
var queue = new createjs.LoadQueue(false);
var player: Player

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
const Walking = new Noise(1, 1000, "walking")
const Tv = new Noise(5, 0, "tvnoise")

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

class PlayerNoise {
  noise: Noise
  soundInstance: createjs.AbstractSoundInstance
  active: boolean = false
  constructor(n: Noise) {
    this.noise = n
    this.soundInstance = createjs.Sound.play(this.noise.sound, { loop: -1, volume: 0 })
  }
  getActiveNoiseLevel(time: number): number {
    if (this.active) {
      this.soundInstance.volume = 1
      return this.noise.noiseLevel
    } else {
      this.soundInstance.volume = 0
    }
    return 0
  }

}

class Player {
  sprite: createjs.Sprite
  x: number
  y: number
  width: number
  height: number
  walkingLeft: boolean = false;
  walkingRight: boolean = false;
  walkingUp: boolean = false;
  walkingDown: boolean = false;
  moving: boolean = false

  constructor(sprite: createjs.Sprite, startX: number, startY: number, width: number, height: number) {
    this.sprite = sprite
    this.x = startX
    this.y = startY
    this.width = width
    this.height = height
    this.sprite.x = this.x
    this.sprite.x = this.y
  }

  update(time: number) {
    if (this.walkingLeft) {
      this.x -= walkSpeed * (time - lastTickTime)
    }
    if (this.walkingDown) {
      this.y += walkSpeed * (time - lastTickTime)
    }
    if (this.walkingRight) {
      this.x += walkSpeed * (time - lastTickTime)
    }
    if (this.walkingUp) {
      this.y -= walkSpeed * (time - lastTickTime)
    }
    if (this.sprite.x == this.x && this.sprite.y == this.y) {
      this.sprite.gotoAndStop(0)
      this.moving = false
    } else {
      if (!this.moving) {
        this.moving = true
        this.sprite.gotoAndPlay("run")
      }
    }
    if (this.moving) {
      walkingNoise.active = true
    } else {
      walkingNoise.active = false
    }
    this.x = Math.max(0, Math.min(this.x, canvas.width - 15 - this.width))
    this.y = Math.max(0, Math.min(this.y, canvas.height - 15 - this.height))
    this.sprite.x = this.x
    this.sprite.y = this.y
  }
}

var noises = [
  new TimedNoise(OutsideWindow, 2000),
  new TimedNoise(Wolf, 3000),
  new TimedNoise(Wolf, 6000),
  new TimedNoise(OutsideWindow, 7000),
]


var logIt = 0

function gameLoop(event: Object) {
  let time = createjs.Ticker.getTime();
  // let timeLeftover = time % 50;
  // time -= timeLeftover;
  var deltaTime: number = time - lastTickTime

  updateTranceLevel(deltaTime)
  player.update(time)
  updateNoiseLevel(time)

  // end of variable updates, only displays below
  var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100)
  if (logIt % 14 == 0) {
    // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
  }
  logIt++

  tranceleveltext.text = roundedTranceLevel.toString();
  noiseleveltext.text = noiseLevel.toString();
  if (tranceLevel >= 5) {
    playYouWonScene()
  }

  let e = <Event>(event);
  stage.update();
  lastTickTime = time;
}

function updateNoiseLevel(time: number) {
  noiseLevel = 0
  for (var n of noises) {
    n.tick(time)
    noiseLevel += n.getActiveNoiseLevel(time)
  }
  noiseLevel += walkingNoise.getActiveNoiseLevel(time) + TvNoise.getActiveNoiseLevel(time)
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
  stage = new createjs.Stage('demoCanvas')
  canvas = <HTMLCanvasElement>stage.canvas
  document.addEventListener("keydown", handleKeyEvent)
  document.addEventListener("keyup", handleKeyEvent)
  var progressBar = new ProgressBar(stage, true)
  loadSounds(queue, startScenes, progressBar)
}

function startScenes() {
  playIntroScene()
}

// intro page function
function playIntroScene() {
  // make the stage

  // elements of the title page
  var cabinBitmap = new createjs.Bitmap(queue.getResult("introcabin"))
  cabinBitmap.x = cabinBitmap.y = 0
  cabinBitmap.scaleX = cabinBitmap.scaleY = .45
  // introContainer.addChild(cabinBitmap)

  stage.addChild(cabinBitmap)
  //  wait a half second for the cabin image to load before updating the stage
  setTimeout(function () {
    stage.update()
  }, 500);

  canvas.onclick = () => {
    playGameScene()
  }
}

function handleKeyEvent(event: Object) {
  let keyEvent = <KeyboardEvent>event;
  if (player) {
    if (keyEvent.type == "keydown") {
      switch (keyEvent.key) {
        case "ArrowRight":
          player.walkingRight = true
          break
        case "ArrowLeft":
          player.walkingLeft = true
          break
        case "ArrowDown":
          player.walkingDown = true
          break
        case "ArrowUp":
          player.walkingUp = true
          break
      }
    } else {
      switch (keyEvent.key) {
        case "ArrowRight":
          player.walkingRight = false
          break
        case "ArrowLeft":
          player.walkingLeft = false
          break
        case "ArrowDown":
          player.walkingDown = false
          break
        case "ArrowUp":
          player.walkingUp = false
          break
      }
    }
  }
}

function playGameScene() {
  walkingNoise = new PlayerNoise(Walking)
  TvNoise = new PlayerNoise(Tv)
  // setTimeout(function () {
  //   TvNoise.active = true
  // }, 1000)

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

  // tv
  var tvBitmap = new createjs.Bitmap("res/tvimage.png");
  tvBitmap.x = 40
  tvBitmap.y = 140
  tvBitmap.scaleX = tvBitmap.scaleY = 1.5

  // chair
  var chairBitmap = new createjs.Bitmap("res/chair.png");
  chairBitmap.x = 100
  chairBitmap.y = 170
  chairBitmap.scaleX = chairBitmap.scaleY = .35

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
  player = new Player(playerSprite, canvas.width / 2, canvas.height - 100, 46, 50)

  // add elements to the container for this scene
  gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, tranceleveltext, noiseleveltext, trancetable, wolfBitmap, tvBitmap, chairBitmap,  playerSprite)
  gameContainer.setChildIndex(outerwall, 0)
  gameContainer.setChildIndex(innerwall, 1)
  stage.addChild(gameContainer)

  // Update stage will render next frame
  stage.update()
  createjs.Ticker.addEventListener("tick", gameLoop)
  playerSprite.gotoAndPlay("run")
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
