"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxGroup = function (_React$Component) {
	_inherits(CheckboxGroup, _React$Component);

	function CheckboxGroup(props) {
		_classCallCheck(this, CheckboxGroup);

		var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

		_this.state = {
			inputClass: "hide"
		};
		_this.handleCheck = {
			"private": _this.Check_private.bind(_this),
			"public": _this.Check_public.bind(_this)
		};
		_this.handlegetValue = _this.getValue.bind(_this);
		_this.value = {};
		return _this;
	}

	_createClass(CheckboxGroup, [{
		key: "Check_public",
		value: function Check_public(e) {
			if (e.target.checked) {
				this.setState({
					inputClass: "hide"
				});
				this.value.private = false;
				this.value.price = undefined;
			}
		}
	}, {
		key: "Check_private",
		value: function Check_private(e) {
			if (e.target.checked) {
				this.setState({
					inputClass: "col-6"
				});
				this.value.private = true;
			}
		}
	}, {
		key: "getValue",
		value: function getValue(e) {
			this.value.price = e.target.value;
		}
	}, {
		key: "render",
		value: function render() {
			// 编辑框下面第一栏的单选框，以及输入框
			return React.createElement(
				"div",
				{ "class": "row" },
				React.createElement(
					"div",
					{ "class": "col-3" },
					React.createElement("input", { type: "radio", onChange: this.handleCheck.public }),
					React.createElement(
						"label",
						{ "class": "custom-control-label" },
						"\u516C\u5F00"
					)
				),
				React.createElement(
					"div",
					{ "class": "col-3" },
					React.createElement("input", { type: "radio", onChange: this.handleCheck.private }),
					React.createElement(
						"label",
						{ "class": "custom-control-label" },
						"\u79C1\u5BC6"
					)
				),
				React.createElement(
					"div",
					{ "class": this.state.inputClass },
					React.createElement("input", { type: "text", "class": "form-control", placeholder: "\u60C5\u62A5\u5355\u4EF7" })
				)
			);
		}
	}]);

	return CheckboxGroup;
}(React.Component);

var Test = function (_React$Component2) {
	_inherits(Test, _React$Component2);

	function Test(props) {
		_classCallCheck(this, Test);

		var _this2 = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

		_this2.ref = React.createRef();
		_this2.click = _this2.click.bind(_this2);
		return _this2;
	}

	_createClass(Test, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			console.log(this.ref);
		}
	}, {
		key: "click",
		value: function click() {
			console.log(this.ref.current.value);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ onClick: this.click, "class": "btn" },
					"click ",
					React.createElement("span", { "class": "badge badge-primary" })
				),
				React.createElement(CheckboxGroup, { ref: this.ref })
			);
		}
	}]);

	return Test;
}(React.Component);

ReactDOM.render(React.createElement(Test, null), document.getElementById("a"));