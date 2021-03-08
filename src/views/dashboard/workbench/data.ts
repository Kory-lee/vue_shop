export const workProd = [
  { amount: '20', type: '成品总数' },
  { amount: '50', type: '未发布' },
  { amount: '80', type: '发布中' },
  { amount: '100', type: '异常' },
];

export const todoList = (() => {
  const ret: {}[] = [];
  for (let id = 0; id < 3; id++) {
    ret.push({
      id,
      sbmter: '张三',
      sbmtTimer: new Date().toLocaleString(),
      title: '主要',
      memo: '工作任务',
    });
  }
  return ret;
})();

export const newList = (() => {
  const ret: {}[] = [];
  for (let id = 0; id < 3; id++) {
    ret.push({
      id,
      sender: '里斯',
      sendTime: new Date().toLocaleString(),
      title: '代码',
      memo: '工作任务',
      cnteId: `c${id}`,
      cnteStatus: 'opened',
      cnteRepo: id,
    });
  }
  return ret;
})();
