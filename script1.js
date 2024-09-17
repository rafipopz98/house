
const iframeURL = "https://koora.vip/share.php?ch=tnt1_1";

document.getElementById('video-frame').src = iframeURL;

const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable F12 (DevTools), Ctrl+Shift+I (DevTools), and Ctrl+U (View Source)
document.addEventListener('keydown', function (e) {
    // Check if the key is F12 or if Ctrl key is pressed with I, U, or J (common DevTools keys)
    if (e.key === 'F12' ||
        (e.ctrlKey && (e.key === 'I' || e.key === 'U' || e.key === 'J')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return false;
    }
});
