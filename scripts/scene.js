var config = {
    type: Phaser.CANVAS,
    width: 1920,
    height: 1080,
    // backgroundColor: '#2d2d2d',
    // parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var windowWidthCenter = window.innerWidth / 2;
var widnowHeightCenter = window.innerHeight / 2;

function preload ()
{
    this.load.video('titleBackground', 'assets/video/title_background.mp4', 'loadeddata', false, true);
}

function create ()
{
    var vid = this.add.video(windowWidthCenter, widnowHeightCenter, 'titleBackground');

    vid.play(true);

    // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
    vid.setPaused(false);
}
