import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Hero from './pages/Hero';
import Initial from './pages/Initial';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Initial} exact />
        <Route path='/heroes' component={Hero} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
