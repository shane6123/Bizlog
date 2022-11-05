// document.getElementById("like").addEventListener("click", mylike);
function mylike(){
    document.getElementById("like").src="./images/like2.png"
    var x=document.getElementById("like")
    x.src="./images/like2.png"
    if (x.src==="./images/like1.png"){
        x.src="./images/like2.png"
    }
    if (x.src==="./images/like2.png"){
        x.src="./images/like1.png"
    } 
   
}
function dark(){
    var element = document.getElementsByClassName("dark");
    element.classList.toggle("light");
}