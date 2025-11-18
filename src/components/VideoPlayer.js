import React from 'react';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ src, poster, title }) => {
  return (
    <div className={styles.videoWrapper}>
      <h3 className={styles.videoTitle}>{title}</h3>
      <video width="100%" controls className={styles.video} poster={poster}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
