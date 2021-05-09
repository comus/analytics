let log = require('simple-node-logger').createSimpleLogger(`./logs/${Date.now()}.log`);

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.SLAB_USBtoUART', {
  baudRate: 115200
})

const parser = port.pipe(new Readline())
parser.on('data', data => {
  // console.log('data', data)
  if (data.includes('[#]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[#],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  } else if (data.includes('[!]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[!],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  } else if (data.includes('[2]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[2],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  } else if (data.includes('[4]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[4],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  } else if (data.includes('[8]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[8],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  } else if (data.includes('[16]')) {
    const arr = data.split(',')
    const time = parseInt(arr[2].replace('\x1B[0m\r', ''))
    log.info(`[16],${time % 1000},${Math.round(time / 1000)},"${new Date().toISOString()}"`)
  }
})


var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout);

rl.prompt();

rl.on('line', function(line) {
  const cmd = line.trim()
    if (cmd === 'hello') {
      console.log('world!');
    } else if (cmd) {
      log = require('simple-node-logger').createSimpleLogger(`./logs/${cmd}.log`);
    }
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});
