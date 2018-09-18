const CFonts = require('cfonts');
 
CFonts.say('Hello|world!', {
    font: '3d',              // define the font face
    align: 'left',              // define text alignment
    colors: ['red', 'blue'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
});