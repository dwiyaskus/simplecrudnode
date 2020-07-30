const datasetPagination = (data, perPage) => {
  //    let sets = [];

  let chunks = data.length / perPage;

  const page = (i, j, datas) => {
    let dataSet = [...datas];
    if (i < chunks) {
      let x = data.slice(j, j + perPage);
      dataSet = [...dataSet, x];
      return page(i + 1, j + perPage, dataSet);
    } else {
      return dataSet;
    }
  };

  const dataSets = page(0, 0, []);

  return dataSets;
};

const getNumberFromTo = (listData, activePage, numberOfData) => {
  let numbersTo =
    listData && listData.length
      ? listData.length === numberOfData
        ? activePage * listData.length
        : (activePage - 1) * numberOfData + listData.length
      : 0;
  let numbersFrom = numbersTo > 0 ? numbersTo - (listData.length - 1) : 0;

  return { numbersFrom: numbersFrom, numbersTo: numbersTo };
};

export { datasetPagination, getNumberFromTo };
