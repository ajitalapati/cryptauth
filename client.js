function get(){
    fetch("http://localhost:3000/btcaddr", 
    {headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(data => console.log(data));
}

function createAccount(addr, sig){
    var data = {"addr": addr, "sig": sig}
    fetch("http://localhost:3000/btcaddr",
    {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) });
}

function signIn(addr, sig){
    var data = {"addr": addr, "sig": sig}
    fetch("http://localhost:3000/btcaddr/login",
    {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => console.log(res))
    .catch(function(res){ console.log(res) });
    window.location.replace("http://www.w3schools.com");
}