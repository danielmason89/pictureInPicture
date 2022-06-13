const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt the user to select media stream, pass video element , then play the video

async function getMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    // Handle error
    console.log("Whoops, error here:", error);
  }}

  button.addEventListener('click', async () => {
    // Disable the button so the user can't click it twice
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Re-enable the button
    button.disabled = false;

  });

  // on Load
  getMediaStream();