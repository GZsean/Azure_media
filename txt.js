function detectBrowser() {
    var userAgent = window.navigator.userAgent,
        browserName,
        version;

    if (userAgent.match(/Chrome|Chromium/)) {
        browserName = "Google Chrome";
    } else if (userAgent.match(/Safari/) && !userAgent.match(/Chrome|Chromium/)) {
        browserName = "Safari";
    } else if (userAgent.match(/360SE/)) {
        browserName = "360 Browser";
    } else if (userAgent.match(/OPR/)) {
        browserName = "Opera";
    } else if (userAgent.match(/Firefox/)) {
        browserName = "Firefox";
    } else if (userAgent.match(/Edg/)) {
        browserName = "Microsoft Edge";
    } else if (userAgent.match(/Trident|MSIE/)) {
        browserName = "Internet Explorer";
    } else if (userAgent.match(/MicroMessenger/)) {
        browserName = "WeChat Browser";
    } else {
        browserName = "Unknown";
    }

    // 获取版本号
    if (browserName === "Safari") {
        version = userAgent.match(/Version\/([\d.]+)/);
    } else if (browserName === "Chrome") {
        version = userAgent.match(/(?:Chrome|Chromium)\/([\d.]+)/);
    } else if (browserName === "360 Browser") {
        version = userAgent.match(/(?:QIHU|360EE|360SE|360)\s?Browser\/([\d.]+)/);
    } else if (browserName === "Opera") {
        version = userAgent.match(/OPR\/([\d.]+)/);
    } else if (browserName === "Firefox") {
        version = userAgent.match(/Firefox\/([\d.]+)/);
    } else if (browserName === "Microsoft Edge") {
        version = userAgent.match(/Edg\/([\d.]+)/);
    } else if (browserName === "Internet Explorer") {
        version = userAgent.match(/(?:Trident|MSIE)\/([\d.]+)/);
    } else if (browserName === "WeChat Browser") {
        version = userAgent.match(/MicroMessenger\/([\d.]+)/);
    } else {
        version = "Unknown";
    }

    if (version && version.length > 1) {
        version = version[1];
    } else {
        version = "Unknown";
    }

    return {
        browser: browserName,
        version: version
    };
}

// 使用方法
var browserInfo = detectBrowser();
console.log("Browser:", browserInfo.browser);
console.log("Version:", browserInfo.version);
