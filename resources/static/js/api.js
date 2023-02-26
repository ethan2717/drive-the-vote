function email(){
    fetch("/email?full-name=" + document.getElementById("full-name").value + "&email-address=" + document.getElementById("email-address").value,
    {
        method: "POST",
    })
}

function chat() {
    fetch("/chat?input=" + document.getElementById("chat").value + "&key=" + document.getElementById("key").value,
    {
        method: "POST",
    }).then((response) => response.text())
    .then((text) => {
      document.getElementById("chat-responce").innerHTML = text;
    });
}