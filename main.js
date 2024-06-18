//import { LEDElement } from '@wokwi/elements';

let editor;

// Monaco Editor setup
window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: "void setup() { \n" + 
        "// put your setup code here, to run once: \n" +  
        "} \n" +  
        "void loop() { \n" +  
        "// put your main code here, to run repeatedly:\n" +
        "}",
        language: 'cpp',
        minimap: { enabled: false }
    });
});


// Set up LEDs and Buttons
const leds = [];
const buttons = [];

document.querySelectorAll('wokwi-pushbutton').forEach((button, index) => {
    buttons.push(button);
});

document.querySelectorAll('wokwi-led').forEach((led, index) => {
    leds.push(led);
});
    


//Editor and Controls
const runButton = document.querySelector('#run-button');
runButton.addEventListener('click', compileAndRun);

const stopButton = document.querySelector('#stop-button');
stopButton.addEventListener('click', stopCode);
const statusLabel = document.querySelector('#status-label');
const compilerOutputText = document.querySelector('#compiler-output-text');

async function compileAndRun() 
{
    for (const led of leds) 
    {
        led.value = false;
    }

    runButton.setAttribute('disabled', '1');

    try 
    {
        statusLabel.textContent = 'Compiling...';
        var code = editor.getModel().getValue();

        //build code with a webservice
        response = await buildHex(code);
        console.log(response.hex);
        console.log("stdout:");
        console.log(response.stdout);
        
        
    }

    catch (err) 
    {
        runButton.removeAttribute('disabled');
        alert('Failed: ' + err);
    } 
    finally 
    {
        statusLabel.textContent = '';
    }

    
}

async function stopCode() {
    console.log("StopButton");
    leds[0].value = false;
}



const url = 'https://hexi.wokwi.com';

async function buildHex(source, files = []) {
  const resp = await fetch(url + '/build', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sketch: source, files })
  });

  return resp.json();
}