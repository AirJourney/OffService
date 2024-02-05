"use strict";

const Controller = require("egg").Controller;

class SegmentController extends Controller {
  async createSegment() {
    const { ctx, service } = this;

    const { IPCCId } = ctx.request.body;
    if (!IPCCId) {
      ctx.helper.ResFormat(this.ctx, "", false, "Segment failture", {});
      return;
    }

    var result = await service.segment.createSegment(ctx.request.body);

    ctx.helper.ResFormat(this.ctx, "", true, "Segment success", result);
  }

  async importSegment() {
    const { ctx, service } = this;
    var result = await service.segment.importSegment(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Segment success", result);
  }

  async getSegment() {
    const { ctx, service } = this;
    var result = await service.segment.getSegment(ctx.request.body);

    result.forEach((item) => {
      item.IPCCId = item.IPCC ? item.IPCC[0].IPCCId : null;
      item.IPCC = item.IPCC ? item.IPCC[0].IPCC : null;
    });

    ctx.helper.ResFormat(this.ctx, "", true, "Segment success", result);
  }

  async updateSegment() {
    const { ctx, service } = this;
    var result = await service.segment.updateSegment(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Segment success", result);
  }

  async deleteSegment() {
    const { ctx, service } = this;
    var result = await service.segment.deleteSegments(ctx.request.body);
    ctx.helper.ResFormat(this.ctx, "", true, "Segment success", result);
  }

  async GetSegmentList() {
    const { ctx, service } = this;

    const { IPCCList } = ctx.request.body;

    const resultList = [];

    for (let i = 0; i < IPCCList.length; i++) {
      let result = await service.segment.getSegmentByIPCC(IPCCList[i]);
      if (!result || result.length == 0) {
        continue;
      }
      result = result[0];

      const ipccSeg = {
        IPCC: result.IPCC,
        startDays: result.startDays,
        endDays: result.endDays,
        GDS: result.GDS,
        IPCCType: result.IPCCType,
        GDSBooking: result.GDSBooking,
        segmentIPCC: result.segmentIPCC,
      };

      ipccSeg.segmentIPCC.forEach((segIPCC) => {
        segIPCC.IPCC = ipccSeg.IPCC;
        resultList.push(segIPCC);
      });

      
    }

    ctx.helper.ResFormat(
      this.ctx,
      "",
      true,
      "pitchGetSegment success",
      resultList
    );
  }
}

module.exports = SegmentController;
