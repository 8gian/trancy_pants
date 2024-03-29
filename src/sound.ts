import { ProgressBar } from "./progressbar"
export let wolfSound: string = "wolf"
export let outsideSound: string = "outside"
export function loadSounds(queue: createjs.LoadQueue, next: () => void, progressBar?: ProgressBar) {
  queue.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ["mp3"];
  if (progressBar) {
    queue.on("progress", progressBar.handleProgress, progressBar)
  }
  queue.on("complete", {
    handleEvent: (event) => {
      if (progressBar) {
        queue.off("progress", progressBar.handleProgress)
        progressBar.handleComplete(event)
      }
      next()
    }
  })
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
    { id: "wizardimage", src: "res/wizard.png" },
    { id: "background_music", src: "res/background_music.mp3" }
  ])
}

