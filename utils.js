function countColumn(elm) {
	let grid_layout = getComputedStyle(elm).gridTemplateColumns;
	return ((grid_layout.match(/px/g) || []).length);
}

function countRow(elm) {
	let grid_layout = getComputedStyle(elm).gridTemplateRows;
	return ((grid_layout.match(/px/g) || []).length);
}

// [row_top, col_left, row_bottom, col_right]
function gridAreaToArray(pane) {
	let s = getComputedStyle(pane.elm).gridArea;
	return Array(s[0], s[4], s[8], s[12]).map(str => parseInt(str, 10));
}

function arrayToGridArea(arr) {
	return (
		arr[0] + " / " +
		arr[1] + " / " +
		arr[2] + " / " +
		arr[3]
	)
}