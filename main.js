
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



//Buttons and Controls
const runButton = document.querySelector('#run-button');
runButton.addEventListener('click', compileAndRun);

async function compileAndRun() {
    let code = editor.getModel().getValue();
    console.log(code);
}