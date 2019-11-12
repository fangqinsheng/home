import { BaseController } from '../../../lib/base/controller';
import router from '../../../lib/router';

/**
 * 系统-日志
 */
@router.prefix('/admin/sys/log', [ 'page' ])
export default class SysLogController extends BaseController {
    init() {
        this.setEntity(this.ctx.repo.sys.Log);
        this.setPageOption({
            keyWordLikeFields: [ 'action', 'params', 'ipAddr' ],
            fieldEq: [ 'status' ],
        });
        this.setService(this.service.sys.log);
    }

    /**
     * 清空日志
     */
    @router.post('/clear')
    public async clear () {
        await this.service.sys.log.clear();
        this.res();
    }
}
