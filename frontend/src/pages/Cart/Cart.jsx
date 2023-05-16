import './Cart.css'
import Header from "../../components/Header/Header";
import { Typography } from 'antd';
import { Select, Space, Input, Table, Breadcrumb, Layout, theme,  Button, Card, InputNumber,Image, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { orderItems } from '../../redux/apiRequest';
import { removeItems, changeQuantityItem } from '../../redux/cartSlice';
import { useState } from 'react';
import axios from 'axios';

const {Content, Footer } = Layout;

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

function Cart() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [method, setMethod] = useState(1);
  const [delivery, setDelivery] = useState('');
  const [commune, setCommune] = useState([]);
  const [district, setDistrict] = useState([]);
  const [province, setProvince] = useState([]);
  const [communeSL, setCommuneSL] = useState('');
  const [districtSL, setDistrictSL] = useState('');
  const [provinceSL, setProvinceSL] = useState('');
  const [address, setAddress] = useState([])
  const getAllAddress = async() => {
    try {
        const data = await axios.get("https://provinces.open-api.vn/api/", { params: { depth: 3 } });
        setAddress(data.data);
        setProvince(data.data.map((province) => {
          return ({
            value: province.name,
            label: province.name
          })
        }))
    } catch(err) {
        console.log(err);
    }
  }
  const handleChangeProvince = (value) => {
    setProvinceSL(value);
    console.log(address);
    const allDistrict = address.find((province) => province.name === value).districts
    setDistrict(allDistrict.map((district) => {
          return ({
            value: district.name,
            label: district.name
          })
        }))
  }
  const handleChangeDistrict = (value) => {
    setDistrictSL(value);
    const allCommune = address.find((province) => province.name === provinceSL).districts.find((district) => district.name === value).wards
    setCommune(allCommune.map((commune) => {
          return ({
            value: commune.name,
            label: commune.name
          })
        }))
  }
  const handleChangeCommune = (value) => {
    setCommuneSL(value)
  }

  const showModal = () => {
    getAllAddress()
    setOpen(true);
  };
  const handleOrder = async() => {
    const address = delivery+' ,'+communeSL+' ,'+districtSL+' ,'+provinceSL
    orderItems(user.id, items, method ? "direct" : "card", address, user.accessToken);
  }
  const checkout = async () => {
    await fetch('http://localhost:8080/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: items})
    }).then((response) => {
        return response.json();
    }).then((response) => {
          if(response.url) {
              window.location.assign(response.url); // Forwarding user to Stripe
          }
      });
  }

  
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (method == 0) checkout();
      else handleOrder();
    }, 1000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const items =  useSelector((state) => state.cart?.items.item);

  
  const onChange = (id, value) => {
    // console.log(id, value);
    dispatch(changeQuantityItem({id: id, value: value}))
  };

  const dispatch = useDispatch();
  const handleDelete = (item) => {
    dispatch(removeItems(item));
    // alert(`Xóa ${item.name} thành công!`);
  }
  const handleChange = (value) => {
    setMethod(value);
  };
  var total = 0;
  return(
    <Layout className="layout">
      <Header>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
            <br />
            <br />
            <Card title="Giỏ hàng của bạn">
                {items.map((item) => {

                    // const string = item.quantity > 1 ? ` x ${item.quantity}`: "";
                    const img = require(`../../assets/images/item/${item.name}.jpg`);
                    return(
                      <Card
                        className='cart-item'
                        style={{
                            marginTop: 16,
                            width: '100%',
                            
                        }}
                        type="inner"
                      >
                        <Image
                          width={200}
                          height={100}
                          src={img}
                          style={{objectFit:'scale-down'}}
                        />
                        <div>{item.name}</div>
                        <div> Đơn giá: {(item.price).toLocaleString('de-DE', {
                              style: 'currency',
                              currency: 'VND',
                              maximumFractionDigits: 0
                          })}
                        </div>
                        <div> Số lượng:   <InputNumber min={1} max={10} defaultValue={item.quantity} onChange={(value) => onChange(item.id, value)} /></div>
                        <Button onClick={() => handleDelete(item)}> Xóa sản phẩm</Button>
                      </Card>
                    )
                })}
            </Card>
        </div>
        <div className='button'><Button style={{ width: 200, fontSize: 20, height: 50, margin: 20}} type='primary' onClick={showModal}>Đặt hàng</Button></div>
        <Modal
          title="Xác nhận mua hàng"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          {
            <>
            <Typography.Title
                  level={3}
                  style={{
                    margin: 'auto',
                    width: '30%',
                    marginBottom: '0.5rem'

                  }}
                >Đơn hàng</Typography.Title>
              <div>
              <Table pagination={false} dataSource={items} columns={columns} />
                {/* {items.map((item) => {
                  total += item.price*item.quantity;
                  return (
                   
                    <div className='modal_item'>
                      <div>Tên sản phẩm: {item.name}</div>
                      <div>Số lượng: {item.quantity}</div>
                      <div>Thành tiền: {(item.price*item.quantity).toLocaleString('de-DE', {
                              style: 'currency',
                              currency: 'VND',
                              maximumFractionDigits: 0
                          })}
                      </div>
                    </div>
                  )
                })} */}
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{
                    marginBottom: 5,
                  }}
                >Nhận hàng tại: </Typography.Title>
                <Space wrap style={{marginBottom: "0.5rem"}}>
                  <Select
                    style={{
                      width: 150,
                    }}
                    placeholder={'Tỉnh/Thành phố'}
                    onChange={handleChangeProvince}
                    options={province}
                  />
                  <Select
                    style={{
                      width: 150,
                    }}
                    placeholder={'Huyện/Quận'}
                    onChange={handleChangeDistrict}
                    options={district}
                  />
                  <Select
                    style={{
                      width: 150,
                    }}
                    placeholder={'Xã/Phường'}
                    onChange={handleChangeCommune}
                    options={commune}
                  />
                  </Space>
                  <Input placeholder="Địa chỉ chi tiết" onChange={(e) => {setDelivery(e.target.value)}}/>
                <Typography.Title
                  level={5}
                  style={{
                    marginBottom: 5,
                  }}
                >Chọn phương thức thanh toán</Typography.Title>
                <Select
                  defaultValue="1"
                  style={{
                    width: 400,
                    marginBottom: 5,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: '1',
                      label: 'Thanh toán trực tiếp',
                    },
                    {
                      value: '0',
                      label: 'Thanh toán bằng thẻ',
                    },
                  ]}
                />
              </div>
              {items.map((item) => {
                  total += item.price*item.quantity;
              })}
              <Typography.Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                Tổng tiền: {(total).toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0
                })}
              </Typography.Title>
            </>
          }
          
        </Modal>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
    )
}

export default Cart;