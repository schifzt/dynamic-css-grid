class Pane {
	constructor(isHead = false) {
		this.elm = null;
		this.prev = null;
		this.next = null;
		if (isHead) {
			// Create the 1st pane when head is defined.
			this._insertNext();
			this.next.elm.style.gridColumn = "1 / " + (2 ** max_col_split + 1);
			this.next.elm.style.gridRow = "1 / " + (2 ** max_row_split + 1);
			this.next.elm.style.backgroundColor = "#dee8e4";
		}
	}

	highlightOn() {
		this.elm.style.backgroundColor = "#dee8e4";
	}
	highlightOff() {
		this.elm.style.backgroundColor = "#FFFFFF";
	}

	moveForward() {
		if (this.next !== null) {
			return (this.next);
		} else {
			return (head.next);
		}
	}

	moveBackward() {
		// if (this.prev !== null) {
		// 	return (this.prev);
		// } else { }
	}

	splitColumn() {
		// Fetch line numbers of a selected pane
		let [top, left, bottom, right] = gridAreaToArray(this);

		if (right - left > 1) {
			// Create a new pane
			this._insertNext();

			// Allocate a new pane & Re-allocate a selected pane to grid
			let mid = (left + right) / 2;
			this.elm.style.gridArea = intToGridArea(top, left, bottom, mid);
			this.next.elm.style.gridArea = intToGridArea(top, mid, bottom, right);
		}
	}

	splitRow() {
		let [top, left, bottom, right] = gridAreaToArray(this);
		if (bottom - top > 1) {
			this._insertNext();
			let mid = (top + bottom) / 2;
			this.elm.style.gridArea = intToGridArea(top, left, mid, right);
			this.next.elm.style.gridArea = intToGridArea(mid, left, bottom, right);
		}
	}

	delete() {
		let [top, left, bottom, right] = gridAreaToArray(this);

	}


	_addCanvas() {
		this.elm = document.createElement("canvas");
		this.elm.classList.add("pane");
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
		// if this == head, ignore
		if (this.prev === null) {
			return;
		}

		this.prev.next = this.next;
		if (this.next !== null) {
			(this.next).prev = this.prev;
		}
	}
}
