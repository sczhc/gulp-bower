// window.onload = (e) => {
//     console.log(e);
// }

// 图片加载完成
// function imgLoad(ele) {
//     let img = [],
//         flag = 0,
//         mulitImg = ele;
//     let imgTotal = mulitImg.length;
//     for (let i = 0; i < imgTotal; i++) {
//         img[i] = new Image();
//         img[i].src = mulitImg[i].src;
//         let pic = img[i];
//         $(pic).on('load', () => {
//             $(this).remove();
//             flag++;
//             if (flag == imgTotal) {
//                 // do something
//             }
//         })
//     }
// }

// es6 类
class People {
    // 构造函数，初始化实例的地方
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    // 原型对象方法
    sayHello(habby) {
        console.log('你好世界，我是' + this.name + ',我的爱好是' + habby)
    }
}
console.log('===== es6 类 =====')
let peo = new People('jason', 20, '男')
peo.sayHello('打代码');
console.log('===== es6 类 =====')

// es6 继承
class Father {
    constructor() {
        this.money = 100000;
        this.car = '奔驰';
    }
    Init() {
        console.log('我是父亲，我有钱' + this.money + ',我有车' + this.car)
    }
}

class Son extends Father {
    constructor(score) {
        super();
        this.score = score;
    }
}

console.log('===== es6 继承 =====')
let son = new Son(90);
son.Init();
console.log('===== es6 继承 =====')

// 闭包
// let a = 100;
// function sum() {
//     a++;
//     console.log(a)
// }

function outer() {
    let a = 100;
    function inner() {
        a++;
        console.log(a);
    }
    return inner;
}

console.log('===== 闭包 =====')
// sum();
// sum();
// sum();

let inn = outer();
inn();
inn();
inn();
console.log('===== 闭包 =====')
