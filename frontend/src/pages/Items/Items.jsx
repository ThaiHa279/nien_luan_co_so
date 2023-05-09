import './Items.css';
import { useLocation } from 'react-router-dom';
import {ShoppingCartOutlined} from '@ant-design/icons';
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getListItems} from "../../redux/apiRequest"
import Header from '../../components/Header/Header';
import { addItems } from '../../redux/cartSlice';
import { Breadcrumb, Layout, theme,  Button, Card , Space, Modal } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const {Meta} = Card
const {Content, Footer } = Layout;
const ListItems = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;

  useEffect(()=> {
    getListItems(id ,dispatch);   
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const showModal = (item) => {
    setIsModalOpen(true);
    setDescription(item.description)
    setTitle(item.name)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items =  useSelector((state) => state.materials?.items.listItems);
  var items_rever = []
  if (items?.length > 0) {
    for (let i = items.length - 1; i >= 0; i--) {
      items_rever.push(items[i]);
    }
  } 
  const handleOnclick = (item) => {
    dispatch(addItems(item)) 
  }
  return (
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
            <Space size={30} wrap className='wrap_item'>
                {
                items_rever?.map((item) => {
                  const img = require(`../../assets/images/item/${item.name}.jpg`);
                  // setDescription(`<h1>Đây là mô tả chi tiết sp ${item.name}</h1>`)
                  // const description = item.name;
                return ( 
                  <>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={ <img onClick={() => showModal(item)} className='img1' src={img}/>}
                        actions={[
                            <Button onClick={() => handleOnclick(item)}> <ShoppingCartOutlined/>Thêm vào giỏ hàng</Button>
                        ]}
                    >
                        <Meta title={ <div style={{ margin:'auto',  display: 'flex', justifyContent:'center'}} > {item.name} </div>}  description={
                          <Title level={4} style={{ margin:'auto',  display: 'flex', justifyContent:'center'}} type="danger">{
                            (item.price).toLocaleString('de-DE', {
                                    style: 'currency',
                                    currency: 'VND',
                                    maximumFractionDigits: 0
                                })}
                            </Title>
                          } />
                    </Card>
                    <Modal className='modal_description' title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                        <p
                          className="description"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                    </Modal>
                  </>
                )
                })}
            </Space>
        </div>
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

};

export default ListItems;