
/*
Description:
	Each pane constitutes doubly linked list.
	Each pane has a function to split/delete *itself*.
	When a pane is split/delete, a link is implicitly updated.
	Global operation for list & local operation for each pane are implimented in the same class. This makes the code messy.
	Note that Promise/async features are used in _insetNextExtend to execute functions in the order of
		1. _insertNext()
		2. _fitFontsize(), lowerOpacity()
*/

class Pane {
	constructor(isHead) {
		this.elm = null;
		this.prev = null;
		this.next = null;
		this.idx = 0;
		if (isHead) {
			// Create the 1st pane when head is defined.
			this._insertNextExtend();
			this.next.elm.style.gridColumn = "1 / " + (2 ** log2_maxcol + 1);
			this.next.elm.style.gridRow = "1 / " + (2 ** log2_maxrow + 1);
			this.next.elm.style.backgroundColor = pane_bg_highlight;
		}
	}

	highlightOn() {
		this.elm.style.backgroundColor = pane_bg_highlight;
	}
	highlightOff() {
		this.elm.style.backgroundColor = pane_bg;
	}

	moveForward() {
		if (this.next !== null) {
			return (this.next);
		} else {
			return (head.next);
		}
	}

	splitColumn() {
		let [top, left, bottom, right] = gridAreaToArray(this);
		if (right - left > 1) {
			// Create a new pane
			this._insertNextExtend();

			// Allocate a new pane & Re-allocate a selected pane to grid
			let mid = (left + right) / 2;
			this.elm.style.gridArea = intToGridArea(top, left, bottom, mid);
			this.next.elm.style.gridArea = intToGridArea(top, mid, bottom, right);
		}
	}

	splitRow() {
		let [top, left, bottom, right] = gridAreaToArray(this);
		if (bottom - top > 1) {
			this._insertNextExtend();
			let mid = (top + bottom) / 2;
			this.elm.style.gridArea = intToGridArea(top, left, mid, right);
			this.next.elm.style.gridArea = intToGridArea(mid, left, bottom, right);
		}
	}

	_setElement() {
		this.elm = document.createElement("span");
		this.elm.classList.add("pane");
		document.getElementById("container").appendChild(this.elm);
	}


	_insertNext() {
		return new Promise(resolve => {
			let new_pane = new Pane();
			new_pane._setElement();

			new_pane.prev = this;
			new_pane.next = this.next;
			if (new_pane.next !== null) {
				new_pane.next.prev = new_pane;
			}
			this.next = new_pane;

			// <Optional> Assign index
			new_pane.idx = this.idx;
			for (let itr = this.next; itr !== null; itr = itr.next) {
				itr.idx++;
				itr.elm.innerHTML = itr.idx;
			}

			// nothing to return.
			resolve();
		});
	}

	// <Optional> auto fit index fontsize to each pane
	_fitFontsize() {
		let itr = this.next;
		while (true) {
			if (!itr || !itr.elm) { break; }
			let fontsize = Math.min(itr.elm.offsetWidth, itr.elm.offsetHeight) * 0.5;
			itr.elm.style.setProperty("font-size", fontsize + "px");
			itr = itr.next;
		}

		itr = this;
		while (true) {
			if (!itr || !itr.elm) { break; }
			let fontsize = Math.min(itr.elm.offsetWidth, itr.elm.offsetHeight) * 0.5;
			itr.elm.style.setProperty("font-size", fontsize + "px");
			itr = itr.prev;
		}
	}


	async _insertNextExtend() {
		await this._insertNext();
		this._fitFontsize();
		lowerOpacity();
	}
}
