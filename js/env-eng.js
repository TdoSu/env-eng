// 绘制引擎
// 创建实例 const ee = new EnvEng([objectList])
// objectList -- 确定绘制哪些图元, 图元的位置, 图元的表示方式, 变化方式, 状态, 标识
// ee.mount('#id-container') -- 挂载到 dom 上
// ee.setData(data) -- 设置每个实体的状态 data 和 objectList 配套
// ee.run() -- 开始运行, 动态绘制
// ee.stop() -- 停止运行
// ee.destroy() -- 销毁实例

class EnvEng {
    constructor (containerSelector, objectList) {
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
                if (item.type === 'device') {
                    return new Device(context, item)
                } else if (item.type === 'pipe') {
                    return new Pipe(context, item)
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

