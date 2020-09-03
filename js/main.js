// 只有三种东西
// 设备 Device: status -- status(可以拆成 statusList 和 currentStatus), position, width, height
// 管道 Pipe
// 标签 Label

// *** demo ***

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
        width: 220,
        height: 70,
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
    },
    {
        type: 'device',
        status: {
            code: 'close',
            imgList: [
                './img/fan-close.png',
            ],
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
        width: 220,
        height: 70,
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
    },
]

const __main = () => {
    const ee = new EnvEng('#id-container', data1)
    ee.run()
    // 模拟数据变化
    setTimeout(() => {
        ee.setData(data2)
    }, 3000)
}

__main()

