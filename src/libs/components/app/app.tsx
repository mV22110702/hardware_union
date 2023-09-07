import React from 'react';
import {Content} from "../content/content";
import {Layout as AntLayout} from "antd";
import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {RouterOutlet} from "../router/router";
import {Navbar} from "../navbar/navbar";
import '~/assets/css/scaffolding.scss';
import {AppLogo} from "~/libs/components/app-logo/app-logo";

function App() {
    return (
        <AntLayout>
            <Header>
                <AppLogo/>
                <Navbar/>
            </Header>
            <Content>
                <RouterOutlet/>
            </Content>
            <Footer/>
        </AntLayout>

    );
}

export {App};
