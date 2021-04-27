import { ProgressBar } from "./progressbar"
import { loadSounds } from "./sound"
let circle: createjs.Shape
let stage: createjs.Stage
let TvNoise: PlayerNoise
let walkingNoise: PlayerNoise
let tranceLevel = 0
let noiseLevel = 0
let lastNoiseLevel = 0
let lastTickTime = 0
let canvas: HTMLCanvasElement
var gameContainer = new createjs.Container()
var outerwall = new createjs.Shape();
var innerwall = new createjs.Shape();
var dashboard_bg = new createjs.Shape();
var dashboard_fg = new createjs.Shape();
var titleText1 = new createjs.Text("You are the famous Dr. Trancy Pants, M.D.", "30px Arial", "#fffdfa")
var titleText2 = new createjs.Text("With your help, budding magicians can advance\ntheir studies by entering a deep trance.", "30px Arial", "#fffdfa")
var titleText3 = new createjs.Text("Keep your cabin quiet. If it gets too loud, the trance will be interrupted,\nor worse, you'll even wake the magician.\nYour trusty magic wolf Tiesto and your phantom TV \ncan both make a lot of noise.", "20px Arial", "#fffdfa")
var titleText4 = new createjs.Text("Don't forget to wake them up at the end,\nor they'll sleep forever.", "30px Arial", "#fffdfa")
var titleText5 = new createjs.Text("Click to begin!", "30px Arial", "#fffdfa");
const fallingIntoATranceMessage = "The magician is falling into a trance"
const wolfAgitatedOnMessage = "The TV is on, and Tiesto seems agitated"
const wolfAgitatedMessage = "Tiesto seems agitated"
const wolfQuietedMessage = "You quieted Tiesto"
const tvTurnedOffMessage = "You turned off the phantom TV"
const tvTurnedOnMessage = "You turned on the phantom TV"
const tvOnMessage = "The phantom TV is on"
const tvTurnedOnSelfMessage = "The phantom TV turned on by itself!"
const tvOnWolfHowlingMessage = "The TV is on, and Tiesto is howling"
const tvOnWolfHowlingLoudlyMessage = "The TV is on, and Tiesto is howling loudly"
const tvOnWolfHowlingGrowingMessage = "The TV is on, and Tiesto's howls grow louder"
const wolfNotAgitatedMessage = "Tiesto no longer seems agitated"
const wolfStartsHowlingMessage = "Tiesto is so agitated he starts howling"
const wolfHowlingMessage = "Tiesto is howling"
const wolfHowlingGrowingMessage = "Tiesto's howls grow louder"
const wolfHowlingLoudlyMessage = "Tiesto is howling loudly"
const tranceWakeUpMessage = "The magician's in a trance. Time to wake them up!"
var statusMessage = new createjs.Text(fallingIntoATranceMessage, "16px Arial", "#bdbef2")
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
var tranceRate: number = 0.0003
var tranceProgress: ProgressBar
var walkSpeed: number = 75 / 1000
var queue = new createjs.LoadQueue(false);
var player: Player
var wolfBitmap: createjs.Bitmap
var chairBitmap: createjs.Bitmap
var wizBitmap: createjs.Bitmap
var tvBitmap: createjs.Bitmap
let backgroundMusic: createjs.AbstractSoundInstance

function getObjectBounds() {
  return [chairBitmap.getTransformedBounds(), trancetable.getTransformedBounds(), dashboard_bg.getTransformedBounds()]
}
function cropBounds(bounds: createjs.Rectangle, horiz: number, vert: number) {
  return new createjs.Rectangle(bounds.x + horiz, bounds.y + vert, bounds.width - 2 * horiz, bounds.height - 2 * vert)
}

function boundsCollide(obj1: createjs.Rectangle, obj2: createjs.Rectangle): boolean {
  if (obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) {
    if (obj1.y + obj2.height > obj2.y && obj1.y < obj2.y + obj2.height) {
      return true
    }
  }
  return false
}

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
const Tv = new Noise(3, 0, "tvnoise")

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

