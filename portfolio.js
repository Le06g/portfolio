function button(){
    console.clear()
    const fontes = ["Arial", "Comic Sans", "Impact", "Courier New"];
    var fonte = fontes[Math.round(Math.random()*4)];
    var red = Math.round(Math.random()*255);
    var green = Math.round(Math.random()*255);
    var blue = Math.round(Math.random()*255);
    var colorg = "rgb("+ red + ", " + green + ", " + blue + ")";


    console.log(fonte);
    console.log(colorg);

    document.querySelector("h3").style.color = colorg;
    document.querySelector("h3").style.fontFamily = fonte;
}
button();