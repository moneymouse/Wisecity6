class Table extends React.Component{
    // 仓库
    constructor(props){
        super(props);
        this.handleclick = this.click.bind(this);//click the table item
        this.state={
            warehouse:[],
            modal_state:false,
            classinput:"form-control",
            a:["白银"],
            teamlist:{
                name:[]
            },
            totalPrice:0
        }
        this.value = {};// the value to modal
        this.sellvalue = {};// the value to ajax
        this.good={};
        this.handleopen = this.click.bind(this); //To open modal
        this.handleclose = this.close.bind(this); //To close modal
        this.handlegetremark = this.get_remark_value.bind(this);
        this.handlegetprice = this.get_price_value.bind(this);// To get the price
        this.handlegetnum = this.get_num_value.bind(this);//To get the num
        this.handlegetselect = this.get_select_value.bind(this);//To get the select value
        this.handlegetcurrency = this.get_currency.bind(this);
        this.handleSell = this.Sell.bind(this);
        this.handleBuy = this.Buy.bind(this);
        this.handleGetChoice = this.choiceOfBuy.bind(this);
        this.handleClickPOST = this.clickPOST.bind(this);
    }

    close(){
        // close modal
        this.setState({
            modal_state:false
        })
    }

    open(){
        // open modal
        this.setState({
            modal_state:true
        })
    }

    click(e){
        // open modal and push the value into modal
        this.setState({
            modal_state:true
        });
        this.value = e; // Tell the whole the open item content 
        // console.log(e);
        this.sellvalue.good = e.id;
    }

    componentDidMount(){
        var listen_warehouse = (e)=>{
            // warehouse content
            this.setState({
                warehouse:e
            })
        };
        this.listen_warehouse = listen_warehouse.bind(this);
        ppss.listent("warehouse",this.listen_warehouse);

        var listen_team = (e)=>{
            // get the team content
            var name = [];
            e.map((val,index)=>{
                name[index]=val.name
            })
            name.push("劳动者");
            this.setState({
                teamlist : {
                    teamlist:e,
                    name:name
                }
            })
        }
        this.listen_team = listen_team.bind(this);
        ppss.listent("team_list_warehouse",this.listen_team);

        var listen = (e)=>{
            this.good = new Good(e);
        };
        listen = listen.bind(this);
        this.listentID = listen;
        ppss.listent("good.list",listen);
        good_ask.list();

        $.ajax({
            // get team value
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/get",
            data:{"type":"list"},
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    var responsedata = response.data.info;
                    var response_data=[];
                    for(var i=0;i<responsedata.length;i++){
                        response_data.push({"id":responsedata[i].id,"name":responsedata[i].name})
                    }
                    ppss.publish("team_list_warehouse",response_data);
                }
                else if(response.code===403001){
                    alert("请登录后再访问");
                    location.href = "https://wisecity.itrclub.com/";
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });
        $.ajax({
            // get warehouse value
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/getWarehouse",
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){
                    var response_data = response.data;
                    ppss.publish("warehouse",response_data);
                }
                else if(response.code==403001){
                    alert("请登录后再访问");
                    location.href = "https://wisecity.itrclub.com/";
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });

        var handleList = this.List.bind(this);
        // 获取货币列表
        $.ajax({
            // get currency
            type: "GET",
            url: "https://wisecity.itrclub.com/api/bank/ticket/get",
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){
                    var data = response.data.list;
                    var mover = [];
                    for(var i in data){
                        mover.push(data[i].ticketName);
                    }
                    handleList(mover);
                }
            }
        });
        
    }

    List(e){
        // list the currency,the currency type will be it's (index+2) except for 白银 
        var mover;
        mover = this.state.a;
        mover = mover.concat(e);
        this.setState({
            a:mover
        })
    }

    componentWillUnmount(){
        ppss.remove("warehouse",this.listen_warehouse);
        ppss.remove("team_list_warehouse",this.listen_team);
        ppss.remove("good.list",this.listentID);
    }

    get_remark_value(e){
        this.sellvalue.remark = e.target.value;
    }

    get_select_value(e){
        var _t = this;
        this.state.teamlist.teamlist.map((val)=>{
            if(val.name === e){
                _t.sellvalue.id = val.id;
            }
        });
    }

    get_num_value(e){
        this.sellvalue.num = e.target.value;
        if(this.sellvalue.price!==undefined){
            this.setState({
                totalPrice:this.sellvalue.price*this.sellvalue.num
            })
        }
    }

    get_price_value(e){
        this.sellvalue.price = e.target.value;
        if(this.sellvalue.num!==undefined){
            this.setState({
                totalPrice:this.sellvalue.price*this.sellvalue.num
            })
        }
    }

    get_currency(e){
        var id=0;
        this.state.a.map((v,i)=>{
            if((v===e)&&(e!=="白银")){
                id = i+3;
            }
        });
        this.sellvalue.currency = id;
    }

    Sell(){
        // console.log(this.sellvalue)
        if((this.sellvalue.id === undefined)||(this.sellvalue.good===undefined)||(this.sellvalue.num===undefined)){
            alert("请选择数据");
            return
        }
        this.sellvalue.price = this.sellvalue.price * this.sellvalue.num;
        Transaction_goods(this.sellvalue.id,this.sellvalue.currency,this.sellvalue.num,this.sellvalue.remark,0,this.sellvalue.good,this.sellvalue.price);
    }
    
    Buy(){
        // console.log(this.sellvalue)
        if((this.sellvalue.id === undefined)||(this.sellvalue.good===undefined)||(this.sellvalue.num===undefined)){
            alert("请选择数据");
            return
        }
        this.sellvalue.price = this.sellvalue.price * this.sellvalue.num;
        Transaction_goods(this.sellvalue.id,this.sellvalue.currency,this.sellvalue.num,this.sellvalue.remark,1,this.sellvalue.good,this.sellvalue.price);
    }

    choiceOfBuy(e){
        this.type={};
        this.type.buy = e.target.checked;
    }

    clickPOST(){
        if(this.type===undefined){
            alert("请选择购入或卖出！");
            return ;
        }
        if(this.type.buy){
            this.handleBuy();
        }
        else{
            this.handleSell();
        }
    }

    render(){
        return (<React.Fragment>
        <div className="welcome"><b>仓库</b></div>
        <div className="warehouseBox">
        <table className="table" style={{paddingTop:"10px"}}>
            <thead className="bg-brown" style={{"color":"white"}}>
                <tr>
                <th scope="col">商品名称</th>
                <th scope="col">库存</th>
                <th scope="col">即时售价</th>
                <th scope="col">买入/卖出</th>
                </tr>
            </thead>
            <tbody>
                {this.state.warehouse.map((val,index)=>{
                    return (<tr key={index}>
                        <th scope="row">{val.goods_name}</th>
                        <td>{val.num}</td>
                        <td>{this.good.list.map((v)=>{
                            if(v.name==val.goods_name){
                                val.price = v.sell;
                                val.id = v.id;
                                return v.sell;
                            }
                        })}</td>
                        <td><a class="btn bg-brown" href="#" role="button" onClick={()=>{this.handleclick(val)}}>Click!</a></td>
                </tr>)
                })}
            </tbody>
        </table>
        </div>
        <div className="logo">
            <img src={"https://wisecity.itrclub.com/resource/img/logo/storage.png"} alt={"logo"} />
        </div>
        <Modal isOpen={this.state.modal_state}>
            <Modal_head close={this.handleclose}>{this.value.goods_name}</Modal_head>
            <Modal_body>
                <div className="row mb-3">
                    <div className="col-3">
                        <input name={"lzh2lyz13"} type="radio" onChange={this.handleGetChoice} />
                        <label>购入</label>
                    </div>
                    <div className="col-3">
                        <input name={"lzh2lyz13"} type="radio" />
                        <label>售出</label>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="font-modal col-2">目标方:</div>
                    <div className="col-4">
                        <Select options={this.state.teamlist.name} get_value={this.handlegetselect} /> {/* select the aim who you want to sell */}
                    </div>
                    <div className="font-modal col-2 c">货币类型:</div>
                    <div className="col-4">
                        <Select options={this.state.a} get_value={this.handlegetcurrency} /> {/* select the currency which you want to use */}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-2">数量:</div>
                    <div className="col-4">
                        <input className="form-control" onChange={this.handlegetnum} type="text" placeholder="数量..." />
                    </div>
                    <div className="col-2">单价:</div>
                    <div className="col-4">
                        <input className={this.state.classinput} onChange={this.handlegetprice} type="text" placeholder="单价..." />
                    </div>
                </div>
                <div className={"line"}></div>
                <div className="mb-2">
                    <div className="modal-body-down-left inline">
                        <div className={"font-modal "}>库存:{this.value.num}</div>
                        <div className={"font-modal"}>即时单价:{this.value.price}</div>
                    </div>
                    <div className="modal-body-down-right inline">
                        <div className="font-modal" style={{"float":"right"}}>总金额:</div>
                        <br />
                        <div className="font-modal" style={{"float":"right"}}>{this.state.totalPrice.toFixed(2)}</div>
                    </div>
                </div>
                <input className={this.state.classinput} onChange={this.handlegetremark} type="text" placeholder="备注..." />
            </Modal_body>
            <Modal_foot close={this.handleclose} >
                <div className="row">
                    <a class="btn bg-brown" href="#" role="button" onClick={this.handleClickPOST} >确认</a>
                </div>
            </Modal_foot>
        </Modal>
    </React.Fragment>
        )
    }

}

ReactDOM.render(
    <Table />,
    document.getElementById("root")
)

ReactDOM.render(
    <Nav choosed={2} teamName={team.name} />,
    document.getElementById("Nav")
)