class SimpleVideoPlayer {
  constructor(el) {
    this.el = el;
    this.setupDefaults();
    this.addEventListeners();
    this.playingClass = 'simple-video-player--playing';
  }

  setupDefaults() {
    this.dom = {
      playToggleBtn: this.el.querySelector('.simple-video-player__toggle-btn'),
      video: this.el.querySelector('.simple-video-player__video'),
    };
  }

  addEventListeners() {
    this.dom.playToggleBtn.addEventListener('click', () => this.toggleVideo());
    this.dom.video.addEventListener('play', () => this.handleVideoPlay());
    this.dom.video.addEventListener('pause', () => this.handleVideoPause());
  }

  handleVideoPlay() {
    // add aria-label to play button
    this.dom.playToggleBtn.setAttribute('aria-label', 'Pause video');
    this.el.classList.add(this.playingClass);
  }

  handleVideoPause() {
    // add aria-label to play button
    this.dom.playToggleBtn.setAttribute('aria-label', 'Play video');
    this.el.classList.remove(this.playingClass);
  }

  playVideo() {
    this.dom.video.play();
  }

  pauseVideo() {
    this.dom.video.pause();
  }

  toggleVideo() {
    if (this.dom.video.paused) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }
}
export default SimpleVideoPlayer;
