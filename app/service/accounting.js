'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class AccountingService extends Service {
  async getMktBill(payload) {
    const { ctx } = this;
    const { mktportal, dateRange } = payload;
    const orderList = await this.ctx.model.Booking.aggregate([
      {
        $lookup: {
          from: 'shopping',
          localField: 'shoppingId',
          foreignField: 'shoppingId',
          as: 'shoppingInfo',
        },
      },
      {
        $lookup: {
          from: 'price',
          localField: 'shoppingId',
          foreignField: 'shoppingId',
          as: 'policyDetailInfo',
        },
      },
      {
        $match: {
          mktportal,
          remark: { $exists: true },
        },
      },
    ]);

    const billSearchRangeStart = ctx.helper.ConvertMoment(dateRange[0]);
    const billSearchRangeEnd = ctx.helper.ConvertMoment(dateRange[1]);
    // `${order.createDateTime},${order.channel},${order.locale},${order.status},${order.remark},${order.totalPrice},0,${order.currency}`;
    const billList = [];
    orderList.forEach(order => {
      const clientTime = ctx.helper.ConvertMoment(order.clientTime);
      if (
        ctx.helper.BetweenMoment(
          clientTime,
          billSearchRangeStart,
          billSearchRangeEnd
        ) && order.shoppingInfo && order.shoppingInfo.length > 0
      ) {
        order.flightType =
          order.shoppingInfo[0].redisCode.length > 10 ? 'RT' : 'OW';
        order.segment = `${order.shoppingInfo[0].redisCode.substring(
          4,
          7
        )}-${order.shoppingInfo[0].redisCode.substring(7, 10)}`;
        order.dateRange =
          order.flightType === 'OW'
            ? `${order.shoppingInfo[0].redisCode.substring(0, 4)}`
            : `${order.shoppingInfo[0].redisCode.substring(
              0,
              4
            )}~${order.shoppingInfo[0].redisCode.substring(10, 14)}`;
        try {
          order.totalPrice = order.policyDetailInfo[0].totalPrice;
        } catch (e) {
          order.totalPrice = 0;
        }
        // order.totalPrice = order.policyDetailInfo[0].totalPrice;
        billList.push(order);
      }
    });

    return billList;
  }

  async getBill(payload) {
    const { ctx } = this;
    const { mktportal, dateRange, group, status } = payload;

    const query = {};

    if (mktportal) {
      query.mktportal = mktportal;
    }
    if (group && group != 'all') {
      query.group = group;
    }

    if (status && status.length > 0) {
      query.status = { $in: status };
    }

    // query["contactInfo.contactId"] = { $in: contactIdList };

    const orderList = await this.ctx.model.Booking.aggregate([
      {
        $lookup: {
          from: 'shopping',
          localField: 'shoppingId',
          foreignField: 'shoppingId',
          as: 'shoppingInfo',
        },
      },
      {
        $lookup: {
          from: 'price',
          localField: 'shoppingId',
          foreignField: 'shoppingId',
          as: 'policyDetailInfo',
        },
      },
      {
        $lookup: {
          from: 'contact',
          localField: 'contactId',
          foreignField: 'contactId',
          as: 'contactInfo',
        },
      },
      {
        $match: query, // 根据你的查询条件筛选订单
      },
    ]);

    const rateList = await ctx.service.exchange.getExchangeList({});

    const billSearchRangeStart = ctx.helper.ConvertMoment(dateRange[0]);
    const billSearchRangeEnd = ctx.helper.ConvertMoment(dateRange[1]);

    const allOrderPassengerIdList = [];
    const billList = [];
    for(let i =0;i<orderList.length;i++) {
      const order = orderList[i];
      

      const clientTime = ctx.helper.ConvertMoment(order.clientTime);
      if (
        moment(clientTime).isBetween(
          billSearchRangeStart,
          billSearchRangeEnd,
          'day',
          '[]'
        ) &&
        order.shoppingInfo &&
        order.shoppingInfo.length > 0
      ) {
        order.flightType =
          order.shoppingInfo[0].redisCode.length > 10 ? 'RT' : 'OW';
        order.segment = `${order.shoppingInfo[0].redisCode.substring(
          4,
          7
        )}-${order.shoppingInfo[0].redisCode.substring(7, 10)}`;
        order.dateRange =
          order.flightType == 'OW'
            ? `${order.shoppingInfo[0].redisCode.substring(0, 4)}`
            : `${order.shoppingInfo[0].redisCode.substring(
              0,
              4
            )}~${order.shoppingInfo[0].redisCode.substring(10, 14)}`;
        order.totalPrice = order.policyDetailInfo[0].totalPrice;
        const usdRate = rateList.find(r=>r.fromCurrency==order.currency&&r.toCurrency=='USD').rate;
        order.usdPrice= (order.totalPrice * usdRate).toFixed(2);

        const passengerIdList = order.passengerIdList.split(',');
        order.passengerInfoList = [];
        passengerIdList.forEach(passengerId => {
          order.passengerInfoList.push({ passengerId });
        });
        allOrderPassengerIdList.push(...passengerIdList);

        billList.push(order);
      }
    };

    const passengerList = await this.ctx.model.Passenger.find({
      passengerId: { $in: allOrderPassengerIdList },
    });

    if (passengerList && passengerList.length > 0) {
      billList.forEach(order => {
        order.passengerInfoList.forEach(passengerInfo => {
          const matchPsg = passengerList.find(
            p => p.passengerId == passengerInfo.passengerId
          );
          if (matchPsg) {
            // 把matchPsg中的字段全部赋值给passengerInfo
            Object.assign(passengerInfo, matchPsg._doc);
          }
        });

        JSON.parse(order.companyNumber).forEach(psgCompany => {
          order.passengerInfoList.find(
            psg => psg.passengerId == psgCompany.passengerId
          ).companyNumber = psgCompany.number;
        });

        JSON.parse(order.ticketNumber).forEach(psgTicket => {
          order.passengerInfoList.find(
            psg => psg.passengerId == psgTicket.passengerId
          ).ticketNumber = psgTicket.number;
        });

        JSON.parse(order.pnr).forEach(psgPNR => {
          order.passengerInfoList.find(
            psg => psg.passengerId == psgPNR.passengerId
          ).pnr = psgPNR.number;
        });
      });
    }

    return billList;
  }
}

module.exports = AccountingService;

/**  */
