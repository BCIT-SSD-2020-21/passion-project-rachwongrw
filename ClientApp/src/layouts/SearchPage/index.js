import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { searchBooks } from '../../network';
import Book from '../../components/Book';
import { makeStyles } from '@material-ui/core';

export default function SearchPage() {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const classes = useStyles();
  const { searchTerm } = useParams();

  const cardClicked = async (data) => {
    history.push(`/${data.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await searchBooks(searchTerm);
      setBooks(response);
    })();
  }, [searchTerm]);

  return (
    <div className={classes.root}>
      {!books ? (
        <h1>No results found for '{searchTerm}'</h1>
      ) : (
        <>
          <div>
            <h1>Results for '{searchTerm}'</h1>
          </div>
          <div className={classes.root}>
            {books.map((book) => (
              <Book key={book.id} book={book} cardClicked={cardClicked} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
