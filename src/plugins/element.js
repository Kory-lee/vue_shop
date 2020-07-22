import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import {
  Form,
  FormItem,
  Button,
  Input,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  Select,
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Card,
  Pagination,
  Dialog,
  DatePicker,
  TimeSelect,
  TimePicker,
  Loading,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Upload,
  Radio,
  Message,
  MessageBox,
  RadioGroup,
  Checkbox,
  Notification,
  Avatar,
  Link,
  Switch,
  Option,
  CheckboxGroup,
  Tooltip,
} from "element-ui";

export const Error = (message) =>
  Message({ showClose: true, message, duration: 1500, type: "error" });
export const Success = (message) =>
  Message({ showClose: true, message, type: "success" });
export const Submit = (fn, successCb = () => {}, errorCb = () => {}) =>
  fn()
    .then((result) => {
      successCb(result);
      Success(result.message);
    })
    .catch((err) => {
      errorCb();
      Error(err || "操作失败");
    });
export const Request = (fn, successCb = () => {}, errorCb = () => {}) =>
  fn()
    .then(({ data }) => {
      successCb(data);
      return data;
    })
    .catch((message) => {
      errorCb();
      Error(message || "操作失败");
    });
export const Confirm = ({
  content = "确认永久删除？是否继续",
  tip = "警告",
  fn,
  type = "warning",
}) =>
  MessageBox.confirm(content, tip, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type,
    center: true,
  })
    .then(fn)
    .catch(() => {
      Message({
        showClose: true,
        duration: 1500,
        type: "info",
        message: "已取消",
      });
    });

export default function install(Vue) {
  Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Menu);
  Vue.use(Submenu).use(MenuItem);
  Vue.use(Select);
  Vue.use(Table);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Card);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(DatePicker);
  Vue.use(TimePicker);
  Vue.use(TimeSelect);
  Vue.use(Dropdown);
  Vue.use(DropdownItem);
  Vue.use(DropdownMenu);
  Vue.use(Upload);

  Vue.use(Checkbox).use(CheckboxGroup);
  Vue.use(Link);
  Vue.use(Switch);
  Vue.use(Option);
  Vue.use(Avatar);
  Vue.use(Tooltip);
  Vue.use(Radio).use(RadioGroup);

  Vue.use(Loading.directive);

  Vue.prototype.$message = Message;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message.error = Error;
  Vue.prototype.$message.success = Success;
  Vue.prototype.$submit = Submit;
  Vue.prototype.$msgb = MessageBox;
  Vue.prototype.$confirm = Confirm;
  Vue.prototype.$request = Request;

  Vue.component(CollapseTransition.name, CollapseTransition);
}
