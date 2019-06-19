/**
 * Created by leicj on 2019/5/7.
 */
const DICTIONARY = {
  // 分组方案
  group: [{
      id: 'A',
      name: 'A组'
    },
    {
      id: 'B',
      name: 'B组'
    },
    {
      id: 'C',
      name: 'C组'
    },
    {
      id: 'Cg',
      name: 'C组高危'
    },
    {
      id:'Cd',
      name:'C组低危'
    }
  ],
  //  录入状态
  inputStatus: [{
      id: 1,
      name: '未录入'
    },
    {
      id: 2,
      name: '已录入'
    }
  ],
  inputStatusNew: [{
    id: 1,
    name: '未录入'
  },
  {
    id: 2,
    name: '已录入'
  },
  {
    id: 3,
    name: '未提供'
  }
],
  //  随访状态
  followStatus: [{
      id: 0,
      name: '癌-T0'
    },
    {
      id: 1,
      name: '未开始'
    },
    {
      id: 2,
      name: '未邀请'
    },
    {
      id: 3,
      name: '随访中'
    },
    {
      id: 4,
      name: '失访'
    },
    {
      id: 9,
      name: '随访成功'
    }
  ],
  //  随访分组
  followGroup: [{
      id: 0,
      name: '癌-T0'
    }, {
      id: 1,
      name: '结肠镜组'
    },
    {
      id: 2,
      name: 'FIT组'
    },
    {
      id: 3,
      name: '年度随访问卷组'
    }
  ],
  //  违反分类
  followCategory: [{
      id: 1,
      name: '受试者失联'
    },
    {
      id: 2,
      name: '拒绝年度随访问卷'
    },
    {
      id: 3,
      name: '拒绝接受FIT检查'
    },
    {
      id: 4,
      name: 'FIT阳性者拒绝接受结肠镜检查'
    },
    {
      id: 5,
      name: '风险评估高危者拒绝结肠镜检查'
    }
  ],
  // 发放状态
  providStatus:[
  {
    id: 1,
    name: '未发放'
  },
  {
    id: 2,
    name: '已发放'
  }
  ]
}

export default DICTIONARY
