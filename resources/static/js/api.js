function email(){
    fetch("/email?full-name=" + document.getElementById("full-name").value + "&email-address=" + document.getElementById("email-address").value,
    {
        method: "POST",
    })
}