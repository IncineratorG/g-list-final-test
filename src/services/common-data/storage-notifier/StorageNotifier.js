export class StorageNotifier {
  idsCounter = 0;
  pathDelimiter = '/';
  subscriptions = [];
  idsResolver = {
    idsToPath: undefined,
    pathToIds: undefined,
  };

  constructor({idsResolver}) {
    this.idsResolver.idsToPath = idsResolver
      ? idsResolver.idsToPath
      : this.defaultIdsToPathResolver;
    this.idsResolver.pathToIds = idsResolver
      ? idsResolver.pathToIds
      : this.defaultPathToIdsResolver;
  }

  subscribe({entityIds, event, handler}) {
    const subscriptionId = ++this.idsCounter;
    const subscription = {
      id: subscriptionId,
      entityPath: this.idsResolver.idsToPath(entityIds),
      event: event,
      handler: handler,
    };

    this.subscriptions.push(subscription);

    return () => {
      this.subscriptions = this.subscriptions.filter(
        s => s.id !== subscription.id,
      );
    };
  }

  notify({entityIds, event, data}) {
    const entityPath = this.idsResolver.idsToPath(entityIds);

    this.subscriptions.forEach(subscription => {
      if (
        subscription.event === event &&
        subscription.entityPath === entityPath &&
        subscription.handler
      ) {
        subscription.handler(data);
      }
    });
  }

  defaultIdsToPathResolver(entityIds) {
    if (!entityIds) {
      return '';
    }

    const {shoppingListId, productId} = entityIds;
    if (!shoppingListId && productId) {
      console.log(
        'StorageNotifier->defaultIdsToPathResolver(): BAD_SHOPPING_LIST_ID',
      );
      return '';
    }

    return (
      (shoppingListId ? shoppingListId.toString() : '') +
      (productId ? this.pathDelimiter + productId.toString() : '')
    );
  }

  defaultPathToIdsResolver(entityPath) {
    if (!entityPath || !entityPath.length) {
      return {shoppingListId: undefined, productId: undefined};
    }

    let shoppingListId;
    let productId;

    const idsArr = entityPath.split(this.pathDelimiter);
    if (idsArr.length > 0) {
      shoppingListId = idsArr[0];
    }
    if (idsArr.length > 1) {
      productId = idsArr[1];
    }

    return {shoppingListId, productId};
  }

  getLength() {
    return this.subscriptions.length;
  }
}
