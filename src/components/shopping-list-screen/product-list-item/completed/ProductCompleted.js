import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {icons} from '../../../../assets/icons';
import {PRODUCT_NOT_COMPLETED} from '../../../../services/storage/data/productStatus';

export const ProductCompleted = ({styles, itemToRender, onStatusPress}) => {
  const statusPressHandler = () => {
    onStatusPress(itemToRender.id, PRODUCT_NOT_COMPLETED);
  };

  const noteExistComponent = (
    <View style={styles.noteContainer}>
      <Text style={styles.note}>{itemToRender.note}</Text>
    </View>
  );

  const noteNotExistComponent = <View />;

  const noteComponent =
    itemToRender.note.length > 0 ? noteExistComponent : noteNotExistComponent;

  return (
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => console.log('PRESS')}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text
                style={styles.productName}
                numberOfLines={2}
                elipsizeMode="tail">
                {itemToRender.name}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <View style={styles.quantityCountContainer}>
                <Text style={styles.quantityCount} numberOfLines={1}>
                  {itemToRender.quantity}
                </Text>
              </View>
              <View style={styles.quantityUnitContainer}>
                <Text style={styles.quantityUnit} numberOfLines={1}>
                  {itemToRender.unit}
                </Text>
              </View>
            </View>
          </View>
          {noteComponent}
        </View>
        <TouchableWithoutFeedback
          style={styles.statusTouchable}
          onPress={statusPressHandler}>
          <View style={styles.statusContainer}>
            <View style={styles.statusFinished}>
              <Image style={styles.checmarkIcon} source={icons.checkmark} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};
