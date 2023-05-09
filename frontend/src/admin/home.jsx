import '../assets/styles/seller_page.css'
import React, { Component, useEffect } from 'react';
import { Layout, Tabs , Image, Menu, Typography} from 'antd';
import { ExportOutlined, BarChartOutlined, ImportOutlined, HomeOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Outlet, useResolvedPath } from "react-router-dom";
import {ExportComponet} from './export';
import {ImportComponet} from './import';

import Statistic from './statistic';

import { getAllItems } from "../redux/apiRequest";
import logo from "./../assets/images/logo.png"

const HomePageAdmin = () => {

const {Header, Content, Footer} = Layout;
const user = useSelector((state) => state.auth.login?.currentUser);
const path = useResolvedPath();

const dispatch = useDispatch();
const navigate = useNavigate();
useEffect(()=> {
    if (!user) {
        navigate("/sign-in");
    } 
    if (user?.accessToken) {
        getAllItems(dispatch);
    }
}, [])

const menu_items = [
    {
      key: '1', 
      label: (<NavLink to={'/'}><span>Trang chủ</span> </NavLink>),
      icon: <HomeOutlined/>,
    },
    {
        key: '2', 
        label: (<NavLink to ={'/seller/order'}><span>Đơn hàng</span> </NavLink>),
        icon: <HomeOutlined/>,
    },
    {
        key: '3', 
        label: (<NavLink to={'/seller'}><span>Quản lý</span> </NavLink>),
        icon: <HomeOutlined/>,
    },
]
    return (
        <Layout>
            <Header>
                <div className="logo">
                    <NavLink to={'/'}>
                        <Image src={logo} width={73} preview = {false}></Image>
                        <span> Công Ty TNHH Thái Hà </span>
                    </NavLink>
                </div>
                <div className="header">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['3']}
                        items={menu_items}
                    >
                    </Menu>
                </div>
                    <Typography.Title
                        level={4}
                        style={{color:'HighlightText',display:'flex', alignItems:'center'}}
                    >
                        <SettingOutlined style={{marginRight:5}}/> <span>Trang Quản Lý</span>
                    </Typography.Title>
                <div className="header-option">
                    <a onClick={(e) => e.preventDefault()}>
                        <div>
                        <span> {user ? <><UserOutlined /> {user.username} </>: <NavLink to={"sign-in"}>Đăng Nhập</NavLink> }</span>
                        </div>
                    </a>
                </div>
            </Header>
            <Content>
                
                    {(path.pathname === '/seller/order') ? <Outlet></Outlet> :  
                        <Tabs
                        style={{
                            width: '80%',
                            margin: 'auto',
                        }}
                        defaultActiveKey="1"
                        items={[BarChartOutlined , ExportOutlined, ImportOutlined].map((Icon, i) => {
                            const lable = ['Thống kê', 'Xuất hàng', 'Nhập hàng']
                            return {
                                label: (
                                <span>
                                    {lable[i]}
                                </span>
                                ),
                                key: i+1,
                                children: [<Statistic/>,<ExportComponet/>,<ImportComponet/>][i]
                                
                            };
                        })}
                    />
                    }
                        
            </Content>
            <Footer></Footer>
        </Layout>
    )
  }

  export default HomePageAdmin;