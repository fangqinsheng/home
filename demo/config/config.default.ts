import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.keys = appInfo.name + '_1566960005072_482';

    // 中间件
    config.middleware = [ 'authority', 'logs', 'exception' ];

    config.jwt = {
        secret: 'JKFBBBAIKUH',
    };

    config.security = {
        csrf: {
            enable: false,
        },
    };

    const whitelist = [
        // images
        '.jpg', '.jpeg', // image/jpeg
        '.png', // image/png, image/x-png
        '.gif', // image/gif
        '.bmp', // image/bmp
        '.wbmp', // image/vnd.wap.wbmp
        '.webp',
        '.tif',
        '.psd',
        // text
        '.svg',
        '.js', '.jsx',
        '.json',
        '.css', '.less',
        '.html', '.htm',
        '.xml',
        // tar
        '.zip',
        '.gz', '.tgz', '.gzip',
        // video
        '.mp3',
        '.mp4',
        '.avi',
        '.xlsx',
        '.xls',
    ];

    config.multipart = {
        fileSize: '100mb',
        mode: 'file',
        whitelist,
    };

    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '',
            db: 0,
        },
    };

    config.oss = {
        client: {
            accessKeyId: 'LTAI4FcsYCFWCkyENGJaSpAs',
            accessKeySecret: 'XODTKP9ii9S8aujd2BKc3PXJObbSKK',
            bucket: 'cool-admin-test',
            endpoint: 'oss-cn-shenzhen.aliyuncs.com',
            timeout: '3600s',
        },
    };

    // 新增特殊的业务配置
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${ appInfo.name }`,
        token: {
            expires: 24 * 3600 * 7, // token 过期时间
        },
        SSO: false, // 单点登录
    };

    return {
        ...config,
        ...bizConfig,
    };
};
