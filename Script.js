window.addEventListener("DOMContentLoaded",function(){
    console.log("Ready");


    const form = document.getElementById("form");
    const FirstNameEl = document.getElementById("FirstName");
    const LastNameEl = document.getElementById("LastName");
    const ulEl = document.getElementById("elEl");
    const db = firebase.firestore();
    


    form.addEventListener("submit",function(event){
        event.preventDefault();

        if(FirstNameEl.value && LastNameEl.value){
            console.log("submit",FirstNameEl.value,LastNameEl.value);
            addUser(FirstNameEl.value, LastNameEl.value);
        }
    });

    function addUser(first, last){
        db.collection('Users').add({
            firstname : first,
            lastname : last,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        getUsers();
    }

    function getUsers(){
        db.collection("Users")
        .orderBy("timestamp")
        .get().
        then((querySnapshot)=>{
            let output = "";
            querySnapshot.forEach(doc=> {
                
                console.log('Doc id:,',doc.id);
                output += `<li>${doc.data().firstname}${doc.data().lastname}</li>`;
            });
            console.log("output",output);
            ulEl.innerHTML = output;
        });
    }
    getUsers();




    // db.collection("Users").orderBy("timestamp").onSnapshot(function(querySnapshot){
        

    // })
});