class WolfNoise {
  startTime: number
  noise: Noise
  distressLevel: number = 0
  startDistressLevel: number = 0
  maxDistressLevel: number = 3
  active: boolean = false
  repeatAfter: number
  initialStartTime: number
  soundInstance?: createjs.AbstractSoundInstance = undefined
  endTime: number
  constructor(n: Noise, startTime: number, repeatAfter: number) {
    this.startTime = startTime
    this.noise = n
    this.repeatAfter = repeatAfter
    this.endTime = startTime + n.durationMs
    this.initialStartTime = startTime
  }
  tick(time: number) {
    if (!this.active) {
      this.distressLevel = this.startDistressLevel
      if (this.soundInstance) {
        this.soundInstance!.muted = true
        this.soundInstance = undefined
      }
      this.startTime = 0
      this.endTime = 0
      return
    }
    if (this.active && !this.startTime) {
      this.startTime = time + this.initialStartTime
      this.endTime = this.startTime + this.noise.durationMs
    }
    if (this.soundInstance && time >= this.endTime) {
      this.endTime = this.startTime + this.noise.durationMs
      this.soundInstance = undefined
      if (this.repeatAfter) {
        this.distressLevel = Math.min(this.distressLevel + 1, this.maxDistressLevel)
        this.startTime += this.noise.durationMs + this.repeatAfter
        this.endTime = this.startTime + this.noise.durationMs
      }
    }
    if (this.startTime <= time && !this.soundInstance) {
      this.soundInstance = createjs.Sound.play(this.noise.sound)
      this.soundInstance.volume = (this.distressLevel + 1) / (this.maxDistressLevel + 1)
    }
  }
  getActiveNoiseLevel(time: number): number {
    if (this.active) {
      if (this.startTime <= time && time < this.endTime) {
        return this.noise.noiseLevel + this.distressLevel
      }
    }
    return 0
  }
}

