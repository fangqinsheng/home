import { BaseService } from '../../lib/base/service';
import * as _ from 'lodash';

/**
 * 角色服务类
 */
export default class SysRoleService extends BaseService {
    /**
     * 根据用户ID获得角色信息
     * @param userId
     */
    async getByUser (userId) {
        const userRole = await this.nativeQuery('select a.roleId from sys_user_role a where a.userId = ? ', [ userId ]);
        if (!_.isEmpty(userRole)) {
            return userRole.map(e => {
                return e.roleId;
            });
        }
        return [];
    }

    /**
     * 更新角色
     * @param param
     */
    async update (param) {
        await this.ctx.repo.sys.Role.save(param);
        await this.updatePerms(param.id, param.menuIdList);
    }

    /**
     * 更新权限
     * @param roleId
     * @param menuIdList
     */
    async updatePerms (roleId, menuIdList?) {
        await this.ctx.repo.sys.Role_menu.delete({ roleId });
        for (const e of menuIdList) {
            await this.ctx.repo.sys.Role_menu.save({ roleId, menuId: e });
        }
        const userRoles = await this.ctx.repo.sys.User_role.find({ roleId });
        for (const userRole of userRoles) {
            await this.service.sys.perms.refreshPerms(userRole.userId);
        }
    }

    /**
     * 角色信息
     * @param id
     */
    async info (id) {
        const info = await this.getRepo().sys.Role.findOne({ id });
        if (info) {
            const menus = await this.getRepo().sys.Role_menu.find(id !== 1 ? { roleId: id } : {});
            const menuIdList = menus.map(e => {
                return parseInt(e.menuId + '');
            });
            return {
                ...info,
                menuIdList,
            };
        }
        return {};
    }
}
