/*
 *  引擎可以根据数据绘制三种类型的东西:
 *  1. 设备 Device (所有位置固定的图形)
 *  2. 管道 Pipe (设备之间的连线)
 *  3. 标签 Label (所有文字固定的文字)
 *
 *  每种东西主要需要提供:
 *  1. 类型标识 type: 'device', 'pipe', 'label'
 *  2. 状态 status: 设备 - 一组图片 imgList, 管道 - 颜色 color, 文字 - 内容文本 text
 *  3. 位置 position: x, y
 *  4. 设备支持提供标识 label, 可以使用相对位置, top, top-right, bottom
 *  5. label 支持设置文字大小, 字体, 颜色
 *  6. 管道需要设置一组节点 pointers [ { x, y } ]
 * 
 *  几个可以提升效果的点: 
 *  1. 图片的清晰度和细节
 *  2. 图片和其他图元的一致性
 *  3. 页面布局
 */

const data1 = [
    {
        type: 'device',
        status: {
            code: '',
            imgList: [
                './img/pool.png',
            ],
        },
        position: { x: 80, y: 15 },
        width: 260,
        height: 70,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '蓄水池',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom',
        },
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/pool2.png',
            ],
        },
        position: { x: 10, y: 70 },
        width: 70,
        height: 70,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '药剂池',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom',
        },
    },
    {
        type: 'pipe',
        status: {
            code: '',
            color: '#f00',
            isFlow: true,
        },
        pointers: [ { x: 20, y: 120 }, { x: 20, y: 10 }, { x: 100, y: 10 }, { x: 100, y: 34 } ],
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/fan-open0.png',
                './img/fan-open1.png',
                './img/fan-open2.png',
                './img/fan-open3.png',
                './img/fan-open4.png',
            ],
        },
        position: { x: 100, y: 50 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机1',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
    },
    {
        type: 'device',
        status: {
            code: 'close',
            imgList: [
                './img/fan-close.png',
            ],
        },
        position: { x: 180, y: 50 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机2',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
    },
    {
        type: 'device',
        status: {
            code: 'close',
            imgList: [
                './img/fan-close.png',
            ],
        },
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机3',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
        position: { x: 260, y: 50 },
        width: 30,
        height: 20,
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/pump-open.png',
            ],
        },
        position: { x: 50, y: 0 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '水泵1',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom'
        },
    },
    {
        type: 'label',
        status: {
            code: '',
            text: '环保设备工况示意图',
        },
        font: '16px serif',
        style: 'blue',
        position: { x: 180, y: 355 },
    },
]

const data2 = [
    {
        type: 'device',
        status: {
            code: '',
            imgList: [
                './img/pool.png',
            ],
        },
        position: { x: 80, y: 15 },
        width: 260,
        height: 70,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '蓄水池',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom'
        },
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/pool2.png',
            ],
        },
        position: { x: 10, y: 70 },
        width: 70,
        height: 70,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '药剂池',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom',
        },
    },
    {
        type: 'pipe',
        status: {
            code: '',
            color: '#f00',
        },
        pointers: [ { x: 20, y: 120 }, { x: 20, y: 10 }, { x: 100, y: 10 }, { x: 100, y: 34 } ],
    },
    {
        type: 'device',
        status: {
            code: 'close',
            imgList: [
                './img/fan-close.png',
            ],
        },
        position: { x: 100, y: 50 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机1',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/fan-open0.png',
                './img/fan-open1.png',
                './img/fan-open2.png',
                './img/fan-open3.png',
                './img/fan-open4.png',
            ],
        },
        position: { x: 180, y: 50 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机2',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/fan-open0.png',
                './img/fan-open1.png',
                './img/fan-open2.png',
                './img/fan-open3.png',
                './img/fan-open4.png',
            ],
        },
        position: { x: 260, y: 50 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '风机3',
            },
            font: '12px serif',
            style: '#000',
            relativePosition: 'top-right',
        },
    },
    {
        type: 'device',
        status: {
            code: 'open',
            imgList: [
                './img/pump-open.png',
            ],
        },
        position: { x: 50, y: 0 },
        width: 30,
        height: 20,
        lab: {
            type: 'label',
            status: {
                code: '',
                text: '水泵1',
            },
            font: '14px serif',
            style: '#555',
            relativePosition: 'bottom'
        },
    },
    {
        type: 'label',
        status: {
            code: '',
            text: '环保设备工况示意图',
        },
        font: '16px serif',
        style: 'blue',
        position: { x: 180, y: 355 },
    },
]

const switchDevice = element => {
    if (element.hasAttribute('close')) {
        element.removeAttribute('close', 0)
        element.setAttribute('open', 0)
        return true
    } else {
        element.removeAttribute('open', 0)
        element.setAttribute('close', 0)
        return false
    }
}

const __main = () => {
    const buttons = document.querySelector('#id-buttons')
    const currentData = data1
    let ee = null

    // 按钮事件
    buttons.addEventListener('click', (event) => {
        const button = event.target
        const device = button.dataset.device
        const isOpen = switchDevice(button)
        const fanStatusClose = {
            code: 'close',
            imgList: [
                './img/fan-close.png',
            ],
        }
        const fanStatusOpen = {
            code: 'open',
            imgList: [
                './img/fan-open0.png',
                './img/fan-open1.png',
                './img/fan-open2.png',
                './img/fan-open3.png',
                './img/fan-open4.png',
            ],
        }
        const pumpStatusClose = {
            code: 'close',
            imgList: [
                './img/pump-close.png',
            ],
        }
        const pumpStatusOpen = {
            code: 'open',
            imgList: [
                './img/pump-open.png',
            ],
        }
        if (device === 'engine') {
            if (isOpen) {
                // 获取一个引擎实例, 参数是: 外部容器, 初始数据
                ee = new EnvEng('#id-container', currentData)
            } else {
                ee && ee.destroy()
            }
        } else if (ee) {
            if (device === 'fan1') {
                currentData[3].status = isOpen ? fanStatusOpen : fanStatusClose
            } else if (device === 'fan2') {
                currentData[4].status = isOpen ? fanStatusOpen : fanStatusClose
            } else if (device === 'fan3') {
                currentData[5].status = isOpen ? fanStatusOpen : fanStatusClose
            } else if (device === 'pump') {
                currentData[6].status = isOpen ? pumpStatusOpen : pumpStatusClose
                currentData[2].status = isOpen ? {
                    code: '',
                    color: '#f00',
                    isFlow: true,
                } : {
                    code: '',
                    color: '#555',
                    isFlow: false,
                }
            }
            ee.setData(currentData)
        }
    })

    // 自动化模拟
    document.querySelector('#id-auto-button')
        .addEventListener('click', () => {
            const btns = document.querySelectorAll('button')
            setTimeout(() => {
                btns[2].click()
                setTimeout(() => {
                    btns[1].click()
                    btns[2].click()
                    btns[3].click()
                }, 3000)
            }, 3000)
        })

    // 水量
    document.querySelector('#id-input')
        .addEventListener('input', (event) => {
            currentData[0].lab = {
                type: 'label',
                status: {
                    code: '',
                    text: '蓄水池' + (event.target.value ? ` 水量: ${event.target.value}` : ''),
                },
                font: '14px serif',
                style: '#555',
                relativePosition: 'bottom',
            }
            ee.setData(currentData)
        })
}

__main()

