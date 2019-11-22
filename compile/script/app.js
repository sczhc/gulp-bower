window.onload = function (e) {
    console.log(e);
    init();
}

function init() {
    let arr = 1;
    console.log(arr);
}

// 图片加载完成
function imgLoad(ele) {
    let img = [],
        flag = 0,
        mulitImg = ele;
    let imgTotal = mulitImg.length;
    for (let i = 0; i < imgTotal; i++) {
        img[i] = new Image();
        img[i].src = mulitImg[i].src;
        let pic = img[i];
        $(pic).on('load', () => {
            $(this).remove();
            flag++;
            if(flag == imgTotal) {
                // do something
            }
        })
    }
}