import request from '@/utils/request';
import {host} from './config'

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request(`${host}/users/currentUser`);
}
