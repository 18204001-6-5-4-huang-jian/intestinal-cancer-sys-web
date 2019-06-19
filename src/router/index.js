import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
// 修改密码
const updatePassword = _import('login/updatePassword');
/* dashboard */
const dashboard = _import('dashboard/index');

/* components */
const role = _import('components/role')
const roleListUpdate = _import('components/roleListUpdate')
const roleListInsert = _import('components/roleListInsert')
const allocatingMenu = _import('components/allocatingMenu')
const userList = _import('components/userList')
const userListInsert = _import('components/userListInsert')
const userListUpdate = _import('components/userListUpdate')
const allocatingRole = _import('components/allocatingRole')

/* operation */
const operationLog = _import('operation/operationLog')

/* dictionary */
const dictionary = _import('dictionary/dictionary')
const dictionaryInsert = _import('dictionary/dictionaryInsert')
const dictionaryUpdate = _import('dictionary/dictionaryUpdate')
const dictionaryType = _import('dictionary/dictionaryType')
const dictionaryTypeInsert = _import('dictionary/dictionaryTypeInsert')
const dictionaryTypeUpdate = _import('dictionary/dictionaryTypeUpdate')
/* home */
const home = _import('home/home')
const countryHome = _import('home/countryHome')
const riskFactors = _import('home/riskFactors')
const riskFactorsResult = _import('home/riskFactorsResult')
const subjectInsert = _import('home/subjectInsert')
const regionalHospitalNumber = _import('home/regionalHospitalNumber')
const addNumber = _import('home/addNumber');
const regionalNumber = _import('home/regionalNumber')
const regionalNumberList = _import('home/regionalNumberList')
const addBooking = _import('home/addBooking')
const areaHome = _import('home/areaHome')
const uncompletedRiskFactors = _import('home/uncompletedRiskFactors')
const uncompletedFITNumber = _import('home/uncompletedFITNumber')
const uncompletedFITResult = _import('home/uncompletedFITResult')
const uncompletedDNA = _import('home/uncompletedDNA')
const unreservedEnteroscopy = _import('home/unreservedEnteroscopy')
const uncompletedEnteroscopy=_import('home/uncompletedEnteroscopy')
const noScreeningResults=_import('home/noScreeningResults')
const uncompletedCommunity=_import('home/uncompletedCommunity')
const uncompletedCommunityNation=_import('home/uncompletedCommunityNation')
const uncompletedArea=_import('home/uncompletedArea')
const stayEntryEnteroscopy = _import('home/stayEntryEnteroscopy')
const stayEntryPathology = _import('home/stayEntryPathology')
const stayInforming = _import('home/stayInforming')
const stayColonscopyList = _import('home/stayColonscopyList')
const uncompletedBloodList = _import('home/uncompletedBloodList')
const uncompletedFecalList = _import('home/uncompletedFecalList')
const uncompletedSalivaList = _import('home/uncompletedSalivaList')
const uncompletedDNAResults = _import('home/uncompletedDNAResults')
const uncompletedDNAexamine = _import('home/uncompletedDNAexamine')
const uncompletedResearch  = _import('home/uncompletedResearch')
const uncompletedAreaResearch  = _import('home/uncompletedAreaResearch')
const uncompletedCountryResearch  = _import('home/uncompletedCountryResearch')
const uncompletedEventList  = _import('home/uncompletedEventList')
const agency  = _import('home/agency')
const messageCenter  = _import('home/messageCenter')
const uncompletedFollow  = _import('home/uncompletedFollow')
const uninputCrapCode = _import('home/uninputCrapCode')//待录入粪便DNA编码
const uninputA3 = _import('home/uninputA3')//待录入A3
const uninputE1 = _import('home/uninputE1')//待录入E1
const homeFollowupProgress = _import('home/homeFollowupProgress')//随访进度 地区
const homeFollowupProgressCountry = _import('home/homeFollowupProgressCountry')//随访进度 地区
/*  subjects */
const subjectsList=_import('subjects/subjectsList')
const subjectsDetail=_import('subjects/subjectsDetail')
const subjectsDetailFromFollow=_import('subjects/subjectsDetailFromFollow')
const regionSubjectsList=_import('subjects/regionSubjectsList')
const countrySubjectsList=_import('subjects/countrySubjectsList')
const showSubjectInsert=_import('subjects/showSubjectInsert')
const showRiskFactor=_import('subjects/showRiskFactors')
const showRiskFactors=_import('subjects/showRiskFactors')
const areaSubjectDetail=_import('subjects/areaSubjectDetail')
const countrySubjectDetail=_import('subjects/countrySubjectDetail')
/* help */
const help = _import('help/help')
const helps = _import('help/helps')
const countryHelp = _import('help/countryHelp')
/* statistics */
const statistics = _import('statistics/statistics')
const areaStatistics = _import('statistics/areaStatistics')
const countryStatistics = _import('statistics/countryStatistics')
/*  colonscopy */
const colonscopyList=_import('colonscopy/colonscopyList')
const colonscopyDetail=_import('colonscopy/colonscopyDetail')
const colonscopyDetailYN=_import('colonscopy/colonscopyDetailYN')
const colonscopyDetailTZ=_import('colonscopy/colonscopyDetailTZ')
const colonscopyDetailHN=_import('colonscopy/colonscopyDetailHN')
const colonscopyDetailXZ=_import('colonscopy/colonscopyDetailXZ')
const colonscopyDetailAH=_import('colonscopy/colonscopyDetailAH')
const regionColonscopyList=_import('colonscopy/regionColonscopyList')
const countryColonscopyList=_import('colonscopy/countryColonscopyList')
const regionSign=_import('colonscopy/regionSign')
const report1=_import('reportForm/report1')
const report2=_import('reportForm/report2')
const report3=_import('reportForm/report3')
const report4=_import('reportForm/report4')
const showReport4=_import('reportForm/showReport4')
const showReport1=_import('reportForm/showReport1')
const showReport2=_import('reportForm/showReport2')
const showReport3=_import('reportForm/showReport3')
const noInforming=_import('reportForm/noInforming')
// 终点事件管理
const eventList=_import('event/eventList')
const eventList5=_import('event/eventList5')
const cancerReport1=_import('reportForm/cancerReport1')
const cancerReport2=_import('reportForm/cancerReport2')
const cancerReport3=_import('reportForm/cancerReport3')
const cancerReport4=_import('reportForm/cancerReport4')
const cancerReport5=_import('reportForm/cancerReport5')
/* resource */
const resourceList = _import('resource/resourceList')
const resourceInsert = _import('resource/resourceInsert')
const resourceUpdate = _import('resource/resourceUpdate')

