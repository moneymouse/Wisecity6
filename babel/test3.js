class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            publicModal_state:false
        }
        this.handlecloseModal = this.close.bind(this);
        this.handleopen = this.open.bind(this)
    }

    close(){
        this.setState({
            publicModal_state:false
        })
    }

    open(){
        this.setState({
            publicModal_state:true
        })
    }

    render(){
        return (
        <div>
            <a class="btn btn-primary" href="#" onClick={this.handleopen} role="button"></a>
            <Modal isOpen={this.state.publicModal_state} >
					{/* The Modal of public news */}
					<Modal_head close={this.handlecloseModal}>e</Modal_head>
					<Modal_body>
						<p className="mb-1">f</p>
						<small>e</small>
					</Modal_body>
					<Modal_foot close={this.handlecloseModal} ></Modal_foot>
				</Modal>
        </div>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById("a")
)