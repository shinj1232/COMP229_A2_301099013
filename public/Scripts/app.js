//Hyunjune Shin 301099013 2020-10-20
//App java script page

// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("app started...");
        
        //when the user ever tries to delete the contact-list if gives the user a warning
        let deleteButtons = document.querySelectorAll('.btn-danger')
        for (button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
        
        //contact page if the user is submitting 
        if(document.title == "Contact"){
            let sendButton = document.getElementById("submitbutton");
            let cancelButton = document.getElementById("cancel");
            let form = document.forms[0];

            sendButton.addEventListener("click", (event) =>{
                event.preventDefault();

                let firstName = document.getElementById("f_name");
                let lastName = document.getElementById("l_name");
                let contactNumber = document.getElementById("phone");
                let emailAddress = document.getElementById("email");
                let message = document.getElementById("message");

                console.info(`First NAME: ${f_name} 
                Last Name: ${l_name}
                Contact Number: ${contactNumber}
                Email Address: ${emailAddress}
                Message : ${message}`);
                form.reset();

            });
            //from contact page if the user clicks the cancel button
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                if(confirm("are you sure?"))
                {
                    location.href = "/home";
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();