import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = nav => { // nav is navigator function comming from react-navigation
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
