// Parameters
const pane_bg = "#FFFFFF";
const pane_bg_highlight = "#dee8e4";
const max_col_split = 6;
const max_row_split = 6;

var overlay_opacity = 1;
const gamma = 0.95;
document.getElementById("overlay").style.opacity = overlay_opacity;

// ----------------------------------

const container = document.getElementById("container");
container.style.gridTemplateColumns = "1fr ".repeat(2 ** max_col_split);
container.style.gridTemplateRows = "1fr ".repeat(2 ** max_row_split);

const head = new Pane(isHead = true);
var itr = head.next;

// Catch key-binding
var caughtCtrl = false;
var caughtPrefix = false;
window.addEventListener("keydown", function (e) {
	caughtCtrl = e.ctrlKey;
});
window.addEventListener("keypress", function (e) {
	// ctrl + ?
	if (caughtCtrl && e.key == 'w') {
		itr.highlightOff();
		itr = itr.moveForward();
		itr.highlightOn();
	}
	if (e.key == ':') {
		caughtPrefix = true;
	}
	// prefix + ?
	if (caughtPrefix && e.key == 'v') {
		itr.splitColumn();
		caughtPrefix = false;
	} else if (caughtPrefix && e.key == 'h') {
		itr.splitRow();
		caughtPrefix = false;
	} else if (caughtPrefix && e.key == 'r') {
		random_split();
		caughtPrefix = false;
	}
});
