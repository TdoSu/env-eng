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

