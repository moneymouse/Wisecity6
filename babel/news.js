class ListItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<a className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.props.onClick}>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1"><b>{this.props.title}·{this.props.isPublic?"公开":"付费"}</b></h5>
				</div>
				<div className="news-content">{this.props.content}</div>
				<br />
				<small>发布者:{this.props.team}</small>
			</a>
		)
	}
}

class List_private extends React.Component{
	// 官方情报
	constructor(props){
		super(props);
		this.state={
			data: []
		};
	}

	componentDidMount(){
		this.listent = (e)=>{
			this.setState({
				data:e.private
			})
		}
		this.listent = this.listent.bind(this);
		ppss.listent("news.list",this.listent)
	}

	componentWillUnmount(){
		ppss.remove("news.list",this.listent)
	}

	Click(id,title,price,total,from,summary){
		// To tell the onClick that this is private Item
		this.props.onClick(id,title,price,total,from,summary)
	}

	render(){
		return (
			<div className="list-group">
				{this.state.data.map((val,index)=>{
					var handleonClick = this.Click.bind(this,val.id,val.title,val.price,val.surplus,val.authorTeamName,val.summary)// add the click listence in the Item to open Modal
					return (<ListItem isPublic={false} onClick={handleonClick} team={val.authorTeamName} title={val.title} content={val.summary} key={index} />)
				})}
			</div>
		)
	}
}

class List_public extends React.Component{
	// 官方公告
	constructor(props){
		super(props);
		this.state={
			data: []
		};
	}

	componentDidMount(){
		this.listent = (e)=>{
			this.setState({
				data:e.public
			})
		}
		this.listent = this.listent.bind(this);
		ppss.listent("news.list",this.listent)
	}

	componentWillUnmount(){
		ppss.remove("news.list",this.listent)
	}

	Click(title,content,from){
		// To tell the onClick that this is public Item
		this.props.onClick(title,content,from)
	}

	render(){
		return (
			<div className="list-group">
				{this.state.data.map((val,index)=>{
					var handleClick = this.Click.bind(this,val.title,val.content,val.authorTeamName)// add the click listence in the Item to open Modal
					return (<ListItem team={val.authorTeamName} isPublic={true} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
				})}
			</div>
		)
	}
}

class List_law extends React.Component{
	// 地方法律
	constructor(props){
		super(props);
		this.state={
			data: []
		};
	}

	componentDidMount(){
		this.listent = (e)=>{
			this.setState({
				data:e
			})
		}
		var listent = this.listent.bind(this);
		$.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/group/getLaw",
            data:{groupId:team.groupId},
            dataType: "JSON",
            success: function (response) {
                if (response.code !== 200&&response.code!==0) ppss.publish("erro", response.code);
                else{
                    listent(response.data);
                }
            }
        });
	}

	render(){
		var law = ["一","二","三"]
		return (
			<div className="list-group">
				{this.state.data.map((val,index)=>{
					return (<ListItem title={"第"+law[index]+"则法律"} content={val} key={index} />)
				})}
			</div>
		)
	}
}

class List_Market extends React.Component{
	// 情报黑市
	constructor(props){
		super(props);
		this.state={
			data: []
		};
	}

	componentDidMount(){
		this.listent = (e)=>{
			this.setState({
				data:e.market
			})
		}
		this.listent = this.listent.bind(this);
		ppss.listent("news.list",this.listent)
	}

	componentWillUnmount(){
		ppss.remove("news.list",this.listent)
	}

	clickPublic(title,content,from){
		// To tell the onClick that this is public Item
		this.props.onClick(title,content,from)
	}

	clickPrivate(id,title,price,surplus,from,summary){
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
		this.props.onClick(id,title,price,surplus,from,summary);
	}

	render(){
		return (
			<div className="list-group">
				{this.state.data.map((val,index)=>{
					if(Number(val.is_public)===1){
						var handleClick = this.clickPublic.bind(this,val.title,val.content,val.authorTeamName)// add the click listence in the Item to open Modal
						return (<ListItem isPublic={true} team={val.authorTeamName} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
					}
					else{
						var handleClick = this.clickPrivate.bind(this,val.id,val.title,val.price,val.surplus,val.authorTeamName,val.summary)// add the click listence in the Item to open Modal
						return (<ListItem isPublic={false} team={val.authorTeamName} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
					}
				})}
			</div>
		)
	}
}

class Editor extends React.Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		var e = document.querySelector("#editbox");//获取取代节点
		ClassicEditor
			.create(e)
			.then( editor => {
				// console.log(editor)
				this.data = ()=>{
					return editor.getData()
				}
			} )
			.catch( error => {
				console.error( error );
			} );    
	}

