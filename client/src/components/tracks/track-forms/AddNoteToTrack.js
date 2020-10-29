import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote } from '../../../actions/track';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const AddNoteToTrack = ({ trackId, addNote }) => {
  const [noteData, setNoteData] = useState({
    noteText: '',
    showNote: true,
  });
  return (
    <div>
      <Form
        className="my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addNote(trackId, noteData);
          // setNoteData({ noteText: '', showNote: true });
        }}
      >
        <Form.Control
          as="textarea"
          rows={3}
          className="shadow-effect-note my-3"
          name="text"
          placeholder="Write a note"
          value={noteData.noteText}
          onChange={(e) =>
            setNoteData({ ...noteData, noteText: e.target.value })
          }
          required
        ></Form.Control>
        <Button type="submit" class="btn my-3">
          Save My Note
        </Button>
      </Form>
    </div>
  );
};

AddNoteToTrack.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default connect(null, { addNote })(AddNoteToTrack);
