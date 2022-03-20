console.log("Engine.js loaded");

window.addEventListener("load", function(event) {
    this.setTimeout(function() {
        console.log("Ready To Work");
        main();
    }, 1000)

});

function main() {
    console.log("Lets start!");



    var divs = [].slice.call(document.getElementsByTagName('div'));
    var divs_with_p = divs.filter(myDiv => {
        var my_div_children = [].slice.call(myDiv.children);
        return my_div_children.filter(elem => elem.tagName == 'P').length > 0;
    })

    var images = [].slice.call(document.getElementsByTagName('img'));

    var iframes = [].slice.call(document.getElementsByTagName('iframe'));

    var all_children = [].slice.call(document.getElementsByTagName('*'));

    //all images indexes by the document elemnts
    var images_indexes = [];
    images.forEach(myImage => {
        images_indexes.push(all_children.indexOf(myImage));
    });


    // get additional images from iframes
    iframes.forEach(myIframe => {
        var my_iframe_elemnts = [].slice.call(myIframe.contentWindow.document.querySelector('body').children);

        var my_iframe_images = my_iframe_elemnts.filter(elem => elem.tagName == 'IMG');
        if (my_iframe_images.length > 0) {
            images_indexes.push(all_children.indexOf(myIframe));
        }
        my_iframe_images.forEach(my_Image => images.push(my_Image));
    });


    console.log('divs_with_p.length: ' + divs_with_p.length);
    console.log('images.length: ' + images.length);




    images_indexes = images_indexes.sort();


    //an array of all inserted images
    var inserted_images = [];


    var image_array_index = 0;
    // current index of image in document
    image_current_index = images_indexes[image_array_index];
    for (var i = 0; i <= divs_with_p.length - 1; i++) {

        div_with_p = divs_with_p[i];
        next_div_with_p = divs_with_p[i + 1];

        div_with_p_index = all_children.indexOf(div_with_p);
        next_div_with_p_index = all_children.indexOf(next_div_with_p);

        //update current index of image to check between elements
        if (image_current_index < div_with_p_index) {
            while (image_current_index < div_with_p_index && image_array_index < images.length) {
                image_array_index++;
                image_current_index = images_indexes[image_array_index];

            }
        }




        if (next_div_with_p_index < image_current_index) {


            var my_new_image = document.createElement('IMG');
            my_new_image.setAttribute('src', 'https://placekitten.com/g/300/250');
            my_new_image.style.display = "table";
            my_new_image.style.margin = " 0 auto";
            div_with_p.parentNode.insertBefore(my_new_image, div_with_p.nextSibling);
            inserted_images.push(my_new_image);
        }
    }


    //check scrolling events
    document.addEventListener('scroll', function(event) {
        inserted_images.forEach(myScrolledImage => {

            if ((myScrolledImage.offsetTop < (window.pageYOffset + window.innerHeight)) &&
                (myScrolledImage.offsetTop + myScrolledImage.height) > window.pageYOffset) {
                console.log('Image is in view');
            }
        })

    });



}