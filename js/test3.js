"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this.state = {
            publicModal_state: false
        };
        _this.handlecloseModal = _this.close.bind(_this);
        _this.handleopen = _this.open.bind(_this);
        return _this;
    }

    _createClass(Test, [{
        key: "close",
        value: function close() {
            this.setState({
                publicModal_state: false
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.setState({
                publicModal_state: true
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("a", { "class": "btn btn-primary", href: "#", onClick: this.handleopen, role: "button" }),
                React.createElement(
                    Modal,
                    { isOpen: this.state.publicModal_state },
                    React.createElement(
                        Modal_head,
                        { close: this.handlecloseModal },
                        "e"
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        React.createElement(
                            "p",
                            { className: "mb-1" },
                            "f"
                        ),
                        React.createElement(
                            "small",
                            null,
                            "e"
                        )
                    ),
                    React.createElement(Modal_foot, { close: this.handlecloseModal })
                )
            );
        }
    }]);

    return Test;
}(React.Component);

ReactDOM.render(React.createElement(Test, null), document.getElementById("a"));