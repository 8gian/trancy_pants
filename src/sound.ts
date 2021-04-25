
export let wolfSound: string = "wolf"
export let outsideSound: string = "outside"
export function loadSounds(queue: createjs.LoadQueue, next: () => void) {
  queue.installPlugin(createjs.Sound);
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.loadFile({ id: "wolf", src: "res/wolf.mp3" })
  queue.loadFile({ id: "outside", src: "res/outside.mp3" })
  queue.on("complete", { handleEvent: (event) => { next() } })
}

