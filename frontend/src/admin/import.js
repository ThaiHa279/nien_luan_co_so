import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, AutoComplete, InputNumber } from 'antd';
import ReactToPrint from 'react-to-print';
import { useState, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nhaphang } from '../redux/apiRequest';

export const ImportComponet = () => {
  const material = useSelector((state) => state.items?.items.allitems);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const options = []
  material.map((i) => {
    let value = {
      value: i.name,
    }
    options.push(value);
    return i;
  })
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(Object);
  const showModal = () => {
    setIsModalOpen(true);
  };
const handleOk = async() => {
  const data = [];
  await items.map((item)=> {  
    for (let i = 0; i < material.length; i++) {
      const element = material[i];
      console.log(element);
      if (element.name === item.item) {
        let value = {
          martirial_id: element.id,
          store_id: user.store_id,
          value: item.value,
          option: "+",
        }
        data.push(value);
      }
    }
    return item;
  })
  console.log(data);
  await nhaphang(data,user.accessToken);
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};
const onFinish = (values) => {
  console.log('Received values of form:', values);

  setItems(values.users);
  showModal();
};
  const componentRef = useRef();
  return (
  <div>
 <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                marginBottom: 5,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'item']}
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
                        filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />  
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                rules={[
                  {
                    required: true,
                    message: 'Missing value',
                  },
                ]}
                initialValue={3}
              >
                <InputNumber style={{
                  width: 100
                }} 
                min={1} max={100000}/>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form> 

 {isModalOpen && <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <div ref={componentRef}>
    {
      items?.map((item) => {
        return (
          <p> {item.item} : {item.value}</p>
        )
      })
    }
    </div>
    <ReactToPrint
          trigger={() => <Button type='primary'>Print this out!</Button>}
          content={() => componentRef.current}
    />
  </Modal>}
</div>
  )
};
