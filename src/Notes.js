import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// eslint-disable-next-line react/require-render-return
const Notes = props => {
        return (
            <div>
                <ul>
                    {
                        props.notes.map(note => <li>{ note.text }</li>)
                    }
                </ul>
                <input type="text" name="newNote" /> <button>Create Note</button>
            </div>
        )
}

// class Notes extends Component {
//     constructor(props) {
//         super()
//         this.state = {
//             text: '',
//         }
//     }
//     handleChange() {
//         let newText = document.querySelector('input').value;
//         this.setState({text: newText})
//     }
//     render() {
//         console.log(this.state.text)
//         return (
//             <div>
//                 <ul>
//                     {
//                         this.props.notes.map(note => <li>{ note.text }</li>)
//                     }
//                 </ul>
//                 <input type="text" name="newNote" onChange={this.handleChange} /> <button>Create Note</button>
//             </div>
//         )
//     }
    
// }

const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitNote: () => dispatch(newNote())
    }
}

const ConnectedNotes = connect(mapStateToProps)(Notes)

export default ConnectedNotes;