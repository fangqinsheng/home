import { BaseService } from '../../lib/base/service';
import SysLog from '../../entities/sys/log';
import * as _ from 'lodash';

/**
 * 日志服务类
 */
export default class SysLogService extends BaseService {
    /**
     * 分页查询日志
     * @param query
     */
    async page (query) {
        const sql = `
        SELECT
            a.*,
            b.name
        FROM
        sys_log a
        LEFT JOIN sys_user b ON a.userId = b.id`;
        return this.sqlRenderPage(sql, query);
    }

    /**
     * 新增
     * @param url
     * @param params
     * @param userId
     */
    async save (url, params, userId) {
        const ip = await this.ctx.helper.getReqIP();
        const sysLog = new SysLog();
        sysLog.userId = userId;
        sysLog.ip = ip;
        const ipAddrArr = new Array();
        for (const e of ip.split(',')) ipAddrArr.push(await this.ctx.helper.getIpAddr(e));
        sysLog.ipAddr = ipAddrArr.join(',');
        sysLog.action = url;
        if (!_.isEmpty(params)) {
            sysLog.params = JSON.stringify(params);
        }
        await this.getRepo().sys.Log.save(sysLog);
    }

    /**
     * 清空日志
     */
    async clear () {
        await this.getRepo().sys.Log.clear();
    }
}
