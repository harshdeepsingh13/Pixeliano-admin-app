import React, {useRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Menu from 'react-native-material-menu';
import HamburgerButton from '../BasicUIElements/HamburgerButton';
import theme from '../../config/theme';
import MenuOption from '../MenuOption';

const HamMenu = ({
                   buttonColor,
                   menus,
                 }) => {

  const menuRef = useRef(undefined);

  const showMenu = () => {
    menuRef.current.show();
  };
  const hideMenu = () => {
    menuRef.current.hide();
  };

  return (
    <View>
      <Menu
        button={<HamburgerButton color={buttonColor} handleOnClick={showMenu}/>}
        ref={menuRef}
      >
        {
          menus.map(({
                       text,
                       handleClick,
                       disabled = false,
                     }, index) => (
            <MenuOption
              key={index}
              menuHandleClick={() => {
                hideMenu();
                handleClick();
              }}
              menuText={text}
              disabled={disabled}
            />
          ))
        }
      </Menu>
    </View>
  );
};

HamMenu.propTypes = {
  buttonColor: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
  })),
};

HamMenu.defaultProps = {
  buttonColor: theme.light.primaryDark,
  menus: [],
};

HamMenu.navigationOptions = {};

export default HamMenu;
