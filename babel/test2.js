class CheckboxGroup extends React.Component{
	constructor(props){
		super(props)
		this.state={
			inputClass:"hide"
		}
		this.handleCheck = {
			"private":this.Check_private.bind(this),
			"public":this.Check_public.bind(this)
		};
		this.handlegetValue = this.getValue.bind(this);
		this.value = {}
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
		return (
		<div class="row">
			<div class="col-3">
				<input type="radio" onChange={this.handleCheck.public} />
				<label class="custom-control-label">公开</label>
			</div>
			<div class="col-3">
				<input type="radio" onChange={this.handleCheck.private} />
				<label class="custom-control-label">私密</label>
			</div>
			<div class={this.state.inputClass}>
			<input type="text" class="form-control" placeholder="情报单价" /> 
			</div>

		</div>
		)
	}
}


class Test extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.click = this.click.bind(this);
    }

    componentDidMount(){
        console.log(this.ref);        
    }

    click(){
        console.log(this.ref.current.value);
    }

    render(){
        return(
            <div>
                <button onClick={this.click} class="btn">
                        click <span class="badge badge-primary"></span>
                </button>
                <CheckboxGroup ref={this.ref}></CheckboxGroup>
            </div>
        )
    }
}

ReactDOM.render(
    <Test></Test>,
    document.getElementById("a")
)