function spin() {


    var x = 3000; //min value
    var y = 5000; // max value

    var deg = Math.floor(Math.random() * (x - y)) + y;

    document.getElementById('box').style.transform = "rotate(" + deg + "deg)";

    var element = document.getElementById('mainbox');

    element.classList.remove('animate');

    setTimeout(function() {
        element.classList.add('animate');
    }, 5000); //5000 = 5 second

}