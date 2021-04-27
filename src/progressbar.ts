export class ProgressBar {
  outerBar: createjs.Shape
  innerBar: createjs.Shape
  progress: number
  stage?: createjs.Stage
  removeOnLoad: boolean
  constructor(stage?: createjs.Stage, removeOnLoad?: boolean, x?: number, y?: number, width?: number, height?: number) {
    this.outerBar = new createjs.Shape()
    this.innerBar = new createjs.Shape()
    if (!width || !height) {
      width = 400
      height = 60
    }
    if (!x || !y) {
      x = 200
      y = 270
    }
    this.outerBar.graphics.beginFill("#181818").drawRoundRectComplex(0, 0, width, height, 5, 5, 5, 5)
    this.outerBar.x = x
    this.outerBar.y = y
    this.progress = 0
    if (stage) {
      stage.addChild(this.outerBar)
    }

    this.innerBar.graphics.beginFill("#327fa8").drawRect(0, 0, width - 20, height - 20)
    this.innerBar.x = x + 10
    this.innerBar.y = y + 10
    this.innerBar.scaleX = this.progress

    if (stage) {
      stage.addChild(this.innerBar)
    }
    this.stage = stage
    this.removeOnLoad = removeOnLoad || false
  }
  handleProgress(event: Object) {
    var progressEvent = <createjs.ProgressEvent>event
    this.progress = progressEvent.progress
    this.innerBar.scaleX = this.progress
    if (this.stage) {
      this.stage.update()
    }
  }
  remove() {
    if (this.stage) {
      this.stage!.removeChild(this.outerBar)
      this.stage!.removeChild(this.innerBar)
      this.stage!.update()
      this.stage = undefined
    }
  }
  handleComplete(event: Object) {
    if (this.removeOnLoad) {
      this.remove()
    }
  }
}