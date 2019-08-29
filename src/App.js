import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
/**
 * 应用的根组件
 */

export default class App  extends React.Component{

  render() {
    return (
       <BrowserRouter>
           <Switch>
               <Route path={'/login'} component={Login}/>
               <Route path={'/'} component={Admin}/>
           </Switch>
       </BrowserRouter>
    )
  }
}