// In : pane
// Out: array of line numbers of an input pane, i.e. [top, left, bottom, right]
function gridAreaToArray(pane) {
	let s = getComputedStyle(pane.elm).gridArea;
	return (s.split(" / ").map(str => parseInt(str, 10)));
}

// In : array of line numbers of an input pane, i.e. [top, left, bottom, right]
// Out: CSS grid-area format of an input array
function intToGridArea(top, left, bottom, right) {
	return (
		top + " / " +
		left + " / " +
		bottom + " / " +
		right
	)
}


// <Optional> Lower pacity of ovarlay contents
function lowerOpacity() {
	overlay_opacity *= gamma;
	document.getElementById("overlay").style.opacity = overlay_opacity;
}