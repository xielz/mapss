
<template>

  <div>
    <!-- <select v-model="text" @clicke="clickCity();clickCity2()">
			<option v-for="(item,i) in label">
				{{item.label}}
			</option>
		</select> -->
    {{cityResult}}

    <div>
      <input type="text" v-model="oneValue" />
    </div>

    <ul>
      <li v-for="(item,i) in cityList" @click="clickCity(item.label)">{{item.label}}</li>
    </ul>

    <ul>
      <li v-for="(item,i) in twoList" @click="clickCity2(item.label)">{{item.label}}</li>
    </ul>

    <!-- <select v-model="twoValue" @clicke="clickCity2()">
			<option v-for="(item,i) in twoList">
				{{item.label}}
			</option>
		</select> -->

    <ul>
      <li v-for="(item,i) in freeList"  @click="clickCity3(item.label)">{{item.label}}</li>
    </ul>

    <!-- <select v-model="freeValue">
			<option v-for="(item,i) in freeList">
				{{item.label}}
			</option>
		</select> -->
  </div>
</template>

<script>
var _this = this;
export default {

  data() {
    return {
      cityResult:"",
      oneValue: "",
      twoValue: "",
      freeValue: "",
      twoList: [],
      freeList: [],
      cityList: [
        {
          label: "福建省",
          children: [
            {
              label: "龙岩市",
              children: [
                {
                  label: "永定区"
                },
                {
                  label: "新罗区"
                },
                {
                  label: "上杭县"
                }
              ]
            },
            {
              label: "厦门市",
              children: [
                {
                  label: "湖里区"
                },
                {
                  label: "思明区"
                }
              ]
            }
          ]
        },
        {
          label: "河北省",
          children: [
            {
              label: "邯郸市",
              children: [
                {
                  label: "金水2区"
                },
                {
                  label: "二七2区"
                }
              ]
            },
            {
              label: "北京市",
              children: [
                {
                  label: "北京3区"
                },
                {
                  label: "北京3区"
                }
              ]
            }
          ]
        },
        {
          label: "西藏省",
          children: [
            {
              label: "拉萨市",
              children: [
                {
                  label: "拉萨1区"
                },
                {
                  label: "拉萨2区"
                }
              ]
            },
            {
              label: "准格尔市",
              children: [
                {
                  label: "准格尔3区"
                },
                {
                  label: "准格尔3区"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  mounted() {
    _this = this;
    _this.oneValue = "福建省";
    _this.clickCity(_this.oneValue);
   
  },
  methods: {
    clickCity(val) {
      //我先定义一个变量为this，因为需要获取一开始的this，为了让this指向不会错误
      let item;
      _this.oneValue = val;

      console.log("_this.oneValue", _this.oneValue);
      _this.cityList.forEach(function(value) {
        if (value.label == _this.oneValue) {
          item = value;
        }
      });
      if (item) {
        _this.twoList = item.children;
        _this.twoValue = item.children[0].label;
        console.log("this.twoValue", _this.twoValue);
        //  if (item.children.length > 0) {
        // _this.twoList = item.children;
        // _this.twoValue = item.children[0].label;
        // console.log("this.twoValue", _this.twoValue);
        //  }
        //  else {
        //   _this.twoValue = "";
        //   _this.twoList=[];
        //    console.log("ccthis.twoList", _this.twoList);
        // }
      }

       _this.clickCity1();
    },
    clickCity1() {
      let item;
      _this.twoList.forEach(function(value) {
        console.log("aabb", _this.twoValue);
        if (value.label == _this.twoValue) {
          item = value;

          console.log("aavaluevalue", value);
        }
      });
      if (item) {
        console.log("aaitem", item);
        if (item.children.length > 0) {
          _this.freeList = item.children;
          _this.freeValue = item.children[0].label;
        
        } else {
          _this.freeValue = "";
           _this.freeList=[];
            console.log("aathis.freeValue", _this.freeValue);
        }
      }
    },
    clickCity2(val) {
      let item;
      _this.twoValue = val;
      _this.twoList.forEach(function(value) {
        console.log("bb", _this.twoValue);
        if (value.label == _this.twoValue) {
          item = value;

          console.log("valuevalue", value);
        }
      });
      if (item) {
        console.log("item", item);
        if (item.children.length > 0) {
          _this.freeList = item.children;
          _this.freeValue = item.children[0].label;
         
        } else {
          _this.freeValue = "";
          _this.freeList=[];
           console.log("ccthis.freeValue", _this.freeValue);
        }
      }
    },
    clickCity3(val)
    {
       _this.cityResult=_this.oneValue+_this.twoValue+val;
          console.log(" _this.cityResult",  _this.cityResult);
    },
  }
};
</script>

<style scoped>
ul {
  width: 100px;
  float: left;
}
ul li {
  width: 87px;
  text-align: right;
  height: 40px;
}
ul li a {
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
}
li a:hover {
  color: #e621ed;
}

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