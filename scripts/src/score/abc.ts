const abcjs: any = require('abcjs');
window.onload = function () {
    let tune = document.getElementById("tune") as HTMLDivElement;

    abcjs.renderAbc("paper",tune.innerText,{});
};
