// babel
// https://tool.css-js.com/
// 压缩 -- 加密


;(function(global){

class Label {
    constructor (context, options) {
        this._context = context
        this.status = options.status
        this.position = options.position
        this.font = options.font
        this.style = options.style
    }
    draw () {
        const context = this._context
        context.font = this.font
        context.fillStyle = this.style
        context.fillText(this.status.text, this.position.x, this.position.y);
    }
}

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

class Device {
    constructor (context, options) {
        this._context = context
        this.status = options.status
        this.position = options.position
        this.width = options.width
        this.height = options.height
        this.images = this.status.imgList.map(src => {
            const img = new Image()
            img.src = src
            return img
        })
        this.lab = options.lab
        this.currentOpenImgIndex = 0
    }
    draw () {
        const context = this._context
        const img = this.images[this.currentOpenImgIndex % this.images.length]
        context.drawImage(img, this.position.x , this.position.y, this.width, this.height)
        if (this.lab) {
            if (this.lab.relativePosition === 'top') {
                this.lab.position = {
                    x: this.position.x + (this.width / 2) - 20,
                    y: this.position.y,
                }
            } else if (this.lab.relativePosition === 'bottom') {
                this.lab.position = {
                    x: this.position.x + (this.width / 2) - 20,
                    y: this.position.y + this.height + 20,
                }
            } else if (this.lab.relativePosition === 'top-right') {
                this.lab.position = {
                    x: this.position.x + this.width,
                    y: this.position.y,
                }
            } else {
                // 默认在下面
                this.lab.position = {
                    x: this.position.x + (this.width / 2) - 20,
                    y: this.position.y + this.height + 20,
                }
            }
            const lab = new Label(context, this.lab)
            lab.draw()
        }
        this.currentOpenImgIndex++
    }
}


class EnvEng {
    constructor (containerSelector, objectList) {
        this._type2Constructor = {
            'device': Device,
            'pipe': Pipe,
            'label': Label,
        }
        this._init(containerSelector, objectList)
    }
    _init (containerSelector, objectList) {
        this._createCanvas()
        this._setObjects(objectList)
        this._mount(containerSelector)
    }
    _setObjects (list) {
        const context = this._context
        this._objects = list
            .map(item => {
                const type = item.type
                const Constructor = this._type2Constructor[type]
                if (Constructor) {
                    return new Constructor(context, item)
                } else {
                    throw new Error('未知的设备类型', item.type)
                }
            })
    }
    _createCanvas () {
        const canvas = document.createElement('canvas')
        this._canvas = canvas
        this._context = canvas.getContext('2d')
        //
        this._timer = null;
        this._running = false;
    }
    _mount (containerSelector) {
        const canvas = this._canvas
        const container = document.querySelector(containerSelector)
        this._canvas.width = container.getClientRects()[0].width
        this._canvas.height = container.getClientRects()[0].height
        container.appendChild(canvas)
        this._runLoop()
    }
    _runLoop () {
        this._running && this._update()
        this._draw()
        this._timer = setTimeout(() => {
            this._runLoop()
        }, 1000/40)
    }
    _update () {
        // console.log('update')
        // 更新所有对象状态
        this._objects.forEach(o => {
            typeof o.update === 'function' && o.update()
        })
    }
    _draw () {
        // console.log('draw')
        const canvas = this._canvas
        const context = this._context
        context.clearRect(0, 0, canvas.width, canvas.height)
        // 1. 清空画布
        // 2. 绘制所有对象
        this._objects.forEach(o => {
            o.draw()
        })
    }
    setData (data) {
        this._setObjects(data)
    }
    run () {
        this.running = true;
    }
    stop () {
        this.running = false;
    }
    destroy () {
        this._canvas.remove()
        clearTimeout(this._timer)
    }
}

global.EnvEng = EnvEng;

})(window);
