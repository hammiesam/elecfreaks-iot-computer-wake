input.onButtonPressed(Button.A, function () {
    servos.P2.setAngle(180)
    basic.pause(1000)
    servos.P2.setAngle(100)
})
let tm4blynk = ""
radio.setGroup(1)
OLED12864_I2C.init(60)
esp8266.init(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
esp8266.connectWiFi("barnabaspartners", "CRaiBnP2017")
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P1,
true,
false,
true
)
BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76)
BME280.PowerOn()
if (esp8266.isWifiConnected()) {
    basic.showLeds(`
        # . . . #
        # . . . #
        # . # . #
        . # # # .
        . # # # .
        `)
} else {
    basic.showIcon(IconNames.No)
}
let _7seg = TM1637.create(
DigitalPin.P13,
DigitalPin.P10,
7,
4
)
OLED12864_I2C.zoom(true)
basic.forever(function () {
    OLED12864_I2C.showString(
    4,
    2,
    "" + dht11_dht22.readData(dataType.temperature) + " C",
    1
    )
    OLED12864_I2C.showString(
    4,
    3,
    "" + dht11_dht22.readData(dataType.humidity) + " %RH",
    1
    )
    if (esp8266.readBlynk("SaaHGIDP4oko5aO0tVPLZw1nyIGw7IvM", "V7") == "1") {
        servos.P2.setAngle(180)
        basic.pause(1000)
        servos.P2.setAngle(100)
    } else {
        servos.P2.setAngle(100)
    }
    if (DS1307.getMinute() < 10) {
        OLED12864_I2C.showString(
        0,
        0,
        "" + DS1307.getHour() + ":" + "0" + DS1307.getMinute(),
        1
        )
        tm4blynk = "" + DS1307.getHour() + ":" + "0" + DS1307.getMinute()
        _7seg.showNumber(parseFloat("" + DS1307.getHour() + "0" + DS1307.getMinute()))
    } else {
        OLED12864_I2C.showString(
        4,
        0,
        "" + DS1307.getHour() + ":" + DS1307.getMinute(),
        1
        )
        tm4blynk = "" + DS1307.getHour() + ":" + DS1307.getMinute()
        _7seg.showNumber(parseFloat("" + DS1307.getHour() + DS1307.getMinute()))
    }
})
