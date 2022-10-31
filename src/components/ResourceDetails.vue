<template>
  <div>

    <div class="major-head">
      <div class="caree">
        <div class="sort">
          <img src="../../static/images/material.png" class="careelf" />
          <div class="careerg">
            <div class="catah2">电子信息工程技术</div>
            <div class="catalog">内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介内容简介</div>

            <div class="star">
              <div style="width:67px">
                <i class="ico" :class="isMajorStar?'actico':''" @click="majorStar"></i>
                <span class="txt">{{majorStarTxt}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <div class="major-outer">
      <div class="major-main">
  <div class="major-state">
        <div class="state-item">
          <div class="item" :class="{ on: currentIndex === index }" v-for="(item, index) in previewList" :key="index" @Click="resourceStateClick(item,index)">{{item.fileName}}
          </div>
        </div>
        <div class="down" @click="download(item)" v-if="previewList.length>0">下载</div>
      </div>
       
        <showpreview :file="previewFile" v-if="previewFileShow"></showpreview>

        <div class="subitem" v-for="(item, index) in resourceList" :key="index">
          <div class="lf">
            <img class="img" :src="item.picture ? item.picture : defaultImg" :onerror="errorImage" />
          </div>
          <div class="rg">

            <div class="rgstar">
              <i class="ico" :class="isCourseStar?'actico':''" @click="courseStar"></i>
            </div>
            <div class="title">{{item.name}}</div>
            <!-- <div class="content" ref="detailDom">
              <div v-html="item.introduction"></div>
              <el-popover v-if="item.isMore" placement="right" :width="420" trigger="hover" :title="item.name">
                <div v-html="item.introduction" style="    line-height:25px; font-size:14px;
            max-height: 550px;
            overflow-y: auto;"></div>
                <template #reference>
                  <text class="ismore">详情</text>
                </template>
              </el-popover>
            </div>      -->
            <!-- <div class="online">
              <div class="accessory">
                <div class="lab">附件数：
                
                 <label class="number" v-if="item.attachment=='' || item.attachment==null">0</label>
                <label class="number" v-else>{{item.attachment.length}}</label>
                </div>
                <div class="lab pointer" v-if="item.attachment !==undefined && item.attachment != null && item.attachment.length > 0" @click="previewDialog(item.attachment)">
                  <i class="previewico"></i> 在线预览</div>
                <div class="lab pointer" v-if="item.attachment !==undefined && item.attachment != null && item.attachment.length > 0" @click="download(item)">
                  <i class="downico"></i> 下载</div>
                <div class="lab">{{item.creationTime.replace(/T/g, " ").substring(0,10)}}</div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="在线预览文件" v-model="dialogVisible" :visible.sync="previewFileShow" idth="80%" :modal-append-to-body='false' :close-on-press-escape='false' :close-on-click-modal='false' :before-close="dialogClose" style="height:auto">
      <div class="pvw">
        <div v-for="(item, index) in previewList" :key="index" class="item" @click="preview(item)" v-if="previewList.length>1">
          <div class="pvwname">{{item.fileName}}{{item.extName}}</div>
          <div class="pvwtxt">在线预览</div>
        </div>
      </div>
      <showpreview :file="previewFile" v-if="previewFileShow"></showpreview>
    </el-dialog>
  </div>
</template>

<script>
var _this = this;
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import showpreview from "./module/Preview";
export default {
  components: {
    ElConfigProvider,
    showpreview
  },
  data() {
    return {
      locale: zhCn,
      currentIndex: 0,
      majorId: "", //专业id
      sourceId: "", //资源类型id
      defaultImg: require("../../static/images/defaultImg.png"),
      errorImage: ' this.src=" ' + require("../../static/images/defaultImg.png") + ' " ',
      dialogVisible: false,
      previewFile: {}, // 传递的参数
      previewFileShow: false, // 默认预览框是关闭状态
      previewList: [{ fileName: "这是什么文件", extName: "doc" }, { fileName: "啦啦文件", extName: ".xml" }],
      isMajorStar: false, //收藏专业
      majorStarTxt: "收藏",
      isCourseStar: false //收藏课程课程
    };
  },
  mounted() {
    _this = this;
  },

  methods: {
    resourceStateClick(item, index) {
      if (item.id == "-1") {
        _this.sourceId = "";
      } else {
        _this.sourceId = item.id;
      }
      _this.currentIndex = index;

      _this.previewDialog(item);
    },

    download(item) {
      _this.$axios
        .get(_this.$api.download + "/" + item.id, {
          responseType: "arraybuffer"
        })
        .then(res => {
          if (res.status == 200) {
            console.log("ressss", res.data);
            // 组装a标签
            let elink = document.createElement("a");
            // 设置下载文件名
            // elink.download = name;
            elink.download = item.name + ".zip";
            elink.style.display = "none";
            let blob = new Blob([res.data], { type: "application/zip" });
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            document.body.removeChild(elink);
            _this.$message({
              type: "success",
              message: "下载"
            });
          }
        })
        .catch(error => {
          console.log("ccc", error);
        });
    },

    previewDialog(item) {
      _this.previewFile = {};
      _this.previewFileShow = false;
      _this.previewList = [];
      for (var i = 0; i < item.length; i++) {
        _this.previewList.push(item[i]);
      }

      _this.dialogVisible = true;

      if (_this.previewList.length == 1) {
        _this.previewFile = {};
        _this.previewFile = {
          downloadUrl: _this.$api.localPath + _this.previewList[0].downloadUrl.substring(1)
        };
        _this.previewFileShow = true;
      }
    },
    preview(item) {
      _this.previewFile = {};
      _this.previewFileShow = false;
      _this.previewFile = {
        downloadUrl: _this.$api.localPath + item.downloadUrl.substring(1)
        // downloadUrl:'http://gjj.xm.gov.cn/xzzx/gjjjc/201809/P020200810349156676806.xlsx'
      };
      // console.log(" _this.previewFile", _this.previewFile);
      setTimeout(function() {
        _this.previewFileShow = true;
      }, 100);
    },
    dialogClose() {
      _this.previewFileShow = false;
      _this.dialogVisible = false;
    },
    majorStar() {
      _this.isMajorStar = !_this.isMajorStar;
      console.log("_this.isMajorStar", _this.isMajorStar);
      if (_this.isMajorStar == true) {
        _this.majorStarTxt = "取消收藏";
      } else {
        _this.majorStarTxt = "收藏";
      }
    },
    courseStar() {
      _this.isCourseStar = !_this.isCourseStar;
    }
  }
};
</script>

<style lang="less" scoped>
.major-head {
  padding: 22px 25px 12px 25px;
  background: #ffffff;
  .caree {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #303030;
   
    .sort {
      display: flex;
      justify-content: space-between;
      .careelf {
        width: 160px;
        height: 160px;
        margin-right: 16px;
      }
      .careerg {
        .catah2 {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .catalog {
          font-size: 15px;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .star {
      display: flex;
      justify-content: flex-end;
      .ico {
        width: 30px;
        height: 30px;
        display: inline-block;
        background: url(../../static/images/star.png) center no-repeat;
        background-size: 30px 30px;
        margin: 0 auto;
        display: block;

        &:hover {
          cursor: pointer;
        }
      }
      .actico {
        background: url(../../static/images/actstar.png) center no-repeat;
        background-size: 30px 30px;
      }
      .txt {
        display: block;
        font-size: 15px;
        color: #303030;
        text-align: center;
      }
    }
  }

}

  .major-state {
    display: flex;
    display: flex;
    align-items: center;
    margin: 0 0 15px 0;
    position: relative;
    border-bottom: 2px solid #fb562a;
    justify-content: space-between;
    .state-item {
      display: flex;
      flex: 1;
    }
    .down {
      cursor: pointer;
      font-size: 15px;
      color: #565656;
      margin-right: 18px;

      display: inline-block;
      background: url(../../static/images/down2.png) left no-repeat;
      background-size: 22px 22px;
      text-align: right;
      text-align: right;
      width: 58px;
    }

    .lab {
      color: rgba(48, 48, 48, 1);
      font-size: 18px;
      margin-right: 10px;
      width: 90px;
      text-align: right;
    }
    .item {
      text-align: center;
      font-size: 16px;
      border-radius: 0;
      background: #f0f0f0;
      color: #565656;
      padding: 10px 20px;
      margin-right: 2px;
      cursor: pointer;
    }

    .on {
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(180deg, rgba(255, 108, 42, 1) 0%, rgba(246, 48, 43, 1) 100%);
    }
    .default-txt {
      color: #606266;
      font-size: 15px;
      position: absolute;
      left: 110px;
    }
  }
.major-outer {
  min-height: 748px;
  background: #ffffff;
}
.major-main {

}
.subitem {
  padding: 16px;
  background: #ffffff;
  border-radius: 10px;
  margin-right: 1.1%;
  margin-bottom: 1.1%;
  width: 32.6%;
  display: flex;
  height: 214px;
  position: relative;
  align-items: center;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  // &:last-child {
  //   margin-right: 0px;
  // }

  .lf {
    width: 48%;
    height: 182px;
    margin-right: 16px;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
    .lab {
      // width: 60px;
      height: 24px;
      color: #ffffff;
      font-size: 14px;
      display: inline-block;
      position: absolute;
      text-align: center;
      top: 12px;
      left: 12px;
      padding: 3px 8px;
      background: url(../../static/images/marking.png) center no-repeat;
      background-size: 100% 100%;
    }
  }
  .rg {
    width: 52%;
    // position: relative;

    .rgstar {
      position: absolute;
      right: 16px;
      top: 16px;
      .ico {
        width: 30px;
        height: 30px;
        background: url(../../static/images/star.png) center no-repeat;
        background-size: 30px 30px;
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
      .actico {
        background: url(../../static/images/actstar.png) center no-repeat;
        background-size: 30px 30px;
      }
    }
    .title {
      color: rgba(48, 48, 48, 1);
      font-size: 18px;
      font-weight: 700;

      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
    }
    .content {
      color: #565656;
      font-size: 14px;

      margin: 20px 0;
      line-height: 21px;
      position: relative;
      text-align: justify;

      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;

      word-break: break-all;

      /deep/h1 {
        font-size: 14px;
      }
      /deep/h2 {
        font-size: 14px;
      }
      /deep/h3 {
        font-size: 14px;
      }
      /deep/h4 {
        font-size: 14px;
      }
      /deep/h5 {
        font-size: 14px;
      }
    }

    .ismore {
      color: #ff6c2a;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      background: #ffffff;
      padding-left: 14px;
    }
    .online {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .accessory {
      display: flex;
      justify-content: space-between;
      .number {
        color: rgba(255, 4, 4, 1);
      }
      .lab {
        color: rgba(142, 142, 142, 1);
        font-size: 12px;
      }
      .previewico {
        width: 12px;
        height: 8px;
        display: inline-block;
        background: url(../../static/images/look.png) center no-repeat;
      }
      .downico {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: url(../../static/images/down.png) center no-repeat;
      }
    }
  }
}
.pointer {
  cursor: pointer;
}
.pvw {
  .item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    margin-bottom: 12px;
    .pvwname {
      color: #8e8e8e;
      font-size: 16px;
      flex: 1;
    }
    .pvwtxt {
      font-size: 15px;
      color: #ff6c2a;
      width: 65px;
      text-align: right;
    }
  }
}

@media (min-width: 1523px) {
  .subitem {
    .lf {
      height: 182px;
    }

    .rg {
      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
  }
}
@media (min-width: 1027px) and (max-width: 1522px) {
  .subitem {
    .lf {
      height: 192px;
    }
    .rg {
      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
}
</style>

