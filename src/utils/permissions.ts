import AndroidOpenSettings from 'react-native-android-open-settings';
import Permissions, { CheckOptions, Status } from 'react-native-permissions';
import _ from 'lodash';
import { Alert, Platform } from 'react-native';

export type PermissionStatus = Status;

const openSettings = (permission: string) => {
  if (Platform.OS === 'android') {
    AndroidOpenSettings.appDetailsSettings();
  } else if (Platform.OS === 'ios') {
    if (Permissions.canOpenSettings()) {
      Alert.alert('Open Settings', `Authorize "${_.capitalize(permission)}" permission?`, [
        {
          text: 'Yes',
          onPress: Permissions.openSettings
        },
        { text: 'No' }
      ]);
    } else {
      Alert.alert('Error', 'Could not open settings at this time, please try again later!');
    }
  } else {
    Alert.alert('Error', 'Platform is not support');
  }
};

const handleDenied = async (permission: string, options?: CheckOptions, callback?: Function) => {
  const _callback = typeof callback === 'function' ? callback : () => {};

  if (Platform.OS === 'ios') {
    openSettings(permission);
  } else if (Platform.OS === 'android') {
    const granted = await Permissions.request(permission, options);
    if (granted === 'authorized') {
      _callback();
    }
  } else {
    Alert.alert('Error', 'Platform is not support!');
  }
};

const handleRestricted = (permission: string) => {
  if (Platform.OS === 'ios') {
    Alert.alert(
      'Error',
      `You aren't able to grant ${_.capitalize(
        permission
      )} permission at this time, either because it's not supported by the device or because it has been blocked by parental controls`
    );
  } else if (Platform.OS === 'android') {
    openSettings(permission);
  }
};

const checkPermission = (permission: string, options?: CheckOptions): Promise<Status> => {
  return Permissions.check(permission, options);
};

const multiCheckPermissions = (
  permissions: string[]
): Promise<{
  [key: string]: string;
}> => {
  return Permissions.checkMultiple(permissions);
};

interface Params {
  permission: string;
  options?: CheckOptions;
}
const requestPermission = async (params: Params) => {
  return new Promise(async (resolve, reject) => {
    const { permission, options } = params;

    const isGranted = await Permissions.check(permission, options);

    switch (isGranted) {
      case 'authorized':
        resolve();
        break;
      case 'denied':
        if (Platform.OS === 'ios') {
          openSettings(permission);
          reject(new Error(`Request ${params.permission} permission denied`));
        } else if (Platform.OS === 'android') {
          const granted = await Permissions.request(permission, options);
          if (granted === 'authorized') {
            resolve();
          } else {
            reject(new Error(`Request ${params.permission} permission ${granted}`));
          }
        } else {
          Alert.alert('Error', 'Platform is not support!');
        }
        break;
      case 'restricted':
        handleRestricted(permission);
        reject(new Error(`Request ${params.permission} permission restricted`));
        break;
      default:
        const granted = await Permissions.request(permission, options);
        if (granted === 'authorized') {
          resolve();
        } else {
          reject(new Error(`Request ${params.permission} permission ${granted}`));
        }
        break;
    }
  });
};

export { Permissions, requestPermission, checkPermission, multiCheckPermissions };
