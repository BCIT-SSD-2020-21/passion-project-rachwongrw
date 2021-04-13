import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import { getAudioFiles } from '../../network';
import { useParams } from 'react-router-dom';

export default function AudioPlayer({book}) {
  const [audioPaused, setAudioPause] = useState(true)
  const [tracks, setTracks] = useState([])
  const [i, setIndex] = useState(0)
  const classes = useStyles();
  const { bookId } = useParams();
  
  useEffect(() => {
    (async () => {
      const response = await getAudioFiles(bookId);
      console.log("get tracks", response.data.section)
      setTracks(response.data.section)
    })();
  },[bookId])

  const playAudio = (id) => {
    const audioEl = document.getElementById(id)
    audioEl.paused ? audioEl.play() : audioEl.pause()
    setAudioPause(!audioPaused)
  }

  const changeTrack = (dir) => {
    var newIndex = dir === "next" ? i + 1 : i - 1
    setIndex(newIndex)
    setAudioPause(true)
  }

  return (
    <Card className={classes.root}>
      { book && tracks.length > 0 &&
        <>
          <CardMedia
            className={classes.cover}
            image="https://m.media-amazon.com/images/I/611Eot7+zJL._SL500_.jpg"
            title={book.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                {tracks[i].title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Section {tracks[i].sectionNumber}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton aria-label="previous" onClick={() => changeTrack("prev")} disabled={i === 0 ? true: false}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton aria-label="play/pause" onClick={() => playAudio("audio")}>
                {
                  audioPaused ?  <PlayArrowIcon className={classes.playIcon} /> : <PauseIcon className={classes.playIcon} />
                }
                <audio id="audio" src={tracks[i].listenUrl}>
                </audio>
              </IconButton>
              <IconButton aria-label="next" onClick={() => changeTrack("next")} disabled={i === tracks.length -1 ? true: false}>
                 <SkipNextIcon />
              </IconButton>
            </div>
          </div>

        </>
      }
    </Card>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  },
  content: {
    flex: '1 0 auto',
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
  cover: {
    width: "25vw",
    height: "25vw",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      width: "70vw",
      height: "70vw",
    },
  },
}));
  