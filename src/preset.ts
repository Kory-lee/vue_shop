import create from './create';
import * as components from './components';

export default create({
  components: Object.keys(components).map((key) => components[key as keyof typeof components]),
});
