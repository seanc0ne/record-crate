import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';
// import Auth from '../utils/auth';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { GET_ME_RECORDS } from '../utils/queries';
// import { REMOVE_RECORD } from '../utils/mutations';
const Library = () => {
  const { loading, data } = useQuery(GET_ME_RECORDS);
  const userData = data?.me || {};
  const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
  const handleDeleteRecord = async (recordId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeRecord({
        variables: { recordId },
      });
      if (error) {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing record crate!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedRecords.length
            ? `Viewing ${userData.savedRecords.length} saved ${
                userData.savedRecords.length === 1 ? 'record' : 'records'
              }:`
            : 'You have no saved records!'}
        </h2>
        <CardColumns>
          {userData.savedRecords?.map((record) => {
            return (
              <Card key={record.recordId} border="dark">
                {record.image ? (
                  <Card.Img
                    src={record.image}
                    alt={`The cover for ${record.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{record.title}</Card.Title>
                  <p className="small">Artist: {record.artist}</p>
                  <Card.Text>{record.description}</Card.Text>
                  <p className="small">
                    {/* <a
                      href={record.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      alt="link to discogs"
                    >
                      See more on Discogs ...
                    </a> */}
                  </p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteRecord(record.recordId)}
                  >
                    Delete this record!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default Library;