	render(){
		return (
			<div id="editbox">
				<p className="font_f" style={{"font-size":"1.3em"}}>请在此输入情报！</p>
			</div>
		)
	}
}

class CheckboxGroup extends React.Component{
	constructor(props){
		super(props)
		this.state={
			inputClass:"hide",
			groups:[],
			check:[false,false,false,false,false,false]
		}
		this.handleCheck = {
			"private":this.Check_private.bind(this),
			"public":this.Check_public.bind(this)
		};
		this.handlegetValue = this.getValue.bind(this);
		this.value = {};
		this.checked = {};
		this.isTop = false;
		this.handleClick = this.Click.bind(this);
	}

	Check_public(e){
		if(e.target.checked){
			this.setState({
				inputClass:"hide"
			})
			this.value.private = false;
			this.value.price = undefined;
		}
		
	}

	componentDidMount(){
		var _t = this;
		$.ajax({
			type: "GET",
			url: "https://wisecity.itrclub.com/api/group/getList",
			dataType: "JSON",
			success: function (response) {
				if(response.code === 200){
					var a = [];
					for(var i in response.data){
						a.push(i);
					}
					_t.setState({
						groups:a
					})
				}
				else if(response.code===403001){
					alert("请登录后访问");
					location.href = "https://wisecity.itrclub.com/user/login"
				}
				else{
					ppss.publish("erro",response.code);
				}
			}
			});
	}

	Click(index,e){
		if(index=="all"){
			if(e.target.checked){
				this.setState({
					check:[true,true,true,true,true,true]
				})
				for(var i=0;i<5;i++){
					this.checked[i] = e.target.checked;
				}
			}
			else{
				this.setState({
					check:[false,false,false,false,false,false]
				})
				for(var i=0;i<5;i++){
					this.checked[i] = e.target.checked;
				}
			}
		}
		// console.log(e);
		else{
			this.checked[index] = e.target.checked;
			var obj = this.state.check;
			obj[index] = true;
			this.setState({
				check:obj
			})
		}
	}

	Check_private(e){
		if(e.target.checked){
			this.setState({
				inputClass:"col-6"
			})
			this.value.private = true
		}

	}

	getValue(e){
		this.value.price=e.target.value;
	}

	render(){
		// 编辑框下面第一栏的单选框，以及输入框
		return (<React.Fragment>
		<div className="row">
			<div className="col-3">
				<input type="checkbox" onClick={(e)=>this.handleClick("all",e)} />{/*!!! */}
				<label>全选</label> 
			</div>
			{this.state.groups.map((v,i)=>{
				this.checked.v = false;
				// console.log(v);
				return (<div className="col-3">
					<input className="inline" checked={this.state.check[i]} type="checkbox" onClick={(e)=>this.handleClick(i,e)} />
					<label className="inline">{v}</label>
				</div>
				)
			})}
		</div>
		<div class="row">
			<div class="col-3">
				<input className="inline" name="lyz2lzh" type="radio" onChange={this.handleCheck.public} />
				<label className="inline" >公开</label>
			</div>
			<div class="col-3">
				<input className="inline" name="lyz2lzh" type="radio" onChange={this.handleCheck.private} />
				<label className="inline" >收费</label>
			</div>
			<div class={this.state.inputClass}>
			<input type="text" onChange={this.handlegetValue} class="form-control" placeholder="情报单价" /> 
			</div>
		</div>
		
		</React.Fragment>)
	}
}

class Content extends React.Component{
	constructor(props){
		super(props);
		this.state={
			publicModal_state:false, // the switch of the modal of the public news
			privateModal_state:false, // the switch of the modal of the private news 
			publicTitle:"",
			publicContent:"",
			publicFrom:"",
			privateTitle:"",
			privatePrice:"",
			privateTotal:"",
			privateFrom:"",
			newsPass:"",
			bottomClass:{
				"law":"font_f inline",
				"private":"font_f inline",
				"public":"font_f inline",
				"market":"font_f inline"
			},
			bottom:{
				"law":"hide",
				"private":"hide",
				"public":"hide",
				"market":"hide"
			}
		}
		this.handlecloseModal = {
			"public":this.closeModal.bind(this,"public"),
			"private":this.closeModal.bind(this,"private")
		}
		this.openId = null;//The id of the news which was showing in the modal to use for check the exchange news
		this.handlegetData = this.getData.bind(this);
		this.handleExchange = this.exchangeNews.bind(this);
		this.handleBuy = this.Buy.bind(this);
		this.myRef = React.createRef();//the ref of the checkboxgroup
		this.editorRef = React.createRef(); //the ref of the editor
		this.handlePublish = this.Publish.bind(this); //the handle of the method to publish new news
		this.handlegetFile = this.getFile.bind(this);
		this.handletitle = (e)=>{
			this.publishtitle = e.target.value;
		};
		this.handletitle = this.handletitle.bind(this);
		this.handlenum = this.getNum.bind(this);
		this.handleItemClick = this.itemClick.bind(this);
		this.handleGetSummary = this.getSummary.bind(this);
		this.handleChooseShow = this.chooseShow.bind(this);
		this.handleNewsPass = this.handleNewsPass.bind(this);
	}

