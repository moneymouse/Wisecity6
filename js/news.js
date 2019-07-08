"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_React$Component) {
	_inherits(ListItem, _React$Component);

	function ListItem(props) {
		_classCallCheck(this, ListItem);

		return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));
	}

	_createClass(ListItem, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"a",
				{ className: "list-group-item list-group-item-action flex-column align-items-start", onClick: this.props.onClick },
				React.createElement(
					"div",
					{ className: "d-flex w-100 justify-content-between" },
					React.createElement(
						"h5",
						{ className: "mb-1" },
						React.createElement(
							"b",
							null,
							this.props.title,
							"\xB7",
							this.props.isPublic ? "公开" : "付费"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "news-content" },
					this.props.content
				),
				React.createElement("br", null),
				React.createElement(
					"small",
					null,
					"\u53D1\u5E03\u8005:",
					this.props.team
				)
			);
		}
	}]);

	return ListItem;
}(React.Component);

var List_private = function (_React$Component2) {
	_inherits(List_private, _React$Component2);

	// 官方情报
	function List_private(props) {
		_classCallCheck(this, List_private);

		var _this2 = _possibleConstructorReturn(this, (List_private.__proto__ || Object.getPrototypeOf(List_private)).call(this, props));

		_this2.state = {
			data: []
		};
		return _this2;
	}

	_createClass(List_private, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			this.listent = function (e) {
				_this3.setState({
					data: e.private
				});
			};
			this.listent = this.listent.bind(this);
			ppss.listent("news.list", this.listent);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			ppss.remove("news.list", this.listent);
		}
	}, {
		key: "Click",
		value: function Click(id, title, price, total, from, summary) {
			// To tell the onClick that this is private Item
			this.props.onClick(id, title, price, total, from, summary);
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			return React.createElement(
				"div",
				{ className: "list-group" },
				this.state.data.map(function (val, index) {
					var handleonClick = _this4.Click.bind(_this4, val.id, val.title, val.price, val.surplus, val.authorTeamName, val.summary); // add the click listence in the Item to open Modal
					return React.createElement(ListItem, { isPublic: false, onClick: handleonClick, team: val.authorTeamName, title: val.title, content: val.summary, key: index });
				})
			);
		}
	}]);

	return List_private;
}(React.Component);

var List_public = function (_React$Component3) {
	_inherits(List_public, _React$Component3);

	// 官方公告
	function List_public(props) {
		_classCallCheck(this, List_public);

		var _this5 = _possibleConstructorReturn(this, (List_public.__proto__ || Object.getPrototypeOf(List_public)).call(this, props));

		_this5.state = {
			data: []
		};
		return _this5;
	}

	_createClass(List_public, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this6 = this;

			this.listent = function (e) {
				_this6.setState({
					data: e.public
				});
			};
			this.listent = this.listent.bind(this);
			ppss.listent("news.list", this.listent);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			ppss.remove("news.list", this.listent);
		}
	}, {
		key: "Click",
		value: function Click(title, content, from) {
			// To tell the onClick that this is public Item
			this.props.onClick(title, content, from);
		}
	}, {
		key: "render",
		value: function render() {
			var _this7 = this;

			return React.createElement(
				"div",
				{ className: "list-group" },
				this.state.data.map(function (val, index) {
					var handleClick = _this7.Click.bind(_this7, val.title, val.content, val.authorTeamName); // add the click listence in the Item to open Modal
					return React.createElement(ListItem, { team: val.authorTeamName, isPublic: true, title: val.title, content: val.summary, onClick: handleClick, key: index });
				})
			);
		}
	}]);

	return List_public;
}(React.Component);