/* reqResource */
const reqResourceList = _import('resource/reqResourceList')
const reqResourceInsert = _import('resource/reqResourceInsert')
const reqResourceUpdate = _import('resource/reqResourceUpdate')

/* departments */
const departmentList = _import('departments/departmentList')
const departmentInsert = _import('departments/departmentInsert')
const departmentUpdate = _import('departments/departmentUpdate')
const departmentTree = _import('departments/departmentTree')

/* fit管理 */
const fitManagement=_import('fit/fitManagement')
const areaFitManagement=_import('fit/areaFitManagement')
const countryFitManagement=_import('fit/countryFitManagement')
/* DNA */
const dnaManagement=_import('DNA/dnaManagement')
const areaDnaManagement=_import('DNA/areaDnaManagement')
const countryDnaManagement=_import('DNA/countryDnaManagement')
/* DNA第三方 */
const upload=_import('thirdParty/fileUpload')

/* 生物样本管理 */
const blood=_import('biologicalSamples/bloodList')
const fecal=_import('biologicalSamples/fecalList')
const saliva=_import('biologicalSamples/salivaList')
const countryBlood=_import('biologicalSamples/countryBloodList')
const countryFecal=_import('biologicalSamples/countryFecalList')
const countrySaliva=_import('biologicalSamples/countrySalivaList')
const expressList=_import('biologicalSamples/expressList')
const sendExpress=_import('biologicalSamples/sendExpress')
const expressCountryList=_import('biologicalSamples/expressCountryList')

//异常管理
const abnormalManagementList=_import('abnormalManagement/abnormalManagementList')
//导出数据
const exportList=_import('export/exportStatic')
// 新增放号
const bookingManagement = _import('bookingManagement/bookingManagement')
const bookingManagementAdd = _import('bookingManagement/bookingManagementAdd')
const bookingManagementAddDetail = _import('bookingManagement/bookingManagementAddDetail')
const bookingManagementDetail = _import('bookingManagement/bookingManagementDetail')
const bookingManagementHistory = _import('bookingManagement/bookingManagementHistory')
const bookingManagementHistoryDetail = _import('bookingManagement/bookingManagementHistoryDetail')
const bookingManagementSubject = _import('bookingManagement/bookingManagementSubject')
const bookingSubjectList = _import('bookingManagement/bookingSubjectList')
// 随访 
const ListA3 = _import('followUp/ListA3')
const ListE2 = _import('followUp/ListE2')
const ListE1 = _import('followUp/ListE1')
const followupA3 = _import('reportForm/followupA3')
const followupE1 = _import('reportForm/followupE1')
const followupE2 = _import('reportForm/followupE2')

