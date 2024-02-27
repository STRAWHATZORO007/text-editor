// Get elements
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');
const textEditor = document.getElementById('textEditor');

// Function to apply formatting and update button state
function applyFormatting(command, button) {
    const isApplied = document.queryCommandState(command);
    if (!isApplied) {
        document.execCommand(command, false, null);
        button.classList.add('active');
        textEditor.focus();
    } else {
        document.execCommand(command, false, null);
        button.classList.remove('active');
        textEditor.focus();
    }
}

// Event listeners for buttons
boldBtn.addEventListener('click', () => {
    applyFormatting('bold', boldBtn);
});

italicBtn.addEventListener('click', () => {
    applyFormatting('italic', italicBtn);
});

underlineBtn.addEventListener('click', () => {
    applyFormatting('underline', underlineBtn);
});

openBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            textEditor.innerHTML = e.target.result;
        };
        reader.readAsText(file);
    });
    fileInput.click();
});

saveBtn.addEventListener('click', () => {
    const textToSave = textEditor.innerHTML;

    // Prompt the user for a file name
    const fileName = window.prompt('Enter a file name:', 'document.txt');

    if (fileName) {
        const blob = new Blob([textToSave], { type: 'text/plain' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;

        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});

// Set focus on the textEditor when the page loads
window.addEventListener('load', () => {
    textEditor.focus();
});