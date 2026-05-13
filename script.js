const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const button = document.getElementById("snap");
const downloadButton = document.getElementById("download");
const countdown = document.getElementById("countdown");

const ctx = canvas.getContext("2d");

let photos = [];

navigator.mediaDevices.getUserMedia({
  video: true
})
.then(stream => {

  video.srcObject = stream;

});

button.addEventListener("click", async () => {

  photos = [];

  for(let i = 0; i < 6; i++) {

    countdown.innerText = "3";
    await wait(1000);

    countdown.innerText = "2";
    await wait(1000);

    countdown.innerText = "1";
    await wait(1000);

    countdown.innerText = "📸";
    await wait(500);

    countdown.innerText = "";

    const photo = document.createElement("canvas");

    photo.width = video.videoWidth;
    photo.height = video.videoHeight;

    const photoCtx = photo.getContext("2d");

    photoCtx.drawImage(video, 0, 0);

    photos.push(photo);

  }

  canvas.width = 500;
  canvas.height = 700;

  ctx.fillStyle = "#5a0606";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 20;
  let y = 20;

  for(let i = 0; i < photos.length; i++) {

    ctx.drawImage(photos[i], x, y, 200, 120);

    if(x === 20) {
      x = 260;
    } else {
      x = 20;
      y += 140;
    }

  }

});

function wait(ms) {

  return new Promise(resolve => {

    setTimeout(resolve, ms);

  });

}

downloadButton.addEventListener("click", () => {

  const link = document.createElement("a");

  link.download = "cabine.png";

  link.href = canvas.toDataURL("image/png");

  link.click();

});