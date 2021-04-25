const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const rFactor : number = 6.9  
const lineFactor : number = 6.9 
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#6200EA",
    "#00C853",
    "#795548"
]
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }
    
    static drawLineRotReflectBall(context : CanvasRenderingContext2D, scale : number) {
        const r : number = Math.min(w, h) / rFactor 
        const lineSize : number = Math.min(w, h) / lineFactor
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number =  ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const cx : number = w - r - (w - 2 * r - lineSize) * sf3 
        context.save()
        context.translate(lineSize, h / 2)
        context.rotate(-Math.PI * sf3)
        DrawingUtil.drawLine(context, 0, 0, 0, -lineSize * sf1)
        context.restore()
        DrawingUtil.drawCircle(context, cx, h / 2 + r, r)
    }

    static drawLRRBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawLineRotReflectBall(context, scale)
    }
}