var List_law = function (_React$Component4) {
	_inherits(List_law, _React$Component4);

	// 地方法律
	function List_law(props) {
		_classCallCheck(this, List_law);

		var _this8 = _possibleConstructorReturn(this, (List_law.__proto__ || Object.getPrototypeOf(List_law)).call(this, props));

		_this8.state = {
			data: []
		};
		return _this8;
	}

	_createClass(List_law, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this9 = this;

			this.listent = function (e) {
				_this9.setState({
					data: e
				});
			};
			var listent = this.listent.bind(this);
			$.ajax({
				type: "GET",
				url: "https://wisecity.itrclub.com/api/group/getLaw",
				data: { groupId: team.groupId },
				dataType: "JSON",
				success: function success(response) {
					if (response.code !== 200 && response.code !== 0) ppss.publish("erro", response.code);else {
						listent(response.data);
					}
				}
			});
		}
	}, {
		key: "render",
		value: function render() {
			var law = ["一", "二", "三"];
			return React.createElement(
				"div",
				{ className: "list-group" },
				this.state.data.map(function (val, index) {
					return React.createElement(ListItem, { title: "第" + law[index] + "则法律", content: val, key: index });
				})
			);
		}
	}]);

	return List_law;
}(React.Component);

var List_Market = function (_React$Component5) {
	_inherits(List_Market, _React$Component5);

	// 情报黑市
	function List_Market(props) {
		_classCallCheck(this, List_Market);

		var _this10 = _possibleConstructorReturn(this, (List_Market.__proto__ || Object.getPrototypeOf(List_Market)).call(this, props));

		_this10.state = {
			data: []
		};
		return _this10;
	}

	_createClass(List_Market, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this11 = this;

			this.listent = function (e) {
				_this11.setState({
					data: e.market
				});
			};
			this.listent = this.listent.bind(this);
			ppss.listent("news.list", this.listent);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			ppss.remove("news.list", this.listent);
		}
	}, {
		key: "clickPublic",
		value: function clickPublic(title, content, from) {
			// To tell the onClick that this is public Item
			this.props.onClick(title, content, from);
		}
	}, {
		key: "clickPrivate",
		value: function clickPrivate(id, title, price, surplus, from, summary) {
			/* Function name:clickPrivate
    * ------------------------------
    * Use to call the props onClick
    * to open the public modal.
    * ------------------------------
    * id:The id of news which in onClicked Item
    * title: The title of this news
    * price: The price of news
    * surplus: The surplus of news
    * from: The authorTeam of news
    * summary: The summary of news
   */
			this.props.onClick(id, title, price, surplus, from, summary);
		}
	}, {
		key: "render",
		value: function render() {
			var _this12 = this;

			return React.createElement(
				"div",
				{ className: "list-group" },
				this.state.data.map(function (val, index) {
					if (Number(val.is_public) === 1) {
						var handleClick = _this12.clickPublic.bind(_this12, val.title, val.content, val.authorTeamName); // add the click listence in the Item to open Modal
						return React.createElement(ListItem, { isPublic: true, team: val.authorTeamName, title: val.title, content: val.summary, onClick: handleClick, key: index });
					} else {
						var handleClick = _this12.clickPrivate.bind(_this12, val.id, val.title, val.price, val.surplus, val.authorTeamName, val.summary); // add the click listence in the Item to open Modal
						return React.createElement(ListItem, { isPublic: false, team: val.authorTeamName, title: val.title, content: val.summary, onClick: handleClick, key: index });
					}
				})
			);
		}
	}]);

	return List_Market;
}(React.Component);

var Editor = function (_React$Component6) {
	_inherits(Editor, _React$Component6);

	function Editor(props) {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));
	}

	_createClass(Editor, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this14 = this;

			var e = document.querySelector("#editbox"); //获取取代节点
			ClassicEditor.create(e).then(function (editor) {
				// console.log(editor)
				_this14.data = function () {
					return editor.getData();
				};
			}).catch(function (error) {
				console.error(error);
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "editbox" },
				React.createElement(
					"p",
					{ className: "font_f", style: { "font-size": "1.3em" } },
					"\u8BF7\u5728\u6B64\u8F93\u5165\u60C5\u62A5\uFF01"
				)
			);
		}
	}]);

	return Editor;
}(React.Component);

