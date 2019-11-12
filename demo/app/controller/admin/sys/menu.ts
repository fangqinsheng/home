import { BaseController } from '../../../lib/base/controller';
import router from '../../../lib/router';

/**
 * 系统-菜单
 */
@router.prefix('/admin/sys/menu', [ 'add', 'delete', 'update', 'info', 'list' ])
export default class SysMenuController extends BaseController {
    init() {
        this.setEntity(this.ctx.repo.sys.Menu);
        this.setService(this.service.sys.menu);
    }
}
