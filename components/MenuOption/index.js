import React from 'react';
import {View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import Button from '../BasicUIElements/Button';
import {MenuItem} from 'react-native-material-menu';

const MenuOption = ({
                      menuText,
                      menuHandleClick,
                    }) => {
  return (
    <View style={style.menuOptionsContainer}>
      <MenuItem
        onPress={menuHandleClick}
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
};

MenuOption.navigationOptions = {};

export default MenuOption;
