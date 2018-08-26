function normalize(number) {
    var val = parseInt(number, 10)
    return val > 9 ? val : "0" + val
}

export default function timeUnit(time) {
    var hour = normalize(time / (60*60))
    time = time % (60*60)

    return (hour != '00' ? hour + ":" : "")
        + normalize(time / 60) + ":" 
        + normalize(time % 60)
}
