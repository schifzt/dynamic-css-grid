const count_max = 500;
const delay_ms = 60;
var command_count = 0;

random_split = function () {
    setTimeout(function () {
        ++command_count;

        rint = parseInt(100 * Math.random(), 10);
        if (rint <= 15) {
            // 15%
            itr.splitRow();
        } else if (rint <= 30) {
            // 15%
            itr.splitColumn();
        } else {
            // 70%
            itr.highlightOff();
            itr = itr.moveForward();
            itr.highlightOn();
        }

        if (command_count < count_max) {
            random_split();
        }
        else {
            command_count = 0;
        }

    }, delay_ms)
}