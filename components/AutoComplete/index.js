import React, {memo, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import config from '../../config/config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import theme from '../../config/theme';

library.add(faPlusSquare);

const AutoComplete = ({
                        children,
                        inputValue,
                        autoCompleteService,
                        itemSelectCallback,
                      }) => {

  const [serviceStatus, setServiceStatus] = useState(config.status.default);
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const [inputViewDisplayConfig, setInputViewDisplayConfig] = useState({});

  useEffect(
    () => {
      (async () => {
        if (inputValue.length > 2 && autocompleteItems.length === 0) {
          try {
            setServiceStatus(config.status.started);
            const items = await autoCompleteService(inputValue);
            setServiceStatus(config.status.success);
            setAutocompleteItems([...items]);
          } catch (e) {
            console.log('autocomplete error', e);
            setServiceStatus(config.status.failed);
          }
        }
        if (inputValue.length === 0) {
          setServiceStatus(config.status.default);
          setAutocompleteItems([]);
        }
      })();

    },
    [inputValue],
  );
  return (
    <View style={style.autocompleteContainer}>
      <View style={style.autocompleteInput} onLayout={({
                                                         nativeEvent: {
                                                           layout: {
                                                             x,
                                                             y,
                                                             width,
                                                             height,
                                                           },
                                                         },
                                                       }) => {
        console.log('sadads', x, y, width, height, Math.ceil(1.1 * height));
        setInputViewDisplayConfig({x, y, width, height});
      }}>
        {
          children(inputValue)
        }
      </View>
      {
        inputValue.length > 2 &&
        <ScrollView
          style={style.autocomplete(inputViewDisplayConfig)}
          keyboardShouldPersistTaps={'always'}
        >
          {
            serviceStatus === config.status.started &&
            <ActivityIndicator
              color={theme.light.primaryDark}
              size={30}
            />
          }
          {
            serviceStatus === config.status.success &&
            autocompleteItems.map((item) =>
              (
                <TouchableOpacity
                  key={item.itemId}
                  style={style.autocompleteItem}
                  onPress={itemSelectCallback.bind(this, item)}
                >
                  <Text style={style.itemText}>
                    {
                      item.value
                    }
                  </Text>
                </TouchableOpacity>
              ))
          }
          {
            inputValue.length !== 0 &&
            <TouchableOpacity
              style={[style.autocompleteItem, style.addNewItem]}
              onPress={itemSelectCallback.bind(this, {isNew: true, value: inputValue})}
            >
              <FontAwesomeIcon
                icon={'plus-square'}
                size={21}
                color={theme.light.primaryDark}
                style={{marginRight: 10}}
              />
              <Text style={style.itemText}>
                {
                  inputValue
                }
              </Text>
            </TouchableOpacity>
          }
        </ScrollView>
      }
    </View>
  );
};

AutoComplete.propTypes = {
  inputValue: PropTypes.string.isRequired,
  autoCompleteService: PropTypes.func.isRequired,
  itemSelectCallback: PropTypes.func,
};

AutoComplete.defaultProps = {
  inputValue: '',
  autoCompleteService: () => console.log('Auto complete service.'),
  itemSelectCallback: () => console.log('item touch callback'),
};

AutoComplete.navigationOptions = {};

export default memo(
  AutoComplete,
  (prevProps, nextProps) =>
    prevProps.inputValue === nextProps.inputValue,
);
