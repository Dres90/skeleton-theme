/**
 * Main JS entry point
 * Imports and initializes all component modules
 */

import SimpleVideoPlayer from './components/simple-video-player';

document.querySelectorAll('.simple-video-player').forEach((el) => {
  // eslint-disable-next-line no-new
  new SimpleVideoPlayer(el);
});
