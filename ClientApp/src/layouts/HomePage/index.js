import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../../components/Book';
import { booksArray } from '../../data/fakeData'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
})

export default function HomePage() {
  // const [books, setBooks] = useState([booksArray]);
  const history = useHistory();
  const classes = useStyles();

  const cardClicked = async (data) => {
    console.log('Data', data.id)
    history.push(`/${data.id}`);
  };

  return (
    <div className={classes.root}>
      {booksArray.map((book) =>
        <Book book={book} cardClicked={cardClicked} />
      )}
    </div>
  );
}
