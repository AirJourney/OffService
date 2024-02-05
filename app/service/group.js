"use strict";

const Service = require("egg").Service;

class GroupService extends Service {
  async createGroup(payload) {
    payload.isValid = true;
    payload.groupId = this.ctx.helper.GUID();
    
    return this.ctx.model.Group.create(payload);
  }

  async getGroup(payload) {
    const { groupName, groupCode } = payload;

    const query = {
      isValid: true,
    };

    // 判断groupCode, groupName, sellSwitch有值的时候放入查询语句中
    if (groupCode) {
      query.groupCode = { $regex: new RegExp(groupCode, 'i') };
    }
    if (groupName) {
      query.groupName = { $regex: new RegExp(groupName, 'i') };
    }
    

    return await this.ctx.model.Group.find(query);
  }

  async updateGroup(payload) {
    const {
      _id,
      groupName
    } = payload;

    const newGroupInfo = await this.ctx.model.Group.findByIdAndUpdate(
      _id,
      {
        groupName
      },
      { new: true }
    );
    return newGroupInfo;
  }
}

module.exports = GroupService;
