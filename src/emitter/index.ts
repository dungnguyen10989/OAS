import { EventEmitter, EventSubscription } from 'fbemitter';

const emitter = new EventEmitter();

const events = {
  alert: 'event.alert',
  capture: 'event.capture',
  swipableOpened: 'event.swipableOpen'
};

export { EventEmitter, EventSubscription, emitter, events };

export interface AlertParams {
  title: string;
  content: string | Function;
  buttons: Array<{ text: string; onPress?: () => void }>;
}
export const showDialog = (params?: AlertParams) => {
  emitter.emit(events.alert, params);
};
