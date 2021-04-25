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

  // dashboard displaying trance level and noise level
  var dashboard_bg = new createjs.Shape();
  dashboard_bg.graphics.beginFill("#141670").drawRect(0, 0, 400, 100)
  dashboard_bg.x = 200
  dashboard_bg.y = 50
  stage.addChild(dashboard_bg)
  stage.setChildIndex(dashboard_bg, 0)

  // trance table!


  // person on trance table!
  

  // create a grey circle - wolf!
  let greycircle = new createjs.Shape()
  greycircle.graphics.beginFill('grey').drawCircle(0, 0, 60)
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

  // create a background rectangle
  var outerwall = new createjs.Shape();
  outerwall.graphics.beginFill("#4d1c20").drawRect(0, 0, (<HTMLCanvasElement>stage.canvas).width, (<HTMLCanvasElement>stage.canvas).height)
  stage.addChild(outerwall)
  stage.setChildIndex(outerwall, 0)
 
  var innerwall = new createjs.Shape();
  innerwall.graphics.beginFill("#7e6a94").drawRect(15, 15, (<HTMLCanvasElement>stage.canvas).width - 30, (<HTMLCanvasElement>stage.canvas).height - 30)
  stage.addChild(innerwall)
  stage.setChildIndex(innerwall, 1)

  // Update stage will render next frame
  stage.update()
}