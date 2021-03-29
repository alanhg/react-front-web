import { LazyLoad } from 'src/app/components/main/lazy-load';
import React, { Suspense } from 'react';
import { Switch } from 'react-router';

const routes = () => {

  return (
    <Suspense fallback={<LazyLoad/>}>
      <Switch>

      </Switch>
    </Suspense>
  );
};

export default () => routes();
