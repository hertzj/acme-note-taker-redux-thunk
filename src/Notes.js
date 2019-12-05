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
        // this.state = {
        //     text: '',
        // }
    }
    // handleChange() {
    //     let newText = document.querySelector('input').value;
    //     const { text } = this.state;
    //     console.log(text)
    // }
    handleSubmit(props) {
        const text = document.querySelector('input').value;
        const newNote = {
            text,
        };
        props.submitNote(newNote);
        document.querySelector('input').value = '';
    }
    delete(id, props) {
        props.deleteNote(id);
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <ul>
                    {
                        this.props.notes.map(note => <li key={note.id}>{ note.text }<button onClick={() => this.delete(note.id, this.props)}>X</button></li>)
                    }
                </ul>
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