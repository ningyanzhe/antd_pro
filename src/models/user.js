import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      let currentUser = {...state.currentUser};
      // 覆盖用户数据
      currentUser.userid = action.payload.data.id;
      currentUser.avatar = action.payload.data.avatar;
      currentUser.address = action.payload.data.address;
      currentUser.email = action.payload.data.email;
      currentUser.phone = action.payload.data.phone;
      currentUser.name = action.payload.data.username;
      return {
        ...state,
        currentUser
      };

    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
