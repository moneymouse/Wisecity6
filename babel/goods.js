class Table extends React.Component{
    // 商店
    constructor(props){
        super(props);
        // this.handleclick = this.click.bind(this);
        this.state = {
            good_space:[],
            publicModal_state:false,
            modal_value:{
                place:{}
            },
            currency:[],
            totalPriceSell:0,
            totalPriceBuy:0,
        }
        this.handlecloseModal = this.close.bind(this);
        this.handleopenModal = this.open.bind(this);
        this.buy_value = {};// the value to buy goods
        this.handleget_input_Value = this.get_input_Value.bind(this)
        this.handleBuy = this.Buy.bind(this);
        this.handleSell = this.Sell.bind(this);
        this.warehouse = {};
    }

    componentDidMount(){
        var listent = (e)=>{
            this.good = new Good(e);
            this.setState({
                good_space:this.good.list,
            })
        }
        listent = listent.bind(this);
        this.listentID = listent;
        ppss.listent("good.list",listent);
        this.running = ()=>{
            good_ask.list();//Ask the AJAX of api:goods/get in the whole page after all components rendered
            var time = Math.random()*10000 + Math.random()*10000 + Math.random()*1000;
            var running = this.running;
            setTimeout(function(){running()},time);
        };
        this.running()
        var handlelist = this.List.bind(this);
        $.ajax({
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
                    handlelist(mover);
                }
            }
        });

        var su = (e)=>{
            for(var i in e){
                this.warehouse[e[i].goods_name] = e[i].num;
            }
        }
        su = su.bind(this);
        $.ajax({
            // get warehouse value
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/getWarehouse",
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){
                    var response_data = response.data;
                    su(response_data);
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

        
    }

    List(e) {
        this.setState({
            currency:e
        })
    }

    componentWillUnmount(){
        ppss.remove("good.list",this.listentID);
        this.running = 0;
    }

    close(){
        this.setState({
            publicModal_state:false
        })
    }

    open(value){
        this.buy_value.id = value.id
        this.setState({
            publicModal_state:true,
            modal_value:value
        })
    }

    get_input_Value(e){
        this.buy_value.num = e.target.value;
        this.setState({
            inputValue:e.target.value,
            totalPriceSell:Number(this.buy_value.num) * Number(this.state.modal_value.sell),
            totalPriceBuy:Number(this.buy_value.num) * Number(this.state.modal_value.buy)
        })
    }

    Buy(){
        this.setState({
            inputValue:undefined,
            totalPriceSell:0,
            totalPriceBuy:0
        })
        this.good.BuyOrSell("buy",this.buy_value.id,this.buy_value.num)
    }

    Sell(){
        this.setState({
            inputValue:undefined,
            totalPriceSell:0,
            totalPriceBuy:0
        })
        this.good.BuyOrSell("sell",this.buy_value.id,this.buy_value.num);
    }

    render(){
        return (<React.Fragment>
        <div className="welcome"><b>商店</b></div>
        <div className="goodBox">
        <table className="table">
            <thead className="bg-brown" style={{"color":"white"}}>
                <tr>
                <th scope="col">商品名称</th>
                <th scope="col">原产地</th>
                <th scope="col">即时购价</th>
                <th scope="col">即时售价</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {this.state.good_space.map((value)=>{
                    return (<tr key="index" >
                        <td>{value.name}</td>
                        <td> {value.place.name} </td>
                        <td>{value.buy}</td>
                        <td>{value.sell}</td>
                        <td><a class="btn bg-brown" href="#" onClick={()=>{this.handleopenModal(value)}} role="button">Click!</a></td>
                    </tr>)
                })}
            </tbody>
        </table>
        </div>
        <div className="logo">
            <img src={"https://wisecity.itrclub.com/resource/img/logo/store.png"} alt={"logo"} />
        </div>
        <Modal isOpen={this.state.publicModal_state} >
			<Modal_head close={this.handlecloseModal}>{this.state.modal_value.name}</Modal_head>
			<Modal_body>
                <div className="row mb-2">
				    <div className="col-3 font-modal">库存:</div>
                    <div className="col-2">{this.warehouse[this.state.modal_value.name]}</div>
				    <div className="col-3 font-modal">即时进价:</div>
                    <div className="col-2">{this.state.modal_value.buy}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-3">产地:</div>
                    <div className="col-2">{this.state.modal_value.place.name}</div>
                    <div className="col-3 font-modal">即时售价:</div>
                    <div className="col-2">{this.state.modal_value.sell}</div>
                </div>
                <div className="row mb-4">
                    <div className="col-4">购入/售出数量:</div>
                    <div className="col-6">
                        <input value={this.state.inputValue} className="form-control" type="text" onChange={this.handleget_input_Value} placeholder="购买/售出数量..." />
                    </div>
                </div>
                <div className={"line"}></div>
                <div>
                    <div className="modal-body-down-left inline">
                        <div className="font-modal">总进价:</div>
                        <div className="font-modal" style={{"float":"left"}}>{this.state.totalPriceBuy.toFixed(2)}</div>
                    </div>
                    <div className="modal-body-down-right inline">
                        <div className="font-modal" style={{"float":"right"}}>总售价:</div>
                        <div className="font-modal" style={{"float":"right"}}>{this.state.totalPriceSell.toFixed(2)}</div>
                    </div>
                </div>
			</Modal_body>
			<Modal_foot close={this.handlecloseModal} >
                <a class="btn bg-brown" href="#" onClick={this.handleBuy} role="button">购买</a>
                <a class="btn bg-brown" href="#" role="button" onClick={this.handleSell} >出售</a>
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
    <Nav choosed={4} teamName={team.name} />,
    document.getElementById("Nav")
)