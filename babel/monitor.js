class Good_Edit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            goods:[],
            groups:[],
            focusName:"a"
        }
        this.ajaxData = {};
        this.handleGetValue = this.getValue.bind(this);
        this.group={};
        this.goods = {
            a:{}
        }
        this.handleClick = this.Click.bind(this);
    }

    getValue(type,e){
        if(type==="name"||type==="groupName"){
            this.ajaxData[type]=e;
        }
        else this.ajaxData[type]=e.target.value;
    }

    Click(){
        console.log(this.group);
        var data = {
            "name":this.ajaxData["name"],
            "groupId":this.group[this.ajaxData["groupName"]],
            "kb":this.ajaxData["kb"],
            "ks":this.ajaxData["ks"],
            "B":this.ajaxData["B"],
            "S":this.ajaxData["S"],
            "NB":this.ajaxData["NB"],
            "NS":this.ajaxData["NS"],
        }
        // console.log(data)
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/goods/edit",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if (response.code == 200) {
                    alert("修改成功")
                } else alert("请联系管理员，错误码:"+response.code);
            }
        });
        
    }

    componentDidMount(){    
        var asuccess = (e)=>{
            this.group = e;
            var groups = [];
            for(var i in e){
                groups.push(i);
            }
            this.setState({
                groups:groups
            })
        }

        var bsuccess = (e)=>{
            var goods = {};
            for(var i in e){
                this.goods[e[i].goodsName] = e[i]
                if(goods[e[i].groupName]===undefined){
                    goods[e[i].groupName]=[e[i].goodsName];
                }               
                else{
                    goods[e[i].groupName].push(e[i].goodsName);
                }
            }
            this.setState({
                goods:goods
            })
            
        }
        asuccess = asuccess.bind(this);
        bsuccess = bsuccess.bind(this);
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/group/getList",
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    asuccess(response.data);
                }
                else{
                    alert("请联系管理员，错误码:"+response.code)
                }
            }
        });
        ppss.listent("good.list",bsuccess);
        good_ask.list("list");
    }

    render(){
        var goodFocus = this.goods[this.state.focusName];
        console.log(goodFocus);
        return (
            <div>   
                商品名称:<Select  get_value={(e)=>this.handleGetValue("name",e)} value="产品名称（必选）" options={(this.state.goods[this.props.groupName])||[]} />
                商品产地:<Select get_value={(e)=>this.handleGetValue("groupName",e)} value={this.props.groupName||"所属商帮（必选）"} options={this.state.groups} />
                购价系数:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("kb",e)} placeholder={goodFocus.kb||"购价系数"} />
                售价系数:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("ks",e)} placeholder={goodFocus.ks||"售价系数"} />
                购价:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("B",e)} placeholder={goodFocus.B||"购价"} />
                售价:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("S",e)} placeholder={goodFocus.S||"售价"} />
                收购总量:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("NB",e)} placeholder={goodFocus.NB||"总供给量"} />
                销售总量:<input className="form-control non-border" onChange={(e)=>this.handleGetValue("NS",e)} placeholder={goodFocus.NS||"总销售量"} />
                <div className={"mb-2"}></div>
                <a class="btn btn-primary" href="#" onClick={this.handleClick} role="button">修改</a>
            </div>
        )
    }
}

class TeamRank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            teams:[]
        }
        this.modalValue={
            money:[]
        };
        this.handleOpen=this.Open.bind(this);
        this.handleClose=this.Close.bind(this);
    }

    Open(e){
        this.modalValue = e;
        this.setState({
            isOpen:true
        })
    }
    
    Close(){
        this.setState({
            isOpen:false
        })
    }

    componentDidMount(){
        var asuccess = (e)=>{
            console.log(e);
            var arr = [];
            for(var i in e){
                var o = {};
                o = e[i];
                o.money = o.treasury;
                var allData = 0.00;
                for(var i=0;i<1;i++){
                    allData = Number(allData)+Number(o.money[i].num);
                }
                o.allData = allData;
                arr.push(o);
            }
            
            this.setState({
                teams:arr
            })
        }
        asuccess = asuccess.bind(this);
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/get",
            data:{
                type:"list"
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    asuccess(response.data.info);
                }
                else{
                    alert("请联系管理员，错误码:"+response.code);
                }
            }
        });
    }

    render(){
        return (<React.Fragment>
        <T_table>
            <thead className="thead-light">
                <tr>
                   <th scope="col">队伍名称</th> 
                   <th scope="col">白银总额</th> 
                   <th scope="col">所属商帮</th> 
                </tr>
            </thead>
            <tbody>
                {this.state.teams.map((v,i)=>{
                    return (<tr>
                        <th><a onClick={()=>this.handleOpen(v)} >{v.name}</a></th>
                        <td>{v.allData}</td>
                        <td>{v.geoupName}</td>
                    </tr>)
                })}
            </tbody>
        </T_table>
            <Modal isOpen={this.state.isOpen}>
                <Modal_head close={this.handleClose}>
                    {this.modalValue.name}
                </Modal_head>
                <Modal_body>
                    所属商帮:{this.modalValue.geoupName}
                    <br />
                    {this.modalValue.money.map((v,i)=>{
                        if(i>2){
                            return ;
                        }
                        return (v.currency+":"+v.num)
                    })}
                    
                </Modal_body>
                <Modal_foot close={this.handleClose}></Modal_foot>
            </Modal>
        </React.Fragment>
        )
    }
}

class TransactionLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transactionlog:[]
        }
    }

    componentDidMount(){
        var success = e=>{
            var arr = [];
            for(var i in e){
                arr.push(e[i]);
            }
            this.setState({
                transactionlog:arr
            })
        }
        success = success.bind(this);
        ppss.listent("log.transcation",success);
        getLog("transcation");
    }

    render(){
        return(
            <T_table>
                <thead className="thead-light">
                    <tr>
                    <th scope="col">交易ID</th>
                    <th scope="col">发起方</th>
                    <th scope="col">接受方</th>
                    <th scope="col">商品名称</th>
                    <th scope="col">商品数量</th>
                    <th scope="col">金额</th>
                    <th scope="col">备注</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transactionlog.map((value,index)=>{
                        return (<tr key={index} >
                            <td>{value.id}</td>
                            <td> {value.fromTeamName} </td>
                            <td>{value.toTeamName}</td>
                            <td>{value.goods_name}</td>
                            <td>{value.num}</td>
                            <td>{value.currency}:{value.money||value.num}</td>
                            <td>{value.remark}</td>
                        </tr>)
                    })}
                </tbody>
            </T_table>
        )
    }
}

class TransferLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transferlog:[]
        }
    }

    componentDidMount(){
        var success = e=>{
            var arr = [];
            for(var i in e){
                arr.push(e[i]);
            }
            this.setState({
                transfer:arr
            })
        }
        success = success.bind(this);
        ppss.listent("log.transfer",success);
        getLog("transfer");
    }

    render(){
        return(
            <T_table>
                <thead className="thead-light">
                    <tr>
                    <th scope="col">交易ID</th>
                    <th scope="col">发起方</th>
                    <th scope="col">接受方</th>
                    <th scope="col">金额</th>
                    <th scope="col">备注</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transferlog.map((value,index)=>{
                        return (<tr key={index} >
                            <td>{value.id}</td>
                            <td> {value.fromTeamName} </td>
                            <td>{value.toTeamName}</td>
                            <td>{value.currency}:{value.money||value.num}</td>
                            <td>{value.remark}</td>
                        </tr>)
                    })}
                </tbody>
            </T_table>
        )
    }
}

class LonateLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transferLog:[]
        }
    }

    componentDidMount(){
        var success = e=>{
            var arr = [];
            for(var i in e){
                arr.push(e[i]);
            }
            this.setState({
                transferLog:arr
            })
        }
        success = success.bind(this);
        ppss.listent("log.lonate",success);
        getLog("lonate");
    }

    render(){
        return(
            <T_table>
                <thead className="thead-light">
                    <tr>
                    <th scope="col">交易ID</th>
                    <th scope="col">发起方</th>
                    <th scope="col">接受方</th>
                    <th scope="col">金额</th>
                    <th scope="col">备注</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transferLog.map((value,index)=>{
                        return (<tr key={index} >
                            <td>{value.id}</td>
                            <td> {value.fromTeamName} </td>
                            <td>{value.toTeamName}</td>
                            <td>{value.currency}:{value.money||value.num}</td>
                            <td>{value.remark}</td>
                        </tr>)
                    })}
                </tbody>
            </T_table>
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

	IsTop(e){
		this.isTop = e.target.checked;
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
			{this.state.groups.map((v,i)=>{
				this.checked.v = false;
				// console.log(v);
				return (<div className="col-1">
					<input type="checkbox" onClick={(e)=>this.handleClick(i,e)} />
					<label>{v}</label>
				</div>
				)
			})}
		</div>
		<div class="row">
			<div class="col-1">
				<input name="lzh2lyz" type="radio" onChange={this.handleCheck.isTop} />
				<label >置顶</label>
			</div>
			<div class="col-1">
				<input name="lzh2lyz" type="radio" />
				<label >非置顶</label>
			</div>
		</div>
		<div class="row">
			<div class="col-1">
				<input name="lyz2lzh" type="radio" onChange={this.handleCheck.public} />
				<label >公开</label>
			</div>
			<div class="col-1">
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

class NewsPublish extends React.Component{
    constructor(props){
        super(props);
        this.handlenum = this.getNum.bind(this);
        this.myRef = React.createRef();//the ref of the checkboxgroup
		this.editorRef = React.createRef(); //the ref of the editor
        this.handletitle = (e)=>{
			this.publishtitle = e.target.value;
		};
        this.handletitle = this.handletitle.bind(this);
        this.handlePublish = this.Publish.bind(this); //the handle of the method to publish new news
        this.handleGetSummary = this.getSummary.bind(this);
    }

    getNum(e){
		this.publishnum = e.target.value;
    }

    getSummary(e){
        this.newsSummary = e.target.value;
    }
    
    Publish(){
		var news_data = this.editorRef.current.data();
		var type = this.myRef.current.value.private ? 0 : 1; //the news type:public or private
		var isTop = this.myRef.current.isTop ? 0 : 1;
		var price;
		if(type==0){
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
                    var p = Number(i)+Number(1);
					receiver = receiver + "," + p;
				}
				else{
					receiver = Number(i);
				}
			}
		}
		// console.log("data"+news_data);
        // console.log(price);
        // console.log(this.publishtitle,news_data[1],this.publishnum,receiver,price,type,news_data[0],isTop);
		News.publishNews(this.publishtitle,news_data,this.publishnum,receiver,price,type,this.newsSummary,isTop);
	}

    render(){
        return (<React.Fragment>
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
        </React.Fragment>)
    }
}

class ListItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		if(this.props.content.length<=30){
			this.content = this.props.content
		}
		else this.content = this.props.content.substr(1,30);
		return (
			<a href="#" className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.props.onClick}>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{this.title}</h5>
					<small>{this.props.team}</small>
				</div>
				<p className="mb-1">{this.content}</p>
			</a>
		)
	}
}

class List_News extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data: []
		};
    }
    
    getNews(){
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/news/get?v=33333333333",
            data: { "type": "examine" },
            dataType: "JSON",
            success: function (response) {
                if (response.code === 200) ppss.publish("news.list",response.data.list);
                else if(response.code === 404){
                    return ;
                }
                else{
                    ppss.publish("erro", response.code);
                }
            }
        });
    }

	componentDidMount(){
		this.listent = (e)=>{
			this.setState({
				data:e
			})
		}
		this.listent = this.listent.bind(this);
        ppss.listent("news.list",this.listent);
        var running = ()=>{
            this.getNews();
            var a = (Math.random()*10000 + Math.random()*10000)*2
            setTimeout(()=>{running()},a);
        }
        running();
	}

	componentWillUnmount(){
		ppss.remove("news.list",this.listent)
	}

	Click(e){
		// To tell the onClick that this is public Item
		this.props.onClick(e)
	}

	render(){
		return (
			<div className="list-group">
				{this.state.data.map((val,index)=>{
					var handleClick = this.Click.bind(this,val)// add the click listence in the Item to open Modal
					return (<ListItem team={val.authorTeamName} title={val.title} content={val.summary} onClick={handleClick} key={index} />)
				})}
			</div>
		)
	}
}

