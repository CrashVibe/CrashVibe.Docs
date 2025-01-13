// 默哀模式
const anniversaries = {
    4.4: "清明节",
    5.12: "汶川大地震纪念日",
    7.7: "中国人民抗日战争纪念日",
    9.18: "九·一八事变纪念日",
    12.13: "南京大屠杀死难者国家公祭日",
};

function checkDays() {
    const myDate = new Date();
    const mon = myDate.getMonth() + 1;
    const date = myDate.getDate();
    const key = `${mon}.${date}`;
    if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
        console.log(`今天是${anniversaries[key]}`);
        const gray = document.createElement("style");
        gray.innerHTML = "html{filter: grayscale(100%)}";
        document.head.appendChild(gray);
    }
}

setTimeout(checkDays(), 0);

var HoldLog = console.log;
console.log = function () { };
queueMicrotask(() => {
    const Log = function () {
        HoldLog.apply(console, arguments);
    };
    const ascll = [
        `系统`,
        `调用前置摄像头拍照成功，识别为【小笨蛋】.`,
        `Photo captured: `,
        `🤪`,
    ];
    setTimeout(
        Log.bind(
            console,
            `%c ${ascll[0]} %c ${ascll[1]} %c \n${ascll[2]} %c\n${ascll[3]}\n`,
            "color:white;background-color:#4fd953",
            "",
            "",
            "font-size:450%"
        ),
        200
    );

    setTimeout(
        Log.bind(
            console,
            "%c WELCOME %c 你好，小笨蛋",
            "color:white;background-color:#4f90d9",
            ""
        ),
        250
    );

    setTimeout(
        Log.bind(
            console,
            "%c ⚡ Powered by CrashVibe %c 你正在访问 CrashVibe 服务器的内容",
            "color:white;background-color:#f0ad4e",
            ""
        ),
        300
    );

    setTimeout(
        Log.bind(
            console,
            "%c Cv-3 %c 你已打开控制台，因为你看到了我了（",
            "color:white;background-color:#4f90d9",
            ""
        ),
        350
    );


});