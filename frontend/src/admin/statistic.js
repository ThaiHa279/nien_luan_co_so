import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { getAllStatistic, monthStatistic} from '../redux/apiRequest'
import { useDispatch, useSelector} from 'react-redux';
import DemoPie from '../components/Pie';


const StatisticComponent = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [data, setData] = useState([]);
  useEffect(() => {
    // asyncFetch();
    getAllStatistic(dispatch, user.accessToken);
    monthStatistic(dispatch, '2023-4',user.accessToken);
    getData() 
  }, []);

  const all_statistic = useSelector((state) => state.statistic.allStatistic);
  const getData = () => {
    const df = all_statistic.map((value) => ({Date: value.date, scales: value.profit})); 
    setData(df);
  }
  // const data_pie = [
  //   {
  //     type: '分类一',
  //     value: 27,
  //   },
  //   {
  //     type: '分类二',
  //     value: 25,
  //   },
  //   {
  //     type: '分类三',
  //     value: 18,
  //   },
  //   {
  //     type: '分类四',
  //     value: 15,
  //   },
  //   {
  //     value: 10,
  //   },
  //   {
  //     type: '其他',
  //     value: 5,
  //   },
  // ];
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  const config1 = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };
  // console.log(data);
  return (
    <div> 
      <h1>Lợi nhuận từng tháng</h1>
      <br/> 
      <br/>
       {(data.length > 0 ) ? <Line {...config1} /> : <></>}
      <br/>
      <h1>Sản phẩm </h1>
      <DemoPie></DemoPie>
    </div>
  );
};


export default StatisticComponent