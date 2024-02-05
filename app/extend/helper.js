const uuid = require('uuid');
const moment = require('moment');


module.exports = {
  GUID() {
    guid = uuid.v4().replace(/-/g, '');
    return guid;
  },
  ID() {
    const timeTag = moment().format('YYYYMMDDHHmmss');
    const randomTag = Math.random().toString(10).substring(3, 6);
    return timeTag + randomTag;

  },
  ResFormat(ctx, sessionid, status, msg, content) {
    /*
     * sessionid: 会话串联id
     * status：bool 接口返回成功/失败（true/false）
     * msg: string 接口返回的信息，用作显示
     * content: 成功时返回接口内容/失败时显示error信息  this.ctx.request.originalUrl
     */
    const responseFormat = { sessionid, status, msg, content };
    const apiName = ctx.request.originalUrl;
    const reqBody = ctx.request.body;
    ctx.logger.info('api-record', {
      sessionid,
      apiName,
      reqBody,
      status,
      msg,
    });

    if (!status) {
      ctx.status = 500;
    }

    ctx.status = 200;
    ctx.body = responseFormat;
  },
  ConvertMoment(dateString) {
    return moment(dateString).format('YYYY-MM-DD');
  },
  BetweenMoment(midDate, startDate, endDate) {
    return moment(midDate).isBetween(startDate, endDate, undefined, '[]');
  },

  calculatePrice(price, rate) {
    const result = (price * rate).toFixed(0);
    return result;
  },
  calculateAdd(a, b) {
    return (Number(a) + Number(b)).toFixed(0);
  },
  dateTimeNow() {
    return moment().format('YYYYMMDDHHmmss');
  },
};
