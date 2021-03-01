import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import store from '/@/store';
import { formatToDateTime } from '/@/utils/data';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

export interface ErrorInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}
export interface ErrorState {
  getErrorInfoState: ErrorInfo[] | null;
  getErrorListCountState: number;
}
const name = 'error';

hotModuleUnregisterModule(name);
@Module({ dynamic: true, name, namespaced: true, store })
class Error extends VuexModule implements ErrorState {
  private errorInfoState: ErrorInfo[] = [];
  private errorListCountState = 0;

  get getErrorInfoState() {
    return this.errorInfoState;
  }

  get getErrorListCountState() {
    return this.errorListCountState;
  }

  @Mutation
  commitErrorInfoState(info: ErrorInfo) {
    const item = { ...info, time: formatToDateTime(new Date()) };
    this.errorInfoState = [item, ...this.errorInfoState];
    this.errorListCountState += 1;
  }
}
export default getModule(Error);
