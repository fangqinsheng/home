import { BaseController } from '../../../lib/base/controller';
import router from '../../../lib/router';
import { Brackets } from 'typeorm';

/**
 * 系统-角色
 */
@router.prefix('/admin/sys/role', [ 'add', 'delete', 'update', 'info', 'list', 'page' ])
export default class SysRoleController extends BaseController {
    init() {
        this.setEntity(this.ctx.repo.sys.Role);
        this.setPageOption({
            keyWordLikeFields: [ 'name', 'label' ],
            where: new Brackets(qb => {
                qb.where('id !=:id', { id: 1 });
            }),
        });
        this.setService(this.service.sys.role);
    }
}
