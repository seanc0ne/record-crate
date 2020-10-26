import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks } from '../../actions/track';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = React.useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="search"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const DropDownTracks = ({ getTracks, track: { tracks, loading } }) => {
  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={CustomToggle}>Dropdown Button</Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
              {tracks.length > 0 ? (
                tracks.map((track, index) => (
                  <Dropdown.Item eventKey={index}>{track}</Dropdown.Item>
                ))
              ) : (
                <h4>No tracks found...</h4>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Fragment>
      )}
    </Fragment>
  );
};

DropDownTracks.propTypes = {
  getTracks: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  track: state.track,
});

export default connect(mapStateToProps, { getTracks })(DropDownTracks);
