let circle: createjs.Shape
let stage: createjs.Stage
let tranceLevel = 0
let noiseLevel = 0
let lastTickTime = 0
let canvas: HTMLCanvasElement
var outerwall = new createjs.Shape();
var innerwall = new createjs.Shape();
var dashboard_bg = new createjs.Shape();
var dashboard_fg = new createjs.Shape();
var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
var tranceleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var noiseleveltext = new createjs.Text("#", "20px Arial", "#bdbef2");
var trancetable = new createjs.Shape();
let greycircle = new createjs.Shape()
var wolflabel = new createjs.Text("Wolf", "20px Arial", "#302a36");

function gameLoop(event: Object) {
  let time = createjs.Ticker.getTime();
  console.log(time)
  if (time >= 1000 && time < 2000) {
    tranceLevel = 1;
  } else if (time >= 2000 && time < 3000) {
    tranceLevel = 2;
  } else if (time >= 3000) {
    tranceLevel = 3;
  }
  tranceleveltext.text = tranceLevel.toString();
  noiseleveltext.text = noiseLevel.toString();

  let e = <Event>(event);
  stage.update();
  lastTickTime = time;
}

function init() {
  playGameScene();
}

function playGameScene() {
  // create a Stage by getting a reference to a canvas
  stage = new createjs.Stage('demoCanvas')
  canvas = <HTMLCanvasElement>stage.canvas
  // create a Shape DisplayObject
  // let circle = new createjs.Shape()
  // circle.graphics.beginFill('red').drawCircle(0, 0, 40)
  // Set position of Shape instance.
  // circle.x = circle.y = 150
  // Add Shape instance to stage display list.
  // stage.addChild(circle)

  // create a background rectangle
  outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height)
  stage.addChild(outerwall)
  stage.setChildIndex(outerwall, 0)

  // create the inner rectangle for the "floor" of the cabin
  innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30)
  stage.addChild(innerwall)
  stage.setChildIndex(innerwall, 1)

  // dashboard displaying trance level and noise level
  dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5)
  dashboard_bg.x = 200
  dashboard_bg.y = 30
  stage.addChild(dashboard_bg)

  dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5)
  dashboard_fg.x = 210
  dashboard_fg.y = 40
  stage.addChild(dashboard_fg)

  // metrics text labels
  trancelabel.x = 225
  trancelabel.y = 75
  trancelabel.textBaseline = "alphabetic";
  stage.addChild(trancelabel)

  noiselabel.x = 225
  noiselabel.y = 115
  noiselabel.textBaseline = "alphabetic";
  stage.addChild(noiselabel)

  // metrics numbers
  tranceleveltext.x = 360
  tranceleveltext.y = 75
  tranceleveltext.textBaseline = "alphabetic";
  stage.addChild(tranceleveltext)

  noiseleveltext.x = 360
  noiseleveltext.y = 115
  noiseleveltext.textBaseline = "alphabetic";
  stage.addChild(noiseleveltext)

  // trance table!
  trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120)
  trancetable.x = 275
  trancetable.y = 250
  stage.addChild(trancetable)

  // person on trance table!


  // create a grey circle - wolf!
  greycircle.graphics.beginFill('grey').drawCircle(0, 0, 40)
  greycircle.x = canvas.width - 100
  greycircle.y = canvas.height - 100
  stage.addChild(greycircle)

  // wolf text
  wolflabel.x = canvas.width - 120;
  wolflabel.y = canvas.height - 100;
  wolflabel.textBaseline = "alphabetic";
  stage.addChild(wolflabel)
  // stage.setChildIndex(wolflabel, 4)

  // Update stage will render next frame
  stage.update()
  createjs.Ticker.addEventListener("tick", gameLoop)
}

window.onload = () => {
  init()
}