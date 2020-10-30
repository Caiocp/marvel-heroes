import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Initial from './pages/Initial';
import Hero from './pages/Hero';
import Comics from './pages/Comics';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Initial} exact />
        <Route path='/heroes' component={Hero} />
        <Route path='/comics' component={Comics} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
