import { BaseService } from '../../lib/base/service';

/**
 * 权限控制服务类
 */
export default class SysPermsService extends BaseService {
    /**
     * 刷新权限
     * @param userId 用户ID
     */
    async refreshPerms (userId) {
        const roleIds = await this.service.sys.role.getByUser(userId);
        const perms = await this.ctx.service.sys.menu.getPerms(roleIds);
        await this.app.redisSet(`admin:perms:${ userId }`, JSON.stringify(perms), this.app.config.token.expires);
    }

    /**
     * 获得权限菜单
     * @param roleIds
     */
    async permmenu (roleIds) {
        const perms = await this.ctx.service.sys.menu.getPerms(roleIds);
        const menus = await this.ctx.service.sys.menu.getMenus(roleIds);
        return { perms, menus };
    }
}
