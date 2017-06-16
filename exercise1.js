const Raspi = require('raspi-io')
const five = require('johnny-five')
const board = new five.Board({
  io: new Raspi()
})
const req = require('request')

board.on('ready', () => {
  let led = new five.Led('P1-19')
  //led.strobe()
  let strobing = true
  let requesting = false

  let button = five.Button('P1-11')
  button.on('press', () => {

    if (!requesting) {
      requesting = true;
      req('https://uacpjy16u6.execute-api.us-east-1.amazonaws.com/prod/dinojs-lambda-dev-hello', function (error, response, body) {
        console.log(body.numSeconds);
        led.strobe()
        setTimeout(function () {
          led.stop().off();
          requesting = false;
        }, body.numSeconds * 1000)
      });
    }



    //strobing ? led.stop().off() : led.strobe()
    //strobing = !strobing
  })

  /*this.repl.inject({
    button,
    led
  })*/
});
