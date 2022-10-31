<template>
  <div>

    <div class="major-head">

      <div class="major-state">
        <div class="lab">资源类型：</div>
        <div class="item" :class="{ on: currentIndex === index }" v-for="(item, index) in majorStateList" :key="index" @Click="resourceStateClick(item,index)">{{ item.name}}
        </div>
      </div>
      <div class="major-state-content">
        <div class="major-state" style="margin-right:100px">
          <div class="lab">专业：</div>
          <el-cascader ref="cascaderMajorAddr" :options="optionsMajorList" :props="props1" filterable :placeholder="placeholderValue" :show-all-levels="false" separator="-" style="width: 260px;" @change="handleMajorChange">
          </el-cascader>

          <div v-if="majorName" class="default-txt">{{majorName}}</div>
        </div>

        <div class="major-state">
          <div class="lab">课程：</div>
          <!-- v-model="value" v-model="majorName"-->
          <!-- :show-all-levels="false"   只显示最后一级      filterable搜索   separator用于分隔选项的字符-->
          <el-cascader ref="cascaderAddr" :options="optionsList" :props="props2" filterable :placeholder="placeholderValue" :show-all-levels="false" separator="-" style="width: 260px;" @change="handleChange">
          </el-cascader>

          <div v-if="majorName" class="default-txt">{{majorName}}</div>
        </div>
      </div>
    </div>
    <div class="major-outer">
      <div class="major-main">
        <div class="subitem" v-for="(item, index) in resourceList" :key="index">
          <div class="lf">
            <img class="img" :src="item.picture ? item.picture : defaultImg" :onerror="errorImage" />
            <label class="lab">{{item.resourceName}} </label>
          </div>
          <div class="rg">
            <div class="title">{{item.name}}</div>
            <div class="content" ref="detailDom">
              <div v-html="item.introduction"></div>
              <el-popover v-if="item.isMore" placement="right" :width="420" trigger="hover" :title="item.name">
                <div v-html="item.introduction" style="    line-height:25px; font-size:14px;
            max-height: 550px;
            overflow-y: auto;"></div>
                <template #reference>
                  <text class="ismore">详情</text>
                </template>
              </el-popover>
            </div>
            <div class="online">
              <div class="accessory">
                <div class="lab">附件数：
                  <!-- <label class="number" v-if="item.attachment !==undefined && item.attachment != null && item.attachment.length > 0">{{item.attachment.length}}</label> -->
                  <label class="number" v-if="item.attachment=='' || item.attachment==null">0</label>
                  <label class="number" v-else>{{item.attachment.length}}</label>
                </div>
                <div class="lab pointer" v-if="item.attachment !==undefined && item.attachment != null && item.attachment.length > 0" @click="previewDialog(item.attachment)">
                  <i class="previewico"></i> 在线预览</div>
                <div class="lab pointer" v-if="item.attachment !==undefined && item.attachment != null && item.attachment.length > 0" @click="download(item)">
                  <i class="downico"></i> 下载</div>
                <div class="lab">{{item.creationTime.replace(/T/g, " ").substring(0,10)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-config-provider :locale="locale">
        <el-pagination v-if="pages>1" v-model:currentPage="skipCount" v-model:page-size="maxResultCount" background :background="background" layout="total,prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" class="major-page">
        </el-pagination>
        <!-- :page-sizes="[100, 200, 300, 400]" -->
        <!-- layout="sizes"  一页多少-->

      </el-config-provider>
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
      placeholderValue: "",
      props2: {
        value: "id",
        label: "name"
        //  children: 'child'
      },

      props1: {
        value: "id",
        label: "professionalName"
        //  children: 'child'
      },
      // currentPage: 1,
      // pageSize4: 2,
      locale: zhCn,

      currentIndex: 0,
      majorStateList: [],
      optionsMajorList: [],
      optionsList: [],
      skipCount: 1, //当前页
      maxResultCount: 9, //一页几条
      total: 0, //总数
      pages: "", //总页数
      handlemajorId: "", //专业id
      majorId: "", //课程id
      majorName: "", //专业名
      sourceId: "", //资源类型id
      resourceList: [],
      defaultImg: require("../../static/images/defaultImg.png"),
      errorImage: ' this.src=" ' + require("../../static/images/defaultImg.png") + ' " ',
      dialogVisible: false,
      previewFile: {}, // 传递的参数
      previewFileShow: false, // 默认预览框是关闭状态
      previewList: []
    };
  },
  mounted() {
    _this = this;

    // console.log("CCAAA", _this.$route.query.majorId!=""|| _this.$route.query.majorId!="undefined");
    // console.log("CC_this.$route.query.id", _this.$route.query.majorId, "_this.$route.query.name", _this.$route.query.name);
    // _this.majorId = _this.$route.query.majorId;  
    //  console.log("_this.majorId",_this.majorId)
    // //
    // if (_this.majorId == undefined) {
    //   _this.placeholderValue = "请选择";
    // } else {
    //   _this.placeholderValue = " ";
    //   _this.majorName = _this.$route.query.majorName;
    // }

    if (_this.sourceId == undefined) {
      _this.sourceId = "";
    } else {
      _this.sourceId = _this.$route.query.sourceId;
    }

    _this.courseResourceTree();
    _this.majorResourceTree();
    _this.majorResourceType();
    _this.getCourseResourceList();
  },

  methods: {
    courseResourceTree() {
      _this.optionsList = [];
      _this.$axios
        .get(_this.$api.courseResourceTree, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              data.unshift({ id: "", name: "所有" });
              for (var i = 0; i < data.length; i++) {
                let res = JSON.parse(JSON.stringify(data[i]).replace(/courseType/g, "name"));
                _this.optionsList.push(res);
              }
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    majorResourceTree() {
      _this.optionsMajorList = [];
      _this.$axios
        .get(_this.$api.majorResourceTree, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              data.unshift({ id: "", professionalName: "所有" });
              for (var i = 0; i < data.length; i++) {
                _this.optionsMajorList.push(data[i]);
              }
            }
          }
        })
        .catch(error => {
          // _this.$router.push('/Login');
          console.log("error", error);
        });
    },

    majorResourceType() {
      _this.majorStateList = [];
      _this.$axios
        .get(_this.$api.majorResourceType, {})
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data) {
              data.unshift({ id: "-1", name: "所有" });
              for (var i = 0; i < data.length; i++) {
                _this.majorStateList.push(data[i]);
              }

              _this.majorStateList.forEach(function(item, indexs) {
                if (item.id === _this.sourceId) {
                  _this.currentIndex = item.sort;
                }
              });

              // console.log("item", _this.majorStateList);
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    handleMajorChange(value) {
      // console.log("value的值", value);
      _this.majorName = "";
      _this.handlemajorId = _this.$refs["cascaderMajorAddr"].getCheckedNodes()[0].value;

      _this.skipCount = 1;
      _this.getCourseResourceList();
    },
    handleChange(value) {
      // console.log("value的值", value);
      _this.majorName = "";
      _this.majorId = _this.$refs["cascaderAddr"].getCheckedNodes()[0].value;

      _this.skipCount = 1;
      _this.getCourseResourceList();

      // var kk = this.$refs["cascaderAddr"].getCheckedNodes();
      // console.log("所有的值;", kk);
      // console.log("lable的值;", this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels);
    },

    resourceStateClick(item, index) {
      if (item.id == "-1") {
        _this.sourceId = "";
      } else {
        _this.sourceId = item.id;
      }
      _this.currentIndex = index;
      _this.skipCount = 1;
      _this.getCourseResourceList();
    },
    getCourseResourceList() {
      this.$axios
        .get(_this.$api.navCountResourceGroup, {
          params: {
            ProfessionalId: _this.handlemajorId, //专业id
            ResourceId: _this.sourceId, //资源类型id
            SkipCount: (_this.skipCount - 1) * _this.maxResultCount,
            MaxResultCount: _this.maxResultCount,
            ArchivesId: _this.majorId //课程id
          }
        })
        .then(res => {
          _this.resourceList = [];
          if (res.status == 200) {
            let data = res.data.items;
            // if (data.length > 0) {
            _this.resourceList = _this.resourceList.concat(res.data.items);
            _this.total = res.data.totalCount; //总条数
            _this.pages = Math.ceil(_this.total / _this.maxResultCount); //总页数
            // if (_this.total <= _this.maxResultCount) {
            // 	_this.statustext = 'nomore';
            // }
            console.log("total总数", _this.total, "page总页数", _this.pages);

            _this.showDetailBtnFun();
            // }
          }
        })
        .catch(error => {
          //  _this.$router.push('/Login');
          console.log("ccc", error);
        });
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
    showDetailBtnFun() {
      _this.resourceList.forEach(item => {
        item.isMore = false;
      });
      _this.$nextTick(() => {
        var els = _this.$refs.detailDom;
        els.forEach((item, index) => {
          // console.log("document.body.clientWidth", document.body.clientWidth);
          if (document.body.clientWidth < 1522) {
            if (item.offsetHeight >= 63) {
              _this.resourceList[index].isMore = true;
            } else {
              _this.resourceList[index].isMore = false;
            }
          } else {
            if (item.offsetHeight >= 84) {
              _this.resourceList[index].isMore = true;
            } else {
              _this.resourceList[index].isMore = false;
            }
          }
        });
      });
    },
    handleCurrentChange(val) {
      _this.skipCount = val;
      _this.getCourseResourceList();
      console.log("val2", val);
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
    }
  }
};
</script>

<style lang="less" scoped>
.major-head {
  padding: 22px 25px 12px 25px;
  background: #ffffff;
  .major-state-content {
    display: flex;
  }
  .major-state {
    //   margin: 40rpx 0 0rpx 0;
    display: flex;
    align-items: center;
    margin: 0 0 15px 0;
    position: relative;
    .lab {
      color: rgba(48, 48, 48, 1);
      font-size: 18px;
      margin-right: 10px;
      width: 90px;
      text-align: right;
    }
    .item {
      text-align: center;
      padding: 5px 16px;

      border-radius: 4px;
      font-size: 14px;
      color: rgba(86, 86, 86, 1);
      margin-right: 10px;
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
}
.major-outer {
  min-height: 748px;
}
.major-main {
  display: flex;
  flex-wrap: wrap;
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
    position: relative;
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

