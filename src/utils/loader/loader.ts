import { UIEvents } from '../../store/ui';

export const loader = async (assets: Promise<void>[]) => {
  UIEvents.onUpdateLoading.notifyObservers(true);
  await Promise.all(assets);
  UIEvents.onUpdateLoading.notifyObservers(false);
}
