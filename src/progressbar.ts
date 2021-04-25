export class ProgressBar {
  outerBar: createjs.Shape
  innerBar: createjs.Shape
  progress: number
  stage?: createjs.Stage
  removeOnLoad: boolean
  constructor(stage: createjs.Stage, removeOnLoad: boolean) {
    this.outerBar = new createjs.Shape()
    this.innerBar = new createjs.Shape()
    this.outerBar.graphics.beginFill("#181818").drawRoundRectComplex(0, 0, 400, 60, 5, 5, 5, 5)
    this.outerBar.x = 200
    this.outerBar.y = 270
    this.progress = 0
    stage.addChild(this.outerBar)

    this.innerBar.graphics.beginFill("#327fa8").drawRect(0, 0, 380, 40)
    this.innerBar.x = 210
    this.innerBar.y = 280
    this.innerBar.scaleX = this.progress

    stage.addChild(this.innerBar)
    this.stage = stage
    this.removeOnLoad = removeOnLoad
  }
  handleProgress(event: Object) {
    var progressEvent = <createjs.ProgressEvent>event
    this.progress = progressEvent.progress
    this.innerBar.scaleX = this.progress
    this.stage!.update()
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