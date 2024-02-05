'use strict';

const Controller = require('egg').Controller;
const helper = require('../extend/helper');

class OrderApiController extends Controller {
  async ticketUpdate() {
    const { ctx, service } = this;

    const { orderId, passenger, group } = ctx.request.body;

    if (!orderId || !passenger || passenger.length === 0) {
      helper.ResFormat(ctx, '', false, 'params is error', []);
      return;
    }

    const orderRes = await this.ctx.curl(
      'https://www.skywinghub.com/support/orderlist',
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: {
          orderId,
          group,
        },
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    if (
      !orderRes ||
      orderRes.status != 200 ||
      orderRes.data.content.length === 0
    ) {
      helper.ResFormat(ctx, '', false, 'can not find order', []);
      return;
    }

    const orderInfo = orderRes.data.content[0];

    const updateTicketRes = await this.ctx.curl(
      'https://www.skywinghub.com/support/updateticket',
      // "http://127.0.0.1:7001/support/updateticket",
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: {
          orderInfo,
          ticketList: passenger,
          status: 1,
        },
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    if (
      updateTicketRes &&
      updateTicketRes.status == 200 &&
      updateTicketRes.data.content
    ) {
      const updatedOrderInfo = updateTicketRes.data.content;
      passenger.forEach(t => {
        if (
          updatedOrderInfo.ticketNumber.includes(t.ticketNumber) &&
          updatedOrderInfo.companyNumber.includes(t.companyNumber) &&
          updatedOrderInfo.pnr.includes(t.pnr)
        ) {
          t.backFillStatus = true;
        } else {
          t.backFillStatus = false;
        }
      });

      this.offlineTicketMail();
      helper.ResFormat(ctx, '', true, 'ticket success', passenger);
    } else {
      helper.ResFormat(ctx, '', false, 'ticket failure', []);
    }
  }

  async getAllList() {
    const { orderId, status, isAdmin, group } = this.ctx.request.body;

    const orderRes = await this.ctx.curl(
      'https://www.skywinghub.com/support/orderlist',
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: { orderId, status, group },
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    const orderList = orderRes.data.content;

    for (let i = 0; i < orderList.length; i++) {
      if (isAdmin=='staff') {
        delete orderList[i].locale;
        delete orderList[i].mktportal;
        delete orderList[i].landingPageType;
        delete orderList[i].campaign;
        delete orderList[i].channel;
        delete orderList[i].currencyRate;
        delete orderList[i].netsTxnRef;
        delete orderList[i].payChannel;
        delete orderList[i].txnTime;
        delete orderList[i].shoppingInfo.currency;
        delete orderList[i].shoppingInfo.policyDetailInfo;
        delete orderList[i].contactInfo;
        delete orderList[i].contactName;
        delete orderList[i].email;
        delete orderList[i].phoneArea;
        delete orderList[i].mobilePhone;
        delete orderList[i].revenueInfo;
        delete orderList[i].profitInfo;
        delete orderList[i].remark;
        delete orderList[i].userId;
        delete orderList[i].offLogList;

        /** 汇率部分-Start */
        let usdRate = await this.app.redis
          .get('db2')
          .smembers(`${orderList[i].currency}2USD`);
        if (usdRate && usdRate.length > 0) {
          usdRate = usdRate[0];
        } else {
          usdRate = 1;
        }
        /** 汇率部分-End */

        orderList[i].totalPriceUSD = Number(
          (orderList[i].totalPrice * usdRate).toFixed(0)
        );
        orderList[i].currencyUSD = 'USD';
      }
    }

    helper.ResFormat(this.ctx, '', true, '', orderList);
  }

  async offlineTicketUpdate() {
    const { ctx } = this;

    const orderRes = await ctx.curl(
      'https://www.skywinghub.com/website/orderupdate',
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: ctx.request.body,
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    if (orderRes && orderRes.status == 200 && orderRes.data.content) {
      helper.ResFormat(ctx, '', true, 'offlineTicketUpdate success', orderRes);
      
      /** 自动邮件 */
      const { orderInfo } = ctx.request.body;
      const { orderId, group,status } = orderInfo;
      
      if(status!=1 ){
        return;
      }
      await ctx.curl(
        'https://www.skywinghub.com/mail/orderchange',
        {
          method: 'POST',
          contentType: 'json',
          dataType: 'json',
          headers: {},
          data: { orderId, group },
          timeout: 300000, // 设置超时时间为 30 秒
        }
      );

    } else {
      helper.ResFormat(ctx, '', false, 'offlineTicketUpdate failure', orderRes);
    }
  }

  async offlineTicketMail() {
    const { ctx } = this;

    const orderRes = await this.ctx.curl(
      'https://www.skywinghub.com/mail/orderchange',
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: ctx.request.body,
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    if (orderRes && orderRes.status == 200 && orderRes.data.status) {
      helper.ResFormat(ctx, '', true, 'offlineTicketMail success', orderRes);
    } else {
      helper.ResFormat(ctx, '', false, 'offlineTicketMail failure', orderRes);
    }
  }

  async offlineTicketRefund() {
    const { ctx } = this;

    const orderRes = await this.ctx.curl(
      'https://www.skywinghub.com/website/orderrefund',
      {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {},
        data: ctx.request.body,
        timeout: 300000, // 设置超时时间为 30 秒
      }
    );

    if (orderRes && orderRes.status == 200 && orderRes.data.content) {
      helper.ResFormat(ctx, '', true, 'offlineTicketRefund success', orderRes);
    } else {
      helper.ResFormat(ctx, '', false, 'offlineTicketRefund failure', orderRes);
    }
  }
}

module.exports = OrderApiController;
