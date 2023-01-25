function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
  
function clamp(v, minimum, maximum)
{
    if(v < minimum)
        return minimum;
    else if(v >= maximum)
        return maximum-1;
    else
        return v;
}


