import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    hospitalType:window.sessionStorage.getItem('hospitalType'),    //3-国家；2-地区；1-社区；4-第三方
    checkCourierNumber:true,    //寄出样本提交按钮校验
    activeIndex:'/home/home',

    list:[],
    allAuthResource:[],
    pageSize:10,
    pageNo:1,

    resourcePageNo:1,
    resourcePageSize:10,
    reqResourcePageNo:1,
    reqResourcePageSize:10,

    dictionaryPageNo:1,
    dictionaryPageSize:10,
    dictionaryTypePageNo:1,
    dictionaryTypePageSize:10,

    departmentPageNo:1,
    departmentPageSize:10,

    userListNo:1,
    userListSize:10,
    roleListNo:1,
    roleListSize:10,
    employeeName:"AAA",

    uncompletedRiskFactorsPageSize:10,
    uncompletedRiskFactorsPageNo:1,

    uncompletedDNAPageSize:10,
    uncompletedDNAPageNo:1,

    uncompletedEnteroscopyPageSize:10,
    uncompletedEnteroscopyPageNo:1,

    uncompletedFITNumberPageSize:10,
    uncompletedFITNumberPageNo:1,

    uncompletedFITResultPageSize:10,
    uncompletedFITResultPageNo:1,

    unreservedEnteroscopyPageSize:10,
    unreservedEnteroscopyPageNo:1,

    noScreeningResultsPageSize:10,
    noScreeningResultsPageNo:1,

    subjectsListPageSize:10,
    subjectsListPageNo:1,

    cancerListPageSize:10,
    cancerListPageNo:1,

    regionColonscopyListPageSize:10,
    regionColonscopyListPageNo:1,

    areaFitManagementPageNo:1,
    areaFitManagementPageSize:10,

    areaDnaManagementPageSize:10,
    areaDnaManagementPageNo:1,

    colonscopyListNo:1,
    colonscopyListSize:10,

    countryColonscopyListNo:1,
    countryColonscopyListSize:10,

    countryColonscopyListPageNo:1,
    countryColonscopyListPageSize:10,

    fitManagementPageNo:1,
    fitManagementPageSize:10,

    dnaManagementPageNo:1,
    dnaManagementPageSize:10,

    uploadListPageNo:1,
    uploadListSize:10,

    bloodListPageNo:1,
    bloodListPageSize:10,

    fecalListPageNo:1,
    fecalListPageSize:10,

    salivaListPageNo:1,
    salivaListPageSize:10,

    uncompletedfecalListPageNo:1,
    uncompletedfecalListPageSize:10,

    uncompletedsalivaListPageNo:1,
    uncompletedsalivaListPageSize:10,

    uncompletedAgencyPageNo:1,
    uncompletedAgencyPageSize:10,

    regionalNumberPageNo:1,
    regionalNumberPageSize:10,

    countryBloodPageNo:1,
    countryBloodPageSize:10,

    countryFecalListPageNo:1,
    countryFecalListPageSize:10,

    countrySalivaListPageNo:1,
    countrySalivaListPageSize:10,

    countryFitManagementPageNo:1,
    countryFitManagementPageSize:10,

    uncompletedDNAexaminePageNo:1,
    uncompletedDNAexaminePageSize:10,

    uncompletedbloodListPageNo:1,
    uncompletedbloodListPageSize:10,

    abnormalManagementListPageNo:1,
    abnormalManagementListPageSize:10,

    expressListPageNo:1,
    expressListPageSize:10,

    messageListPageNo:1,
    messageListPageSize:10,

    stayColonscopyListPageNo:1,
    stayColonscopyListPageSize:10,

    cancerList1PageNo:1,
    cancerList1PageSize:10,

    countrySubjectsListPageNo:1,
    countrySubjectsListPageSize:10,
    
    // 待录入粪便编码（新）
    uninputCrapCodeListPageNo:1,
    uninputCrapCodeListPageSize:10,

     // 待录入A3
     uninputA3ListPageNo:1,
     uninputA3ListPageSize:10,
     
     // 待录入E1
     uninputE1ListPageNo:1,
     uninputE1ListPageSize:10,

    // 随访管理 listA3
    followUpListA3PageNo:1,
    followUpListA3PageSize:10,

    // 随访管理 listE1
    followUpListE1PageNo:1,
    followUpListE1PageSize:10,

    // 粪便样本管理（新）
    droppingsDnaNewPageNo:1,
    droppingsDnaNewPageSize:10,

    regionOptions:[],
     //肠镜检查状态
     colonscopyCheckStatus: [
      {
        value: '0',
        label: '未签到',
        key: '0'
      },
      {
        value: '1',
        label: '未检查',
        key: '1'
      },
      {
        value: '2',
        label: '已检查',
        key: '2'
      },
    ],
     //肠镜完成情况
     colonscopyCompleteStatus: [
      {
        value: '1',
        label: '未完成',
        key: '1'
      },
      {
        value: '2',
        label: '已完成',
        key: '2'
      }
    ],
       //结果录入状态
       editStatus: [
        {
          value: '1',
          label: '未录入',
          key: '1'
        },
        {
          value: '2',
          label: '已录入',
          key: '2'
        }
      ],
      //FIT结果
      fitResult: [
        {
          value: '1',
          label: '阴性',
          key: '1'
        },
        {
          value: '2',
          label: '阳性',
          key: '2'
        },
        {
          value: '3',
          label: '无效',
          key: '3'
        },
        {
          value: '4',
          label: '无结果',
          key: '4'
        }
      ],
       //审核状态
       reviewStatus: [
        {
          value: '1',
          label: '未通过',
          key: '1'
        },
        {
          value: '2',
          label: '通过',
          key: '2'
        },
        {
          value: '3',
          label: '未审核',
          key: '3'
        }
      ],
      //DNA结果
      dnaResult: [
        {
          value: '1',
          label: '阴性',
          key: '1'
        },
        {
          value: '2',
          label: '阳性',
          key: '2'
        },
        {
          value: '3',
          label: '无效',
          key: '3'
        }
      ],
         //DNA返回
         backResult: [
          {
            value: '1',
            label: '待返回',
            key: '1'
          },
          {
            value: '2',
            label: '已返回',
            key: '2'
          }
        ],

  },
  mutations:{
    get_checkCourierNumber(state,data){
      state.checkCourierNumber=data
    },
    get_hospitalType(state,data){
      state.hospitalType=data
    },
    update_list(state,data){
      state.list=data
    },
    allAuthResource(state,data){
      state.allAuthResource=data
    },
    get_pageSize(state,data){
      state.pageSize=data
    },
    get_pageNo(state,data){
      state.pageNo=data
    },
    get_fitManagementPageSize(state,data){
      state.fitManagementPageSize=data
    },
    get_uploadListPageNo(state,data){
      state.uploadListPageNo=data
    },
    get_uploadListSize(state,data){
      state.uploadListSize=data
    },
    get_bloodListPageNo(state,data){
      state.bloodListPageNo=data
    },
    get_bloodListPageSize(state,data){
      state.bloodListPageSize=data
    },
    get_uncompletedAgencyPageNo(state,data){
      state.uncompletedAgencyPageNo=data
    },
    get_uncompletedAgencyPageSize(state,data){
      state.uncompletedAgencyPageSize=data
    },
    get_fecalListPageNo(state,data){
      state.fecalListPageNo=data
    },
    get_fecalListPageSize(state,data){
      state.fecalListPageSize=data
    },
    get_salivaListPageNo(state,data){
      state.salivaListPageNo=data
    },
    get_salivaListPageSize(state,data){
      state.salivaListPageSize=data
    },
    get_uncompletedbloodListPageNo(state,data){
      state.uncompletedbloodListPageNo=data
    },
    get_uncompletedbloodListPageSize(state,data){
      state.uncompletedbloodListPageSize=data
    },
    get_uncompletedfecalListPageNo(state,data){
      state.uncompletedfecalListPageNo=data
    },
    get_uncompletedfecalListPageSize(state,data){
      state.uncompletedfecalListPageSize=data
    },
    get_uncompletedsalivaListPageNo(state,data){
      state.uncompletedsalivaListPageNo=data
    },
    get_uncompletedsalivaListPageSize(state,data){
      state.uncompletedsalivaListPageSize=data
    },
    get_countryBloodListPageNo(state,data){
      state.countryBloodPageNo=data
    },
    get_countryBloodListPageSize(state,data){
      state.countryBloodPageSize=data
    },
    get_countryFecalListPageNo(state,data){
      state.countryFecalListPageNo=data
    },
    get_countryFecalListPageSize(state,data){
      state.countryFecalListPageSize=data
    },
    get_countrySalivaListPageNo(state,data){
      state.countrySalivaListPageNo=data
    },
    get_countrySalivaListPageSize(state,data){
      state.countrySalivaListPageSize=data
    },
    get_fitManagementPageNo(state,data){
      state.fitManagementPageNo=data
    },
    get_dnaManagementPageSize(state,data){
      state.dnaManagementPageSize=data
    },
    get_dnaManagementPageNo(state,data){
      state.dnaManagementPageNo=data
    },
    get_colonscopyListSize(state,data){
      state.colonscopyListSize=data
    },
    get_colonscopyListNo(state,data){
      state.colonscopyListNo=data
    },
    get_countryColonscopyListPageSize(state,data){
      state.countryColonscopyListPageSize=data
    },
    get_countryColonscopyListPageNo(state,data){
      state.countryColonscopyListPageNo=data
    },
    get_areaDnaManagementPageSize(state,data){
      state.areaDnaManagementPageSize=data
    },
    get_areaDnaManagementPageNo(state,data){
      state.areaDnaManagementPageNo=data
    },
    get_areaFitManagementPageNo(state,data){
      state.areaFitManagementPageNo=data
    },
    get_areaFitManagementPageSize(state,data){
      state.areaFitManagementPageSize=data
    },
    get_countryFitManagementPageNo(state,data){
      state.countryFitManagementPageNo=data
    },
    get_countryFitManagementPageSize(state,data){
      state.countryFitManagementPageSize=data
    },
    get_regionColonscopyListPageSize(state,data){
      state.regionColonscopyListPageSize=data
    },
    get_regionColonscopyListPageNo(state,data){
      state.regionColonscopyListPageNo=data
    },
    get_subjectsListPageSize(state,data){
      state.subjectsListPageSize=data
    },
    get_subjectsListPageNo(state,data){
      state.subjectsListPageNo=data
    },
    get_cancerListPageSize(state,data){
      state.cancerListPageSize=data
    },
    get_cancerListPageNo(state,data){
      state.cancerListPageNo=data
    },
    get_uncompletedRiskFactorsPageSize(state,data){
      state.uncompletedRiskFactorsPageSize=data
    },
    get_uncompletedRiskFactorsPageNo(state,data){
      state.uncompletedRiskFactorsPageNo=data
    },
    get_uncompletedDNAPageSize(state,data){
      state.uncompletedDNAPageSize=data
    },
    get_uncompletedDNAPageNo(state,data){
      state.uncompletedDNAPageNo=data
    },
    get_regionalNumberPageSize(state,data){
      state.regionalNumberPageSize=data
    },
    get_regionalNumberPageNo(state,data){
      state.regionalNumberPageNo=data
    },
    get_uncompletedDNAexaminePageSize(state,data){
      state.uncompletedDNAexaminePageSize=data
    },
    get_uncompletedDNAexaminePageNo(state,data){
      state.uncompletedDNAexaminePageNo=data
    },
    get_uncompletedEnteroscopyPageSize(state,data){
      state.uncompletedDNAexaminePageSize=data
    },
    get_uncompletedEnteroscopyPageNo(state,data){
      state.uncompletedEnteroscopyPageNo=data
    },
    get_uncompletedFITNumberPageSize(state,data){
      state.uncompletedFITNumberPageSize=data
    },
    get_uncompletedFITNumberPageNo(state,data){
      state.uncompletedFITNumberPageNo=data
    },
    get_uncompletedFITResultPageSize(state,data){
      state.uncompletedFITResultPageSize=data
    },
    get_uncompletedFITResultPageNo(state,data){
      state.uncompletedFITResultPageNo=data
    },
    get_unreservedEnteroscopyPageSize(state,data){
      state.unreservedEnteroscopyPageSize=data
    },
    get_unreservedEnteroscopyPageNo(state,data){
      state.unreservedEnteroscopyPageNo=data
    },
    get_resourcePageSize(state,data){
      state.resourcePageSize=data
    },
    get_resourcePageNo(state,data){
      state.resourcePageNo=data
    },
    get_reqResourcePageSize(state,data){
      state.reqResourcePageSize=data
    },
    get_reqResourcePageNo(state,data){
      state.reqResourcePageNo=data
    },
    get_dictionaryPageSize(state,data){
      state.dictionaryPageSize=data
    },
    get_dictionaryPageNo(state,data){
      state.dictionaryPageNo=data
    },
    get_dictionaryTypePageSize(state,data){
      state.dictionaryTypePageSize=data
    },
    get_dictionaryTypePageNo(state,data){
      state.dictionaryTypePageNo=data
    },
    get_abnormalManagementListPageSize(state,data){
      state.abnormalManagementListPageSize=data
    },
    get_abnormalManagementListPageNo(state,data){
      state.abnormalManagementListPageNo=data
    },
    //noScreeningResultsPageSize
    get_noScreeningResultsPageSize(state,data){
      state.noScreeningResultsPageSize=data
    },
    get_noScreeningResultsPageNo(state,data){
      state.noScreeningResultsPageNo=data
    },
    get_departmentPageSize(state,data){
      state.departmentPageSize=data
    },
    get_departmentPageNo(state,data){
      state.departmentPageNo=data
    },
    get_roleListSize(state,data){
      state.roleListSize=data
    },
    get_roleListNo(state,data){
      state.roleListNo=data
    },
    get_userListSize(state,data){
      state.userListSize=data
    },
    get_userListNo(state,data){
      state.userListNo=data
    },
    get_expressListSize(state,data){
      state.expressListPageSize=data
    },
    get_expressListNo(state,data){
      state.expressListPageNo=data
    },
    get_messageListSize(state,data){
      state.messageListPageSize=data
    },
    get_messageListNo(state,data){
      state.messageListPageNo=data
    },
    get_stayColonscopyListSize(state,data){
      state.stayColonscopyListPageSize=data
    },
    get_stayColonscopyNo(state,data){
      state.stayColonscopyListPageNo=data
    },
    get_cancerList1PageSize(state,data){
      state.cancerList1PageSize=data
    },
    get_cancerList1PageNo(state,data){
      state.cancerList1PageNo=data
    },
    get_countrySubjectsListPageSize(state,data){
      state.countrySubjectsListPageSize=data
    },
    get_countrySubjectsListPageNo(state,data){
      state.countrySubjectsListPageNo=data
    },
    get_uninputCrapCodeListPageNo(state,data){
      state.uninputCrapCodeListPageNo = data
    },
    get_uninputCrapCodeListPageSize(state,data){
      state.uninputCrapCodeListPageSize = data
    },
    get_uninputA3ListPageNo(state,data){
      state.uninputA3ListPageNo = data;
    },
    get_uninputA3ListPageSize(state,data){
      state.uninputA3ListPageSize = data;
    },
    // 
    get_uninputE1ListPageNo(state,data){
      state.uninputE1ListPageNo = data;
    },
    get_uninputE1ListPageSize(state,data){
      state.uninputE1ListPageSize = data;
    },
    get_followUpListA3PageNo(state,data){
      state.followUpListA3PageNo = data;
    },
    get_followUpListA3PageSize(state,data){
      state.followUpListA3PageSize = data;
    },
    get_followUpListE1PageNo(state,data){
      state.followUpListE1PageNo = data;
    },
    get_followUpListE1PageSize(state,data){
      state.followUpListE1PageSize = data;
    },
    get_droppingsDnaNewPageNo(state,data){
      state.droppingsDnaNewPageNo = data;
    },
    get_droppingsDnaNewPageSize(state,data){
       state.droppingsDnaNewPageSize = data;
    }
  },
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store
