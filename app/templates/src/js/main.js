/**
 * Game object constructor
 */
var GameApp = function () {
    var self = this;

    // create the stage
    self.stage = new createjs.Stage("canvas");

    // Set up our tick event
    createjs.Ticker.addEventListener("tick", function(event){
        self.tick(event);
    });
    createjs.Ticker.setFPS(60);
};

/**
 * Tick event handler. This is called every tick.
 */
GameApp.prototype.tick = function (event) {
    var self = this;

    // get the delta time
    var delta = event.delta/1000.0;

    // Put your logic here

    // Update the stage (for drawing). Pass in the event so the
    // animations get the proper delta time.
    self.stage.update(event);
};
