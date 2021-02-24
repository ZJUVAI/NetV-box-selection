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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXR2LWJveC1zZWxlY3Rpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldHYtYm94LXNlbGVjdGlvbi8uL25ldHYtYm94LXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7VUNWQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEMiLCJmaWxlIjoibmV0di1ib3gtc2VsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBCb3ggc2VsZWN0aW9uIGZvciBOZXRWLmpzXHJcbiAqIEBhdXRob3IgWGlhb2RvbmcgWmhhb1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBCb3hTZWxlY3Rpb24ge1xyXG4gICAgY29uc3RydWN0b3IobmV0diwgY29uZmlncykge1xyXG4gICAgICAgIHRoaXMuJF9zdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXHJcbiAgICAgICAgdGhpcy4kX2NvcmUgPSBuZXR2XHJcbiAgICAgICAgbmV0di4kX2NvbnRhaW5lci5wcmVwZW5kKHRoaXMuJF9zdmcpXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2JveC1zZWxlY3Rpb24nKVxyXG4gICAgICAgIHRoaXMuJF9zdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG5ldHYuJF9jb25maWdzLndpZHRoKVxyXG4gICAgICAgIHRoaXMuJF9zdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBuZXR2LiRfY29uZmlncy5oZWlnaHQpXHJcbiAgICAgICAgbmV0di4kX2NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcclxuICAgICAgICBuZXR2LiRfY29udGFpbmVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICAgICAgICBuZXR2LiRfY29udGFpbmVyLnN0eWxlLndpZHRoID0gbmV0di4kX2NvbmZpZ3Mud2lkdGhcclxuICAgICAgICBuZXR2LiRfY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IG5ldHYuJF9jb25maWdzLmhlaWdodFxyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS56SW5kZXggPSAnMjAnXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJyAvLyBpbml0aWFsbHkgZGlzYWJsZWRcclxuXHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSBuZXR2LiRfY29uZmlncy53aWR0aFxyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IG5ldHYuJF9jb25maWdzLmhlaWdodFxyXG5cclxuICAgICAgICAvLyB0aGlzLl9wYXRoUG9pbnRzID0gW11cclxuICAgICAgICB0aGlzLl9pbml0UG9zID0geyB4OiAwLCB5OiAwIH1cclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zID0ge1xyXG4gICAgICAgICAgICB4OiAwLCB5OiAwLCB3OiAwLCBoOiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbXMgPSBbXVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ2FsbGJhY2sgPSBudWxsXHJcblxyXG4gICAgICAgIHRoaXMuJF9zdmcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24uYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLiRfc3ZnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy4kX3N2Zy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcykpXHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGNvbmZpZyB0byBkZWNpZGUgZW5hYmxlIGl0IG9yIG5vdFxyXG4gICAgICAgIGlmIChjb25maWdzICYmIGNvbmZpZ3MuZW5hYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLiRfc3ZnLnJlbW92ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuJF9zdmcuc3R5bGUucG9pbnRlckV2ZW50cyA9ICd2aXNpYmxlJ1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy4kX3N2Zy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RlZChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ2FsbGJhY2sgPSBjYWxsYmFja1xyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vdXNlRG93bihldnQpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5fcmVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAncmVjdCcpO1xyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdmaWxsJywgJ3JnYmEoMjAwLCAyMDAsIDIwMCwgMC4yKScpO1xyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnYmxhY2snKTtcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgMSk7XHJcbiAgICAgICAgLy8gdGhpcy5fcmVjdC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lam9pbicsICdyb3VuZCcpO1xyXG4gICAgICAgIC8vIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWNhcCcsICdyb3VuZCcpO1xyXG4gICAgICAgIHRoaXMuJF9zdmcuYXBwZW5kQ2hpbGQodGhpcy5fcmVjdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSBldnQub2Zmc2V0WFxyXG4gICAgICAgIGNvbnN0IHkgPSBldnQub2Zmc2V0WVxyXG5cclxuICAgICAgICB0aGlzLl9pbml0UG9zID0geyB4LCB5IH1cclxuICAgIH1cclxuXHJcbiAgICBfb25Nb3VzZU1vdmUoZXZ0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RpbmcpIHJldHVyblxyXG4gICAgICAgIGNvbnN0IHggPSBldnQub2Zmc2V0WFxyXG4gICAgICAgIGNvbnN0IHkgPSBldnQub2Zmc2V0WVxyXG4gICAgICAgIHRoaXMuX3JlY3RQYXJhbXMudyA9IE1hdGguYWJzKHRoaXMuX2luaXRQb3MueCAtIHgpXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy5oID0gTWF0aC5hYnModGhpcy5faW5pdFBvcy55IC0geSlcclxuICAgICAgICB0aGlzLl9yZWN0UGFyYW1zLnggPSBNYXRoLm1pbih4LCB0aGlzLl9pbml0UG9zLngpXHJcbiAgICAgICAgdGhpcy5fcmVjdFBhcmFtcy55ID0gTWF0aC5taW4oeSwgdGhpcy5faW5pdFBvcy55KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd4JywgdGhpcy5fcmVjdFBhcmFtcy54KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd5JywgdGhpcy5fcmVjdFBhcmFtcy55KVxyXG4gICAgICAgIHRoaXMuX3JlY3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuX3JlY3RQYXJhbXMudylcclxuICAgICAgICB0aGlzLl9yZWN0LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5fcmVjdFBhcmFtcy5oKVxyXG4gICAgfVxyXG5cclxuICAgIF9vbk1vdXNlVXAoZXZ0KSB7XHJcbiAgICAgICAgdGhpcy5fcmVjdC5yZW1vdmUoKVxyXG4gICAgICAgIHRoaXMuX2dldFNlbGVjdGVkSXRlbXMoKVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkQ2FsbGJhY2sgJiYgdGhpcy5fc2VsZWN0ZWRDYWxsYmFjayh0aGlzLl9zZWxlY3RlZEl0ZW1zKVxyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTZWxlY3RlZEl0ZW1zKCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy4kX2NvcmUubm9kZXMoKVxyXG4gICAgICAgIGNvbnN0IGRhdGFUcmFuc2Zvcm0gPSB0aGlzLiRfY29yZS50cmFuc2Zvcm0oKVxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbXMgPSBpdGVtcy5maWx0ZXIoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBpdGVtLngoKSAqIGRhdGFUcmFuc2Zvcm0uayArIGRhdGFUcmFuc2Zvcm0ueFxyXG4gICAgICAgICAgICBjb25zdCB5ID0gaXRlbS55KCkgKiBkYXRhVHJhbnNmb3JtLmsgKyBkYXRhVHJhbnNmb3JtLnlcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIHggPiB0aGlzLl9yZWN0UGFyYW1zLnggJiYgeCA8IHRoaXMuX3JlY3RQYXJhbXMueCArIHRoaXMuX3JlY3RQYXJhbXMudyAmJlxyXG4gICAgICAgICAgICAgICAgeSA+IHRoaXMuX3JlY3RQYXJhbXMueSAmJiB5IDwgdGhpcy5fcmVjdFBhcmFtcy55ICsgdGhpcy5fcmVjdFBhcmFtcy5oXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==