class LawPublish extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            groups:[],
            lawList:[]
        }
        this.focusGroupId = "";
        this.groupList = {};
        this.editorRef = React.createRef(); //the ref of the editor
        this.handlePublish = this.Publish.bind(this);
        this.handleChange = this.getChange.bind(this);
        this.onShow=true;
    }

    componentDidMount(){
        var _t = this;
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/group/getList",
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    _t.groupList = response.data;
                }
                else{
                    ppss.publish("erro",response.code)
                }
            }
        });
    }

    getLawList(){
        var data = {
            "groupId" : this.groupList[this.focusGroupId]
        }
        var ssuccess = (e)=>{
            this.setState({
                lawList:e
            })
        }
        ssuccess = ssuccess.bind(this);
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/group/getLaw",
            data:data,
            dataType: "JSON",
            success: function (response) {
                if (response.code !== 200&&response.code!==0) ppss.publish("erro", response.code);
                else if(response.code === 0) return;
                else{
                    ssuccess(response.data);
                }
            }
        });
    }

    getChange(e,i){
        /* Name: getChange
         * :param e: the DOM of the input
         * :param i: the index of the law
         * :retrun : none   
        */
        var list = this.state.lawList;
        if(list[i]!==e.target.value){
            list[i] = e.target.value;
            this.setState({
                lawList:list
            }
        )}
    }

    Publish(){
        var data = this.state.lawList;
        var groupId = this.groupList[this.props.grouId];
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/group/updateLaw",
            data: {
                "groupId":groupId,
                "content":data
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code === 200){
                    alert("法律推行成功！");
                }
                else{
                    alert("请联系管理员，错误码:"+response.code);
                }
            }
        });
    }

    render(){
        var onshow = false;
        this.groupId = this.props.grouId;
        if(this.groupId!==this.focusGroupId&&this.groupId!==undefined){
            this.focusGroupId = this.props.grouId;
            console.log(this.groupId);
            console.log(this.focusGroupId);
            console.log(this.focusGroupId!==this.props.groupId);
            this.getLawList();
        }
        if(this.focusGroupId!==""){onshow = true;}
        if(onshow){
            return (<React.Fragment>
                {this.state.lawList.map((v,i)=>{
                    return (
                        <input className="form-control" type="text" value={v} onChange={(e)=>this.handleChange(e,i)} />
                    );
                })}
                <a onClick={this.handlePublish} class="btn btn-success" role="button">颁布</a>
            </React.Fragment>
        )}
        else{
            return(
                <React.Fragment></React.Fragment>
            )
        }
    }
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            groupName:"",
            wholeTicket:"",
            groupsName:[],
            isOpen:false
        }
        this.handleGetValue = this.getValue.bind(this);
        this.handleOpen = this.open.bind(this);
        this.handleClose = this.close.bind(this);
        this.handlePass = this.Pass.bind(this);
        this.handleUnPass = this.unPass.bind(this);
        this.modalValue = {};
    }

    componentDidMount(){
        var success = (e)=>{
            var a = [];
            for(var i in e){
                a.push(i);
            }
            this.setState({
                groupsName:a
            })
        }
        success = success.bind(this);
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/group/getList",
            dataType: "JSON",
            success: function (response) {
                if(response.code === 200){
                    success(response.data);
                }
                else{
                    alert("请联系管理员，错误码:"+response.code);
                }
            }
        });
    }

    getValue(e){
        this.setState({
            groupName:e
        })
    }

    open(e){
        this.modalValue = e;
        this.setState({
            isOpen:true
        })
    }

    close(){
        this.setState({
            isOpen:false
        })
    }

    Pass(e){
        var news = new News();
        news.passNews(e)
    }

    unPass(e){
        News.unPassNews(e);
    }

    render(){
        return (<React.Fragment>
            <div className="row" >
                <div className={"col-4"}>
                    <div className="mb-3">{"市场流通的票数:"}{this.state.wholeTicket}</div>
                    <TeamRank />
                </div>
                <div className={"col-8"} >
                    请选择商帮:<Select options={this.state.groupsName} get_value={this.handleGetValue} value={"请选择商帮..."} />
                    商品信息修改:<Good_Edit groupName={this.state.groupName} />
                    法律:<div className={"hold-height"}>
                            <LawPublish grouId={this.state.groupName} />
                         </div>
                    新闻:<div className={"hold-height"}>
                            <List_News onClick={this.handleOpen} />
                        </div>
                        <div className={"hold-height"}>
                            <NewsPublish />
                        </div>
                    商品交易记录:<div className={"hold-height"} >
                            <TransactionLog />
                        </div>
                    资金转账记录:
                    <div className={"hold-height"}>
                        <TransferLog />
                    </div>
                    借贷记录:
                    <div className={"hold-height"}>
                        <LonateLog />
                    </div>
                </div>    
            </div>
            <Modal isOpen={this.state.isOpen}>
                <Modal_head close={this.handleClose} >
                    {this.modalValue.title}
                </Modal_head>
                <Modal_body>
                    {this.modalValue.is_public===0?"付费情报":"公开情报"}
                    <br />
                    {this.modalValue.price?"价格:":undefined}{this.modalValue.price?this.modalValue.price:undefined}
                    <br />
                    {this.modalValue.summary?"摘要":undefined}{this.modalValue.summary?this.modalValue.summary:undefined}
                    <br />
                    {"正文:"}{"正文:"}<div dangerouslySetInnerHTML={{__html:this.modalValue.content}} />
                </Modal_body>
                <Modal_foot close={this.handleClose} >
                    <a onClick={(e)=>this.handlePass(this.modalValue.id)} class="btn btn-success" role="button">发表</a>
                    <a onClick={(e)=>this.handleUnPass(this.modalValue.id)} class="btn btn-danger" role="button">驳回</a>
                </Modal_foot>
            </Modal>    
        </React.Fragment>);
    }

}

ReactDOM.render(
    <Content />,
    document.getElementById("root")
)