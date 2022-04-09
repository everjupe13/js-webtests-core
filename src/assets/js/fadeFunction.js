const fadeIn = (element) => {

    let opacity = 0.1;
    element.style.display = 'block';
    let timer = setInterval(function () {

        if (opacity >= 1) {
            clearInterval(timer);
        }

        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.1;

    }, 10);

}

const fadeOut = (element) => {

    let opacity = 1;
    let timer = setInterval(function () {

        if (opacity <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }

        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.1;

    }, 10);

}
