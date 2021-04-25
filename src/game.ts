let canvas:HTMLCanvasElement

window.onload = () => {
  // create a Stage by getting a reference to a canvas
  let stage = new createjs.Stage('demoCanvas')
  canvas = <HTMLCanvasElement>stage.canvas
  // create a Shape DisplayObject
  // let circle = new createjs.Shape()
  // circle.graphics.beginFill('red').drawCircle(0, 0, 40)
  // Set position of Shape instance.
  // circle.x = circle.y = 150
  // Add Shape instance to stage display list.
  // stage.addChild(circle)

  // create a background rectangle
  var outerwall = new createjs.Shape();
  outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, canvas.width, canvas.height)
  stage.addChild(outerwall)
  stage.setChildIndex(outerwall, 0)
 
  // create the inner rectangle for the "floor" of the cabin
  var innerwall = new createjs.Shape();
  innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, canvas.width - 30, canvas.height - 30)
  stage.addChild(innerwall)
  stage.setChildIndex(innerwall, 1)

  // dashboard displaying trance level and noise level
  var dashboard_bg = new createjs.Shape();
  dashboard_bg.graphics.beginFill("#141670").drawRoundRectComplex(0, 0, 400, 120, 5, 5, 5, 5)
  dashboard_bg.x = 200
  dashboard_bg.y = 30
  stage.addChild(dashboard_bg)

  var dashboard_fg = new createjs.Shape();
  dashboard_fg.graphics.beginFill("#393cdb").drawRoundRectComplex(0, 0, 380, 100, 5, 5, 5, 5)
  dashboard_fg.x = 210
  dashboard_fg.y = 40
  stage.addChild(dashboard_fg)

  // metrics text labels
  var trancelabel = new createjs.Text("Trance level:", "20px Arial", "#bdbef2");
  trancelabel.x = 225
  trancelabel.y = 75
  trancelabel.textBaseline = "alphabetic";
  stage.addChild(trancelabel)

  var noiselabel = new createjs.Text("Noise level:", "20px Arial", "#bdbef2");
  noiselabel.x = 225
  noiselabel.y = 115
  noiselabel.textBaseline = "alphabetic";
  stage.addChild(noiselabel)

  // metrics numbers
  var trancelevel = new createjs.Text("#", "20px Arial", "#bdbef2");
  trancelevel.x = 360
  trancelevel.y = 75
  trancelevel.textBaseline = "alphabetic";
  stage.addChild(trancelevel)

  var noiselevel = new createjs.Text("#", "20px Arial", "#bdbef2");
  noiselevel.x = 360
  noiselevel.y = 115
  noiselevel.textBaseline = "alphabetic";
  stage.addChild(noiselevel)

  // trance table!
  var trancetable = new createjs.Shape();
  trancetable.graphics.beginFill("#bdf2e2").drawRect(0, 0, 250, 120)
  trancetable.x = 275
  trancetable.y = 250
  stage.addChild(trancetable)

  // person on trance table!
  

  // create a grey circle - wolf!
  let greycircle = new createjs.Shape()
  greycircle.graphics.beginFill('grey').drawCircle(0, 0, 40)
  greycircle.x = canvas.width - 100
  greycircle.y = canvas.height - 100
  stage.addChild(greycircle)

  // wolf text
  var wolflabel = new createjs.Text("Wolf", "20px Arial", "#302a36");
  wolflabel.x = canvas.width - 120;
  wolflabel.y = canvas.height - 100;
  wolflabel.textBaseline = "alphabetic";
  stage.addChild(wolflabel)
  // stage.setChildIndex(wolflabel, 4)



  // Update stage will render next frame
  stage.update()
}