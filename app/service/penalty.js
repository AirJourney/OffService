'use strict';

const Service = require('egg').Service;

class PenaltyService extends Service {
  /**
   * 创建退改配置列表
   * @param {*} payload
   * @return
   */
  async createPenalty(payload) {
    payload.isValid = true;
    return this.ctx.model.Penalty.create(payload);
  }

  /**
   *  获取退改配置列表
   * @param {*} payload
   * @return
   */
  async getPenalty(payload) {
    const { flightType, segment, group } = payload;
    const query = {
      isValid: true,
      group,
    };
    if (flightType) {
      query.flightType = flightType;
    }
    if (segment) {
      query.segment = segment;
    }

    return await this.ctx.model.Penalty.find(query);
  }

  /**
   *  更新退改配置列表
   * @param {*} penaltyInfo
   * @return
   */
  async updatePenalty(penaltyInfo) {
    const {
      _id,
      flightType,
      segment,
      number,
      company,
      cabin,
      dateStart,
      dateEnd,
      penaltyType,
      refundBeforePercentFWT,
      refundAfterPercentFWT,
      changeBeforePercentFWT,
      changeAfterPercentFWT,
      refundBeforePercentBWT,
      refundAfterPercentBWT,
      changeBeforePercentBWT,
      changeAfterPercentBWT,
      abandonRTPercent,
    } = penaltyInfo;

    const newPenaltyInfo = await this.ctx.model.Penalty.findByIdAndUpdate(
      _id,
      {
        flightType,
        segment,
        number,
        company,
        cabin,
        dateStart,
        dateEnd,
        penaltyType,
        refundBeforePercentFWT,
        refundAfterPercentFWT,
        changeBeforePercentFWT,
        changeAfterPercentFWT,
        refundBeforePercentBWT,
        refundAfterPercentBWT,
        changeBeforePercentBWT,
        changeAfterPercentBWT,
        abandonRTPercent,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  /**
   *  删除退改配置列表
   * @param {*} penaltyInfo
   * @return
   */
  async deletePenalty(penaltyInfo) {
    const { _id } = penaltyInfo;

    const newPenaltyInfo = await this.ctx.model.Penalty.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }
}

module.exports = PenaltyService;

// const newPenaltyInfo = await this.ctx.model.Penalty.findByIdAndDelete(_id);
