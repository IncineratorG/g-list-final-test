import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';
import {icons} from '../../../../assets/icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export const ListOfShoppingListsItemGeneral = ({
  styles,
  listItem,
  onItemPress,
}) => {
  const {name, collaborators, completedItemsCount, totalItemsCount} = listItem;

  const [menuVisible, setMenuVisible] = useState(false);

  const onItemPressHandler = () => {
    console.log('ON_ITEM_PRESS: ' + collaborators.length);

    // if (onItemPress) {
    //   onItemPress(listItem.id);
    // }
  };

  const onMenuPress = () => {
    console.log('ON_MENU_PRESS');
    setMenuVisible(!menuVisible);
  };

  const onPickerValueChanged = () => {
    console.log('PICKER_VALUE_CHANGED');
  };

  const footerSeparatorLineComponent =
    collaborators && collaborators.length > 0 ? (
      <View style={styles.footerSeparationLine} />
    ) : null;

  // ===r
  const pickerItems = [
    <Picker.Item label={'Удалить'} value={'1'} key={'1'} />,
    <Picker.Item label={'Поделиться'} value={'2'} key={'2'} />,
  ];
  const pickerComponent = (
    <Picker
      style={{height: 1, width: 1}}
      mode={'dropdown'}
      onValueChange={onPickerValueChanged}>
      {pickerItems}
    </Picker>
  );

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={onMenuPress}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption onSelect={() => alert('Save')} text="Save" />
        <MenuOption onSelect={() => alert('Delete')}>
          <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert('Not called')}
          disabled={true}
          text="Disabled"
        />
      </MenuOptions>
    </Menu>
  );
  // ===

  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight
        underlayColor="#e7e7e7"
        style={styles.bodyContainerTouchable}
        onPress={onItemPressHandler}>
        <View style={styles.bodyContainer}>
          <View style={styles.listNameContainer}>
            <Text style={styles.listName}>{name}</Text>
          </View>
          <View style={styles.completionContainer}>
            <Text style={styles.completionValue}>
              {completedItemsCount} / {totalItemsCount}
            </Text>
          </View>
          <TouchableWithoutFeedback
            style={styles.menuTouchable}
            underlayColor="#e7e7e7"
            onPress={onMenuPress}>
            <View style={styles.menuContainer}>
              <Image style={styles.menuIcon} source={icons.menu_vertical} />
              {menuComponent}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableHighlight>
      <View style={styles.footerContainer}>
        {footerSeparatorLineComponent}
        <View style={styles.collaboratorsContainer}>
          <FlatList
            data={collaborators}
            horizontal={true}
            activeOpacity={1}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'lightgrey',
                    margin: 4,
                    borderRadius: 5,
                  }}>
                  <Text style={{marginLeft: 4, marginRight: 4}}>{item}</Text>
                </View>
              );
            }}
            keyExtractor={item => item.toString()}
          />
        </View>
      </View>
    </View>
  );
};
