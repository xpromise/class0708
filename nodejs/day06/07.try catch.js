
(async () => {

  try {
    // 放可能出错代码
    await new Promise((resolve, reject) => {
      resolve(111)
    });

    await new Promise((resolve, reject) => {
      resolve('错误具体原因')
    });

    console.log(333);

  } catch (error) {
    // 一旦try中代码错误，就会停止try中代码运行，直接来catch。 由catch处理异常
    console.log('--------');
    console.log(error);
    console.log('--------');
  } finally {

  }

})();
