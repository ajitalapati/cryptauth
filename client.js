$(".success").hide();

function get(){
    fetch("http://localhost:3000/btcaddr", 
    {headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(data => console.log(data));
}

async function createAccount(addr, sig){
    var data = {"addr": addr, "sig": sig}
    var num;
    await fetch("http://localhost:3000/btcaddr",
    {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => num=res.status);
    if(num==201){
        $(".sign-in-form").hide();
        $(".successtxt").text("You have successfully created an account");
        $(".successimg").attr("src", "img/giphy.gif");
        $(".success").show();
    }
}

async function signIn(addr, sig){
    var input = {"addr": addr, "sig": sig}
    var num;
    await fetch("http://localhost:3000/btcaddr/login",
    {
        headers: {
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(input)
    })
    .then(res => num=res.status);
    if(num==200){
        console.log("success");

        $(".sign-in-form").hide();
        $(".successtxt").text("You have successfully signed in");
        $(".successimg").attr("src", "img/giphy.gif");
        $(".success").show();
    }
}