import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';

class newAssignment extends React.Component {
	constructor(props) {
      super(props);
      this.state = {aName: "", cName: "", dueDate: ""};
    };
	
	componentDidMount() {
	//add a method that displays datagrid of input values
	//this.addAssingment();
	}
	
	
	addAssignment = () =>{
		//const newAssignment = {aName, cName, dueDate};
		console.log("newAssignment.add");
		const token = Cookies.get('XSRF-TOKEN');
		
		fetch(`${SERVER_URL}/course/${this.state.cName}` , 
			{
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
		'X-XSRF-TOKEN': token },
		body: JSON.stringify({name: this.state.aName, dueDate: this.state.dueDate})
			})
			.then(res => {
				if(res.ok){
				toast.success("Assignment successfully posted",{
				position: toast.POSITION.BOTTOM_LEFT
				});
				} else{
				toast.error("Assignment failed to post",{
				position: toast.POSITION.BOTTOM_LEFT
				});
				console.error('Post http status =' + res.status);
				}
			})
			.catch(err => {
          toast.error("Grade updated failed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
			
	    };
	
	handleCellEditCommitA = (e) => {
      this.setState({aName: e.target.value});
	  console.log("aName = " + this.state.aName);
    }
	
	handleCellEditCommitC = (e) => {
      this.setState({cName: e.target.value});
    }
	
	handleCellEditCommitD = (e) => {
      this.setState({dueDate: e.target.value});
    }
	
	render() {
		
		return(
			<div align="left" >
			<h4>New Assignment </h4>
			<div>
			<form onSubmit={this.addAssignment}>
				<label>
				Assignment Name:
				<input type="text" 
				name="aName"
				value={this.state.aName}
				onChange = {this.handleCellEditCommitA}/>
				</label>
				<label>
				Course ID:
				<input type="text" 
				name="cName"
				value={this.state.cName}
				onChange = {this.handleCellEditCommitC}/>
				</label>
				<label>
				Due Date:
				<input type="text" 
				name="dueDate"
				value={this.state.dueDate}
				onChange = {this.handleCellEditCommitD}/>
				</label>
				</form>
			</div>
                <Button id="Add" variant="outlined" color="primary" style={{margin: 10}} onClick={this.addAssignment} >
                   Add
                </Button>
				<ToastContainer autoClose={1500} />
              </div>
		)
	}
}

export default newAssignment;