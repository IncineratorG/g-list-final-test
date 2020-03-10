export class StorageEvents {
  static subscribe({entityIds, event, handler}) {
    const subscriptionId = ++StorageEvents.ids;
    const subscription = {
      id: subscriptionId,
      entityPath: this.idsToPath(entityIds),
      event: event,
      handler: handler,
    };

    StorageEvents.subscriptions.push(subscription);

    return () => {
      StorageEvents.subscriptions = StorageEvents.subscriptions.filter(
        s => s.id !== subscription.id,
      );
    };
  }

  static fireEvent({entityIds, event, data}) {
    const entityPath = this.idsToPath(entityIds);

    StorageEvents.subscriptions.forEach(subscription => {
      if (
        subscription.event === event &&
        subscription.entityPath === entityPath &&
        subscription.handler
      ) {
        subscription.handler(data);
      }
    });
  }

  static idsToPath(entityIds) {
    if (!entityIds) {
      return '';
    }

    const {shoppingListId, productId} = entityIds;
    if (!shoppingListId && productId) {
      console.log(
        StorageEvents.CLASS_NAME + '->idsToPath(): BAD_SHOPPING_LIST_ID',
      );
      return '';
    }

    return (
      (shoppingListId ? shoppingListId.toString() : '') +
      (productId ? StorageEvents.pathDelimiter + productId.toString() : '')
    );
  }

  static pathToIds(entityPath) {
    if (!entityPath || !entityPath.length) {
      return {shoppingListId: undefined, productId: undefined};
    }

    let shoppingListId;
    let productId;

    const idsArr = entityPath.split(StorageEvents.pathDelimiter);
    if (idsArr.length > 0) {
      shoppingListId = idsArr[0];
    }
    if (idsArr.length > 1) {
      productId = idsArr[1];
    }

    return {shoppingListId, productId};
  }
}

StorageEvents.CLASS_NAME = 'StorageEvents';
StorageEvents.subscriptions = [];
StorageEvents.ids = 0;
StorageEvents.pathDelimiter = '/';
