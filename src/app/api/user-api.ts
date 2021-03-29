import { BaseApi } from 'app/types/Api';
import axios, { AxiosPromise } from 'axios';
import { IUserState } from "app/types/IRootState";

class UserApi extends BaseApi {
  getUserInfo = (): AxiosPromise<IUserState> => axios.get('/mock-data/user.json', {cache: true});
}

const userApi = new UserApi('');
export { userApi };
