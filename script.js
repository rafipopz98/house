
const iframeURL = "https://koora.vip/share.php?ch=tnt2_1";

document.getElementById('video-frame').src = iframeURL;

const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
