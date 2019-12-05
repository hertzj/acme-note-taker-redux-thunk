/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote, deleteNote } from './index.js';

class Notes extends Component {
    constructor(props) {
        super()
        this.state = {
            invalidSubmit: false,
        }
    }
    handleSubmit(props) {
        if (props.notes.length === 5) {
            this.setState({invalidSubmit: true});
            return;
        }
        const text = document.querySelector('input').value;
        const newNote = {
            text,
        };
        props.submitNote(newNote);
        document.querySelector('input').value = '';
    }
    delete(id, props) {
        props.deleteNote(id);
        if (props.notes.length <= 5) {
            this.setState({invalidSubmit: false});
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.notes.map(note => <li key={note.id}>{ note.text }<button onClick={() => this.delete(note.id, this.props)}>X</button></li>)
                    }
                </ul>
                {
                    this.state.invalidSubmit && <span>user can only have a max of five notes</span> 
                }
                <input type="text" name="newNote" /> <button onClick={() => this.handleSubmit(this.props)}>Create Note</button>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitNote: (newNote) => dispatch(createNote(newNote)),
        deleteNote: (id) => dispatch(deleteNote(id)),
    }
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default ConnectedNotes;