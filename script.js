let originalFontSize = 1.5; // original font size in em
let currentFontSize = 1.5; // current font size in em

const twibbonContainer = document.getElementById('twibbon-preview');
const downloadButton = document.getElementById('download-button');

const usernameInput = document.getElementById('username');
const authorInput = document.getElementById('author');
const freespaceInput = document.getElementById('freespace');
const twInput = document.getElementById('tw');
const avatarInput = document.getElementById('avatar');

const fontSizeIncreaseButton = document.getElementById('increase-fontsize');
const fontSizeDecreaseButton = document.getElementById('decrease-fontsize');
const fontSizeResetButton = document.getElementById('reset-fontsize');

const tempContainer = document.createElement('div'); // create a temporary container element
const avatarImg = document.createElement('img');
avatarImg.crossOrigin = 'anonymous';

usernameInput.addEventListener('input', () => {
  const username = usernameInput.value;
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    usernameInput.setCustomValidity('Dilarang menggunakan emoji, spasi, dan simbol-simbol lainnya.');
    usernameInput.reportValidity();
    usernameInput.value = username.replace(/[^a-zA-Z0-9_]/g, '');
  } else {
    usernameInput.setCustomValidity('');
    updateTwibbon();
  }
});

authorInput.addEventListener('input', updateTwibbon);
freespaceInput.addEventListener('input', updateTwibbon);
twInput.addEventListener('input', updateTwibbon);
avatarInput.addEventListener('change', updateAvatar);

fontSizeIncreaseButton.addEventListener('click', increaseFontSize);
fontSizeDecreaseButton.addEventListener('click', decreaseFontSize);
fontSizeResetButton.addEventListener('click', resetFontSize);

downloadButton.addEventListener('click', downloadTwibbon);

// Call updateTwibbon once when the page is loaded
updateTwibbon();

function updateAvatar() {
  const avatar = avatarInput.files[0];
  avatarImg.src = URL.createObjectURL(avatar);
  updateTwibbon();
}

function updateTwibbon() {
  const username = usernameInput.value || 'N/A';
  const author = authorInput.value || 'N/A';
  const freespace = freespaceInput.value || 'N/A';
  const tw = twInput.value || 'N/A';

  const keywords = tw.split(',').map(keyword => keyword.trim());
  const twibbonHtml = `
        <div class="contbody">
            <div class="contcard">
                <div class="row">
                    <div class="column left">
                        <div class="avatar">${avatarImg.outerHTML}</div>
                        <div class="tabinfo">1 POST</div>
                        <div class="tabinfo">1 PTS</div>
                        <div class="tabinfo">MESSAGE</div>
                        <div class="tabinfo">ONLINE</div>
                    </div>
                    <div class="column right">
                        <div class="profileuser"><b>u/<strong>User</strong>/<strong><span style="color:white">${username}</span></strong></b></div>
                        <div class="profile-details">
                            <p>Joined on <strong>Jul 01 2006, 00.00 AM</strong></p> <p>Written by <strong>${author}</strong></p>
                        </div>
                        <hr class="new">
                        <div class="profilepost">
                            <x>What's in Your Mind?</x>
                            <div class="text-container"><p style="font-size: ${currentFontSize}em">${freespace}</p></div>
                            <i>PLEASE TAG:</i> <tw><mark>${tw}</mark></tw>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright"> 2024 <strong>FORUMTITLE</strong>, ALL RIGHTS RESERVED. SOLELY FOR ROLEPLAYING PURPOSE.</div>
        </div>
    `;

  tempContainer.innerHTML = twibbonHtml; // update the temporary container element
  twibbonContainer.innerHTML = ''; // clear the original container element
  twibbonContainer.appendChild(tempContainer.cloneNode(true)); // swap the temporary container element with the original one
}

function increaseFontSize() {
  currentFontSize += 0.1; // increase font size by 0.1em
  updateTwibbon();
}

function decreaseFontSize() {
  currentFontSize -= 0.1; // decrease font size by 0.1em
  updateTwibbon();
}

function resetFontSize() {
  currentFontSize = originalFontSize; // reset font size to original value
  updateTwibbon();
}

function downloadTwibbon() {
  const contbody = document.querySelector('.contbody');
  const username = document.getElementById('username').value;

  // Save the original width and height
  const originalWidth = contbody.offsetWidth;
  const originalHeight = contbody.offsetHeight;

  // Temporarily scale up the element to HD resolution
  contbody.style.width = '1540px';
  contbody.style.height = '1025px';

  // Wait for the element to resize
  setTimeout(() => {
    domtoimage.toPng(contbody, {
      width: 1540,
      height: 1025,
      style: {
        transform: 'scale(1)', // reset transform to avoid scaling issues
      },
    })
    .then(dataUrl => {
      const link = document.createElement('a');
      link.download = `VERIF24 - ${username}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      // Restore the original size
      contbody.style.width = `${originalWidth}px`;
      contbody.style.height = `${originalHeight}px`;
    });
  }, 100); // wait for 100ms to ensure the element has resized
}