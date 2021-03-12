"use strict";

/* --------------------================-------------------- */
/*                    Utility  Functions                    */
/* --------------------================-------------------- */

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return [].slice.call(document.querySelectorAll(selector));
}

let h, svg;
(function() {
	function _generateElement(args, el) {
		let e = null;
		let _tci = args.shift().split(/\s*(?=[.#])/); // tag, class, id
		if(/[.#]/.test(_tci[0])) e = el('div');
		_tci.forEach(function(v) {
			if(!e) e = el(v);
			else if(v[0] === '.') e.classList.add(v.slice(1));
			else if(v[0] === '#') e.setAttribute('id', v.slice(1));
		});
		function item(l) {
			switch (l.constructor) {
				case Array:
					l.forEach(item);
					break;
				case Object:
					for(let attr in l) {
						if(attr === 'style') {
							for(let style in l[attr]) {
								e.style[style] = l[attr][style];
							}
						}else if(attr.substr(0, 2) === 'on'){
							e.addEventListener(attr.substr(2), l[attr]);
						}else{
							e.setAttribute(attr, l[attr]);
						}
					}
					break;
				default:
					if(l.nodeType != undefined) e.appendChild(l)
    				else e.appendChild(document.createTextNode(l))
			}
		}
		while(args.length > 0) {
			item(args.shift());
		}
		return e;
	}

	h = function() {
		return _generateElement([].slice.call(arguments), function(tagName) {
			return document.createElement(tagName);
		});
	}

	svg = function() {
		return _generateElement([].slice.call(arguments), function(tagName) {
			return document.createElementNS('http://www.w3.org/2000/svg', tagName);
		});
	}
})(); // h, svg



const angle = (p1, p2) => {
    var dy = p2.y - p1.y;
    var dx = p2.x - p1.x;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    //theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

const distance = (p1, p2) => {
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}