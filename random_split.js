const count_max = 100;
const stride = 10;
const delay_ms = 80;

var command_count = 0;
random_split = function () {
    setTimeout(function () {
        ++command_count;

        rint = parseInt(stride * Math.random(), 10);
        if (rint <= stride * 0.15) {
            // 15%
            itr.splitRow();
        } else if (rint <= stride * 0.3) {
            // 30%
            itr.splitColumn();
        } else {
            // 60%
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