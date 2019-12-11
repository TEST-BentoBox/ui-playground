import React, {Component} from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

/**
 * Component for display a list of phone numbers in a table and a form to add new ones
 */
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            data: {},
            status: "initial"
        };
    }

    /**
     * Fetch json data for a list of phone numbers in existing data
     */
    fetchContacts = async () => {
        this.setState({
            status: "pending"
        });

        const url = "https://jsonblob.com/api/jsonBlob/c0c89591-1c4a-11ea-a001-5185b10b35d6";

        try {
            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                this.setState({
                    data: data,
                    status: "done"
                });
            });
        } catch (error) {
            this.setState({
                status: "error"
            });
        }
    };

    // Method to format display of data
    formatPhoneNumber = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if ( match ) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null;
    };

    // Click action to delete a phone number from the list
    handleDelete = (phoneIndex) => {
        alert("Here is where you delete item " + phoneIndex);
        // FIXME: make a call to delete an item from the data source and refresh to display updated list
    };

    // Click action for adding a phone number to the list
    handleAdd = () => {
        alert("Here is where you add a phone");
        // FIXME: make a call to add to the data source and refresh to display updated list
    };

    // When the component mounts, fetch the data
    componentDidMount() {
        document.title = "Contacts";
        this.fetchContacts();
    }

    render() {
        let component;

        // Based on the status in the state, switch what is displayed
        switch ( this.state.status ) {
            // at first and while pending, display a spinner to show an action is being taken place
            case "initial":
            case "pending":
                component =
                    <div className="text-center">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>;
                break;
            // the fetch has returned an error so display an error message
            case "error":
                component =
                    <Alert variant="danger">
                        Error getting the data!
                    </Alert>;
                break;
            // the fetch is completed, display data/messaging/form based on the data source
            case "done":
                let phoneNumberList = this.state.data.phoneNumbers.map(function(item, index) {
                    return (
                        <tr key={index}>
                            <td className="w-50 align-middle">
                                {item.type} {item.default ? '(default)': null}
                            </td>
                            <td className="w-50 align-middle">
                                {this.formatPhoneNumber(item.number)}
                            </td>
                            <td  className="w-auto align-middle">
                                <Button variant="link" onClick={() => this.handleDelete(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt} aria-hidden="true" />
                                </Button>
                            </td>
                        </tr>
                    );
                }.bind(this));

                // if there are no records, display message, otherwise show a table of the data
                let phoneNumberDisplay =
                    <Alert variant="info">
                        No records to display
                    </Alert>;
                if ( phoneNumberList.length > 0 ) {
                    phoneNumberDisplay =
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Number</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {phoneNumberList}
                            </tbody>
                        </Table>;
                }

                component =
                    <Row>
                        <Col xs={12} className="mb-3">
                            <h1 className="h3">List of Phone Numbers</h1>
                        </Col>
                        <Col xs={12}>
                            {phoneNumberDisplay}
                        </Col>
                        <Col xs={12}>
                            <h2 className="h4">Add Phone Number</h2>
                            <Form onSubmit={this.handleAdd}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="phoneType" className="mb-0">
                                        <Form.Label className="sr-only">Phone Number Type</Form.Label>
                                        <Form.Control type="text" placeholder="Type" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="phoneNumber" className="mb-0">
                                        <Form.Label className="sr-only">Phone Number</Form.Label>
                                        <Form.Control type="number" placeholder="Number" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                                    </Button>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>;
                break;
            default:
                component =
                    <Alert variant="warning">
                        Something went wrong, this should never happen.
                    </Alert>
        }

        return component;
    }
}

export default Contacts;