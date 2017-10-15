load('api_config.js');
load('api_gpio.js');
load('api_sys.js');
load('api_timer.js');
load('api_arduino_bme280.js');

let led = 2;
// Sensors address
let sens_addr = Cfg.get('i2c.address') | 0x76;
// Initialize Adafruit_BME280 library
let bme = Adafruit_BME280.create();

print('Hello World!');

Timer.set(1000 /* 1 sec */, true /* repeat */, function() {
  let value = GPIO.toggle(led);
  print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());

    // Initialize the sensor
    if (bme.begin(sens_addr) === 0) {
        print('Cant find a sensor');
    } else {
        print('BME280 sensor found!');
        print('Temperature:', bme.readTemperature(), '*C');
        print('Humidity:', bme.readHumidity(), '%RH');
        print('Pressure:', bme.readPressure(), 'hPa');
    }
  
    print('XXXXXXXXXXXXXXXXXXXXXXXXXXX');
    let x = I2C.get();
    let data = I2C.read(x, sens_addr, 3, true);
    if (data) print(JSON.stringify([data.at(0), data.at(1), data.at(2)]));
}, null);

//let ram = Sys.free_ram() / 1024;
//let temperature = bme.readTemperature();
//let humidity = bme.readHumidity();
//let pressure = bme.readPressure();