var CheckboxGroup = function (_React$Component7) {
	_inherits(CheckboxGroup, _React$Component7);

	function CheckboxGroup(props) {
		_classCallCheck(this, CheckboxGroup);

		var _this15 = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

		_this15.state = {
			inputClass: "hide",
			groups: [],
			check: [false, false, false, false, false, false]
		};
		_this15.handleCheck = {
			"private": _this15.Check_private.bind(_this15),
			"public": _this15.Check_public.bind(_this15)
		};
		_this15.handlegetValue = _this15.getValue.bind(_this15);
		_this15.value = {};
		_this15.checked = {};
		_this15.isTop = false;
		_this15.handleClick = _this15.Click.bind(_this15);
		return _this15;
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
		key: "componentDidMount",
		value: function componentDidMount() {
			var _t = this;
			$.ajax({
				type: "GET",
				url: "https://wisecity.itrclub.com/api/group/getList",
				dataType: "JSON",
				success: function success(response) {
					if (response.code === 200) {
						var a = [];
						for (var i in response.data) {
							a.push(i);
						}
						_t.setState({
							groups: a
						});
					} else if (response.code === 403001) {
						alert("请登录后访问");
						location.href = "https://wisecity.itrclub.com/user/login";
					} else {
						ppss.publish("erro", response.code);
					}
				}
			});
		}
	}, {
		key: "Click",
		value: function Click(index, e) {
			if (index == "all") {
				if (e.target.checked) {
					this.setState({
						check: [true, true, true, true, true, true]
					});
					for (var i = 0; i < 5; i++) {
						this.checked[i] = e.target.checked;
					}
				} else {
					this.setState({
						check: [false, false, false, false, false, false]
					});
					for (var i = 0; i < 5; i++) {
						this.checked[i] = e.target.checked;
					}
				}
			}
			// console.log(e);
			else {
					this.checked[index] = e.target.checked;
					var obj = this.state.check;
					obj[index] = true;
					this.setState({
						check: obj
					});
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
			var _this16 = this;

			// 编辑框下面第一栏的单选框，以及输入框
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-3" },
						React.createElement("input", { type: "checkbox", onClick: function onClick(e) {
								return _this16.handleClick("all", e);
							} }),
						React.createElement(
							"label",
							null,
							"\u5168\u9009"
						)
					),
					this.state.groups.map(function (v, i) {
						_this16.checked.v = false;
						// console.log(v);
						return React.createElement(
							"div",
							{ className: "col-3" },
							React.createElement("input", { className: "inline", checked: _this16.state.check[i], type: "checkbox", onClick: function onClick(e) {
									return _this16.handleClick(i, e);
								} }),
							React.createElement(
								"label",
								{ className: "inline" },
								v
							)
						);
					})
				),
				React.createElement(
					"div",
					{ "class": "row" },
					React.createElement(
						"div",
						{ "class": "col-3" },
						React.createElement("input", { className: "inline", name: "lyz2lzh", type: "radio", onChange: this.handleCheck.public }),
						React.createElement(
							"label",
							{ className: "inline" },
							"\u516C\u5F00"
						)
					),
					React.createElement(
						"div",
						{ "class": "col-3" },
						React.createElement("input", { className: "inline", name: "lyz2lzh", type: "radio", onChange: this.handleCheck.private }),
						React.createElement(
							"label",
							{ className: "inline" },
							"\u6536\u8D39"
						)
					),
					React.createElement(
						"div",
						{ "class": this.state.inputClass },
						React.createElement("input", { type: "text", onChange: this.handlegetValue, "class": "form-control", placeholder: "\u60C5\u62A5\u5355\u4EF7" })
					)
				)
			);
		}
	}]);

	return CheckboxGroup;
}(React.Component);

