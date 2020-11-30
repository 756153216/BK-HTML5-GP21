import Component from "./Component.js";

export default class ShopCart extends Component {
  data;
  bool = false;
  checkboxList;
  order;
  total = 0;
  ids;

  callback;
  trList;
  checkboxSpans;
  inputs;
  chkAll;
  chkAll_bottom;
  c_c_delete;
  totalSum;
  c_r_right;

  constructor(_data, _callback) {
    super();
    this.data = _data;
    this.callback = _callback;

    if (this.data !== "") {
      this.alCheckBool();

      this.total = this.data.reduce((value, item) => {
        if (item.checked) value += item.goodsPrice;
        return value;
      }, 0);
    }

    this.elem.className = "items clear";

    this.createTable(this.elem);
    if (this.data !== "") {
      this.createGoodsgiftCode(this.elem);
      this.createContainerCalcu(this.elem);
    }
  }

  appendTo(parent) {
    super.appendTo(parent);

    if (this.data !== "") {
      this.trList = Array.from(
        document.querySelector(".grid").lastElementChild.children
      );
      this.inputs = Array.from(document.querySelectorAll(".input_quantity"));
      this.chkAll = document.querySelector("[name='chkAll']");
      this.chkAll_bottom = document.querySelector("[name='chkAll_bottom']");
      this.c_c_delete = document.querySelector(".c-c-delete");
      this.checkboxSpans = document.querySelectorAll(".checkboxSpan");
      this.totalSum = document.querySelector("#totalSum");
      this.c_r_right = document.querySelector(".c-r-right");
      this.someCheckBool();

      this.trList.forEach((item) =>
        item.addEventListener("click", (e) => this.clickHandler(e))
      );
      this.chkAll.addEventListener("click", (e) => this.clickHandler(e));
      this.chkAll_bottom.addEventListener("click", (e) => this.clickHandler(e));
      this.c_c_delete.addEventListener("click", (e) => this.clickHandler(e));
      this.inputs.forEach((item) =>
        item.addEventListener("input", (e) => this.inputHandler(e))
      );
    }
  }

