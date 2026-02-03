(function(){
    'use strict';
    console.log('reading js');

    /* DISPLAY 
ok i have to: 
- make display change to none when button is pressed to submit
- make display to change to none when redo button is pressed 
- collect words
- put onto plaque */

const submitSection = document.querySelector('#madLibSubmit');
const outputSection = document.querySelector('#madLibOutput');
const submitAgain = document.querySelector('#submitAgain');
const artistName = document.querySelector('#artName');
const artTitle = document.querySelector('#outputTitle');
const plaqueText = document.querySelector('#plaqueText');
const myForm = document.querySelector('#madlibsForm');

    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        const name = document.querySelector('#name').value;
        const title = document.querySelector('#title').value;
        const adj = document.querySelector('#adjective').value;
        const color = document.querySelector('#color').value;
        const mat = document.querySelector('#material').value;
        const verb = document.querySelector('#verb').value;
        const e1 = document.querySelector('#emotion1').value;
        const e2 = document.querySelector('#emotion2').value;
        const noun = document.querySelector('#noun').value;

        let myText1;
        let myText2;
        let myText3;
            if( name == ''){
                alert('Please provide your name');
                document.querySelector('#name').focus();
            }else  if( title == ''){
                alert("Please provide a title");
                document.querySelector('#title').focus();
            }else if( adj == ''){
                alert("Please provide an adjective");
                document.querySelector('#adjective').focus();
            }else if( color == ''){
                alert("Please provide a color");
                document.querySelector('#color').focus();
            }else if( mat == ''){
                alert("Please provide a material");
                document.querySelector('#material').focus();
            }else if( verb == ''){
                alert("Please provide a verb");
                document.querySelector('#verb').focus();
            }else if( e1 == ''){
                alert("Please provide an emotion");
                document.querySelector('#emotion1').focus();
            }else if( e2 == ''){
                alert("Please provide an emotion");
                document.querySelector('#emotion2').focus();
            }else if( noun == ''){
                alert ("Please provide a noun");
                document.querySelector('#noun').focus();
            }else{
                myText1 = `This ${adj} work features extensive use of ${color} and ${mat}, arranged in a manner that ${verb} traditional expectations of form.`;
                myText2 = `The piece evokes feelings of ${e1} while engaging critically with themes of ${e2}.`;
                myText3 = `Often categorized within the ${noun} movement, the work resists singular interpretation.`;
                submitSection.className = 'hidden';
                outputSection.className = 'showing';
            }
    
            artistName.innerHTML = name;
            artTitle.innerHTML = title;
            plaqueText.innerHTML = `<p>${myText1}</p><p>${myText2}</p><p>${myText3}</p>`
    })

    submitAgain.addEventListener('click', function(){
        submitSection.className = 'showing';
        outputSection.className = 'hidden';
        document.querySelector('#name').value='';
        document.querySelector('#title').value='';
        document.querySelector('#adjective').value='';
        document.querySelector('#color').value='';
        document.querySelector('#material').value='';
        document.querySelector('#verb').value='';
        document.querySelector('#emotion1').value='';
        document.querySelector('#emotion2').value='';
        document.querySelector('#noun').value='';
    })

/* ok so i have the vairables if one is empty i need to alert to provide a something , else, populate the plaquetext */
})();

