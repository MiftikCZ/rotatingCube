let mousePos = [0,0]
let deltaAll = 0
function setup() {
    createCanvas(1200, 600,"border-bottom:#f003 3px solid;margin-bottom:20px")    
}   
function mouseMove(x,y) {

    mousePos=[x,y]
    
}


function cos(a) {
    return Math.cos(a) 
}

function sin(a) {
    return Math.sin(a) 
}

function changedScene() { }

function rot(a,x,y,p) {
    x-=p.x
    y-=p.y
    return [rotX(a, x,y), rotY(a, x,y)]
}

function rotX(e,x,y) {
    return x*cos(e) - y*sin(e)
}

function rotY(e,x,y) {
    return x*sin(e) + y*cos(e)
}

function rct(x1,y1,d,color,stroke,add) {
    render([
        0, 0,
        0, d,
        d, d,
        0, d,
    ],color,true,stroke,true)
}

function update(game, delta) {
    deltaAll+=delta
    setBackground("#080808")
    let a = deltaAll
    let s = {
        w: 100,
        h: 100
    }
    let b = 0
    let p = {
        x: 50-(Math.cos(deltaAll)*b),
        y: 50-(Math.cos(deltaAll)*b)
    }
    let add = {
        x: 150,
        y: 150
    }
    /*
X = x*cos(θ) - y*sin(θ)
Y = x*sin(θ) + y*cos(θ)
    */
    render([
        rot(a, 0, 0,p),
        rot(a, s.w, 0,p),
        rot(a, s.w, s.w,p),
        rot(a, 0, s.w,p)
    ],"#000",false,6,true,add)

    let color1 = "#2424fe"
    let color2 = "#2424be20"
    let c3 = "#000"







    //   REALL


    render([
        rot(a, 0, 0,p),
        [s.w,0],
        [s.w,s.h]

    ],"hsla(0,50%,50%,50%)",true,3,true,add)

    render([
        [s.w,s.h],
        rot(a, 0, 0,p),
        [0,0]
    ],"hsla(120,50%,50%,50%)",true,3,true,add)

    render([
        [s.w, 0],
        rot(a, 0, 0,p),
        [0,0]
    ],"hsla(240,50%,20%,50%)",true,3,true,add)




    render([
        rot(a, 0, 0,p),
        [s.w,0],
        [s.w,s.h]

    ],"#000",false,3,true,add)

    render([
        [s.w,s.h],
        rot(a, 0, 0,p),
        [0,0]
    ],"#000",false,3,true,add)

    render([
        [s.w, 0],
        rot(a, 0, 0,p),
        [0,0]
    ],"#000",false,3,true,add)



    // / REALL


}
