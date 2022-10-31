<template>
  <div class="major-main">
    <div class="matter">
      <div class="item" v-for="(item,index) in politicalCountList" :key="index"  @click="skipCourse(item)">
        <span class="lab">{{item.name}}库</span>
        <span class="number">{{item.politicalCount}}</span>
      </div>
    </div>

    <div class="major">
      <div class="major-item">
        <div class="title">专业群</div>
        <div class="content">
          <ul class="majorul">
            <li v-for="(item,index) in oneList" @click="queryMajor(item,index)" :key="index" class="list" :class="{on:currentIndex === index }">
              {{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="major-item">
        <div class="title">专业</div>
        <div class="content">
          <ul class="majorul">
            <li v-for="(item,index) in twoList" @click="queryCourse(item.id,index)" @dblclick="doubleMajor(item.id,item.professionalName)" :key="index" class="list" :class="{on:currentIndex2 === index }">{{item.professionalName}}</li>
          </ul>
        </div>
      </div>
      <div class="major-item">
        <div class="title">课程</div>
        <div class="content">
          <ul class="majorul">
            <li v-for="(item,index) in freeList" @click="archivesId(item.archivesId,index)" @dblclick="doubleCourse(item.archivesId,item.archivesName)" :key="index" class="list" :class="{on:currentIndex3 === index }">{{item.archivesName}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var _this = this;
export default {
  data() {
    return {
      politicalCountList: [],
      currentIndex: 0,
      currentIndex2: 0,
      currentIndex3: 0,
      cityResult: "",
      oneValue: "",
      twoValue: "",
      freeValue: "",
      twoList: [],
      freeList: [],
      oneList: [
        // {
        //   label: "福建省",
        //   children: [
        //     {
        //       label: "龙岩市",
        //       children: [
        //         {
        //           label: "永定区"
        //         },
        //         {
        //           label: "新罗区"
        //         },
        //         {
        //           label: "上杭县"
        //         }
        //       ]
        //     },
        //     {
        //       label: "厦门市",
        //       children: [
        //         {
        //           label: "湖里区"
        //         },
        //         {
        //           label: "思明区"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   label: "河北省",
        //   children: [
        //     {
        //       label: "邯郸市",
        //       children: [
        //         {
        //           label: "金水2区"
        //         },
        //         {
        //           label: "二七2区"
        //         }
        //       ]
        //     },
        //     {
        //       label: "北京市",
        //       children: [
        //         {
        //           label: "北京3区"
        //         },
        //         {
        //           label: "北京3区"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   label: "西藏省",
        //   children: [
        //     {
        //       label: "拉萨市",
        //       children: [
        //         {
        //           label: "拉萨1区"
        //         },
        //         {
        //           label: "拉萨2区"
        //         }
        //       ]
        //     },
        //     {
        //       label: "准格尔市",
        //       children: [
        //         {
        //           label: "准格尔3区"
        //         },
        //         {
        //           label: "准格尔3区"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
    _this = this;
    _this.oneValue = "福建省";
    // _this.clickCity(_this.oneValue,0);
    _this.politicalCount();

    _this.queryMajorGroup();

    //_this.queryMajor();
  },

  methods: {
    politicalCount() {
      _this.politicalCountList = [];
      _this.$axios
        .get(_this.$api.politicalCount, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.politicalCountList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    queryMajorGroup() {
      _this.oneList = [];
      _this.$axios
        .get(_this.$api.queryMajorGroup, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.oneList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    queryMajor(item, index) {
      console.log("item", item);
      _this.currentIndex = index;
      _this.currentIndex2 = 0;
      _this.currentIndex3 = 0;
      _this.twoList = [];
      _this.freeList = [];
     
      var kk = item.sourceType;
      console.log("kk",kk)
      if (kk == "03") {
        var params = {
          sourceType: item.sourceType,
          groupId: item.groupId
        };
        this.getQueryMajor(params);
      } else {
        var params = {
          sourceType: item.sourceType
        };
        this.getQueryMajor(params);
      }
    },

    getQueryMajor(parame) {
      this.$axios
        .get(this.$api.queryMajor, {
          params: parame
        })
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.twoList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    queryCourse(id, index) {
      _this.currentIndex3 = 0;
      _this.currentIndex2 = index;
      _this.freeList = [];
      this.$axios
        .get(_this.$api.queryCourse, {
          params: {
            ProfessionalId: id
          }
        })
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.freeList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    archivesId(id, index) {
      _this.currentIndex3 = index;
    },

    clickCity(val, index) {
      _this.currentIndex2 = 0;
      _this.currentIndex3 = 0;
      //我先定义一个变量为this，因为需要获取一开始的this，为了让this指向不会错误
      let item;
      _this.oneValue = val;
      _this.currentIndex = index;

      console.log("_this.oneValue", _this.oneValue);
      _this.oneList.forEach(function(value) {
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
          _this.freeList = [];
          console.log("aathis.freeValue", _this.freeValue);
        }
      }
    },
    clickCity2(val, index) {
      _this.currentIndex3 = 0;
      let item;
      _this.twoValue = val;
      _this.currentIndex2 = index;
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
          _this.freeList = [];
          console.log("ccthis.freeValue", _this.freeValue);
        }
      }
    },
    doubleMajor(id, name) {
      _this.$router.push({ path: "/MajorResource", query: { majorId: id, majorName: name } });
    },
    // doubleCourse(item.archivesId,item.archivesName)
    doubleCourse(id, name) {
      _this.$router.push({ path: "/CourseResource", query: { majorId: id, majorName: name } });
    },
    clickCity3(val, index) {
      _this.currentIndex3 = index;
      _this.cityResult = _this.oneValue + _this.twoValue + val;
      console.log(" _this.cityResult", _this.cityResult);
    },
    skipCourse(item) {
      _this.$router.push({ path: "/NavCountResource", query: { sourceId: item.id } });
    },
  }
};
</script>

<style>
</style>


<style   scoped>
.pc-sel-area-cascader {
  border: 0;
  background: #ffffff;
  position: relative;
  width: 100%;
}

.pc-sel-area-cascader >>> .el-cascader-panel {
  width: 543px;
}
.pc-sel-area-cascader >>> .el-cascader-menu__wrap {
  height: 305px;
}
.pc-sel-area-cascader >>> .el-cascader-menu {
  border: none;
  background: #fff9f8;
  width: 33.333%;
  margin-right: 27px;
}

.pc-sel-area-cascader >>> .el-cascader-menu:last-child {
  margin-right: 0;
}

.pc-sel-area-cascader >>> .el-cascader-menu:after {
  content: "55";
  width: 16px;
  height: 38px;
  display: inline-block;

  background: url(../../static/images/max-right-arrow.png) center no-repeat;
  position: absolute;
  right: -21px;
  top: 50%;
  z-index: 999899999999999999999999;
}

.pc-sel-area-cascader >>> .el-scrollbar__thumb {
  display: none;
}
.pc-sel-area-cascader >>> .el-cascader-node {
  height: 40px;
}
.pc-sel-area-cascader >>> .el-cascader-node:hover {
  color: #4e5ef1;
}
.pc-sel-area-cascader >>> .el-cascader-node__label {
  padding: 0 7px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}

.pc-sel-area-cascader >>> .el-cascader-node.in-active-path,
.pc-sel-area-cascader >>> .el-cascader-node.is-active,
.pc-sel-area-cascader >>> .el-cascader-node.is-selectable.in-checked-path {
  color: #e32806;
}

.pc-sel-area-cascader >>> .el-cascader-node:hover {
  color: #e32806;
  background: none;
}

.pc-sel-area-cascader >>> .el-icon-check {
  display: none;
}
.pc-sel-area-cascader >>> .el-icon-arrow-right {
  display: none;
}

.pc-sel-area-cascader >>> .pc-sel-area-cascader[x-placement^="bottom"] {
  margin-top: 1px !important;
}
.pc-sel-area-cascader >>> .pc-sel-area-cascader[x-placement^="bottom"] .popper__arrow {
  display: none;
}
</style>



<style lang="less" scoped>
.matter {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  /deep/.el-cascader-panel {
    background: red !important;
  }

  .item {
    width: 14.28%;
    height: 116px;
    padding: 14px 10px 0 23px;
    border-radius: 6px;
    margin-right: 18px;
    cursor: pointer;
    .lab {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      display: block;
      margin-bottom: 18px;
    }
    .number {
      font-size: 36px;
      font-weight: 700;
      color: rgba(255, 255, 19, 1);
      display: block;
    }
    &:nth-child(1) {
      background: url(../../static/images/matter1.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(2) {
      background: url(../../static/images/matter2.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(3) {
      background: url(../../static/images/matter3.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(4) {
      background: url(../../static/images/matter4.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(5) {
      background: url(../../static/images/matter5.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(6) {
      background: url(../../static/images/matter6.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
    &:nth-child(7) {
      background: url(../../static/images/matter7.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
      &:nth-child(8) {
      background: url(../../static/images/matter1.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);

    }
         &:nth-child(9) {
      background: url(../../static/images/matter2.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
      &:nth-child(10) {
      background: url(../../static/images/matter3.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }
     &:nth-child(11) {
      background: url(../../static/images/matter4.png) right no-repeat, linear-gradient(180deg, rgba(246, 48, 43, 1) 0%, rgba(255, 108, 42, 1) 100%);
    }


    &:last-child {
      margin-right: 0;
    }
  }
}
.major {
  height: 706px;
  overflow: hidden;
  // max-height: 620px;
  // overflow-y:scroll;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  padding: 24px;
  display: flex;

  .major-item {
    width: 33.333%;
    margin-right: 27px;
    background: rgba(255, 249, 248, 1);
    position: relative;
    .title {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      line-height: 60px;
      background: rgba(251, 77, 43, 1);
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      text-align: center;
    }

    .content {
      background: rgba(255, 249, 248, 1);
      padding: 12px 24px;
      height: 605px;
      // max-height: 509px;
      overflow-y: scroll;

      .majorul {
        .list {
          color: rgba(48, 48, 48, 1);
          font-size: 16px;
          line-height: 24px;
          line-height: 40px;
          cursor: pointer;
        }

        // .list:first-child {
        //   color: rgba(227, 40, 6, 1);
        // }
        .on {
          color: rgba(227, 40, 6, 1);
        }
      }
    }

    .content::-webkit-scrollbar {
      width: 0;
    }
    &:last-child {
      margin-right: 0;

      &:after {
        background: none;
      }
    }

    &:after {
      content: " ";
      width: 16px;
      height: 38px;
      display: inline-block;

      background: url(../../static/images/max-right-arrow.png) center no-repeat;
      position: absolute;
      right: -21px;
      top: 50%;
    }
  }
}
</style>


