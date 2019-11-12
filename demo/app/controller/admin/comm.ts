import { BaseController } from '../../lib/base/controller';
import router from '../../lib/router';

/**
 * 后台通用控制器
 */
@router.prefix('/admin/comm')
export default class AdminCommController extends BaseController {
    /**
     * 登录
     */
    @router.post('/login')
    public async login () {
        this.res({ data: await this.service.sys.login.login(this.ctx.request.body) });
    }

    /**
     * 退出登录
     */
    @router.post('/logout')
    public async logout () {
        this.res();
    }

    /**
     * 文件上传
     */
    @router.post('/upload')
    public async upload () {
        const { isRich } = this.ctx.query;
        const result = await this.ctx.service.comm.file.upload();
        if (isRich) {
            this.ctx.body = { url: result.url };
        }
        this.res({ data: result.url });
    }

    /**
     * 获取图片验证码 SVG
     */
    @router.get('/captcha')
    public async captcha () {
        this.res({ data: await this.ctx.service.comm.verify.captcha(this.ctx.query) });
    }

    /**
     * 获得个人信息
     */
    @router.get('/person')
    public async person () {
        this.res({ data: await this.service.sys.user.person() });
    }

    /**
     * 修改个人信息
     */
    @router.post('/person-update')
    public async personUpdate () {
        this.res({ data: await this.service.sys.user.personUpdate(this.ctx.request.body) });
    }

    /**
     * 权限菜单
     */
    @router.get('/permmenu')
    public async permmenu () {
        this.res({ data: await this.service.sys.perms.permmenu(this.ctx.decoded.roleIds) });
    }
}
