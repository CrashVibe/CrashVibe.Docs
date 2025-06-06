let mainCursor;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle ? window.getComputedStyle(el)[attr] : el.currentStyle[attr];
    } catch (e) {
        console.error(e);
    }
    return false;
};

const cursorInit = () => {
    mainCursor = new Cursor();
    return mainCursor;
};

class Cursor {
    constructor() {
        this.pos = {
            curr: null,
            prev: null,
        };
        this.pt = [];
        this.create();
        this.init();
        this.render();
        this.checkthemmode();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("xs-hidden");
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName("*");
        for (let i = 0; i < el.length; i++) {
            if (getStyle(el[i], "cursor") == "pointer") {
                this.pt.push(el[i].outerHTML);
            }
        }

        // Create style element only once
        if (!this.scr) {
            this.scr = document.createElement("style");
            document.body.appendChild(this.scr);
        }

        // Cache initial cursor fill color
        this.cursorFill = 'black';
    }

    refresh() {
        // No need to recreate style element, just update classes
        this.cursor.classList.remove("active");
        this.pos = {
            curr: null,
            prev: null,
        };
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        // Register event handlers only once
        this.cursorFill = null
        document.onmousemove = (e) => {
            this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
            this.pos.curr = {
                x: e.clientX - 8,
                y: e.clientY - 8,
            };
            this.cursor.classList.remove("hidden");
        };
        document.onmouseenter = () => this.cursor.classList.remove("hidden");
        document.onmouseleave = () => this.cursor.classList.add("hidden");
        document.onmousedown = () => this.cursor.classList.add("active");
        document.onmouseup = () => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        this.checkthemmode();
        requestAnimationFrame(() => this.render());
    }

    checkthemmode() {
        const preference = localStorage.getItem('vitepress-theme-appearance') || 'auto';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDarkMode = !preference || preference === 'auto' ? prefersDark : preference === 'dark';
        const cursorFill = isDarkMode ? 'white' : 'black';

        // Only update cursor fill color if it has changed
        if (this.cursorFill !== cursorFill) {
            this.cursorFill = cursorFill;
            this.cursor.classList.toggle('dark', isDarkMode);
            this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='${cursorFill}' /></svg>") 4 4, auto !important}`;
        }
    }
}

/* 手机版不再显示自定义指针图标 */
function checkDesktop() {
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    const isTablet = /iPad/i.test(navigator.userAgent)
    return !isMobile && !isTablet;
}

let isDesktop = checkDesktop()

if (isDesktop) {
    cursorInit() // 初始化
}