class PlayerNoise {
  noise: Noise
  soundInstance: createjs.AbstractSoundInstance
  active: boolean = false
  startTime: number = 0
  constructor(n: Noise) {
    this.noise = n
    this.soundInstance = createjs.Sound.play(this.noise.sound, { loop: -1, volume: 0 })
  }
  getActiveNoiseLevel(time: number): number {
    if (this.active) {
      if (this.startTime == 0) {
        this.startTime = time
      }
      this.soundInstance.volume = 1
      return this.noise.noiseLevel
    } else {
      this.startTime = 0
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
  onWolf: boolean = false
  onTv: boolean = false
  timeOnTv: number = 0
  wolfQuietedTime: number = 0
  wolfAgitatedTime: number = 0
  timeOffTv: number = 0
  phantomTvTime: number = 0

  constructor(sprite: createjs.Sprite, startX: number, startY: number, width: number, height: number) {
    this.sprite = sprite
    this.x = startX
    this.y = startY
    this.width = width
    this.height = height
    this.sprite.x = this.x
    this.sprite.x = this.y
  }
  getBounds(): createjs.Rectangle {
    return cropBounds(new createjs.Rectangle(this.x, this.y, this.width, this.height), 15, 10)
  }

  update(time: number) {
    let lastX = this.x
    let lastY = this.y
    let horiz = 0
    let vert = 0
    if (this.walkingLeft) {
      horiz -= 1
    }
    if (this.walkingRight) {
      horiz += 1
    }
    if (this.walkingDown) {
      vert += 1
    }
    if (this.walkingUp) {
      vert -= 1
    }
    if (Math.abs(vert) > 0 || Math.abs(horiz) > 0) {
      this.moving = true
      this.sprite.gotoAndPlay("run")
    } else {
      this.moving = false
      this.sprite.gotoAndStop(0)
    }
    let speed = this.moving ? (1 / Math.sqrt(Math.pow(horiz, 2) + Math.pow(vert, 2))) * walkSpeed : 0
    this.x += horiz * speed * (time - lastTickTime)
    this.y += vert * speed * (time - lastTickTime)

    if (this.moving) {
      walkingNoise.active = true
    } else {
      walkingNoise.active = false
    }
    this.x = Math.max(0, Math.min(this.x, canvas.width - 15 - this.width))
    this.y = Math.max(0, Math.min(this.y, canvas.height - 15 - this.height))
    if (this.ejectSpriteFromObjects()) {
      this.x = lastX
      this.y = lastY
    }

    this.sprite.x = this.x
    this.sprite.y = this.y
    if (this.onTv) {
      this.timeOnTv += time - lastTickTime
      this.timeOffTv = 0
    } else {
      if (this.timeOffTv == 0) {
        this.timeOffTv = time
      }
      this.timeOnTv = 0
    }
    this.performInteractions(time)
    if (this.onTv && this.timeOnTv > 3000) {
      wolfNoise.active = true
      this.wolfAgitatedTime = time
    }
    if (this.onWolf) {
      this.wolfQuietedTime = time
    }
  }
  ejectSpriteFromObjects(): boolean {
    const bounds = this.getBounds()
    const objects = getObjectBounds()
    for (var i in objects) {
      if (boundsCollide(bounds, objects[i])) {
        if (i == "0") {
          console.log("hit chair")
        } else if (i == "1") {
          console.log("hit table")
        } else if (i == "2") {
          console.log("hit dashboard")
        }
        console.log("bounds " + objects[i])
        return true
      }
    }
    return false
  }
  performInteractions(time: number) {
    var newOnWolf = boundsCollide(this.getBounds(), cropBounds(wolfBitmap.getTransformedBounds(), 15, 11))
    var newOnTv = boundsCollide(this.getBounds(), tvBitmap.getTransformedBounds())
    if (newOnTv && !this.onTv) {
      TvNoise.active = !TvNoise.active
    }
    if (newOnWolf && this.onWolf) {
      wolfNoise.active = false
      var self = this
      setTimeout(() => {
        if (!TvNoise.active) {
          self.phantomTvTime = time + 4000
          TvNoise.active = true
        }
      }, 4000)
    }
    this.onWolf = newOnWolf
    this.onTv = newOnTv
  }
  pickBestMessage(time: number) {
    if (time > 2000 && time <= this.wolfQuietedTime + 2000) {
      return wolfQuietedMessage
    }
    if (this.onTv && this.timeOnTv <= 1000) {
      if (TvNoise.active) {
        return tvTurnedOnMessage
      } else {
        return tvTurnedOffMessage
      }
    }
    if (!wolfNoise.active) {
      if (this.timeOnTv > 1000 && this.timeOnTv <= 4000) {
        if (TvNoise.active) {
          return wolfAgitatedOnMessage
        } else {
          return wolfAgitatedMessage
        }
      }
      if (time > 2000 && time < this.timeOffTv + 2000) {
        return wolfNotAgitatedMessage
      }
    } else {
      if (time > 2000 && time < this.wolfAgitatedTime + 2000) {
        return wolfStartsHowlingMessage
      }
    }
    if (time >= wolfNoise.startTime && time <= wolfNoise.endTime) {
      if (wolfNoise.distressLevel == wolfNoise.startDistressLevel) {
        return TvNoise.active ? tvOnWolfHowlingMessage : wolfHowlingMessage
      } else if (wolfNoise.distressLevel == wolfNoise.maxDistressLevel) {
        return TvNoise.active ? tvOnWolfHowlingLoudlyMessage : wolfHowlingLoudlyMessage
      }
      return TvNoise.active ? tvOnWolfHowlingGrowingMessage : wolfHowlingGrowingMessage
    }
    if (TvNoise.active && time < this.phantomTvTime + 2000) {
      return tvTurnedOnSelfMessage
    }
    if (noiseLevel < 3) {
      if (tranceLevel >= 10) {
        return tranceWakeUpMessage
      }
      return fallingIntoATranceMessage
    }
    if (TvNoise.active) {
      return tvOnMessage
    }
    return ""
  }
}

let wolfNoise = new WolfNoise(Wolf, 2000, 4000)
var logIt = 0

function resetVars() {
  wolfNoise = new WolfNoise(Wolf, 2000, 4000)
  tranceLevel = 0
  noiseLevel = 0
  lastNoiseLevel = 0
  lastTickTime = 0
}

function gameLoop(event: Object) {
  let time = createjs.Ticker.getTime();
  // let timeLeftover = time % 50;
  // time -= timeLeftover;
  var deltaTime: number = time - lastTickTime

  if (tranceLevel < 10) {
    updateTranceLevel(deltaTime)
  }
  player.update(time)
  updateNoiseLevel(time)

  if (tranceLevel >= 10) {
    tranceLevel = 10
    if (noiseLevel >= 10) {
      playYouWonScene()
    }
  } else if (noiseLevel >= 10) {
    playYouLostScene("youlosetv")
  }
  if (tranceLevel < 0) {
    if (TvNoise.active) {
      playYouLostScene("youlosetv")
    } else {
      playYouLostScene("youlosewolf")
    }
  }

  // end of variable updates, only displays below
  tranceProgress.handleProgress(new createjs.ProgressEvent(tranceLevel, 10))
  var roundedTranceLevel = (Math.round(tranceLevel * 100) / 100)
  if (logIt % 14 == 0) {
    // console.log("time: " + (time / 1000) + ", trance: " + roundedTranceLevel + ", noise: " + noiseLevel)
  }
  logIt++
  tranceleveltext.text = roundedTranceLevel.toString();
  noiseleveltext.text = noiseLevel.toString();
  statusMessage.text = player.pickBestMessage(time)
  stage.update();
  lastTickTime = time;
}

function updateNoiseLevel(time: number) {
  noiseLevel = 0
  wolfNoise.tick(time)
  noiseLevel += walkingNoise.getActiveNoiseLevel(time) + TvNoise.getActiveNoiseLevel(time) + wolfNoise.getActiveNoiseLevel(time)
  if (noiseLevel > lastNoiseLevel) {
    if (noiseLevel >= 5) {
      if (tranceLevel < 10) {
        tranceLevel -= (noiseLevel - 5)
        tranceLevel = Math.floor(tranceLevel)
      }
    }
  }
  lastNoiseLevel = noiseLevel
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
  var progressBar = new ProgressBar(stage, true, 0, 0, 0, 0)
  loadSounds(queue, startScenes, progressBar)
}

function startScenes() {
  playIntroScene()
}

// intro page function
function playIntroScene() {
  // make the stage
  stage.removeAllChildren()

  // elements of the title page
  var cabinBitmap = new createjs.Bitmap(queue.getResult("introcabin"))
  cabinBitmap.x = cabinBitmap.y = 0
  cabinBitmap.scaleX = cabinBitmap.scaleY = .45
  stage.addChild(cabinBitmap)


  tt1bg.graphics.beginFill("#406e20").drawRoundRectComplex(0, 0, 660, 250, 10, 10, 10, 10)
  tt1bg.x = 95
  tt1bg.y = 60

  tt4bg.graphics.beginFill("#406e20").drawRoundRectComplex(0, 0, 560, 95, 10, 10, 10, 10)
  tt4bg.x = 195
  tt4bg.y = 360

  tt5bg.graphics.beginFill("#69b535").drawRoundRectComplex(0, 0, 240, 75, 10, 10, 10, 10)
  tt5bg.x = 515
  tt5bg.y = 485

  // intro game text (text declared at the top)
  titleText1.x = 110
  titleText1.y = 100
  titleText1.textBaseline = "alphabetic";

  titleText2.x = 110
  titleText2.y = 150
  titleText2.textBaseline = "alphabetic";

  titleText3.x = 110
  titleText3.y = 230
  titleText3.textBaseline = "alphabetic";

  titleText4.x = 210
  titleText4.y = 400
  titleText4.textBaseline = "alphabetic";

  titleText5.x = 540
  titleText5.y = 530
  titleText5.textBaseline = "alphabetic";

  //  wait a half second for the cabin image to load before updating the stage
  setTimeout(function () {
    stage.update()
  }, 500);

  setTimeout(function () {
    stage.addChild(tt1bg, titleText1)
    stage.update()
  }, 1000)

  setTimeout(function () {
    stage.addChild(titleText2)
    stage.update()
  }, 2500)

  setTimeout(function () {
    stage.addChild(titleText3)
    stage.update()
  }, 4000)

  setTimeout(function () {
    stage.addChild(tt4bg, titleText4)
    stage.update()
  }, 6500)

  setTimeout(function () {
    stage.addChild(tt5bg, titleText5)
    stage.update()

    canvas.onclick = () => {
      canvas.onclick = null
      playGameScene()
    }
  }, 7500)

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
    } else if (keyEvent.type == "keyup") {
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
  stage.removeAllChildren()
  gameContainer.removeAllChildren()
  resetVars()
  walkingNoise = new PlayerNoise(Walking)
  TvNoise = new PlayerNoise(Tv)
  // setTimeout(function () {
  //   TvNoise.active = true
  // }, 1000)
  backgroundMusic = createjs.Sound.play("background_music", { loop: -1 })
  backgroundMusic.volume = .4

  // create a background rectangle
  outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height)

  // create the inner rectangle for the "floor" of the cabin
  innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30)

