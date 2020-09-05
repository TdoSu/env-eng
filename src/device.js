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

