/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createNote } from './index.js';


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
    handleSubmit() {
        const newNote = document.querySelector('input').value;
        console.log(newNote);
        // this.props.submitNote(newNote)
        console.log(this.props)
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <ul>
                    {
                        this.props.notes.map(note => <li key={note.id}>{ note.text }</li>)
                    }
                </ul>
                {/* <input type="text" name="newNote" /> <button onClick={this.handleSubmit}>Create Note</button> */}
                <input type="text" name="newNote" />
                <button onClick={
                    () => {
                        const text = document.querySelector('input').value;
                        // console.log(newNote);
                        const newNote = {
                            text,
                        }
                        this.props.submitNote(newNote)
                        document.querySelector('input').value = ''
                    }
                }>
                
                Create Note</button>

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
        submitNote: (newNote) => dispatch(createNote(newNote)) // need to import
    }
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default ConnectedNotes;