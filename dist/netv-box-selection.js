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

        // this._pathPoints = []
        this._initPos = { x: 0, y: 0 }
        this._rectParams = {
            x: 0, y: 0, w: 0, h: 0
        }
        this._selectedItems = []
        this._selectedCallback = null

        this.$_svg.addEventListener('mousedown', this._onMouseDown.bind(this))
        this.$_svg.addEventListener('mousemove', this._onMouseMove.bind(this))
        this.$_svg.addEventListener('mouseup', this._onMouseUp.bind(this))

        // check config to decide enable it or not
        if (configs && configs.enable === true) {
            this.enable()
        }
    }

    dispose() {
        this.$_svg.remove()
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
        this._selecting = true
        this._rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this._rect.setAttribute('fill', 'rgba(200, 200, 200, 0.2)');
        this._rect.setAttribute('stroke', 'black');
        this._rect.setAttribute('stroke-width', 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi8uL25ldHYtYm94LXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7VUNWQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDIiwiZmlsZSI6Im5ldHYtYm94LXNlbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBAZGVzY3JpcHRpb24gQm94IHNlbGVjdGlvbiBmb3IgTmV0Vi5qc1xyXG4gKiBAYXV0aG9yIFhpYW9kb25nIFpoYW9cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgQm94U2VsZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKG5ldHYsIGNvbmZpZ3MpIHtcclxuICAgICAgICB0aGlzLiRfc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKVxyXG4gICAgICAgIHRoaXMuJF9jb3JlID0gbmV0dlxyXG4gICAgICAgIG5ldHYuJF9jb250YWluZXIucHJlcGVuZCh0aGlzLiRfc3ZnKVxyXG4gICAgICAgIHRoaXMuJF9zdmcuc2V0QXR0cmlidXRlKCdpZCcsICdib3gtc2VsZWN0aW9uJylcclxuICAgICAgICB0aGlzLiRfc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBuZXR2LiRfY29uZmlncy53aWR0aClcclxuICAgICAgICB0aGlzLiRfc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbmV0di4kX2NvbmZpZ3MuaGVpZ2h0KVxyXG4gICAgICAgIG5ldHYuJF9jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXHJcbiAgICAgICAgbmV0di4kX2NvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXHJcbiAgICAgICAgbmV0di4kX2NvbnRhaW5lci5zdHlsZS53aWR0aCA9IG5ldHYuJF9jb25maWdzLndpZHRoXHJcbiAgICAgICAgbmV0di4kX2NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBuZXR2LiRfY29uZmlncy5oZWlnaHRcclxuICAgICAgICB0aGlzLiRfc3ZnLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUuekluZGV4ID0gJzIwJ1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSdcclxuICAgICAgICB0aGlzLiRfc3ZnLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZScgLy8gaW5pdGlhbGx5IGRpc2FibGVkXHJcblxyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gbmV0di4kX2NvbmZpZ3Mud2lkdGhcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXR2LiRfY29uZmlncy5oZWlnaHRcclxuXHJcbiAgICAgICAgLy8gdGhpcy5fcGF0aFBvaW50cyA9IFtdXHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHsgeDogMCwgeTogMCB9XHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgeDogMCwgeTogMCwgdzogMCwgaDogMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZWxlY3RlZEl0ZW1zID0gW11cclxuICAgICAgICB0aGlzLl9zZWxlY3RlZENhbGxiYWNrID0gbnVsbFxyXG5cclxuICAgICAgICB0aGlzLiRfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuJF9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW91c2VVcC5iaW5kKHRoaXMpKVxyXG5cclxuICAgICAgICAvLyBjaGVjayBjb25maWcgdG8gZGVjaWRlIGVuYWJsZSBpdCBvciBub3RcclxuICAgICAgICBpZiAoY29uZmlncyAmJiBjb25maWdzLmVuYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy4kX3N2Zy5yZW1vdmUoKVxyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLiRfc3ZnLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAndmlzaWJsZSdcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0ZWQoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZENhbGxiYWNrID0gY2FsbGJhY2tcclxuICAgIH1cclxuXHJcbiAgICBfb25Nb3VzZURvd24oZXZ0KSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0aW5nID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuX3JlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3JlY3QnKTtcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnZmlsbCcsICdyZ2JhKDIwMCwgMjAwLCAyMDAsIDAuMiknKTtcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ2JsYWNrJyk7XHJcbiAgICAgICAgdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIDEpO1xyXG4gICAgICAgIC8vIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWpvaW4nLCAncm91bmQnKTtcclxuICAgICAgICAvLyB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWxpbmVjYXAnLCAncm91bmQnKTtcclxuICAgICAgICB0aGlzLiRfc3ZnLmFwcGVuZENoaWxkKHRoaXMuX3JlY3QpO1xyXG5cclxuICAgICAgICBjb25zdCB4ID0gZXZ0Lm9mZnNldFhcclxuICAgICAgICBjb25zdCB5ID0gZXZ0Lm9mZnNldFlcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHsgeCwgeSB9XHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy53ID0gMFxyXG4gICAgICAgIHRoaXMuX3JlY3RQYXJhbXMuaCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBfb25Nb3VzZU1vdmUoZXZ0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RpbmcpIHJldHVyblxyXG4gICAgICAgIGNvbnN0IHggPSBldnQub2Zmc2V0WFxyXG4gICAgICAgIGNvbnN0IHkgPSBldnQub2Zmc2V0WVxyXG4gICAgICAgIHRoaXMuX3JlY3RQYXJhbXMudyA9IE1hdGguYWJzKHRoaXMuX2luaXRQb3MueCAtIHgpXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy5oID0gTWF0aC5hYnModGhpcy5faW5pdFBvcy55IC0geSlcclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zLnggPSBNYXRoLm1pbih4LCB0aGlzLl9pbml0UG9zLngpXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy55ID0gTWF0aC5taW4oeSwgdGhpcy5faW5pdFBvcy55KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd4JywgdGhpcy5fcmVjdFBhcmFtcy54KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd5JywgdGhpcy5fcmVjdFBhcmFtcy55KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuX3JlY3RQYXJhbXMudylcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5fcmVjdFBhcmFtcy5oKVxyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vdXNlVXAoZXZ0KSB7XHJcbiAgICAgICAgdGhpcy5fcmVjdC5yZW1vdmUoKVxyXG4gICAgICAgIHRoaXMuX2dldFNlbGVjdGVkSXRlbXMoKVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ2FsbGJhY2sgJiYgdGhpcy5fc2VsZWN0ZWRDYWxsYmFjayh0aGlzLl9zZWxlY3RlZEl0ZW1zKVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTZWxlY3RlZEl0ZW1zKCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy4kX2NvcmUubm9kZXMoKVxyXG4gICAgICAgIGNvbnN0IGRhdGFUcmFuc2Zvcm0gPSB0aGlzLiRfY29yZS50cmFuc2Zvcm0oKVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbXMgPSBpdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBpdGVtLngoKSAqIGRhdGFUcmFuc2Zvcm0uayArIGRhdGFUcmFuc2Zvcm0ueFxyXG4gICAgICAgICAgICBjb25zdCB5ID0gaXRlbS55KCkgKiBkYXRhVHJhbnNmb3JtLmsgKyBkYXRhVHJhbnNmb3JtLnlcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIHggPiB0aGlzLl9yZWN0UGFyYW1zLnggJiYgeCA8IHRoaXMuX3JlY3RQYXJhbXMueCArIHRoaXMuX3JlY3RQYXJhbXMudyAmJlxyXG4gICAgICAgICAgICAgICAgeSA+IHRoaXMuX3JlY3RQYXJhbXMueSAmJiB5IDwgdGhpcy5fcmVjdFBhcmFtcy55ICsgdGhpcy5fcmVjdFBhcmFtcy5oXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==