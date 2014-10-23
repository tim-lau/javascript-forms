/*
    app.js
    application script for the JavaScript and Forms Demo
*/

"use strict";

/* onReady()
* Called when the DOM is loaded and ready for manipulation.
* We need to populate the class standing select based on the standings array
* and add an event listener for the form's submit event
* */
function onReady() {
    var standings = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Super Senior!'];
    
    var elem = document.getElementById("standing");
    for (var i = 0; i <  standings.length; i++) {
        var opt = document.createElement("option");
        opt.value = standings[i];
        var text = document.createTextNode(standings[i]);
        opt.appendChild(text);
        elem.appendChild(opt);
    }
    
    var ourform = document.getElementById("person-form");
    ourform.addEventListener('submit', onSubmit);
    //ourform.addEventListener for scope. this form, not just any form
} //onReady()

/* onSubmit()
 * Called when the user attempts to submit the form
 * The browser will pass an event object as the first parameter and we can use this object
 * to stop the form from being submitted if it is invalid.
 * Also the keyword 'this' will refer to the form that is being submitted while inside this function.
 * */
function onSubmit(evt) {
    var valid = validateForm(this);
    console.log("onSubmit Worked!!");
    //if the form is invalid and the event object has a method called preventDefault,
    //call it to stop the form from being submitted to the server
    //this method is now part of the standard, but it's new, so older browsers
    //will not expose this method on the event object
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    //some older browsers will look at the returnValue property of the event object
    //while other older browsers will pay attention to the value returned from
    //the event handler function itself
    //to catch both cases, we will set the returnValue property to our valid variable
    //AND return the valid variable's value from our function
    evt.returnValue = valid;
    return valid;
} //onSubmit()


/* validateForm()
* This function validates the form's information and returns true if the form is valid or false if the form is invalid.
* It will also let the user know which fields are invalid.
* parameters:
*   form    reference to the form that needs to be validated
* */
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'standing', 'age'];
    //if you wanted to require emails. you could add it to this array, and update the HTML class required-field 
    //to the notation

    requiredFields.forEach(validateRequiredField, form);

    //return true;
} //validateForm()

/* validateRequiredField()
* This function validates a field that is required. If the field does not have a value, or has only spaces,
* it will mark the field as invalid and return false. Otherwise it will return true.
* */
function validateRequiredField(field) {

    if (0 == this[field].value.trim().length) {
        this[field].className = 'invalid-field form-control';
        return false;
        // setting className to invalid-field but keep the bootstrap form-control in there
    } else {
        this[field].className = 'form-control';
        return true;
    }


} //validateRequiredField()

// when all content has been loaded, let's run onR
document.addEventListener('DOMContentLoaded', onReady);
