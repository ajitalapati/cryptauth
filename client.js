fetch("http://localhost:3000/btcaddr", 
{headers: {'Content-Type': 'application/json'}})
.then(res => res.json())
.then(data => console.log(data));

var data = {"addr": "13Js7D3q4KvfSqgKN8LpNq57gcahrVc5JZ", "sig": "H+/grsJ9K2XtbWAwAwpkypVpuRP++Grm4H+mycTUBcBbJ77CVEsU54rdSFJoJMngh0NtqDEF4tnojMd/aRH6F18="}


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

