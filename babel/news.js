class ListItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<a className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.props.onClick}>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{this.title}</h5>
					<small>{this.props.team}</small>
				</div>
				{this.props.content}
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
					return (<ListItem onClick={handleonClick} team={val.authorTeamName} title={val.title} content={val.summary} key={index} />)
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
					return (<ListItem team={val.authorTeamName} title={val.title} content={val.content} onClick={handleClick} key={index} />)
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
						return (<ListItem team={val.authorTeamName} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
					}
					else{
						var handleClick = this.clickPrivate.bind(this,val.id,val.title,val.price,val.surplus,val.authorTeamName,val.summary)// add the click listence in the Item to open Modal
						return (<ListItem team={val.authorTeamName} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
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
			groups:[]
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
		// console.log(e);
		this.checked[index] = e.target.checked;
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
				<input type="checkbox" onClick={(e)=>this} />{/*!!! */}
				<label>{全选}</label> 
			</div>
			{this.state.groups.map((v,i)=>{
				this.checked.v = false;
				// console.log(v);
				return (<div className="col-3">
					<input type="checkbox" onClick={(e)=>this.handleClick(i,e)} />
					<label>{v}</label>
				</div>
				)
			})}
		</div>
		<div class="row">
			<div class="col-3">
				<input name="lyz2lzh" type="radio" onChange={this.handleCheck.public} />
				<label >公开</label>
			</div>
			<div class="col-3">
				<input name="lyz2lzh" type="radio" onChange={this.handleCheck.private} />
				<label >收费</label>
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
				})
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
				})
		
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

	render(){
		return(
			<div className="row">
				<div className="col-lg-6 col-sm-12 left">
					<div className="up">
						<h3 className="font_f">地方法律</h3>
						<List_law />
					</div>
					<div className="up">
						<h3 className="font_f">官方公告</h3>
						<List_public onClick={this.handleItemClick} />
					</div>
					<div className="down">
					<h3 className="font_f">官方情报</h3>
						<List_private onClick={this.handleItemClick} />
					</div>
					<div className="down">
					<h3 className="font_f">情报市场</h3>
						<List_Market onClick={this.handleItemClick} />
					</div>
				</div>
				<div className="col-lg-6 col-sm-12 right">
					<div className="mb-3">
						<input type="text" onChange={this.handletitle} class="form-control mb-1" placeholder="标题" />
						<input type="text" onChange={this.handleGetSummary} class="form-control" placeholder="摘要" />
					</div>
					<Editor ref={this.editorRef} />
					<div className="buttons-right">
						<CheckboxGroup ref={this.myRef} />{/* The cheockbox of private or public the publish want */}
						{/* publish the news and choose the  */}
						<div className="row mb-3">
							<div className="col-5">
								<input type="text" onChange={this.handlenum} class="form-control" placeholder="情报数量" />
							</div>
						</div>
						<div className="row mb-3">	
							{/* <div className="col-1"></div>		 */}
							{/* <button type="file" onChange={this.handlegetFile} class="btn btn-outline-secondary btn-block col-4 ">添加附件</button>			 */}
							<a onClick={this.handlePublish} className="fuck btn btn-secondary" href="#" role="button">发布情报</a>
						</div>
					</div>
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
					</Modal_body>
					<Modal_foot close={this.handlecloseModal.private}>
						<input type="text" class="form-control" placeholder="请输入兑换码" aria-label="请输入兑换码" aria-describedby="basic-addon1" onChange={this.handlegetData} />
						<button type="button" onClick={this.handleExchange} class="btn btn-primary col-2">兑换</button>
						<button type="button" onClick={this.handleBuy} class="btn btn-primary col-2">购买</button>
					</Modal_foot>
				</Modal>
			</div>
		)
	}
}

ReactDOM.render(
	// 加载导航栏
	<Nav />,
	document.getElementById("Nav")
)

ReactDOM.render(
	// 加载内容
	<Content />,
	document.getElementById("content")
)

