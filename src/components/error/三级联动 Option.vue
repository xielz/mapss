
<template>

	<div>
		<select v-model="text" @change="changCity();changCity1()">
			<option v-for="(item,i) in arr">
				{{item.sheng}}
			</option>
		</select>
            <ul>
				<li></li>

			</ul>

		<select v-model="text1" @change="changCity1()">
			<option v-for="(item,i) in cityall">
				{{item.city}}
			</option>
		</select>
		<select v-model="text2">
			<option v-for="(item,i) in nameall">
				{{item.name}}
			</option>
		</select>
	</div>
</template>

<script>
export default {
  name: "myAddress",
  data() {
    return {
      text: "请选择省份",
      text1: "",
      text2: "",
      cityall: [],
      nameall: [],
      arr: [
        {
          sheng: "福建省",
          citys: [
            {
              city: "龙岩市",
              names: [
                {
                  name: "永定区"
                },
                {
                  name: "新罗区"
                },
                {
                  name: "上杭县"
                }
              ]
            },
            {
              city: "厦门市",
              names: [
                {
                  name: "湖里区"
                },
                {
                  name: "思明区"
                }
              ]
            }
          ]
        },
        {
          sheng: "河北省",
          citys: [
            {
              city: "邯郸市",
              names: [
                {
                  name: "金水2区"
                },
                {
                  name: "二七2区"
                }
              ]
            },
            {
              city: "北京市",
              names: [
                {
                  name: "金水3区"
                },
                {
                  name: "二七3区"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.changCity();
    this.changCity1();
  },
  methods: {
    changCity() {
      //我先定义一个变量为this，因为需要获取一开始的this，为了让this指向不会错误
      let _this = this;
      let item;
      _this.arr.forEach(function(value) {
        if (value.sheng == _this.text) {
          item = value;
        }
      });
      if (item) {
        this.cityall = item.citys;
        this.text1 = item.citys[0].city;
      }
    },
    changCity1() {
      let _this = this;
      let item;
      _this.cityall.forEach(function(value) {
        console.log(_this.text1);
        if (value.city == _this.text1) {
          item = value;
        }
      });
      if (item) {
        this.nameall = item.names;
        this.text2 = item.names[0].name;

        console.log(" this.text2", this.text2)
      }
    }
  }
};
</script>

<style scoped>
.Mint.Indicator {
  z-index: 999;
}
.showChose {
  padding-top: 0.5rem;
}

.myAddress {
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245, 245, 245, 1);
  color: #333;
}

.myAddress .cont {
  border-bottom: 1px solid rgba(245, 245, 245, 0.8);
}

.myAddress .cont span {
  display: inline-block;
  font-size: 0.014rem;
  color: #333;
  line-height: 0.044rem;
  margin-left: 0.016rem;
}

.myAddress .cont section {
  float: left;
}

.myAddress .cont p {
  display: inline-block;
  font-size: 0.014rem;
  color: #333333;
  line-height: 0.044rem;
  margin-left: 1rem;
}

.myAddress .cont .pic2 {
  float: right;
  width: 0.04rem;
  height: 0.012rem;
  margin: 0.016rem 0.016rem 0.016rem 0;
}

.myAddress .cont p.text {
  margin-left: 0.036rem;
}

.showChose {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  background: #ffffff;
}

.address {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 121;
  background: #fff;
  width: 100%;
}

.title {
  height: 0.43rem;
  width: 100%;
  line-height: 0.43rem;
  text-indent: 0.1rem;
  border-bottom: 1px solid #e5e5e5;
}

.title h4 {
  display: inline-block;
  margin-left: 0.16rem;
  font-size: 0.016rem;
  line-height: 0.144rem;
  font-weight: normal;
  color: #999;
}

.title span {
  margin: 0.021rem 0 0 0.11rem;
  font-size: 0.0225rem;
  line-height: 0.017rem;
  color: #d8d8d8;
}

.area {
  display: inline-block;
  font-size: 0.13rem;
  margin-left: 0.021rem;
  color: #333;
}
/* 修改的格式 */

.showChose ul {
  width: 95%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
}

.showChose ul li {
  height: 0.43rem;
  line-height: 0.43rem;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  text-indent: 0.1rem;
  font-size: 0.13rem;
}

.title .active {
  color: #0071b8;
}

.showChose ul .active {
  color: #0071b8;
}
</style>