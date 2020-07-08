import { Message, MessageBox, Notification } from 'element-ui';

export const Error = (message) => Message({ showClose: true, message: message, duration: 1500, type: 'error' });
export const Success = (message) => Message({ showClose: true, message: message, type: 'success' });
export const Submit = (fn, successCb = () => {}, errorCb = () => {}) =>
  fn()
    .then((result) => {
      successCb(result);
      Message.success(result.message);
    })
    .catch((err) => {
      errorCb();
      Message.error(err.message || '操作失败');
    });
export const Request = (fn, successCb = () => {}, errorCb = () => {}) =>
  fn()
    .then(({ data }) => {
      successCb(data);
      return data;
    })
    .catch((err) => {
      errorCb();
      Message.error(err.message || '操作失败');
    });
export const Confirm = ({ content = '确认永久删除？是否继续', tip = '警告', fn, type = 'warning' }) =>
  MessageBox.confirm(content, tip, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true,
  })
    .then(fn)
    .catch(() => {
      Message({
        showClose: true,
        duration: 1500,
        type: 'info',
        message: '已取消',
      });
    });
export const install = {
  install(Vue) {
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message.error = Error;
    Vue.prototype.$message.success = Success;
    Vue.prototype.$submit = Submit;
    Vue.prototype.$msgb = MessageBox;
    Vue.prototype.$confirm = Confirm;
    Vue.prototype.$request = Request;
  },
};
