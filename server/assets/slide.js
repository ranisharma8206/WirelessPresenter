var slide_number = 5;
var slide_file_type ="png";
var current_slide = 1;


slide = document.getElementById('slide_img');

function get_slide_url()
{
    return  `slides/${current_slide}.${slide_file_type}`;
}

function next_slide()
{
    if(current_slide == slide_number)
    {

    }else{
        current_slide++;
        slide.src = get_slide_url();
    }
}
function prev_slide()
{
    if(current_slide != 1)
    {
        current_slide--;
        slide.src = get_slide_url();
    }
}

function sync_slide()
{
    current_slide = 1;
    slide.src = get_slide_url();
}

function start_trail()
{
    d = document.getElementsByClassName('trail');
    for(x in d)
    {
        x.classList.remove('trail-visibility-hidden');
    }
    
}
function stop_trail()
{
    d = document.getElementsByClassName("trail");
    for(x in d)
    {
        x.classList.add('trail-visibility-hidden');
    }
}
function start_darken()
{
    root.classList.add('dark_mouse');
}
function stop_darken()
{
    root.classList.remove('dark_mouse');
}
function presentImage()
{
    window.location.href = "https://wirelessproject.000webhostapp.com/abhi/upload/test.jpg";
}

/*
a  -> prev
d -> next 
s -> sync (start from 1);
t -> start trail
g -> stop trail
y -> start darken
h -> stop darken
n -> present image
*/
document.addEventListener("keypress", (event) => {
    if(event.key =='a')
    {
        prev_slide();
    }
    if(event.key == 'd')
    {
        next_slide();
    }
    if(event.key == 's')
    {
        sync_slide();
    }
    if(event.key == 't')
    {
        start_trail();
    }
    if(event.key == 'g')
    {
        stop_trail();
    }
    if(event.key == 'y')
    {
        start_darken();
    }
    if(event.key == 'h')
    {
        stop_darken();
    }
    if(event.key =='n')
    {
        presentImage();
    }
});


