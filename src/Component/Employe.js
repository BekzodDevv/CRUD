import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
import { Modal, ModalBody } from 'reactstrap';

export default class Employe extends Component {

    state = {
        employees: [],
        openModal: false,
        sel: -1
    };

    componentDidMount() {
        axios.get('https://nimadir.herokuapp.com/api/employee')
            .then((res) => {
                this.setState({
                    employees: res.data.object
                })
            })
    }

    addEmployee = (event, value) => {
        axios.post('https://nimadir.herokuapp.com/api/employee', value)
            .then((res) => {
                if (res.data.success) {
                    axios.get('https://nimadir.herokuapp.com/api/employee')
                        .then((res2) => {
                            this.setState({
                                employees: res2.data.object
                            })
                        })
                    this.form.reset();
                }
            })
    }

    dele = (id) => {
        axios.delete("https://nimadir.herokuapp.com/api/employee/" + id)
            .then((res) => {
                axios.get("https://nimadir.herokuapp.com/api/employee")
                    .then((res2) => {
                        this.setState({
                            employees: res2.data.object
                        })
                    })
            })
    }

    changeModal = () => {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    editt = (event, value) => {
        axios.put('https://nimadir.herokuapp.com/api/employee/' + this.state.employees[this.state.sel].id, value)
            .then((res) => {
                axios.get('https://nimadir.herokuapp.com/api/employee')
                    .then((res2) => {
                        this.setState({
                            employees: res2.data.object
                        })
                        this.changeModal()
                    })
            })
    }


    //   'https://nimadir.herokuapp.com/api/employee/'
    render() {
        const { employees, openModal, sel } = this.state;

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mx-auto">
                            <div className="card">
                                <div className="card-header text-center text-white">
                                    <h4>Add Employe</h4>
                                </div>
                                <div className="card-body innn">
                                    <AvForm ref={(e) => this.form = e} onValidSubmit={this.addEmployee}>

                                        <AvField
                                            type="text"
                                            label="Ismingizni kiriting"
                                            name="firstName"
                                            required />

                                        <AvField
                                            type="text"
                                            label="familiyangizni kiriting"
                                            name="lastName"
                                            required />

                                        <AvField
                                            type="number"
                                            label="Yoshingizni kiriting"
                                            name="age"
                                            required />

                                        <AvField
                                            type="number"
                                            label="Moashingizni kiriting"
                                            name="salary"
                                            required />

                                        <AvField
                                            type="select"
                                            name="position"
                                            label="Lavozimingizni kiriting">
                                            <option value="director">director</option>
                                            <option value="developer">developer</option>
                                            <option value="Manager">Manager</option>
                                        </AvField>

                                        <button type="submit" className="btn btn-info mt-3 w-100">Add</button>

                                    </AvForm>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {employees.map((item, index) => (
                            <div key={item.id} className="col-md-4 box">
                                <div className="card content my-2">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div className="card-header text-center text-white">
                                        <h4>{item.firstName} {item.lastName} </h4>
                                    </div>
                                    <div className="card-body text-white">
                                        <h5>Age: {item.age}</h5>
                                        <h5>Salary: {item.salary}</h5>
                                        <h5>Position: {item.position}</h5>

                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn edit w-50 text-white"
                                            onClick={() => { this.setState({ sel: index }); this.changeModal() }}> Edit</button>
                                        <button type="button" className="btn delete w-50 text-white" onClick={() => this.dele(item.id)}>Delete</button>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>


                    <div className="row">
                        <div className="col-md-12">
                            <Modal isOpen={openModal} >
                                <ModalBody>
                                    <AvForm onValidSubmit={this.editt} model={employees[sel]}>

                                        <AvField
                                            type="text"
                                            label="Ismingizni kiriting"
                                            name="firstName"
                                            required />

                                        <AvField
                                            type="text"
                                            label="familiyangizni kiriting"
                                            name="lastName"
                                            required />

                                        <AvField
                                            type="number"
                                            label="Yoshingizni kiriting"
                                            name="age"
                                            required />

                                        <AvField
                                            type="number"
                                            label="Moashingizni kiriting"
                                            name="salary"
                                            required />

                                        <AvField
                                            type="select"
                                            name="position"
                                            label="Lavozimingizni kiriting">
                                            <option value="director">director</option>
                                            <option value="developer">developer</option>
                                            <option value="Manager">Manager</option>
                                        </AvField>

                                        <button type="submit" className="btn btn-warning" >  Edit</button>
                                        <button type="button" className="btn btn-info" onClick={this.changeModal}>Cancel</button>

                                    </AvForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>





                </div>

            </div >
        )
    }
}
