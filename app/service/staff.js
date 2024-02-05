'use strict';

const Service = require('egg').Service;

class StaffService extends Service {
  async createStaff(payload) {
    payload.staffId = this.ctx.helper.GUID();
    payload.isValid = true;
    payload.avatar =
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return this.ctx.model.Staff.create(payload);
  }

  async getStaff(payload) {
    const { group, id, name, role } = payload;
    const query = {
      isValid: true,
      group,
    };

    if (id) {
      query.id = { $regex: new RegExp(id, 'i') };
    }

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (role) {
      query.role = { $regex: new RegExp(role, 'i') };
    }

    return await this.ctx.model.Staff.find(query);
  }

  async updateStaff(StaffInfo) {
    const { _id, id, name, role, password } = StaffInfo;

    const newPenaltyInfo = await this.ctx.model.Staff.findByIdAndUpdate(
      _id,
      {
        id,
        name,
        role,
        password,
      },
      { new: true }
    );
    return newPenaltyInfo;
  }

  async deleteStaff(StaffInfo) {
    const { _id } = StaffInfo;

    const newStaffInfo = await this.ctx.model.Staff.findByIdAndUpdate(
      _id,
      {
        isValid: false,
      },
      { new: true }
    );
    return newStaffInfo;
  }

  async changePwd(StaffInfo) {
    const { id, newPwd, oldPwd } = StaffInfo;
    const staffInfo = await this.ctx.model.Staff.findById(id);
    if (staffInfo && staffInfo.password === oldPwd) {
      const newStaffInfo = await this.ctx.model.Staff.findByIdAndUpdate(
        id,
        {
          password: newPwd,
        },
        { new: true }
      );
      return newStaffInfo;
    }
  }
}

module.exports = StaffService;
