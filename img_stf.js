function button(){
    console.clear()
    const imgs = [0, 1, 2, 3, 4, 5, 6];
    var indx = Math.round(Math.random()*6);
    var img = 'url("img'+imgs[indx]+'.jpeg")';

    console.log(indx);
    console.log(img);

    document.querySelector("div").style.backgroundImage = img;
}
button();