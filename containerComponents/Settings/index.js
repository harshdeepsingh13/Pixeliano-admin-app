import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import config from '../../config/config';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCopy} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getUserId} from '../../services/asyncStorage.service';
import theme from '../../config/theme';
import {copyToClipboard} from '../../services/Clipboard.service';
import DefaultTags from '../../components/DefaultTags';

library.add(faCopy);

const Settings = props => {

  const [rssLink, setRssLink] = useState('');
  const [isParentScrollEnabled, setIsParentScrollEnabled] = useState(true);

  const scrollViewRef = useRef(undefined);

  useEffect(
    () => {
      getUserId()
        .then(userId => {
          setRssLink(config.rssLink.replace('$userId$', userId));
        })
        .catch(e => {
          console.log('Settings getUserId Error', e.isAxiosError);
        });
    },
    [],
  );

  return (
    <ScrollView
      style={style.settingsContainer}
      ref={scrollViewRef}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode={'on-drag'}
      scrollEnabled={isParentScrollEnabled}
    >
      <View style={[style.rssLinkContainer, style.settings]}>
        <Text numberOfLines={1} style={style.rssLink}>
          {
            rssLink
          }
        </Text>
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple('', true)}
          onPress={() => copyToClipboard(rssLink)}
        >
          <FontAwesomeIcon
            icon={['far', 'copy']}
            size={26}
            color={theme.light.button.primary}
            style={{...style.copyIcon}}
          />
        </TouchableNativeFeedback>
      </View>
      <View style={[style.settings, style.defaultTagsContainer]}>
        <DefaultTags
          setIsParentScrollEnabled={setIsParentScrollEnabled}
          parentScrollRef={scrollViewRef}
        />
      </View>
    </ScrollView>
  );
};

Settings.propTypes = {};

export default Settings;
