import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteNote } from '../../../actions/track';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NoteList = ({
  deleteNote,
  auth,
  trackId,
  note: { _id, noteText, userId, createdAt },
}) => {
  return (
    <Fragment>
      <Row className="d-block mx-1">
        <Col>
          <Row className="my-2">{noteText}</Row>
          <Row className="my-2">
            <div>
              Created by {userId} on {createdAt}
            </div>

            {!auth.loading && userId === auth.user._id && (
              <button
                onClick={(e) => deleteNote(trackId, _id)}
                type="button"
                className="btn"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

NoteList.propTypes = {
  trackId: PropTypes.number.isRequired,
  note: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteNote })(NoteList);
