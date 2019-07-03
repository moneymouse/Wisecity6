"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Asset = function (_React$Component) {
    _inherits(Asset, _React$Component);

    function Asset(props) {
        _classCallCheck(this, Asset);

        var _this = _possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this, props));

        _this.state = {
            teamName: "",
            Asset: [],
            Asset_data: [],
            Asset_flow: [],
            isOpen: false,
            asset_class: "collapse",
            assetData_class: "collapse"
        };
        _this.modal_value = {};
        _this.handleclose = _this.close.bind(_this); // Close the modal 
        _this.handleopen = _this.open.bind(_this); // Open the modal
        _this.handleAssetcollapse = _this.assetCollapse.bind(_this); // Asset collapse toggle
        _this.handleAssetdatacollapse = _this.assetDatacollapse.bind(_this); // Asset data collapse toggle
        return _this;
    }

    _createClass(Asset, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            // the asset
            var teamname = team.name;
            var asset = [];
            for (var i = 0; i < 3; i++) {
                var ass = {
                    "type": team.money[i]["currency"],
                    "num": team.money[i]["num"]
                };
                asset.push(ass);
            }
            this.setState({
                teamName: teamname,
                Asset: asset
            });

            // the asset_data
            var asset_data = this.state.Asset_data;
            var handlelistent_data = function handlelistent_data(name, e) {
                4;
                // console.log(e);
                var total = 0;
                for (var i in e) {
                    for (var p in e[i]) {
                        if (e[i][p][2]) {
                            total = total + e[i][p][2].total - e[i][p][3].total;
                        } else {
                            total = total + e[i][p][0].total - e[i][p][1].total;
                        }
                        // console.log(e[i][p][3]);
                    }
                }
                console.log(total);
                var obj = {
                    "name": name,
                    "num": total
                };
                asset_data.push(obj);
                _this2.setState({
                    Asset_data: asset_data
                });
            };
            this.handlelistent_data = {
                "transaction": handlelistent_data.bind(this),
                "bank": handlelistent_data.bind(this),
                "ticket": handlelistent_data.bind(this)
            };
            ppss.listent("analyze.transaction", function (e) {
                return _this2.handlelistent_data.transaction("商品交易", e);
            });
            ppss.listent("analyze.bank", function (e) {
                return _this2.handlelistent_data.bank("钱庄", e);
            });
            ppss.listent("analyze.ticket", function (e) {
                return _this2.handlelistent_data.ticket("票庄", e);
            });

            analyze();

            // the asset_flow
            this.handlelistent_flow = function (e) {
                var arr = _this2.state.Asset_flow;
                console.log(arr);
                for (var i in e) {
                    arr.push(e[i]);
                }
                _this2.setState({
                    Asset_flow: arr
                });
            };
            var handlelistent_flow = this.handlelistent_flow.bind(this);
            ppss.listent("log.transfer", handlelistent_flow);
            ppss.listent("log.transcation", handlelistent_flow);
            ppss.listent("log.lonate", handlelistent_flow);

            getLog("transcation");
            getLog("transfer");
            getLog("lonate");
        }
    }, {
        key: "close",
        value: function close() {
            // close the modal
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: "open",
        value: function open(e) {
            // open the modal and send the value to modal_value
            this.modal_value = e;
            this.setState({
                isOpen: true
            });
        }
    }, {
        key: "assetCollapse",
        value: function assetCollapse() {
            if (this.state.asset_class == "collapse") {
                this.setState({
                    asset_class: "collapsing"
                });
                var _t = this;
                setTimeout(function () {
                    _t.setState({
                        asset_class: "collapse show"
                    });
                }, 500);
            }
            if (this.state.asset_class == "collapse show") {
                this.setState({
                    asset_class: "collapsing"
                });
                var _t = this;
                setTimeout(function () {
                    _t.setState({
                        asset_class: "collapse"
                    });
                }, 500);
            }
        }
    }, {
        key: "assetDatacollapse",
        value: function assetDatacollapse() {
            if (this.state.assetData_class == "collapse") {
                this.setState({
                    assetData_class: "collapsing"
                });
                var _t = this;
                setTimeout(function () {
                    _t.setState({
                        assetData_class: "collapse show"
                    });
                }, 500);
            }
            if (this.state.assetData_class === "collapse show") {
                this.setState({
                    assetData_class: "collapsing"
                });
                var _t = this;
                setTimeout(function () {
                    _t.setState({
                        assetData_class: "collapse"
                    });
                }, 500);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var buyStatus = ["卖出", "买入"];
            var confirmStatus = ["退回", "未签收", "已签收"];
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { "class": "teamdata row" },
                        React.createElement(
                            "div",
                            { "class": "col-lg-6 col-md-12 col-sm-12" },
                            React.createElement(
                                "h4",
                                null,
                                React.createElement(
                                    "b",
                                    null,
                                    "\u961F\u4F0D\u540D"
                                ),
                                ":",
                                this.state.teamName
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u8D44\u91D1\u8BE6\u60C5"
                            ),
                            React.createElement(
                                "div",
                                null,
                                this.state.Asset.map(function (v, i) {
                                    // console.log(v);
                                    return React.createElement(
                                        React.Fragment,
                                        null,
                                        React.createElement(
                                            "h5",
                                            { key: i },
                                            v.type,
                                            ":",
                                            v.num
                                        ),
                                        React.createElement("br", null)
                                    );
                                })
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u8D44\u91D1\u6D41\u52A8\u603B\u989D"
                            ),
                            React.createElement(
                                "div",
                                null,
                                this.state.Asset_data.map(function (v, i) {
                                    // console.log(v);
                                    return React.createElement(
                                        React.Fragment,
                                        null,
                                        React.createElement(
                                            "h5",
                                            { key: i },
                                            v.name,
                                            ":",
                                            v.num
                                        ),
                                        React.createElement("br", null)
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "col-lg-6 col-md-12 col-sm-12" },
                            React.createElement(
                                "h4",
                                null,
                                "\u8D44\u91D1\u6D41\u91CF\u8BB0\u5F55"
                            ),
                            React.createElement(
                                T_table,
                                null,
                                React.createElement(
                                    "thead",
                                    { className: "thead-light" },
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u4EA4\u6613ID"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u53D1\u8D77\u65B9"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u63A5\u53D7\u65B9"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u5546\u54C1\u540D\u79F0"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u5546\u54C1\u6570\u91CF"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u91D1\u989D"
                                        ),
                                        React.createElement(
                                            "th",
                                            { scope: "col" },
                                            "\u5907\u6CE8"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    this.state.Asset_flow.map(function (value, index) {
                                        return React.createElement(
                                            "tr",
                                            { key: index },
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { href: "#", onClick: function onClick() {
                                                            _this3.handleopen(value);
                                                        } },
                                                    value.id
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                " ",
                                                value.fromTeamName,
                                                " "
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                value.toTeamName
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                value.goods_name
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                value.num
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                value.currency,
                                                ":",
                                                value.money || value.num
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                value.remark
                                            )
                                        );
                                    })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpen },
                    React.createElement(Modal_head, { close: this.handleclose }),
                    React.createElement(
                        Modal_body,
                        null,
                        React.createElement(
                            "div",
                            null,
                            "\u4EA4\u6613ID:",
                            this.modal_value.id
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\u53D1\u8D77\u65B9:",
                            this.modal_value.fromTeamName
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\u63A5\u6536\u65B9:",
                            this.modal_value.toTeamName
                        ),
                        this.modal_value.goods_name ? "商品:" : undefined,
                        this.modal_value.goods_name || "",
                        React.createElement(
                            "div",
                            null,
                            "\u4E70\u5356:",
                            buyStatus[this.modal_value.type]
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\u72B6\u6001:",
                            confirmStatus[this.modal_value.status + 1]
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\u91D1\u989D:",
                            this.modal_value.currency,
                            ":",
                            this.modal_value.money || this.modal_value.num
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\u5907\u6CE8:",
                            this.modal_value.remark
                        )
                    ),
                    React.createElement(Modal_foot, { close: this.handleclose })
                )
            );
        }
    }]);

    return Asset;
}(React.Component);

ReactDOM.render(React.createElement(Asset, null), document.getElementById("root"));
ReactDOM.render(React.createElement(Nav, null), document.getElementById("Nav"));