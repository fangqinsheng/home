import { BaseController } from '../../../lib/base/controller';
import router from '../../../lib/router';

/**
 * 系统-用户
 */
@router.prefix('/admin/sys/user', [ 'add', 'delete', 'update', 'info', 'list', 'page' ])
export default class SysUserController extends BaseController {
    init() {
        this.setEntity(this.ctx.repo.sys.User);
        this.setService(this.service.sys.user);
    }
}
