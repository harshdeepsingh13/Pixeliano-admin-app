import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  autocompleteContainer: {
    position: 'relative',
  },
  autocompleteInput: {},
  autocomplete: ({x, y, width, height}) => ({
    position: 'absolute',
    top: height,
    height: height ? Math.ceil(3.3 * height) : 100,
    width: '92%',
    left: '7%',
    backgroundColor: 'white',
    opacity: 0.8,
    elevation: 2,
    borderRadius: 4,
    zIndex: 1,
  }),
  autocompleteItem: {
    padding: 10,
  },
  itemText: {
    fontWeight: 'bold',
    width: '100%',
  },
  addNewItem: {
    flexDirection: 'row',
    width: '100%',
  },
});