  // dashboard displaying trance level and noise level
  dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 140, 5, 5, 5, 5)
  dashboard_bg.x = 200
  dashboard_bg.y = 30
  dashboard_bg.setBounds(0, 0, 400, 120)

  dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 120, 5, 5, 5, 5)
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

  statusMessage.x = 225
  statusMessage.y = 145
  statusMessage.textBaseline = "alphabetic";


  // trance table!
  trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120)
  trancetable.x = 275
  trancetable.y = 250
  trancetable.setBounds(0, 0, 250, 120)

  // person on trance table!

  // wolf image
  wolfBitmap = new createjs.Bitmap(queue.getResult("wolfimage"));
  wolfBitmap.x = canvas.width - 150
  wolfBitmap.y = canvas.height - 100
  wolfBitmap.scaleX = wolfBitmap.scaleY = .2
  wolfNoise.active = true

  wizBitmap = new createjs.Bitmap(queue.getResult("wizardimage"))
  wizBitmap.x = 295
  wizBitmap.y = 275
  wizBitmap.scaleX = wizBitmap.scaleY = .4

  // tv
  tvBitmap = new createjs.Bitmap(queue.getResult("tvimage"));
  tvBitmap.x = 40
  tvBitmap.y = 140
  tvBitmap.scaleX = tvBitmap.scaleY = 1.5

  // chair
  chairBitmap = new createjs.Bitmap(queue.getResult("chairimage"));
  chairBitmap.x = 100
  chairBitmap.y = 170
  chairBitmap.scaleX = chairBitmap.scaleY = .35

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
  })
  var playerSprite = new createjs.Sprite(playerSpriteSheet)
  player = new Player(playerSprite, canvas.width / 2, canvas.height - 100, 46, 50)

  // add elements to the container for this scene
  gameContainer.addChild(outerwall, innerwall, dashboard_bg, dashboard_fg, trancelabel, noiselabel, /*tranceleveltext,*/ noiseleveltext, statusMessage, trancetable, wizBitmap, wolfBitmap, tvBitmap, chairBitmap, playerSprite)
  gameContainer.setChildIndex(outerwall, 0)
  gameContainer.setChildIndex(innerwall, 1)
  tranceProgress = new ProgressBar(stage, false, 360, 50, 220, 40)
  gameContainer.addChild(tranceProgress.outerBar, tranceProgress.innerBar)
  stage.addChild(gameContainer)

  // Update stage will render next frame
  stage.update()
  createjs.Ticker.addEventListener("tick", gameLoop)
}



