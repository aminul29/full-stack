// example 10
document.getElementById("toggleHighlight").addEventListener('click', function(){
    let descriptionText = document.getElementById("descriptionText");
    descriptionText.classList.toggle("bg-yellow-500");
})