(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./netv-box-selection.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoxSelection": () => (/* binding */ BoxSelection)
/* harmony export */ });
/**
 * @description Box selection for NetV.js
 * @author Xiaodong Zhao
 */

class BoxSelection {
    constructor(netv, configs) {
        this.$_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.$_core = netv
        netv.$_container.prepend(this.$_svg)
        this.$_svg.setAttribute('id', 'box-selection')
        this.$_svg.setAttribute('width', netv.$_configs.width)
        this.$_svg.setAttribute('height', netv.$_configs.height)
        netv.$_container.style.position = 'relative'
        netv.$_container.style.overflow = 'hidden'
        netv.$_container.style.width = netv.$_configs.width
        netv.$_container.style.height = netv.$_configs.height
        this.$_svg.style.position = 'absolute'
        this.$_svg.style.zIndex = '20'
        this.$_svg.style.overflow = 'visible'
        this.$_svg.style.pointerEvents = 'none' // initially disabled

        this._width = netv.$_configs.width
        this._height = netv.$_configs.height

        this._rectStyle = Object.assign({}, {
            'fill': 'rgba(200, 200, 200, 0.2)',
            'stroke': 'black',
            'stroke-width': 1,
            'stroke-dasharray': [],
        }, configs.boxStyle)

        // this._pathPoints = []
        this._initPos = { x: 0, y: 0 }
        this._rectParams = {
            x: 0, y: 0, w: 0, h: 0
        }
        this._selectedItems = []
        this._selectedCallback = null
        this._onMouseDown = this._onMouseDown.bind(this)
        this._onMouseMove = this._onMouseMove.bind(this)
        this._onMouseUp = this._onMouseUp.bind(this)

        window.addEventListener('mousedown', this._onMouseDown)
        window.addEventListener('mousemove', this._onMouseMove)
        window.addEventListener('mouseup', this._onMouseUp)

        // check config to decide enable it or not
        if (configs && configs.enable === true) {
            this.enable()
        }
    }

    dispose() {
        this.$_svg.remove()
        window.removeEventListener('mousedown', this._onMouseDown)
        window.removeEventListener('mousemove', this._onMouseMove)
        window.removeEventListener('mouseup', this._onMouseUp)
    }

    enable() {
        this.$_svg.style.pointerEvents = 'visible'
    }

    disable() {
        this.$_svg.style.pointerEvents = 'none'
    }

    onSelected(callback) {
        this._selectedCallback = callback
    }

    _onMouseDown(evt) {
        if (evt.button !== 0) {
            // must select with left button
            return
        }
        this._selecting = true
        this._rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this._rect.setAttribute('fill', this._rectStyle['fill']);
        this._rect.setAttribute('stroke', this._rectStyle['stroke']);
        this._rect.setAttribute('stroke-width', this._rectStyle['stroke-width']);
        this._rect.setAttribute('stroke-dasharray', this._rectStyle['stroke-dasharray']);
        // this._rect.setAttribute('stroke-linejoin', 'round');
        // this._rect.setAttribute('stroke-linecap', 'round');
        this.$_svg.appendChild(this._rect);

        const x = evt.offsetX
        const y = evt.offsetY

        this._initPos = { x, y }
        this._rectParams.w = 0
        this._rectParams.h = 0
    }

    _onMouseMove(evt) {
        if (evt.button !== 0) {
            // must select with left button
            return
        }
        if (!this._selecting) return
        const x = evt.offsetX
        const y = evt.offsetY
        this._rectParams.w = Math.abs(this._initPos.x - x)
        this._rectParams.h = Math.abs(this._initPos.y - y)
        this._rectParams.x = Math.min(x, this._initPos.x)
        this._rectParams.y = Math.min(y, this._initPos.y)
        this._rect.setAttribute('x', this._rectParams.x)
        this._rect.setAttribute('y', this._rectParams.y)
        this._rect.setAttribute('width', this._rectParams.w)
        this._rect.setAttribute('height', this._rectParams.h)
    }

    _onMouseUp(evt) {
        if (evt.button !== 0) {
            // must select with left button
            return
        }
        this._rect.remove()
        this._getSelectedItems()
        this._selectedCallback && this._selectedCallback(this._selectedItems)
    }

