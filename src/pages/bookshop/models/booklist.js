export default {
  namespace: 'booklist',

  state: {
    list : [{
      key: "1",
      name: '宁燕哲',
      src: 'http://img.zcool.cn/community/018c71554972ef0000019ae9d9a619.jpg@1280w_1l_2o_100sh.jpg',
      info: '北京总部',
      count: 100,
      status: 1,
      income: 10000,
      age: 32,
      address: '北京海淀'
    }, {
      key: 2,
      name: '任柯浩',
      src: 'http://img.zcool.cn/community/0165c75a602e0ba8012113c7d220e7.jpg@2o.jpg',
      info: '北京总部',
      count: 100,
      status: 2,
      income: 10000,
      age: 32,
      address: '北京朝阳'
    }, {
      key: 3,
      name: '张永毅',
      src: 'http://b-ssl.duitang.com/uploads/item/201502/21/20150221015931_PKVjs.jpeg',
      info: '北京总部',
      count: 100,
      status: 3,
      income: 10000,
      age: 32,
      address: '北京丰台'
    }, {
      key: 4,
      name: '黄林',
      src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=208833296,2544826963&fm=26&gp=0.jpg',
      info: '北京总部',
      count: 100,
      status: 2,
      income: 10000,
      age: 32,
      address: '北京顺义'
    }, {
      key: 5,
      name: '陈美锋',
      src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2480466935,1987570307&fm=26&gp=0.jpg',
      info: '北京总部',
      count: 100,
      status: 3,
      income: 10000,
      age: 32,
      address: '北京通州'
    }, {
      key: 6,
      name: '李兆廷',
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545294423215&di=d31d816a59c541c894f439eb8290794b&imgtype=0&src=http%3A%2F%2Fimg.hao661.com%2Fqq.hao661.com%2Fuploads%2Fallimg%2F180713%2F233Z92I3-6.jpg',
      info: '北京总部',
      count: 100,
      status: 2,
      income: 10000,
      age: 32,
      address: '北京大兴'
    }]
  },

  effects: {
    // *GetList(payload, { call, put }) {
    //   const response = yield call(()=>{
    //     // return fetch("http://123.206.55.50:15000/shop/list")
    //     // .then(req=>req.json()).then(res=>{
    //     //   return res.data.list
    //     // })
    //     return state.list
    //   });
    //   yield put({
    //     type: 'getList',
    //     payload: response
    //   });
    // },
    // *UpdataList(payload,{put}){
    //   const data=payload.data
    //   const obj=JSON.parse(window.localStorage.getItem('daload'))
    //   const newobj={...obj,...data}
    //   const newarr=state.list
    //   newarr[parseInt(newobj.key)-1]=newobj
    //   console.log(newarr)
    // },
    // *DeleteList(){
    //   console.log("点击删除")
    // }
  },

  reducers: {
    //获取初始列表
    getList:(state)=>{
      return {...state}
    },
    //编辑
    updataList:(state,action)=>{
      const data=action.data
      const obj=JSON.parse(window.localStorage.getItem('daload'))
      const newobj={...obj,...data}
      const newarr=state.list
      newarr[parseInt(newobj.key)-1]=newobj
      return {...state,list:newarr}
    },
    //删除
    deleteList:(state,action)=>{
      const newarr=[]
      state.list.map((v,i)=>{
        if(parseInt(v.key)!=window.localStorage.getItem("delete_key")){
          newarr.push(v)
        }
      })
      return {...state,list:newarr}
    },
    //增加
    addlist:(state,action)=>{
      const obj=action.data
      obj.key=state.list.length*1+1*1
      if(obj.status[0]=="营业"){
        obj.status=1
      }else if(obj.status[0]=="停业"){
        obj.status=2
      }else{
        obj.status=3
      }
      const newarr=state.list
      newarr.push(obj)
      console.log(state.list)
      return {...state,list:newarr}
    }
  },
};
