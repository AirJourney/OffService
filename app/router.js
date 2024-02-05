"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);

  /** 管理员核心配置 */

  /** 组配置 */
  router.post("/support/creategroup", controller.group.createGroup);
  router.post("/support/getgroup", controller.group.getGroup);
  router.post("/support/updategroup", controller.group.updateGroup);

  /** 供应商配置 */
  router.post("/support/createsupplier", controller.supplier.createSupplier);
  router.post("/support/getsupplier", controller.supplier.getSupplier);
  router.post("/support/updatesupplier", controller.supplier.updateSupplier);
  router.post("/support/deletesupplier", controller.supplier.deleteSupplier);

  /** 网站加价配置 */
  router.post("/support/createrevenue", controller.revenue.createRevenue);
  router.post("/support/getrevenue", controller.revenue.getRevenue);
  router.post("/support/updaterevenue", controller.revenue.updateRevenue);
  router.post("/support/deleterevenue", controller.revenue.deleteRevenue);

  /** 运营配置 */

  /** 用户配置 */
  router.post("/support/createstaff", controller.staff.createStaff);
  router.post("/support/getstaff", controller.staff.getStaff);
  router.post("/support/updatestaff", controller.staff.updateStaff);
  router.post("/support/deletestaff", controller.staff.deleteStaff);

  /** 价格投放配置 */
  router.post("/support/createprofit", controller.profit.createProfit);
  router.post("/support/getprofit", controller.profit.getProfit);
  router.post("/support/updateprofit", controller.profit.updateProfit);
  router.post("/support/deleteprofit", controller.profit.deleteProfit);

  /** 退改配置 */
  router.post("/support/createpenalty", controller.penalty.createPenalty);
  router.post("/support/getpenalty", controller.penalty.getPenalty);
  router.post("/support/updatepenalty", controller.penalty.updatePenalty);
  router.post("/support/deletepenalty", controller.penalty.deletePenalty);

  /** 供应商配置管理 */
  router.post("/support/createsupplier", controller.supplier.createSupplier);
  router.post("/support/getsupplier", controller.supplier.getSupplier);
  router.post(
    "/support/getipccbysupplierid",
    controller.supplier.getIPCCBySupplierId
  );
  router.post("/support/updatesupplier", controller.supplier.updateSupplier);

  /** IPCC管理 */
  router.post("/support/createipcc", controller.ipcc.createIPCC);
  router.post("/support/getipcc", controller.ipcc.getIPCC);
  router.post("/support/updateipcc", controller.ipcc.updateIPCC);
  router.post("/support/deleteipcc", controller.ipcc.deleteIPCC);

  /** IPCC下的Segment */
  router.post("/support/createsegment", controller.segment.createSegment);
  router.post("/support/importsegment", controller.segment.importSegment);
  router.post("/support/getsegment", controller.segment.getSegment);
  router.post("/support/updatesegment", controller.segment.updateSegment);
  router.post("/support/deletesegment", controller.segment.deleteSegment);
  router.post("/support/getsegmentlist", controller.segment.GetSegmentList);

  /** 售卖航线 */
  router.post(
    "/support/createsellfight",
    controller.sellFlight.createSellFight
  );
  router.post("/support/clearsellfight", controller.sellFlight.clearSellFight);
  router.post("/support/getsellfight", controller.sellFlight.getSellFight);

  /** 可售航司配置 */
  router.post(
    "/support/createvendibility",
    controller.vendibility.createVendibility
  );
  router.post("/support/getvendibility", controller.vendibility.getVendibility);
  router.post(
    "/support/updatevendibility",
    controller.vendibility.updateVendibility
  );
  router.post(
    "/support/deletevendibility",
    controller.vendibility.deleteVendibility
  );
  router.post(
    "/support/vendibility/async",
    controller.vendibility.asyncVendibility
  );

  /** 禁售航线配置 */
  router.post(
    "/support/createprohibition",
    controller.prohibition.createProhibition
  );
  router.post("/support/getprohibition", controller.prohibition.getProhibition);
  router.post(
    "/support/updateprohibition",
    controller.prohibition.updateProhibition
  );
  router.post(
    "/support/deleteprohibition",
    controller.prohibition.deleteProhibition
  );
  router.post(
    "/support/prohibition/async",
    controller.prohibition.asyncProhibition
  );

  /** 账务管理 */
  router.post("/support/getmktbill", controller.accounting.getMktBill);
  router.post("/support/getbill", controller.accounting.getBill);

  /** 汇率查询 */
  router.post("/support/exchangelist", controller.exchange.getExchangeList);

  /** 航司查询 */
  router.post("/support/companylist", controller.company.getCompanyList);

  /** 获取集团维度禁售信息 Not For Sale */
  router.post("/support/nfs/group", controller.nfs.allGroupNFS);

  /** 外部供应商接口 */
  router.post('/api/enterticketnumber', controller.order.ticketUpdate); // 多路更新票号和状态
  router.post('/api/order/list', controller.order.getAllList); // 外部
  router.post('/api/order/ticket', controller.order.offlineTicketUpdate); // 手工回调票号
  router.post('/api/order/mail', controller.order.offlineTicketMail); // 票务邮件
  router.post('/api/order/refund', controller.order.offlineTicketRefund); // 手工退票

  router.post('/support/changePwd', controller.staff.changePwd);
};
