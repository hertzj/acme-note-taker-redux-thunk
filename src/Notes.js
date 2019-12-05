/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createNote, deleteNote } from './index.js';


// eslint-disable-next-line react/require-render-return
// const Notes = props => {
//         return (
//             <div>
//                 <ul>
//                     {
//                         props.notes.map(note => <li>{ note.text }</li>)
//                     }
//                 </ul>
//                 <input type="text" name="newNote" /> <button>Create Note</button>
//             </div>
//         )
// }

class Notes extends Component {
    constructor(props) {
        super()
        this.state = {
            invalidSubmit: false,
        }
    }
    // handleChange() {
    //     let newText = document.querySelector('input').value;
    //     const { text } = this.state;
    //     console.log(text)
    // }
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