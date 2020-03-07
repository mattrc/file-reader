document.getElementById('input').addEventListener('change', e => {
  const file = document.getElementById('input').files[0];
  if (file) {
    processFile(file);
  }
});

function processFile(file) {
  // we define fr as a new instance of FileReader
  const fr = new FileReader();

  // fr.readAsDataURL(file);
  // fr.readAsArrayBuffer(file);
  // fr.readAsBinaryString(file);
  fr.readAsText(file, 'utf8');

  // Handle progress, success, and errors
  // fr.onprogress = updateProgress;
  fr.onerror = errorHandler;
  fr.onabort = () => changeStatus('Start Loading');
  fr.onloadstart = () => changeStatus('Start Loading');
  fr.onload = () => changeStatus('Loaded');
  fr.onloadend = onloadend;
  // Here you can perform some operations on the data asynchronously
  fr.onprogress = onprogress;
}

// Updates the value of the progress bar
function onprogress(e) {
  // The target is the file reader
  const fr = e.target;
  const loadingPercentage = (100 * e.loaded) / e.total;
  document.getElementById('progress-bar').value = loadingPercentage;
}

function changeStatus(status) {
  document.getElementById('status').innerHTML = status;
}

function onloadend(e) {
  changeStatus('Load ended!');
  const fr = e.target;
  var result = fr.result;
  console.log('result:');
  console.log(result);
  // Here we can send the result to a server for example
}

function errorHandler(e) {
  changeStatus('Error: ' + e.target.error.name);
}
