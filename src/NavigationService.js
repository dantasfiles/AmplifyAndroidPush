import {NavigationActions} from 'react-navigation';

var _setNavigation;
const _getNavigation = new Promise((resolve, reject) => {
  _setNavigation = resolve;
});

function setTopLevelNavigator(navigatorRef) {
  _setNavigation(navigatorRef);
}

async function navigate(routeName, params) {
  const navigator = await _getNavigation;
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
