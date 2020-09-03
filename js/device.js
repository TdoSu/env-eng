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
        this.currentOpenImgIndex = 0
    }
    draw () {
        const context = this._context
        const img = this.images[this.currentOpenImgIndex % this.images.length]
        context.drawImage(img, this.position.x , this.position.y, this.width, this.height)
        this.currentOpenImgIndex++
    }
}

