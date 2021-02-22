import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '/@/store';

const Name = 'user';
@Module({ namespaced: true, name: Name, store })
class User extends VuexModule {}

export default getModule(User);
