import { RouterState } from "connected-react-router";

export interface IUserState {
  firstname: string;
  lastname: string;
}

export interface IRootState {
  user: IUserState;
  router: RouterState;
}
