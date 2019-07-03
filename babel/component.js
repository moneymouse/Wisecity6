/*
    这是整个项目最最最最最恶心的代码页，相信没有之一，我花了三天去实现此功能，其中两天在拼搭它的逻辑....
    by:作者
    --2019年5月11日18:20:49

    我现在感觉好多了
    by:作者
    --2019年5月18日12:56:31
*/

class PS {
    constructor() {
        this.event = [];
        this.message = [];
    }

    listent(key, fn) {
        this.event[key] = this.event[key] || [];
        this.event[key].push(fn);
        if (this.message[key]) {
            for (var i = 0; i < this.message[key].length; i++) {
                fn(this.message[key][i].pop());
            }
        }
    }

    publish(key, message) {
        this.message[key] = this.message[key] || [];
        this.message[key].push(message);
        if (this.event[key]) {
            for (var i = 0; i < this.event[key].length; i++) {
                this.event[key][i](message);
                this.message[key].pop(message);
            }
        }
    }

    remove(key, fn) {
        for (var i = 0; i <= this.event[key].length; i++) {
            if (this.event[key][i] == fn) {
                this.event[key].splice(i, 1);
            }
        }
    }

}

// 模态框组件
class Modal extends React.Component{
    constructor(props){
        //渲染一个隐藏的模态框
        super(props);
        this.state = {
            show:"modal fade",
            style:"none",
            opc:"1"
        }
        this.state_renderd = false;//状态渲染
    }
    
    open(){
        this.state_renderd = true;//To tell the component it's state is open
        var _t=this
        this.setState({
            style:"block"
        })
        // 延时是为了让其动画正常进行
        setTimeout(function(){_t.setState({
            show:"modal fade show",
            opc:".5"
        })},100);
        //调暗背景
        ReactDOM.render(
            <Fade isOpen={true}/>,
            document.getElementById("fade")
        );
    }
    
    close(){
        this.state_renderd = false;//To tell the component it's state of render is close;
        var _t = this
        // modal_state = false;
        this.setState({
            show:"modal fade",
            opc:"1"
        })
        // 延时是为了让其动画正常进行
        setTimeout(function(){_t.setState({
            style:"none"
        })},300);
        //调亮背景
        ReactDOM.render(
            <Fade isOpen={false}/>,
            document.getElementById("fade")
        );
    }

    render(){
        if(this.props.isOpen&&(this.state_renderd!==this.props.isOpen)){
            this.open();
        }
        if((!this.props.isOpen)&&(this.state_renderd!==this.props.isOpen)){
            this.close();
        }
            return (<div>
                <div className={this.state.show} id="exampleModalLong" style={{display:this.state.style}} tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>)
    }
}

class Modal_head extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-header">
                {/* 标题 */}
                <h5 className="modal-title" id="exampleModalLongTitle">{this.props.children}</h5>
                <button type="button" className="close" onClick={this.props.close}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
        
    }
}

class Modal_body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-body">
                {/* 身体 */}
                {this.props.children}
            </div>           
        )
        
    }
}

class Modal_foot extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-footer">
                {/* 底部 */}
                {this.props.children}
                {/* <button type="button" className="btn btn-primary" data-dismiss="modal" onClick>出售</button> */}
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>Close</button>
            </div>           
        )
    }
}

// {
//  <div>   
//     <div className="cont font_f">
//     {/* 商品选择modal-body样式 */}
//             {"商品"+":"+this.props.content.name}
//             <br/>
//             {"单价"+":"+this.props.content.price}
//             <br/>
//         </div>
//         <div class="input-group mb-3">
//             <div class="input-group-prepend">
//                 <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
//                 <div class="dropdown-menu">
//                     <a class="dropdown-item" href="#">Action</a>
//                     <a class="dropdown-item" href="#">Another action</a>
//                     <a class="dropdown-item" href="#">Something else here</a>
//                     <div role="separator" class="dropdown-divider"></div>
//                     <a class="dropdown-item" href="#">Separated link</a>
//                 </div>
//             </div>
//             <input type="text" class="form-control" aria-label="Text input with dropdown button"/>
//         </div>
//     </div>
// }           

class Fade extends React.Component{
    // 背景颜色
    constructor(props){
        super(props);
        this.state={
            shows:"",
            is:null
        }
        this.state_renderd = false;//渲染状态
    }

