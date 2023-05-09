import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from '../redux/apiRequest';
import { Space, Table, Tag,  Badge, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Order = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const [data_item,setDataItem] = useState([]);
  const material = useSelector((state) => state.materials?.items.allItems);

  useEffect(()=> {
    getAllOrder(dispatch, user.accessToken); 
  }, [])
  
  const list_order =  useSelector((state) => state.order?.allOrder);
  const data = list_order.map((order) => {
    return {
      ...order,
      user_name: order.user.name,
      user_phone: order.user.phone,
    }
  }) 
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'user_phone',
      key: 'user_phone',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
  
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Tên mặt hàng',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
      },
    ];
    // const items = record.items.map((item) => {
    //   return {
    //     ...item,
    //     name: material.find((m) => m.id == item.material_id).name
    //   }
    // }) 
    // setDataItem(items)
    console.log(record.items);
    // return <Table columns={columns} dataSource={data_item} pagination={false} />;
  };
  return (
    <div>
       <Table
          columns={columns}
          expandable={{
            expandedRowRender
          }}
          dataSource={data}
          size="small"
        />
    </div>
  )
};
export default Order;
