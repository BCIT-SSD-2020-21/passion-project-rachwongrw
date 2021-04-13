import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

export default function AudioPlayer({book}) {
  const [audioPaused, setAudioPause] = useState(false)
  const classes = useStyles();
  
  
  const playAudio = () => {
    const audioEl = document.getElementById("audio")
    audioEl.paused ? audioEl.play() : audioEl.pause()
    setAudioPause(!audioPaused)
  }

  return (
    <Card className={classes.root}>
      { book && 
        <>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {book.authors[0].firstName} {book.authors[0].lastName}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="previous" >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="play/pause" onClick={() => playAudio()}>
                {
                  audioPaused ? <PauseIcon className={classes.playIcon} /> : <PlayArrowIcon className={classes.playIcon} />
                }
                <audio id="audio" src="https://ia802506.us.archive.org/2/items/letters_brides_0709_librivox/letters_of_two_brides_01_debalzac.mp3">
                </audio>
              </IconButton>
              <IconButton aria-label="next">
                 <SkipNextIcon />
              </IconButton>
            </div>
            
          </div>
          <CardMedia
            className={classes.cover}
            image="https://m.media-amazon.com/images/I/611Eot7+zJL._SL500_.jpg"
            title={book.title}
          />
        </>
      }
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: "fit-content",
        display: "flex",
        margin: "0 auto",
        marginBottom: "1em",
        maxWidth: "80vw",
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));
  