var Content = function (_React$Component8) {
	_inherits(Content, _React$Component8);

	function Content(props) {
		_classCallCheck(this, Content);

		var _this17 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

		_this17.state = {
			publicModal_state: false, // the switch of the modal of the public news
			privateModal_state: false, // the switch of the modal of the private news 
			publicTitle: "",
			publicContent: "",
			publicFrom: "",
			privateTitle: "",
			privatePrice: "",
			privateTotal: "",
			privateFrom: "",
			newsPass: "",
			bottomClass: {
				"law": "font_f inline",
				"private": "font_f inline",
				"public": "font_f inline",
				"market": "font_f inline"
			},
			bottom: {
				"law": "hide",
				"private": "hide",
				"public": "hide",
				"market": "hide"
			}
		};
		_this17.handlecloseModal = {
			"public": _this17.closeModal.bind(_this17, "public"),
			"private": _this17.closeModal.bind(_this17, "private")
		};
		_this17.openId = null; //The id of the news which was showing in the modal to use for check the exchange news
		_this17.handlegetData = _this17.getData.bind(_this17);
		_this17.handleExchange = _this17.exchangeNews.bind(_this17);
		_this17.handleBuy = _this17.Buy.bind(_this17);
		_this17.myRef = React.createRef(); //the ref of the checkboxgroup
		_this17.editorRef = React.createRef(); //the ref of the editor
		_this17.handlePublish = _this17.Publish.bind(_this17); //the handle of the method to publish new news
		_this17.handlegetFile = _this17.getFile.bind(_this17);
		_this17.handletitle = function (e) {
			_this17.publishtitle = e.target.value;
		};
		_this17.handletitle = _this17.handletitle.bind(_this17);
		_this17.handlenum = _this17.getNum.bind(_this17);
		_this17.handleItemClick = _this17.itemClick.bind(_this17);
		_this17.handleGetSummary = _this17.getSummary.bind(_this17);
		_this17.handleChooseShow = _this17.chooseShow.bind(_this17);
		_this17.handleNewsPass = _this17.handleNewsPass.bind(_this17);
		return _this17;
	}

	_createClass(Content, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this18 = this;

			var listent = function listent(e) {
				// Set up a News class example in the component named this.News
				_this18.News = new News(e);
			};
			this.listent1 = listent.bind(this);
			ppss.listent("news.list", this.listent1);
			this.running = function () {
				getNews(); //Ask the AJAX of api:news/get in the whole page after all components rendered
				var time = Math.random() * 10000 + Math.random() * 10000 + Math.random() * 1000;
				var running = _this18.running;
				setTimeout(function () {
					running();
				}, time);
			};
			this.running();
		}
	}, {
		key: "exchangeNews",
		value: function exchangeNews() {
			var _this19 = this;

			// Exchange news.And check the id.And close the private
			var listent = function listent(e) {
				if (e.id == _this19.openId) {
					_this19.setState({
						publicTitle: e.title,
						publicContent: e.content,
						publicFrom: e.authorTeamName
					});
					_this19.closeModal("private");
					_this19.openModal("public");
				}
			};
			this.listent = listent.bind(this);
			ppss.listent("news.exchange", this.listent);
			News.exchangeNews(this.inputData);
		}
	}, {
		key: "Buy",
		value: function Buy() {
			News.buyNews(this.openId);
		}
	}, {
		key: "getData",
		value: function getData(e) {
			this.inputData = e.target.value;
		}
	}, {
		key: "itemClick",
		value: function itemClick() {
			var _this20 = this,
			    _arguments = arguments;

			switch (arguments.length) {
				case 3:
					// the function of the public Item
					var publicModal = function publicModal() {
						_this20.setState({
							publicTitle: _arguments[0],
							publicContent: _arguments[1],
							publicFrom: _arguments[2]
						});
						_this20.openModal("public");
					};
					publicModal = publicModal.bind(this);
					publicModal(arguments);
					break;

				case 6:
					var privateModal = function privateModal() {
						_this20.openId = _arguments[0];
						// Tell to the component
						_this20.setState({
							privateTitle: _arguments[1],
							privatePrice: _arguments[2],
							privateTotal: _arguments[3],
							privateFrom: _arguments[4],
							privateSummary: _arguments[5]
						});
						_this20.openModal("private");
					};
					privateModal = privateModal.bind(this);
					privateModal(arguments);
					break;

				default:
					break;
			}
		}
	}, {
		key: "handleNewsPass",
		value: function handleNewsPass(e) {
			this.setState({
				newsPass: e
			});
		}
	}, {
		key: "openModal",
		value: function openModal(type) {
			// show the modal
			switch (type) {
				// show different Modal for different type
				case "public":
					this.setState({
						publicModal_state: true
					});
					break;
				case "private":
					this.setState({
						privateModal_state: true
					});
					ppss.listent("newsPass", this.handleNewsPass);
				default:
					break;
			}
		}
	}, {
		key: "closeModal",
		value: function closeModal(type) {
			// hide different Modal for different type
			switch (type) {
				case "public":
					this.setState({
						publicModal_state: false
					});
					break;

				case "private":
					this.setState({
						privateModal_state: false
					});
					this.setState({
						newsPass: ""
					});

				default:
					break;
			}
		}
	}, {
		key: "getFile",
		value: function getFile(e) {
			this.file = e.target.file[0];
		}
	}, {
		key: "getNum",
		value: function getNum(e) {
			this.publishnum = e.target.value;
		}
	}, {
		key: "getSummary",
		value: function getSummary(e) {
			this.newSummary = e.target.value;
		}
	}, {
		key: "Publish",
		value: function Publish() {
			var news_data = this.editorRef.current.data();
			var type = this.myRef.current.value.private ? 0 : 1; //the news type:public or private
			var isTop = this.myRef.current.isTop ? 0 : 1;
			var price;
			if (type === 0) {
				price = this.myRef.current.value.price;
				// console.log("price"+this.myRef.current.value.price);
			} else {
				price = 0;
			}
			var receiver;
			for (var i in this.myRef.current.checked) {
				if (this.myRef.current.checked[i]) {
					if (receiver) {
						var a = Number(i) + 1;
						receiver = receiver + "," + a;
					} else {
						receiver = i;
					}
				}
			}
			// console.log("data"+news_data);
			console.log(price);
			News.publishNews(this.publishtitle, news_data, this.publishnum, receiver, price, type, this.newSummary, isTop);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			ppss.remove("news.list", this.listent1);
			ppss.remove("news.exchange", this.listent);
			this.running = null;
		}
	}, {
		key: "chooseShow",
		value: function chooseShow(e) {
			var obj = this.state.bottom;
			var oj = this.state.bottomClass;
			for (var i in obj) {
				if (i === e) {
					obj[e] = "show";
				} else {
					obj[i] = "hide";
				}
			}
			for (var p in oj) {
				if (p === e) {
					oj[e] = "font_focus inline bg-brown";
				} else {
					oj[p] = "font_f inline";
				}
			}
			this.setState({
				bottom: obj,
				bottomClass: oj
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this21 = this;

			return React.createElement(
				React.Fragment,
				null,
				React.createElement(
					"div",
					{ className: "welcome" },
					React.createElement(
						"b",
						null,
						"\u60C5\u62A5\u53D1\u5E03"
					)
				),
				React.createElement(
					"div",
					{ className: "top" },
					React.createElement(
						"div",
						{ className: "mb-3" },
						React.createElement(
							"div",
							{ className: "row mb-3" },
							React.createElement(
								"div",
								{ className: "col-2" },
								"\u6807\u9898\uFF1A"
							),
							React.createElement("input", { type: "text", onChange: this.handletitle, "class": "form-control col-10 mb-1", placeholder: "\u6807\u9898" })
						),
						React.createElement(
							"div",
							{ className: "row mb-3" },
							React.createElement(
								"div",
								{ className: "col-2" },
								"\u6458\u8981\uFF1A"
							),
							React.createElement("input", { type: "text", onChange: this.handleGetSummary, "class": "form-control col-10", placeholder: "\u6458\u8981" })
						)
					),
					React.createElement(Editor, { ref: this.editorRef }),
					React.createElement(
						"div",
						{ className: "buttons-right" },
						React.createElement(CheckboxGroup, { ref: this.myRef }),
						React.createElement("div", { className: "mb-2" }),
						React.createElement(
							"div",
							{ className: "row mb-3" },
							React.createElement(
								"div",
								{ className: "col-5" },
								React.createElement("input", { type: "text", onChange: this.handlenum, "class": "form-control", placeholder: "\u60C5\u62A5\u6570\u91CF" })
							),
							React.createElement(
								"div",
								{ className: "col-3" },
								React.createElement(
									"a",
									{ onClick: this.handlePublish, className: "fuck btn bg-brown", href: "#", role: "button" },
									"\u53D1\u5E03"
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "welcome" },
					React.createElement(
						"b",
						null,
						"\u60C5\u62A5\u4E0E\u516C\u544A"
					)
				),
				React.createElement(
					"div",
					{ className: "bottom-top" },
					React.createElement(
						"div",
						{ className: this.state.bottomClass.law },
						React.createElement(
							"a",
							{ onClick: function onClick(e) {
									return _this21.handleChooseShow("law");
								} },
							"\u5730\u65B9\u6CD5\u5F8B"
						)
					),
					React.createElement(
						"div",
						{ className: this.state.bottomClass.public },
						React.createElement(
							"a",
							{ onClick: function onClick(e) {
									return _this21.handleChooseShow("public");
								} },
							"\u5B98\u65B9\u516C\u544A"
						)
					),
					React.createElement(
						"div",
						{ className: this.state.bottomClass.market },
						React.createElement(
							"a",
							{ onClick: function onClick(e) {
									return _this21.handleChooseShow("market");
								} },
							"\u60C5\u62A5\u5E02\u573A"
						)
					),
					React.createElement(
						"div",
						{ className: this.state.bottomClass.private },
						React.createElement(
							"a",
							{ onClick: function onClick(e) {
									return _this21.handleChooseShow("private");
								} },
							"\u5B98\u65B9\u60C5\u62A5"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "bottom" },
					React.createElement(
						"div",
						{ className: this.state.bottom.law },
						React.createElement(List_law, null)
					),
					React.createElement(
						"div",
						{ className: this.state.bottom.public },
						React.createElement(List_public, { onClick: this.handleItemClick })
					),
					React.createElement(
						"div",
						{ className: this.state.bottom.private },
						React.createElement(List_private, { onClick: this.handleItemClick })
					),
					React.createElement(
						"div",
						{ className: this.state.bottom.market },
						React.createElement(List_Market, { onClick: this.handleItemClick })
					)
				),
				React.createElement(
					"div",
					{ className: "logo" },
					React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/logo/news.png", alt: "logo" })
				),
				React.createElement(
					Modal,
					{ isOpen: this.state.publicModal_state },
					React.createElement(
						Modal_head,
						{ close: this.handlecloseModal.public },
						this.state.publicTitle
					),
					React.createElement(
						Modal_body,
						null,
						React.createElement("div", { dangerouslySetInnerHTML: { __html: this.state.publicContent } }),
						React.createElement("div", { className: "mb-1" }),
						React.createElement(
							"small",
							null,
							"\u6D88\u606F\u6765\u6E90:",
							this.state.publicFrom
						)
					),
					React.createElement(Modal_foot, { close: this.handlecloseModal.public })
				),
				React.createElement(
					Modal,
					{ isOpen: this.state.privateModal_state },
					React.createElement(
						Modal_head,
						{ close: this.handlecloseModal.private },
						this.state.privateTitle
					),
					React.createElement(
						Modal_body,
						null,
						this.privateSummary,
						React.createElement("div", { className: "mb-1" }),
						React.createElement(
							"small",
							null,
							"\u4EF7\u683C:",
							this.state.privatePrice
						),
						React.createElement("div", { className: "mb-1" }),
						React.createElement(
							"small",
							null,
							"\u5269\u4F59\u91CF:",
							this.state.privateTotal
						),
						React.createElement("div", { className: "mb-1" }),
						React.createElement(
							"small",
							null,
							"\u6D88\u606F\u6765\u6E90:",
							this.state.privateFrom
						),
						React.createElement("div", { className: "mb-1" }),
						React.createElement(
							"small",
							null,
							"\u60C5\u62A5\u7801:",
							this.state.newsPass
						)
					),
					React.createElement(
						Modal_foot,
						{ close: this.handlecloseModal.private },
						React.createElement("input", { type: "text", "class": "form-control", placeholder: "\u8BF7\u8F93\u5165\u5151\u6362\u7801", "aria-label": "\u8BF7\u8F93\u5165\u5151\u6362\u7801", "aria-describedby": "basic-addon1", onChange: this.handlegetData }),
						React.createElement(
							"button",
							{ type: "button", onClick: this.handleExchange, "class": "btn btn-primary col-2" },
							"\u5151\u6362"
						),
						React.createElement(
							"button",
							{ type: "button", onClick: this.handleBuy, "class": "btn btn-primary col-2" },
							"\u8D2D\u4E70"
						)
					)
				)
			);
		}
	}]);

	return Content;
}(React.Component);

ReactDOM.render(
// 加载导航栏
React.createElement(Nav, { choosed: 3, teamName: team.name }), document.getElementById("Nav"));

ReactDOM.render(
// 加载内容
React.createElement(Content, null), document.getElementById("content"));