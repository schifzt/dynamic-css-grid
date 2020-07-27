class Pane {
	constructor(isHead = false) {
		this.elm = null;
		this.prev = null;
		this.next = null;
		if (isHead) {
			// Create head and the 1st paneat the same time
			this._insertNext();
			this.next.elm.style.gridColumn = "1 / 2";
			this.next.elm.style.gridRow = "1 / 2";
		}
	}

	splitColumn() {
		// Add a new column to grid
		let n_col = countColumn(container);
		container.style.gridTemplateColumns = "1fr ".repeat(n_col) + "1fr";

		// Create a new pane
		this._insertNext();

		// Allocate a new pane to grid
		let selected_ga = gridAreaToArray(this);
		let gridarea = Array(selected_ga[0], selected_ga[1] + 1, selected_ga[2], selected_ga[3] + 1);
		this.next.elm.style.gridArea = arrayToGridArea(gridarea);

		// Re-allocate panes to grid
		let pane = this.next.next;
		while (true) {
			if (pane === null) {
				break;
			}

			let ga = gridAreaToArray(pane);
			console.log(ga);
			// if a pane is in the same row with the selected pane,
			if (ga[0] == selected_ga[0] && ga[2] == selected_ga[2]) {
				let new_ga = Array(ga[0], ga[1] + 1, ga[2], ga[3] + 1);
				pane.elm.style.gridArea = arrayToGridArea(new_ga);
				console.log("hi!");
				console.log(new_ga);
			} else {
				let new_ga = Array(ga[0], ga[1], ga[2], ga[3] + 1);
				pane.elm.style.gridArea = arrayToGridArea(new_ga);
				console.log("yo!");
				console.log(new_ga);
			}

			pane = pane.next;
		}
	}

	splitRow() {
		let n_row = countRow(container);
		container.style.gridTemplateRows = "1fr ".repeat(n_row) + "1fr";

		this._insertNext();


		let selected_ga = gridAreaToArray(this);
		let ga = Array(selected_ga[0] + 1, selected_ga[1], selected_ga[2] + 1, selected_ga[3]);
		this.next.elm.style.gridArea = arrayToGridArea(ga);
		console.log(selected_ga);
		console.log(ga);

		let pane = this.next.next;
		while (true) {
			if (pane.next === null) {
				break;
			}

			let ga = gridAreaToArray(pane);
			console.log(ga);
			// if a pane is in the same column with the selected pane,
			if (ga[1] == selected_ga[1] && ga[3] == selected_ga[3]) {
				let new_ga = Array(ga[0] + 1, ga[1], ga[2] + 1, ga[3]);
				pane.elm.style.gridArea = arrayToGridArea(new_ga);
				console.log("hi!");
				console.log(new_ga);
			} else {
				let new_ga = Array(ga[0], ga[1], ga[2] + 1, ga[3]);
				pane.elm.style.gridArea = arrayToGridArea(new_ga);
				console.log("yo!");
				console.log(new_ga);
			}

			pane = pane.next;
		}

		// let col_linenum = parseInt(getComputedStyle(this.elm).gridColumn[0], 10);
		// let row_linenum = parseInt(getComputedStyle(this.elm).gridRow[0], 10);

		// let pane = this.next;
		// let inc = 1;
		// while (true) {
		// 	pane.elm.style.gridColumn = col_linenum + " / " + (col_linenum + 1);
		// 	pane.elm.style.gridRow = (row_linenum + inc) + " / " + (row_linenum + inc + 1);
		// 	if (pane.next === null) {
		// 		break;
		// 	}
		// 	++inc;
		// 	pane = pane.next;
		// }
	}

	_addCanvas() {
		this.elm = document.createElement("canvas");
		// this.elm.className = "pane-element";
		this.elm.classList.add("pane-element");
		document.getElementById("container").appendChild(this.elm);
	}

	_insertNext() {
		let new_pane = new Pane();
		new_pane._addCanvas();

		new_pane.prev = this;
		new_pane.next = this.next;
		if (new_pane.next !== null) {
			(new_pane.next).prev = new_pane;
		}
		this.next = new_pane;
	}

	_deleteThis() {
		// if head => ignore
		if (this.prev === null) {
			return;
		}

		this.prev.next = this.next;
		if (this.next !== null) {
			(this.next).prev = this.prev;
		}
	}
}
