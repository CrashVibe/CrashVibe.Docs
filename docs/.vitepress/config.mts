import { defineConfig } from "vitepress";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import pkg from "../../package.json";
import { UnlazyImages } from "@nolebase/markdown-it-unlazy-img";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";

export default defineConfig({
  vue: {
    template: {
      transformAssetUrls: {
        NolebaseUnlazyImg: ["src"],
      },
    },
  },
  lang: "zh-CN",
  title: "CrashVibe Wiki",
  description: "感谢每一位玩家的到来💡",

  head: [
    ["link", { rel: "icon", href: "/server-icon.png" }],
    ["script", { async: "", src: "/m.js" }],
  ],
  ignoreDeadLinks: true,
  cleanUrls: true,
  sitemap: {
    hostname: "https://cvdocs.crashvibe.cn",
  },
  themeConfig: {
    // logo: { src: "/server-icon.png", width: 30, height: 38 },
    nav: [
      { text: "主页", link: "/" },
      { text: "百科", link: "/intro" },
      {
        text: "关于",
        items: [
          { text: "认识成员", link: "/about/team" },
          { text: "联系我们", link: "/about/contact" },
        ],
      },
    ],
    sidebar: [
      {
        text: "👋 服务器介绍",
        link: "/intro",
      },
      {
        text: "❓ 常见问题",
        link: "/issues",
      },
      {
        text: "入门",
        items: [
          { text: "🔦 一个正确的游戏名", link: "/入门/username" },
          { text: "🎓 我该如何进入服务器", link: "/入门/how2join" },
          { text: "🧳 注册与登录", link: "/入门/register-and-login" },
        ],
      },
      {
        text: "规则",
        items: [{ text: "📃 服务器规则", link: "/规则/server-rule" }],
      },
      {
        text: "教程",
        items: [
          { text: "💡 技巧", link: "/教程/技巧" },
          { text: "⚖️ 商店", link: "/教程/商店" },
          { text: "🔒 领地", link: "/教程/领地" },
          { text: "⛏️ 连锁", link: "/教程/连锁" },
          { text: "🛍️ 箱子", link: "/教程/箱子" },
          { text: "📅 签到", link: "/教程/签到" },
        ],
      },
      {
        text: "玩法",
        items: [
          { text: "🌾 资源", link: "/玩法/资源" },
          { text: "🏙️ 建筑", link: "/玩法/建筑" },
          { text: "🏢 大厅", link: "/玩法/大厅" },
          { text: "🐾 宠物", link: "/玩法/宠物" },
        ],
      },
      {
        text: "其他",
        items: [{ text: "🌍 地图", link: "/其他/地图" }],
      },
    ],
    editLink: {
      pattern:
        "https://github.com/CrashVibe/CrashVibe.Docs/edit/main/docs/:path",
      text: "在 Github 上编辑此页",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/CrashVibe/CrashVibe.Docs" },
    ],
    search: {
      provider: "local",
      options: {
        _render(src, env, md) {
          const html = md.render(src, env);
          if (env.frontmatter?.search === false) {
            return "";
          }
          return html;
        },
      },
    },
    externalLinkIcon: true, // 展示站外链接箭头 ↗
    // 下方是文档中文适配内容
    footer: {
      message: `基于 MPL 2.0 许可发布 | 文档版本 ${pkg.version}`,
      copyright: `版权所有 © 2024-${new Date().getFullYear()} CrashVibe服务器`,
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
  markdown: {
    config: (md) => {
      md.use(UnlazyImages(), {
        imgElementTag: "NolebaseUnlazyImg",
      });
      md.use(BiDirectionalLinks());
      md.use(InlineLinkPreviewElementTransform);
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
});
