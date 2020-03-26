// 防抖(在规定时间里只触发一次事件)
function debounce(func, wait) {
    let timeout;
    wait = wait || 1000;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait)
    }
}

window.onload = function () {
    let count = 0;
    let $debounce = document.getElementById('debounce');

    function getUserAction() {
        count++;
        $debounce.innerHTML = count;
    }

    $debounce.onmousemove = debounce(getUserAction)
}