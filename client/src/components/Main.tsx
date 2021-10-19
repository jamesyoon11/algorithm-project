import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import GraphScreen from "./Graph/GraphScreen";
import GraphToolbar from "./Graph/GraphToolbar";
import GraphLegend from "./Graph/GraphLegend";
import SortScreen from "./Sort/SortScreen";
import SortToolbar from "./Sort/SortToolbar";
import TreeScreen from "./Tree/TreeScreen";
import TreeToolbar from "./Tree/TreeToolbar";

import {AlgorithmProvider} from "../contexts/algorithm-context";

class Main extends React.Component {

    currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    currentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    screenWidth = this.currentWidth * 0.96;
    marginLeft = this.currentWidth * 0.01;
    screenHeight = this.currentHeight * 0.76;
    menuHeight = this.currentHeight * 0.08;
    toolbarHeight = this.currentHeight* 0.08;
    footerHeight = this.currentHeight * 0.02;

    constructor(props) {
        super(props);
            this.state = {
                global: {
                }
            };
    }

    render() {

    return (
            <AlgorithmProvider value={this.state.global}>
                <HashRouter>
                    <Menu menuHeight={this.menuHeight} />
                    <Switch>
                        <Route path="/sort/:sortAlgorithm" >
                            <SortToolbar toolbarHeight={this.toolbarHeight} />
                            <SortScreen screenWidth={this.screenWidth} screenHeight={this.screenHeight} marginLeft={this.marginLeft}/>
                        </Route>
                        <Route path={"/graph/:graphAlgorithm"} >
                            <GraphToolbar toolbarHeight={this.toolbarHeight} />
                            <GraphScreen screenWidth={this.screenWidth} screenHeight={this.screenHeight - 20} marginLeft={this.marginLeft}/>
                            <GraphLegend graphLegendHeight={20} />
                        </Route>
                        <Route path={"/tree/:treeAlgorithm"} >
                            <TreeToolbar toolbarHeight={this.toolbarHeight} />
                            <TreeScreen treeState={this.state.global} screenWidth={this.screenWidth} screenHeight={this.screenHeight} marginLeft={this.marginLeft}/>
                        </Route>
                        <Redirect to="/sort/shell" />
                    </Switch>
                    <Footer footerHeight={this.footerHeight} />
                </HashRouter>
            </AlgorithmProvider>
        
    );
}
}

export default Main;