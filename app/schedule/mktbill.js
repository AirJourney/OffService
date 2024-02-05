const Subscription = require('egg').Subscription;
const moment = require('moment');


const deviceMap = {
  online: 'Desktop',
  h5: 'Mobile',
};
class MktBillWatcher extends Subscription {
  static get schedule() {
    // 每日凌晨一点执行
    return {
      cron: '0 0 1 * * *',
      type: 'worker',
      disable: false,
      immediate: false,
    };
  }
  async subscribe() {
    const { ctx } = this;
    // 获取当前一天的订单
    const dateTime = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const list = await ctx.service.accounting.getMktBill({
      mktportal: 'skyscanner',
      dateRange: [
        dateTime,
        dateTime,
      ],
    });
    if (list.length > 0) {
      const details = list.filter(order => order.status < 20).map(order => {
      // const details = list.filter(order => order.status > 0 && order.status < 99).map(order => {
        const commission = ((order.locale === 'CN' ? 1.5 : 2) * order.totalPrice / 100).toFixed(2);
        let status = 'pending';
        if (order.status < 20) {
          status = 'booked';
        } else if (order.status <= 23) {
          status = 'cancelled';
        } else {
          status = 'unknown';
        }
        return `${order.createDateTime},${deviceMap[order.channel]},${order.locale},${status},${order.remark},${order.totalPrice},${commission},${order.currency}`;
      }).join('\n');
      if (details.length === 0) return;
      const title = 'sale date time,Device,market,Booking Status,Skyscanner redirect id,order value,commission,currency\n';
      ctx.service.mail.sendMktBillMail(title + details, dateTime);
    }
  }
}

module.exports = MktBillWatcher;