    toggle(){
        if(this.props.isOpen){
            this.state_renderd = true;
            this.setState({
                shows:"modal-backdrop fade show",
                is:()=>{
                    console.log("click")
                }
            })
        }
        else{
            this.state_renderd = false;
            this.setState({
                shows:"",
                is:null
            })
        }
    }



    render(){
        if(this.state_renderd!==this.props.isOpen){
            // this.state_renderd = !this.state_renderd//否认状态
            this.toggle()
        }
        return(
            <div className={this.state.shows} onClick={this.state.is}></div>
        )
    }


}





class Nav extends React.Component {
    // 导航栏组件
    constructor(props) {
        super(props);
        this.state = {
            navshow:"collapse navbar-collapse",
            height:"0px",
            down:"nav-item dropdown active",
            downmenu:"dropdown-menu"
        };
        this.timehandle;
        this.togglehandle = this.toggle.bind(this);
        this.toggle_2 = this.toggle_1.bind(this);
        this.isclick=true;
    }

    toggle(e){
        // 移动端收缩导航栏显示与隐藏
        if(this.isclick==true){
        this.isclick = false;
        var _t = this
        var navshow ;
        if(this.state.navshow=="collapse navbar-collapse show"){
            navshow="collapse navbar-collapse";
            this.setState({
                navshow:"collapsing navbar-collapse",
                height:"0px"
            })
        }
        else{
            navshow="collapse navbar-collapse show";
            this.setState({
                navshow:"collapsing navbar-collapse"
            })
            setTimeout(function(){
                _t.setState({height:"114px"})
            },1)
        }
        var tog = function (){
            _t.setState({
                navshow:navshow
            })
            _t.isclick = true
        }
        setTimeout(function(){
            tog();
        },300);}
    }

    toggle_1(){
        // 下拉菜单显示与隐藏
        if(this.state.downmenu == "dropdown-menu"){
            this.setState({
                downmenu: "dropdown-menu show"
            })
        }
        else{
            this.setState({
                downmenu: "dropdown-menu"
            }) 
        }
    }

    render() { 
        return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand title" href="#">Wisecity</a>
        <button onClick={this.togglehandle} className="navbar-toggler" aria-controls="navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div className={this.state.navshow} style={{height:this.state.height}} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link font_f active" href="index">首页</a>
                </li>
                <li className={this.state.down}>
                    <a className="nav-link dropdown-toggle" role="button" href="#" id="dropdownId" onClick={this.toggle_2}>操作</a>
                    <ul className={this.state.downmenu} aria-labelledby="dropdownId">
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/payment">转账</a></li>
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/warehouse">仓库</a></li>
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/news">情报</a></li>
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/goods">商店</a></li>
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/asset">资产管理</a></li>
                        <li><a className="dropdown-item" href="https://wisecity.itrclub.com/team/investment">金融操作</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link font_f active" href="https://wisecity.itrclub.com/user/logout" role="button">退出登录</a>
                </li>
            </ul>
        </div>
    </nav>);
    }
}

// 表格组件
class T_head extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <thead className="thead-light">
                <tr>
                    {this.props.content.map((value,index)=>{
                        return(
                            <th scope="col" key={index}>{value}</th>
                        )
                    })}
                </tr>
            </thead>
        )
    }
}

class T_body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tbody>
                    {this.props.content.map((value,index)=>{
                        return(
                            <tr key={index}>{value.map((val,index)=>{
                                    return (<td key={index} >{val}</td>)
                                })}</tr>
                        )
                        {/* return value; */}
                    })}
            </tbody>
        )
    }
}

class T_table extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <table className="table">
                {this.props.children}
            </table>
        )
    }
}

// select 
class Select extends React.Component{
    constructor(props){
        super(props);
        this.handleget = this.Get.bind(this);
    }

    Get(e){
        this.props.get_value(e.target.value)
    }

    render(){
        return (
        <select class="custom-select" id="inputGroupSelect01" onChange={this.handleget}>
            <option selected>{this.props.value||"Choose..."}</option>
            {this.props.options.map((value,index)=>{
                return (
                    <option value={value} key={index}>{value}</option>
                )
            })}
        </select>
        )
    }
}

// Input
class Input_group extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="input-group mb-3">
                {this.props.children}
            </div>
        )
    }
}


// class ES extends React.Component{
//     // erro or success
//     constructor(props){
//         super(props);
//         this.state = {
//             isOpen:false
//         }
//     }

//     componentDidMount(){
        
//     }

//     render(){
//         return(
//             <Modal isOpen={this.state.isOpen}>

//             </Modal>
//         )
//     }
// }
    