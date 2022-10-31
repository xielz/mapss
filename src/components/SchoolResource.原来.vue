<template>
    <div class="matter-content">
        <div class="matter">
            <div class="item" v-for="(item,index) in politicalCountList" :key="index">
                <span class="lab">{{item.name}}</span>
                <span class="number">{{item.politicalCount}}</span>
            </div>
        </div>
        <div class="major-outer">
            <div class="major-main">
                <div class="navoption">
                    <div class="item" :class="{ on: currentIndex === index }" v-for="(item,index) in navList" :key="index" @Click="navStateClick(item,index)">
                        <span class="lab">{{item.name}}</span>
                    </div>
                </div>
                <div class="course" v-if="currentIndex==0">
                    <div class="lf">
                        <ul>
                            <li class="lis" :class="{ act: currentSonIndex === index }" v-for="(item,index) in specialtyList" :key="index" @Click="sonStateClick(item,index)">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="rg">
                        <div class="title">
                            <router-link to="/MajorResource" class="link-resource">专业资源</router-link>
                            <h2 class="caption">电子信息工程技术专业课程地图</h2>
                            <span></span>
                        </div>

                        <div class="content">
                            <div class="son" v-for="(item,index) in lessonList" :key="index">
                                <div class="lesson">{{item.majorname}}</div>
                                <div class="lesson-item">
                                    <router-link to="/" class="lesson-link" v-for="(its,ind) in item.interest" :key="ind">{{its.lessonName}}</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="course" v-else>
                    <div class="rg">
                        <div class="title">
                            <span></span>
                            <!-- <router-link to="/MajorResource" class="link-resource">专业资源2</router-link> -->
                            <h2 class="caption">现代商贸专业群课程地图</h2>
                            <span></span>
                        </div>

                        <div class="content content2">
                            <div class="lfs">
                                <div class="son" v-for="(item,index) in lessonList" :key="index">
                                    <div class="lesson">{{item.majorname}}</div>

                                    <!-- <div class="lesson-item">
                                       
                                        <router-link to="/" class="lesson-link" v-for="(its,ind) in item.interest" :key="ind">
                                            {{its.lessonName}}</router-link>
                                    </div> -->
                                    <!-- <div class="lesson-son-item">
                                <div class="nterest" v-for="(its,ind) in item.solidInterest" :key="ind">{{its.nterestName}}</div>
                          
                                    <div class="protype" v-for="(its2,ind2) in item.solidInterest.proTypeName" :key="ind2">{{its2}}</div>
                                </div> -->

                                    <div class="lesson-son-main lesson-item">
                                        <div class="lesson-sub">  
                                        <router-link to="/MajorResource" class="link-son-resource">资源</router-link>
                                        <div class="lesson-son-item">
                                            <div class="nterest">早期教育</div>
                                            <div class="protype">
                                                <router-link to="/" class="protype-link">顶岗实习</router-link>
                                                <router-link to="/" class="protype-link">顶岗实习2</router-link>
                                            </div>
                                        </div>
                                         </div>
                                    </div>

                                    <!-- <div class="lesson-item">
                                       
                                        <router-link to="/" class="lesson-link" v-for="(its,ind) in item.interest" :key="ind">
                                            {{its.lessonName}}</router-link>
                                    </div> -->

                                </div>
                            </div>
                            <div class="mutual">高层互选</div>
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
      politicalCountList: [
        {
          name: "思政元素",
          politicalCount: "8526"
        },
        {
          name: "素材",
          politicalCount: "1726"
        }
      ],

      navList: [
        {
          name: "独立专业"
        },
        {
          name: "现代商贸专业群"
        },
        {
          name: "幼儿教育专业群"
        },
        {
          name: "信息互联专业群"
        },
        {
          name: "智慧建造专业群"
        }
      ],
      currentIndex: 1,
      specialtyList: [
        {
          name: "电子信息工程技术"
        },
        {
          name: "营养与食品检测"
        },
        {
          name: "电梯工程技术"
        }
      ],

      currentSonIndex: 0,
      lessonList: [
        {
          majorname: "专业拓展课",
          interest: [
            {
              lessonName: "社会主义发展史"
            },
            {
              lessonName: "HTML5布局与设计"
            },
            {
              lessonName: "网页编程"
            },
            {
              lessonName: "PHP应用开发"
            },
            {
              lessonName: "Python编程基础"
            },
            {
              lessonName: "社会主义发展史"
            },
            {
              lessonName: "HTML5布局与设计"
            },
            {
              lessonName: "网页编程"
            },
            {
              lessonName: "PHP应用开发"
            },
            {
              lessonName: "Python编程基础"
            }
          ],
          solidInterest: [
            {
              nterestName: "电子商务",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                },
                {
                  typename: "毕业设计2"
                }
              ]
            },
            {
              nterestName: "市场营销",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                }
              ]
            },
            {
              nterestName: "大数据与会计",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                },
                {
                  typename: "毕业设计2"
                }
              ]
            }
          ]
        },
        {
          majorname: "专业拓展课1111",
          interest: [
            {
              lessonName: "社会主义发展史"
            },
            {
              lessonName: "HTML5布局与设计"
            },
            {
              lessonName: "网页编程"
            },
            {
              lessonName: "PHP应用开发"
            },
            {
              lessonName: "Python编程基础"
            },
            {
              lessonName: "社会主义发展史"
            },
            {
              lessonName: "HTML5布局与设计"
            },
            {
              lessonName: "网页编程"
            },
            {
              lessonName: "PHP应用开发"
            },
            {
              lessonName: "Python编程基础"
            }
          ],
          solidInterest: [
            {
              nterestName: "电子商务",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                },
                {
                  typename: "毕业设计2"
                }
              ]
            },
            {
              nterestName: "市场营销",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                }
              ]
            },
            {
              nterestName: "大数据与会计",
              proTypeName: [
                {
                  typename: "顶岗实习"
                },
                {
                  typename: "毕业设计"
                },
                {
                  typename: "毕业设计2"
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
    //  _this.politicalCount();
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
    navStateClick(item, index) {
      //   if (item.id == "-1") {
      //     _this.sourceId = "";
      //   } else {
      //     _this.sourceId = item.id;
      //   }
      _this.currentIndex = index;
      //   _this.skipCount = 1;
      //   _this.getMajorResourceList();
    },
    sonStateClick(item, index) {
      //   if (item.id == "-1") {
      //     _this.sourceId = "";
      //   } else {
      //     _this.sourceId = item.id;
      //   }
      _this.currentSonIndex = index;
      //   _this.skipCount = 1;
      //   _this.getMajorResourceList();
    }
  }
};
</script>

<style lang="less" scoped>
.matter-content {
  padding: 20px;
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
    padding: 14px 10px 0 23px;
    border-radius: 6px;
    margin-right: 18px;

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
      background: #ffffff url(../../static/images/matter8.png) no-repeat right 16px center;
      .number {
        color: #e93c3a;
      }
    }
    &:nth-child(2) {
      background: #ffffff url(../../static/images/matter9.png) no-repeat right 16px center;
      .number {
        color: #ad61f4;
      }
    }
    &:nth-child(3) {
      background: #ffffff url(../../static/images/matter10.png) no-repeat right 16px center;
      .number {
        color: #fd7ca2;
      }
    }
    &:nth-child(4) {
      background: #ffffff url(../../static/images/matter11.png) no-repeat right 16px center;
      .number {
        color: #4ed29a;
      }
    }
    &:nth-child(5) {
      background: #ffffff url(../../static/images/matter12.png) no-repeat right 16px center;
      .number {
        color: #febc01;
      }
    }
    &:nth-child(6) {
      background: #ffffff url(../../static/images/matter13.png) no-repeat right 16px center;
      .number {
        color: #47adf2;
      }
    }
    &:nth-child(7) {
      background: #ffffff url(../../static/images/matter14.png) no-repeat right 16px center;
      .number {
        color: #617dee;
      }
    }
    &:nth-child(8) {
      background: #ffffff url(../../static/images/matter8.png) no-repeat right 16px center;
      .number {
        color: #e93c3a;
      }
    }
    &:nth-child(9) {
      background: #ffffff url(../../static/images/matter9.png) no-repeat right 16px center;
      .number {
        color: #ad61f4;
      }
    }
    &:nth-child(10) {
      background: #ffffff url(../../static/images/matter10.png) no-repeat right 16px center;
      .number {
        color: #fd7ca2;
      }
    }
    &:nth-child(11) {
      background: #ffffff url(../../static/images/matter11.png) no-repeat right 16px center;
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

    &::before {
    content: "";
    width: 1px;
    height:100%;
    position: absolute;
    bottom: -11px;
    left: 0;
 background: greenyellow;
  transform: skew(0deg);
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
        top: -5px;
        height: 151%;
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
    .lis {
      line-height: 45px;
      color: #565656;
      text-align: left;
      display: block;
      padding-left: 16px;
      font-size: 18px;
      cursor: pointer;
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

      .son:nth-child(1n) .lesson {
        background: #ea473b;
      }
      .son:nth-child(2n) .lesson {
        background: #b061f3;
      }
      .son:nth-child(3n) .lesson {
        background: #fd7fa1;
      }
      .son:nth-child(4n) .lesson {
        background: #47adf2;
      }
      .son:nth-child(5n) .lesson {
        background: #febc02;
      }
      .son:nth-child(6n) .lesson {
        background: #ea473b;
      }
      .son:nth-child(7n) .lesson {
        background: #b061f3;
      }
      .son:nth-child(8n) .lesson {
        background: #fd7fa1;
      }
      .son:nth-child(9n) .lesson {
        background: #47adf2;
      }
      .son:nth-child(10n) .lesson {
        background: #febc02;
      }
      .son:nth-child(11n) .lesson {
        background: #ea473b;
      }
      .son:nth-child(12n) .lesson {
        background: #b061f3;
      }
      .son:nth-child(13n) .lesson {
        background: #fd7fa1;
      }
      .son:nth-child(14n) .lesson {
        background: #47adf2;
      }
      .son:nth-child(15n) .lesson {
        background: #febc02;
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
      .lesson-item 
      {
        flex: 1;
        padding: 20px 20px 0 20px;
        .lesson-link {
          background: #ffffff;
          font-size: 16px;
          color: #303030;
          width: 18.5%;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          margin-bottom: 16px;
          margin-right: 16px;
          text-align: center;

          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }

      .son:nth-child(1n) .lesson-item {
        background: #fff2f1;
      }
      .son:nth-child(2n) .lesson-item {
        background: #f0e4fb;
        .nterest {
          color: #b061f3;
        }
        .protype-link {
          border: 1px solid #b061f3;
                   &::before{
 background: #B061F3;
 }
        }
        .lesson-sub{
            background: linear-gradient(180deg, #E7CEFF 0%, #F0E4FB 100%);
        }



      }
      .son:nth-child(3n) .lesson-item {
        background: #fd7fa1;

        .nterest {
          color: #fd7fa1;
        }
        .protype-link {
          border: 1px solid #fd7fa1;
                           &::before{
 background: #FD7FA1;
 }
        }
            .lesson-sub{
     background: linear-gradient(180deg, #FCD1DD 0%, #FFE6ED 100%);
        }

      }
      .son:nth-child(4n) .lesson-item {
        background: #47adf2;
      }
      .son:nth-child(5n) .lesson-item {
        background: #febc02;
      }

      .son:nth-child(6n) .lesson-item {
        background: #fff2f1;
      }
      .son:nth-child(7n) .lesson-item {
        background: #f0e4fb;
      }
      .son:nth-child(8n) .lesson-item {
        background: #fd7fa1;
      }
      .son:nth-child(9n) .lesson-item {
        background: #47adf2;
      }
      .son:nth-child(10n) .lesson-item {
        background: #febc02;
      }
      .son:nth-child(11n) .lesson-item {
        background: #fff2f1;
      }
      .son:nth-child(12n) .lesson-item {
        background: #f0e4fb;
      }
      .son:nth-child(13n) .lesson-item {
        background: #fd7fa1;
      }
      .son:nth-child(14n) .lesson-item {
        background: #47adf2;
      }
      .son:nth-child(15n) .lesson-item {
        background: #febc02;
      }
    }

    .content2 {
      display: flex;
      .lfs {
        flex: 1;
      }
      .lesson-son-main{
          display: flex;
      }
      .lesson-sub{
         width: 25%;    padding: 10px 10px;
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
          &:last-child::before{
          width: 0;
          height: 0;
          } 
          }
        }
      }

      //  <div clas="lesson-son-main">
      //                                  <router-link to="/MajorResource" class="link-son-resource">专业资源</router-link>
      //                                  <div class="lesson-son-item">
      //                                 <div class="nterest">早期教育</div>
      //                                     <div class="protype">
      //                                          <router-link to="/" class="protype-link">顶岗实习</router-link>
      //                                          <router-link to="/" class="protype-link">顶岗实习2</router-link>
      //                                     </div>
      //                                 </div>
      //                                  </div>
    }
  }
}
</style>
