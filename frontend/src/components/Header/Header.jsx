import './Header.css'
import { useEffect } from "react";
import { Dropdown, Layout, Menu, theme,  Image, Card , Space} from 'antd';
import {ShoppingOutlined,HomeOutlined , UserOutlined, DownOutlined, CodeSandboxOutlined, ShopOutlined, CarOutlined, TeamOutlined} from  "@ant-design/icons";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/authSlice';
import logo from '../../assets/images/logo.png'
import { getTypeItems, getAllDistributor, getAllStore} from '../../redux/apiRequest';

const {Meta} = Card
const {Content, Footer, Header: AntHeader } = Layout;


const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(()=> {
    getTypeItems(dispatch);  
    getAllStore(dispatch); 
    getAllDistributor(dispatch); 
  }, [])
  
  const type_items =  useSelector((state) => state.materials?.items.typeItems);
  const list_store =  useSelector((state) => state.store?.allStore);
  const list_distributors =  useSelector((state) => state.distributor?.allDistributor);
  const menu_type_items = type_items?.map((item) => {
    return { key: 'type '+item.id, label: item.name}
  })
  const menu_stores = list_store?.map((store) => {
    return { key: 'store '+store.id, label: store.name}
  })
  const menu_distributors = list_distributors?.map((dist) => {
    return { key: 'dist '+dist.id, label: dist.name}
  })
  // const menu_stores = [];
  // const menu_distributors = [];
  const menu_items = [
    {
      key: '1', 
      label: (<NavLink to={'/'}><span>Trang chủ</span> </NavLink>),
      icon: <HomeOutlined/>,
    },
    {
      key: '2', 
      label: (<NavLink to={'/cart'}><span>Giỏ hàng</span></NavLink>),
      icon: <ShoppingOutlined/>,
    },
    {
      key: '3', 
      label: (<NavLink to={'/'}><span>Sản phẩm</span> </NavLink>),
      icon: <CodeSandboxOutlined/>,
      children: menu_type_items, 
    },
    {
      key: '4', 
      label: (<NavLink to={'/'}><span>Cửa hàng</span> </NavLink>),
      icon: <ShopOutlined/>,
      children: menu_stores,
    },
    {
      key: '5', 
      label: (<NavLink to={'/'}><span>Nhà cung cấp</span> </NavLink>),
      icon: <CarOutlined/>,
      children: menu_distributors,
    },
    {
      key: '6', 
      label: (<NavLink to={'/'}><span>Giới thiệu</span> </NavLink>),
      icon: <TeamOutlined/>,
    },
  ]

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    alert("Log out successfully!")
  } 
  const option = [{
    key: '1',
    label: (
      <div onClick={() => handleLogout()}>
        Log out
      </div>
    ),
  }, {
    key: '2',
    label: (
      <NavLink to='/seller'>
        <div>
          Seller Admin
        </div>
      </NavLink>
    ),
  },{
    key: '1',
    label: (
      <NavLink to='/sign-up'>
        <div>
          Đăng ký
        </div>
      </NavLink>
    ),
  }]
  var items = [];
  if (user) {
    items.push(option[0]);
    if (user.staff) {
      items.push(option[1]);
    }
  } else items.push(option[2]);


  return (
      <AntHeader
        style={{
          background: 'rgb(9, 74, 115)'
        }}
      >
        <div className="logo">
          <NavLink to={'/'}>
            <Image src={logo} width={73} preview = {false}></Image>
            <span> Công ty xây dựng TENZI </span>
          </NavLink>
        </div>
        <div className="header-nav">
          <Menu
            mode="horizontal"
            style={{
              background: 'rgb(9, 74, 115)',
              color: '#ffffff'
            }}
            // defaultSelectedKeys={['1']}
            items={menu_items}
          >
          </Menu>
          </div>
          <div className="header-option">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <div>
                  <span> {user ? <><UserOutlined /> {user.username} </>: <NavLink to={"sign-in"}>Đăng Nhập </NavLink> }</span>
                  <DownOutlined />
                </div>
              </a>
            </Dropdown>
            
          </div>
      </AntHeader>
      
  );
};
export default Header;