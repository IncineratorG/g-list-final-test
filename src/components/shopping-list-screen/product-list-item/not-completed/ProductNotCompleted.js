import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import {PRODUCT_COMPLETED} from '../../../../services/storage/data/productStatus';
import {ProductCategories} from '../../ProductCategories';

const ProductNotCompleted = ({
  styles,
  itemToRender,
  classes,
  onStatusPress,
  onItemPress,
  selectedCategory,
}) => {
  const getClassDescription = classId => {
    const filteredClasses = classes.filter(cl => cl.id === classId);
    return filteredClasses.length ? filteredClasses[0] : undefined;
  };

  const classDescription = getClassDescription(itemToRender.classId);

  const itemPressHandler = () => {
    if (onItemPress) {
      onItemPress(itemToRender);
    }
  };

  const statusPressHandler = () => {
    onStatusPress(itemToRender.id, PRODUCT_COMPLETED);
  };

  const noteExistComponent = (
    <View style={styles.noteContainer}>
      <Text style={styles.note}>{itemToRender.note}</Text>
    </View>
  );

  const noteNotExistComponent = <View />;

  const noteComponent =
    itemToRender.note.length > 0 ? noteExistComponent : noteNotExistComponent;

  let mustRender = false;
  if (selectedCategory === ProductCategories.types.ALL) {
    mustRender = true;
  } else if (selectedCategory === ProductCategories.types.NOT_COMPLETED) {
    mustRender = true;
  } else if (selectedCategory === itemToRender.classId) {
    mustRender = true;
  }

  if (!mustRender) {
    return null;
  }

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={classDescription.color}
      onPress={itemPressHandler}>
      <View
        style={[styles.mainContainer, {borderColor: classDescription.color}]}>
        <View
          style={[
            styles.colorComponent,
            {backgroundColor: classDescription.color},
          ]}
        />
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer}>
              <Text
                style={styles.productName}
                numberOfLines={4}
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
            <View style={styles.statusNotFinished} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableHighlight>
  );
};

// const comparator = (prevProps, currProps) => {
//   const needUpdate =
//     prevProps.itemToRender.completionStatus !==
//       currProps.itemToRender.completionStatus ||
//     prevProps.itemToRender.updateTimestamp !==
//       currProps.itemToRender.updateTimestamp ||
//     prevProps.onStatusPress !== currProps.onStatusPress;
//
//   return needUpdate;
// };

export default React.memo(ProductNotCompleted);

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   TouchableHighlight,
// } from 'react-native';
// import {PRODUCT_COMPLETED} from '../../../../services/storage/data/productStatus';
//
// const ProductNotCompleted = ({
//   styles,
//   itemToRender,
//   onStatusPress,
//   classes,
// }) => {
//   const getClassDescription = classId => {
//     const filteredClasses = classes.filter(cl => cl.id === classId);
//     return filteredClasses.length ? filteredClasses[0] : undefined;
//   };
//
//   const classDescription = getClassDescription(itemToRender.classId);
//   if (classDescription) {
//     console.log(classDescription.name + ' - ' + classDescription.color);
//   }
//
//   const statusPressHandler = () => {
//     onStatusPress(itemToRender.id, PRODUCT_COMPLETED);
//   };
//
//   const noteExistComponent = (
//     <View style={styles.noteContainer}>
//       <Text style={styles.note}>{itemToRender.note}</Text>
//     </View>
//   );
//
//   const noteNotExistComponent = <View />;
//
//   const noteComponent =
//     itemToRender.note.length > 0 ? noteExistComponent : noteNotExistComponent;
//
//   return (
//     <TouchableHighlight
//       style={styles.touchable}
//       onPress={() => console.log('PRESS')}>
//       <View style={styles.mainContainer}>
//         <View style={styles.infoContainer}>
//           <View style={styles.majorInfoContainer}>
//             <View style={styles.productNameContainer}>
//               <Text
//                 style={styles.productName}
//                 numberOfLines={2}
//                 elipsizeMode="tail">
//                 {itemToRender.name}
//               </Text>
//             </View>
//             <View style={styles.quantityContainer}>
//               <View style={styles.quantityCountContainer}>
//                 <Text style={styles.quantityCount} numberOfLines={1}>
//                   {itemToRender.quantity}
//                 </Text>
//               </View>
//               <View style={styles.quantityUnitContainer}>
//                 <Text style={styles.quantityUnit} numberOfLines={1}>
//                   {itemToRender.unit}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           {noteComponent}
//         </View>
//         <TouchableWithoutFeedback
//           style={styles.statusTouchable}
//           onPress={statusPressHandler}>
//           <View style={styles.statusContainer}>
//             <View style={styles.statusNotFinished} />
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     </TouchableHighlight>
//   );
// };
//
// // const comparator = (prevProps, currProps) => {
// //   const needUpdate =
// //     prevProps.itemToRender.completionStatus !==
// //       currProps.itemToRender.completionStatus ||
// //     prevProps.itemToRender.updateTimestamp !==
// //       currProps.itemToRender.updateTimestamp ||
// //     prevProps.onStatusPress !== currProps.onStatusPress;
// //
// //   return needUpdate;
// // };
//
// export default React.memo(ProductNotCompleted);
