import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, AutoComplete, InputNumber, Table, Tag } from 'antd';
import ReactToPrint from 'react-to-print';
import { useState, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ExportStore } from '../redux/apiRequest';
import Typography from 'antd/es/typography/Typography';

export const ExportComponet = () => {
  const material = useSelector((state) => state.materials?.items.allItems);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const options = []
  material.map((i) => {
    let item = {
      value: i.name,
      id: i.id
    }
    options.push(item);
    return i;
  })
  
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    }, 
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price'
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(Object);
  const showModal = () => {
    setIsModalOpen(true);
  };
const handleOk = async() => {
  await ExportStore({items: items, staff_id: user.id, store_id: user.store_id},user.accessToken);
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};
const onSelect = (value) => {
  console.log('onSelect', value);
};
const onFinish = async(values) => {
  var check = 1;
  const data = await values.users.map((item)=> {
    const item_check = material.find((m) => m.name === item.name)
    if ((item_check.quantity == null) || (item.quantity > item_check.quantity)) check = 0;
    return {
      ...item,
      id: item_check.id
    }
  })
  if (!check){
    alert('Số lượng sản phẩm trong kho không đủ.')
    return;
  } 
  console.log('Received values of form:', data);
  setItems(data);
  showModal();
};
const componentRef = useRef()
  return (
  <div>
 <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 1000,
    }}
    autoComplete="off"
  >
    <Form.List name="users" >
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            return (
            <Space
              key={key}
              style={{
                marginBottom: 5,
                // display:'flex',
              }}
              align="baseline"
            >
              <Form.Item
                label="Tên mặt hàng"
                {...restField}
                name={[name, 'name']}
                rules={[
                  {
                    required: true,
                    message: 'Missing item name',
                  },
                ]}
              >
                  <AutoComplete
                        style={{
                        width: 200,
                        }}
                        options={options}
                        placeholder="Sản phẩm"
                        filterOption={ (inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSelect={onSelect}
                    />  
              </Form.Item>
              <Form.Item
                {...restField}
                label="Số lượng"
                name={[name, 'quantity']}
                rules={[
                  {
                    required: true,
                    message: 'Missing value',
                  },
                ]}
                initialValue={1}
              >
                <InputNumber style={{
                  width: 100
                }} 
                min={1} max={100000}/>
              </Form.Item>
              <Form.Item
                {...restField}
                label="Giá"
                name={[name, 'price']}
                rules={[
                  {
                    required: true,
                    message: 'Missing value',
                  },
                ]}
                initialValue={10000}
              >
                <InputNumber style={{
                  width: 100
                }} 
                min={1} max={1000000000}/>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          )}

          )}
          <Form.Item>
            <Button style={{width: '20%', marginRight: 30}} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
            <Button style={{width: '20%'}}  type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Form> 

 {isModalOpen && <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div className='page_print' ref={componentRef}>
      <Typography.Title level={3} style={{margin: 'auto', width:'50%'}}>Hóa Đơn Bán Hàng</Typography.Title>
      <br/>
      <br/>
      <Typography>Nhân viên: {user.name} </Typography>
      <br/>
      <Typography>Mã cửa hàng: {user.store_id}</Typography>
      <br/>
      <Table pagination={false} dataSource={items} columns={columns} />
      <br/>
      <Typography style={{marginLeft:'70%'}}>Xác nhận</Typography>
    </div>
    <ReactToPrint
          trigger={() => <Button type='primary'>Print this out!</Button>}
          content={() => componentRef.current}
    />
  </Modal>}
</div>
  )
};