// "you won" page function
function playYouWonScene() {
  wolfNoise.active = false
  if (wolfNoise.soundInstance) {
    wolfNoise.soundInstance.muted = true
  }
  TvNoise.active = false
  TvNoise.soundInstance.muted = true
  createjs.Ticker.reset()
  backgroundMusic.muted = true
  backgroundMusic.destroy()
  var youWinSound = createjs.Sound.play("youwin")
  stage.removeAllChildren()
  // place some "you won!" text on the screen (declared at the top)
  youWonText.x = 360
  youWonText.y = 115
  youWonText.textBaseline = "alphabetic";
  createjs.Ticker.removeEventListener("tick", gameLoop)

  stage.addChild(youWonText, playAgainText)

  stage.update()
  canvas.onclick = () => {
    canvas.onclick = null
    playGameScene()
  }
}

function playYouLostScene(losingSound: string) {
  wolfNoise.active = false
  if (wolfNoise.soundInstance) {
    wolfNoise.soundInstance.muted = true
  }
  TvNoise.active = false
  TvNoise.soundInstance.muted = true
  createjs.Ticker.reset()
  backgroundMusic.muted = true
  backgroundMusic.destroy()
  var youLoseSound = createjs.Sound.play(losingSound)
  canvas = <HTMLCanvasElement>stage.canvas
  stage.removeAllChildren()
  // place some "you won!" text on the screen (declared at the top)
  youLostText.x = 360
  youLostText.y = 115
  youLostText.textBaseline = "alphabetic";
  playAgainText.x = 330
  playAgainText.y = 300

  stage.addChild(youLostText, playAgainText)

  stage.update()
  canvas.onclick = () => {
    canvas.onclick = null
    playGameScene()
  }
}

// "you lost" page function

window.onload = () => {
  init()
}
