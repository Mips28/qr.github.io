const form = document.getElementById("form");
const qr = document.getElementById("qrcode");

const GeneratedBtn = e => {
  e.preventDefault();
  clearUI(qr);
  const text = document.getElementById("text").value;

  if (text === "") {
    alert("Please enter a text");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQr(text);
     
      setTimeout(() => {
        const saveURL = qr.querySelector("img").src;
        createSavebtn(saveURL, text);
        Share_Btn(saveURL)
      }, 50);
    }, 1000);
  }
};



const generateQr = text => {
  const qrcode = new QRCode("qrcode", {
    text: text,
    width: 200,
    height: 200
  });
};
const Share_Btn = (saveURL) =>{
    const output = document.getElementById("output")
    document.getElementById("share_btn").addEventListener('click',async ()=>{
    
      console.log(saveURL)
      if (!navigator.canShare) {
          output.textContent = `Your browser doesn't support the Web Share API.`
          return
        }
      
        if (navigator.canShare({ saveURL })) {
          try {
            await navigator.share({
              saveURL,
              title: 'Images',
              text: 'Beautiful images'
            })
            output.textContent = 'Shared!'
          } catch (error) {
            output.textContent = `Error: ${error.message}`
          }
        } else {
          output.textContent = `Your system doesn't support sharing these files.`
        }
    })
  }
const createSavebtn = (saveURL, text) => {
  var downloadLink = document.createElement("a");
  downloadLink.id = "download-link";
  downloadLink.classList = "qr-btn-2";
  downloadLink.href = saveURL;
  downloadLink.download = `${text} QRcode Image`;
  downloadLink.innerHTML = "Download";
  document.getElementById("qr-main-2").appendChild(downloadLink);
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = qr => {
  qr.innerHTML = "";
  const download_link = document.getElementById("download-link");

  if (download_link) {
    download_link.remove();
  }
};

hideSpinner();

form.addEventListener("submit", GeneratedBtn);



// Form
