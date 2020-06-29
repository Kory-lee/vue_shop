import { Message, MessageBox, Notification } from 'element-ui';

Message.error = (message) => Message({ showClose: true, message: message, duration: 1500, type: 'error' });
Message.success = (message) => Message({ showClose: true, message: message, type: 'success' });
Message.submit = (fn, successCb = () => {}, errorCb = () => {}) =>
  fn()
    .then((result) => {
      successCb(result);
      Message.success(result.message);
    })
    .catch((err) => {
      errorCb();
      Message.error(err.message || '操作失败');
    });
MessageBox.$confirm = ({ content, tip = '警告', fn, type = 'warning' }) =>
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
export const Error = Message.error;
export const Success = Message.success;
export const Confirm = MessageBox.$confirm;

export const install = {
  install(Vue) {
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message.error = Message.error;
    Vue.prototype.$message.success = Message.success;
    Vue.prototype.$submit = Message.submit;
    Vue.prototype.$msgb = MessageBox;
    Vue.prototype.$confirm = MessageBox.$confirm;
    Vue.prototype.$request = (fn, successCb = () => {}, errorCb = () => {}) =>
      fn()
        .then((result) => {
          successCb(result);
        })
        .catch((err) => {
          errorCb();
          Message.error(err.message || '操作失败');
        });
  },
};
