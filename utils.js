/*
input: pane
output: array of line numbers of a input pane, i.e. [top, left, bottom, right]
 */
function gridAreaToArray(pane) {
	let s = getComputedStyle(pane.elm).gridArea;
	return (s.split(" / ").map(str => parseInt(str, 10)));
}

function intToGridArea(top, left, bottom, right) {
	return (
		top + " / " +
		left + " / " +
		bottom + " / " +
		right
	)
}