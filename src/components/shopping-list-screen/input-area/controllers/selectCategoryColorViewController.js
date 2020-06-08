export const useSelectCategoryColorViewController = ({model}) => {
  const cancelButtonHandler = () => {
    console.log('cancelButtonHandler()');
    model.setters.setSelectCategoryColorMode(
      !model.data.selectCategoryColorMode,
    );
  };

  return {
    cancelButtonHandler,
  };
};
