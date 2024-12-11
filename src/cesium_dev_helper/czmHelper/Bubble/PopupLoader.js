/*
 * @Description:
 * @Author: lijialu lijialu0810@163.com
 * @Date: 2024-06-26 08:47:26
 * @LastEditors: lijialu lijialu0810@163.com
 * @LastEditTime: 2024-06-27 21:28:50
 * @FilePath: \wisdom-subway-system\src\cesium_dev_helper\czmHelper\Bubble\PopupLoader.js
 */
import PopupCreator from "@/cesium_dev_helper/czmHelper/Creator/PopupCreator.js";
import { getStationInfo } from "@/api/line";

// route，cb硬编码
const pathOfVueComponentMap = {
  marker: () => import("./MakerTemplate.vue"),
  carPopup: () => import("./PopupCar.vue"),
  queryPopup: () => import("./PopupQuery.vue"),
};
// PopupLoader 负责动态加载 目录下的vue组件
class PopupLoader extends PopupCreator {
  constructor(viewer, options) {
    super(viewer, options, pathOfVueComponentMap, this.showQueryPopup);
  }
  // --天气查询气泡(clickCallback)
  async showQueryPopup() {
    const params = {
      name: this.attr.name,
    };
    const { code, data } = await getStationInfo(params);

    // 查接口数据
    if (code === 200) {
      const address = data.address;
      const peopleFlow = data.peopleFlow;
      const fields = ["名称", "客流量状态", "所属线路", "是否换乘"];
      const values = [
        this.attr.name,
        peopleFlow,
        address,
        this.attr.isChange ? "是" : "否",
      ];

      // 加载气泡
      const opt = {
        position: this.position,
        label: this.attr.name,
        isShow: true,
        color: this.color,
        scaleByDistance: this.scaleByDistance,
        attr: this.attr,
        fields: fields,
        values: values,
        type: "queryPopup",
        offset: [150, -20],
      };
      this.queryPopup = new PopupLoader(this.viewer, opt);

      // 可视化 挂载元素
      this.queryPopup.addLabel();
    };

  }
  // --移除查询气泡
  removeQueryPopup() {
    this.queryPopup && this.queryPopup.removeMarker();
  }
}

export default PopupLoader;
