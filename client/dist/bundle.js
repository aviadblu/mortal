/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(0);
	var ServersGraph = (function (_super) {
	    __extends(ServersGraph, _super);
	    function ServersGraph() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ServersGraph.prototype.render = function () {
	        return React.createElement("div", { className: "shadow--xs rows bg--content margin-b--lg" },
	            React.createElement("div", { className: "minor padding--md bg--primary" }, this.props.title),
	            React.createElement("div", { className: "padding--xl" },
	                React.createElement("svg", { width: "960", height: "500" })));
	    };
	    return ServersGraph;
	}(React.Component));
	exports.ServersGraph = ServersGraph;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(0);
	var ServersList = (function (_super) {
	    __extends(ServersList, _super);
	    function ServersList() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ServersList.prototype.render = function () {
	        return React.createElement("div", { className: "shadow--xs rows bg--content margin-b--lg" },
	            React.createElement("div", { className: "minor padding--md bg--primary" }, this.props.title),
	            React.createElement("div", { className: "padding--xl" },
	                React.createElement("table", { className: "table table--tertiary" },
	                    React.createElement("thead", null,
	                        React.createElement("tr", null,
	                            React.createElement("th", null, "#"),
	                            React.createElement("th", null, "Name"),
	                            React.createElement("th", null, "Host"),
	                            React.createElement("th", null, "Data"))),
	                    React.createElement("tbody", null,
	                        React.createElement("tr", null,
	                            React.createElement("td", null, "1"),
	                            React.createElement("td", null, "Mark"),
	                            React.createElement("td", null, "Otto"),
	                            React.createElement("td", null, "@mdo")),
	                        React.createElement("tr", null,
	                            React.createElement("td", null, "2"),
	                            React.createElement("td", null, "Jacob"),
	                            React.createElement("td", null, "Thornton"),
	                            React.createElement("td", null, "@fat")),
	                        React.createElement("tr", null,
	                            React.createElement("td", null, "3"),
	                            React.createElement("td", null, "Larry"),
	                            React.createElement("td", null, "the Bird"),
	                            React.createElement("td", null, "@twitter"))))));
	    };
	    return ServersList;
	}(React.Component));
	exports.ServersList = ServersList;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(0);
	var ReactDOM = __webpack_require__(3);
	var ServersList_1 = __webpack_require__(2);
	var ServersGraph_1 = __webpack_require__(1);
	var Layout = (function (_super) {
	    __extends(Layout, _super);
	    function Layout() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Layout.prototype.render = function () {
	        return React.createElement("div", null,
	            React.createElement(ServersList_1.ServersList, { title: "Servers List" }),
	            React.createElement(ServersGraph_1.ServersGraph, { title: "graph" }));
	    };
	    ;
	    return Layout;
	}(React.Component));
	ReactDOM.render(React.createElement(Layout, null), document.getElementById("root"));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map