	componentDidMount(){
		var listent = (e)=>{
			// Set up a News class example in the component named this.News
			this.News = new News(e)
		}
		this.listent1 = listent.bind(this);
		ppss.listent("news.list",this.listent1);
		this.running = ()=>{
            getNews();//Ask the AJAX of api:news/get in the whole page after all components rendered
            var time = Math.random()*10000 + Math.random()*10000 + Math.random()*1000;
            var running = this.running;
            setTimeout(function(){running()},time);
		}
		this.running();
	}

	exchangeNews(){
		// Exchange news.And check the id.And close the private
		var listent = (e)=>{
			if(e.id==this.openId){
				this.setState({
					publicTitle:e.title,
					publicContent:e.content,
					publicFrom:e.authorTeamName
				})
				this.closeModal("private");
				this.openModal("public")
			}
		}
		this.listent = listent.bind(this);
		ppss.listent("news.exchange",this.listent);
		News.exchangeNews(this.inputData);
	}

	Buy(){
		News.buyNews(this.openId);
	}

	getData(e){
		this.inputData = e.target.value;
	}

	itemClick(){
		switch (arguments.length) {
			case 3:
				// the function of the public Item
				var publicModal = ()=>{
					this.setState({
						publicTitle:arguments[0],
						publicContent:arguments[1],
						publicFrom:arguments[2]
					})
					this.openModal("public");
				}
				publicModal = publicModal.bind(this);
				publicModal(arguments);
				break;
			
			case 6:
				var privateModal = ()=>{
					this.openId = arguments[0];
					// Tell to the component
					this.setState({
						privateTitle:arguments[1],
						privatePrice:arguments[2],
						privateTotal:arguments[3],
						privateFrom:arguments[4],
						privateSummary:arguments[5]                
					})
					this.openModal("private");
				}
				privateModal = privateModal.bind(this);
				privateModal(arguments);
				break;

			default:
				break;
		}
	}

	handleNewsPass(e){
		this.setState({
			newsPass:e
		})
	}

	openModal(type){
		// show the modal
		switch (type) {
			// show different Modal for different type
			case "public":
				this.setState({
					publicModal_state:true
				})
				break;
			case "private":
				this.setState({
					privateModal_state:true
				});
				ppss.listent("newsPass",this.handleNewsPass);
			default:
				break;
		}
	}

	closeModal(type){
		// hide different Modal for different type
		switch (type) {
			case "public":
				this.setState({
					publicModal_state:false
				})
				break;

			case "private":
				this.setState({
					privateModal_state:false
				});
				this.setState({
					newsPass:""
				});
		
			default:
				break;
		}
	}

	getFile(e){
		this.file = e.target.file[0];
	}

	getNum(e){
		this.publishnum = e.target.value;
	}

	getSummary(e){
		this.newSummary = e.target.value;
	}

	Publish(){
		var news_data = this.editorRef.current.data();
		var type = this.myRef.current.value.private ? 0 : 1; //the news type:public or private
		var isTop = this.myRef.current.isTop ? 0 : 1;
		var price;
		if(type===0){
			price = this.myRef.current.value.price;
			// console.log("price"+this.myRef.current.value.price);
		}
		else{
			price = 0;
		}
		var receiver;
		for(var i in this.myRef.current.checked){
			if(this.myRef.current.checked[i]){
				if(receiver){
					var a = Number(i) + 1;
					receiver = receiver + "," + a;
				}
				else{
					receiver = i;
				}
			}
		}
		// console.log("data"+news_data);
		console.log(price);
		News.publishNews(this.publishtitle,news_data,this.publishnum,receiver,price,type,this.newSummary,isTop);
	}

	componentWillUnmount(){
		ppss.remove("news.list",this.listent1);
		ppss.remove("news.exchange",this.listent);
		this.running = null;
	}

