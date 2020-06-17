import { Message, MessageBox, Notification } from 'element-ui';

export default {
  install(Vue) {
    Vue.prototype.$message = Message;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message.error = Message.error = (message) =>
      Message({ showClose: true, message: message, duration: 1500, type: 'error' });
    Vue.prototype.$message.success = Message.success = (message) =>
      Message({ showClose: true, message: message, type: 'success' });
    Vue.prototype.confirm = ({ content, tip = '警告', fn, type = 'warning' }) => {
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
    };
    Vue.prototype.$submit = (fn, successCb = () => {}, errorCb = () => {}) =>
      fn()
        .then((result) => {
          successCb(result);
          Message.success(result.message);
        })
        .catch((err) => {
          errorCb();
          Message.error(err.message || '操作失败');
        });
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
