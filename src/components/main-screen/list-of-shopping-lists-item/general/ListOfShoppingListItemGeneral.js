import React, {useState} from 'react';
import {View, Image, Text, FlatList, TouchableHighlight} from 'react-native';
import {icons} from '../../../../assets/icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ListOfShoppingListsItemGeneral = ({
  styles,
  listItem,
  online,
  onItemPress,
  onRemovePress,
  onSharedPress,
  currentEmail,
}) => {
  const {
    id,
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
  const currentUserIsListAuthor = !creator || creator === currentEmail;

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
    // console.log('onSharePressHandler');
    if (onSharedPress) {
      onSharedPress(id);
    }
    setMenuVisible(false);
  };

  const onMenuPressHandler = () => {
    setMenuVisible(!menuVisible);
  };

  const footerSeparatorLineComponent =
    collaborators && collaborators.length > 0 ? (
      <View style={styles.footerSeparationLine} />
    ) : null;

  const collaboratorsIconComponent =
    collaborators.length > 0 ? (
      <View
        style={{
          width: 30,
          alignSelf: 'stretch',
          marginTop: 4,
          marginBottom: 4,
        }}>
        <Image
          style={{transform: [{scale: 0.8}]}}
          source={currentUserIsListAuthor ? icons.outgoing : icons.incoming}
        />
      </View>
    ) : null;

  const shareListMenuOption =
    currentUserIsListAuthor && online ? (
      <MenuOption onSelect={onSharePressHandler} text="Поделиться" />
    ) : null;
  const menuComponent = (
    <Menu opened={menuVisible} onBackdropPress={onMenuPressHandler}>
      <MenuTrigger text="" />
      <MenuOptions>
        {shareListMenuOption}
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
          {collaboratorsIconComponent}
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
                    marginTop: 4,
                    marginBottom: 4,
                    marginRight: 4,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
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

const comparator = (prevProps, currProps) => {
  return (
    prevProps.listItem.updateTimestamp === currProps.listItem.updateTimestamp
  );
};

// export default React.memo(ListOfShoppingListsItemGeneral, comparator);
export default ListOfShoppingListsItemGeneral;