	chooseShow(e){
		var obj = this.state.bottom;
		var oj = this.state.bottomClass;
		for(var i in obj){
			if(i===e){
				obj[e] = "show";
			}
			else{
				obj[i] = "hide";
			}
		}
		for(var p in oj){
			if(p===e){
				oj[e] = "font_focus inline bg-brown";
			}
			else{
				oj[p] = "font_f inline";
			}
		}
		this.setState({
			bottom:obj,
			bottomClass:oj
		});
	}

	render(){
		return(<React.Fragment>
			<div className="welcome"><b>情报发布</b></div>
			<div className="top">
				<div className="mb-3">
					<div className="row mb-3">
						<div className="col-2">标题：</div>
						<input type="text" onChange={this.handletitle} class="form-control col-10 mb-1" placeholder="标题" />
					</div>
					<div className="row mb-3">
						<div className="col-2">摘要：</div>
						<input type="text" onChange={this.handleGetSummary} class="form-control col-10" placeholder="摘要" />
					</div>
				</div>
				<Editor ref={this.editorRef} />
				<div className="buttons-right">
					<CheckboxGroup ref={this.myRef} />
					<div className="mb-2"></div>
					<div className="row mb-3">
						<div className="col-5">
							<input type="text" onChange={this.handlenum} class="form-control" placeholder="情报数量" />
						</div>
						<div className="col-3">
							<a onClick={this.handlePublish} className="fuck btn bg-brown" href="#" role="button">发布</a>
						</div>
					</div>
				</div>
			</div>
			
			<div className="welcome"><b>情报与公告</b></div>
			<div className="bottom-top">
				<div className={this.state.bottomClass.law}><a onClick={e=>this.handleChooseShow("law")}>地方法律</a></div>
				<div className={this.state.bottomClass.public}><a onClick={e=>this.handleChooseShow("public")}>官方公告</a></div>
				<div className={this.state.bottomClass.market}><a onClick={e=>this.handleChooseShow("market")}>情报市场</a></div>
				<div className={this.state.bottomClass.private}><a onClick={e=>this.handleChooseShow("private")}>官方情报</a></div>
			</div>
			<div className="bottom">
				<div className={this.state.bottom.law}>
					<List_law />
				</div>
				<div className={this.state.bottom.public}>
					<List_public onClick={this.handleItemClick} />
				</div>
				<div className={this.state.bottom.private}>
					<List_private onClick={this.handleItemClick} />
				</div>
				<div className={this.state.bottom.market}>
					<List_Market onClick={this.handleItemClick} />
				</div>
			</div>
			<div className="logo">
            	<img src={"https://wisecity.itrclub.com/resource/img/logo/news.png"} alt={"logo"} />
        	</div>	
				<Modal isOpen={this.state.publicModal_state} >
					{/* The Modal of public news */}
					<Modal_head close={this.handlecloseModal.public}>{this.state.publicTitle}</Modal_head>
					<Modal_body>
						<div dangerouslySetInnerHTML={{__html:this.state.publicContent}} />
						<div className="mb-1"></div>
						<small>消息来源:{this.state.publicFrom}</small>
					</Modal_body>
					<Modal_foot close={this.handlecloseModal.public} ></Modal_foot>
				</Modal>
				<Modal isOpen={this.state.privateModal_state} >
					{/* The Modal of private news */}
					<Modal_head close={this.handlecloseModal.private}>{this.state.privateTitle}</Modal_head>
					<Modal_body>
						{this.privateSummary}
						<div className="mb-1"></div>
						<small>价格:{this.state.privatePrice}</small>
						<div className="mb-1"></div>
						<small>剩余量:{this.state.privateTotal}</small>
						<div className="mb-1"></div>
						<small>消息来源:{this.state.privateFrom}</small>
						<div className="mb-1"></div>
						<small>情报码:{this.state.newsPass}</small>
					</Modal_body>
					<Modal_foot close={this.handlecloseModal.private}>
						<input type="text" class="form-control" placeholder="请输入兑换码" aria-label="请输入兑换码" aria-describedby="basic-addon1" onChange={this.handlegetData} />
						<button type="button" onClick={this.handleExchange} class="btn btn-primary col-2">兑换</button>
						<button type="button" onClick={this.handleBuy} class="btn btn-primary col-2">购买</button>
					</Modal_foot>
				</Modal>
		</React.Fragment>
		)
	}
}

ReactDOM.render(
	// 加载导航栏
	<Nav choosed={3} teamName={team.name} />,
	document.getElementById("Nav")
)

ReactDOM.render(
	// 加载内容
	<Content />,
	document.getElementById("content")
)

