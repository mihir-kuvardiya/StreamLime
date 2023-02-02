import { Linking, Platform, ToastAndroid } from "react-native";
import RNFS from 'react-native-fs';
import {EventEmitter} from 'fbemitter';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const Emmiter = new EventEmitter();

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

export const timeStampComment = (date:string) => {
  
    // var seconds = Math.floor((new Date() - +date) / 1000);
    var seconds = Math.floor(+(new Date()) - +(date))
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " m";
    }
    return Math.floor(seconds) + " s";
}

export const createShareLink = async (postId,imageUrl) =>{
  const link = await dynamicLinks().buildShortLink({
    link : `https://streamlline.page.link/feed/${postId}`,
    domainUriPrefix: 'https://streamlline.page.link',
    social:{
      title:'streamline',
      descriptionText:'Engage to new genaration.',
      imageUrl: imageUrl
    },
    android:{
      packageName:'com.streamline'
    }
  },
    dynamicLinks.ShortLinkType.SHORT
  )
  return link;
}

export const openUrl = async (data) => {

  const link = data.replace('https://streamlline.page.link','streamline:/')

  Linking.canOpenURL(link).then(() => {
    console.log('URL works');
    Linking.openURL(link).catch(error => {
      console.log('An error has occurred in URL:', error);
    });
  });
}