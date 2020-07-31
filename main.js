const container = document.getElementById("container");

const max_col_split = 7;
const max_row_split = 7;
container.style.gridTemplateColumns = "1fr ".repeat(2 ** max_col_split);
container.style.gridTemplateRows = "1fr ".repeat(2 ** max_row_split);

const head = new Pane(isHead = true);
var pane = head.next;

// Set key-binding
var ctrlKeyPressed = false;
var isPrefixInput = false;
window.addEventListener("keydown", function (e) {
	ctrlKeyPressed = e.ctrlKey;
});
window.addEventListener("keypress", function (e) {
	// ctrl + ?
	if (ctrlKeyPressed && e.key == 'w') {
		pane.highlightOff();
		pane = pane.moveForward();
		pane.highlightOn();
	} else if (ctrlKeyPressed && e.key == 'b') {
		isPrefixInput = true;
	}

	// prefix + ?
	if (isPrefixInput && e.key == 'v') {
		pane.splitColumn();
		isPrefixInput = false;
	} else if (isPrefixInput && e.key == 'h') {
		pane.splitRow();
		isPrefixInput = false;
	}
});

// document.getElementsByClassName('pane')
window.addEventListener("click", function (e) {
	console.log(e.target);
});