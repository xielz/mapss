<template>
    <div class="matter-content">
        <div class="matter">
            <div class="item" v-for="(item,index) in politicalCountList" :key="index" @click="skipCourse(item)">
                <span class="lab">{{item.name}}库</span>
                <span class="number">{{item.politicalCount}}</span>
            </div>
        </div>

        <div class="major-outer">
            <div class="major-main">
                <div class="navoption">
                    <div class="item" :class="{ on: currentIndex === index }" v-for="(item,index) in navList" :key="index" @Click="navStateClick(item,index)" v-preventReClick>
                        <span class="lab">{{item.name}}</span>
                    </div>
                </div>
                <div class="course" v-if="currentIndex==0">
                    <div class="lf">
                        <ul>
                            <!-- @click="queryCourse(item.id,index)" -->
                            <li class="lis" :class="{ act: currentSonIndex === index }" v-for="(item,index) in specialtyList" :key="index" @Click="queryCourse(item,index)" v-preventReClick>
                                {{item.professionalName}}
                            </li>
                        </ul>
                    </div>
                    <div class="rg">
                        <div class="title">
                            <router-link  :to="{path: '/MajorResource', query: { majorId: querymajorId,majorName: querymajorName}}" class="link-resource">专业资源</router-link>
                            <h2 class="caption">{{navName}}课程地图</h2>
                            <span></span>
                        </div>

                        <div class="content">
                            <div class="son order-content" v-for="(item,index) in lessonList" :key="index">
                                <div class="lesson">{{item.courseCategoryLabel}}</div>
                                <div class="lesson-item">
                                    <div v-if="item.archives.length>0">
                                        <router-link :to="{path: '/CourseResource', query: { majorId: its.archivesId,majorName: its.archivesName }}" class="lesson-link" v-for="(its,ind) in item.archives" :key="ind">
                                            {{its.archivesName}} </router-link>
                                    </div>
                                    <div v-if="item.archives.length==0" class="noda">
                                        暂无资源
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="course" v-else>
                    <div class="rg">
                        <div class="title">
                            <span></span>
                            <h2 class="caption">{{navName}}课程地图</h2>
                            <span></span>
                        </div>
                        <div class="content content2">
                            <div class="lfs">
                                <div class="son" v-for="(item,index) in groupList" :key="index">
                                    <div class="order" v-if="item.archives.length>0">
                                        <div class="order-content" v-for="(i,inds) in item.archives" :key="inds">
                                            <div class="order-item">
                                                <div class="lesson">{{i.courseCategoryLabel}}</div>
                                                <div class="order-rg pd0">
                                                    <div class="lesson-item mgl0" v-if="i.archives.length>0">
                                                        <router-link :to="{path: '/CourseResource', query: { majorId: j.archivesId,majorName: j.archivesName }}" class="lesson-link" v-for="(j,ind) in i.archives" :key="ind">
                                                            {{j.archivesName}}</router-link>
                                                    </div>

                                                    <div class="lesson-item mgl0 group-noda" v-if="i.archives.length==0">
                                                        暂无资源
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="order" v-if="item.middle.length>0">
                                        <div class="order-content" v-for="(k,index) in item.middle" :key="index">
                                            <div class="order-item">
                                                <div class="lesson">{{k.courseCategoryLabel}}</div>
                                                <div class="order-rg" v-if="k.archives.length>0">
                                                    <div class="lesson-son-main lesson-item" v-for="(h,ind) in k.archives" :key="ind">
                                                        <div class="lesson-sub lesson-son-sub">
                                                            <router-link :to="{path: '/MajorResource', query: { majorId: h.professionalId,majorName: h.professionalName}}" class="link-son-resource">资源</router-link>
                                                            <div class="lesson-son-item">
                                                                <div class="nterest">{{h.professionalName}}</div>

                                                                <div class="protype">
                                                                    <router-link :to="{path: '/CourseResource', query: { majorId: h1.archivesId,majorName: h1.archivesName }}" class="protype-link" v-for="(h1,ind) in h.archives" :key="ind">{{h1.archivesName}}</router-link>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="order-rg" v-if="k.archives.length==0">
                                                    <div class="group-noda">
                                                        暂无资源
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mutual">{{item.type}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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

      navList: [],
      navName: "",
      currentIndex: 0,
      specialtyList: [],

      currentSonIndex: 0,
      lessonList: [],
      groupList: [],

      querymajorId:"",
      querymajorName:"",

    };
  },
  mounted() {
    _this = this;
    _this.politicalCount();
    _this.queryMajorGroup();
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
    skipCourse(item) {
      _this.$router.push({ path: "/NavCountResource", query: { sourceId: item.id } });
    },
    navStateClick(item, index) {
      _this.currentIndex = index;
      _this.navName = item.name;
      if (_this.currentIndex == 0) {
        _this.specialtyList = [];
        _this.getAdjResource(item.sourceType);
      } else {
        _this.groupList = [];
        _this.getAadjResourceGroup(item.groupId);
      }
    },
    queryMajorGroup() {
      _this.navList = [];
      _this.$axios
        .get(_this.$api.adjResourceMap, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.navList.push(data[i]);
              }
            }
            _this.specialtyList = [];
            _this.getAdjResource(_this.navList[0].sourceType);
            _this.navName = _this.navList[0].name;

            

            setTimeout(function() {
              _this.queryCourse2(_this.specialtyList[0].id);
             _this.querymajorId= _this.specialtyList[0].id;
            _this.querymajorName= _this.specialtyList[0].professionalName;
            }, 500);
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    getAdjResource(parame) {
      this.$axios
        .get(this.$api.queryMajor + "?sourceType=" + parame)
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.specialtyList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    getAadjResourceGroup(parame) {
      this.$axios
        .get(this.$api.adjResourceGroup + "/" + parame)
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.groupList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    queryCourse(item, index) {
        console.log("item",item);
//         id: "a966f903-eb32-4ae9-abdc-34f02868fbed"
// pid: "82a247c9-f23d-46ae-be57-147f0b0cdbb0"
// professionalName: "种子生产与经营"
_this.querymajorId=item.id;
_this.querymajorName=item.professionalName;

      _this.currentSonIndex = index;
      _this.lessonList = [];
      this.$axios
        .get(_this.$api.adjResource + "/" + item.id, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.lessonList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    queryCourse2(item) {
      _this.lessonList = [];
      _this.$axios
        .get(_this.$api.adjResource + "/" + item, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              for (var i = 0; i < data.length; i++) {
                _this.lessonList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.matter-content {
  padding: 20px;
  min-width: 1625px;
}
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
    padding: 14px 10px 0 15px;
    border-radius: 6px;
    margin-right: 18px;
    cursor: pointer;
    .lab {
      color: #303030;
      font-size: 18px;
      display: block;
      margin-bottom: 18px;
    }
    .number {
      font-size: 36px;
      font-weight: 700;
      display: block;
    }
    &:nth-child(1) {
      background: #ffffff url(../../static/images/matter8.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #e93c3a;
      }
    }
    &:nth-child(2) {
      background: #ffffff url(../../static/images/matter9.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #ad61f4;
      }
    }
    &:nth-child(3) {
      background: #ffffff url(../../static/images/matter10.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #fd7ca2;
      }
    }
    &:nth-child(4) {
      background: #ffffff url(../../static/images/matter11.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #4ed29a;
      }
    }
    &:nth-child(5) {
      background: #ffffff url(../../static/images/matter12.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #febc01;
      }
    }
    &:nth-child(6) {
      background: #ffffff url(../../static/images/matter13.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #47adf2;
      }
    }
    &:nth-child(7) {
      background: #ffffff url(../../static/images/matter14.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #617dee;
      }
    }
    &:nth-child(8) {
      background: #ffffff url(../../static/images/matter8.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #e93c3a;
      }
    }
    &:nth-child(9) {
      background: #ffffff url(../../static/images/matter9.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #ad61f4;
      }
    }
    &:nth-child(10) {
      background: #ffffff url(../../static/images/matter10.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #fd7ca2;
      }
    }
    &:nth-child(11) {
      background: #ffffff url(../../static/images/matter11.png) no-repeat right 10px center;
      background-size: 46px 46px;
      .number {
        color: #4ed29a;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
.major-outer {
  min-height: 748px;
}
.major-main {
  padding: 14px 10px 14px 23px;
  background: #ffffff;
  border-radius: 6px;
}

.navoption {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #df1c1c;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  .item {
    font-size: 18px;
    color: #565656;
    padding: 6px 18px;
    display: block;
    background: #f3f3f3;
    cursor: pointer;
    position: relative;
    transform: skew(30deg);
    border-right: 2px solid #ffffff;
    &:hover {
      color: #df1c1c;
    }

    &::before {
      //     content: "";
      //     width: 1px;
      //     height:100%;
      //     position: absolute;
      //     bottom: -11px;
      //     left: 0;
      //  background: greenyellow;
      //   transform: skew(0deg);
    }

    .lab {
      display: inline-block;
      transform: skew(-30deg);
    }
    &:first-child {
      background: url(../../static/images/navbg.png) no-repeat center;
      background-size: 100% 100%;
      transform: skew(0deg);
      .lab {
        padding: 0;
        transform: skew(0deg);
      }
      ::after {
        //        content: " ";
        // position: absolute;
        // left: -20px;
        // top: -6px;
        // height: 150%;
        // border-right: 18px solid #f3f3f3;
        /* transform: skew(
21deg);*/

        content: " ";
        position: absolute;
        right: -18px;
        top: -6px;
        height: 149%;
        border-right: 11px solid #f3f3f3;
        transform: skew(30deg);
      }
    }
  }
  .on {
    background: #df1c1c;
    color: #ffffff;
    &:first-child {
      background: url(../../static/images/navbgact.png) no-repeat center;
      background-size: 100% 100%;
      ::after {
        border-right: 11px solid #df1c1c;
      }
    }
    &:hover {
      color: #ffffff;
    }
  }
}
.course {
  display: flex;
  position: relative;
  margin-top: 14px;
  height: 700px;
  .lf {
    width: 208px;
    background: #f7f7f7;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    .lis {
      color: #565656;
      text-align: left;
      display: block;
      font-size: 18px;
      cursor: pointer;
      padding: 10px 0 10px 16px;
      &:hover {
        color: #df1c1c;
        background: #eeeeee;
      }
    }
    .act {
      color: #df1c1c;
      background: #eeeeee;
    }
  }
  .rg {
    flex: 1;
    background: #eeeeee;
    padding: 18px 18px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    .title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .link-resource {
        width: 96px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        color: #ffffff;
        display: inline-block;
        font-size: 14px;
        background: #df1c1c url(../../static/images/matter15.png) no-repeat left 10px center;
        text-align: center;
        padding-left: 20px;
      }
      .caption {
        display: inline-block;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        color: #303030;
      }
    }
    .content {
      .son {
        margin-bottom: 16px;
        display: flex;
      }
      .order-content:nth-child(1),
      .order-content:nth-child(6) {
        background: #fff2f1;
        .lesson {
          background: #ea473b;
        }
        .nterest {
          color: #fd7fa1;
        }
        .protype-link {
          border: 1px solid #ffe6ed;
          &::before {
            background: #fd7fa1;
          }
        }
        .lesson-sub {
          background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
        }
      }
      .order-content:nth-child(2),
      .order-content:nth-child(7) {
        background: #f0e4fb;
        .lesson {
          background: #b061f3;
        }
        .nterest {
          color: #b061f3;
        }
        .protype-link {
          border: 1px solid #b061f3;
          &::before {
            background: #b061f3;
          }
        }
        .lesson-sub {
          background: linear-gradient(180deg, #e7ceff 0%, #f0e4fb 100%);
        }
      }
      .order-content:nth-child(3),
      .order-content:nth-child(8) {
        background: #ffe6ed;
        .lesson {
          background: #fd7fa1;
        }
        .nterest {
          color: #ffe6ed;
        }
        .protype-link {
          border: 1px solid #ffe6ed;
          &::before {
            background: #fd7fa1;
          }
        }
        .lesson-sub {
          background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
        }
      }
      .order-content:nth-child(4),
      .order-content:nth-child(9) {
        background: #e2f3ff;
        .lesson {
          background: #47adf2;
        }
      }
      .order-content:nth-child(5),
      .order-content:nth-child(10) {
        background: #fffaee;
        .lesson {
          background: #febc02;
        }
      }
      .son:nth-child(1) {
        .order-content:nth-child(1) {
          background: #fff2f1;
          .lesson {
            background: #ea473b;
          }
          .nterest {
            color: #fd7fa1;
          }
          .protype-link {
            border: 1px solid #ffe6ed;
            &::before {
              background: #fd7fa1;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
          }
        }
        .order-content:nth-child(2) {
          background: #f0e4fb;
          .lesson {
            background: #b061f3;
          }
          .nterest {
            color: #b061f3;
          }
          .protype-link {
            border: 1px solid #b061f3;
            &::before {
              background: #b061f3;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #e7ceff 0%, #f0e4fb 100%);
          }
        }
        .order-content:nth-child(3) {
          background: #ffe6ed;
          .lesson {
            background: #fd7fa1;
          }
          .nterest {
            color: #ffe6ed;
          }
          .protype-link {
            border: 1px solid #ffe6ed;
            &::before {
              background: #fd7fa1;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
          }
        }
      }
      .son:nth-child(2) {
        .order-content:nth-child(1) {
          background: #f0e4fb;
          .lesson {
            background: #b061f3;
          }
          .nterest {
            color: #b061f3;
          }
          .protype-link {
            border: 1px solid #b061f3;
            &::before {
              background: #b061f3;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #e7ceff 0%, #f0e4fb 100%);
          }
        }
        .order-content:nth-child(2) {
          background: #ffe6ed;
          .lesson {
            background: #fd7fa1;
          }
          .nterest {
            color: #fd7fa1;
          }
          .protype-link {
            border: 1px solid #fd7fa1;
            &::before {
              background: #fd7fa1;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
          }
        }
      }
      .son:nth-child(3) {
        .order-content:nth-child(1) {
          background: #e2f3ff;
          .lesson {
            background: #47adf2;
          }
          .nterest {
            color: #ffe6ed;
          }
          .protype-link {
            border: 1px solid #ffe6ed;
            &::before {
              background: #fd7fa1;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
          }
        }
        .order-content:nth-child(2) {
          background: #fffaee;
          .lesson {
            background: #febc02;
          }
          .nterest {
            color: #ffe6ed;
          }
          .protype-link {
            border: 1px solid #ffe6ed;
            &::before {
              background: #febc02;
            }
          }
          .lesson-sub {
            background: linear-gradient(180deg, #fcd1dd 0%, #ffe6ed 100%);
          }
        }
      }
      .lesson {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        writing-mode: vertical-rl;
        padding: 16px 14px 14px 16px;
        letter-spacing: 7px;
        text-align: center;
        /*文字居中*/
        // display: inline-block;
        // height: 100%;
        /*文字居中*/
      }
      .lesson-item {
        flex: 1;
        position: relative;
        margin: 20px 20px 0 20px;
        .noda {
          text-align: center;
          color: #303030;
          font-size: 16px;
          position: absolute;
          top: 41%;
          left: 50%;
        }
        .lesson-link {
          background: #ffffff;
          font-size: 16px;
          color: #303030;
          /* width: 18.5%; */
          display: inline-block;
          height: 40px;
          line-height: 40px;
          margin-bottom: 16px;
          margin-right: 16px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding: 0 5px;
          /* margin: 20px 20px 0px 0px; */
          width: calc((100% - 64px) / 5);
          &:nth-child(5n) {
            margin-right: 0;
          }
          &:hover {
            color: #df1c1c;
          }
        }
      }
    }
    .content2 {
      display: flex;
      .lfs {
        flex: 1;
      }
      .order {
        width: 100%;
        display: flex;
        display: block;
        .order-content {
          width: 100%;
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 0px;
          }
        }
        .order-item {
          display: flex;
        }
        .order-rg {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 0 20px 20px 20px;
          position: relative;
          .mgl0 {
            margin-left: 0;
            margin-right: 0;
          }
          .group-noda {
            text-align: center;
            color: #303030;
            font-size: 16px;
            position: absolute;
            top: 41%;
            left: 50%;
            margin-top: 0;
          }
        }
        .pd0 {
          padding-bottom: 0;
        }
        .lesson-son-sub {
          margin-bottom: 0px;
          width: 100%;
          height: 100%;
        }
      }
      .lesson-son-main {
        display: flex;
        width: 20%;
        flex: inherit;
        margin: 20px 20px 0px 0px;
        width: calc((100% - 60px) / 4);
        &:first-child {
          // margin-left: 20px;
        }
      }
      .lesson-son-main:nth-child(4n) {
        margin-right: 0;
      }
      .lesson-sub {
        width: 25%;
        padding: 10px 10px;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .mutual {
        background: #f3f3f3;
        font-size: 18px;
        font-weight: bold;
        color: #303030;
        writing-mode: vertical-rl;
        padding: 16px 30px 14px 30px;
        letter-spacing: 7px;
        text-align: center;
      }
      .lesson-son-main {
      }
      .link-son-resource {
        line-height: 21px;
        border-radius: 4px;
        color: #df1c1c;
        display: inline-block;
        font-size: 12px;
        border: 1px solid #df1c1c;
        background: url(../../static/images/matter16.png) no-repeat left 6px center;
        text-align: center;
        padding: 0px 5px 0px 20px;
      }
      .lesson-son-item {
        display: flex;
        align-items: center;
        margin: 15px 0 0 0;
        .nterest {
          margin-right: 10px;
          font-weight: bold;
          font-size: 16px;
        }
        .protype {
          .protype-link {
            display: block;
            background: #ffffff;
            font-size: 14px;
            color: #303030;
            line-height: 26px;
            margin-bottom: 10px;
            padding: 0px 10px;
            text-align: center;
            border-radius: 4px;
            position: relative;
            &::before {
              content: "";
              width: 1px;
              height: 11px;
              position: absolute;
              bottom: -11px;
              left: 47%;
            }
            &:last-child::before {
              width: 0;
              height: 0;
            }
            &:hover {
              color: #df1c1c;
            }
          }
        }
      }
    }
  }
}
</style>
