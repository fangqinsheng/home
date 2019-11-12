window.onload = function () {
    $("#browser").treeview();
    $(".prorelated .bd").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true
    });
    $(".promatch-list").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5
    });
    Magnify("magnify");
};
