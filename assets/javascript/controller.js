function spin() {


    var x = 3000; //min value
    var y = 5000; // max value

    var deg = Math.floor(Math.random() * (x - y)) + y;

    document.getElementById('box').style.transform = "rotate(" + deg + "deg)";

    var element = document.getElementById('mainbox');

    element.classList.remove('animate');

    setTimeout(function() {
        element.classList.add('animate');

        var elements = document.getElementsByClassName('selection')
        var hit = document.getElementById('hit');

        var location = hit.getBoundingClientRect();

        var selection = null;

        var elements = document.elementsFromPoint(location.x, location.y);

        Array.prototype.forEach.call(elements, function(element) {
            if (element.tagName == "SPAN") {
                var html = element.children[0].innerHTML.replaceAll("&nbsp;", "");

                console.log(html);

                document.getElementById("winner").innerHTML = html;
                document.getElementById("winner").style.display = "inline-block";

                setTimeout(function() {

                    document.getElementById("winner").style.display = "none";

                }, 2000);
            }

        });

    }, 5000);

}