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

const __main = () => {
    // 获取一个引擎实例, 参数是: 外部容器, 初始数据
    const ee = new EnvEng('#id-container', data1)
    // 模拟数据变化
    setTimeout(() => {
        // setData 可以设置新的数据状态
        ee.setData(data2)
        // destroy 可以销毁引擎
        // ee.destroy()
    }, 3000)
}

__main()

