/*
Description:
	Dirty implementation of doubly linked list.
	Each pane has link to its previous & next pane.
	Each pane has functions to split/delete """itself"""(!).
	When a pane is split/delete, the link is implicitly updated.
	Global operation for list & local operation for each pane is implimented in the same class.
	That's why the code is dirty.
*/

var id_count = 0;

class Pane {
	constructor(isHead) {
		this.elm = null;
		this.prev = null;
		this.next = null;
		this.idx = 0;
		if (isHead) {
			// Create the 1st pane when head is defined.
			this._insertNext();
			this.next.elm.style.gridColumn = "1 / " + (2 ** max_col_split + 1);
			this.next.elm.style.gridRow = "1 / " + (2 ** max_row_split + 1);
			this.next.elm.style.backgroundColor = pane_bg_highlight;
			this.next.idx = 1;
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

	_addElement() {
		// <span><text>1</text></span>
		this.elm = document.createElement("span");
		this.elm.classList.add("pane");
		this.elm.id = "pane-" + (++id_count);
		document.getElementById("container").appendChild(this.elm);
	}


	_insertNext() {
		let new_pane = new Pane();
		new_pane._addElement();

		new_pane.prev = this;
		new_pane.next = this.next;
		if (new_pane.next !== null) {
			new_pane.next.prev = new_pane;
		}
		this.next = new_pane;


		// <Optional> Re-assign ID
		new_pane.idx = this.idx;
		for (let itr = this.next; itr !== null; itr = itr.next) {
			itr.idx++;
			itr.elm.innerHTML = itr.idx;
		}

		// <Optional> Lower pacity of ovarlay contents
		overlay_opacity *= gamma;
		document.getElementById("overlay").style.opacity = overlay_opacity;

		// <Optional> auto fit fontsize
		for (let itr = this.next; itr !== null; itr = itr.next) {
			let fontsize = Math.min(itr.elm.offsetWidth, itr.elm.offsetHeight) * 0.255;
			itr.elm.style.fontSize = fontsize + "px";
			console.log(itr.idx, fontsize);
		}
		for (let itr = this; itr !== null; itr = itr.prev) {
			if (itr.elm == null) {
				break;
			} else {
				let fontsize = Math.min(itr.elm.offsetWidth, itr.elm.offsetHeight) * 0.255;
				itr.elm.style.fontSize = fontsize + "px";
				// console.log(itr.idx, fontsize);
			}
		}
	}

}