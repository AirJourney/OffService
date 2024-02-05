"use strict";

const Service = require("egg").Service;

class SupplierService extends Service {
  async createSupplier(payload) {
    payload.isValid = true;
    payload.supplierId = this.ctx.helper.GUID();
    payload.IPCCSearchId = "";
    payload.IPCCBookingId = "";
    payload.UTC = "";
    payload.businessTime = "";
    return this.ctx.model.Supplier.create(payload);
  }

  async getSupplier(payload) {
    const { supplierCode, supplierName, sellSwitch, group } = payload;

    const query = {
      isValid: true,
      group: group,
    };

    // 判断supplierCode, supplierName, sellSwitch有值的时候放入查询语句中
    if (supplierCode) {
      query.supplierCode = { $regex: new RegExp(supplierCode, 'i') };
    }
    if (supplierName) {
      query.supplierName = { $regex: new RegExp(supplierName, 'i') };
    }
    if (sellSwitch) {
      query.sellSwitch = sellSwitch;
    }

    return await this.ctx.model.Supplier.find(query);

    //return await this.ctx.model.Supplier.find(query);
  }

  async getIPCCBySupplierId(payload) {
    const { supplierId } = payload;

    const query = {
      isValid: true,
      supplierId
    };

    return await this.ctx.model.Supplier.aggregate([
      {
        $lookup: {
          from: "ipcc",
          localField: "IPCCSearchId",
          foreignField: "IPCCId",
          as: "IPCCSearch",
        },
      },
      {
        $lookup: {
          from: "ipcc",
          localField: "IPCCBookingId",
          foreignField: "IPCCId",
          as: "IPCCBooking",
        },
      },
      {
        $match: query,
      },
    ]);

    //return await this.ctx.model.Supplier.find(query);
  }

  async updateSupplier(payload) {
    const {
      _id,
      supplierCode,

      supplierName,
      exchangeType,
      settlementCurrency,
      roundType,
      sellSwitch,
    } = payload;

    const newSupplierInfo = await this.ctx.model.Supplier.findByIdAndUpdate(
      _id,
      {
        supplierCode,
        supplierName,
        exchangeType,
        settlementCurrency,
        roundType,
        sellSwitch,
      },
      { new: true }
    );
    return newSupplierInfo;
  }

  async refreshIPCC(payload) {
    const {
      supplierId,
      IPCCType,
      IPCCId,
    } = payload;

    let refreshId = {

    }

    if (IPCCType === 'search') {
      refreshId = {
        IPCCSearchId:IPCCId
      }
    }else  if (IPCCType === 'booking'){
      refreshId = {
        IPCCBookingId:IPCCId
      }
    }else{
      refreshId = {
        IPCCSearchId:IPCCId,
        IPCCBookingId:IPCCId
      }
    }

    const newSupplierInfo = await this.ctx.model.Supplier.findOneAndUpdate(
      {supplierId},
      refreshId,
      { new: true }
    );
    return newSupplierInfo;
  }

  async deleteSupplier(payload) {
    const { _id } = payload;

    const newSupplierInfo = await this.ctx.model.Supplier.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newSupplierInfo;
  }
}

module.exports = SupplierService;
