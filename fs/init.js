load('api_config.js');
load('api_gpio.js');
load('api_sys.js');
load('api_timer.js');
load('api_bme280.js');

let led = 2;

print('Hello World!');

Timer.set(1000 /* 1 sec */, true /* repeat */, function () {
    let sensor = BME280.read();
    if (sensor) {
      //let p = sensor.pressure * 10;
      print('temperature:', sensor.temperature, '*C -- humidity:', sensor.humidity, '%RH -- pressure:', sensor.pressure, 'hPa');
    }else{
      print('no sensor');
    }
  }, null);
