import React, {useState} from 'react';
import {View, Image, Text, FlatList, TouchableHighlight} from 'react-native';
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
  onRemovePress,
  currentEmail,
}) => {
  const {
    name,
    completedItemsCount,
    totalItemsCount,
    creator,
    receivers,
  } = listItem;

  const collaborators = [];
  if (creator && receivers) {
    if (creator !== currentEmail) {
      collaborators.push(creator);
    }
    receivers.forEach(receiver => {
      if (receiver !== currentEmail) {
        collaborators.push(receiver);
      }
    });
  }

  const [menuVisible, setMenuVisible] = useState(false);

  const onItemPressHandler = () => {
    if (onItemPress) {
      onItemPress(listItem.id);
    }
  };

  const onRemovePressHandler = () => {
    if (onRemovePress) {
      onRemovePress(listItem);
    }
    setMenuVisible(false);
  };

  const onSharePressHandler = () => {
    console.log('onSharePressHandler');
    setMenuVisible(false);
  };

  const onMenuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const footerSeparatorLineComponent =
    collaborators && collaborators.length > 0 ? (
      <View style={styles.footerSeparationLine} />
    ) : null;

  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={onMenuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption onSelect={onSharePressHandler} text="Поделиться" />
        <MenuOption onSelect={onRemovePressHandler} text="Удалить" />
      </MenuOptions>
    </Menu>
  );

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
          <TouchableHighlight
            style={styles.menuTouchable}
            underlayColor="#e7e7e7"
            onPress={onMenuPressHandler}>
            <View style={styles.menuContainer}>
              <Image style={styles.menuIcon} source={icons.menu_vertical} />
              {menuComponent}
            </View>
          </TouchableHighlight>
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
