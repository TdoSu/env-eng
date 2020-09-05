function drawLine(context, start, end, color, width) {
    context.lineWidth = width
    context.strokeStyle = color
    context.setLineDash([10, 0])
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function drawDashLine(context, start, end, color, width, indent) {
    context.lineWidth = width
    context.strokeStyle = color
    context.setLineDash([10, 5])
    context.beginPath();
    if (start.x === end.x) {
        if (start.y < end.y) {
            start.y += indent
        } else {
            start.y -= indent
        }
    } else {
        if (start.x < end.x) {
            start.x += indent
        } else {
            start.x -= indent
        }
    }
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

class Pipe {
    constructor (context, options) {
        this.context = context
        // [ { x, y }, { x, y } ]
        const pointers = options.pointers
        this.lines = []
        for (let i = 0; i < pointers.length - 1; i++) {
            this.lines.push({ start: pointers[i], end: pointers[i+1] })
        }
        // status { code, color, isFlow }
        this.status = options.status
        this.indent = 0
    }
    draw () {
        this.lines.forEach(line => {
            const x1 = line.start.x
            const x2 = line.end.x
            const y1 = line.start.y
            const y2 = line.end.y
            if (this.status.isFlow) {
                drawDashLine(this.context, { x: x1, y: y1 }, { x: x2, y: y2 }, this.status.color, 2, this.indent)
            } else {
                drawLine(this.context, { x: x1, y: y1 }, { x: x2, y: y2 }, this.status.color, 2)
            }
        })
        this.indent < 15 ? this.indent++ : (this.indent = 0)
    }
}

