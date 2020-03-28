import React from 'react';
import {View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {MenuItem} from 'react-native-material-menu';

const MenuOption = ({
                      menuText,
                      menuHandleClick,
                      disabled,
                    }) => {
  return (
    <View style={style.menuOptionsContainer}>
      <MenuItem
        onPress={menuHandleClick}
        disabled={disabled}
      >
        {
          menuText
        }
      </MenuItem>
    </View>
  );
};

MenuOption.propTypes = {
  menuText: PropTypes.string.isRequired,
  menuHandleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

MenuOption.defaultProps = {
  disabled: false,
};

MenuOption.navigationOptions = {};

export default MenuOption;
