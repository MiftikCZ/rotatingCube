/**@type {HTMLCanvasElement} */
var _canv
/**@type {CanvasRenderingContext2D} */
var ctx
var cam = {
    x: 0,
    y: 0,
    zoom: 1
}

var game = "default"
let lastgame = null
let clicked = false


var createCanvas = function (w,h,style="",add="") {
    document.querySelector("body").innerHTML+=`
    <canvas width="${w}" height="${h}" id="_mmade_canv" style="${style}"></canvas>
    ${add}
    `
    _canv=document.getElementById("_mmade_canv")
    ctx=_canv.getContext("2d")
    return ctx
}
var setBackground = function (hexColor = "#424242") {
    ctx.fillStyle = hexColor
    ctx.fillRect(0, 0, _canv.width, _canv.height)
}
var setSize = function (w, h, fullscreen = false, scale = 1) {
    canv_w = w
    canv_h = h
    if (fullscreen) {
        _canv.height = window.innerHeight
        _canv.width = window.innerWidth
    } else {
        _canv.height = h
        _canv.width = w
    }
}
var setScene = function (new_scene) {
    game = new_scene
}





var rect = function (x, y, w, h, color = "#121213", fill = true, radius = 0, stroke=3 , raw = false, degree = 0) {
    if (!raw) {
        x -= cam.x
        y -= cam.y
        x *= cam.zoom
        y *= cam.zoom
        w *= cam.zoom
        h *= cam.zoom
    }
    ctx.fillStyle = color
    ctx.lineWidth = stroke
    if (fill) {
        ctx.beginPath()
        ctx.moveTo(x, y + radius)
        ctx.arcTo(x, y + h, x + radius, y + h, radius)
        ctx.arcTo(x + w, y - (degree / h * x) + h, x + w, y + h - radius, radius)
        ctx.arcTo(x + w, y - (degree / h * x), x + w - radius, y, radius)
        ctx.arcTo(x, y, x, y + radius, radius)
        ctx.fill();
    }
    else {
        ctx.beginPath()
        ctx.moveTo(x, y + radius)
        ctx.arcTo(x, y + h, x + radius, y + h, radius)
        ctx.arcTo(x + w, y + h, x + w, y + h - radius, radius)
        ctx.arcTo(x + w, y, x + w - radius, y, radius)
        ctx.arcTo(x, y, x, y + radius, radius)
        ctx.stroke()
    }
}
var render = function(body,color="#f44",fill=true,stroke=3,goback=true, cm=false, dstroke = false, dcolor="#000b") {
    
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = stroke
    ctx.beginPath()

    if(cm) {
        ctx.moveTo(body[0][0]+cm.x,body[0][1]+cm.x)
    } else ctx.moveTo(body[0][0],body[0][1])
    for(let i=0;i<body.length;i++) {
        let e2
        let e1 = body[i]
        try {
            e2=body[i+1]
        } catch (error) {
            
        }
        if(!e2 && goback) e2=body[0]
        if(!e2 && !goback) e2=body[i]
        if(cm) {
            e2[0]+=cm.x
            e2[1]+=cm.y
        } 
        ctx.lineTo(e2[0],e2[1])
    }
    if(fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }

    if(dstroke) {
        ctx.strokeStyle = dcolor
        ctx.beginPath()
    
        ctx.moveTo(body[0][0],body[0][1])
        for(let i=0;i<body.length;i++) {
            let e2
            let e1 = body[i]
            try {
                e2=body[i+1]
            } catch (error) {
                
            }
            if(!e2 && goback) e2=body[0]
            if(!e2 && !goback) e2=body[i]
            ctx.lineTo(e2[0],e2[1])
        }
        ctx.stroke();
        
    }
}












var secondsPassed;
var oldTimeStamp;
var fps;

function gameLoop(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    // Calculate fps
    fps = Math.round(1 / secondsPassed);


    if (game !== lastgame) {
        lastgame = game
        try {
            changedScene(game)
        } catch (error) {
            console.error("Error while executing 'changedScene' function -> " + error)
            console.log("Please, create changedScene() function or fix bugs in the function.")
            return
        }
    } else update(game,secondsPassed)
    objects.objects.forEach(obj => {
        render(obj.body,obj.color,obj.fill,obj.stroke)    
    })

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}


window.onload = () => {
    try {
        objects.objects = new Map()
        setup()
    } catch (error) {
        console.error("Error while executing 'setup' function -> " + error)
        console.log("Please, create setup() function or fix bugs in the function.")
        return
    }
    document.addEventListener("keypress", (e) => {
        try {
            keyPress(e.key, e)
        } catch (error) { }
    })
    document.addEventListener("keydown", (e) => {
        try {
            keyPressed(e.key, e)
        } catch (error) { }
    })
    document.addEventListener("keyup", (e) => {
        try {
            keyReleased(e.key, e)
        } catch (error) { }
    })
    document.addEventListener("mousedown", (e) => {
        try {
            mousePress(e.clientX, e.clientY, e)
        } catch (error) { }
    })
    document.addEventListener("mouseup", (e) => {
        try {
            mouseReleased(e.clientX, e.clientY, e)
        } catch (error) { }
    })
    document.addEventListener("mousemove", (e) => {
        try {
            mouseMove(e.clientX, e.clientY, e)
        } catch (error) { }
    })


    try {
        window.requestAnimationFrame(gameLoop)
    } catch (error) {
        console.error("Error while executing 'update' function -> " + error)
        console.log("Please, create update() function or fix bugs in the function.")
        return
    }
}

var objects = {
    objects: new Map(),

    new: function (id,body, color="#000", fill=1,stroke=3) {
        objects.objects.set(id, {
            body,
            color,
            fill,
            stroke
        })
    },
    get: function (id) {
        return {
            remove: function () {
                objects.objects.clear(id)
            },
            setBody: function (body) {
                objects.objects.get(id).body=body
            },
            setColor: function (color) {
                objects.objects.get(id).color=color
            },
            setStroke: function (stroke) {
                objects.objects.get(id).stroke=stroke
            }
        }
    }
}