    _getSelectedItems() {
        const items = this.$_core.nodes()
        const dataTransform = this.$_core.transform()
        this._selectedItems = items.filter(item => {
            const x = item.x() * dataTransform.k + dataTransform.x
            const y = item.y() * dataTransform.k + dataTransform.y
            return (
                x > this._rectParams.x && x < this._rectParams.x + this._rectParams.w &&
                y > this._rectParams.y && y < this._rectParams.y + this._rectParams.h
            )
        })
    }
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi8uL25ldHYtYm94LXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7VUNWQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQyIsImZpbGUiOiJuZXR2LWJveC1zZWxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQGRlc2NyaXB0aW9uIEJveCBzZWxlY3Rpb24gZm9yIE5ldFYuanNcclxuICogQGF1dGhvciBYaWFvZG9uZyBaaGFvXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveFNlbGVjdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihuZXR2LCBjb25maWdzKSB7XHJcbiAgICAgICAgdGhpcy4kX3N2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJylcclxuICAgICAgICB0aGlzLiRfY29yZSA9IG5ldHZcclxuICAgICAgICBuZXR2LiRfY29udGFpbmVyLnByZXBlbmQodGhpcy4kX3N2ZylcclxuICAgICAgICB0aGlzLiRfc3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnYm94LXNlbGVjdGlvbicpXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgbmV0di4kX2NvbmZpZ3Mud2lkdGgpXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG5ldHYuJF9jb25maWdzLmhlaWdodClcclxuICAgICAgICBuZXR2LiRfY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xyXG4gICAgICAgIG5ldHYuJF9jb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG4gICAgICAgIG5ldHYuJF9jb250YWluZXIuc3R5bGUud2lkdGggPSBuZXR2LiRfY29uZmlncy53aWR0aFxyXG4gICAgICAgIG5ldHYuJF9jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gbmV0di4kX2NvbmZpZ3MuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcclxuICAgICAgICB0aGlzLiRfc3ZnLnN0eWxlLnpJbmRleCA9ICcyMCdcclxuICAgICAgICB0aGlzLiRfc3ZnLnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnIC8vIGluaXRpYWxseSBkaXNhYmxlZFxyXG5cclxuICAgICAgICB0aGlzLl93aWR0aCA9IG5ldHYuJF9jb25maWdzLndpZHRoXHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV0di4kX2NvbmZpZ3MuaGVpZ2h0XHJcblxyXG4gICAgICAgIHRoaXMuX3JlY3RTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgJ2ZpbGwnOiAncmdiYSgyMDAsIDIwMCwgMjAwLCAwLjIpJyxcclxuICAgICAgICAgICAgJ3N0cm9rZSc6ICdibGFjaycsXHJcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAxLFxyXG4gICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IFtdLFxyXG4gICAgICAgIH0sIGNvbmZpZ3MuYm94U3R5bGUpXHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3BhdGhQb2ludHMgPSBbXVxyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSB7IHg6IDAsIHk6IDAgfVxyXG4gICAgICAgIHRoaXMuX3JlY3RQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIHg6IDAsIHk6IDAsIHc6IDAsIGg6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtcyA9IFtdXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDYWxsYmFjayA9IG51bGxcclxuICAgICAgICB0aGlzLl9vbk1vdXNlRG93biA9IHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLl9vbk1vdXNlTW92ZSA9IHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcylcclxuICAgICAgICB0aGlzLl9vbk1vdXNlVXAgPSB0aGlzLl9vbk1vdXNlVXAuYmluZCh0aGlzKVxyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24pXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwKVxyXG5cclxuICAgICAgICAvLyBjaGVjayBjb25maWcgdG8gZGVjaWRlIGVuYWJsZSBpdCBvciBub3RcclxuICAgICAgICBpZiAoY29uZmlncyAmJiBjb25maWdzLmVuYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy4kX3N2Zy5yZW1vdmUoKVxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bilcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpXHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXApXHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUucG9pbnRlckV2ZW50cyA9ICd2aXNpYmxlJ1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RlZChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ2FsbGJhY2sgPSBjYWxsYmFja1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vdXNlRG93bihldnQpIHtcclxuICAgICAgICBpZiAoZXZ0LmJ1dHRvbiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBtdXN0IHNlbGVjdCB3aXRoIGxlZnQgYnV0dG9uXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWxlY3RpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5fcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpO1xyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fcmVjdFN0eWxlWydmaWxsJ10pO1xyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UnLCB0aGlzLl9yZWN0U3R5bGVbJ3N0cm9rZSddKTtcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgdGhpcy5fcmVjdFN0eWxlWydzdHJva2Utd2lkdGgnXSk7XHJcbiAgICAgICAgdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCB0aGlzLl9yZWN0U3R5bGVbJ3N0cm9rZS1kYXNoYXJyYXknXSk7XHJcbiAgICAgICAgLy8gdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lam9pbicsICdyb3VuZCcpO1xyXG4gICAgICAgIC8vIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWNhcCcsICdyb3VuZCcpO1xyXG4gICAgICAgIHRoaXMuJF9zdmcuYXBwZW5kQ2hpbGQodGhpcy5fcmVjdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSBldnQub2Zmc2V0WFxyXG4gICAgICAgIGNvbnN0IHkgPSBldnQub2Zmc2V0WVxyXG5cclxuICAgICAgICB0aGlzLl9pbml0UG9zID0geyB4LCB5IH1cclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zLncgPSAwXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy5oID0gMFxyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vdXNlTW92ZShldnQpIHtcclxuICAgICAgICBpZiAoZXZ0LmJ1dHRvbiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBtdXN0IHNlbGVjdCB3aXRoIGxlZnQgYnV0dG9uXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdGluZykgcmV0dXJuXHJcbiAgICAgICAgY29uc3QgeCA9IGV2dC5vZmZzZXRYXHJcbiAgICAgICAgY29uc3QgeSA9IGV2dC5vZmZzZXRZXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy53ID0gTWF0aC5hYnModGhpcy5faW5pdFBvcy54IC0geClcclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zLmggPSBNYXRoLmFicyh0aGlzLl9pbml0UG9zLnkgLSB5KVxyXG4gICAgICAgIHRoaXMuX3JlY3RQYXJhbXMueCA9IE1hdGgubWluKHgsIHRoaXMuX2luaXRQb3MueClcclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zLnkgPSBNYXRoLm1pbih5LCB0aGlzLl9pbml0UG9zLnkpXHJcbiAgICAgICAgdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3gnLCB0aGlzLl9yZWN0UGFyYW1zLngpXHJcbiAgICAgICAgdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3knLCB0aGlzLl9yZWN0UGFyYW1zLnkpXHJcbiAgICAgICAgdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy5fcmVjdFBhcmFtcy53KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLl9yZWN0UGFyYW1zLmgpXHJcbiAgICB9XHJcblxyXG4gICAgX29uTW91c2VVcChldnQpIHtcclxuICAgICAgICBpZiAoZXZ0LmJ1dHRvbiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBtdXN0IHNlbGVjdCB3aXRoIGxlZnQgYnV0dG9uXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWN0LnJlbW92ZSgpXHJcbiAgICAgICAgdGhpcy5fZ2V0U2VsZWN0ZWRJdGVtcygpXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDYWxsYmFjayAmJiB0aGlzLl9zZWxlY3RlZENhbGxiYWNrKHRoaXMuX3NlbGVjdGVkSXRlbXMpXHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNlbGVjdGVkSXRlbXMoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLiRfY29yZS5ub2RlcygpXHJcbiAgICAgICAgY29uc3QgZGF0YVRyYW5zZm9ybSA9IHRoaXMuJF9jb3JlLnRyYW5zZm9ybSgpXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtcyA9IGl0ZW1zLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeCA9IGl0ZW0ueCgpICogZGF0YVRyYW5zZm9ybS5rICsgZGF0YVRyYW5zZm9ybS54XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSBpdGVtLnkoKSAqIGRhdGFUcmFuc2Zvcm0uayArIGRhdGFUcmFuc2Zvcm0ueVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgeCA+IHRoaXMuX3JlY3RQYXJhbXMueCAmJiB4IDwgdGhpcy5fcmVjdFBhcmFtcy54ICsgdGhpcy5fcmVjdFBhcmFtcy53ICYmXHJcbiAgICAgICAgICAgICAgICB5ID4gdGhpcy5fcmVjdFBhcmFtcy55ICYmIHkgPCB0aGlzLl9yZWN0UGFyYW1zLnkgKyB0aGlzLl9yZWN0UGFyYW1zLmhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9