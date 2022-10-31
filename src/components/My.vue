<template>
  <div>

    <div class="major-head">
      <div class="major-state major-statecount">
        <!-- <div class="lab">资源类型：</div> -->
        <div class="item itemcount" :class="{ on: currentStarIndex === index }" v-for="(item, index) in myStarList" :key="index" @Click="myStarClick(item,index)">{{ item.name}}({{item.count}})
        </div>
      </div>

      <div class="major-star">
        <div class="item" v-for="(item, index) in myStarResourceList" :key="index">
          <div class="name">{{item.name}}</div>  
          <i class="ico" :class="item.starflag?'actico':''"  @click="myStarResource(item)"></i>
        </div>
      </div>

      

      <!-- <div class="major-state">
        <div class="lab">课程：</div>
     
        <el-cascader ref="cascaderAddr" :options="optionsList" :props="props" filterable :placeholder="placeholderValue"
         :show-all-levels="false" separator="-" style="width: 240px;" @change="handleChange" @focus="handleFocus">
        </el-cascader>

        <div v-if="majorName" class="default-txt">{{majorName}}</div>
      </div> -->
      <div class="major-state">
        <!-- <div class="lab">资源类型：</div> -->
        <div class="item" :class="{ on: currentIndex === index }" v-for="(item, index) in majorStateList" :key="index" @Click="resourceStateClick(item,index)">{{ item.name}}
        </div>
      </div>
    </div>
    <div class="major-outer">
      <div class="major-main">
        <div class="subitem" v-for="(item, index) in resourceList" :key="index">
          <div class="lf">
            <img class="img" :src="item.picture ? item.picture : defaultImg"   :onerror="errorImage"/>
            <!-- <label class="lab">{{item.resourceName}} </label> -->
          </div>
          <div class="rg">
            
            <div class="rgstar">
             <i class="ico" :class="isCourseStar?'actico':''"  @click="courseStar"></i> 
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
      props: {
        value: "id",
        label: "name"
        //  children: 'child'
      },
      // currentPage: 1,
      // pageSize4: 2,
      locale: zhCn,

      currentIndex: 0,
      majorStateList: [],
      optionsList: [],
      skipCount: 1, //当前页
      maxResultCount: 9, //一页几条
      total: 0, //总数
      pages: "", //总页数
      majorId: "", //专业id
      majorName: "", //专业名
      sourceId: "", //资源类型id
      resourceList: [],
      defaultImg: require("../../static/images/defaultImg.png"),
      errorImage: ' this.src=" ' + require('../../static/images/defaultImg.png') + ' " ',
      dialogVisible: false,
      previewFile: {}, // 传递的参数
      previewFileShow: false, // 默认预览框是关闭状态
      previewList: [],
       isMajorStar:false,//收藏专业
      majorStarTxt:"收藏",
      isCourseStar:false,//收藏课程课程

       currentStarIndex: 0,
       myStarList: [{name:"我的专业",count:2},{name:"我的课程",count:100},{name:"我收藏的资源",count:100},{name:"我的资源",count:2}],
      myStarResourceList: [{name:"专业01",starflag:true},{name:"专业02",starflag:false},{name:"专业03",starflag:false},
      {name:"专业04",starflag:true}, {name:"专业05",starflag:true}, {name:"专业06",starflag:true}],


    };
  },
  mounted() {
    _this = this;
    
    // console.log("CCAAA", _this.$route.query.majorId!=""|| _this.$route.query.majorId!="undefined");
    // console.log("CC_this.$route.query.id", _this.$route.query.majorId, "_this.$route.query.name", _this.$route.query.name);

    _this.majorId = _this.$route.query.majorId;

   //


    if (_this.majorId == undefined) {
      _this.placeholderValue = "请选择";
    } else {
      _this.placeholderValue = " ";
      _this.majorName = _this.$route.query.majorName;
    }

    if(_this.sourceId==undefined)
    {
       _this.sourceId="";
    }
    else{
     _this.sourceId=_this.$route.query.sourceId;
      
    }

   console.log('aaaa', _this.sourceId)



    _this.courseResourceTree();
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
									 	_this.currentIndex = item.sort+1
									}
							})

              // console.log("item", _this.majorStateList);
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
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
    handleFocus(value)
    {
      _this.placeholderValue = " ";
      _this.majorName ='';
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

     myStarClick(item, index) {
      // if (item.id == "-1") {
      //   _this.sourceId = "";
      // } else {
      //   _this.sourceId = item.id;
      // }
      _this.currentStarIndex = index;
      // _this.skipCount = 1;
      // _this.getCourseResourceList();
    },
    getCourseResourceList() {
      this.$axios
        .get(_this.$api.courseResourceList, {
          params: {
            ArchivesId: _this.majorId,
            ResourceId: _this.sourceId,
            SkipCount: (_this.skipCount - 1) * _this.maxResultCount,
            MaxResultCount: _this.maxResultCount
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
            elink.download = item.name+".zip";
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

    // handleSizeChange(val){
    //   console.log("val1",val)
    // },
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

      if(_this.previewList.length==1)
      {
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
    myStarResource(item)
    {
            if(item.starflag==true)
            {
               item.starflag=false;
            }
            else{
               item.starflag=true;
            }
    },
        majorStar()
    {
      _this.isMajorStar=!_this.isMajorStar;
      console.log("_this.isMajorStar",_this.isMajorStar)
      if(_this.isMajorStar==true)
      {
          _this.majorStarTxt="取消收藏";
      }
      else{
          _this.majorStarTxt="收藏";
      }
    },
    courseStar()
    {
        _this.isCourseStar=!_this.isCourseStar;
    }
  }
};
</script>

<style lang="less" scoped>
.major-head {
  padding: 22px 25px 12px 25px;
  background: #ffffff;
 .caree{
display: flex;
    justify-content: space-between;
        align-items: center;
    color: #303030;
    margin-bottom: 20px;
 .sort{
   display: flex;
    justify-content: space-between;
 .careelf{
    width: 120px;
    height: 100px;
    margin-right: 16px;
 }
 .careerg{
   .catah2{
     font-weight: bold;
     font-size: 18px;
     margin-bottom: 20px;

   }
   .catalog{
 font-size: 15px;
margin-bottom: 10px;
 &:last-child{
   margin-bottom: 0;
 }
   }
 }
 }
 .star{
   width: 62px;
    text-align: center;
    .ico{
      width: 30px;
      height: 30px;
      display: inline-block;
 background: url(../../static/images/star.png) center no-repeat;
 background-size: 30px 30px;
 margin: 0 auto;
    display: block;
 &:hover{
   cursor: pointer;
 }
    }
    .actico{
 background: url(../../static/images/actstar.png) center no-repeat; background-size: 30px 30px;
    }
    .txt{
display: block;
    font-size: 15px;
    color: #303030;
    margin-top: 5px;
    }
 }

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

  .major-statecount{
    border-bottom: 2px solid #FB562A;
  .itemcount{
      font-size: 16px;
      border-radius: 0;
      background: #F0F0F0;
         padding: 10px 20px;
         margin-right: 2px;
         
    }

    .on{
          background: linear-gradient(
180deg, #ff6c2a 0%, #f6302b 100%);
 
    }

  }

.major-star{
display: flex;
    flex-wrap: wrap;
.item{
    margin-right: 20px;
    margin-bottom: 20px;
    
     width: calc((100% - 80px) / 5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    &:nth-child(5n)
    {
      margin-right: 0;
    }
    .name{
              background: #F0F0F0;
    flex: 1;
    padding: 10px;
    margin-right: 10px;

    }
     .ico{
      width: 30px;
      height: 30px;
 background: url(../../static/images/star.png) center no-repeat;
 background-size: 30px 30px;
    display:inline-block;
 &:hover{
   cursor: pointer;
 }
    }
    .actico{
 background: url(../../static/images/actstar.png) center no-repeat; background-size: 30px 30px;
    }
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

          .rgstar{
    position: absolute;
    right: 16px;
    top: 16px;
    .ico{
      width: 30px;
      height: 30px;
 background: url(../../static/images/star.png) center no-repeat;
 background-size: 30px 30px;
    display:inline-block;
 &:hover{
   cursor: pointer;
 }
    }
    .actico{
 background: url(../../static/images/actstar.png) center no-repeat; background-size: 30px 30px;
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

