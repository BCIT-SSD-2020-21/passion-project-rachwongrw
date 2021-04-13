import React, { useEffect, useState } from 'react';
import AudioPlayer from '../../components/AudioPlayer';
import BookDetail from '../../components/BookDetail';
import { getBookById } from '../../network';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const [book, setBook] = useState()
  const { bookId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getBookById(bookId);
      setBook(response.data)
    })();
  }, [bookId])

  return (
    <div>
      <AudioPlayer/>
      <BookDetail />
    </div>
  );
}
