import { Platform, ToastAndroid } from "react-native";
import RNFS from 'react-native-fs';

interface PhotoModel {
    uri: string;
    group_name: string;
    fileSize: number | string;
    filename: string;
    height: number;
    width: number;
    timestamp: number;
    type: string;
    isSelected?: boolean;
  }

export const getUploadMediaUrl = async (objMedia: PhotoModel)  => {
    if (Platform.OS === 'ios') {
      if (objMedia.uri.includes('file:///')) {
        return objMedia?.uri;
      }
      const appleId = objMedia.uri.substring(5, 41);
      const ext = objMedia.type === 'image' ? 'JPG' : 'mp4';
      const encodedUri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
      const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
        .toString(36)
        .substring(7)}.${ext}`;
      let uri = objMedia.uri;
      if (objMedia.type === 'image') {
        uri = await RNFS.copyAssetsFileIOS(
          encodedUri,
          destPath,
          objMedia.width || 500,
          objMedia.height || 500,
          1.0,
          1.0,
          'contain',
        );
      } else {
        uri = await RNFS.copyAssetsVideoIOS(encodedUri, destPath);
      }
      // debugLogs('local media url', uri);
      return `file://${uri}`;
    } else {
      // debugLogs('Media url', objMedia.uri);
      return objMedia.uri;
    }
  };

export const showToast = (text:string) => {
  ToastAndroid.show(text,ToastAndroid.SHORT);
}