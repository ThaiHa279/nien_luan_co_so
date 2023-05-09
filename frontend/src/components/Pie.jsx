import React from 'react';
import { Pie } from '@ant-design/plots';
import { useSelector} from 'react-redux';
const DemoPie = () => {
  const all_statistic = useSelector((state) => state.statistic.detailStatistic);
  const material = useSelector((state) => state.materials?.items.allItems);
  console.log(all_statistic);
  const data = all_statistic?.map((item) => {
    return ({
      type: material?.find((i) => item.material_id === i.id).name,
      value: item.sell - item.buy
    })
  })
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
      //     type: '分类五',
      //     value: 10,
      //   },
      //   {
      //     type: '其他',
      //     value: 5,
      //   },
      // ];
    console.log(data);
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
export default DemoPie;