// 粪便样本管理（新）
const droppingsDnaNew = _import('Droppingsdnanew/droppingsdnanew');
Vue.use(Router);

export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/updatePassword', component: updatePassword, hidden: true},
  {path: '/authredirect', component: authRedirect, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    name: '首页',
    hidden: true,
    children: [{path: '/home/home', component: home}]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/',
    name: '系统管理',
    icon: 'zujian',
    children: [
      {path: 'role', component: role, name: '角色管理', meta: {requireAuth: 'rolePageMain'}},
      {path: 'roleListUpdate', component: roleListUpdate, name: '角色编辑试试', meta: {requireAuth: 'rolePageEditor'}},
      {path: 'roleListInsert', component: roleListInsert, name: '角色添加', meta: {requireAuth: 'rolePageAdd'}},
      {path: 'allocatingMenu', component: allocatingMenu, name: '角色分配权限', meta: {requireAuth: 'rolePageAllauth'}},
      {path: 'userList', component: userList, meta: {requireAuth: 'userPageMain'}, name: '用户管理'},
      {path: 'userListInsert', component: userListInsert, name: '用户添加', meta: {requireAuth: 'userPageAdd'}},
      {path: 'userListUpdate', component: userListUpdate, name: '用户编辑', meta: {requireAuth: 'userPageEditor'}},
      {path: 'allocatingRole', component: allocatingRole, name: '分配菜单权限', meta: {requireAuth: 'userPageAllrole'}}
    ]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: '/',
    name: '操作日志管理',
    icon: 'zujian',
    children: [
      {
        path: 'operationLog', component: operationLog, name: '操作日志', meta: {requireAuth: 'page_operation'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/',
    name: '操作日志管理',
    icon: 'zujian',
    children: [
      {
        path: 'dashboard', component: dashboard, name: '操作日志'
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/',
    name: '资源管理',
    icon: 'zujian',
    children: [
      {
        path: 'resourceList',
        component: resourceList,
        name: '页面资源',
        meta: {requireAuth: 'page_resourceList'}
      },
      {
        path: 'resourceInsert',
        component: resourceInsert,
        name: '页面资源添加页面',
        meta: {requireAuth: 'page_resource_add'}
      },
      {
        path: 'resourceUpdate',
        component: resourceUpdate,
        name: '页面资源编辑页面',
        meta: {requireAuth: 'page_resource_update'}
      },
      {
        path: 'reqResourceList',
        component: reqResourceList,
        name: '请求资源',
        meta: {requireAuth: 'page_reqResourceList'}
      },
      {
        path: 'reqResourceInsert',
        component: reqResourceInsert,
        name: '请求资源添加页面',
        meta: {requireAuth: 'page_resource_add'}
      },
      {
        path: 'reqResourceUpdate',
        component: reqResourceUpdate,
        name: '请求资源编辑页面',
        meta: {requireAuth: 'page_resource_update'}
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    redirect: '/',
    name: '部门管理',
    icon: 'zujian',
    children: [
      {
        path: 'departmentList',
        component: departmentList,
        name: '部门管理页',
        meta: {requireAuth: 'page_departmentList'}
      },
      {
        path: 'departmentInsert',
        component: departmentInsert,
        name: '部门管理添加页面',
        meta: {requireAuth: 'page_department_add'}
      },
      {
        path: 'departmentUpdate',
        component: departmentUpdate,
        name: '部门管理编辑页面',
        meta: {requireAuth: 'page_department_update'}
      },
      {
        path: 'departmentTree',
        component: departmentTree,
        name: '部门树形结构页',
        meta: {requireAuth: 'page_department_tree'}
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/',
    name: '数据字典管理',
    icon: 'zujian',
    children: [
      {
        path: 'dictionary',
        component: dictionary,
        name: '数据字典',
        meta: {requireAuth: 'page_dictionary'}
      },
      {
        path: 'dictionaryInsert',
        component: dictionaryInsert,
        name: '数据字典添加页面',
        meta: {requireAuth: 'page_dictionary_add'}
      },
      {
        path: 'dictionaryUpdate',
        component: dictionaryUpdate,
        name: '数据字典编辑页面',
        meta: {requireAuth: 'page_dictionary_update'}
      },
      {
        path: 'dictionaryType',
        component: dictionaryType,
        name: '数据字典类型',
        meta: {requireAuth: 'page_dictionaryType'}
      },
      {
        path: 'dictionaryTypeInsert',
        component: dictionaryTypeInsert,
        name: '数据字典类型添加页面',
        meta: {requireAuth: 'page_dictionaryType_add'}
      },
      {
        path: 'dictionaryTypeUpdate',
        component: dictionaryTypeUpdate,
        name: '数据字典类型编辑页面',
        meta: {requireAuth: 'page_dictionaryType_update'}
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/',
    name: '首页',
    icon: 'zujian',
    children: [
      {
        path: 'home', component: home, name: '首页详情', meta: {requireAuth: 'home_page'}
      },
      {
        path: 'riskFactors', component: riskFactors, name: '危险因素表', meta: {requireAuth: 'riskFactors_page'}
      },
      {
        path: 'subjectInsert', component: subjectInsert, name: '受试者审核表', meta: {requireAuth: 'home_page'}
      },
      {
        path: 'regionalHospitalNumber',
        component: regionalHospitalNumber,
        name: '地区医院放号放号',
        meta: {requireAuth: 'regionalHospitalNumber_page'}
      },
      {
        path:'addNumber',
        component:addNumber,
        name:'地区新增放号',
        meta:{
          requireAuth:'addNumber_page'
        }
      },
      {
        path: 'addBooking', component: addBooking, name: '立即预约', meta: {requireAuth: 'addBooking_page'}
      },
      {
        path: 'areaHome', component: areaHome, name: '地区医院首页详情', meta: {requireAuth: 'areaHome_page'}
      },
      {
        path: 'countryHome', component: countryHome, name: '地区医院首页详情', meta: {requireAuth: 'countryHome_page'}
      },
      {
        path: 'uncompletedRiskFactors',
        component: uncompletedRiskFactors,
        name: '未完成危险因素调查表',
        meta: {requireAuth: 'uncompletedRiskFactors_page'}
      },
      {
        path: 'uncompletedFITNumber',
        component: uncompletedFITNumber,
        name: '未完成录入FIT编号',
        meta: {requireAuth: 'uncompletedFITNumber_page'}
      },
      {
        path: 'uncompletedFITResult',
        component: uncompletedFITResult,
        name: '未完成录入FIT结果',
        meta: {requireAuth: 'uncompletedFITResult_page'}
      },
      {
        path: 'uncompletedDNA',
        component: uncompletedDNA,
        name: '未完成录入粪便DNA编号装置',
        meta: {requireAuth: 'uncompletedDNA_page'}
      },
      {
        path: 'unreservedEnteroscopy',
        component: unreservedEnteroscopy,
        name: '未预约结肠镜检查',
        meta: {requireAuth: 'unreservedEnteroscopy_page'}
      },
      {
        path: 'uncompletedEnteroscopy',
        component: uncompletedEnteroscopy,
        name: '未完成结肠镜检查',
        meta: {requireAuth: 'uncompletedEnteroscopy_page'}
      },
      {
        path: 'noScreeningResults',
        component: noScreeningResults,
        name: '未发放筛查结果告知书',
        meta: {requireAuth: 'noScreeningResult_page'}
      },
      {
        path: 'riskFactorsResult',
        component: riskFactorsResult,
        name: '未发放筛查结果告知书',
        meta: {requireAuth: 'riskFactorsResult_page'}
      },
      {
        path: 'stayEntryEnteroscopy',
        component: stayEntryEnteroscopy,
        name: '未录入肠镜结果',
        meta: {requireAuth: 'stayEntryEnteroscopy_page'}
      },
      {
        path: 'stayEntryPathology',
        component: stayEntryPathology,
        name: '未录入病理结果',
        meta: {requireAuth: 'stayEntryPathology_page'}
      },
      {
        path: 'stayColonscopyList',
        component: stayColonscopyList,
        name: '待上传肠镜图片',
        meta: {requireAuth: 'stayColonscopyList_page'}
      },
      {
        path: 'stayInforming',
        component: stayInforming,
        name: '待录入筛查结果告知书',
        meta: {requireAuth: 'stayInforming_page'}
      },
      {
        path: 'uncompletedCommunity',
        component: uncompletedCommunity,
        name: '待录入筛查结果告知书',
        meta: {requireAuth: 'uncompletedCommunity_page'}
      },
      {
        path: 'uncompletedArea',
        component: uncompletedArea,
        name: '地区代办统计',
        meta: {requireAuth: 'uncompletedArea_page'}
      },
      {
        path: 'uncompletedCommunityNation',
        component: uncompletedCommunityNation,
        name: '社区代办统计',
        meta: {requireAuth: 'uncompletedCommunityNation_page'}
      },
      {
        path: 'uncompletedBloodList',
        component: uncompletedBloodList,
        name: '血液样本代办',
        meta: {requireAuth: 'uncompletedBloodList_page'}
      },
      {
        path: 'uncompletedSalivaList',
        component: uncompletedSalivaList,
        name: '唾液样本代办',
        meta: {requireAuth: 'uncompletedSalivaList_page'}
      },
      {
        path: 'uncompletedFecalList',
        component: uncompletedFecalList,
        name: '粪便样本代办',
        meta: {requireAuth: 'uncompletedFecalList_page'}
      },
      {
        path: 'uncompletedDNAResults',
        component: uncompletedDNAResults,
        name: '粪便DNA结果待录入',
        meta: {requireAuth: 'uncompletedDNAResults_page'}
      },
      {
        path: 'uncompletedDNAexamine',
        component: uncompletedDNAexamine,
        name: '粪便DNA结果待录入',
        meta: {requireAuth: 'uncompletedDNAexamine_page'}
      },
      {
        path: 'regionalNumber',
        component: regionalNumber,
        name: '放号一览表',
        meta: {requireAuth: 'regionalNumber_page'}
      },
      {
        path: 'regionalNumberList',
        component: regionalNumberList,
        name: '放号一览表详情',
        meta: {requireAuth: 'regionalNumberList_page'}
      },
      {
        path: 'uncompletedResearch',
        component: uncompletedResearch,
        name: '退出研究查看',
        meta: {requireAuth: 'uncompletedResearch_page'}
      },
      {
        path: 'uncompletedAreaResearch',
        component: uncompletedAreaResearch,
        name: '退出研究查看',
        meta: {requireAuth: 'uncompletedAreaResearch_page'}
      },
      {
        path: 'uncompletedEventList',
        component: uncompletedEventList,
        name: '待录入终点事件',
        meta: {requireAuth: 'uncompletedEventList_page'}
      },
      {
        path: 'uncompletedCountryResearch',
        component: uncompletedCountryResearch,
        name: '退出研究查看',
        meta: {requireAuth: 'uncompletedCountryResearch_page'}
      },
      {
        path: 'showReport4',
        component: showReport4,
        name: '退出研究查看',
        meta: {requireAuth: 'showReport4_page'}
      },
      {
        path: 'agency',
        component: agency,
        name: '退出研究查看',
        meta: {requireAuth: 'countryAgency_page'}
      },
      {
        path: 'messageList',
        component: messageCenter,
        name: '消息中心',
        meta: {requireAuth: 'messageList_page'}
      },
      {
        path: 'uncompletedFollow',
        component: uncompletedFollow,
        name: '待邀请随访列表',
        meta: {requireAuth: 'uncompleted_follow_page'}
      },
      {
        // uninputCrapCode
        path: 'uninputCrapCode',
        component: uninputCrapCode,
        name: '待录入粪便编码（新的）',
        meta: {requireAuth: 'uninput_Crap_Code_page'}
      },
      {
        // uninputA3
        path: 'uninputA3',
        component: uninputA3,
        name: '待录入A3',
        meta: {requireAuth: 'uninput_a3_page'}
      },
      {
          // uninputE1
          path: 'uninputE1',
          component: uninputE1,
          name: '待录入E1',
          meta: {requireAuth: 'uninput_e1_page'}
      },
      {
        // homeFollowupProgress
        path: 'homeFollowupProgress',
        component: homeFollowupProgress,
        name: '随访进度',
        meta: {requireAuth: 'home_followup_progress_page'}
      },
      {
        // homeFollowupProgressCountry
        path: 'homeFollowupProgressCountry',
        component: homeFollowupProgressCountry,
        name: '随访进度',
        meta: {requireAuth: 'home_followup_progress_country_page'}
      }
    ]
  },
  {
    path: '/subjects',
    component: Layout,
    redirect: '/',
    name: '受试者管理',
    icon: 'zujian',
    children: [
      {
        path: 'subjectsList', component: subjectsList, name: '受试者列表', meta: {requireAuth: 'subjectsList_page'}
      },
      {
        path: 'subjectsDetail', component: subjectsDetail, name: '受试者列表', meta: {requireAuth: 'subjectsDetail_page'}
      },
      {
        path: 'subjectsDetailFromFollow', component: subjectsDetailFromFollow, name: '受试者详情', meta: {requireAuth: 'subjectsDetail_follow_page'}
      },
      {
          path: 'regionSubjectsList', component: regionSubjectsList, name: '受试者列表', meta: {requireAuth: 'area_person_list_page'}
      },
      {
        path: 'countrySubjectsList', component: countrySubjectsList, name: '受试者列表', meta: {requireAuth: 'countrySubjectsList_page'}
      },
      {
        path: 'showSubjectInsert', component: showSubjectInsert, name: '查看受试者资格审核表', meta: {requireAuth: 'showSubjectInsert_page'}
      },
      {
        path: 'showRiskFactor', component: showRiskFactor, name: '查看危险因素', meta: {requireAuth: 'showRiskFactor_page'}
      },
      {
        path: 'areaSubjectDetail', component: areaSubjectDetail, name: '查看地区受试者详情', meta: {requireAuth: 'area_person_detail_page'}
      },
      {
        path: 'countrySubjectDetail', component: countrySubjectDetail, name: '查看国家受试者详情', meta: {requireAuth: 'country_person_detail_page'}
      },
      {
        path: 'report4', component: report4, name: '查看国家受试者详情', meta: {requireAuth: 'report4_page'}
      }
    ]
  },
  {
    path: '/colonscopy',
    component: Layout,
    redirect: '/',
    name: '肠镜管理',
    icon: 'zujian',
    children: [
      {
        path: 'colonscopyList', component: colonscopyList, name: '肠镜列表', meta: {requireAuth: 'colonscopyList_page'}
      },
      {
        path: 'colonscopyDetail', component: colonscopyDetail, name: '肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'colonscopyDetailHN', component: colonscopyDetailHN, name: '湖南肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'colonscopyDetailTZ', component: colonscopyDetailTZ, name: '台州肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'colonscopyDetailXZ', component: colonscopyDetailXZ, name: '徐州肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'colonscopyDetailYN', component: colonscopyDetailYN, name: '云南肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'colonscopyDetailAH', component: colonscopyDetailAH, name: '安徽肠镜列表查看详情', meta: {requireAuth: 'colonscopyDetail_page'}
      },
      {
        path: 'regionColonscopyList', component: regionColonscopyList, name: '地区医院肠镜列表', meta: {requireAuth: 'area_colonoscopy_list_page'}
      },
      {
        path: 'countryColonscopyList', component: countryColonscopyList, name: '地区医院肠镜列表', meta: {requireAuth: 'countryColonscopyList_page'}
      },
      {
        path: 'regionSign', component: regionSign, name: '签到列表', meta: {requireAuth: 'regionSign_page'}
      },
      {
        path: 'report1', component: report1, name: '录入肠镜结果表单', meta: {requireAuth: 'area_colonoscopy_add_result_page'}
      },
      {
        path: 'report2', component: report2, name: '录入肠镜病理表单', meta: {requireAuth: 'area_pathology_add_result_page'}
      },
      {
        path: 'report3', component: report3, name: '录入肠镜告知书表单', meta: {requireAuth: 'area_notification_add_page'}
      },
      {
        path: 'showReport1', component: showReport1, name: '录入肠镜结果表单', meta: {requireAuth: 'showReport1_page'}
      },
      {
          path: 'showReport2', component: showReport2, name: '录入肠镜病理表单', meta: {requireAuth: 'showReport2_page'}
      },
      {
        path: 'showReport3', component: showReport3, name: '录入肠镜告知书表单', meta: {requireAuth: 'showReport3_page'}
      },
      {
        path: 'noInforming', component: noInforming, name: '录入肠镜告知书表单', meta: {requireAuth: 'noInforming_page'}
      }
    ]
  },
  {
    path: '/event',
    component: Layout,
    redirect: '/',
    name: '终点事件管理',
    icon: 'zujian',
    children: [
      {
        path: 'eventList1', component: eventList, name: '癌症报告表', meta: {requireAuth: 'event_list_page'}
      },
      {
        path: 'eventList2', component: eventList, name: '癌症诊断表', meta: {requireAuth: 'event_list_page'}
      },
      {
        path: 'eventList3', component: eventList, name: '结直肠癌诊断信息摘录表', meta: {requireAuth: 'event_list_page'}
      },
      {
        path: 'eventList4', component: eventList, name: '结直肠癌治疗信息摘录表', meta: {requireAuth: 'event_list_page'}
      },
      {
        path: 'eventList5', component: eventList5, name: '死亡证明相关组表', meta: {requireAuth: 'event_list5_page'}
      },
      //name勿改，判断表单类型有用
      {
        path: 'cancerReport1', component: cancerReport1, name: '癌症报告表', meta: {requireAuth: 'cancerReport1_page'}
      },
      {
        path: 'cancerReport2', component: cancerReport2, name: '癌症诊断表', meta: {requireAuth: 'cancerReport2_page'}
      },
      {
        path: 'cancerReport3', component: cancerReport3, name: '结直肠癌诊断信息摘录表', meta: {requireAuth: 'cancerReport3_page'}
      },
      {
        path: 'cancerReport4', component: cancerReport4, name: '结直肠癌治疗信息摘录表', meta: {requireAuth: 'cancerReport4_page'}
      },
      {
        path: 'cancerReport5', component: cancerReport5, name: '死亡证明相关组表', meta: {requireAuth: 'cancerReport5_page'}
      }
    ]
  },
  // 随访
  {
    path: '/followup',
    component: Layout,
    redirect: '/',
    name: '随访',
    icon: 'zujian',
    children:[
      {
        path: 'lista3', component: ListA3, name: '表A3年度信息更新表', meta: {requireAuth: 'lista3__list_page'},
      },
      {
        path: 'liste1', component: ListE1, name: '表E1受试者联系记录表', meta: {requireAuth: 'liste1_list_page'},
      },
      {
        path: 'liste2', component: ListE2, name: '表E2受试者无应答/违反研究方案表', meta: {requireAuth: 'liste2_list_page'}
      },
      {
        path: 'followupA3', component: followupA3, name: '表A3年度信息更新表', meta: {requireAuth: 'follow_up_a3_page'}
      },
      {
        path: 'followupE1', component: followupE1, name: '表E1受试者联系记录表', meta: {requireAuth: 'follow_up_e1_page'}
      },
      {
        path: 'followupE2', component: followupE2, name: '表E2受试者无应答/违反研究方案表', meta: {requireAuth: 'follow_up_e2_page'}
      }
    ]
  },
  {
    path: '/fit',
    component: Layout,
    redirect: '/',
    name: 'FIT管理',
    icon: 'zujian',
    children: [
      {
        path: 'fitManagement', component: fitManagement, name: 'FIT管理', meta: {requireAuth: 'fitManagement_page'}
      },
      {
        path: 'areaFitManagement', component: areaFitManagement, name: '地区FIT管理', meta: {requireAuth: 'area_fit_list_page'}
      },
      {
        path: 'countryFitManagement', component: countryFitManagement, name: '地区FIT管理', meta: {requireAuth: 'countryFitManagement_page'}
      }
    ]
  },//dnaManagement
  {
    path: '/DNA',
    component: Layout,
    redirect: '/',
    name: 'DNA管理',
    icon: 'zujian',
    children: [
      {
        path: 'dnaManagement', component: dnaManagement, name: 'DNA管理', meta: {requireAuth: 'dnaManagement_page'}
      },
      {
        path: 'areaDnaManagement', component: areaDnaManagement, name: '地区DNA管理', meta: {requireAuth: 'area_stool_dna_list_page'}
      },
      {
        path: 'countryDnaManagement', component: countryDnaManagement, name: '地区DNA管理', meta: {requireAuth: 'countryDnaManagement_page'}
      }
    ]
  },
  {
    path: '/help',
    component: Layout,
    redirect: '/',
    name: '帮助',
    icon: 'zujian',
    children: [
      {
        path: 'helpPage', component: help, name: '帮助', meta: {requireAuth: 'help_page'}
      },
      {
        path: 'helpPages', component: helps, name: '帮助', meta: {requireAuth: 'help_pages'}
      },
      {
        path: 'countryHelp', component: countryHelp, name: '帮助', meta: {requireAuth: 'countryHelp_page'}
      },
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/',
    name: '数据统计',
    icon: 'zujian',
    children: [
      {
        path: 'statistics', component: statistics, name: '数据统计', meta: {requireAuth: 'statistics_page'}
      },
      {
        path: 'areaStatistics', component: areaStatistics, name: '数据统计', meta: {requireAuth: 'areaStatistics_page'}
      },
      {
        path: 'countryStatistics', component: countryStatistics, name: '数据统计', meta: {requireAuth: 'countryStatistics_page'}
      },
    ]
  },
  {
    path: '/fileUpload',
    component: Layout,
    redirect: '/',
    name: '文件上传',
    icon: 'zujian',
    children: [
      {
        path: 'upload', component: upload, name: '文件上传', meta: {requireAuth: 'fileUpload_page'}
      },
    ]
  },
  {
    path: '/biology',
    component: Layout,
    redirect: '/',
    name: '文件上传',
    icon: 'zujian',
    children: [
      {
        path: 'blood', component: blood, name: '血液样本', meta: {requireAuth: 'bloodList_page'}
      },
      {
        path: 'saliva', component: saliva, name: '唾液样本', meta: {requireAuth: 'salivaList_page'}
      },
      {
        path: 'fecal', component: fecal, name: '粪便样本', meta: {requireAuth: 'fecalList_page'}
      },
      {
        path: 'countryBlood', component: countryBlood, name: '血液样本(国家)', meta: {requireAuth: 'countryBlood_page'}
      },
      {
        path: 'countryFecal', component: countryFecal, name: '粪便样本(国家)', meta: {requireAuth: 'countryFecal_page'}
      },
      {
        path: 'countrySaliva', component: countrySaliva, name: '唾液样本(国家)', meta: {requireAuth: 'countrySaliva_page'}
      },
      {
        path: 'express', component: expressList, name: '快递信息', meta: {requireAuth: 'expressList_page'}
      },
      {
        path: 'sendExpress', component: sendExpress, name: '寄出血液', meta: {requireAuth: 'sendExpress_page'}
      },
      {
        path: 'expressCountry', component: expressCountryList, name: '国家快递信息', meta: {requireAuth: 'expressCountryList_page'}
      }
    ]
  },
  {
    path: '/abnormalManagement',
    component: Layout,
    redirect: '/',
    name: '异常管理',
    icon: 'zujian',
    children: [
      {
        path: 'abnormalManagementList', component: abnormalManagementList, name: '异常管理列表', meta: {requireAuth: 'abnormalManagementList_page'}
      }
    ]
  },//dnaManagement
  {
    path: '/export',
    component: Layout,
    redirect: '/',
    name: '导出数据',
    icon: 'zujian',
    children: [
      {
        path: 'exportList', component: exportList, name: '导出数据', meta: {requireAuth: 'exportList_page'}
      }
    ]
  },//dnaManagement
  //预约放号
  {
    path: '/bookingManagements',
    component: Layout,
    redirect: '/',
    name: '预约管理',
    icon: 'zujian',
    children: [
      {
        path: 'bookingManagement', 
        component: bookingManagement,
        name: '放号管理',
        meta: {requireAuth: 'bookingManagement_page'}
      },
      {
        path:'bookingManagementAdd',
        component:bookingManagementAdd,
        name:'添加放号',
        meta:{requireAuth:'bookingManagementAdd_page'}
      },
      {
        path:'bookingManagementAddDetail',
        component:bookingManagementAddDetail,
        name:'添加放号详情页面',
        meta:{requireAuth:'bookingManagementAddDetail_page'}
      },
      {
        path:'bookingManagementDetail',
        component:bookingManagementDetail,
        name:'查看放号详情',
        meta:{requireAuth:'bookingManagementDetail_page'}
      },
      {
        path:'bookingManagementHistory',
        component:bookingManagementHistory,
        name:'放号记录详情',
        meta:{requireAuth:'bookingManagementHistory_page'}
      },
      {
        path:'bookingManagementHistoryDetail',
        component:bookingManagementHistoryDetail,
        name:'放号记录详情页面',
        meta:{requireAuth:'bookingManagementHistoryDetail_page'}
      },
      {
        path:'bookingManagementSubject',
        component:bookingManagementSubject,
        name:'地区放号详情',
        meta:{requireAuth:'bookingManagementSubject_page'}
      },
      {
        path:'bookingSubjectList',
        component:bookingSubjectList,
        name:'查看受害者',
        meta:{requireAuth:'bookingSubjectList_page'}
      }
     ]
  },
  {
    path: '/droppings',
    component: Layout,
    redirect: '/',
    name: '粪便样本管理（新）',
    icon: 'zujian',
    children:[
      {
        path:'droppingsDnaNew',
        component:droppingsDnaNew,
        name:'粪便样本管理（新）',
        meta:{requireAuth:'droppings_new_page_list'}
      }
    ]
  }
]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

