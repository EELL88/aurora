export async function onRequest(context) {
    const {
        request,       // 原始请求对象，包含客户端的请求信息
        env,           // Worker 环境变量，类似于服务器配置
        params,        // URL 路径参数，例如从文件名中解析而来的参数
        waitUntil,     // 用于延迟处理完成的 Promise，以确保在发送响应前完成
        next,          // 用于调用下一个中间件或获取资源
        data,          // 中间件之间传递数据的容器
    } = context;

    // 解析请求 URL
    const url = new URL(request.url);

    // 获取允许跨域访问的 Origin
    // const headers_Origin = request.headers.get("Access-Control-Allow-Origin") || "*";

    // 复制原始请求的 headers，并添加自定义 headers
    const myHeaders = new Headers(request.headers);
    // 删除原来的 Referer header
    // myHeaders.delete("Referer");
    // // 删除原来的 Origin header
    // myHeaders.delete("Origin");
    // // 添加新的 Origin header
    // myHeaders.append("Origin", env.API_URL);
    // // 添加新的 Referer header
    // myHeaders.append("Referer", env.API_URL);
    // 构建修改后的请求对象
    const modifiedRequest = new Request(env.API_URL + url.pathname + url.search, {
        method: request.method,
        headers: myHeaders,
        body: request.body,
    });

    // 发起修改后的请求并等待响应
    const response = await fetch(modifiedRequest);

    // 复制响应内容及其 headers 到新的响应对象
    const modifiedResponse = new Response(response.body, response);

    // 设置允许跨域访问的 Origin
    // modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
    // 添加 CORS 头部到新的响应
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    // modifiedResponse.headers.set('Access-Control-Allow-Credentials', 'true'); // 允许携带凭证
    // modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS'); // 指定允许的 HTTP 方法
    // modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // 删除一些不需要的响应 headers
    // modifiedResponse.headers.delete('x-proxied-host');
    // modifiedResponse.headers.delete('x-proxied-path');
    // modifiedResponse.headers.delete('x-proxied-id');
    // modifiedResponse.headers.delete('proxy-domain');
    // modifiedResponse.headers.delete('Link');

    return modifiedResponse; // 返回修改后的响应
}
