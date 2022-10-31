import config from './index-config';
const baseUrl=config.baseUrl;
//token登录
var Login = baseUrl + "connect/token";
//Cookie登录
var LoginCookie = baseUrl + "api/Account/Login";
//cooke是否登录
var CheckLogin = baseUrl + "App/Wechat/CheckLogin";
//统计资源类别数量
var politicalCount=baseUrl+"api/app/political-management/political-count";
//查询专业群
var queryMajorGroup=baseUrl+"api/app/professional-group/cockpit-professional-group";
//查询专业
var queryMajor=baseUrl+"api/app/professional-directory/cockpit-professional";
//查询课程
var queryCourse=baseUrl+"api/app/course-archives/cockpit-archives";
//专业资源库
var majorResourceTree=baseUrl+"api/app/professional-directory/professional-directory-tree";
//查询资源类型
var majorResourceType=baseUrl+"api/app/resource-type/enable";
//查询专业资源库
var majorResourceList=baseUrl+"api/app/political-management/political-professional-list";
//查询课程资源库
var courseResourceTree=baseUrl+"api/app/course-archives/course-archives-tree";
//查询课程资源库
var courseResourceList=baseUrl+"api/app/political-management/political-archives-list";
//下载
var download=baseUrl+"political/download";
//用户信息
var userInfo=baseUrl+"app/user/info";
//本地路径
var localPath=baseUrl;

//校级思政资源库群导航
var adjResourceMap=baseUrl+"api/app/professional-group/cockpit-professional-group-map";
//校级思政资源库(独立专业)
var adjResource=baseUrl+"api/app/professional-course-map/cockpit-professional";
//校级思政资源库(专业群)
var adjResourceGroup=baseUrl+"api/app/professional-group-course-map/cockpit-group";
//资源库(类型 专业 课程)
var navCountResourceGroup=baseUrl+"api/app/political-management/political-resources-list";

export default {
    Login,
    LoginCookie,
    CheckLogin,
    politicalCount,
    queryMajorGroup,
    queryMajor,
    queryCourse,
    majorResourceTree,
    majorResourceType,
    majorResourceList,
    courseResourceTree,
    courseResourceList,
    download,
    userInfo,
    localPath,
    adjResource,
    adjResourceGroup,
    adjResourceMap,
    navCountResourceGroup
}