  createTable(parent) {
    let table = document.createElement("table");
    table.className = "grid";
    table.setAttribute("cellspacing", "0");

    let thead = document.createElement("thead");
    thead.innerHTML = `
    <h3 class="m-mycart" _pi="14">
          <span class="tt" _pi="14">我的购物车 1</span>
          <span class="addrbox f-fr" id="address" _pi="14">
            <label class="addrlabel" _pi="14">配送至</label>
          </span>
        </h3>

        <div class="head f-cb">
          <div class="col col1">
            <input
              type="checkbox"
              id="selectAll"
              name="selectAll"
              class="u-chk"
            />
            <label class="lab" for="selectAll">全选</label>
          </div>
          <div class="col col2" _pi="20">商品信息</div>
          <div class="col col3" _pi="20">单价(元)</div>
          <div class="col col4" _pi="20">数量</div>
          <div class="col col5" _pi="20">金额(元)</div>
          <div class="col col6" _pi="20">操作</div>
        </div>

        <div class="m-cart">
          <!-- <div class="ware">
                    <input type="checkbox" name="cartAll" class="u-chk">
                   <b class="u-cartlabel">自营</b>
                    <strong class="warename">自营保税仓</strong>
                  </div>  -->
          
        </div>
    `;
    let tbody = "";
    if (this.data === "") {
      tbody += `
      <tbody>
        <tr>
          <td colspan="11" id="cartNotice">
            您还没有添加商品到购物车
          </td>
        </tr>
      </tbody>
      `;
    } else {
      tbody += `
      <tbody>
        <tr>
          <td
            colspan="9"
            style="height: 50px; line-height: 50px; padding: 0; text-align: left; padding-left: 19px;"
          >
            <span style="color: #EE2737; font-size: 12px;">温馨提示</span>
            <span style="color:#666; font-size: 12px;margin-left: 6px;">
              选购清单中的商品无法保留库存，请您及时结算
            </span>
          </td>
        </tr>
      </tbody>
      <tbody>
        ${(function (list) {
          return list.reduce((value, item) => {
            return (
              value +
              `
            <tr id=${item.pid} maxNum=${item.maxNum}>
              <td>
                <span class="checkboxSpan ${
                  item.checked ? "alCheck" : "unCheck"
                }" name="chkGoods" checked=${item.checked} pid=${
                item.pid
              }></span>
              </td>
              <td class="textLeft">
                <img src=${item.imgSrc} class="item">
              </td>
              <td class="cartGoodsName textLeft">${item.name}</td>
              <td>
                <div class="goodsSpec">尺码：${item.size}</div>
              </td>
              <td>
                <div class="cartMarketPrice">¥${item.price + ".00"}</div>
              </td>
              <td>
                <div class="quantity">
                  <a href="javascript:void(0);" class="reduce">-</a>
                  <input type="text" id=${
                    item.pid
                  } name="buy_quantity" class="input_quantity" value=${
                item.num
              }>
                  <a href="javascript:void(0);" class="subjoin">+</a>
                </div>
              </td>
              <td class="goodsDiscount">
                <div>  ¥0.00  </div>
              </td>
              <td>
                <div class="goodsPrice">¥ ${item.goodsPrice + ".00"}</div>
              </td>
              <td class="cart-goods-operation">
                <a href="javascript:void(0);" class="line">删除</a>
              </td>
            </tr>`
            );
          }, "");
        })(this.data)};
      </tbody>
      `;
    }

    table.appendChild(thead);
    table.innerHTML += tbody;
    parent.appendChild(table);
  }

  createGoodsgiftCode(parent) {
    let goodsgift_code = `
    <div id="goodsgift_code">
      <div class="g-c-icon">
        <img src="./../img/u463.png" width="100%"/>
      </div>
      <span class="g-c-name">礼品码</span>
      <div class="g-c-content">
        <input type="text" name="giftCode" id="giftCode" maxlength="200" placeholder="请输入礼品码"/>
        <span class="g-c-use">使用</span>
        <div class="g-c-click">
          <img src="./../img/u11.png" width="15px" height="8px"/>
        </div>
      </div>
      <a class="g-c-link" style="text-decoration: underline" href="javascript:void(0)">点击查看我的礼品码</a>
    </div>
    `;

    parent.innerHTML += goodsgift_code;
  }

  createContainerCalcu(parent) {
    let calcu = document.createElement("div");
    calcu.className = "c-c-center clear";

    let c_left = `
    <div class="c-c-left">
      <span class="checkboxSpan ${
        this.bool ? "alCheck" : "unCheck"
      }" name="chkAll_bottom"></span>
      <a class="c-c-allselect" href="javascript:void(0);">全选</a>
      <a class="c-c-delete" href="javascript:void(0);">批量删除</a>
      <a class="c-c-buy" href="/pages/goods.html">继续购物</a>
    </div>
    `;

    let c_right = `
    <div class="c-c-right">
      <div class="c-r-left">
        <div class="c-line1">
          <span>总计：</span>
          <span id="totalSum">¥${this.total}.00</span>
        </div>
        <div class="c-line2" >(不含运费)</div>
      </div>
      <div class="c-r-right">去结算</div>
    </div>
    `;

    calcu.innerHTML = c_left + c_right;
    parent.appendChild(calcu);
  }

  alCheckBool() {
    if (this.data.length === 0) return location.reload();
    this.bool = this.data.every((item) => {
      return item.checked;
    });
  }
  someCheckBool() {
    this.c_r_right.style =
      parseInt(this.total) > 0
        ? "background-color: rgb(238, 39, 55); cursor: pointer;"
        : "background-color: rgb(221, 221, 221); cursor: not-allowed;";
  }

  clickHandler(e) {
    if (
      e.currentTarget === this.chkAll ||
      e.currentTarget === this.chkAll_bottom ||
      e.currentTarget === this.c_c_delete ||
      e.currentTarget.constructor === HTMLTableRowElement
    ) {
      if (
        e.currentTarget === this.chkAll ||
        e.currentTarget === this.chkAll_bottom
      ) {
        if (e.target.className.includes("alCheck")) {
          this.data.forEach((item) => {
            item.checked = false;
          });
          this.checkboxSpans.forEach((item) => {
            item.className = "checkboxSpan unCheck";
          });
          this.total = 0;
          this.totalSum.textContent = `￥${this.total}.00`;
        } else {
          this.total = this.data.reduce((value, item) => {
            item.checked = true;
            return value + item.goodsPrice;
          }, 0);
          this.totalSum.textContent = `￥${this.total}.00`;
          this.checkboxSpans.forEach((item) => {
            item.className = "checkboxSpan alCheck";
          });
        }
        this.someCheckBool();
        this.callback(this.data);
      } else if (e.currentTarget === this.c_c_delete) {
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].checked) {
            this.total -= this.data[i].goodsPrice;
            this.trList[i].remove();
            this.trList.splice(i, 1);
            this.data.splice(i, 1);
            if (i >= 0) i--;
          }
        }
        this.alCheckBool();
        this.chkAll.className = this.chkAll_bottom.className = this.bool
          ? "checkboxSpan alCheck"
          : "checkboxSpan unCheck";
        this.someCheckBool();
        this.totalSum.textContent = `￥${this.total}.00`;
        this.callback(this.data);
      } else if (e.currentTarget.constructor === HTMLTableRowElement) {
        if (e.target.className === "reduce") {
          var input = e.target.nextElementSibling;
          var num = Number(input.value);
          var parent = e.target.parentElement.parentElement;
          if (num === 1) return;
          else {
            var index = this.trList.indexOf(parent.parentElement);
            var obj = this.data[index];
            obj.num--;
            input.value = obj.num;
            obj.goodsPrice -= obj.price;
            parent.nextElementSibling.nextElementSibling.firstElementChild.textContent = `￥${obj.goodsPrice}.00`;
            if (obj.checked) {
              this.total -= obj.price;
              this.totalSum.textContent = `￥${this.total}.00`;
            }
          }
          this.callback(this.data);
        } else if (e.target.className === "subjoin") {
          var input = e.target.previousElementSibling;
          var num = Number(input.value);
          var parent = e.target.parentElement.parentElement;
          if (num === Number(parent.parentElement.getAttribute("maxnum")))
            return;
          else {
            var index = this.trList.indexOf(parent.parentElement);
            var obj = this.data[index];
            obj.num++;
            input.value = obj.num;
            obj.goodsPrice = Number(obj.goodsPrice) + Number(obj.price);
            parent.nextElementSibling.nextElementSibling.firstElementChild.textContent = `￥${obj.goodsPrice}.00`;
            if (obj.checked) {
              this.total += Number(obj.price);
              this.totalSum.textContent = `￥${this.total}.00`;
            }
          }
          this.callback(this.data);
        } else if (e.target.className === "line") {
          var parent = e.target.parentElement.parentElement;
          var index = this.trList.indexOf(parent);
          var obj = this.data[index];
          if (obj.checked) {
            this.total -= obj.goodsPrice;
            this.totalSum.textContent = `￥${this.total}.00`;
          }
          parent.remove();
          this.trList.splice(index, 1);
          this.data.splice(index, 1);
          this.alCheckBool();
          this.chkAll.className = this.chkAll_bottom.className = this.bool
            ? "checkboxSpan alCheck"
            : "checkboxSpan unCheck";
          this.someCheckBool();
          this.callback(this.data);
        } else if (e.target.getAttribute("name") === "chkGoods") {
          var parent = e.target.parentElement.parentElement;
          var index = this.trList.indexOf(parent);
          var obj = this.data[index];
          obj.checked = !obj.checked;
          e.target.className = obj.checked
            ? "checkboxSpan alCheck"
            : "checkboxSpan unCheck";
          this.total += obj.checked ? obj.goodsPrice : -obj.goodsPrice;
          this.totalSum.textContent = `￥${this.total}.00`;
          this.alCheckBool();
          this.chkAll.className = this.chkAll_bottom.className = this.bool
            ? "checkboxSpan alCheck"
            : "checkboxSpan unCheck";
          this.someCheckBool();
          this.callback(this.data);
        }
      }
    }
  }

  inputHandler(e) {
    if (this.ids) return;
    this.ids = setTimeout(() => {
      clearTimeout(this.ids);
      this.ids = 0;

      var input = e.target;
      var num1 = Number(input.value.replace(/\D/g, ""));
      var parent = input.parentElement.parentElement;
      var index = this.trList.indexOf(parent.parentElement);
      var maxNum = Number(parent.parentElement.getAttribute("maxnum"));
      var obj = this.data[index];
      var num2 = obj.num;
      num1 = num1 <= 0 ? 1 : num1;
      num1 = num1 > maxNum ? maxNum : num1;
      obj.num = num1;
      obj.goodsPrice = Number(obj.num) * Number(obj.price);
      input.value = num1;
      parent.nextElementSibling.nextElementSibling.firstElementChild.textContent = `￥${obj.goodsPrice}.00`;
      if (obj.checked) {
        this.total += (num1 - num2) * Number(obj.price);
        this.totalSum.textContent = `￥${this.total}.00`;
      }

      this.callback(this.data);
    }, 500);
  }
}
